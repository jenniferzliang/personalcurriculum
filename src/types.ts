export type ResourceType = 'reading' | 'video' | 'link';

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  url?: string;
  completed: boolean;
}

export interface Unit {
  id: string;
  week: number;
  title: string;
  description?: string;
  resources: Resource[];
}

export interface Curriculum {
  id: string;
  title: string;
  description?: string;
  color: string;
  units: Unit[];
  createdAt: string;
  /** Original syllabus document (markdown), viewable in the app. */
  syllabus?: string;
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  reading: 'Reading',
  video: 'Video',
  link: 'Link',
};

export const RESOURCE_TYPE_ICONS: Record<ResourceType, string> = {
  reading: '📖',
  video: '🎬',
  link: '🔗',
};

export const CURRICULUM_COLORS = [
  '#4f6df5',
  '#0ea5a4',
  '#e0703a',
  '#9333ea',
  '#dc2f5c',
  '#4d7c0f',
  '#b45309',
  '#475569',
];

export function newId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `id-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function countResources(units: Unit[]): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const unit of units) {
    for (const r of unit.resources) {
      total += 1;
      if (r.completed) done += 1;
    }
  }
  return { done, total };
}

export function percent(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}
