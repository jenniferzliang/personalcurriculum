import { Curriculum, Resource, ResourceType, Unit, newId } from './types';

function r(type: ResourceType, title: string, url?: string): Resource {
  return { id: newId(), type, title, url, completed: false };
}

function unit(week: number, title: string, description: string, resources: Resource[]): Unit {
  return { id: newId(), week, title, description, resources };
}

// The original syllabus document, stored with the curriculum and viewable
// in the app via the "Syllabus" button.
export const WORLD_ISSUES_SYLLABUS = `# Personal World Issues Curriculum
**Level:** Beginner | **Focus:** Geopolitics & Conflict, Economics & Inequality, Human Rights & Democracy | **Pace:** 3–5 hours/week | **Duration:** 12 Weeks

---

## Overview

This curriculum builds your understanding of global affairs from the ground up. It is organized into three phases: foundational concepts, deeper dives into each topic area, and synthesis through current events. Each week includes reading, watching, and one reflective exercise to connect ideas to the real world.

---

## Phase 1: Foundations (Weeks 1–4)

*Build the mental map before diving into specifics.*

### Week 1 — How the World is Organized
- **Watch:** *Crash Course World History* (YouTube, free) — episodes on nation-states and globalization
- **Read:** *Prisoners of Geography* by Tim Marshall — Introduction and Chapter 1
- **Reflect:** Pick any two countries and think about how their geography shapes their political power

### Week 2 — The Global Economy Basics
- **Watch:** *Economics Explained* on YouTube — "How the Global Economy Works"
- **Read:** *23 Things They Don't Tell You About Capitalism* by Ha-Joon Chang — first five chapters
- **Reflect:** Why are some countries wealthy and others poor? Write down your working theory

### Week 3 — What Are Human Rights?
- **Read:** The Universal Declaration of Human Rights (30 articles, ~30 minutes — available free at un.org)
- **Explore:** Amnesty International's "Learn" section at amnesty.org
- **Reflect:** Which rights feel most contested or fragile in the world today, and why?

### Week 4 — Review & Connect
- **Practice:** Find one current news story in each of your three focus areas and apply what you've learned from the first three weeks
- **Start a habit:** Subscribe to a free daily news briefing such as *The Economist's "The World in Brief"* or the *BBC News daily newsletter*

---

## Phase 2: Going Deeper (Weeks 5–9)

*Dive into each topic with more nuance and complexity.*

### Weeks 5–6 — Geopolitics & Conflict
- **Read:** *Prisoners of Geography* by Tim Marshall — finish the book
- **Watch:** *Vox Borders* series on YouTube (free) — pick 3–4 episodes on regions that interest you
- **Listen:** *Foreign Policy's The Backstory* podcast or *Ones and Tooze*
- **Key questions to sit with:** Why do wars start? What does great-power competition mean today? How does geography constrain what leaders can actually do?

### Weeks 7–8 — Economics & Inequality
- **Read:** *Why Nations Fail* by Daron Acemoglu and James Robinson — Introduction and Part 1 (or *The Divide* by Jason Hickel for a more critical perspective)
- **Watch:** *Inequality for All* (documentary, available on major streaming platforms)
- **Explore:** *Our World in Data* at ourworldindata.org — browse the wealth, poverty, and inequality charts
- **Key questions to sit with:** Why does inequality persist despite economic growth? What do development economists most disagree about?

### Week 9 — Human Rights & Democracy
- **Read:** *The People vs. Democracy* by Yascha Mounk — Introduction and Part 1
- **Watch:** *Frontline* documentaries on press freedom or authoritarian governments (PBS, free at pbs.org/frontline)
- **Explore:** Freedom House's *Freedom in the World* annual report at freedomhouse.org
- **Key questions to sit with:** Is democracy in global decline? What are the main threats — internal or external?

---

## Phase 3: Synthesis & Habit-Building (Weeks 10–12)

*Connect the dots across topics and build a sustainable learning routine.*

### Week 10 — Where the Three Areas Intersect
Choose one country — Venezuela, Myanmar, and Sudan are good options — and research how geopolitics, economics, and human rights all interact in its recent history. Use Wikipedia for background, BBC Country Profiles for context, and the Council on Foreign Relations at cfr.org for analysis.

### Week 11 — Contested Perspectives
Deliberately seek out two opposing takes on one major issue. A good example is foreign aid: does it help developing nations or create dependency? Read a mainstream case for aid alongside critics like Dambisa Moyo's *Dead Aid*. The goal is not to pick a side but to understand the strongest version of each argument.

### Week 12 — Build Your Ongoing System
Design a simple weekly routine you can maintain long-term: one newsletter, one podcast, and 30 minutes of reading per week is enough to stay informed. Consider joining an online discussion community such as r/geopolitics or r/worldnews — read critically and check sources.

---

## Ongoing Resources

| Type | Recommendation |
|------|---------------|
| Newsletter | *The Economist's Espresso*, *Foreign Policy Daily Brief* |
| Podcast | *The Daily* (NYT), *Ones & Tooze*, *The Inquiry* (BBC) |
| Websites | ourworldindata.org, cfr.org, bbc.com/news, freedomhouse.org |
| YouTube | Vox, Kurzgesagt (global issues episodes), TLDR News Global |
| Non-Western news | Al Jazeera, The Hindu, African Arguments — for balance |

---

## A Few Tips

**Prioritize frameworks over facts.** Facts change; mental models last. Understanding *why* things happen matters more than memorizing *what* happened.

**Expect to feel overwhelmed early.** That's normal and fades quickly as patterns start to emerge across topics.

**Seek out non-Western sources.** Most English-language media reflects a particular worldview. Reading Al Jazeera, The Hindu, or African Arguments alongside Western outlets gives you a much fuller picture.

**Stay curious, not anxious.** The goal of this curriculum is not to feel despair about the world's problems but to understand them clearly enough to think about them well.
`;

