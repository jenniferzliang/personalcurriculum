import { Curriculum, Resource, ResourceType, Unit, newId } from './types';

function r(type: ResourceType, title: string, url?: string): Resource {
  return { id: newId(), type, title, url, completed: false };
}

function unit(week: number, title: string, description: string, resources: Resource[]): Unit {
  return { id: newId(), week, title, description, resources };
}

// "Art History & Architecture" — a ~6-month Smarthistory-based curriculum:
// Phase 1 (weeks 1–14) follows the Art Appreciation syllabus below;
// Phase 2 (weeks 15–26) continues with the AP Art History syllabus.
// Some units span partial weeks in the source syllabus; the unit
// descriptions carry the exact day ranges.
export function artHistoryCurriculum(): Curriculum {
  return {
    id: newId(),
    title: 'Art History & Architecture',
    description:
      'Smarthistory-based, ~6 months: Art Appreciation (weeks 1–14), then AP Art History (weeks 15–26). ' +
      '1 hour/day, 5 days/week — keep Fridays light for review and close looking.',
    color: '#e0703a',
    createdAt: new Date().toISOString(),
    units: [
      unit(1, 'Getting Started: Course Materials', 'Bookmark the core resources and set up a notebook (or Anki deck) for key terms, sketches, and reflections.', [
        r('link', 'Smarthistory — Art Appreciation Syllabus (Phase 1)', 'https://smarthistory.org/curated-guide/art-appreciation/'),
        r('link', 'Smarthistory — AP Art History Syllabus (Phase 2)', 'https://smarthistory.org/curated-guide/ap-art-history/'),
        r('reading', 'Reframing Art History — free Smarthistory textbook', 'https://smarthistory.org/reframing-art-history/'),
        r('link', 'Google Arts & Culture — for close looking practice', 'https://artsandculture.google.com'),
        r('link', 'The Met — Heilbrunn Timeline of Art History', 'https://www.metmuseum.org/toah/'),
        r('link', 'Getty Museum education resources', 'https://www.getty.edu/education/'),
        r('link', 'edX — "What Do Architects and Urban Planners Do?" (free to audit)', 'https://www.edx.org'),
        r('link', 'edX — "Rethink the City" (free to audit)', 'https://www.edx.org'),
        r('link', 'MIT OpenCourseWare — search "architecture"', 'https://ocw.mit.edu'),
        r('link', 'Anki flashcards (optional, for vocabulary review)', 'https://apps.ankiweb.net/'),
      ]),
      unit(1, 'Unit 1 — Introduction', 'Week 1, Days 1–3.', [
        r('reading', "Why art history isn't like math", 'https://smarthistory.org/why-art-history-doesnt-explain-art/'),
        r('reading', 'Introduction to Art Appreciation', 'https://smarthistory.org/look-at-this-guide/'),
        r('reading', 'Why art matters (why look at art?)', 'https://smarthistory.org/why-look-at-art/'),
        r('reading', "Must art be beautiful? Picasso's Old Guitarist", 'https://smarthistory.org/art-must-be-beautiful/'),
      ]),
      unit(2, 'Unit 2 — Elements of Art', 'Week 1 Day 4 – Week 2 Day 3.', [
        r('reading', 'Line', 'https://smarthistory.org/line/'),
        r('reading', 'Shape and Form', 'https://smarthistory.org/shape-and-form/'),
        r('reading', 'Color', 'https://smarthistory.org/color/'),
        r('reading', 'Space', 'https://smarthistory.org/space/'),
        r('reading', 'Texture', 'https://smarthistory.org/texture/'),
        r('reading', 'Surface and Depth', 'https://smarthistory.org/surface-and-depth/'),
        r('reading', 'Light and Shadow', 'https://smarthistory.org/light-and-shadow/'),
        r('reading', 'Principles of Composition', 'https://smarthistory.org/principles-of-composition/'),
        r('reading', 'Balance, Symmetry, and Emphasis', 'https://smarthistory.org/balance-symmetry-and-emphasis/'),
        r('reading', 'Proportion and Scale', 'https://smarthistory.org/proportion-and-scale/'),
      ]),
      unit(3, 'Unit 3 — Tools for Looking and Interpreting', 'Week 2 Day 4 – Week 3 Day 3.', [
        r('reading', 'How to do visual (formal) analysis', 'https://smarthistory.org/how-to-do-visual-analysis/'),
        r('reading', 'Introduction to understanding art', 'https://smarthistory.org/introduction-to-art-historical-analysis/'),
        r('reading', 'Iconography and iconographic analysis, an introduction', 'https://smarthistory.org/iconography-and-iconographic-analysis/'),
        r('reading', 'Stefan Lochner, Madonna of the Rose Bower', 'https://smarthistory.org/lochner-madonna-of-the-rose-bower/'),
        r('reading', "Art historical analysis with Goya's Third of May, 1808", 'https://smarthistory.org/goya-third-of-may-1808/'),
        r('reading', 'On looking closely: Giorgio Morandi, Still Life', 'https://smarthistory.org/morandi-still-life/'),
        r('reading', 'Describing what you see: sculpture', 'https://smarthistory.org/describing-what-you-see-sculpture/'),
        r('reading', 'El Greco, The Burial of the Count of Orgaz', 'https://smarthistory.org/el-greco-the-burial-of-the-count-of-orgaz/'),
        r('reading', 'Seeing the passage of time', 'https://smarthistory.org/seeing-the-passage-of-time/'),
        r('reading', 'What is art provenance? A Getty Research Institute case study', 'https://smarthistory.org/what-is-art-provenance/'),
        r('reading', 'In full color, ancient sculpture reimagined', 'https://smarthistory.org/in-full-color-ancient-sculpture-reimagined/'),
        r('reading', 'Vincent van Gogh, Irises: the search for violet', 'https://smarthistory.org/van-gogh-irises/'),
      ]),
      unit(4, 'Unit 4 — Looted, Moved, and Destroyed', 'Week 3 Day 4 – Week 4 Day 3. Provenance, repatriation, and cultural heritage.', [
        r('reading', 'Lateran Obelisk', 'https://smarthistory.org/lateran-obelisk/'),
        r('reading', 'The Temple of Dendur', 'https://smarthistory.org/the-temple-of-dendur/'),
        r('reading', 'The Benin "Bronzes": a story of violence, theft, and artistry', 'https://smarthistory.org/the-benin-bronzes/'),
        r('reading', "Nazi looting: Egon Schiele's Portrait of Wally", 'https://smarthistory.org/schiele-portrait-of-wally/'),
        r('reading', 'Who owns the Parthenon sculptures?', 'https://smarthistory.org/who-owns-the-parthenon-sculptures/'),
        r('reading', 'Hagia Sophia as a mosque', 'https://smarthistory.org/hagia-sophia-as-a-mosque/'),
        r('reading', 'The Great Mosque of Córdoba', 'https://smarthistory.org/the-great-mosque-of-cordoba/'),
        r('reading', 'Piero della Francesca, Resurrection', 'https://smarthistory.org/piero-della-francesca-resurrection/'),
        r('reading', 'Bamiyan Buddhas', 'https://smarthistory.org/bamiyan-buddhas/'),
        r('reading', 'Ai Weiwei, Dropping a Han Dynasty Urn', 'https://smarthistory.org/ai-weiwei-dropping-a-han-dynasty-urn/'),
      ]),
      unit(5, 'Unit 5 — Materials & Techniques: Ceramics & Painting', 'Week 4 Day 4 – Week 5 Day 2.', [
        r('reading', 'What is ceramic art?', 'https://smarthistory.org/what-is-ceramic-art/'),
        r('reading', 'Moche Portrait Head Bottle', 'https://smarthistory.org/moche-portrait-head-bottle/'),
        r('reading', 'Exploring color in Mughal paintings', 'https://smarthistory.org/exploring-color-in-mughal-paintings/'),
        r('reading', 'A Mughal masterclass: how to make paint pigments from stones', 'https://smarthistory.org/mughal-masterclass-paint-pigments/'),
        r('reading', 'Using the most expensive pigment: Ultramarine Blue', 'https://smarthistory.org/ultramarine-blue/'),
        r('reading', 'Three kinds of paint: watercolor, tempera, and oil', 'https://smarthistory.org/three-kinds-of-paint/'),
        r('reading', 'Making green: tempera versus oil', 'https://smarthistory.org/making-green-tempera-versus-oil/'),
        r('reading', 'Renaissance watercolors: materials and techniques', 'https://smarthistory.org/renaissance-watercolors/'),
      ]),
      unit(6, 'Unit 6 — Materials & Techniques: Sculpture, Glass & Printmaking', 'Week 5 Day 3 – Week 6 Day 1.', [
        r('reading', "Donatello's marble carving technique", 'https://smarthistory.org/donatellos-marble-carving-technique/'),
        r('reading', 'Donatello, Madonna of the Clouds', 'https://smarthistory.org/donatello-madonna-of-the-clouds/'),
        r('reading', 'Stained glass in the Renaissance and modern world', 'https://smarthistory.org/stained-glass-in-the-renaissance-and-modern-world/'),
        r('reading', 'Printmaking in Europe, c. 1400−1800', 'https://smarthistory.org/printmaking-in-europe/'),
        r('reading', 'Francisco Goya, The Sleep of Reason Produces Monsters', 'https://smarthistory.org/goya-the-sleep-of-reason-produces-monsters/'),
      ]),
      unit(6, 'Unit 7 — Materials & Techniques: Photography, Textiles & Performance', 'Week 6, Days 2–5.', [
        r('reading', 'The Daguerreotype', 'https://smarthistory.org/the-daguerreotype/'),
        r('reading', 'Judy Chicago, The Dinner Party', 'https://smarthistory.org/judy-chicago-the-dinner-party/'),
        r('reading', 'Clarissa Rizal, Resilience Robe', 'https://smarthistory.org/clarissa-rizal-resilience-robe/'),
        r('reading', 'Gordon Parks, Off on My Own (Harlem, New York)', 'https://smarthistory.org/gordon-parks-off-on-my-own/'),
        r('reading', 'Mierle Laderman Ukeles, Washing/Tracks/Maintenance: Outside', 'https://smarthistory.org/mierle-laderman-ukeles/'),
      ]),
      unit(7, 'Unit 8 — Where We Find Art', 'Week 7. Caves, tombs, museums, and public space.', [
        r('reading', 'A brief history of the art museum', 'https://smarthistory.org/a-brief-history-of-the-art-museum/'),
        r('reading', 'Chauvet cave', 'https://smarthistory.org/chauvet-cave/'),
        r('reading', 'Longmen caves, Luoyang', 'https://smarthistory.org/longmen-caves-luoyang/'),
        r('reading', 'Maya Lin, Ghost Forest', 'https://smarthistory.org/maya-lin-ghost-forest/'),
        r('reading', 'James Turrell, Skyspace, the way of color', 'https://smarthistory.org/james-turrell-skyspace/'),
        r('reading', 'Newgrange, a prehistoric tomb in Ireland', 'https://smarthistory.org/newgrange/'),
        r('reading', 'The Terracotta Warriors', 'https://smarthistory.org/the-terracotta-warriors/'),
        r('reading', 'Diego Rivera, Detroit Industry Murals', 'https://smarthistory.org/diego-rivera-detroit-industry-murals/'),
        r('reading', 'Wheel of Existence', 'https://smarthistory.org/wheel-of-existence/'),
      ]),
      unit(8, 'Unit 9 — The Human Body & Early Architecture', 'Week 8. Post-and-lintel to the dome.', [
        r('reading', 'Standing Male Worshipper (Tell Asmar)', 'https://smarthistory.org/standing-male-worshipper-tell-asmar/'),
        r('reading', 'King Menkaure (Mycerinus) and queen', 'https://smarthistory.org/king-menkaure-mycerinus-and-queen/'),
        r('reading', 'Anavysos Kouros', 'https://smarthistory.org/anavysos-kouros/'),
        r('reading', 'Polykleitos, Doryphoros (Spear-Bearer)', 'https://smarthistory.org/polykleitos-doryphoros-spear-bearer/'),
        r('reading', 'Olmec Colossal Heads', 'https://smarthistory.org/olmec-colossal-heads/'),
        r('reading', 'The Treasury of Atreus', 'https://smarthistory.org/the-treasury-of-atreus/'),
        r('reading', 'Ancient Greek Temples at Paestum', 'https://smarthistory.org/greek-temples-at-paestum/'),
        r('reading', 'The Pantheon (Rome)', 'https://smarthistory.org/the-pantheon-rome/'),
        r('reading', 'The Colosseum', 'https://smarthistory.org/the-colosseum/'),
      ]),
      unit(9, 'Unit 10 — Early Middle Ages & Pilgrimage', 'Week 9.', [
        r('reading', 'The Symmachi Panel', 'https://smarthistory.org/the-symmachi-panel/'),
        r('reading', 'Basilica of Santa Sabina, Rome', 'https://smarthistory.org/basilica-of-santa-sabina-rome/'),
        r('reading', 'Hagia Sophia, Istanbul', 'https://smarthistory.org/hagia-sophia-istanbul/'),
        r('reading', 'Sutton Hoo Ship Burial', 'https://smarthistory.org/sutton-hoo-ship-burial/'),
        r('reading', "Bifolium from the Pink Qur'an", 'https://smarthistory.org/bifolium-from-the-pink-quran/'),
        r('reading', 'The Book of Kells', 'https://smarthistory.org/the-book-of-kells/'),
        r('reading', 'Skellig Michael', 'https://smarthistory.org/skellig-michael/'),
        r('reading', 'Islamic pilgrimages and sacred spaces', 'https://smarthistory.org/islamic-pilgrimages-and-sacred-spaces/'),
        r('reading', 'Why do people go on pilgrimage?', 'https://smarthistory.org/why-do-people-go-on-pilgrimage/'),
      ]),
      unit(10, 'Unit 11 — Early Modern Era: 15th & 16th Centuries', 'Week 10.', [
        r('reading', 'The Early Modern era: the 15th century', 'https://smarthistory.org/the-early-modern-era-the-15th-century/'),
        r('reading', 'The Early Modern era: the 16th century', 'https://smarthistory.org/the-early-modern-era-the-16th-century/'),
        r('reading', 'Filippo Brunelleschi, Dome of the Cathedral of Florence', 'https://smarthistory.org/filippo-brunelleschi-dome-of-the-cathedral-of-florence/'),
        r('reading', 'Mimar Sinan, Süleymaniye Mosque, Istanbul', 'https://smarthistory.org/mimar-sinan-suleymaniye-mosque-istanbul/'),
        r('reading', 'Hieronymus Bosch, The Garden of Earthly Delights', 'https://smarthistory.org/hieronymus-bosch-the-garden-of-earthly-delights/'),
        r('reading', 'El Greco, The Burial of the Count of Orgaz (revisit)', 'https://smarthistory.org/el-greco-the-burial-of-the-count-of-orgaz/'),
        r('reading', "Dürer's Rhinoceros: art, science, and the Northern Renaissance", 'https://smarthistory.org/durers-rhinoceros/'),
        r('reading', 'Jan van Eyck, The Arnolfini Portrait', 'https://smarthistory.org/jan-van-eyck-the-arnolfini-portrait/'),
        r('reading', 'Kilwa Kisiwani, Tanzania', 'https://smarthistory.org/kilwa-kisiwani-tanzania/'),
      ]),
      unit(11, 'Unit 12 — Early Modern Era: 17th & 18th Centuries', 'Week 11.', [
        r('reading', 'The Early Modern era: the 17th century', 'https://smarthistory.org/the-early-modern-era-the-17th-century/'),
        r('reading', 'The Early Modern era: the 18th century', 'https://smarthistory.org/the-early-modern-era-the-18th-century/'),
        r('reading', "Maria Sibylla Merian's Metamorphosis of a Small Emperor Moth", 'https://smarthistory.org/maria-sibylla-merian/'),
        r('reading', 'Francisco Clapera, set of sixteen casta paintings', 'https://smarthistory.org/francisco-clapera-casta-paintings/'),
        r('reading', 'The triangle trade and the colonial table: sugar, tea, and slavery', 'https://smarthistory.org/the-triangle-trade/'),
        r('reading', 'Peter Paul Rubens, Elevation of the Cross', 'https://smarthistory.org/peter-paul-rubens-elevation-of-the-cross/'),
        r('reading', 'Diego Velázquez, Las Meninas', 'https://smarthistory.org/diego-velazquez-las-meninas/'),
        r('reading', 'Ogata Kōrin, Red and White Plum Blossoms', 'https://smarthistory.org/ogata-korin-red-and-white-plum-blossoms/'),
      ]),
      unit(12, 'Unit 13 — 19th Century & Modern Art', 'Week 12.', [
        r('reading', 'Becoming modern in 19th-century Europe, an introduction', 'https://smarthistory.org/becoming-modern-in-19th-century-europe/'),
        r('reading', 'Théodore Géricault, Raft of the Medusa', 'https://smarthistory.org/theodore-gericault-raft-of-the-medusa/'),
        r('reading', 'How to recognize Monet: The Basin at Argenteuil', 'https://smarthistory.org/monet-the-basin-at-argenteuil/'),
        r('reading', 'Pablo Picasso, Guernica', 'https://smarthistory.org/pablo-picasso-guernica/'),
        r('reading', 'Jackson Pollock, Autumn Rhythm', 'https://smarthistory.org/jackson-pollock-autumn-rhythm/'),
        r('reading', 'Lee Bontecou, Untitled (No. 25)', 'https://smarthistory.org/lee-bontecou-untitled/'),
        r('reading', 'Lygia Clark, Bicho', 'https://smarthistory.org/lygia-clark-bicho/'),
      ]),
      unit(13, 'Unit 14 — Contemporary Art', 'Week 13.', [
        r('reading', 'Contemporary art, an introduction', 'https://smarthistory.org/contemporary-art-an-introduction/'),
        r('reading', 'Nam June Paik, Electronic Superhighway', 'https://smarthistory.org/nam-june-paik-electronic-superhighway/'),
        r('reading', 'Maya Lin, Vietnam Veterans Memorial', 'https://smarthistory.org/maya-lin-vietnam-veterans-memorial/'),
        r('reading', 'Yayoi Kusama, Infinity Mirrored Room', 'https://smarthistory.org/yayoi-kusama-infinity-mirrored-room/'),
        r('reading', 'Romare Bearden, Three Folk Musicians', 'https://smarthistory.org/romare-bearden-three-folk-musicians/'),
        r('reading', 'Song Dong, Waste Not', 'https://smarthistory.org/song-dong-waste-not/'),
        r('reading', 'Postmodernism', 'https://smarthistory.org/postmodernism/'),
      ]),
      unit(14, 'Review & Transition to AP', 'Week 14, lighter by design. Then Phase 2: the AP Art History syllabus (weeks 15–26).', [
        r('reading', 'Revisit your key terms from all 14 units'),
        r('link', 'Write a full formal analysis of a new work (pick one on Google Arts & Culture)', 'https://artsandculture.google.com'),
        r('link', 'Browse the AP Art History Syllabus and choose your starting unit', 'https://smarthistory.org/curated-guide/ap-art-history/'),
      ]),
    ],
  };
}
