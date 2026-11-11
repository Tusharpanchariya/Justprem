"use client";

import Link from "next/link";
import { Sparkles, PlayCircle, BookOpen, Music, CheckCircle2, Award, Clock } from "lucide-react";
import { COURSE_META } from "@/data/courseData";

interface CourseHeroProps {
  onOpenVideoPreview: () => void;
  onEnrollClick: () => void;
}

export function CourseHero({ onOpenVideoPreview, onEnrollClick }: CourseHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ivory border-b border-charcoal/15 pt-28 pb-16 md:pt-36 md:pb-24">
      {/* Subtle textured background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#ad684d]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#567262]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-charcoal/60 mb-6">
          <Link href="/" className="hover:text-[#ad684d] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/sound-of-devotion" className="hover:text-[#ad684d] transition-colors">Academy</Link>
          <span>/</span>
          <span className="text-wood">Level 1 · Begin Your Journey</span>
        </nav>

        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-start">
          <div>
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ad684d]/10 text-[#ad684d] text-[11px] font-medium uppercase tracking-[0.18em] rounded-full border border-[#ad684d]/20">
                <Sparkles className="w-3 h-3" />
                {COURSE_META.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#567262]/10 text-[#567262] text-[11px] font-medium uppercase tracking-widest rounded-full">
                {COURSE_META.durationWeeks}
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-charcoal/5 text-charcoal/70 text-[11px] font-medium tracking-wide rounded-full">
                Beginner Friendly · No Experience Needed
              </span>
            </div>

            {/* Course Title */}
            <h1 className="font-bodoni text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[0.88] tracking-[-0.04em] text-charcoal">
              THE SOUND<br />
              <em className="font-bodoni italic text-[#ad684d]">of devotion</em>
            </h1>

            <p className="mt-4 font-serif text-2xl md:text-3xl text-charcoal/90 leading-tight">
              {COURSE_META.subtitle}
            </p>

            <p className="mt-5 text-pretty text-base md:text-lg leading-relaxed text-charcoal/75 max-w-xl">
              {COURSE_META.headline}
            </p>

            <p className="mt-3 text-sm italic text-[#567262] font-serif">
              &ldquo;A gentle first step into devotional music. You do not need any previous musical experience.&rdquo;
            </p>

            {/* Quick Metrics Pills */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-charcoal/15 text-xs text-charcoal/80">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#ad684d] shrink-0" />
                <span><strong>5</strong> Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-[#567262] shrink-0" />
                <span><strong>15</strong> Core Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#a07e5b] shrink-0" />
                <span><strong>7</strong> First Kirtans</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#ad684d] shrink-0" />
                <span><strong>€108</strong> One-time</span>
              </div>
            </div>

            {/* CTAs for Mobile & Tablet (Desktop has sticky card) */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onEnrollClick}
                className="inline-flex min-h-12 items-center justify-center bg-[#567262] px-8 text-xs uppercase tracking-widest text-ivory transition-all hover:bg-forest hover:shadow-lg active:scale-95"
              >
                Enroll for {COURSE_META.priceDisplay} &nbsp; ↗
              </button>

              <button
                type="button"
                onClick={onOpenVideoPreview}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-charcoal/20 bg-ivory/80 px-6 text-xs uppercase tracking-widest text-charcoal transition-all hover:border-[#ad684d] hover:text-[#ad684d] active:scale-95"
              >
                <PlayCircle className="w-4 h-4 text-[#ad684d]" />
                Watch Free Preview
              </button>
            </div>

            {/* Lineage / Teachers note */}
            <div className="mt-8 flex items-center gap-3 text-xs text-charcoal/70">
              <span className="text-[#ad684d]">✦</span>
              <span>
                Created & led by <strong>Shoorsena Das</strong>, <strong>Anup Singh</strong> & <strong>Aika</strong>
              </span>
            </div>
          </div>

          {/* Quick Pillar Visual Preview */}
          <div className="hidden lg:block">
            <div className="border border-charcoal/15 bg-[#f4efe5] p-8 shadow-[12px_12px_0_#e8e0d1]">
              <div className="flex items-center justify-between border-b border-charcoal/15 pb-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ad684d] font-medium">THE THREE PILLARS</p>
                <span className="text-xs font-serif italic text-charcoal/60">Bhakti Music Pedagogy</span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="group border-l-2 border-[#ad684d] pl-4 transition-colors">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#ad684d]">01 / UNDERSTAND</p>
                  <h3 className="font-serif text-lg text-charcoal mt-0.5">The Awakening of Sound</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Discover Bhakti Yoga, Nada Yoga, sound, chanting and mantra.
                  </p>
                </div>

                <div className="group border-l-2 border-[#567262] pl-4 transition-colors">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#567262]">02 / PRACTICE</p>
                  <h3 className="font-serif text-lg text-charcoal mt-0.5">Meet Your Harmonium & Find Your Voice</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Get comfortable with your harmonium, recognise notes and explore singing at your pace.
                  </p>
                </div>

                <div className="group border-l-2 border-[#a07e5b] pl-4 transition-colors">
                  <p className="text-xs uppercase tracking-widest font-semibold text-[#a07e5b]">03 / EXPRESS</p>
                  <h3 className="font-serif text-lg text-charcoal mt-0.5">Your First Kirtans</h3>
                  <p className="text-xs text-charcoal/70 mt-1 leading-relaxed">
                    Simple chord progressions and seven beginner-friendly devotional songs to sing and play.
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-charcoal/15 flex items-center justify-between text-xs text-charcoal/70">
                <span>Beginner Friendly · Self-Paced</span>
                <span className="text-[#567262] font-medium">✓ Lifetime Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
