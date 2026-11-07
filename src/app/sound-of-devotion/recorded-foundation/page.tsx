"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { COURSE_META, COURSE_PILLARS, INSTRUCTORS, Lesson, CourseModule, COURSE_MODULES } from "@/data/courseData";
import { CourseHero } from "@/components/course/CourseHero";
import { StickyCourseEnrollCard } from "@/components/course/StickyCourseEnrollCard";
import { CourseCurriculumAccordion } from "@/components/course/CourseCurriculumAccordion";
import { VideoPreviewModal } from "@/components/course/VideoPreviewModal";
import { InteractiveTheoryExplorer } from "@/components/course/InteractiveTheoryExplorer";
import { KirtanRepertoireSection } from "@/components/course/KirtanRepertoireSection";
import { PDFHandbookSection } from "@/components/course/PDFHandbookSection";
import { WeeklyRoadmapTimeline } from "@/components/course/WeeklyRoadmapTimeline";
import { TanpuraAudioPlayer } from "@/components/course/TanpuraAudioPlayer";
import { CourseFAQ } from "@/components/course/CourseFAQ";
import { EnrollmentModal } from "@/components/course/EnrollmentModal";
import { Check, Sparkles, Award, ArrowRight, Music, Heart, BookOpen } from "lucide-react";

