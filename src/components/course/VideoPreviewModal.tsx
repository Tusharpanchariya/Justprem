"use client";

import { useState } from "react";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, CheckCircle2, BookOpen, Music, Video } from "lucide-react";
import { Lesson, CourseModule, COURSE_META } from "@/data/courseData";

interface VideoPreviewModalProps {
  lesson: Lesson | null;
  module: CourseModule | null;
  onClose: () => void;
  onEnrollClick: () => void;
}

export function VideoPreviewModal({ lesson, module, onClose, onEnrollClick }: VideoPreviewModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "swaras" | "curriculum">("notes");
  const [speed, setSpeed] = useState<number>(1);

  if (!lesson || !module) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Course Lesson Preview"
    >
      <div className="relative w-full max-w-4xl bg-ivory border border-charcoal/20 shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="bg-[#2a3830] text-ivory px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#efd09a]/20 text-[#efd09a] rounded">
              FREE MASTERCLASS PREVIEW
            </span>
            <span className="text-xs text-ivory/70 hidden sm:inline">
              Module {module.moduleNumber}: {module.title}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-ivory/80 hover:text-white transition-colors"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Simulated Video Masterclass Feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#121c17] via-[#1a2e24] to-[#0a120e] flex flex-col items-center justify-center p-8 text-center text-ivory">
            {/* Dual Camera Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[11px] text-[#efd09a]">
              <Video className="w-3.5 h-3.5 text-[#efd09a]" />
              <span>Multi-Angle: Overhead Keyboard + Teacher View</span>
            </div>

            {/* Sound of Devotion Watermark */}
            <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-ivory/40 font-serif">
              Just Prem Academy
            </div>

            {/* Video Content Graphic */}
            <div className="max-w-md">
              <span className="text-xs uppercase tracking-widest text-[#ad684d] font-medium block mb-2">
                Lesson {lesson.lessonNumber}
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-ivory tracking-tight mb-3">
                {lesson.title}
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed mb-6">
                {lesson.description}
              </p>

              {/* Central Play/Pause Trigger */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-[#ad684d] text-ivory flex items-center justify-center shadow-2xl transition-transform hover:scale-105 mx-auto"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <p className="mt-3 text-[11px] text-ivory/60 font-mono">
                {isPlaying ? "Playing Lesson Audio & Video (1080p HD)" : "Paused"}
              </p>
            </div>

            {/* Bottom Scrubber & Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2">
              {/* Progress Scrubber */}
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                <div className="h-full bg-[#ad684d] w-1/3 transition-all" />
              </div>

              <div className="flex items-center justify-between text-xs text-ivory/80">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] text-ivory/60">03:45 / {lesson.duration}</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSpeed(speed === 1 ? 1.25 : speed === 1.25 ? 0.75 : 1)}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                  >
                    {speed}x
                  </button>
                  <span className="text-[11px] uppercase tracking-wider text-[#efd09a] font-medium hidden sm:inline">
                    HD 1080p
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Content Below Video */}
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-6 border-b border-charcoal/15 pb-3">
            <button
              onClick={() => setActiveTab("notes")}
              className={`text-xs uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "notes" ? "border-[#ad684d] text-[#ad684d]" : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Lesson Notes & Key Takeaways
            </button>
            <button
              onClick={() => setActiveTab("swaras")}
              className={`text-xs uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "swaras" ? "border-[#ad684d] text-[#ad684d]" : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Swaras & Chords Reference
            </button>
            <button
              onClick={() => setActiveTab("curriculum")}
              className={`text-xs uppercase tracking-wider font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "curriculum" ? "border-[#ad684d] text-[#ad684d]" : "border-transparent text-charcoal/60 hover:text-charcoal"
              }`}
            >
              Module Context
            </button>
          </div>

          {/* Active Tab View */}
          <div className="mt-5 min-h-[140px]">
            {activeTab === "notes" && (
              <div>
                <h4 className="font-serif text-lg text-charcoal mb-2">{lesson.title}</h4>
                <p className="text-xs text-charcoal/75 leading-relaxed mb-4">{lesson.description}</p>
                {lesson.keyTakeaway && (
                  <div className="p-3 bg-[#f4efe5] border-l-2 border-[#567262] text-xs text-charcoal/90 italic font-serif mb-4">
                    &ldquo;{lesson.keyTakeaway}&rdquo;
                  </div>
                )}
                {lesson.notes && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase tracking-widest text-[#ad684d] font-semibold">Practice Pointers:</p>
                    {lesson.notes.map((note, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-charcoal/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#567262]" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "swaras" && (
              <div className="text-xs text-charcoal/80 space-y-3">
                <p>
                  In this lesson, we relate Indian classical swaras directly with Western keyboard notes:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-center">
                  {[
                    { s: "Sa", w: "C" },
                    { s: "Re", w: "D" },
                    { s: "Ga", w: "E" },
                    { s: "Ma", w: "F" },
                    { s: "Pa", w: "G" },
                    { s: "Dha", w: "A" },
                    { s: "Ni", w: "B" },
                    { s: "Sa'", w: "C'" },
                  ].map((pair, idx) => (
                    <div key={idx} className="p-2 border border-charcoal/15 bg-white/60 rounded">
                      <span className="block font-serif text-base text-[#ad684d] font-medium">{pair.s}</span>
                      <span className="block text-[10px] text-charcoal/60 uppercase">{pair.w}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-charcoal/60 italic">
                  * Remember: Sa is movable and adapts to your natural vocal range.
                </p>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="text-xs text-charcoal/75 space-y-2">
                <p>
                  <strong>Module {module.moduleNumber}: {module.title}</strong> — {module.subtitle}
                </p>
                <p>{module.purpose}</p>
                <p className="text-charcoal/60">
                  Total Lessons in this module: {module.lessons.length} ({module.duration})
                </p>
              </div>
            )}
          </div>

          {/* Bottom Conversion Banner */}
          <div className="mt-6 pt-5 border-t border-charcoal/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f4efe5] -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-5">
            <div>
              <p className="font-serif text-sm text-charcoal font-medium">
                Enjoying this lesson?
              </p>
              <p className="text-xs text-charcoal/70">
                Explore all five modules, 15 core lessons and your first seven kirtans.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onEnrollClick();
              }}
              className="inline-flex min-h-11 items-center justify-center bg-[#567262] hover:bg-forest text-ivory text-xs uppercase tracking-widest px-6 py-2.5 transition-all shrink-0"
            >
              Enroll for {COURSE_META.priceDisplay} &nbsp; ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
