"use client";

import { useState } from "react";
import { CHORD_FAMILIES_DATA, ChordFamilyKey } from "@/data/courseData";
import { Sparkles, Music, BookOpen, Layers } from "lucide-react";

export function InteractiveTheoryExplorer() {
  const [selectedKey, setSelectedKey] = useState<string>("C Major");

  const currentFamily: ChordFamilyKey =
    CHORD_FAMILIES_DATA.find((f) => f.key === selectedKey) || CHORD_FAMILIES_DATA[0];

  return (
    <section className="py-16 md:py-24 bg-[#f4efe5] border-b border-charcoal/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
            —&nbsp;&nbsp; 04 / INTERACTIVE MUSICAL FOUNDATION
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
            The Family Chords<br />
            <em className="text-[#ad684d]">Secret Matrix</em>
          </h2>
          <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed">
            Never memorize hundreds of random chords. In Module 4, we teach you how every musical scale gives birth to 7 family chords. Once you know this formula, you can play thousands of devotional kirtans effortlessly.
          </p>
        </div>

        {/* Interactive Explorer Container */}
        <div className="border border-charcoal/15 bg-ivory shadow-[12px_12px_0_#e8e0d1] p-6 md:p-10">
          {/* Key Selection Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/15 pb-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#ad684d] font-semibold block mb-1">
                STEP 1: SELECT A KEY
              </span>
              <p className="font-serif text-xl text-charcoal">Explore the 7 Family Chords</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {CHORD_FAMILIES_DATA.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelectedKey(item.key)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                    selectedKey === item.key
                      ? "bg-[#567262] text-ivory shadow-sm"
                      : "bg-[#f4efe5] text-charcoal/70 hover:text-charcoal hover:bg-[#eae3d5]"
                  }`}
                >
                  {item.key}
                </button>
              ))}
            </div>
          </div>

          {/* Scale Degrees Cards Grid */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-charcoal/60 font-medium">
                The 7 Degrees of {currentFamily.key} ({currentFamily.type})
              </span>
              <span className="text-[11px] text-[#ad684d] font-mono">
                Formula: {currentFamily.type === "Major" ? "I - ii - iii - IV - V - vi - vii°" : "i - ii° - III - iv - v - VI - VII"}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {currentFamily.degrees.map((chordDegree, idx) => {
                const isMajor = chordDegree.quality === "Major";
                const isMinor = chordDegree.quality === "Minor";
                const isDim = chordDegree.quality === "Diminished";

                return (
                  <div
                    key={idx}
                    className={`p-4 border rounded transition-transform hover:-translate-y-1 ${
                      isMajor
                        ? "border-[#567262]/30 bg-[#567262]/5"
                        : isMinor
                        ? "border-[#ad684d]/30 bg-[#ad684d]/5"
                        : "border-charcoal/20 bg-charcoal/5"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-mono tracking-widest text-charcoal/50 block mb-1">
                      Degree {chordDegree.degree}
                    </span>
                    <h4 className="font-serif text-2xl md:text-3xl text-charcoal font-medium">
                      {chordDegree.chord}
                    </h4>
                    <span
                      className={`inline-block mt-1 text-[10px] uppercase tracking-wider font-semibold ${
                        isMajor ? "text-[#567262]" : isMinor ? "text-[#ad684d]" : "text-charcoal/60"
                      }`}
                    >
                      {chordDegree.quality}
                    </span>
                    <p className="mt-2 text-[11px] text-charcoal/60 font-mono border-t border-charcoal/10 pt-1.5">
                      {chordDegree.notes}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Progressions in this key */}
          <div className="mt-10 pt-8 border-t border-charcoal/15">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#ad684d]" />
              <h3 className="font-serif text-xl text-charcoal">
                Devotional Chord Progressions in {currentFamily.key}
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {currentFamily.popularProgressions.map((prog, idx) => (
                <div key={idx} className="p-4 border border-charcoal/15 bg-[#fbf9f4]">
                  <span className="text-[10px] uppercase tracking-widest text-[#ad684d] font-semibold block mb-1">
                    {prog.name}
                  </span>
                  <p className="font-mono text-xs text-charcoal/60 mb-1">{prog.formula}</p>
                  <p className="font-serif text-xl text-[#567262] font-medium mb-2">
                    {prog.chords}
                  </p>
                  <p className="text-xs text-charcoal/70 italic font-serif">
                    &ldquo;{prog.mood}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Swara Relationship Callout */}
          <div className="mt-10 p-5 bg-[#567262]/10 border border-[#567262]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Layers className="w-5 h-5 text-[#567262] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-serif text-base text-charcoal font-medium">
                  The Principle of the Movable Sa
                </h4>
                <p className="text-xs text-charcoal/75 leading-relaxed mt-0.5">
                  Unlike Western music where C is fixed at 261 Hz, in Indian music <strong>Sa is movable</strong>. You choose your Sa based on your vocal comfort, and all family chords adjust automatically. We teach you this magic step-by-step.
                </p>
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest font-mono text-[#567262] font-semibold shrink-0">
              Module 3.6 & 4.5
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