export default function RecordedFoundationPage() {
  const [selectedPreviewLesson, setSelectedPreviewLesson] = useState<{
    lesson: Lesson;
    module: CourseModule;
  } | null>(null);

  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);

  // Open preview with default lesson 1.1 if opened from hero
  const handleOpenDefaultPreview = () => {
    const firstModule = COURSE_MODULES[0];
    const firstLesson = firstModule.lessons[0];
    setSelectedPreviewLesson({
      lesson: firstLesson,
      module: firstModule,
    });
  };

  const handleSelectLessonForPreview = (lesson: Lesson, module: CourseModule) => {
    setSelectedPreviewLesson({ lesson, module });
  };

  return (
    <div className="bg-ivory text-charcoal min-h-screen selection:bg-[#d9b29c] selection:text-forest">
      {/* Sticky Secondary Navigation Bar */}
      <nav className="sticky top-16 z-30 bg-ivory/95 backdrop-blur-md border-b border-charcoal/15 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between py-3 text-xs uppercase tracking-wider">
          <div className="flex items-center gap-6 text-charcoal/70">
            <a href="#overview" className="hover:text-[#ad684d] transition-colors">Overview</a>
            <a href="#curriculum" className="hover:text-[#ad684d] transition-colors">Curriculum</a>
            <a href="#kirtans" className="hover:text-[#ad684d] transition-colors">10 Kirtans</a>
            <a href="#handbook" className="hover:text-[#ad684d] transition-colors">PDF Handbook</a>
            <a href="#roadmap" className="hover:text-[#ad684d] transition-colors">10-Week Journey</a>
            <a href="#instructors" className="hover:text-[#ad684d] transition-colors">Teachers</a>
            <a href="#faq" className="hover:text-[#ad684d] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-serif text-lg text-[#ad684d] font-medium">
              {COURSE_META.priceDisplay}
            </span>
            <button
              type="button"
              onClick={() => setIsEnrollModalOpen(true)}
              className="bg-[#567262] hover:bg-forest text-ivory px-4 py-1.5 text-[11px] uppercase tracking-widest transition-colors font-medium"
            >
              Enroll Now ↗
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <CourseHero
        onOpenVideoPreview={handleOpenDefaultPreview}
        onEnrollClick={() => setIsEnrollModalOpen(true)}
      />

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-start">
          {/* Main Column Content */}
          <div className="space-y-16">
            {/* The 3 Pillars Section */}
            <section id="overview" className="border-b border-charcoal/15 pb-16">
              <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
                —&nbsp;&nbsp; 01 / THE THREE PILLARS
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
                Designed Around Three<br />
                <em className="text-[#ad684d]">Sacred Pillars</em>
              </h2>
              <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed max-w-2xl">
                The most important principle of Sound of Devotion is that students should never feel burdened by dry music theory. You are discovering an instrument, opening your authentic voice, and learning how to express Bhakti through sacred sound.
              </p>

              <div className="mt-10 grid sm:grid-cols-3 gap-6">
                {COURSE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.number}
                    className="border border-charcoal/15 bg-[#fbf9f4] p-6 flex flex-col justify-between hover:border-charcoal/30 transition-colors shadow-sm"
                  >
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[#ad684d] block mb-2">
                        PILLAR {pillar.number}
                      </span>
                      <h3 className="font-serif text-2xl text-charcoal mb-1">
                        {pillar.pillar}
                      </h3>
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-charcoal/60 mb-3">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-charcoal/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-charcoal/10 flex items-center justify-between text-[11px] text-[#567262] font-medium">
                      <span>Self-Paced Mastery</span>
                      <span>✦</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What You Will Learn (Udemy / Coursera gold standard skills matrix) */}
            <section className="border-b border-charcoal/15 pb-16">
              <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
                —&nbsp;&nbsp; 02 / LEARNING OUTCOMES
              </p>
              <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
                What You Will Walk Away With
              </h2>
              <p className="mt-3 text-sm text-charcoal/70">
                Tangible musical, vocal, and devotional abilities you will embody by Week 10:
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  "Find your notes & comfortably play both Indian Swaras (Sa Re Ga Ma) and Western notes (C D E F G A B)",
                  "Understand the keyboard layout, octaves (Saptak), and how to set your movable Sa to your vocal range",
                  "Master smooth, unbroken bellows pumping with relaxed wrist and natural breath flow",
                  "Play all major and minor triad chords without feeling confused by sharps and flats",
                  "Unlock the 'Family Chords' secret to play songs without memorizing endless chord sheets",
                  "Free your natural voice from judgment with diaphragmatic breath, humming, and open vowels",
                  "Match pitch effortlessly with the included C Tanpura acoustic practice track",
                  "Confidently play and sing 10 authentic devotional kirtans (5 Major and 5 Minor)",
                  "Understand call-and-response dynamics, hold steady tempo, and lead sacred gatherings",
                  "Establish a joyful 20-minute daily harmonium Sadhana practice you can sustain for life",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 bg-white/60 border border-charcoal/10 rounded">
                    <Check className="w-4 h-4 text-[#567262] shrink-0 mt-0.5" />
                    <span className="text-xs text-charcoal/85 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Live Tanpura Synthesizer Widget */}
            <section>
              <TanpuraAudioPlayer />
            </section>

            {/* Curriculum Accordion */}
            <CourseCurriculumAccordion
              onSelectLessonForPreview={handleSelectLessonForPreview}
            />

            {/* Interactive Family Chords & Music Theory Explorer */}
            <InteractiveTheoryExplorer />

            {/* 10 Kirtan Repertoire Section */}
            <KirtanRepertoireSection />

            {/* Downloadable PDF Handbook Showcase */}
            <PDFHandbookSection />

            {/* 10-Week Roadmap Timeline */}
            <WeeklyRoadmapTimeline />

            {/* Instructors Section */}
            <section id="instructors" className="border-b border-charcoal/15 pb-16">
              <div className="max-w-3xl mb-10">
                <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
                  —&nbsp;&nbsp; YOUR GUIDES & TEACHERS
                </p>
                <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
                  Walk with Experienced<br />
                  <em className="text-[#ad684d]">Devotional Guides</em>
                </h2>
                <p className="mt-4 text-sm text-charcoal/70">
                  Every lesson is taught with humility, presence, and deep spiritual care. Meet the teachers who walk beside you:
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {INSTRUCTORS.map((teacher, idx) => (
                  <div key={idx} className="border border-charcoal/15 bg-white/60 p-6 flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-[4/5] w-full mb-5 overflow-hidden shadow-sm bg-[#f1ede3]">
                        <Image
                          src={teacher.image}
                          alt={teacher.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest text-[#ad684d] font-semibold mb-1">
                        {teacher.role}
                      </p>
                      <h3 className="font-serif text-2xl text-charcoal mb-3">
                        {teacher.name}
                      </h3>
                      <p className="text-xs text-charcoal/75 leading-relaxed mb-4">
                        {teacher.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-charcoal/10 space-y-1.5">
                      {teacher.credentials.map((cred, cIdx) => (
                        <div key={cIdx} className="flex items-start gap-1.5 text-[11px] text-charcoal/70">
                          <span className="text-[#567262]">•</span>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Course FAQ */}
            <CourseFAQ />
          </div>

          {/* Right Column Sticky Sidebar on Desktop */}
          <div className="hidden lg:block">
            <StickyCourseEnrollCard
              onOpenVideoPreview={handleOpenDefaultPreview}
              onEnrollClick={() => setIsEnrollModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Bottom Enrollment Banner CTA */}
      <section className="relative overflow-hidden bg-forest text-ivory py-20 px-6 md:px-12 mt-12">
        <Image
          src="/harmonium-images/mainpage.JPG"
          alt="The Sound of Devotion harmonium background"
          fill
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#efd09a] mb-4">
              ✦&nbsp;&nbsp; YOUR MUSICAL JOURNEY BEGINS HERE
            </p>
            <h2 className="font-bodoni text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.88] tracking-tight">
              THE SOUND<br />
              <em className="font-bodoni italic text-[#efd09a]">of devotion</em>
            </h2>
            <p className="mt-6 font-serif text-xl md:text-2xl italic leading-relaxed text-ivory/90 max-w-xl">
              From breath to voice.<br />
              From voice to vibration.<br />
              From vibration to devotion.
            </p>
            <p className="mt-4 text-xs md:text-sm text-ivory/70 max-w-lg leading-relaxed">
              Enroll today and receive instant lifetime access to all 8 modules, 30+ masterclass videos, 10 complete kirtans, and the 104-page Harmonium Foundation Handbook.
            </p>
          </div>

          <div className="border border-white/20 bg-ivory/10 backdrop-blur-md p-8 md:p-10 shadow-2xl">
            <span className="text-[10px] uppercase tracking-widest text-[#efd09a] block mb-2">
              RECORDED BHAKTI FOUNDATION
            </span>
            <h3 className="font-serif text-3xl text-ivory mb-2">
              Sound of Devotion
            </h3>
            <p className="font-serif text-5xl md:text-6xl text-[#efd09a] mb-6">
              {COURSE_META.priceDisplay}
            </p>
            <ul className="space-y-2.5 text-xs text-ivory/80 mb-8 border-t border-white/15 pt-5">
              <li>✓ 8 Learning Modules & 30+ HD Masterclasses</li>
              <li>✓ 10 Complete Kirtans with 8-Step Blueprint</li>
              <li>✓ 104-Page Harmonium Foundation PDF Handbook</li>
              <li>✓ C Tanpura Vocal Practice Drone Track</li>
              <li>✓ Lifetime Access on Mobile, Tablet & Desktop</li>
            </ul>

            <button
              type="button"
              onClick={() => setIsEnrollModalOpen(true)}
              className="w-full min-h-13 bg-[#ad684d] hover:bg-[#8e5239] text-ivory text-xs uppercase tracking-[0.2em] font-medium py-3.5 px-6 transition-all flex items-center justify-center gap-2"
            >
              Get Instant Access Now &nbsp; ↗
            </button>
          </div>
        </div>
      </section>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        lesson={selectedPreviewLesson?.lesson || null}
        module={selectedPreviewLesson?.module || null}
        onClose={() => setSelectedPreviewLesson(null)}
        onEnrollClick={() => {
          setSelectedPreviewLesson(null);
          setIsEnrollModalOpen(true);
        }}
      />

      {/* Direct Enrollment Modal */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
      />
    </div>
  );
}
