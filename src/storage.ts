import { Curriculum } from './types';
import { seedCurricula } from './seed';

const STORAGE_KEY = 'personalcurriculum.v1';

export function loadCurricula(): Curriculum[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return seedCurricula();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return seedCurricula();
    return parsed as Curriculum[];
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
