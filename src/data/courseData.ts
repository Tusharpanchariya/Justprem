export interface Lesson {
  id: string;
  lessonNumber: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "practice" | "theory" | "song" | "audio";
  isPreview?: boolean;
  previewVideoUrl?: string;
  notes?: string[];
  keyTakeaway?: string;
}

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  subtitle: string;
  purpose: string;
  duration: string;
  lessonCount: number;
  talkingPoints: string[];
  lessons: Lesson[];
  demonstrations?: string[];
}

export interface KirtanSong {
  id: string;
  number: number;
  title: string;
  mantra: string;
  key: string;
  scaleType: "Major" | "Minor";
  focus: string;
  chordProgression: string;
  tempo: string;
  description: string;
}

export interface HandbookSection {
  number: number;
  title: string;
  subtitle: string;
  pages: string;
  description: string;
  highlights: string[];
}

export interface WeekPlan {
  week: number;
  title: string;
  focus: string;
  modulesCovered: string;
  practiceHours: string;
  outcome: string;
  sadhanaTip: string;
}

export interface Instructor {
  name: string;
  role: string;
  image: string;
  bio: string;
  credentials: string[];
}

export const COURSE_META = {
  id: "recorded-bhakti-foundation",
  badge: "LEVEL 1 · BEGIN YOUR JOURNEY",
  title: "Just Prem – Sound of Devotion",
  subtitle: "The Foundations of Sound, Voice, Harmonium & Bhakti Yoga",
  tagline: "A beginner-friendly first step into devotional music.",
  headline: "Understand the basics of music, recognise notes, play simple scales and chords, sing along with your harmonium and play your first kirtans.",
  priceEUR: 108,
  priceDisplay: "€108",
  durationWeeks: "Self-Paced · Lifetime Access",
  totalModules: 5,
  totalVideos: "15 Core Lessons",
  totalLessons: 15,
  totalKirtans: 7,
  handbookSections: 0,
  level: "Beginner Friendly · No Prior Music Theory Needed",
  language: "English with Sanskrit Mantra Phonetics",
  access: "Lifetime Access · All Devices",
  certificate: "",
  guarantee: "",
};

export const COURSE_PILLARS = [
  {
    number: "01",
    pillar: "UNDERSTAND",
      title: "The Awakening of Sound",
      description:
      "Discover Bhakti Yoga and Nada Yoga, and experience music, chanting and mantra as a path of devotion.",
    color: "#ad684d",
  },
  {
    number: "02",
    pillar: "PRACTICE",
      title: "Meet Your Harmonium & Find Your Voice",
      description:
      "Get comfortable with your instrument, recognise the notes, explore simple vocal practice and sing along at your own pace.",
    color: "#567262",
  },
  {
    number: "03",
    pillar: "EXPRESS",
      title: "Learn the Language of Music & Your First Kirtans",
      description:
      "Explore foundational scales, chords and chord families, then bring them together in your first devotional songs.",
    color: "#a07e5b",
  },
];