export function worldIssuesCurriculum(): Curriculum {
  return {
    id: newId(),
    title: 'World Issues',
    description:
      'Beginner, 12 weeks at 3–5 hrs/week: geopolitics & conflict, economics & inequality, ' +
      'human rights & democracy — foundations, deep dives, then synthesis.',
    color: '#0ea5a4',
    createdAt: new Date().toISOString(),
    syllabus: WORLD_ISSUES_SYLLABUS,
    units: [
      unit(1, 'Getting Started: Ongoing Resources', 'Pick your recurring sources now — and remember the tips: frameworks over facts, seek non-Western sources, stay curious, not anxious.', [
        r('link', 'Our World in Data', 'https://ourworldindata.org'),
        r('link', 'Council on Foreign Relations', 'https://www.cfr.org'),
        r('link', 'BBC News', 'https://www.bbc.com/news'),
        r('link', 'Al Jazeera — for non-Western balance', 'https://www.aljazeera.com'),
        r('link', 'Freedom House', 'https://freedomhouse.org'),
        r('reading', 'Pick one newsletter and one podcast (e.g. The Economist Espresso, The Daily, Ones & Tooze, The Inquiry)'),
      ]),
      unit(1, 'How the World is Organized', 'Phase 1: Foundations. Week 1.', [
        r('reading', 'Prisoners of Geography (Tim Marshall) — Introduction & Chapter 1'),
        r('video', 'Crash Course World History — episodes on nation-states and globalization', 'https://thecrashcourse.com/topic/worldhistory1/'),
        r('reading', 'Reflect: pick two countries — how does geography shape their political power?'),
      ]),
      unit(2, 'The Global Economy Basics', 'Week 2.', [
        r('video', 'Economics Explained (YouTube) — how the global economy works', 'https://www.youtube.com/channel/UCZ4AMrDcNrfy3X6nsU8-rPg'),
        r('reading', "23 Things They Don't Tell You About Capitalism (Ha-Joon Chang) — chapters 1–5"),
        r('reading', 'Reflect: why are some countries wealthy and others poor? Write your working theory'),
      ]),
      unit(3, 'What Are Human Rights?', 'Week 3.', [
        r('reading', 'The Universal Declaration of Human Rights (30 articles, ~30 min)', 'https://www.un.org/en/about-us/universal-declaration-of-human-rights'),
        r('link', "Amnesty International — explore the Learn section", 'https://www.amnesty.org'),
        r('reading', 'Reflect: which rights feel most contested or fragile today, and why?'),
      ]),
      unit(4, 'Review & Connect', 'Week 4. Apply the foundations to the news.', [
        r('reading', 'Find one current news story in each focus area and apply weeks 1–3'),
        r('link', 'Start a habit: The Economist — The World in Brief (or the BBC daily newsletter)', 'https://www.economist.com/the-world-in-brief'),
      ]),
      unit(5, 'Geopolitics & Conflict', 'Phase 2: Going Deeper. Weeks 5–6.', [
        r('reading', 'Prisoners of Geography — finish the book'),
        r('video', 'Vox Borders — pick 3–4 episodes on regions that interest you', 'https://www.youtube.com/playlist?list=PLa5IUQM02ESEusbi_tAH5LN7CFJae8EiP'),
        r('link', 'Podcast: Ones and Tooze (Foreign Policy)', 'https://foreignpolicy.com/podcasts/ones-and-tooze/'),
        r('reading', 'Sit with: why do wars start? What does great-power competition mean today? How does geography constrain leaders?'),
      ]),
      unit(7, 'Economics & Inequality', 'Weeks 7–8.', [
        r('reading', 'Why Nations Fail (Acemoglu & Robinson) — Introduction & Part 1 (or The Divide by Jason Hickel for a critical take)'),
        r('video', 'Inequality for All — documentary (major streaming platforms)'),
        r('link', 'Our World in Data — browse the wealth, poverty, and inequality charts', 'https://ourworldindata.org'),
        r('reading', 'Sit with: why does inequality persist despite growth? What do development economists disagree about?'),
      ]),
      unit(9, 'Human Rights & Democracy', 'Week 9.', [
        r('reading', 'The People vs. Democracy (Yascha Mounk) — Introduction & Part 1'),
        r('video', 'Frontline (PBS) — documentaries on press freedom or authoritarian governments', 'https://www.pbs.org/wgbh/frontline/'),
        r('link', 'Freedom House — Freedom in the World annual report', 'https://freedomhouse.org/report/freedom-world'),
        r('reading', 'Sit with: is democracy in global decline? Are the main threats internal or external?'),
      ]),
      unit(10, 'Where the Three Areas Intersect', 'Phase 3: Synthesis. Week 10.', [
        r('reading', 'Case study: pick Venezuela, Myanmar, or Sudan — how do geopolitics, economics, and human rights interact in its recent history?'),
        r('link', 'BBC World — country coverage for context', 'https://www.bbc.com/news/world'),
        r('link', 'Council on Foreign Relations — analysis', 'https://www.cfr.org'),
      ]),
      unit(11, 'Contested Perspectives', 'Week 11. Understand the strongest version of each argument.', [
        r('reading', "Pick one issue (e.g. foreign aid) and read two opposing takes — a mainstream case for aid alongside critics like Dambisa Moyo's Dead Aid"),
      ]),
      unit(12, 'Build Your Ongoing System', 'Week 12. A routine you can keep: one newsletter, one podcast, 30 minutes of reading per week.', [
        r('reading', 'Design your weekly routine and write it down'),
        r('link', 'Optional: join r/geopolitics — read critically and check sources', 'https://www.reddit.com/r/geopolitics/'),
      ]),
    ],
  };
}
