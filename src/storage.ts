import { Curriculum, newId } from './types';
import { seedCurricula } from './seed';
import { artHistoryCurriculum } from './artHistorySeed';
import { worldHistoryCurriculum } from './worldHistorySeed';

const STORAGE_KEY = 'personalcurriculum.v4';
const V3_STORAGE_KEY = 'personalcurriculum.v3';
const V2_STORAGE_KEY = 'personalcurriculum.v2';
const V1_STORAGE_KEY = 'personalcurriculum.v1';

// v1 shipped a 2-week "Art History" starter that was later replaced by the
// full "Art History & Architecture" syllabus. Swap the old starter for the
// new curriculum — unless it has progress, in which case keep it and add the
// new curriculum alongside.
function migrateFromV1(curricula: Curriculum[]): Curriculum[] {
  const fresh = artHistoryCurriculum();
  const idx = curricula.findIndex((c) => c.title === 'Art History');
  if (idx === -1) return [...curricula, fresh];
  const hasProgress = curricula[idx].units.some((u) => u.resources.some((r) => r.completed));
  const next = [...curricula];
  if (hasProgress) {
    next.splice(idx + 1, 0, fresh);
  } else {
    next[idx] = fresh;
  }
  return next;
}

// v4 restores Contemporary Art as Unit 14 of Art History & Architecture
// (undoing the short-lived v3 split), drops the "Review & Transition to AP"
// unit, and replaces the two-unit World History starter with the full
// course (carrying completion over by matching resource URLs).
function migrateToV4(curricula: Curriculum[]): Curriculum[] {
  let next = [...curricula];

  // Fold a standalone Contemporary Art course (v3 layout) back into Art
  // History & Architecture as Unit 14, keeping its completion state.
  const ahIdx = next.findIndex((c) => c.title === 'Art History & Architecture');
  const caIdx = next.findIndex((c) => c.title === 'Contemporary Art');
  if (ahIdx !== -1 && caIdx !== -1) {
    const ah = next[ahIdx];
    if (!ah.units.some((u) => u.title === 'Unit 14 — Contemporary Art')) {
      next[ahIdx] = {
        ...ah,
        units: [
          ...ah.units,
          {
            id: newId(),
            week: 13,
            title: 'Unit 14 — Contemporary Art',
            description: 'Week 13.',
            resources: next[caIdx].units.flatMap((u) => u.resources),
          },
        ],
      };
    }
    next = next.filter((_, i) => i !== caIdx);
  }

  // Remove the review unit.
  next = next.map((c) =>
    c.title === 'Art History & Architecture'
      ? { ...c, units: c.units.filter((u) => u.title !== 'Review & Transition to AP') }
      : c
  );

  // Replace the old World History starter with the full course, carrying
  // completed items over wherever the resource URL matches.
  const whIdx = next.findIndex((c) => c.title === 'World History');
  const isOldStarter =
    whIdx !== -1 && next[whIdx].units.every((u) => u.title === 'Ancient Civilizations' || u.title === 'Classical Antiquity');
  if (isOldStarter) {
    const completedUrls = new Set(
      next[whIdx].units.flatMap((u) => u.resources.filter((r) => r.completed && r.url).map((r) => r.url!))
    );
    const fresh = worldHistoryCurriculum();
    next[whIdx] = {
      ...fresh,
      units: fresh.units.map((u) => ({
        ...u,
        resources: u.resources.map((r) =>
          r.url && completedUrls.has(r.url) ? { ...r, completed: true } : r
        ),
      })),
    };
  }

  return next;
}

function parseArray(raw: string | null): Curriculum[] | null {
  if (raw === null) return null;
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? (parsed as Curriculum[]) : null;
}

export function loadCurricula(): Curriculum[] {
  try {
    const current = parseArray(localStorage.getItem(STORAGE_KEY));
    if (current) return current;

    // v3, v2, and v1 all funnel through the v4 migration; v1 first swaps its
    // old Art History starter for the full curriculum.
    for (const [key, pre] of [
      [V3_STORAGE_KEY, (c: Curriculum[]) => c],
      [V2_STORAGE_KEY, (c: Curriculum[]) => c],
      [V1_STORAGE_KEY, migrateFromV1],
    ] as const) {
      const data = parseArray(localStorage.getItem(key));
      if (data) {
        const migrated = migrateToV4(pre(data));
        saveCurricula(migrated);
        return migrated;
      }
    }

    return seedCurricula();
  } catch {
    return seedCurricula();
  }
}

export function saveCurricula(curricula: Curriculum[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(curricula));
  } catch {
    // Storage full or unavailable; the app keeps working in-memory.
  }
}

export function exportCurricula(curricula: Curriculum[]): void {
  const blob = new Blob([JSON.stringify(curricula, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `curriculums-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function importCurricula(file: File): Promise<Curriculum[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) {
          throw new Error('Expected a JSON array of curriculums.');
        }
        for (const c of parsed) {
          if (typeof c.id !== 'string' || typeof c.title !== 'string' || !Array.isArray(c.units)) {
            throw new Error('File does not look like a curriculum export.');
          }
        }
        resolve(parsed as Curriculum[]);
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Invalid JSON file.'));
      }
    };
    reader.readAsText(file);
  });
}
