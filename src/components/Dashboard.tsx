import { Curriculum, countResources, percent } from '../types';
import { syncEnabled } from '../sync';
import type { SyncStatus } from '../App';
import ProgressBar from './ProgressBar';

interface DashboardProps {
  curricula: Curriculum[];
  onOpen: (id: string) => void;
  onNew: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
  accountEmail: string | null;
  syncStatus: SyncStatus;
  onSignIn: () => void;
  onSignOut: () => void;
}

const SYNC_LABELS: Record<SyncStatus, string> = {
  idle: '',
  syncing: 'Syncing…',
  synced: 'Synced ✓',
  error: 'Sync failed — changes saved on this device',
};

function nextUp(c: Curriculum): string | null {
  const sorted = [...c.units].sort((a, b) => a.week - b.week);
  for (const unit of sorted) {
    if (unit.resources.length === 0 || unit.resources.some((r) => !r.completed)) {
      return `Week ${unit.week}: ${unit.title}`;
    }
  }
  return sorted.length > 0 ? 'All caught up 🎉' : null;
}

export default function Dashboard({
  curricula,
  onOpen,
  onNew,
  onExport,
  onImport,
  accountEmail,
  syncStatus,
  onSignIn,
  onSignOut,
}: DashboardProps) {
  return (
    <div className="page">
      {syncEnabled && (
        <div className="account-bar">
          {accountEmail ? (
            <>
              <span className="muted">
                {accountEmail}
                {SYNC_LABELS[syncStatus] && <> · {SYNC_LABELS[syncStatus]}</>}
              </span>
              <button className="btn btn-small" onClick={onSignOut}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <span className="muted">Working locally on this device only.</span>
              <button className="btn btn-small btn-primary" onClick={onSignIn}>
                Sign in to sync
              </button>
            </>
          )}
        </div>
      )}
      <header className="page-header">
        <div>
          <h1>My Curriculums</h1>
          <p className="muted">Track your self-study progress, week by week.</p>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onExport} title="Download all data as JSON">
            Export
          </button>
          <label className="btn" title="Restore from a JSON export">
            Import
            <input
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onImport(file);
                e.target.value = '';
              }}
            />
          </label>
          <button className="btn btn-primary" onClick={onNew}>
            + New curriculum
          </button>
        </div>
      </header>

      {curricula.length === 0 ? (
        <div className="empty-state">
          <p>No curriculums yet.</p>
          <button className="btn btn-primary" onClick={onNew}>
            Create your first curriculum
          </button>
        </div>
      ) : (
        <div className="card-grid">
          {curricula.map((c) => {
            const { done, total } = countResources(c.units);
            const next = nextUp(c);
            return (
              <button key={c.id} className="curriculum-card" onClick={() => onOpen(c.id)}>
                <div className="card-accent" style={{ background: c.color }} />
                <div className="card-body">
                  <h2>{c.title}</h2>
                  {c.description && <p className="muted card-desc">{c.description}</p>}
                  <ProgressBar done={done} total={total} color={c.color} />
                  <div className="card-meta">
                    <span className="muted">
                      {c.units.length} {c.units.length === 1 ? 'unit' : 'units'}
                    </span>
                    {next && (
                      <span className="next-up" title={next}>
                        {percent(done, total) === 100 && total > 0 ? 'All caught up 🎉' : next}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
