"use client";

import { HANDBOOK_SECTIONS } from "@/data/courseData";
import { Download, BookOpen, Check, FileText, Sparkles } from "lucide-react";

export function PDFHandbookSection() {
  return (
    <section id="handbook" className="py-16 md:py-24 bg-[#f4efe5] border-b border-charcoal/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-end border-b border-charcoal/15 pb-10 mb-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
              —&nbsp;&nbsp; 06 / COMPREHENSIVE COURSE MANUAL
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
              The Harmonium Foundation<br />
              <em className="text-[#ad684d]">Handbook</em>
            </h2>
            <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed max-w-xl">
              104 pages of practical charts, finger patterns, chord matrices, and songsheets. Keep this beautifully designed companion book beside your harmonium so you never have to squint at a screen during personal Sadhana.
            </p>
          </div>

          <div className="p-6 bg-ivory border border-charcoal/15 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-[#ad684d]" />
              <span className="font-serif text-lg text-charcoal font-medium">Included with Lifetime Access</span>
            </div>
            <p className="text-xs text-charcoal/70 leading-relaxed">
              Printable high-resolution PDF with lay-flat margins, large note typography, and spiral-binding readiness.
            </p>
          </div>
        </div>

        {/* 14 Sections Visual Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {HANDBOOK_SECTIONS.map((sec) => (
            <div
              key={sec.number}
              className="border border-charcoal/15 bg-ivory p-5 flex flex-col justify-between hover:border-[#ad684d] transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-charcoal/50 uppercase tracking-widest font-mono mb-2">
                  <span>SECTION 0{sec.number}</span>
                  <span className="text-[#ad684d]">{sec.pages}</span>
                </div>

                <h3 className="font-serif text-lg text-charcoal group-hover:text-[#ad684d] transition-colors leading-snug mb-1">
                  {sec.title}
                </h3>

                <p className="text-xs text-charcoal/60 font-medium mb-3">
                  {sec.subtitle}
                </p>

                <p className="text-xs text-charcoal/75 leading-relaxed mb-4">
                  {sec.description}
                </p>
              </div>

              <div className="pt-3 border-t border-charcoal/10 space-y-1">
                {sec.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-charcoal/70">
                    <span className="text-[#567262]">•</span>
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Download Preview Box */}
        <div className="mt-12 p-6 md:p-8 bg-ivory border border-charcoal/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded bg-[#567262]/10 text-[#567262] flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-charcoal font-medium">
                Just Prem Sound of Devotion Handbook (Sample Excerpt)
              </h4>
              <p className="text-xs text-charcoal/65">
                Includes Module 2 & 4 cheat-sheets, Swara chart & Om Namah Shivaya chords (PDF · 4.2 MB)
              </p>
            </div>
          </div>

          <a
            href="#curriculum"
            className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#ad684d] text-[#ad684d] hover:bg-[#ad684d] hover:text-ivory px-5 py-2.5 text-xs uppercase tracking-widest transition-colors font-medium shrink-0"
          >
            <Download className="w-4 h-4" />
            Download Sample Excerpt
          </a>
        </div>
      </div>
    </section>
  );
}
