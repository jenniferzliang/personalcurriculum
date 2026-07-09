import { Curriculum, newId } from './types';
import { artHistoryCurriculum, contemporaryArtCurriculum } from './artHistorySeed';

// Starter curriculums shown on first launch so the app isn't empty.
// They are fully editable and deletable like anything created in the UI.
export function seedCurricula(): Curriculum[] {
  const now = new Date().toISOString();
  return [
    {
      id: newId(),
      title: 'World History',
      description: 'A survey of world history from ancient civilizations to the modern era.',
      color: '#4f6df5',
      createdAt: now,
      units: [
        {
          id: newId(),
          week: 1,
          title: 'Ancient Civilizations',
          description: 'Mesopotamia, Egypt, and the Indus Valley.',
          resources: [
            {
              id: newId(),
              type: 'reading',
              title: 'Mesopotamia — World History Encyclopedia',
              url: 'https://www.worldhistory.org/Mesopotamia/',
              completed: false,
            },
            {
              id: newId(),
              type: 'video',
              title: 'Crash Course World History #1: The Agricultural Revolution',
              url: 'https://www.youtube.com/watch?v=Yocja_N5s1I',
              completed: false,
            },
          ],
        },
        {
          id: newId(),
          week: 2,
          title: 'Classical Antiquity',
          description: 'Greece and Rome.',
          resources: [
            {
              id: newId(),
              type: 'reading',
              title: 'Ancient Greece — World History Encyclopedia',
              url: 'https://www.worldhistory.org/greece/',
              completed: false,
            },
            {
              id: newId(),
              type: 'video',
              title: 'Crash Course World History #10: The Roman Empire',
              url: 'https://www.youtube.com/watch?v=oPf27gAup9U',
              completed: false,
            },
          ],
        },
      ],
    },
    artHistoryCurriculum(),
    contemporaryArtCurriculum(),
  ];
}
