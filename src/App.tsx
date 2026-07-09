import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Curriculum, Resource, Unit, newId } from './types';
import { exportCurricula, importCurricula, loadCurricula, saveCurricula } from './storage';
import { fetchRemote, pushRemote, sendMagicLink, signOut, supabase } from './sync';
import Dashboard from './components/Dashboard';
import CurriculumView from './components/CurriculumView';
import Modal from './components/Modal';
import {
  CurriculumForm,
  CurriculumFormValues,
  ResourceForm,
  ResourceFormValues,
  SignInForm,
  UnitForm,
  UnitFormValues,
} from './components/forms';

type ModalState =
  | { kind: 'none' }
  | { kind: 'sign-in' }
  | { kind: 'new-curriculum' }
  | { kind: 'edit-curriculum'; curriculum: Curriculum }
  | { kind: 'new-unit'; curriculumId: string }
  | { kind: 'edit-unit'; curriculumId: string; unit: Unit }
  | { kind: 'new-resource'; curriculumId: string; unitId: string }
  | { kind: 'edit-resource'; curriculumId: string; unitId: string; resource: Resource };

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

export default function App() {
  const [curricula, setCurricula] = useState<Curriculum[]>(loadCurricula);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ kind: 'none' });
  const [session, setSession] = useState<Session | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  // Set when applying data that arrived FROM the server, so the push effect
  // doesn't immediately echo it back.
  const skipNextPush = useRef(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // On sign-in: pull the account's data. First sign-in (no remote data yet)
  // seeds the account from this device instead.
  const userId = session?.user.id ?? null;
  useEffect(() => {
    if (!supabase || !userId) return;
    let cancelled = false;
    (async () => {
      setSyncStatus('syncing');
      try {
        const remote = await fetchRemote(userId);
        if (cancelled) return;
        if (remote) {
          skipNextPush.current = true;
          setCurricula(remote.curricula);
        } else {
          await pushRemote(userId, loadCurricula());
        }
        if (!cancelled) setSyncStatus('synced');
      } catch {
        if (!cancelled) setSyncStatus('error');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  // Persist locally on every change; push to the account (debounced) when
  // signed in.
  useEffect(() => {
    saveCurricula(curricula);
    if (!supabase || !userId) return;
    if (skipNextPush.current) {
      skipNextPush.current = false;
      return;
    }
    setSyncStatus('syncing');
    const timer = setTimeout(async () => {
      try {
        await pushRemote(userId, curricula);
        setSyncStatus('synced');
      } catch {
        setSyncStatus('error');
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [curricula, userId]);

  const selected = curricula.find((c) => c.id === selectedId) ?? null;
  const closeModal = () => setModal({ kind: 'none' });

  const updateCurriculum = (id: string, update: (c: Curriculum) => Curriculum) => {
    setCurricula((prev) => prev.map((c) => (c.id === id ? update(c) : c)));
  };

  const updateUnit = (curriculumId: string, unitId: string, update: (u: Unit) => Unit) => {
    updateCurriculum(curriculumId, (c) => ({
      ...c,
      units: c.units.map((u) => (u.id === unitId ? update(u) : u)),
    }));
  };

  // --- Curriculum operations ---

  const createCurriculum = (values: CurriculumFormValues) => {
    const curriculum: Curriculum = {
      id: newId(),
      title: values.title,
      description: values.description || undefined,
      color: values.color,
      units: [],
      createdAt: new Date().toISOString(),
    };
    setCurricula((prev) => [...prev, curriculum]);
    closeModal();
    setSelectedId(curriculum.id);
  };

  const editCurriculum = (id: string, values: CurriculumFormValues) => {
    updateCurriculum(id, (c) => ({
      ...c,
      title: values.title,
      description: values.description || undefined,
      color: values.color,
    }));
    closeModal();
  };

  const deleteCurriculum = (curriculum: Curriculum) => {
    if (!window.confirm(`Delete "${curriculum.title}" and all its units? This cannot be undone.`)) return;
    setCurricula((prev) => prev.filter((c) => c.id !== curriculum.id));
    setSelectedId(null);
  };

  // --- Unit operations ---

  const createUnit = (curriculumId: string, values: UnitFormValues) => {
    const unit: Unit = {
      id: newId(),
      week: values.week,
      title: values.title,
      description: values.description || undefined,
      resources: [],
    };
    updateCurriculum(curriculumId, (c) => ({ ...c, units: [...c.units, unit] }));
    closeModal();
  };

  const editUnit = (curriculumId: string, unitId: string, values: UnitFormValues) => {
    updateUnit(curriculumId, unitId, (u) => ({
      ...u,
      week: values.week,
      title: values.title,
      description: values.description || undefined,
    }));
    closeModal();
  };

  const deleteUnit = (curriculumId: string, unit: Unit) => {
    if (!window.confirm(`Delete "Week ${unit.week}: ${unit.title}" and its items?`)) return;
    updateCurriculum(curriculumId, (c) => ({
      ...c,
      units: c.units.filter((u) => u.id !== unit.id),
    }));
  };

  // --- Resource operations ---

  const createResource = (curriculumId: string, unitId: string, values: ResourceFormValues) => {
    const resource: Resource = {
      id: newId(),
      type: values.type,
      title: values.title,
      url: values.url || undefined,
      completed: false,
    };
    updateUnit(curriculumId, unitId, (u) => ({ ...u, resources: [...u.resources, resource] }));
    closeModal();
  };

  const editResource = (
    curriculumId: string,
    unitId: string,
    resourceId: string,
    values: ResourceFormValues
  ) => {
    updateUnit(curriculumId, unitId, (u) => ({
      ...u,
      resources: u.resources.map((r) =>
        r.id === resourceId
          ? { ...r, type: values.type, title: values.title, url: values.url || undefined }
          : r
      ),
    }));
    closeModal();
  };

  const deleteResource = (curriculumId: string, unitId: string, resource: Resource) => {
    if (!window.confirm(`Delete "${resource.title}"?`)) return;
    updateUnit(curriculumId, unitId, (u) => ({
      ...u,
      resources: u.resources.filter((r) => r.id !== resource.id),
    }));
  };

  const toggleResource = (curriculumId: string, unitId: string, resourceId: string) => {
    updateUnit(curriculumId, unitId, (u) => ({
      ...u,
      resources: u.resources.map((r) =>
        r.id === resourceId ? { ...r, completed: !r.completed } : r
      ),
    }));
  };

  // --- Import / export ---

  const handleImport = async (file: File) => {
    try {
      const imported = await importCurricula(file);
      if (
        window.confirm(
          `Replace your current ${curricula.length} curriculum(s) with the ${imported.length} in this file?`
        )
      ) {
        setCurricula(imported);
        setSelectedId(null);
      }
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Import failed.');
    }
  };

  const nextWeekFor = (curriculumId: string): number => {
    const c = curricula.find((x) => x.id === curriculumId);
    if (!c || c.units.length === 0) return 1;
    return Math.max(...c.units.map((u) => u.week)) + 1;
  };

  return (
    <>
      {selected ? (
        <CurriculumView
          curriculum={selected}
          onBack={() => setSelectedId(null)}
          onEditCurriculum={() => setModal({ kind: 'edit-curriculum', curriculum: selected })}
          onDeleteCurriculum={() => deleteCurriculum(selected)}
          onAddUnit={() => setModal({ kind: 'new-unit', curriculumId: selected.id })}
          onEditUnit={(unit) => setModal({ kind: 'edit-unit', curriculumId: selected.id, unit })}
          onDeleteUnit={(unit) => deleteUnit(selected.id, unit)}
          onAddResource={(unit) =>
            setModal({ kind: 'new-resource', curriculumId: selected.id, unitId: unit.id })
          }
          onEditResource={(unit, resource) =>
            setModal({ kind: 'edit-resource', curriculumId: selected.id, unitId: unit.id, resource })
          }
          onDeleteResource={(unit, resource) => deleteResource(selected.id, unit.id, resource)}
          onToggleResource={(unit, resource) => toggleResource(selected.id, unit.id, resource.id)}
        />
      ) : (
        <Dashboard
          curricula={curricula}
          onOpen={setSelectedId}
          onNew={() => setModal({ kind: 'new-curriculum' })}
          onExport={() => exportCurricula(curricula)}
          onImport={handleImport}
          accountEmail={session?.user.email ?? null}
          syncStatus={syncStatus}
          onSignIn={() => setModal({ kind: 'sign-in' })}
          onSignOut={() => signOut()}
        />
      )}

      {modal.kind === 'sign-in' && (
        <Modal title="Sign in to sync" onClose={closeModal}>
          <SignInForm onSignIn={sendMagicLink} onClose={closeModal} />
        </Modal>
      )}

      {modal.kind === 'new-curriculum' && (
        <Modal title="New curriculum" onClose={closeModal}>
          <CurriculumForm onSubmit={createCurriculum} onCancel={closeModal} />
        </Modal>
      )}
      {modal.kind === 'edit-curriculum' && (
        <Modal title="Edit curriculum" onClose={closeModal}>
          <CurriculumForm
            initial={modal.curriculum}
            onSubmit={(values) => editCurriculum(modal.curriculum.id, values)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {modal.kind === 'new-unit' && (
        <Modal title="Add unit" onClose={closeModal}>
          <UnitForm
            defaultWeek={nextWeekFor(modal.curriculumId)}
            onSubmit={(values) => createUnit(modal.curriculumId, values)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {modal.kind === 'edit-unit' && (
        <Modal title="Edit unit" onClose={closeModal}>
          <UnitForm
            initial={modal.unit}
            defaultWeek={modal.unit.week}
            onSubmit={(values) => editUnit(modal.curriculumId, modal.unit.id, values)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {modal.kind === 'new-resource' && (
        <Modal title="Add item" onClose={closeModal}>
          <ResourceForm
            onSubmit={(values) => createResource(modal.curriculumId, modal.unitId, values)}
            onCancel={closeModal}
          />
        </Modal>
      )}
      {modal.kind === 'edit-resource' && (
        <Modal title="Edit item" onClose={closeModal}>
          <ResourceForm
            initial={modal.resource}
            onSubmit={(values) =>
              editResource(modal.curriculumId, modal.unitId, modal.resource.id, values)
            }
            onCancel={closeModal}
          />
        </Modal>
      )}
    </>
  );
}
