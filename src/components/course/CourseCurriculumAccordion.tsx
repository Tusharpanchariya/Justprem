"use client";

import { useState, useMemo } from "react";
import { ChevronDown, ChevronUp, PlayCircle, FileText, Music, Sliders, Search, CheckCircle2, Sparkles, Volume2 } from "lucide-react";
import { COURSE_MODULES, CourseModule, Lesson } from "@/data/courseData";

interface CourseCurriculumAccordionProps {
  onSelectLessonForPreview: (lesson: Lesson, module: CourseModule) => void;
}

export function CourseCurriculumAccordion({ onSelectLessonForPreview }: CourseCurriculumAccordionProps) {
  // Start with module 1 and module 4 open by default
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    "module-1": true,
    "module-4": true,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    COURSE_MODULES.forEach((m) => {
      all[m.id] = true;
    });
    setOpenModules(all);
  };

  const collapseAll = () => {
    setOpenModules({});
  };

  // Filter modules/lessons based on search query
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) return COURSE_MODULES;
    const query = searchQuery.toLowerCase();
    return COURSE_MODULES.map((m) => {
      const moduleMatches =
        m.title.toLowerCase().includes(query) ||
        m.subtitle.toLowerCase().includes(query) ||
        m.purpose.toLowerCase().includes(query);

      const matchingLessons = m.lessons.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query) ||
          (l.notes && l.notes.some((n) => n.toLowerCase().includes(query)))
      );

      if (moduleMatches || matchingLessons.length > 0) {
        return {
          ...m,
          lessons: matchingLessons.length > 0 ? matchingLessons : m.lessons,
        };
      }
      return null;
    }).filter(Boolean) as CourseModule[];
  }, [searchQuery]);

  const totalLessons = COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0);

  const getLessonIcon = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return <PlayCircle className="w-4 h-4 text-[#ad684d] shrink-0" />;
      case "practice":
        return <Sliders className="w-4 h-4 text-[#567262] shrink-0" />;
      case "theory":
        return <FileText className="w-4 h-4 text-[#a07e5b] shrink-0" />;
      case "song":
        return <Music className="w-4 h-4 text-[#ad684d] shrink-0" />;
      case "audio":
        return <Volume2 className="w-4 h-4 text-[#567262] shrink-0" />;
      default:
        return <PlayCircle className="w-4 h-4 text-charcoal/60 shrink-0" />;
    }
  };

  const getLessonBadge = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return "Video";
      case "practice":
        return "Practice";
      case "theory":
        return "Theory";
      case "song":
        return "Kirtan";
      case "audio":
        return "Tanpura";
    }
  };

  return (
    <section id="curriculum" className="py-16 md:py-24 border-b border-charcoal/15 bg-ivory">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal/15 pb-8 mb-10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
              —&nbsp;&nbsp; 03 / FULL SYLLABUS & PEDAGOGY
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
              Comprehensive Course<br />
              <em className="text-[#ad684d]">Curriculum</em>
            </h2>
            <p className="mt-4 text-sm text-charcoal/70 max-w-xl">
              Divided into 8 progressive modules. Designed so you never feel overwhelmed by theory, but empowered through tangible musical discovery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-charcoal/60">
              8 Modules · {totalLessons} Lessons · ~8.5 Total Hours
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="text-xs text-[#ad684d] hover:underline font-medium uppercase tracking-wider"
              >
                Expand All
              </button>
              <span className="text-charcoal/30">|</span>
              <button
                type="button"
                onClick={collapseAll}
                className="text-xs text-charcoal/60 hover:text-charcoal font-medium uppercase tracking-wider"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {/* Search bar inside curriculum */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search lessons (e.g. bellows, chords, minor, vocal)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-charcoal/20 bg-white/70 text-sm focus:border-[#567262] focus:outline-none placeholder:text-charcoal/40"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-charcoal/50 hover:text-charcoal"
            >
              Clear
            </button>
          )}
        </div>

        {/* Modules Accordion */}
        <div className="space-y-4">
          {filteredModules.map((module) => {
            const isOpen = Boolean(openModules[module.id]);

            return (
              <div
                key={module.id}
                className={`border transition-all duration-200 overflow-hidden ${
                  isOpen ? "border-charcoal/30 bg-[#fbf9f4] shadow-sm" : "border-charcoal/15 bg-white/40 hover:border-charcoal/25"
                }`}
              >
                {/* Module Header Trigger */}
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  className="w-full text-left p-6 md:p-7 flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start sm:items-center gap-4 md:gap-6">
                    <span className="font-serif text-2xl md:text-3xl text-[#ad684d] font-normal leading-none shrink-0 w-8">
                      {module.moduleNumber}
                    </span>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-charcoal/50">
                          MODULE {module.moduleNumber}
                        </span>
                        <span className="text-charcoal/30">·</span>
                        <span className="text-xs text-charcoal/70 font-medium">{module.subtitle}</span>
                      </div>

                      <h3 className="font-serif text-xl md:text-2xl text-charcoal mt-1 tracking-tight">
                        {module.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <div className="hidden sm:block text-xs text-charcoal/60">
                      <span>{module.lessons.length} lessons</span>
                      <span className="mx-1.5 text-charcoal/30">·</span>
                      <span>{module.duration}</span>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 hover:text-charcoal">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                {/* Module Expanded Content */}
                {isOpen && (
                  <div className="border-t border-charcoal/10 bg-ivory/60 px-6 pb-6 pt-4 md:px-8 md:pb-8">
                    {/* Purpose Callout */}
                    <div className="mb-6 p-4 bg-[#f4efe5] border-l-2 border-[#ad684d] text-xs leading-relaxed text-charcoal/80">
                      <strong className="text-charcoal uppercase tracking-wider block mb-1">Module Purpose:</strong>
                      {module.purpose}
                    </div>

                    {/* Key Talking Points */}
                    {module.talkingPoints && module.talkingPoints.length > 0 && (
                      <div className="mb-6">
                        <p className="text-[10px] uppercase tracking-widest text-[#567262] font-semibold mb-2">
                          Key Principles Covered:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs text-charcoal/75">
                          {module.talkingPoints.map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-[#ad684d] mt-0.5">•</span>
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Demonstrations List if present */}
                    {module.demonstrations && module.demonstrations.length > 0 && (
                      <div className="mb-6 p-4 border border-[#567262]/20 bg-[#567262]/5 text-xs text-charcoal/80">
                        <p className="text-[10px] uppercase tracking-widest text-[#567262] font-semibold mb-2">
                          Hands-on Demonstrations on Camera:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {module.demonstrations.map((demo, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#567262] shrink-0 mt-0.5" />
                              <span>{demo}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lessons Table */}
                    <div className="divide-y divide-charcoal/10 border-t border-charcoal/10">
                      {module.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-black/[0.02] px-2 rounded transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="pt-0.5">{getLessonIcon(lesson.type)}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-charcoal">
                                  {lesson.lessonNumber}
                                </span>
                                <span className="text-sm font-medium text-charcoal group-hover:text-[#ad684d] transition-colors">
                                  {lesson.title}
                                </span>
                              </div>
                              <p className="text-xs text-charcoal/65 mt-0.5 line-clamp-1 max-w-xl">
                                {lesson.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 sm:shrink-0 self-end sm:self-center">
                            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-charcoal/5 text-charcoal/60">
                              {getLessonBadge(lesson.type)}
                            </span>

                            <span className="text-xs text-charcoal/60 font-mono">
                              {lesson.duration}
                            </span>

                            {lesson.isPreview ? (
                              <button
                                type="button"
                                onClick={() => onSelectLessonForPreview(lesson, module)}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#ad684d]/10 hover:bg-[#ad684d] text-[#ad684d] hover:text-ivory text-[11px] font-medium tracking-wider uppercase rounded transition-colors"
                              >
                                <PlayCircle className="w-3 h-3" />
                                Preview
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
