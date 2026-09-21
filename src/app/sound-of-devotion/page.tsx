import Image from "next/image";
import Link from "next/link";
import { BhaktiYogaOffers } from "@/components/classes/BhaktiYogaOffers";


const foundations = [
  ["01", "Harmonium", "A practical foundation in posture, bellows, notes, scales, chords, melody and playing while singing."],
  ["02", "Awakening the voice", "Breath, resonance, pitch and vocal freedom — finding your natural voice without forcing."],
  ["03", "Breath & meditation", "Create space for awareness with conscious breathing, silent listening and simple pranayama."],
  ["04", "Sanskrit & mantra", "Approach pronunciation, rhythm, meaning and repetition with care and awareness."],
  ["05", "Sacred sound", "Explore nāda through tone, vibration, silence, listening and devotional intention."],
  ["06", "Bhakti Yoga", "Meet devotion, nāma, bhāva, satsaṅga and seva through practical experience."],
  ["07", "Learn to sing & play", "Listen → Repeat → Sing → Play → Combine → Express."],
  ["08", "Kīrtan", "Build confidence with call and response, simple transitions and a personal kīrtan flow."],
];

const sessions = [
  ["01", "Opening the Voice", "Breath, listening, vocal activation, introduction to Bhakti and sacred sound."],
  ["02", "Meeting the Harmonium", "Instrument anatomy, posture, bellows, notes, Sa and basic hand coordination."],
  ["03", "The Language of Sound", "Sargam, scales, pitch, resonance, ear training and Indian / Western musical concepts."],
  ["04", "Mantra & Sanskrit", "Pronunciation, meaning, rhythm and conscious chanting."],
  ["05", "Voice & Melody", "Vocal development, melody, simple scales and singing with the harmonium."],
  ["06", "The Heart of Bhakti", "Bhakti Yoga, nāma, bhāva, kīrtan and devotional intention."],
  ["07", "Building the Kīrtan", "Chords, rhythm, repetition, call-and-response and simple kīrtan structure."],
  ["08", "Finding Your Own Sound", "Transposition, listening, improvisation, confidence and personal expression."],
  ["09", "Your Voice as Practice", "Combine breath, meditation, mantra, voice and harmonium into personal practice."],
  ["10", "The Offering", "Bring voice, harmonium, mantra, breath, meditation and Bhakti together."],
];

const outcomes = [
  ["Your Harmonium Foundation", "Understand the fundamentals to continue developing from beginner toward intermediate level."],
  ["Your Voice Practice", "Take away vocal activation, breath and listening practices to continue independently."],
  ["Your Mantra Foundation", "Learn an aware approach to Sanskrit pronunciation, mantra, melody and repetition."],
  ["Your Kīrtan Repertoire", "Leave with devotional chants connected with different expressions of Bhakti."],
  ["Your Sacred Sound Practice", "Return to practices for listening, breath, meditation, voice and sound."],
  ["Your Digital Manual", "Receive Path of Bhakti Yoga — The Sound of Devotion, a personal manual for continuing your practice."],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs">—&nbsp;&nbsp; {children}</p>;
}

