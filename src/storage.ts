import { Curriculum, newId } from './types';
import { seedCurricula } from './seed';
import { artHistoryCurriculum, contemporaryArtCurriculum } from './artHistorySeed';

const STORAGE_KEY = 'personalcurriculum.v3';
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

// v2 kept Contemporary Art as Unit 14 inside Art History & Architecture; it
// is now its own course. Move the unit (progress intact) into a standalone
// Contemporary Art curriculum.
function migrateFromV2(curricula: Curriculum[]): Curriculum[] {
  const unitTitle = 'Unit 14 — Contemporary Art';
  for (let i = 0; i < curricula.length; i++) {
    const uIdx = curricula[i].units.findIndex((u) => u.title === unitTitle);
    if (uIdx === -1) continue;
    const moved = curricula[i].units[uIdx];
    const course: Curriculum = {
      id: newId(),
      title: 'Contemporary Art',
      description:
        'From Nam June Paik to Yayoi Kusama — contemporary art and postmodernism, via Smarthistory.',
      color: '#9333ea',
      createdAt: new Date().toISOString(),
      units: [
        {
          id: newId(),
          week: 1,
          title: 'Contemporary Art',
          description: 'Introductions and key works.',
          resources: moved.resources,
        },
      ],
    };
    const next = [...curricula];
    next[i] = { ...curricula[i], units: curricula[i].units.filter((_, j) => j !== uIdx) };
    next.splice(i + 1, 0, course);
    return next;
  }
  // Unit not found (renamed or deleted) — just make sure the standalone
  // course exists.
  return curricula.some((c) => c.title === 'Contemporary Art')
    ? curricula
    : [...curricula, contemporaryArtCurriculum()];
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

    const v2 = parseArray(localStorage.getItem(V2_STORAGE_KEY));
    if (v2) {
      const migrated = migrateFromV2(v2);
      saveCurricula(migrated);
      return migrated;
    }

    const v1 = parseArray(localStorage.getItem(V1_STORAGE_KEY));
    if (v1) {
      const migrated = migrateFromV2(migrateFromV1(v1));
      saveCurricula(migrated);
      return migrated;
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
