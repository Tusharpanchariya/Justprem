export interface Lesson {
  number: string;
  title: string;
  points: string[];
}

export interface Section {
  number: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseModule {
  id: string;
  moduleNumber: string;
  title: string;
  subtitle: string;
  shortFocus: string;
  studentDevelopment: string;
  goal: string;
  sections: Section[];
  assignment: string;
  materials?: string;
  outcome: string;
}

export const LEVEL_2_MODULES: CourseModule[] = [
  {
    id: "module-01",
    moduleNumber: "01",
    title: "Deepening the Path of Bhakti",
    subtitle: "Devotion, Worship & Daily Spiritual Practice",
    shortFocus: "Bhakti",
    studentDevelopment: "Deepening devotion and Sādhana",
    goal: "Develop a deeper understanding of Bhakti Yoga and discover how devotion can become part of everyday life through worship, sacred sound, service and personal spiritual practice.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Bhakti",
        lessons: [
          {
            number: "Lesson 1.1",
            title: "The Path of Devotion",
            points: [
              "Bhakti Yoga as the path of love and devotion.",
              "Understanding the relationship between the devotee and the Divine.",
              "The teachings of Bhakti in the Bhagavad Gita.",
              "Introduction to the Hari Bhakta Sampradaya.",
            ],
          },
          {
            number: "Lesson 1.2",
            title: "The Nine Forms of Bhakti (Navadha Bhakti)",
            points: [
              "1. Śravaṇam — Hearing the glories of the Lord.",
              "2. Kīrtanam — Chanting the holy names.",
              "3. Smaraṇam — Remembering the Lord.",
              "4. Pāda-sevanam — Serving the Lord’s lotus feet.",
              "5. Arcanam — Worship.",
              "6. Vandanam — Offering prayers.",
              "7. Dāsyam — Becoming the Lord’s servant.",
              "8. Sakhyam — Developing friendship with the Lord.",
              "9. Ātma-nivedanam — Complete surrender.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Creating a Sacred Connection",
        lessons: [
          {
            number: "Lesson 1.3",
            title: "Creating Your Personal Altar",
            points: [
              "Understanding the purpose of an altar.",
              "Choosing a sacred space at home.",
              "Understanding your Iṣṭa-devatā.",
              "Arranging pictures, deities and offerings.",
              "Creating a personal connection through daily worship.",
            ],
          },
          {
            number: "Lesson 1.4",
            title: "The Meaning of Devotional Rituals",
            points: [
              "Understanding the purpose of rituals.",
              "Offering flowers, incense, lamps and food.",
              "Introduction to Ārati.",
              "Understanding Bhāva — the feeling behind the offering.",
              "Developing awareness and sincerity in worship.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Devotion Through Daily Practice",
        lessons: [
          {
            number: "Lesson 1.5",
            title: "Developing Your Sādhana",
            points: [
              "What is Sādhana?",
              "Creating a daily spiritual routine.",
              "Combining meditation, chanting and worship.",
              "Developing consistency and dedication.",
              "Bringing Bhakti into everyday activities.",
            ],
          },
        ],
      },
    ],
    assignment: "Create a personal altar and establish a simple daily devotional practice.",
    outcome: "Students understand the nine forms of Bhakti, the meaning of devotional worship and how to develop their own Sādhana.",
  },
  {
    id: "module-02",
    moduleNumber: "02",
    title: "Sanskrit & the Sacred Sound of Mantra",
    subtitle: "Understanding, Pronunciation & Chanting",
    shortFocus: "Sanskrit & Mantra",
    studentDevelopment: "Pronunciation and chanting",
    goal: "Learn the foundations of Sanskrit pronunciation and understand how sacred mantras are formed, spoken and chanted. Develop clarity, confidence and awareness when reciting traditional mantras.",
    sections: [
      {
        number: "SECTION 1",
        title: "The Sounds of Sanskrit",
        lessons: [
          {
            number: "Lesson 2.1",
            title: "Sanskrit Vowels & Consonants",
            points: [
              "Introduction to Sanskrit sounds.",
              "Understanding vowels and consonants.",
              "Mouth and tongue positions.",
              "Correct pronunciation of Sanskrit syllables.",
            ],
          },
          {
            number: "Lesson 2.2",
            title: "Short & Long Vowels",
            points: [
              "Understanding short and long vowel sounds.",
              "Practising vowel duration.",
              "Recognising how vowel length changes pronunciation and meaning.",
              "Guided pronunciation exercises.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Reading Sanskrit",
        lessons: [
          {
            number: "Lesson 2.3",
            title: "Introduction to IAST",
            points: [
              "What is IAST transliteration?",
              "Reading Sanskrit using Roman letters.",
              "Understanding special characters and diacritical marks.",
              "Practising reading traditional mantras.",
              "Note: Students will not need to learn Devanagari to follow this course.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Understanding Mantra Practice",
        lessons: [
          {
            number: "Lesson 2.4",
            title: "Mantra, Japa & Kīrtan",
            points: [
              "What is a mantra?",
              "Understanding the meaning and purpose of mantra repetition.",
              "Introduction to Japa.",
              "Difference between personal chanting and congregational Kīrtan.",
              "Introduction to Vedic recitation and rhythmic patterns.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Mantras & Their Meanings",
        lessons: [
          {
            number: "Lesson 2.5",
            title: "Guru & Deity Invocations",
            points: [
              "Understanding Guru mantras.",
              "Introduction to invocations dedicated to different deities.",
              "Breaking down Sanskrit words and meanings.",
              "Understanding the purpose of traditional invocations.",
            ],
          },
        ],
      },
      {
        number: "SECTION 5",
        title: "Vocal & Chanting Practice",
        lessons: [
          {
            number: "Lesson 2.6",
            title: "Learning to Chant",
            points: [
              "Guided mantra pronunciation.",
              "Call-and-response chanting.",
              "Breath control and vocal projection.",
              "Developing vocal resonance.",
              "Practising common devotional mantras.",
            ],
          },
        ],
      },
    ],
    assignment: "Record yourself chanting three selected mantras, focusing on pronunciation, clarity and rhythm.",
    outcome: "Students can read mantras in IAST, understand their meanings and confidently pronounce and chant selected traditional mantras.",
  },
  {
    id: "module-03",
    moduleNumber: "03",
    title: "Developing Your Harmonium Skills",
    subtitle: "All 12 Keys, Sargam & Playing Techniques",
    shortFocus: "Harmonium Skills",
    studentDevelopment: "Musical fluency and technique",
    goal: "Build upon Level 1 keyboard and scale knowledge. Develop fluency in all 12 keys, improve finger coordination and learn to play melodies with greater confidence and expression.",
    sections: [
      {
        number: "SECTION 1",
        title: "Expanding Your Scale Knowledge",
        lessons: [
          {
            number: "Lesson 3.1",
            title: "Exploring All 12 Keys",
            points: [
              "Revisiting the four foundational scales from Level 1.",
              "Learning the remaining keys across the full keyboard.",
              "Understanding how scale patterns move across different keys.",
              "Practising independently in different keys.",
            ],
          },
          {
            number: "Lesson 3.2",
            title: "Major & Minor Scale Fluency",
            points: [
              "Developing fluency in major and minor scales.",
              "Comparing their different musical characters.",
              "Practising ascending and descending patterns.",
              "Applying scales to simple melodies.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Sargam & Finger Development",
        lessons: [
          {
            number: "Lesson 3.3",
            title: "Developing Sargam",
            points: [
              "Moving beyond basic Sargam.",
              "Different ascending and descending patterns.",
              "Exploring note combinations.",
              "Developing speed and accuracy.",
            ],
          },
          {
            number: "Lesson 3.4",
            title: "Finger Techniques & Musical Expression",
            points: [
              "Improving finger coordination.",
              "Smooth movement between notes.",
              "Exploring different melody-playing patterns.",
              "Adding variations and expression to melodies.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Applying Your Skills",
        lessons: [
          {
            number: "Lesson 3.5",
            title: "Playing Melodies",
            points: [
              "Combining scales and Sargam.",
              "Learning familiar melodies.",
              "Practising with rhythm.",
              "Developing musical flow and confidence.",
            ],
          },
        ],
      },
    ],
    assignment: "Play a selected scale, perform three Sargam exercises and learn a short melody in a chosen key.",
    materials: "Scale reference charts, keyboard diagrams, Sargam exercises and melody tutorials.",
    outcome: "Students develop confidence across all 12 keys, play scales fluently and perform melodies with improved coordination and expression.",
  },
  {
    id: "module-04",
    moduleNumber: "04",
    title: "Understanding Chords & Playing Songs",
    subtitle: "Family Chords, Progressions & Musical Application",
    shortFocus: "Chords & Songs",
    studentDevelopment: "Independent accompaniment",
    goal: "Move beyond knowing individual chords and learn how to recognise, connect and apply them to complete songs. Develop the ability to listen, find chord changes and accompany devotional music independently.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Chord Families",
        lessons: [
          {
            number: "Lesson 4.1",
            title: "Exploring Chords",
            points: [
              "Revisiting major and minor chord structures.",
              "Understanding diminished chords.",
              "Building chords on the harmonium.",
              "Understanding how chords support melodies.",
            ],
          },
          {
            number: "Lesson 4.2",
            title: "Family Chords in Different Keys",
            points: [
              "Understanding which chords belong together.",
              "Exploring I, ii, iii, IV, V, vi and vii°.",
              "Finding family chords in different keys.",
              "Applying chord families to songs.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Playing Smoothly",
        lessons: [
          {
            number: "Lesson 4.3",
            title: "Chord Inversions",
            points: [
              "Root position.",
              "First and second inversions.",
              "Finding comfortable chord positions.",
              "Creating smoother chord movement.",
            ],
          },
          {
            number: "Lesson 4.4",
            title: "Chord Transitions",
            points: [
              "Moving between chords with minimal movement.",
              "Finding the closest notes.",
              "Practising smooth chord changes.",
              "Developing natural musical flow.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Listening & Musical Understanding",
        lessons: [
          {
            number: "Lesson 4.5",
            title: "Understanding Chord Progressions",
            points: [
              "How chords connect.",
              "Recognising repeating patterns.",
              "Exploring common progressions.",
              "Practising progressions in different keys.",
            ],
          },
          {
            number: "Lesson 4.6",
            title: "Finding Chords by Ear",
            points: [
              "Listening for major and minor sounds.",
              "Recognising the starting chord.",
              "Identifying chord changes.",
              "Finding chords without relying on charts.",
            ],
          },
          {
            number: "Lesson 4.7",
            title: "Creating Your Own Progressions",
            points: [
              "Experimenting with family chords.",
              "Creating different chord combinations.",
              "Developing musical confidence.",
              "Building your own accompaniment.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Applying Chords to Bhakti Music",
        lessons: [
          {
            number: "Lesson 4.8",
            title: "Playing Mantras",
            points: [
              "Finding suitable chords for mantras.",
              "Combining melody and chords.",
              "Creating simple mantra arrangements.",
            ],
          },
          {
            number: "Lesson 4.9",
            title: "Playing Bhajans & Kīrtan",
            points: [
              "Finding chords for devotional songs.",
              "Playing complete songs.",
              "Combining melody, rhythm and chords.",
              "Accompanying group Kīrtan.",
            ],
          },
        ],
      },
    ],
    assignment: "Select a devotional song, identify its key and chord progression, then perform it with harmonium accompaniment.",
    materials: "Family chord charts, keyboard diagrams, progression sheets and guided song demonstrations.",
    outcome: "Students can find family chords, play inversions, recognise progressions, develop their listening skills and accompany complete devotional songs.",
  },
  {
    id: "module-05",
    moduleNumber: "05",
    title: "The Touch of Indian Classical Music",
    subtitle: "Discovering Ragas & Creating Melodies",
    shortFocus: "Indian Classical Music",
    studentDevelopment: "Ragas and melodic understanding",
    goal: "Discover the foundations of Indian Classical Music and understand how melodies are formed through Ragas. Explore selected beginner-friendly Ragas and learn to create simple melodic phrases.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Ragas",
        lessons: [
          {
            number: "Lesson 5.1",
            title: "What Is a Raga?",
            points: [
              "Introduction to Raga in Indian Classical Music.",
              "The relationship between notes and melodies.",
              "How a Raga differs from a simple scale.",
              "Understanding melodic character and expression.",
              "The connection between Ragas and devotional music.",
            ],
          },
          {
            number: "Lesson 5.2",
            title: "How Ragas Create Melodies",
            points: [
              "Understanding Āroha and Avaroha.",
              "Recognising characteristic melodic phrases.",
              "Understanding how the same notes can create different expressions.",
              "Introduction to Vādī and Saṁvādī.",
              "Developing the ability to recognise melodic character.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Discovering Three Ragas",
        lessons: [
          {
            number: "Lesson 5.3",
            title: "Raga Yaman, Bhupali & Kafi",
            points: [
              "Understanding its note structure for each Raga.",
              "Learning its ascending and descending patterns.",
              "Practising characteristic phrases.",
              "Exploring its melodic mood.",
              "Playing it on the harmonium.",
            ],
          },
          {
            number: "Lesson 5.4",
            title: "Listening to Ragas",
            points: [
              "Listening to different Raga examples.",
              "Recognising their distinct melodic characteristics.",
              "Comparing melodic movements.",
              "Developing musical awareness through listening.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Learning Melodies",
        lessons: [
          {
            number: "Lesson 5.5",
            title: "Three Melodies in Three Ragas",
            points: [
              "Melody 1 — Raga Yaman.",
              "Melody 2 — Raga Bhupali.",
              "Melody 3 — Raga Kafi.",
              "Students learn each melody step by step through Sargam and harmonium practice.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Musical Exploration",
        lessons: [
          {
            number: "Lesson 5.6",
            title: "Creating Your Own Melodic Phrases",
            points: [
              "Experimenting with notes from a Raga.",
              "Creating simple melodic phrases.",
              "Combining characteristic note patterns.",
              "Developing a short original melody.",
            ],
          },
        ],
      },
    ],
    assignment: "Perform three selected Ragas and create one short original melody using the phrases of a chosen Raga.",
    materials: "Raga reference PDFs, keyboard diagrams, listening examples and three guided melody tutorials.",
    outcome: "Students understand the difference between a scale and a Raga, play three basic Ragas and create their own simple melodic phrases.",
  },
  {
    id: "module-06",
    moduleNumber: "06",
    title: "The Art of Kīrtan",
    subtitle: "Bringing Melody, Chords & Devotion Together",
    shortFocus: "Kīrtan",
    studentDevelopment: "Playing and singing 15 Kīrtans",
    goal: "Understand Kīrtan as a practice of Bhakti and develop the ability to sing and play devotional songs. Learn a collection of 15 selected Kīrtans, bringing together melody, chords, rhythm and devotional expression.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Kīrtan",
        lessons: [
          {
            number: "Lesson 6.1",
            title: "What Is Kīrtan?",
            points: [
              "Kīrtan as a practice of Bhakti Yoga.",
              "The connection between mantra, music and devotion.",
              "The role of melody, rhythm and repetition.",
              "Singing and playing with awareness and Bhāva.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Bringing Music Together",
        lessons: [
          {
            number: "Lesson 6.2",
            title: "Melody, Chords & Rhythm",
            points: [
              "Combining melody and chords.",
              "Applying family chords and progressions.",
              "Understanding rhythm and tempo.",
              "Combining harmonium, voice and percussion.",
              "Practising musical accompaniment.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "The 15 Kīrtans",
        lessons: [
          {
            number: "Lesson 6.3",
            title: "Learning 15 Selected Kīrtans",
            points: [
              "Lyrics and meaning.",
              "Sanskrit pronunciation where applicable.",
              "Melody and harmonium demonstration.",
              "Chords and progressions.",
              "Rhythm and tempo.",
              "Slow and regular-speed practice.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Personal Practice",
        lessons: [
          {
            number: "Lesson 6.4",
            title: "Singing & Playing Kīrtan",
            points: [
              "Practising Kīrtans independently.",
              "Combining voice and harmonium.",
              "Learning simple transitions.",
              "Practising call-and-response.",
              "Developing confidence in group singing.",
            ],
          },
        ],
      },
    ],
    assignment: "Prepare and record three complete Kīrtans, combining voice, harmonium and rhythm.",
    materials: "15 Kīrtan tutorials, lyrics and meanings, melody sheets, chord charts and rhythm demonstrations.",
    outcome: "Students can play and sing 15 Kīrtans, understand their musical structure and accompany devotional singing.",
  },
  {
    id: "module-07",
    moduleNumber: "07",
    title: "The Art of Devotional Creation",
    subtitle: "Improvisation, Mantra Variations & Original Music",
    shortFocus: "Devotional Creation",
    studentDevelopment: "Improvisation and composition",
    goal: "Bring together the musical knowledge developed throughout the academy and discover how to create original devotional music. Learn to develop melodies, create mantra variations and improvise confidently on the harmonium.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Musical Creation",
        lessons: [
          {
            number: "Lesson 7.1",
            title: "From Musical Knowledge to Creation",
            points: [
              "How melodies are developed.",
              "The relationship between melody and chords.",
              "Using Sargam to create musical ideas.",
              "Understanding musical phrases and variations.",
            ],
          },
          {
            number: "Lesson 7.2",
            title: "Sargam Patterns & Variations",
            points: [
              "Creating different Sargam combinations.",
              "Developing note patterns into melodies.",
              "Exploring ascending and descending variations.",
              "Creating short musical phrases.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Creating Through Mantras",
        lessons: [
          {
            number: "Lesson 7.3",
            title: "Musical Introductions & Mantra Variations",
            points: [
              "Creating a musical introduction for a mantra.",
              "Singing the same mantra in different ways.",
              "Developing melodic variations.",
              "Combining rhythm, melody and chords.",
              "Creating different musical moods.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Harmonium Improvisation",
        lessons: [
          {
            number: "Lesson 7.4",
            title: "Exploring Musical Freedom",
            points: [
              "Understanding improvisation.",
              "Creating variations within a melody.",
              "Exploring Raga-inspired phrases.",
              "Combining Sargam, chords and rhythm.",
              "Playing without following a fixed arrangement.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Creating Your Own Devotional Music",
        lessons: [
          {
            number: "Lesson 7.5",
            title: "Composing from the Heart",
            points: [
              "Finding inspiration through Bhakti.",
              "Connecting music with your Iṣṭa-devatā.",
              "Creating an original mantra melody.",
              "Developing a musical idea into a composition.",
              "Offering music through personal expression.",
            ],
          },
        ],
      },
    ],
    assignment: "Create an original devotional melody or mantra arrangement and record your composition.",
    materials: "Sargam exercises, mantra demonstrations, improvisation tutorials and guided composition worksheets.",
    outcome: "Students can create original melodies, improvise, develop mantra variations and express their devotional understanding through music.",
  },
  {
    id: "module-08",
    moduleNumber: "08",
    title: "The Art of Kīrtan Leadership",
    subtitle: "Leading with Music. Serving through Bhakti.",
    shortFocus: "Kīrtan Leadership",
    studentDevelopment: "Leading a complete Kīrtan",
    goal: "Learn how to prepare and lead a complete Kīrtan experience. Understand how to choose the right key, structure the musical journey, guide call-and-response singing and create a devotional atmosphere for a group.",
    sections: [
      {
        number: "SECTION 1",
        title: "Understanding Leadership",
        lessons: [
          {
            number: "Lesson 8.1",
            title: "The Art of Leading Kīrtan",
            points: [
              "Understanding the role of a Kīrtan leader.",
              "The difference between performing and leading.",
              "Creating a devotional atmosphere.",
              "Understanding Bhāva, intention and presence.",
              "Leadership as Seva.",
            ],
          },
        ],
      },
      {
        number: "SECTION 2",
        title: "Building the Structure",
        lessons: [
          {
            number: "Lesson 8.2",
            title: "Opening, Structure & Closing",
            points: [
              "Choosing an opening mantra.",
              "Creating a musical introduction.",
              "Structuring the Kīrtan journey.",
              "Choosing closing mantras.",
              "Creating a final musical offering.",
            ],
          },
          {
            number: "Lesson 8.3",
            title: "Choosing the Right Key",
            points: [
              "Finding a comfortable key for your voice.",
              "Understanding vocal range.",
              "Choosing a scale for the group.",
              "Adjusting the key to suit different singers and musicians.",
            ],
          },
        ],
      },
      {
        number: "SECTION 3",
        title: "Guiding the Musical Experience",
        lessons: [
          {
            number: "Lesson 8.4",
            title: "Call & Response",
            points: [
              "Understanding call-and-response.",
              "Guiding a group through repetition.",
              "Connecting with participants.",
              "Working with group singing and rhythm.",
            ],
          },
          {
            number: "Lesson 8.5",
            title: "Musical Introductions & Transitions",
            points: [
              "Creating musical introductions.",
              "Connecting different Kīrtans.",
              "Using harmonium improvisations.",
              "Creating musical endings and transitions.",
            ],
          },
          {
            number: "Lesson 8.6",
            title: "Building the Energy of Kīrtan",
            points: [
              "Starting gently and building gradually.",
              "Understanding tempo and rhythmic changes.",
              "Moving between gentle, steady and energetic singing.",
              "Knowing when to build, pause and close.",
              "Creating a balanced musical experience.",
            ],
          },
        ],
      },
      {
        number: "SECTION 4",
        title: "Creating Your Complete Kīrtan Set",
        lessons: [
          {
            number: "Lesson 8.7",
            title: "Preparing Your Own Kīrtan Journey",
            points: [
              "Selecting Kīrtans and mantras.",
              "Planning the musical order.",
              "Choosing keys, melodies and transitions.",
              "Preparing opening and closing mantras.",
              "Creating a complete Kīrtan set.",
              "Offering the experience as Seva.",
            ],
          },
        ],
      },
      {
        number: "SECTION 5",
        title: "Beyond the Academy",
        lessons: [
          {
            number: "Lesson 8.8",
            title: "Sharing Bhakti with the World",
            points: [
              "Sharing Kīrtan in your community.",
              "Organising devotional gatherings.",
              "Exploring opportunities to teach and serve.",
              "Recording and sharing devotional music.",
              "Staying connected with the Just Prem community.",
            ],
          },
        ],
      },
    ],
    assignment: "Prepare and record your own complete Kīrtan set, including: opening mantra, musical introduction, selected Kīrtans, call-and-response, musical development and transitions, closing mantra and final offering.",
    outcome: "Students can confidently prepare and lead a complete Kīrtan gathering, choose suitable keys, guide group participation and share their musical knowledge as Seva.",
  },
];

export const LEVEL_2_TRANSFORMATIONS = [
  {
    title: "Deepened Bhakti Understanding",
    description: "Understand the nine forms of Bhakti (Navadha Bhakti) and integrate worship, prayer and sincere devotion into everyday life.",
  },
  {
    title: "Authentic Sanskrit & Mantra",
    description: "Pronounce and chant traditional mantras clearly with correct vowel duration and understanding of IAST transliteration.",
  },
  {
    title: "Confidence Across All 12 Keys",
    description: "Navigate all 12 keys on the harmonium keyboard, play major and minor scales fluently, and move with finger agility.",
  },
  {
    title: "Chords, Inversions & Progressions",
    description: "Understand family chords, play smooth inversions, recognize chord changes by ear, and accompany complete devotional songs.",
  },
  {
    title: "Indian Classical Raga Foundations",
    description: "Understand the soul of Ragas (Yaman, Bhupali, Kafi), master characteristic phrases, and create evocative melodic motifs.",
  },
  {
    title: "A Repertoire of 15 Kīrtans",
    description: "Play and sing 15 selected Kīrtans with authentic rhythm, chords, vocal coordination, and devotional Bhāva.",
  },
  {
    title: "Devotional Music Creation",
    description: "Improvise freely on the harmonium, create original mantra melodies and variations, and compose directly from the heart.",
  },
  {
    title: "Kīrtan Leadership & Community Seva",
    description: "Lead call-and-response chanting, build and transition musical energy, select keys for groups, and share Kīrtan as sacred service.",
  },
];

export const LEARNING_APPROACH_STEPS = [
  { step: "01", name: "LEARN", detail: "Foundational theory, Sanskrit sounds & harmonium techniques" },
  { step: "02", name: "UNDERSTAND", detail: "Spiritual philosophy, musical connections & harmonic relationships" },
  { step: "03", name: "PRACTISE", detail: "Guided finger drills, chanting exercises & structured assignments" },
  { step: "04", name: "EXPRESS", detail: "Improvisation, original composition & confident Kīrtan leadership" },
];

