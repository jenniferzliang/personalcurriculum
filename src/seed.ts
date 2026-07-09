import { Curriculum } from './types';
import { artHistoryCurriculum } from './artHistorySeed';
import { worldHistoryCurriculum } from './worldHistorySeed';

// Starter curriculums shown on first launch so the app isn't empty.
// They are fully editable and deletable like anything created in the UI.
export function seedCurricula(): Curriculum[] {
  return [worldHistoryCurriculum(), artHistoryCurriculum()];
}
