import { FormEvent, useState } from 'react';
import {
  Curriculum,
  CURRICULUM_COLORS,
  Resource,
  ResourceType,
  RESOURCE_TYPE_LABELS,
  Unit,
} from '../types';

export interface CurriculumFormValues {
  title: string;
  description: string;
  color: string;
}

export function CurriculumForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Curriculum;
  onSubmit: (values: CurriculumFormValues) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [color, setColor] = useState(initial?.color ?? CURRICULUM_COLORS[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim(), color });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Name
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Music Theory"
          required
        />
      </label>
      <label>
        Description <span className="muted">(optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What is this curriculum about?"
          rows={2}
        />
      </label>
      <div className="field">
        <span className="field-label">Color</span>
        <div className="color-row">
          {CURRICULUM_COLORS.map((c) => (
            <button
              type="button"
              key={c}
              className={`color-swatch ${c === color ? 'selected' : ''}`}
              style={{ background: c }}
              onClick={() => setColor(c)}
              aria-label={`Select color ${c}`}
            />
          ))}
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? 'Save changes' : 'Create curriculum'}
        </button>
      </div>
    </form>
  );
}

export interface UnitFormValues {
  week: number;
  title: string;
  description: string;
}

export function UnitForm({
  initial,
  defaultWeek,
  onSubmit,
  onCancel,
}: {
  initial?: Unit;
  defaultWeek: number;
  onSubmit: (values: UnitFormValues) => void;
  onCancel: () => void;
}) {
  const [week, setWeek] = useState(String(initial?.week ?? defaultWeek));
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const weekNum = parseInt(week, 10);
    if (!title.trim() || Number.isNaN(weekNum) || weekNum < 1) return;
    onSubmit({ week: weekNum, title: title.trim(), description: description.trim() });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Week
        <input
          type="number"
          min={1}
          value={week}
          onChange={(e) => setWeek(e.target.value)}
          required
          style={{ maxWidth: '8rem' }}
        />
      </label>
      <label>
        Title
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. The Enlightenment"
          required
        />
      </label>
      <label>
        Description <span className="muted">(optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Topics covered this week"
          rows={2}
        />
      </label>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? 'Save changes' : 'Add unit'}
        </button>
      </div>
    </form>
  );
}

export interface ResourceFormValues {
  type: ResourceType;
  title: string;
  url: string;
}

export function ResourceForm({
  initial,
  onSubmit,
  onCancel,
}: {
  initial?: Resource;
  onSubmit: (values: ResourceFormValues) => void;
  onCancel: () => void;
}) {
  const [type, setType] = useState<ResourceType>(initial?.type ?? 'reading');
  const [title, setTitle] = useState(initial?.title ?? '');
  const [url, setUrl] = useState(initial?.url ?? '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ type, title: title.trim(), url: url.trim() });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <span className="field-label">Type</span>
        <div className="segmented">
          {(Object.keys(RESOURCE_TYPE_LABELS) as ResourceType[]).map((t) => (
            <button
              type="button"
              key={t}
              className={`segment ${t === type ? 'selected' : ''}`}
              onClick={() => setType(t)}
            >
              {RESOURCE_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>
      <label>
        Title
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Chapter 4: The Silk Road"
          required
        />
      </label>
      <label>
        URL <span className="muted">(optional)</span>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://…"
        />
      </label>
      <div className="form-actions">
        <button type="button" className="btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {initial ? 'Save changes' : 'Add item'}
        </button>
      </div>
    </form>
  );
}
