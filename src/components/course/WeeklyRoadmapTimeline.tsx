"use client";

import { useState } from "react";
import { WEEKLY_ROADMAP, WeekPlan } from "@/data/courseData";
import { Calendar, Clock, CheckCircle2, Sparkles, Heart } from "lucide-react";

export function WeeklyRoadmapTimeline() {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const activePlan: WeekPlan =
    WEEKLY_ROADMAP.find((w) => w.week === selectedWeek) || WEEKLY_ROADMAP[0];

  return (
    <section id="roadmap" className="py-16 md:py-24 bg-ivory border-b border-charcoal/15">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
            —&nbsp;&nbsp; 07 / THE 10-WEEK STUDENT JOURNEY
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
            Your Structured<br />
            <em className="text-[#ad684d]">Path of Practice</em>
          </h2>
          <p className="mt-4 text-sm md:text-base text-charcoal/75 leading-relaxed">
            Follow our recommended 10-week journey or take it entirely at your own pace. Each week builds upon the previous one with gentle, sustainable consistency.
          </p>
        </div>

        {/* 10-Week Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin border-b border-charcoal/15 mb-8">
          {WEEKLY_ROADMAP.map((plan) => (
            <button
              key={plan.week}
              type="button"
              onClick={() => setSelectedWeek(plan.week)}
              className={`px-4 py-3 shrink-0 text-left transition-all border ${
                selectedWeek === plan.week
                  ? "border-[#567262] bg-[#567262] text-ivory shadow-md"
                  : "border-charcoal/15 bg-white/50 text-charcoal/70 hover:border-charcoal/30 hover:bg-white"
              }`}
            >
              <span className={`text-[10px] uppercase tracking-widest block font-mono ${
                selectedWeek === plan.week ? "text-[#efd09a]" : "text-[#ad684d]"
              }`}>
                WEEK 0{plan.week}
              </span>
              <span className="font-serif text-sm font-medium block truncate max-w-[130px] mt-0.5">
                {plan.title.split(":")[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Active Week Detail Card */}
        <div className="border border-charcoal/15 bg-[#fbf9f4] shadow-[12px_12px_0_#e8e0d1] p-6 md:p-10">
          <div className="grid md:grid-cols-[1.2fr_.8fr] gap-8 items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 bg-[#ad684d]/10 text-[#ad684d] font-semibold rounded-full">
                  WEEK 0{activePlan.week} OF 10
                </span>
                <span className="text-xs text-charcoal/60 font-mono flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#567262]" />
                  {activePlan.practiceHours}
                </span>
              </div>

              <h3 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                {activePlan.title}
              </h3>

              <p className="text-sm text-charcoal/75 leading-relaxed mb-6">
                <strong>Curriculum Focus:</strong> {activePlan.focus}
              </p>

              <div className="p-4 bg-white/80 border-l-2 border-[#567262] mb-6">
                <p className="text-[10px] uppercase tracking-widest text-[#567262] font-semibold mb-1">
                  WEEKLY TANGIBLE OUTCOME:
                </p>
                <p className="text-xs md:text-sm text-charcoal leading-relaxed">
                  {activePlan.outcome}
                </p>
              </div>

              <div className="flex items-start gap-2.5 text-xs text-charcoal/80 bg-[#f4efe5] p-4 rounded">
                <Heart className="w-4 h-4 text-[#ad684d] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal block mb-0.5">Devotional Sadhana Tip:</strong>
                  <span className="italic font-serif">&ldquo;{activePlan.sadhanaTip}&rdquo;</span>
                </div>
              </div>
            </div>

            {/* Quick Summary Box */}
            <div className="border border-charcoal/15 bg-ivory p-6 space-y-4">
              <h4 className="font-serif text-lg text-charcoal border-b border-charcoal/10 pb-2">
                Week 0{activePlan.week} Checklist
              </h4>

              <div className="space-y-3 text-xs text-charcoal/80">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#567262] shrink-0 mt-0.5" />
                  <span>Modules: {activePlan.modulesCovered}</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#567262] shrink-0 mt-0.5" />
                  <span>Handbook: Read companion chapter & exercises</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#567262] shrink-0 mt-0.5" />
                  <span>Sadhana: Log daily 20 mins in your practice journal</span>
                </div>
              </div>

              <div className="pt-4 border-t border-charcoal/10">
                <p className="text-[11px] text-charcoal/60">
                  Questions during your week? Share in the community forum or bring them to your capstone submission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
