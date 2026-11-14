"use client";

import { useState } from "react";
import {
  LEVEL_2_MODULES,
  LEVEL_2_TRANSFORMATIONS,
  LEARNING_APPROACH_STEPS,
  type CourseModule,
} from "@/data/level2CurriculumData";
import {
  ChevronDown,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  Music2,
  Compass,
} from "lucide-react";

export function Level2Curriculum() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | "all">("all");
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "module-01": true,
    "module-02": false,
    "module-03": false,
    "module-04": false,
    "module-05": false,
    "module-06": false,
    "module-07": false,
    "module-08": false,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    LEVEL_2_MODULES.forEach((m) => {
      next[m.id] = true;
    });
    setExpandedModules(next);
    setSelectedModuleId("all");
  };

  const collapseAll = () => {
    const next: Record<string, boolean> = {};
    LEVEL_2_MODULES.forEach((m) => {
      next[m.id] = false;
    });
    setExpandedModules(next);
  };

  const displayedModules =
    selectedModuleId === "all"
      ? LEVEL_2_MODULES
      : LEVEL_2_MODULES.filter((m) => m.id === selectedModuleId);

  return (
    <section id="level-2-curriculum" className="border-y border-charcoal/15 bg-[#f4efe5] px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-[10px] uppercase tracking-[.24em] text-[#ad684d] md:text-xs font-semibold">
            JUST PREM ACADEMY · COMPLETE SYLLABUS
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[.92] text-charcoal">
            Eight Modules.<br />
            <em className="text-[#ad684d] font-serif not-italic">The Path of Bhakti.</em>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-charcoal/75 md:text-base">
            From Musical Foundations to Devotional Expression. Level 2 takes students beyond basic keyboard notes into
            the deeper world of Bhakti Yoga, Sanskrit pronunciation, Indian Classical Ragas, musical creativity and
            Kīrtan leadership.
          </p>
        </div>

        {/* The Learning Approach Bar: LEARN → UNDERSTAND → PRACTISE → EXPRESS */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-charcoal/15 bg-ivory p-6 md:p-8 shadow-sm">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-charcoal/10 pb-5">
            <div>
              <span className="text-[10px] uppercase tracking-[.22em] text-[#567262] font-semibold">
                PEDAGOGICAL ARCHITECTURE
              </span>
              <h3 className="mt-1 font-serif text-2xl text-charcoal">The Four-Stage Learning Approach</h3>
            </div>
            <p className="text-xs text-charcoal/60 max-w-md">
              Every concept is explored through a progressive rhythm designed to cultivate both technical mastery and devotional resonance.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LEARNING_APPROACH_STEPS.map((step, idx) => (
              <div
                key={step.name}
                className="relative rounded-xl border border-charcoal/10 bg-[#faf8f5] p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#ad684d]">
                  <span>STAGE {step.step}</span>
                  {idx < 3 && <span className="hidden lg:inline text-charcoal/30">→</span>}
                </div>
                <h4 className="mt-2 font-serif text-xl tracking-wide text-charcoal">{step.name}</h4>
                <p className="mt-2 text-xs leading-5 text-charcoal/70">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Module Navigator Tabs & Filter Controls */}
        <div className="mt-14 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[.2em] text-[#ad684d] font-semibold">
                CURRICULUM NAVIGATOR
              </p>
              <h3 className="font-serif text-2xl text-charcoal">Explore the Modules</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="rounded-lg border border-charcoal/20 bg-ivory px-3.5 py-1.5 text-xs font-semibold text-charcoal/80 transition-colors hover:bg-white hover:text-charcoal"
              >
                Expand all
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="rounded-lg border border-charcoal/20 bg-ivory px-3.5 py-1.5 text-xs font-semibold text-charcoal/80 transition-colors hover:bg-white hover:text-charcoal"
              >
                Collapse all
              </button>
            </div>
          </div>

          {/* Module Pills Switcher */}
          <div className="flex flex-wrap gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setSelectedModuleId("all");
                expandAll();
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                selectedModuleId === "all"
                  ? "bg-[#567262] text-ivory shadow-sm"
                  : "border border-charcoal/15 bg-ivory text-charcoal/75 hover:bg-white hover:text-charcoal"
              }`}
            >
              All 8 Modules
            </button>
            {LEVEL_2_MODULES.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedModuleId(m.id);
                  setExpandedModules((prev) => ({ ...prev, [m.id]: true }));
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wider transition-all ${
                  selectedModuleId === m.id
                    ? "bg-[#567262] text-ivory shadow-sm"
                    : "border border-charcoal/15 bg-ivory text-charcoal/75 hover:bg-white hover:text-charcoal"
                }`}
              >
                {m.moduleNumber} · {m.shortFocus}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Accordion / List */}
        <div className="mt-8 space-y-6">
          {displayedModules.map((module) => {
            const isExpanded = selectedModuleId === module.id ? true : Boolean(expandedModules[module.id]);

            return (
              <article
                key={module.id}
                className="overflow-hidden rounded-2xl border border-charcoal/15 bg-ivory transition-all shadow-sm hover:border-charcoal/30"
              >
                {/* Module Header Bar */}
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-6 transition-colors hover:bg-[#faf7f2]"
                >
                  <div className="flex items-start gap-5">
                    <span className="shrink-0 font-serif text-3xl font-light text-[#ad684d] md:text-4xl">
                      {module.moduleNumber}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-full bg-[#f2ede4] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#567262]">
                          MODULE {module.moduleNumber} · {module.shortFocus}
                        </span>
                        <span className="text-xs text-charcoal/50">•</span>
                        <span className="text-xs font-medium text-charcoal/60">
                          {module.sections.reduce((acc, s) => acc + s.lessons.length, 0)} Lessons
                        </span>
                      </div>
                      <h3 className="mt-2 font-serif text-2xl text-charcoal md:text-3xl leading-snug">
                        {module.title}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-[#ad684d]/90 italic font-serif">
                        {module.subtitle}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border border-charcoal/20 p-2.5 text-[#ad684d] transition-transform duration-200 ${
                      isExpanded ? "rotate-180 bg-[#f4efe5]" : "bg-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {/* Module Body Content */}
                {isExpanded && (
                  <div className="border-t border-charcoal/10 bg-[#fffefb] p-6 md:p-8 space-y-8 animate-fadeIn">
                    {/* Module Goal Callout */}
                    <div className="rounded-xl border-l-4 border-[#567262] bg-[#f2f7f2] p-4 md:p-5">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#567262]">
                        <Compass className="w-4 h-4" />
                        <span>Module Goal</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-charcoal/80 font-serif">
                        {module.goal}
                      </p>
                    </div>

                    {/* Sections & Lessons */}
                    <div className="space-y-6">
                      {module.sections.map((section) => (
                        <div key={section.number} className="rounded-xl border border-charcoal/10 bg-[#faf8f5] p-5 md:p-6">
                          <div className="flex items-baseline gap-3 border-b border-charcoal/10 pb-3">
                            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#ad684d]">
                              {section.number}
                            </span>
                            <h4 className="font-serif text-lg font-medium text-charcoal">
                              {section.title}
                            </h4>
                          </div>

                          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {section.lessons.map((lesson) => (
                              <div
                                key={lesson.number}
                                className="rounded-lg border border-charcoal/10 bg-white p-4 transition-all hover:border-[#ad684d]/40"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="rounded bg-[#f4efe5] px-2 py-0.5 text-[10px] font-bold text-[#567262]">
                                    {lesson.number}
                                  </span>
                                  <h5 className="font-serif text-base font-medium text-charcoal">
                                    {lesson.title}
                                  </h5>
                                </div>
                                <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-charcoal/75">
                                  {lesson.points.map((point) => (
                                    <li key={point} className="flex items-start gap-2">
                                      <span className="text-[#ad684d] font-bold shrink-0">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Practical Assignment & Learning Outcome */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 pt-2 border-t border-charcoal/10">
                      <div className="rounded-xl border border-[#ad684d]/30 bg-[#fdf8f5] p-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ad684d]">
                          <Award className="w-4 h-4" />
                          <span>Practical Assignment</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-charcoal/80">
                          {module.assignment}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#567262]/30 bg-[#f4f8f4] p-5">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#567262]">
                          <Sparkles className="w-4 h-4" />
                          <span>Learning Outcome</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-charcoal/80">
                          {module.outcome}
                        </p>
                      </div>
                    </div>

                    {module.materials && (
                      <div className="flex items-center gap-2 text-xs text-charcoal/65 bg-[#f6f2e9] px-4 py-2.5 rounded-lg">
                        <BookOpen className="w-4 h-4 text-[#567262] shrink-0" />
                        <span>
                          <strong>Learning Materials:</strong> {module.materials}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Complete Learning Journey Matrix */}
        <div className="mt-20 overflow-hidden rounded-2xl border border-charcoal/15 bg-ivory p-6 md:p-10 shadow-sm">
          <div className="max-w-2xl">
            <p className="text-[10px] uppercase tracking-[.22em] text-[#ad684d] font-semibold">
              AT A GLANCE
            </p>
            <h3 className="mt-2 font-serif text-3xl text-charcoal">The Complete Learning Journey</h3>
            <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
              An overview of how each module systematically advances your musicianship, spiritual practice, and kirtan capability.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-charcoal/20 text-[11px] font-bold uppercase tracking-widest text-[#567262]">
                  <th className="py-3 px-4 w-20">Module</th>
                  <th className="py-3 px-4 w-48">Main Focus</th>
                  <th className="py-3 px-4">Student Development</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/10">
                {LEVEL_2_MODULES.map((m) => (
                  <tr key={m.moduleNumber} className="hover:bg-[#faf7f2] transition-colors">
                    <td className="py-3.5 px-4 font-serif text-base font-semibold text-[#ad684d]">
                      {m.moduleNumber}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-charcoal">
                      {m.shortFocus}
                    </td>
                    <td className="py-3.5 px-4 text-charcoal/75 text-xs sm:text-sm">
                      {m.studentDevelopment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Final Transformation Section */}
        <div className="mt-20 rounded-2xl border border-charcoal/15 bg-gradient-to-b from-[#f9f6ef] to-ivory p-8 md:p-14 text-center shadow-sm">
          <span className="rounded-full bg-[#f1ece2] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.22em] text-[#ad684d]">
            THE FINAL TRANSFORMATION
          </span>
          <h3 className="mt-5 font-serif text-[clamp(2rem,4vw,3.2rem)] leading-tight text-charcoal">
            From Student to Musician.<br />
            <em className="text-[#567262] font-serif not-italic">From Musician to Kīrtan Leader.</em>
          </h3>
          <p className="mt-4 mx-auto max-w-2xl text-sm leading-relaxed text-charcoal/75">
            By completing Level 2, you will have developed the holistic mastery to express devotion through voice, harmonium, and community prayer:
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {LEVEL_2_TRANSFORMATIONS.map((item, idx) => (
              <div
                key={item.title}
                className="rounded-xl border border-charcoal/10 bg-white p-5 shadow-xs transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#ad684d]">
                  <span className="rounded-full bg-[#fdf5f0] w-6 h-6 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="uppercase tracking-wider">Milestone</span>
                </div>
                <h4 className="mt-3 font-serif text-lg font-medium text-charcoal leading-snug">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-charcoal/10 max-w-2xl mx-auto">
            <p className="font-serif text-xl italic text-charcoal/90">
              “Music becomes Seva. Knowledge becomes experience. Devotion becomes expression.”
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[.24em] text-[#ad684d] font-semibold">
              JUST PREM · SOUND OF DEVOTION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
