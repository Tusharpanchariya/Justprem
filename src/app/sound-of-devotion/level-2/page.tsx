import Image from "next/image";
import Link from "next/link";
import { Level2Curriculum } from "@/components/course/Level2Curriculum";

const inclusions = [
  "Eight comprehensive recorded learning modules",
  "Five interactive live masterclasses; dates and meeting links shared with enrolled students",
  "A 15-kirtan repertoire collection with notation, chords and pronunciation tutorials",
  "A downloadable study handbook covering scales, chords, ragas, notation and practice",
  "Five meditation tracks as a bonus for personal meditation and relaxation",
  "Lifetime access to recorded lessons and course updates after enrolment",
];

const outcomes = [
  "A deeper understanding of Bhakti Yoga and establishing a personal Sādhana",
  "The ability to pronounce and chant traditional Sanskrit mantras accurately",
  "Confidence playing scales, Sargam exercises and melodies in all 12 keys",
  "Greater understanding of family chords, inversions, and finding chords by ear",
  "An authentic introduction to Indian Classical Ragas (Yaman, Bhupali, Kafi)",
  "The ability to play and sing 15 selected devotional Kīrtans",
  "The confidence to create original devotional melodies and mantra variations",
  "The ability to prepare, structure and lead a complete Kīrtan gathering",
];