export const COURSE_MODULES: CourseModule[] = [
  { id: "module-1", moduleNumber: "01", title: "THE AWAKENING OF SOUND", subtitle: "Discover music as a path of devotion", purpose: "A gentle introduction to the people, ideas and devotional practices at the heart of Just Prem – Sound of Devotion.", duration: "4 lessons", lessonCount: 4, talkingPoints: ["Meet the course teachers and team", "Discover the inspiration behind the course", "Understand the foundations of Bhakti Yoga", "Explore Nada Yoga, sound, chanting and mantra"], lessons: [
    { id: "1.1", lessonNumber: "1.1", title: "Welcome to Just Prem", description: "Meet your teachers and team, and learn how to find your way through the course.", duration: "Lesson", type: "video", isPreview: true, previewVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
    { id: "1.2", lessonNumber: "1.2", title: "My Journey with Music & Bhakti", description: "The personal inspiration behind this course and the path of devotional music.", duration: "Lesson", type: "video" },
    { id: "1.3", lessonNumber: "1.3", title: "Introduction to Bhakti Yoga", description: "An introduction to devotion and music as a way to connect with the heart.", duration: "Lesson", type: "theory" },
    { id: "1.4", lessonNumber: "1.4", title: "Introduction to Nada Yoga", description: "Discover the role of sound, chanting and mantras in devotional practice.", duration: "Lesson", type: "theory" },
  ] },
  { id: "module-2", moduleNumber: "02", title: "MEET YOUR HARMONIUM", subtitle: "Become comfortable with your instrument", purpose: "Get to know the harmonium step by step, find a comfortable way to play and begin recognising notes.", duration: "3 lessons", lessonCount: 3, talkingPoints: ["Learn the parts of your harmonium", "Practise a comfortable sitting posture and hand position", "Use the bellows and place your fingers", "Find Sa Re Ga Ma Pa Dha Ni Sa on the keys"], lessons: [
    { id: "2.1", lessonNumber: "2.1", title: "Getting to Know Your Harmonium", description: "A friendly introduction to the harmonium's parts, keys, bellows and reeds.", duration: "Lesson", type: "video" },
    { id: "2.2", lessonNumber: "2.2", title: "How to Play", description: "Explore sitting posture, hand and finger placement, and a steady bellows technique.", duration: "Lesson", type: "practice" },
    { id: "2.3", lessonNumber: "2.3", title: "Discovering the Musical Notes", description: "Find Sa Re Ga Ma Pa Dha Ni Sa on your harmonium and begin to recognise notes by listening and playing.", duration: "Lesson", type: "practice" },
  ] },
  { id: "module-3", moduleNumber: "03", title: "FIND YOUR VOICE", subtitle: "Explore singing with patience and confidence", purpose: "Begin with simple listening and vocal exercises, then connect your voice with the notes on your harmonium.", duration: "3 lessons", lessonCount: 3, talkingPoints: ["Learn the basic Sargam sequence", "Try gentle pitch and listening exercises", "Build confidence through practice", "Sing along with your harmonium"], lessons: [
    { id: "3.1", lessonNumber: "3.1", title: "Introduction to Sargam", description: "Learn Sa Re Ga Ma Pa Dha Ni Sa as a simple way to explore musical notes with your voice.", duration: "Lesson", type: "theory" },
    { id: "3.2", lessonNumber: "3.2", title: "Your First Vocal Practice", description: "Gentle exercises to develop pitch, listening and confidence, at a pace that feels comfortable.", duration: "Lesson", type: "practice" },
    { id: "3.3", lessonNumber: "3.3", title: "Singing with Your Harmonium", description: "Connect your voice with the notes you play and begin singing along with your instrument.", duration: "Lesson", type: "practice" },
  ] },
  { id: "module-4", moduleNumber: "04", title: "UNDERSTANDING THE LANGUAGE OF MUSIC", subtitle: "Learn the basics you need to start playing", purpose: "Make scales and chords approachable, with a few foundational examples and a simple way to understand which chords work together.", duration: "4 lessons", lessonCount: 4, talkingPoints: ["Understand the difference between major and minor", "Learn A, B, C and D major and minor scales", "Learn A, B, C and D major and minor chords", "Discover simple chord families"], lessons: [
    { id: "4.1", lessonNumber: "4.1", title: "Introduction to Scales", description: "Understand what a scale is and explore the difference between major and minor sounds.", duration: "Lesson", type: "theory" },
    { id: "4.2", lessonNumber: "4.2", title: "Your First Four Scales", description: "Practise A, B, C and D major and minor scales on your harmonium.", duration: "Lesson", type: "practice" },
    { id: "4.3", lessonNumber: "4.3", title: "Your First Four Chords", description: "Learn A, B, C and D major and minor chords as foundations for accompanying songs.", duration: "Lesson", type: "practice" },
    { id: "4.4", lessonNumber: "4.4", title: "Understanding Chord Families", description: "Learn simple formulas that help you discover which chords belong together.", duration: "Lesson", type: "theory" },
  ] },
  { id: "module-5", moduleNumber: "05", title: "YOUR FIRST KIRTAN", subtitle: "Bring the foundations together through devotional music", purpose: "Explore how chords support a song, learn beginner-friendly kirtans and bring voice and harmonium together in practice.", duration: "3 lessons", lessonCount: 3, talkingPoints: ["Understand simple chord progressions", "Learn your first devotional songs", "Practise singing and playing together", "Continue with guided musical meditation and free singing"], lessons: [
    { id: "5.1", lessonNumber: "5.1", title: "Understanding Chord Progressions", description: "See how chords can work together to support the flow of a song.", duration: "Lesson", type: "theory" },
    { id: "5.2", lessonNumber: "5.2", title: "Learning Your First Kirtans", description: "Learn Sita Ram, Hare Krishna, Gurudev, Shiva Shambho, Kali Durge, Hanuman and Ganesha using the scales and chords introduced in the course.", duration: "Lesson", type: "song" },
    { id: "5.3", lessonNumber: "5.3", title: "Singing & Playing Together", description: "Put your first notes, chords and vocal practice together in a gentle musical practice.", duration: "Lesson", type: "practice" },
  ] },
];

export const KIRTAN_REPERTOIRE: KirtanSong[] = [
  {
    id: "kirtan-1",
    number: 1,
    title: "Om Namah Shivaya",
    mantra: "Om Namah Shivaya · Om Namah Shivaya",
    key: "C Major",
    scaleType: "Major",
    focus: "Basic Major Chords Foundation (I, IV, V)",
    chordProgression: "C - F - G - C",
    tempo: "Slow & Meditative (64 BPM)",
    description: "The timeless five-syllable mantra honoring inner consciousness and pure awareness. Perfect for learning foundational major hand shapes and steady bellows.",
  },
  {
    id: "kirtan-2",
    number: 2,
    title: "Radhe Radhe Govinda",
    mantra: "Radhe Radhe Govinda Gopala Radhe",
    key: "G Major",
    scaleType: "Major",
    focus: "Simple 2-3 Chord Folk Progression",
    chordProgression: "G - C - D - G",
    tempo: "Lively & Sweet (84 BPM)",
    description: "A beloved Vrindavan folk kirtan invoking the sweetness of Radha and Krishna. Teaches fluid thumb pivoting and cheerful call-and-response rhythm.",
  },
  {
    id: "kirtan-3",
    number: 3,
    title: "Sri Krishna Chaitanya",
    mantra: "Jaya Sri Krishna Chaitanya Prabhu Nityananda",
    key: "D Major",
    scaleType: "Major",
    focus: "Dynamic Chord Changes & Minor vi Touch",
    chordProgression: "D - G - A - Bm",
    tempo: "Flowing & Devotional (76 BPM)",
    description: "Pancha Tattva invocation of unconditional grace. Teaches introducing the relative minor chord (Bm) into a major key for deep emotional resonance.",
  },
  {
    id: "kirtan-4",
    number: 4,
    title: "Sita Ram Hanuman",
    mantra: "Sri Ram Jaya Ram Jaya Jaya Ram · Sita Ram Sita Ram",
    key: "F Major",
    scaleType: "Major",
    focus: "Singing & Playing Coordination with Flat Keys",
    chordProgression: "F - Bb - C - Dm",
    tempo: "Steady & Heartfelt (72 BPM)",
    description: "Heart-centered chant honoring devotion and courage. Introduces Bb major key shape and synchronizing vocal breath with chord changes.",
  },
  {
    id: "kirtan-5",
    number: 5,
    title: "Hare Krishna Mahamantra (Major)",
    mantra: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare / Hare Rama Hare Rama Rama Rama Hare Hare",
    key: "C Major",
    scaleType: "Major",
    focus: "Full Accompaniment & Rhythmic Acceleration",
    chordProgression: "C - G - Am - F",
    tempo: "Gradually Building (68 → 108 BPM)",
    description: "The great liberating mantra. Master the classic I-V-vi-IV progression used in gatherings worldwide, building from gentle whisper to ecstatic peak.",
  },
  {
    id: "kirtan-6",
    number: 6,
    title: "Maha Mrityunjaya Mantra",
    mantra: "Om Tryambakam Yajamahe Sugandhim Pushti-Vardhanam",
    key: "A Minor",
    scaleType: "Minor",
    focus: "Natural Minor Chord Foundation (i, VII, VI)",
    chordProgression: "Am - G - F - Em",
    tempo: "Solemn & Ancient (60 BPM)",
    description: "A Vedic healing chant evoking immortality and spiritual awakening. Establishes the introspective beauty of the natural minor chord family.",
  },
  {
    id: "kirtan-7",
    number: 7,
    title: "Govinda Jaya Jaya",
    mantra: "Govinda Jaya Jaya Gopala Jaya Jaya · Radha Ramana Hari",
    key: "D Minor",
    scaleType: "Minor",
    focus: "Minor Devotional Progressions & Harmonic V",
    chordProgression: "Dm - C - Bb - A Major",
    tempo: "Soulful (70 BPM)",
    description: "Deep yearning chant. Features the exotic, devotional lift of the major V chord (A) in a D minor key, characteristic of Indian classical bhajan singing.",
  },
  {
    id: "kirtan-8",
    number: 8,
    title: "Lokah Samastah Sukhino Bhavantu",
    mantra: "Lokah Samastah Sukhino Bhavantu · Om Shanti Shanti Shanti",
    key: "E Minor",
    scaleType: "Minor",
    focus: "Intricate Melody & Soft Chord Holds",
    chordProgression: "Em - C - D - Bm",
    tempo: "Gentle & Prayerful (62 BPM)",
    description: "Universal dedication of peace for all living beings. Teaches holding a single sustained chord while singing intricate melodic ornamentation above it.",
  },
  {
    id: "kirtan-9",
    number: 9,
    title: "Shiva Shambho",
    mantra: "Jaya Jaya Shiva Shambho · Mahadeva Shambho",
    key: "A Minor",
    scaleType: "Minor",
    focus: "Rhythmic Trance & Vocal Dynamics",
    chordProgression: "Am - Dm - G - C",
    tempo: "Dynamic Build (72 → 116 BPM)",
    description: "Powerful chant celebrating transformation. Teaches accelerating the bellows pulse and driving the circle through steady rhythmic momentum.",
  },
  {
    id: "kirtan-10",
    number: 10,
    title: "Radhe Shyam Devotional Aarti",
    mantra: "Sri Radhe Radhe Radhe Shyam · Govinda Radhe Radhe Shyam",
    key: "C Minor",
    scaleType: "Minor",
    focus: "Master Kirtan Practice & Complete Offering",
    chordProgression: "Cm - Ab - Bb - G Major",
    tempo: "Deep & Reverent (66 BPM)",
    description: "The capstone repertoire piece combining everything learned: rich minor chords, high vocal resonance, subtle pauses, and absolute spiritual surrender.",
  },
];

export const HANDBOOK_SECTIONS: HandbookSection[] = [
  {
    number: 1,
    title: "Harmonium Guide",
    subtitle: "Anatomy, Keyboard, Bellows & Posture",
    pages: "Pages 4–9",
    description: "Clear visual diagrams of harmonium parts, bellows mechanics, lock safety, and ergonomic sitting postures with sit-bone alignment.",
    highlights: ["Diagram of full instrument structure", "Bellows airflow troubleshooting guide", "Ergonomic sitting postures"],
  },
  {
    number: 2,
    title: "Swara & Western Master Chart",
    subtitle: "Sa Re Ga Ma and C D E F G A B Mapping",
    pages: "Pages 10–13",
    description: "Comprehensive dual-system chart comparing Indian Saptak swaras with Western notation, complete with frequency and emotional tone.",
    highlights: ["Color-coded keyboard overlay", "Movable Sa transposition guide", "Saptak (octave) visual index"],
  },
  {
    number: 3,
    title: "Finger Agility & Number Drills",
    subtitle: "Agility Exercises 1 to 5",
    pages: "Pages 14–19",
    description: "Numbered fingering exercises to develop thumb flexibility, smooth legato transitions, and finger independence without cramping.",
    highlights: ["Thumb-under pivot drills", "Finger independence warmups", "Legato continuity checklist"],
  },
  {
    number: 4,
    title: "All 12 Major Scales",
    subtitle: "Complete Visual Keyboard Charts",
    pages: "Pages 20–25",
    description: "Every single major scale laid out visually on the keyboard with exact fingering numbers and the Tone-Tone-Semitone formula.",
    highlights: ["C, D, E, F, G, A, B + 5 accidental scales", "Fingering numbers for every key", "Formula breakdown reference"],
  },
  {
    number: 5,
    title: "All 12 Natural Minor Scales",
    subtitle: "The Longing Sound of Devotion",
    pages: "Pages 26–31",
    description: "Complete visual guide to all 12 natural minor scales, showing their root relationships and key signatures on keyboard diagrams.",
    highlights: ["All 12 natural minor visual scales", "Comparison with parallel majors", "Devotional bhāva notes"],
  },
  {
    number: 6,
    title: "Chord Guide & Triad Formulas",
    subtitle: "Major, Minor and Diminished Formulas",
    pages: "Pages 32–37",
    description: "Intuitive guide explaining root, 3rd, and 5th intervals, major vs minor emotional colors, and inverted chord fingerings.",
    highlights: ["Root-3rd-5th interval calculator", "Major vs minor side-by-side comparison", "Hand shape diagrams"],
  },
  {
    number: 7,
    title: "All 12 Major Family Chords",
    subtitle: "The Master Harmony Matrix",
    pages: "Pages 38–43",
    description: "The complete matrix of I, ii, iii, IV, V, vi, vii° chords for all 12 keys. The ultimate cheat-sheet to play any song without memorization.",
    highlights: ["Full 12-key chord matrix", "Roman numeral breakdown", "Chord substitution cheatsheet"],
  },
  {
    number: 8,
    title: "All 12 Minor Family Chords",
    subtitle: "Natural Minor Harmony Matrix",
    pages: "Pages 44–49",
    description: "Complete matrix of minor family chords (i - ii° - III - iv - v - VI - VII), including the harmonic major V chord variations.",
    highlights: ["All 12 natural minor families", "Harmonic V chord guide", "Minor voice-leading tips"],
  },
  {
    number: 9,
    title: "Devotional Progressions Cheatsheet",
    subtitle: "The Most Common Kirtan Flows",
    pages: "Pages 50–55",
    description: "Quick-reference pocket guide of common kirtan chord loops (I-IV-V, I-V-vi-IV, vi-IV-I-V, i-VI-III-VII) with real song examples.",
    highlights: ["Major devotional progression loops", "Minor devotional progression loops", "Rhythm & transition markings"],
  },
  {
    number: 10,
    title: "Vocal Practice & Breath Work",
    subtitle: "Breath, Humming & Vowel Drills",
    pages: "Pages 56–61",
    description: "Step-by-step vocal exercises, diaphragmatic breath tracking, Bhramari humming instructions, and chakra sound frequency charts.",
    highlights: ["Daily 10-minute vocal routine", "Chakra resonance frequency chart", "Jaw release checklist"],
  },
  {
    number: 11,
    title: "Swara Practice: Aroha, Avaroha & Alankars",
    subtitle: "Indian Vocal Melodic Exercises",
    pages: "Pages 62–67",
    description: "Notation for 15 essential Indian Alankars (palte) to practice pitch agility, ear precision, and fluid vocal articulation.",
    highlights: ["15 core classical Alankars", "Aroha / Avaroha practice sheet", "Tanpura synchronization notes"],
  },
  {
    number: 12,
    title: "The 10-Kirtan Songbook",
    subtitle: "Lyrics, Chords, Scales & Meanings",
    pages: "Pages 68–87",
    description: "Full sheet music and chord lead sheets for all 10 course kirtans, with word-for-word Sanskrit translations, keys, and melodies.",
    highlights: ["Large print easy-to-read chords", "Sanskrit lyrics with English phonetics", "Spiritual meaning & bhāva commentary"],
  },
  {
    number: 13,
    title: "Daily Practice Sadhana Journal",
    subtitle: "10-Week Progress & Habit Tracker",
    pages: "Pages 88–97",
    description: "Printable daily practice journal to log time, warmups, challenges, devotional reflections, and track your 10-week evolution.",
    highlights: ["Daily habit checkboxes", "Reflection prompts for each week", "Coordination milestone tracker"],
  },
  {
    number: 14,
    title: "Final Offering & Kirtan Set Planner",
    subtitle: "Space to Build Your Sacred Gathering",
    pages: "Pages 98–104",
    description: "Curated templates to plan your own kirtan gatherings: opening, invocation chant, main kirtan, tempo build, closing silence, and prayers.",
    highlights: ["5-Part Kirtan Arch planner template", "Group circle spaceholding checklist", "Capstone submission guide"],
  },
];

export const WEEKLY_ROADMAP: WeekPlan[] = [
  {
    week: 1,
    title: "Bhakti, Sound & Sacred Arriving",
    focus: "Module 1: The philosophy of Nāda Yoga, Bhakti, and meeting your inner sound.",
    modulesCovered: "Module 1 (Lessons 1.1 - 1.5)",
    practiceHours: "15-20 mins daily",
    outcome: "Deep inner clarity on why you play, setting up a sacred practice space, and connecting breath with intention.",
    sadhanaTip: "Light a candle and sit in silence for 2 minutes before opening your harmonium.",
  },
  {
    week: 2,
    title: "Keyboard, Swaras & Bellows Freedom",
    focus: "Module 2: Instrument anatomy, smooth airflow, comfortable posture, and Middle C.",
    modulesCovered: "Module 2 (Lessons 2.1 - 2.6)",
    practiceHours: "20 mins daily",
    outcome: "Effortless, silent bellows pumping without sound breaks; comfortable sitting without back or wrist fatigue.",
    sadhanaTip: "Practice pumping with your eyes closed, feeling the air pressure through your fingertips.",
  },
  {
    week: 3,
    title: "Musical Language & 12 Scales",
    focus: "Module 3: Sa Re Ga Ma vs C D E F G A B, finger agility, and the movable Sa.",
    modulesCovered: "Module 3 (Lessons 3.1 - 3.6)",
    practiceHours: "20-25 mins daily",
    outcome: "Fluid numbered fingering; finding Middle C instantly; understanding the 12 chromatic keys.",
    sadhanaTip: "Sing the swara name aloud every single time you strike a key.",
  },
  {
    week: 4,
    title: "Major & Minor Scales and Triad Chords",
    focus: "Module 4 (Part A): Scale formulas (T-T-S-T-T-T-S) and Root-3rd-5th chord construction.",
    modulesCovered: "Module 4 (Lessons 4.1 - 4.4)",
    practiceHours: "25 mins daily",
    outcome: "Building any major and minor scale on demand; forming major and minor triad chords effortlessly.",
    sadhanaTip: "Notice how the 3rd note shifts the mood from bright morning sun to gentle evening twilight.",
  },
  {
    week: 5,
    title: "The Family Chords Breakthrough",
    focus: "Module 4 (Part B): The I-ii-iii-IV-V-vi-vii° matrix, chord progressions, and ear training.",
    modulesCovered: "Module 4 (Lessons 4.5 - 4.9)",
    practiceHours: "25-30 mins daily",
    outcome: "Understanding the family chords secret; playing common kirtan chord progressions without memorizing sheets.",
    sadhanaTip: "Loop the C - F - G - C progression while breathing in rhythm.",
  },
  {
    week: 6,
    title: "Awakening the Voice & Resonance",
    focus: "Module 5 (Part A): Diaphragmatic breath, Bhramari humming, and the 5 sacred vowels.",
    modulesCovered: "Module 5 (Lessons 5.1 - 5.5)",
    practiceHours: "20 mins daily",
    outcome: "Releasing throat tension, discovering effortless facial mask resonance, and sustained tone support.",
    sadhanaTip: "Hum gently like a bumblebee on exhalations before vocalizing vowel sounds.",
  },
  {
    week: 7,
    title: "Saptak Swaras, Alankars & Tanpura Sync",
    focus: "Module 5 (Part B): Chakra sounds, Alankars, and pitch matching with C Tanpura drone.",
    modulesCovered: "Module 5 (Lessons 5.6 - 5.10)",
    practiceHours: "25 mins daily",
    outcome: "Laser-accurate pitch matching with Tanpura; singing Aroha/Avaroha with confidence; brain-hand coordination.",
    sadhanaTip: "Practice with the 10-minute C Tanpura track using headphones to feel the beating waves vanish.",
  },
  {
    week: 8,
    title: "First Five Kirtans (Major Repertoire)",
    focus: "Module 6 (Part A): Kirtans 1 through 5 (Om Namah Shivaya, Radhe Govinda, Krishna Chaitanya, Sita Ram, Hare Krishna).",
    modulesCovered: "Module 6 (Lessons 6.1 - 6.5)",
    practiceHours: "30 mins daily",
    outcome: "Confidently playing and singing 5 uplifting major kirtans from memory with full accompaniment.",
    sadhanaTip: "Practice the 8-step song method: listen → melody → chords → sing slowly → offer fully.",
  },
  {
    week: 9,
    title: "Next Five Kirtans (Minor Devotion)",
    focus: "Module 6 (Part B): Kirtans 6 through 10 (Maha Mrityunjaya, Govinda Jaya, Lokah Samastah, Shiva Shambho, Radhe Shyam).",
    modulesCovered: "Module 6 (Lessons 6.6 - 6.10)",
    practiceHours: "30 mins daily",
    outcome: "Mastering deep introspective minor progressions, emotional dynamics, and tempo building.",
    sadhanaTip: "Let your heart feel the yearning in the minor chords before you even open your mouth.",
  },
  {
    week: 10,
    title: "Leading Kirtan & Your Sacred Capstone",
    focus: "Modules 7 & 8: Holding space, call-and-response, 5-part kirtan set, and your graduation Capstone.",
    modulesCovered: "Modules 7 & 8 (Lessons 7.1 - 8.6)",
    practiceHours: "30-45 mins daily",
    outcome: "Ability to comfortably lead a kirtan gathering with friends or community; completion of your Capstone recording.",
    sadhanaTip: "Offer your final kirtan not for approval or applause, but as pure seva to the Divine.",
  },
];

export const INSTRUCTORS: Instructor[] = [
  {
    name: "Shoorsena Das",
    role: "Bhakti Guide · Harmonium Teacher & Founder",
    image: "/course_images/shoorsena.jpeg",
    bio: "Shoorasena Das alchemized the seed planted during his own healing journey in the Himalayas into Just Prem. With over a decade of personal kirtan practice, his teaching demystifies music theory into an intuitive, heart-centered spiritual practice.",
    credentials: [
      "Founder of Just Prem & Sound of Devotion Academy",
      "Over 12 years of Himalayan kirtan & Bhakti mentorship",
      "Trained hundreds of students from complete beginners to confident spaceholders",
    ],
  },
  {
    name: "Anup Singh",
    role: "Voice, Mantra & Sacred Sound Master",
    image: "/course_images/anupSingh.jpeg",
    bio: "Classically trained Indian musician and multi-instrumentalist with over 20 years of vocal and rāga expertise. Blends traditional classical rigor with heart-centered presence to help students discover their natural, unforced voice.",
    credentials: [
      "20+ years classical Indian vocal and instrumental expertise",
      "Specialist in Nāda Yoga, Sanskrit phonetics, and vocal resonance",
      "Concert kirtan accompanist and meditation sound guide",
    ],
  },
  {
    name: "Aika",
    role: "Yoga, Meditation & Community Host",
    image: "/course_images/aika.jpeg",
    bio: "Devoted kirtan leader, singer, and community catalyst who has spent years exploring sacred music across Asia. Helps students anchor somatic relaxation, mindful breath, and compassionate presence into daily life.",
    credentials: [
      "Community Manager of Just Prem Global Family",
      "Over 10 years of sacred chant, meditation, and seva leadership",
      "Guide for breathwork, somatic relaxation, and group circle harmony",
    ],
  },
];

export const FAQS = [
  {
    question: "Do I need any prior musical experience or theory background?",
    answer:
      "No previous musical experience or music theory is needed. The course begins with the basics and guides you through recognising notes, practising Sargam, exploring scales and chords, and learning your first kirtans.",
  },
  {
    question: "What kind of harmonium do I need to take this course?",
    answer:
      "Any standard harmonium (2.5 to 3.5 octaves) works beautifully! Whether you have a travel folding harmonium, a box standard model, or a high-end Just Prem instrument with Palitana reeds, the keys and physics are identical. Even if your harmonium is tuned to 440 Hz or 432 Hz, all formulas and fingerings remain 100% the same.",
  },
  {
    question: "What if I think I cannot sing or have a bad voice?",
    answer:
      "You are welcome even if you feel shy about singing. The course starts with simple vocal and listening exercises, then helps you connect your voice with the notes on your harmonium at your own pace.",
  },
  {
    question: "How long do I have access to the course videos and materials?",
    answer:
      "You receive lifetime recorded access, so you can revisit the course lessons at your own pace.",
  },
  {
    question: "How is this course different from random YouTube tutorials?",
    answer:
      "This course offers a simple, structured path from getting comfortable with your harmonium to learning your first devotional songs, with the foundations of notes, scales, chords and singing brought together step by step.",
  },
  {
    question: "Can I take this course alongside a busy work schedule?",
    answer:
      "Yes. The recorded course is self-paced, so you can work through its five modules and 15 core lessons in a way that suits your schedule.",
  },
  {
    question: "What happens after I complete the course?",
    answer:
      "Level 1 gives you an accessible foundation in devotional music. You can continue practising the scales, chords, voice exercises and first kirtans from the course as your musical journey continues.",
  },
];

// Interactive Family Chords Matrix data
export interface ChordFamilyKey {
  key: string;
  type: "Major" | "Minor";
  rootNote: string;
  degrees: {
    degree: string;
    chord: string;
    quality: "Major" | "Minor" | "Diminished";
    notes: string;
  }[];
  popularProgressions: {
    name: string;
    formula: string;
    chords: string;
    mood: string;
  }[];
}

export const CHORD_FAMILIES_DATA: ChordFamilyKey[] = [
  {
    key: "C Major",
    type: "Major",
    rootNote: "C",
    degrees: [
      { degree: "I", chord: "C", quality: "Major", notes: "C - E - G" },
      { degree: "ii", chord: "Dm", quality: "Minor", notes: "D - F - A" },
      { degree: "iii", chord: "Em", quality: "Minor", notes: "E - G - B" },
      { degree: "IV", chord: "F", quality: "Major", notes: "F - A - C" },
      { degree: "V", chord: "G", quality: "Major", notes: "G - B - D" },
      { degree: "vi", chord: "Am", quality: "Minor", notes: "A - C - E" },
      { degree: "vii°", chord: "Bdim", quality: "Diminished", notes: "B - D - F" },
    ],
    popularProgressions: [
      { name: "Foundational Devotion", formula: "I - IV - V - I", chords: "C - F - G - C", mood: "Grounding, serene, pure prayer" },
      { name: "Ecstatic Kirtan Anthem", formula: "I - V - vi - IV", chords: "C - G - Am - F", mood: "Uplifting, boundless joy, celebration" },
      { name: "Yearning to Joy", formula: "vi - IV - I - V", chords: "Am - F - C - G", mood: "Introspective longing resolving in divine light" },
    ],
  },
  {
    key: "G Major",
    type: "Major",
    rootNote: "G",
    degrees: [
      { degree: "I", chord: "G", quality: "Major", notes: "G - B - D" },
      { degree: "ii", chord: "Am", quality: "Minor", notes: "A - C - E" },
      { degree: "iii", chord: "Bm", quality: "Minor", notes: "B - D - F#" },
      { degree: "IV", chord: "C", quality: "Major", notes: "C - E - G" },
      { degree: "V", chord: "D", quality: "Major", notes: "D - F# - A" },
      { degree: "vi", chord: "Em", quality: "Minor", notes: "E - G - B" },
      { degree: "vii°", chord: "F#dim", quality: "Diminished", notes: "F# - A - C" },
    ],
    popularProgressions: [
      { name: "Vrindavan Folk Loop", formula: "I - IV - V - I", chords: "G - C - D - G", mood: "Sweet, playful, cheerful devotion" },
      { name: "Sacred Journey", formula: "I - vi - IV - V", chords: "G - Em - C - D", mood: "Noble, steady, heartwarming" },
    ],
  },
  {
    key: "D Major",
    type: "Major",
    rootNote: "D",
    degrees: [
      { degree: "I", chord: "D", quality: "Major", notes: "D - F# - A" },
      { degree: "ii", chord: "Em", quality: "Minor", notes: "E - G - B" },
      { degree: "iii", chord: "F#m", quality: "Minor", notes: "F# - A - C#" },
      { degree: "IV", chord: "G", quality: "Major", notes: "G - B - D" },
      { degree: "V", chord: "A", quality: "Major", notes: "A - C# - E" },
      { degree: "vi", chord: "Bm", quality: "Minor", notes: "B - D - F#" },
      { degree: "vii°", chord: "C#dim", quality: "Diminished", notes: "C# - E - G" },
    ],
    popularProgressions: [
      { name: "Pancha Tattva Grace", formula: "I - IV - V - vi", chords: "D - G - A - Bm", mood: "Majestic, radiant, compassionate" },
      { name: "Golden Horizon", formula: "I - vi - IV - V", chords: "D - Bm - G - A", mood: "Expansive and triumphant" },
    ],
  },
  {
    key: "A Minor",
    type: "Minor",
    rootNote: "A",
    degrees: [
      { degree: "i", chord: "Am", quality: "Minor", notes: "A - C - E" },
      { degree: "ii°", chord: "Bdim", quality: "Diminished", notes: "B - D - F" },
      { degree: "III", chord: "C", quality: "Major", notes: "C - E - G" },
      { degree: "iv", chord: "Dm", quality: "Minor", notes: "D - F - A" },
      { degree: "v", chord: "Em", quality: "Minor", notes: "E - G - B" },
      { degree: "VI", chord: "F", quality: "Major", notes: "F - A - C" },
      { degree: "VII", chord: "G", quality: "Major", notes: "G - B - D" },
    ],
    popularProgressions: [
      { name: "Ancient Surrender", formula: "i - VI - III - VII", chords: "Am - F - C - G", mood: "Solemn, meditative, profound surrender" },
      { name: "Heart Calling", formula: "i - iv - VII - III", chords: "Am - Dm - G - C", mood: "Soulful longing moving toward light" },
      { name: "Trance Dance", formula: "i - VII - VI - VII", chords: "Am - G - F - G", mood: "Hypnotic, rhythmic, trance-inducing" },
    ],
  },
  {
    key: "D Minor",
    type: "Minor",
    rootNote: "D",
    degrees: [
      { degree: "i", chord: "Dm", quality: "Minor", notes: "D - F - A" },
      { degree: "ii°", chord: "Edim", quality: "Diminished", notes: "E - G - Bb" },
      { degree: "III", chord: "F", quality: "Major", notes: "F - A - C" },
      { degree: "iv", chord: "Gm", quality: "Minor", notes: "G - Bb - D" },
      { degree: "v / V", chord: "Am / A", quality: "Minor", notes: "A - C - E / A - C# - E" },
      { degree: "VI", chord: "Bb", quality: "Major", notes: "Bb - D - F" },
      { degree: "VII", chord: "C", quality: "Major", notes: "C - E - G" },
    ],
    popularProgressions: [
      { name: "Devotional Tear (Harmonic V)", formula: "i - VII - VI - V", chords: "Dm - C - Bb - A Major", mood: "Deep mystical yearning, classical Indian bhajan" },
      { name: "The Quiet Temple", formula: "i - VI - III - VII", chords: "Dm - Bb - F - C", mood: "Peaceful introspection and resting in divine grace" },
    ],
  },
];
