import { Curriculum, newId } from './types';

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
    {
      id: newId(),
      title: 'Art History',
      description: 'From cave paintings to contemporary art.',
      color: '#e0703a',
      createdAt: now,
      units: [
        {
          id: newId(),
          week: 1,
          title: 'Prehistoric & Ancient Art',
          description: 'Cave paintings, Egyptian and Greek art.',
          resources: [
            {
              id: newId(),
              type: 'reading',
              title: 'Smarthistory — Prehistoric Art: an introduction',
              url: 'https://smarthistory.org/paleolithic-art-an-introduction/',
              completed: false,
            },
            {
              id: newId(),
              type: 'video',
              title: 'The Cave Art Debate — Smarthistory',
              url: 'https://smarthistory.org/chauvet-cave/',
              completed: false,
            },
          ],
        },
        {
          id: newId(),
          week: 2,
          title: 'The Renaissance',
          description: 'Italian and Northern Renaissance masters.',
          resources: [
            {
              id: newId(),
              type: 'reading',
              title: 'Smarthistory — Toward the High Renaissance',
              url: 'https://smarthistory.org/toward-the-high-renaissance/',
              completed: false,
            },
          ],
        },
      ],
    },
  ];
}