export default function SoundOfDevotionPage() {
  return (
    <div className="overflow-hidden bg-ivory pt-20 text-charcoal selection:bg-[#d9b29c] selection:text-forest">
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.03fr_.97fr] md:items-center md:gap-16 md:px-12 md:py-28">
        <div className="max-w-2xl">
          <Eyebrow>Private 1-to-1 course · Path of Bhakti Yoga</Eyebrow>
          <h1 className="font-serif text-[clamp(3.3rem,8.5vw,7.2rem)] leading-[.82] tracking-[-.045em]">
            THE SOUND<br />
            <em className="font-serif text-[#ad684d]">of devotion</em>
          </h1>
          <p className="mt-9 max-w-xl text-balance font-serif text-2xl leading-tight md:text-3xl">A journey into voice, mantra, harmonium and Bhakti Yoga.</p>
          <p className="mt-4 max-w-lg text-pretty text-sm leading-7 text-charcoal/70 md:text-base">Learn to connect with your own voice, understand sacred sound, chant Sanskrit mantras with awareness, and accompany your voice on the harmonium.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#class-offerings" className="inline-flex min-h-12 items-center justify-center bg-[#567262] px-6 text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-forest">Begin your journey&nbsp; ↗</Link>
            <Link href="#journey" className="inline-flex min-h-12 items-center justify-center px-5 text-xs uppercase tracking-widest hover:text-[#ad684d]">Explore the course&nbsp; ↓</Link>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-charcoal/15 pt-5 text-[10px] uppercase tracking-widest text-charcoal/65 md:text-xs">
            <span>10 private sessions</span><span>90 minutes</span><span>~2 months</span><span className="text-[#ad684d]">€650</span>
          </div>
        </div>
        <figure className="relative aspect-[4/5] overflow-hidden bg-sage shadow-[16px_16px_0_#e8e0d1] md:aspect-[4/4.25]">
          <Image src="/harmonium-images/mainpage.JPG" alt="Prem and Ananda with their harmoniums" fill priority sizes="(max-width: 768px) 100vw, 48vw" className="object-cover object-center" />
          <figcaption className="absolute bottom-4 left-4 bg-ivory px-4 py-3 font-serif text-sm italic">A personal practice<br />in sacred sound</figcaption>
        </figure>
      </section>

      <BhaktiYogaOffers />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:gap-28 md:px-12 md:py-36">
        <div>
          <Eyebrow>01 / The idea</Eyebrow>
          <h2 className="max-w-md font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[.85]">More than a<br /><em className="text-[#ad684d]">singing course.</em></h2>
          <div className="mt-10 w-36 border border-charcoal/10 bg-[#f1ede3] p-4 text-center font-serif text-lg leading-none">Path Of<br />Bhakti Yoga<br /><span className="mt-5 block text-[9px] uppercase tracking-widest">Voice for Devotion</span></div>
        </div>
        <div className="max-w-xl self-center text-base leading-7 text-charcoal/70 md:text-lg">
          <p className="text-balance font-serif text-3xl leading-tight text-charcoal">The Sound of Devotion is a journey into sound as a practice.</p>
          <p className="mt-4">This course brings together the practical foundations of harmonium and singing with breath, meditation, mantra, Sanskrit, Bhakti Yoga and the deeper experience of sacred sound.</p>
          <p className="mt-4">You will not simply learn songs. You will learn how to listen, breathe, find your natural voice, understand the mantra, feel melody and accompany yourself.</p>
          <p className="mt-4 font-serif text-2xl italic text-[#ad684d]">And how to allow sound to become an expression of devotion.</p>
        </div>
      </section>

      <section id="journey" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-8 border-b border-charcoal/15 pb-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
          <div><Eyebrow>02 / The foundations</Eyebrow><h2 className="font-serif text-[clamp(3.2rem,6vw,5.5rem)] leading-[.85]">What you will<br /><em className="text-[#ad684d]">learn</em></h2></div>
          <p className="max-w-sm text-sm leading-6 text-charcoal/70 md:text-base">Eight strands of practice, woven together into one clear and personal path.</p>
        </div>
        <div className="grid border-l border-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
          {foundations.map(([number, title, description]) => <article key={number} className="flex min-h-64 flex-col border-b border-r border-charcoal/15 p-6 md:p-7"><p className="text-[10px] tracking-widest text-[#ad684d]">{number}</p><h3 className="mt-10 font-serif text-2xl leading-tight tracking-tight">{title}</h3><p className="mt-5 text-pretty text-sm leading-6 text-charcoal/65">{description}</p><div className="mt-auto pt-6"><div className="w-6 border-t border-wood" /></div></article>)}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl overflow-hidden bg-[#f0ece1] md:grid-cols-2">
        <div className="relative min-h-96"><Image src="/harmonium-images/mainpage.JPG" alt="A personal sacred sound practice" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-center" /></div>
        <div className="p-8 md:p-14 lg:p-20"><Eyebrow>Learn through experience</Eyebrow><h2 className="font-serif text-[clamp(3rem,5vw,4.5rem)] leading-[.88]">Listen to the sound.<br /><em className="text-[#ad684d]">Feel the vibration.</em></h2><p className="mt-7 font-serif text-2xl">Discover the space within it.</p><p className="mt-2 text-sm leading-6 text-charcoal/65">We explore nāda — sacred sound — not as a promise of quick transformation, but as a contemplative and devotional practice.</p><div className="mt-8 grid grid-cols-2 gap-y-4 text-sm text-[#567262]"><span>✓&nbsp; Breath</span><span>✓&nbsp; Tone</span><span>✓&nbsp; Pitch</span><span>✓&nbsp; Resonance</span><span>✓&nbsp; Silence</span><span>✓&nbsp; Intention</span></div></div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-32">
        <div className="grid gap-8 border-b border-charcoal/15 pb-10 md:grid-cols-[1.1fr_.9fr] md:items-end"><div><Eyebrow>03 / The journey</Eyebrow><h2 className="font-serif text-[clamp(3.2rem,6vw,5.5rem)] leading-[.85]">Ten sessions.<br /><em className="text-[#ad684d]">A lasting practice.</em></h2></div><p className="max-w-sm text-sm leading-6 text-charcoal/70 md:text-base">One private session each week. A gentle progression from first breath to personal offering.</p></div>
        <div className="grid md:grid-cols-2">{sessions.map(([number, title, description]) => <article key={number} className="grid min-h-40 grid-cols-[40px_1fr_auto] gap-3 border-b border-charcoal/15 py-7 md:px-6"><span className="pt-1 text-[10px] tracking-widest text-[#ad684d]">{number}</span><div><h3 className="font-serif text-2xl leading-tight tracking-tight">{title}</h3><p className="mt-3 max-w-md text-pretty text-sm leading-6 text-charcoal/65">{description}</p></div><span className="pt-1 text-wood">↗</span></article>)}</div>
      </section>


      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-[.95fr_1.05fr] md:px-12 md:py-36"><div><Eyebrow>05 / After the course</Eyebrow><h2 className="font-serif text-[clamp(3.2rem,6vw,5.4rem)] leading-[.86]">When the course ends,<br /><em className="text-[#ad684d]">your practice begins.</em></h2><p className="mt-7 max-w-md text-sm leading-6 text-charcoal/65">The value of these ten sessions lives in what you can carry forward — with clarity, confidence and a way to keep learning.</p><ol className="mt-9 space-y-3 text-xs uppercase tracking-widest text-[#567262]"><li>Learn ↓</li><li>Practice ↓</li><li>Listen ↓</li><li>Express ↓</li><li>Devote</li></ol></div><div className="grid border-l border-t border-charcoal/15 sm:grid-cols-2">{outcomes.map(([title, copy]) => <article key={title} className="flex min-h-52 flex-col border-b border-r border-charcoal/15 p-6"><span className="text-[#ad684d]">◌</span><h3 className="mt-4 font-serif text-2xl leading-tight tracking-tight">{title}</h3><p className="mt-3 text-pretty text-sm leading-6 text-charcoal/65">{copy}</p></article>)}</div></section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20 md:py-36"><div className="relative aspect-[4/5] overflow-hidden shadow-[14px_14px_0_#e8e0d1]"><Image src="/harmonium-images/mainpage.JPG" alt="Prem and Ananda singing and playing harmonium" fill sizes="(max-width: 768px) 100vw, 45vw" className="object-cover object-center" /></div><div className="max-w-xl"><Eyebrow>A private experience</Eyebrow><h2 className="font-serif text-[clamp(3.3rem,6vw,5.4rem)] leading-[.86]">Your voice<br /><em className="text-[#ad684d]">is unique.</em></h2><p className="mt-8 text-pretty text-base leading-7 text-charcoal/70">Unlike a large group course, every session is adapted to your voice, musical experience, harmonium level, learning speed, repertoire, questions and personal practice.</p><ul className="mt-7 space-y-3 text-sm leading-6 text-[#567262]"><li>—&nbsp; Complete beginners welcome</li><li>—&nbsp; Direct corrections and guidance</li><li>—&nbsp; Learn at your own natural pace</li><li>—&nbsp; A harmonium is recommended between sessions</li></ul></div></section>

      <section className="bg-[#f0ece1] px-6 py-20 md:py-32"><div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center"><div className="max-w-xl"><Eyebrow>07 / Your invitation</Eyebrow><h2 className="font-serif text-[clamp(3.4rem,6vw,5.6rem)] leading-[.84]">Your voice is an<br /><em className="text-[#ad684d]">instrument of connection.</em></h2><p className="mt-7 max-w-md text-pretty text-base leading-7 text-charcoal/70">You do not need a perfect voice. You do not need to become a professional musician. You only need the willingness to listen, practice and express.</p></div><aside className="mx-auto w-full max-w-md border border-charcoal/15 bg-ivory p-8 shadow-[12px_12px_0_#e4ddce] md:p-10"><Eyebrow>The Sound of Devotion</Eyebrow><h3 className="font-serif text-3xl leading-tight">Path of Bhakti Yoga</h3><p className="mt-7 font-serif text-6xl text-[#ad684d]">€650</p><ul className="mt-7 space-y-3 border-t border-charcoal/15 pt-6 text-sm leading-6 text-charcoal/70"><li>10 private 1-to-1 sessions</li><li>90 minutes each · once a week</li><li>Approximately 2 months</li><li>Digital practice manual included</li></ul><Link href="#class-offerings" className="mt-8 flex min-h-12 items-center justify-center bg-[#567262] px-6 text-xs uppercase tracking-widest text-ivory transition-colors hover:bg-forest">Begin your journey&nbsp; ↗</Link><p className="mt-4 text-center text-xs leading-5 text-charcoal/60">A harmonium is recommended for practice between sessions.</p></aside></div></section>

      <section className="relative min-h-[620px] bg-forest px-6 py-20 text-ivory md:min-h-[680px] md:py-32"><Image src="/harmonium-images/mainpage.JPG" alt="The Sound of Devotion" fill sizes="100vw" className="object-cover object-center opacity-35" /><div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/70 to-transparent" /><div className="relative mx-auto max-w-7xl"><Eyebrow>The journey begins with one sound</Eyebrow><h2 className="max-w-3xl font-serif text-[clamp(3.8rem,9vw,8rem)] leading-[.82] tracking-[-.045em]">THE SOUND<br /><em className="text-[#efc797]">of devotion</em></h2><p className="mt-9 max-w-md font-serif text-2xl italic leading-relaxed">From breath to voice.<br />From voice to vibration.<br />From vibration to devotion.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="#class-offerings" className="inline-flex min-h-12 items-center justify-center bg-ivory px-6 text-xs uppercase tracking-widest text-forest transition-colors hover:bg-[#efc797]">Begin your journey&nbsp; ↗</Link><Link href="/harmoniums" className="inline-flex min-h-12 items-center justify-center px-4 text-xs uppercase tracking-widest hover:text-[#efc797]">Explore JustPrem.shop&nbsp; ↗</Link></div><p className="mt-8 text-xs uppercase tracking-widest text-ivory/70">€650 · 10 private sessions · ~2 months</p></div></section>
    </div>
  );
}
