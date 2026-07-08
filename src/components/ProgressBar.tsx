interface ProgressBarProps {
  done: number;
  total: number;
  color?: string;
}

export default function ProgressBar({ done, total, color }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="progress">
      <div className="progress-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color ?? 'var(--accent)' }}
        />
      </div>
      <span className="progress-label">
        {total === 0 ? 'No items yet' : `${done}/${total} · ${pct}%`}
      </span>
    </div>
  );
}
