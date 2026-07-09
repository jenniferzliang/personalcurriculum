import { Curriculum, Resource, RESOURCE_TYPE_ICONS, RESOURCE_TYPE_LABELS, Unit, countResources } from '../types';
import ProgressBar from './ProgressBar';

interface CurriculumViewProps {
  curriculum: Curriculum;
  onBack: () => void;
  onEditCurriculum: () => void;
  onDeleteCurriculum: () => void;
  onAddUnit: () => void;
  onEditUnit: (unit: Unit) => void;
  onDeleteUnit: (unit: Unit) => void;
  onAddResource: (unit: Unit) => void;
  onEditResource: (unit: Unit, resource: Resource) => void;
  onDeleteResource: (unit: Unit, resource: Resource) => void;
  onToggleResource: (unit: Unit, resource: Resource) => void;
}

export default function CurriculumView({
  curriculum,
  onBack,
  onEditCurriculum,
  onDeleteCurriculum,
  onAddUnit,
  onEditUnit,
  onDeleteUnit,
  onAddResource,
  onEditResource,
  onDeleteResource,
  onToggleResource,
}: CurriculumViewProps) {
  const { done, total } = countResources(curriculum.units);
  const units = [...curriculum.units].sort((a, b) => a.week - b.week);

  return (
    <div className="page">
      <button className="back-link" onClick={onBack}>
        ← All curriculums
      </button>

      <header className="page-header">
        <div className="title-block">
          <span className="title-dot" style={{ background: curriculum.color }} />
          <div>
            <h1>{curriculum.title}</h1>
            {curriculum.description && <p className="muted">{curriculum.description}</p>}
          </div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onEditCurriculum}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDeleteCurriculum}>
            Delete
          </button>
        </div>
      </header>

      <div className="overall-progress">
        <ProgressBar done={done} total={total} color={curriculum.color} />
      </div>

      <div className="units-header">
        <h2>Weekly units</h2>
        <button className="btn btn-primary" onClick={onAddUnit}>
          + Add unit
        </button>
      </div>

      {units.length === 0 ? (
        <div className="empty-state">
          <p>No units yet. Add your first week of material.</p>
        </div>
      ) : (
        <div className="unit-list">
          {units.map((unit) => {
            const unitDone = unit.resources.filter((r) => r.completed).length;
            const unitTotal = unit.resources.length;
            const complete = unitTotal > 0 && unitDone === unitTotal;
            return (
              <section key={unit.id} className={`unit-card ${complete ? 'unit-complete' : ''}`}>
                <div className="unit-header">
                  <div>
                    <span className="week-badge" style={{ borderColor: curriculum.color, color: curriculum.color }}>
                      Week {unit.week}
                    </span>
                    <h3>
                      {unit.title} {complete && <span title="Unit complete">✅</span>}
                    </h3>
                    {unit.description && <p className="muted">{unit.description}</p>}
                  </div>
                  <div className="unit-actions">
                    <span className="muted unit-count">
                      {unitTotal === 0 ? 'No items' : `${unitDone}/${unitTotal} done`}
                    </span>
                    <button className="icon-btn" onClick={() => onEditUnit(unit)} title="Edit unit">
                      ✏️
                    </button>
                    <button className="icon-btn" onClick={() => onDeleteUnit(unit)} title="Delete unit">
                      🗑️
                    </button>
                  </div>
                </div>

                <ul className="resource-list">
                  {unit.resources.map((resource) => (
                    <li key={resource.id} className={`resource-row ${resource.completed ? 'done' : ''}`}>
                      <label className="resource-check">
                        <input
                          type="checkbox"
                          checked={resource.completed}
                          onChange={() => onToggleResource(unit, resource)}
                        />
                        <span className="resource-icon" title={RESOURCE_TYPE_LABELS[resource.type]}>
                          {RESOURCE_TYPE_ICONS[resource.type]}
                        </span>
                        <span className="resource-title">
                          {resource.url ? (
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {resource.title}
                            </a>
                          ) : (
                            resource.title
                          )}
                        </span>
                      </label>
                      <div className="resource-actions">
                        <button
                          className="icon-btn"
                          onClick={() => onEditResource(unit, resource)}
                          title="Edit item"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-btn"
                          onClick={() => onDeleteResource(unit, resource)}
                          title="Delete item"
                        >
                          🗑️
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                <button className="add-resource" onClick={() => onAddResource(unit)}>
                  + Add reading, video, or link
                </button>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
