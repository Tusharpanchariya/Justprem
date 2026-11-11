const modules = [
  {
    title: "Module 01 · Deepening the Path of Bhakti",
    description: "Explore Bhakti Yoga more deeply and understand music as a spiritual practice and offering.",
    outcomes: ["The nine forms of Bhakti", "Nāda Yoga and sacred vibration", "Mantra as devotional practice", "Music as Seva", "Developing a personal devotional practice"],
  },
  {
    title: "Module 02 · Sanskrit & the Sacred Sound of Mantra",
    description: "Build clarity and confidence in Sanskrit pronunciation and mantra practice.",
    outcomes: ["Sanskrit vowels and consonants", "Short and long vowels", "Aspirated and unaspirated sounds", "IAST transliteration", "Pronunciation and singing practice for common mantras"],
  },
  {
    title: "Module 03 · Harmonium Mastery — All 12 Scales",
    description: "Develop musical independence across major and natural minor scales, with harmonium and voice working together.",
    outcomes: ["The 12 musical notes, semitones and whole tones", "All 12 major and natural minor scales", "Finger positioning and exercises", "Octaves and finding Sa for your voice", "Harmonium and vocal coordination"],
  },
  {
    title: "Module 04 · The Language of Harmony — Family Chords",
    description: "Understand chord relationships and learn how to find and adapt progressions for devotional songs.",
    outcomes: ["Major, minor and diminished chords", "Family chords in major and minor keys", "Tonic, subdominant and dominant functions", "Progressions, transitions and transposition", "Finding chords by listening and creating progressions"],
  },
  {
    title: "Module 05 · The World of Indian Classical Ragas",
    description: "Discover how ragas shape melody and explore the foundations of raga-based devotional expression.",
    outcomes: ["What makes a raga different from a scale", "Aroha, Avaroha, Vadi, Samvadi and Pakad", "Raga Yaman, Bhairav, Bhupali, Kafi and Durga", "Exploring ragas on harmonium", "Creating simple devotional melodic phrases"],
  },
  {
    title: "Module 06 · The Art of Kirtan — 20–25 Devotional Songs",
    description: "Learn a varied kirtan collection through mantra meaning, notation and guided harmonium and vocal practice.",
    outcomes: ["20–25 devotional kirtans", "Mantra meaning and Sanskrit pronunciation where relevant", "Musical keys, scales and Sargam notation", "Harmonium melodies, chord charts and progressions", "Slow and regular-speed practice demonstrations", "Request one additional kirtan for the team to review"],
  },
  {
    title: "Module 07 · Composition — Create Your Own Devotional Music",
    description: "Move beyond learning existing songs and begin shaping original devotional melodies.",
    outcomes: ["Musical phrases and Sargam patterns", "Raga-based melodic ideas", "The relationship between melody and chords", "Musical introductions and mantra variations", "Harmonium improvisation and a simple musical offering"],
  },
  {
    title: "Module 08 · Kirtan Leadership & Musical Expression",
    description: "Bring your learning together to prepare and lead a simple devotional gathering.",
    outcomes: ["Kirtan structure and choosing a key for your voice", "Call and response, group singing and rhythm", "Musical introductions, endings and transitions", "Building musical intensity", "Creating a complete kirtan set and final offering"],
  },
];

export function Level2Curriculum() {
  return (
    <section id="level-2-curriculum" className="border-y border-charcoal/15 bg-[#f4efe5] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] uppercase tracking-[.22em] text-wood md:text-xs">The Level 2 journey</p>
        <h2 className="mt-6 max-w-3xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[.9]">Eight modules.<br /><em className="text-[#ad684d]">A deeper practice.</em></h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-charcoal/70 md:text-base">Explore the course outline before enrolling. Module descriptions and learning outcomes are public; lesson videos, recordings and downloadable materials are reserved for enrolled students.</p>
        <div className="mt-10 space-y-3">
          {modules.map((module, index) => (
            <details key={module.title} className="group border border-charcoal/15 bg-ivory open:border-charcoal/30">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-5 font-serif text-xl marker:hidden md:p-6 md:text-2xl">
                <span>{module.title}</span><span className="font-sans text-xl text-[#ad684d] transition-transform group-open:rotate-45">+</span>
              </summary>
              <div className="border-t border-charcoal/10 px-5 pb-6 pt-5 md:px-6">
                <p className="max-w-3xl text-sm leading-6 text-charcoal/70">{module.description}</p>
                <p className="mt-5 text-[10px] uppercase tracking-[.2em] text-[#ad684d]">What you will explore</p>
                <ul className="mt-3 grid gap-x-8 gap-y-2 text-sm leading-6 text-charcoal/75 sm:grid-cols-2">
                  {module.outcomes.map((outcome) => <li key={outcome} className="flex gap-2"><span className="text-[#567262]">—</span><span>{outcome}</span></li>)}
                </ul>
                <p className="mt-5 text-xs text-charcoal/55">🔒 Lesson content is available to enrolled students after successful purchase.</p>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-5 text-xs text-charcoal/55">Module outlines are for information. Paid lessons and course materials are not available on this public page.</p>
      </div>
    </section>
  );
}