export default function SoundOfDevotionLevel2Page() {
  return (
    <main className="bg-ivory pt-20 text-charcoal selection:bg-[#d9b29c] selection:text-forest">
      <section className="relative overflow-hidden border-b border-charcoal/15 bg-[#f4efe5] px-6 py-20 md:px-12 md:py-32">
        <Image src="/harmonium-images/mainpage.JPG" alt="Harmonium for devotional music practice" fill priority sizes="100vw" className="object-cover object-center opacity-[.12]" />
        <div className="relative mx-auto max-w-6xl">
          <Link href="/sound-of-devotion#class-offerings" className="text-[10px] uppercase tracking-[.2em] text-charcoal/55 hover:text-[#ad684d]">← Sound of Devotion</Link>
          <p className="mt-10 text-[10px] uppercase tracking-[.22em] text-[#ad684d] font-semibold">Just Prem Academy presents</p>
          <h1 className="mt-5 max-w-4xl font-bodoni text-[clamp(2.8rem,7.5vw,5.8rem)] leading-[.88] tracking-[-.04em]">
            LEVEL 02<br />
            <em className="text-[#ad684d] font-serif not-italic">THE PATH OF BHAKTI</em>
          </h1>
          <p className="mt-6 font-serif text-2xl md:text-3xl text-charcoal">
            From Musical Foundations to Devotional Expression
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[.2em] text-[#567262]">
            Eight Modules · A Complete Learning Journey
          </p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
            Level 2 is designed to take students beyond the foundations of harmonium playing and introduce them to the deeper world of Bhakti Yoga, Sanskrit, Indian Classical Music, musical creativity and Kirtan leadership.
          </p>
          <p className="mt-3 font-serif text-lg italic text-[#567262]">
            Through practical lessons, guided exercises, devotional understanding and musical application, develop the confidence to play independently, create your own melodies and share the experience of Kirtan.
          </p>
          <div className="mt-8 grid max-w-4xl gap-3 border-y border-charcoal/15 py-5 text-xs uppercase tracking-wider text-charcoal/70 sm:grid-cols-2 lg:grid-cols-4">
            <span>Intermediate level</span><span>8 in-depth modules</span><span>5 live masterclasses</span><span>15 selected kirtans</span><span>Complete study handbook</span><span>5 meditation tracks bonus</span><span>Lifetime recorded access</span><span>€850 · 2-month guided course</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/sound-of-devotion#class-offerings" className="inline-flex min-h-12 items-center justify-center bg-[#567262] px-7 text-xs uppercase tracking-[.18em] text-ivory transition-colors hover:bg-forest">Book your place · €850 ↗</Link>
            <p className="text-xs uppercase tracking-widest text-[#ad684d]">10 places left · Starts 15 December 2026</p>
          </div>
        </div>
      </section>

      <Level2Curriculum />

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <p className="text-[10px] uppercase tracking-[.22em] text-wood">Included with the course</p>
          <h2 className="mt-6 font-serif text-[clamp(2.3rem,4vw,3.8rem)] leading-[.9]">Learn together.<br /><em className="text-[#ad684d]">Keep exploring.</em></h2>
          <ul className="mt-8 space-y-4 border-t border-charcoal/15 pt-6 text-sm leading-6 text-charcoal/75">
            {inclusions.map((item) => <li key={item} className="flex gap-3"><span className="text-[#567262]">✦</span><span>{item}</span></li>)}
          </ul>
        </div>
        <div className="bg-[#f4efe5] p-7 md:p-10">
          <p className="text-[10px] uppercase tracking-[.22em] text-[#ad684d]">Five live masterclasses</p>
          <h2 className="mt-5 font-serif text-3xl leading-tight">Learn together, with guidance.</h2>
          <ol className="mt-7 space-y-5 text-sm leading-6 text-charcoal/75">
            <li><strong className="font-medium text-charcoal">01 · The Deeper Understanding of Bhakti</strong><br />Bhakti Yoga, Nāda Yoga and music as a spiritual offering.</li>
            <li><strong className="font-medium text-charcoal">02 · Sanskrit Pronunciation & Mantra Practice</strong><br />Pronunciation, mantra chanting and clear articulation.</li>
            <li><strong className="font-medium text-charcoal">03 · Harmonium: All 12 Scales & Family Chords</strong><br />Practise scales, chords and progressions with guidance.</li>
            <li><strong className="font-medium text-charcoal">04 · Discovering Ragas & Creating Melodies</strong><br />Explore ragas and shape devotional melodies.</li>
            <li><strong className="font-medium text-charcoal">05 · Kirtan Practice & Musical Offering</strong><br />Practise together and prepare a musical offering.</li>
          </ol>
          <p className="mt-6 border-t border-charcoal/15 pt-5 text-xs leading-5 text-charcoal/55">Live class dates and meeting details will be shared with enrolled students. No dates or links have been published yet.</p>
        </div>
      </section>

      <section className="bg-[#f4efe5] px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[.22em] text-[#ad684d]">A gift from Just Prem</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight">Five meditation tracks</h2>
            <p className="mt-4 text-sm leading-6 text-charcoal/70">Five original meditation tracks are planned as a free course bonus for personal meditation, yoga, relaxation or classes. Track titles, audio players and downloads will appear for students when the actual recordings are added.</p>
            <p className="mt-3 text-xs text-charcoal/55">Audio files are not available on this page yet.</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[.22em] text-[#ad684d]">Your personal study handbook</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight">A reference for your practice</h2>
            <p className="mt-4 text-sm leading-6 text-charcoal/70">The handbook is planned to include Bhakti Yoga references, Sanskrit and IAST guides, harmonium notes, scales, family chords, progressions, raga foundations, kirtan notation, composition worksheets and a practice journal.</p>
            <p className="mt-3 text-xs text-charcoal/55">The handbook overview is public; the downloadable file is for enrolled students after purchase.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <p className="text-[10px] uppercase tracking-[.22em] text-wood">Who this is for</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight">Ready to go deeper?</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-charcoal/70">
            <li>— Students who have completed the Just Prem Level 1 foundation</li>
            <li>— Harmonium players who know basic notes and simple melodies</li>
            <li>— Singers and Bhakti practitioners ready to explore scales, chords and ragas</li>
            <li>— Kirtan leaders seeking more musical confidence and expression</li>
          </ul>
          <p className="mt-5 text-sm leading-6 text-[#ad684d]">Students should have basic familiarity with harmonium, keyboard notes and simple melodies before starting Level 2.</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[.22em] text-wood">By the end of the journey</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight">What you will be able to do</h2>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-charcoal/70">
            {outcomes.map((outcome) => <li key={outcome}>— {outcome}</li>)}
          </ul>
        </div>
      </section>

      <section className="bg-forest px-6 py-16 text-ivory md:px-12 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div><p className="text-[10px] uppercase tracking-[.22em] text-[#efd09a]">Your next step</p><h2 className="mt-4 font-serif text-4xl">10 places left · Starts 15 December 2026</h2><p className="mt-3 text-sm text-ivory/70">Course information is public. Recorded lessons, live class recordings and paid downloads are for students after successful enrolment and purchase.</p></div>
          <Link href="/sound-of-devotion#class-offerings" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-ivory px-7 text-xs uppercase tracking-[.18em] text-forest transition-colors hover:bg-[#efd09a]">Book now · €850 ↗</Link>
        </div>
      </section>
    </main>
  );
}
