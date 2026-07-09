import { Curriculum } from './types';
import { seedCurricula } from './seed';
import { artHistoryCurriculum } from './artHistorySeed';

const STORAGE_KEY = 'personalcurriculum.v2';
const LEGACY_STORAGE_KEY = 'personalcurriculum.v1';

// v1 shipped a 2-week "Art History" starter that was later replaced by the
// full "Art History & Architecture" syllabus. On first load after the update,
// swap the old starter for the new curriculum — unless it has progress, in
// which case keep it and add the new curriculum alongside.
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

export function loadCurricula(): Curriculum[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as Curriculum[]) : seedCurricula();
    }
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacy !== null) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed)) {
        const migrated = migrateFromV1(parsed as Curriculum[]);
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
