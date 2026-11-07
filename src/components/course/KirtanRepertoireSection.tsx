"use client";

import { useState } from "react";
import { KIRTAN_REPERTOIRE, KirtanSong } from "@/data/courseData";
import { Music, Sparkles, Check, ArrowRight } from "lucide-react";

export function KirtanRepertoireSection() {
  const [filter, setFilter] = useState<"all" | "Major" | "Minor">("all");

  const filteredSongs = KIRTAN_REPERTOIRE.filter((song) => {
    if (filter === "all") return true;
    return song.scaleType === filter;
  });

  const pedagogicalSteps = [
    { num: "1", title: "Devotional Feeling (Bhāva)", desc: "Spiritual meaning, mantra origin & heart intention" },
    { num: "2", title: "Key & Scale Discovery", desc: "Identifying root Sa and harmonic landscape" },
    { num: "3", title: "Overhead Melody Demo", desc: "Close-up finger numbers along the keys" },
    { num: "4", title: "Chord Shapes", desc: "Forming root, 3rd, and 5th with fluid hand transitions" },
    { num: "5", title: "Chord Progressions", desc: "Practicing the loop with steady rhythm" },
    { num: "6", title: "Slow Practice Run", desc: "Detailed step-by-step guidance at half speed" },
    { num: "7", title: "Normal Tempo Flow", desc: "Adding natural bellows pulse & tempo momentum" },
    { num: "8", title: "Full Sing & Play Offering", desc: "Singing and playing simultaneously with devotion" },
  ];

  return (
    <section id="kirtans" className="py-16 md:py-24 bg-ivory border-b border-charcoal/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-charcoal/15 pb-8 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
              —&nbsp;&nbsp; 05 / THE SACRED REPERTOIRE
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
              Learn 10 Complete<br />
              <em className="text-[#ad684d]">Devotional Kirtans</em>
            </h2>
            <p className="mt-4 text-sm text-charcoal/70 max-w-xl">
              Carefully curated from the Just Prem repertoire. 5 in bright, celebratory major keys and 5 in deep, introspective minor keys.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filter === "all" ? "bg-[#567262] text-ivory" : "bg-[#f4efe5] text-charcoal/70 hover:text-charcoal"
              }`}
            >
              All 10 Songs
            </button>
            <button
              type="button"
              onClick={() => setFilter("Major")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filter === "Major" ? "bg-[#ad684d] text-ivory" : "bg-[#f4efe5] text-charcoal/70 hover:text-charcoal"
              }`}
            >
              5 Major Keys
            </button>
            <button
              type="button"
              onClick={() => setFilter("Minor")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all ${
                filter === "Minor" ? "bg-[#a07e5b] text-ivory" : "bg-[#f4efe5] text-charcoal/70 hover:text-charcoal"
              }`}
            >
              5 Minor Keys
            </button>
          </div>
        </div>

        {/* 8-Step Pedagogical Blueprint Banner */}
        <div className="mb-12 p-6 md:p-8 bg-[#f4efe5] border border-charcoal/15">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#ad684d]" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#ad684d]">
              OUR CONSISTENT 8-STEP TEACHING METHOD
            </span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-charcoal mb-4">
            Every Single Kirtan Follows the Exact Same Blueprint
          </h3>
          <p className="text-xs text-charcoal/70 leading-relaxed mb-6 max-w-3xl">
            You will never feel lost. By applying this consistent 8-step structure across all 10 songs, you develop a reliable mental map that allows you to learn any new chant effortlessly.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {pedagogicalSteps.map((step) => (
              <div key={step.num} className="p-3 bg-white/70 border border-charcoal/10 rounded">
                <span className="font-serif text-lg text-[#ad684d] font-bold block mb-1">
                  0{step.num}
                </span>
                <h4 className="text-[11px] font-semibold text-charcoal leading-tight mb-1">
                  {step.title}
                </h4>
                <p className="text-[10px] text-charcoal/60 leading-tight">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Kirtan Songs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredSongs.map((song) => {
            const isMajor = song.scaleType === "Major";

            return (
              <article
                key={song.id}
                className="border border-charcoal/15 bg-white/60 p-6 md:p-8 hover:border-[#ad684d] transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-xs font-mono font-semibold text-[#ad684d]">
                      KIRTAN 0{song.number}
                    </span>
                    <span
                      className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded font-medium ${
                        isMajor ? "bg-[#567262]/10 text-[#567262]" : "bg-[#ad684d]/10 text-[#ad684d]"
                      }`}
                    >
                      {song.key} · {song.scaleType}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-charcoal group-hover:text-[#ad684d] transition-colors mb-1">
                    {song.title}
                  </h3>

                  <p className="font-serif italic text-xs text-charcoal/70 mb-4 line-clamp-1">
                    &ldquo;{song.mantra}&rdquo;
                  </p>

                  <p className="text-xs text-charcoal/75 leading-relaxed mb-5">
                    {song.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-charcoal/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-charcoal/50 uppercase tracking-wider text-[10px]">Chords:</span>
                    <span className="font-serif font-medium text-charcoal text-sm">{song.chordProgression}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-charcoal/50 uppercase tracking-wider text-[10px]">Focus:</span>
                    <span className="text-charcoal/80 text-[11px] text-right">{song.focus}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-charcoal/50 uppercase tracking-wider text-[10px]">Tempo:</span>
                    <span className="text-charcoal/70 font-mono text-[11px]">{song.tempo}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
