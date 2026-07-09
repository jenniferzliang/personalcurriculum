// Checks every resource URL in the seed curriculums.
// Run: node scripts/check-links.mjs  (needs open internet — runs in CI)
import { readFileSync } from 'node:fs';

const SEED_FILES = ['src/worldHistorySeed.ts', 'src/artHistorySeed.ts', 'src/seed.ts'];
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36 link-checker';

const urls = new Set();
for (const file of SEED_FILES) {
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch {
    continue;
  }
  for (const m of text.matchAll(/https?:\/\/[^'")\s]+/g)) urls.add(m[0]);
}

async function tryFetch(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    return await fetch(url, {
      method,
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': UA, Accept: 'text/html,application/json;q=0.9,*/*;q=0.8' },
    });
  } finally {
    clearTimeout(timer);
  }
}

async function check(url) {
  // YouTube watch pages return 200 even for dead videos; oEmbed 404s instead.
  const target = url.startsWith('https://www.youtube.com/watch')
    ? `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    : url;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      let res = await tryFetch(target, 'GET');
      if (res.status === 405 || res.status === 501) res = await tryFetch(target, 'HEAD');
      if (res.ok) return { url, verdict: 'OK', detail: String(res.status) };
      if ([401, 403, 429].includes(res.status)) {
        return { url, verdict: 'BLOCKED', detail: `${res.status} (bot protection — verify manually)` };
      }
      if (attempt === 1) return { url, verdict: 'FAIL', detail: String(res.status) };
    } catch (err) {
      if (attempt === 1) return { url, verdict: 'FAIL', detail: String(err.cause ?? err.message ?? err) };
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
}

const list = [...urls].sort();
console.log(`Checking ${list.length} unique URLs...\n`);
const results = [];
const CONCURRENCY = 6;
for (let i = 0; i < list.length; i += CONCURRENCY) {
  results.push(...(await Promise.all(list.slice(i, i + CONCURRENCY).map(check))));
}

const fails = results.filter((r) => r.verdict === 'FAIL');
const blocked = results.filter((r) => r.verdict === 'BLOCKED');
for (const r of results) console.log(`${r.verdict.padEnd(7)} ${r.detail.padEnd(12)} ${r.url}`);
console.log(
  `\nSummary: ${results.length} checked, ${results.length - fails.length - blocked.length} OK, ` +
    `${blocked.length} blocked (manual check), ${fails.length} failed`
);
if (fails.length > 0) {
  console.log('\nFAILED URLS:');
  for (const r of fails) console.log(`  ${r.url} (${r.detail})`);
  process.exit(1);
}
