import { Curriculum, Resource, ResourceType, Unit, newId } from './types';

function r(type: ResourceType, title: string, url?: string): Resource {
  return { id: newId(), type, title, url, completed: false };
}

function unit(week: number, title: string, description: string, resources: Resource[]): Unit {
  return { id: newId(), week, title, description, resources };
}

// World History, ~26 weeks in two phases:
// Phase 1 (weeks 1–9) covers foundations from the Agricultural Revolution to
// the medieval world — the ground the AP course assumes.
// Phase 2 (weeks 10–26) follows the nine units of AP World History: Modern
// (1200–present), roughly two weeks per unit.
// Spine: Crash Course World History videos, with free readings from the
// OpenStax textbook, Khan Academy's AP-aligned course, and World History
// Encyclopedia.
export function worldHistoryCurriculum(): Curriculum {
  return {
    id: newId(),
    title: 'World History',
    description:
      'From the Agricultural Revolution to globalization: foundations first (weeks 1–9), then the ' +
      'nine units of AP World History: Modern (weeks 10–26).',
    color: '#4f6df5',
    createdAt: new Date().toISOString(),
    units: [
      unit(1, 'Getting Started: Course Materials', 'Bookmark the core resources and set up a notes doc or flashcard deck for key terms.', [
        r('reading', 'OpenStax — World History, Volume 1: to 1500 (free textbook)', 'https://openstax.org/details/books/world-history-volume-1'),
        r('reading', 'OpenStax — World History, Volume 2: from 1400 (free textbook)', 'https://openstax.org/details/books/world-history-volume-2'),
        r('link', 'Crash Course World History — all 42 episodes', 'https://thecrashcourse.com/topic/worldhistory1/'),
        r('link', 'Khan Academy — World History Project (AP-aligned)', 'https://www.khanacademy.org/humanities/world-history-project-ap'),
        r('link', 'World History Encyclopedia', 'https://www.worldhistory.org'),
        r('link', "The Met — Heilbrunn Timeline of Art History", 'https://www.metmuseum.org/toah/'),
      ]),

      // ---- Phase 1: Foundations ----
      unit(1, 'The Agricultural Revolution & First Civilizations', 'Phase 1: Foundations. How farming changed everything.', [
        r('video', 'Crash Course #1 — The Agricultural Revolution', 'https://www.youtube.com/watch?v=Yocja_N5s1I'),
        r('video', 'Crash Course #2 — Indus Valley Civilization', 'https://www.youtube.com/watch?v=n7ndRwqJYDM'),
      ]),
      unit(2, 'Mesopotamia & Ancient Egypt', 'River valley civilizations of the Fertile Crescent and the Nile.', [
        r('video', 'Crash Course #3 — Mesopotamia', 'https://www.youtube.com/watch?v=sohXPx_XZ6Y'),
        r('video', 'Crash Course #4 — Ancient Egypt', 'https://www.youtube.com/watch?v=Z3Wvw6BivVI'),
        r('reading', 'Mesopotamia — World History Encyclopedia', 'https://www.worldhistory.org/Mesopotamia/'),
        r('reading', 'Ancient Egypt — World History Encyclopedia', 'https://www.worldhistory.org/egypt/'),
      ]),
      unit(3, 'Persia & Greece', 'The first world empire and the city-states that resisted it.', [
        r('video', 'Crash Course #5 — The Persians & Greeks', 'https://www.youtube.com/watch?v=Q-mkVSasZIM'),
        r('reading', 'Achaemenid Empire — World History Encyclopedia', 'https://www.worldhistory.org/Achaemenid_Empire/'),
        r('reading', 'Ancient Greece — World History Encyclopedia', 'https://www.worldhistory.org/greece/'),
      ]),
      unit(4, 'Ancient India & China', 'Hinduism, Buddhism, Confucius, and the Mandate of Heaven.', [
        r('video', 'Crash Course #6 — Buddha and Ashoka', 'https://www.youtube.com/watch?v=8Nn5uqE3C9w'),
        r('video', "Crash Course #7 — 2,000 Years of Chinese History! The Mandate of Heaven and Confucius", 'https://www.youtube.com/watch?v=ylWORyToTo4'),
      ]),
      unit(5, 'Rome & the Rise of Christianity', 'Republic, empire, and a small sect that took over both.', [
        r('video', 'Crash Course #10 — The Roman Empire. Or Republic. Or...Which Was It?', 'https://www.youtube.com/watch?v=oPf27gAup9U'),
        r('video', 'Crash Course #11 — Christianity from Judaism to Constantine', 'https://www.youtube.com/watch?v=TG55ErfdaeY'),
      ]),
      unit(6, 'Byzantium & the Rise of Islam', 'Rome continues in the East; a new faith reshapes three continents.', [
        r('video', 'Crash Course #12 — Fall of The Roman Empire...in the 15th Century', 'https://www.youtube.com/watch?v=3PszVWZNWVA'),
        r('video', 'Crash Course #13 — Islam, the Quran, and the Five Pillars', 'https://www.youtube.com/watch?v=TpcbfxtdoI8'),
        r('reading', 'Byzantine Empire — World History Encyclopedia', 'https://www.worldhistory.org/Byzantine_Empire/'),
      ]),
      unit(7, 'The Silk Road & Ancient Trade', 'Goods, ideas, and diseases in motion across Eurasia.', [
        r('video', 'Crash Course #9 — The Silk Road and Ancient Trade', 'https://www.youtube.com/watch?v=vfe-eNq-Qyg'),
        r('reading', 'Practice: trace the Silk Road on a map and note three goods and one idea that traveled it'),
      ]),
      unit(8, 'Medieval Africa & the Americas', 'Mali, the Swahili coast, and the Maya.', [
        r('video', 'Crash Course #16 — Mansa Musa and Islam in Africa', 'https://www.youtube.com/watch?v=jvnU0v6hcUo'),
        r('reading', 'Mali Empire — World History Encyclopedia', 'https://www.worldhistory.org/Mali_Empire/'),
        r('reading', 'Maya Civilization — World History Encyclopedia', 'https://www.worldhistory.org/Maya_Civilization/'),
      ]),
      unit(9, 'Medieval Europe & Phase 1 Review', 'How dark were the Dark Ages? Then a look back before the AP phase.', [
        r('video', 'Crash Course #14 — The Dark Ages...How Dark Were They, Really?', 'https://www.youtube.com/watch?v=QV7CanyzhZg'),
        r('reading', 'Phase 1 review: write a page connecting three civilizations you studied'),
      ]),

      // ---- Phase 2: AP World History: Modern ----
      unit(10, 'AP Unit 1 — The Global Tapestry (1200–1450)', 'Weeks 10–11. State-building across Song China, Dar al-Islam, Europe, Africa, and the Americas.', [
        r('reading', 'Khan Academy — Unit 1: The Global Tapestry', 'https://www.khanacademy.org/humanities/world-history-project-ap/xb41992e0ff5e0f09:unit-1-the-global-tapestry'),
        r('link', "Close looking: browse the Met Timeline for 1200–1450", 'https://www.metmuseum.org/toah/'),
      ]),
      unit(12, 'AP Unit 2 — Networks of Exchange (1200–1450)', 'Weeks 12–13. The Mongols, the Silk Roads revived, and the Indian Ocean world.', [
        r('video', 'Crash Course #17 — Wait For It...The Mongols!', 'https://www.youtube.com/watch?v=szxPar0BcMo'),
        r('reading', 'Mongol Empire — World History Encyclopedia', 'https://www.worldhistory.org/Mongol_Empire/'),
      ]),
      unit(14, 'AP Unit 3 — Land-Based Empires (1450–1750)', 'Weeks 14–15. Ottomans, Safavids, Mughals, Qing, and Romanovs.', [
        r('video', 'Crash Course #19 — Venice and the Ottoman Empire', 'https://www.youtube.com/watch?v=UN-II_jBzzo'),
        r('reading', 'OpenStax Vol. 2: chapters on the Islamic empires and early modern Asia', 'https://openstax.org/details/books/world-history-volume-2'),
      ]),
      unit(16, 'AP Unit 4 — Transoceanic Interconnections (1450–1750)', 'Weeks 16–17. The Age of Exploration, the Columbian Exchange, and the Atlantic world.', [
        r('video', 'Crash Course #21 — Columbus, de Gama, and Zheng He! 15th Century Mariners', 'https://www.youtube.com/watch?v=NjEGncridoQ'),
        r('video', 'Crash Course #23 — The Columbian Exchange', 'https://www.youtube.com/watch?v=HQPA5oNpfM4'),
        r('video', 'Crash Course #24 — The Atlantic Slave Trade', 'https://www.youtube.com/watch?v=dnV_MTFEGIY'),
      ]),
      unit(18, 'AP Unit 5 — Revolutions (1750–1900)', 'Weeks 18–19. The Enlightenment, the Atlantic revolutions, and the start of industrialization.', [
        r('reading', 'Khan Academy — Unit 5: Revolutions', 'https://www.khanacademy.org/humanities/world-history-project-ap/xb41992e0ff5e0f09:unit-5-revolutions'),
        r('video', 'Crash Course #28 — Tea, Taxes, and The American Revolution', 'https://www.youtube.com/watch?v=HlUiSBXQHCw'),
        r('video', 'Crash Course #29 — The French Revolution', 'https://www.youtube.com/watch?v=lTTvKwCylFY'),
        r('video', 'Crash Course #31 — Latin American Revolutions', 'https://www.youtube.com/watch?v=ZBw35Ze3bg8'),
        r('video', 'Crash Course #32 — Coal, Steam, and The Industrial Revolution', 'https://www.youtube.com/watch?v=zhL5DCizj5c'),
      ]),
      unit(20, 'AP Unit 6 — Consequences of Industrialization (1750–1900)', 'Weeks 20–21. Capitalism, socialism, and the age of empire.', [
        r('video', 'Crash Course #33 — Capitalism and Socialism', 'https://www.youtube.com/watch?v=B3u4EFTwprM'),
        r('video', 'Crash Course #35 — Imperialism', 'https://www.youtube.com/watch?v=alJaltUmrGo'),
      ]),
      unit(22, 'AP Unit 7 — Global Conflict (1900–present)', 'Weeks 22–23. The world wars and the revolutions between them.', [
        r('video', 'Crash Course #36 — Archdukes, Cynicism, and World War I', 'https://www.youtube.com/watch?v=_XPZQ0LAlR4'),
        r('video', "Crash Course #37 — Communists, Nationalists, and China's Revolutions", 'https://www.youtube.com/watch?v=UUCEeC4f6ts'),
        r('video', 'Crash Course #38 — World War II', 'https://www.youtube.com/watch?v=Q78COTwT7nE'),
      ]),
      unit(24, 'AP Unit 8 — Cold War & Decolonization', 'Weeks 24–25. A divided world and the end of empires.', [
        r('reading', 'Khan Academy — Unit 8: Cold War and Decolonization', 'https://www.khanacademy.org/humanities/world-history-project-ap/xb41992e0ff5e0f09:unit-8-cold-war-and-decolonization'),
        r('video', 'Crash Course #39 — USA vs USSR Fight! The Cold War', 'https://www.youtube.com/watch?v=y9HjvHZfCUI'),
        r('video', 'Crash Course #40 — Decolonization and Nationalism Triumphant', 'https://www.youtube.com/watch?v=T_sGTspaF4Y'),
      ]),
      unit(26, 'AP Unit 9 — Globalization', 'Week 26. The interconnected present — and course wrap-up.', [
        r('video', 'Crash Course #41 — Globalization I: The Upside', 'https://www.youtube.com/watch?v=5SnR-e0S6Ic'),
        r('video', 'Crash Course #42 — Globalization II: Good or Bad?', 'https://www.youtube.com/watch?v=s_iwrt7D5OA'),
        r('reading', 'Final reflection: which themes recurred across 10,000 years of history?'),
      ]),
    ],
  };
}
