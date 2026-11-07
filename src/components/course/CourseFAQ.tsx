"use client";

import { useState } from "react";
import { FAQS } from "@/data/courseData";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export function CourseFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-[#f4efe5] border-b border-charcoal/15">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <p className="text-[10px] uppercase tracking-[0.22em] text-wood md:text-xs mb-3">
            —&nbsp;&nbsp; 08 / CLARITY & GUIDANCE
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.6rem)] leading-[0.88] text-charcoal">
            Frequently Asked<br />
            <em className="text-[#ad684d]">Questions</em>
          </h2>
          <p className="mt-4 text-sm text-charcoal/70 max-w-lg mx-auto">
            Everything you need to know about starting your harmonium journey with Just Prem.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`border transition-colors overflow-hidden ${
                  isOpen ? "border-charcoal/30 bg-ivory shadow-sm" : "border-charcoal/15 bg-ivory/60 hover:border-charcoal/25"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <span className="font-serif text-lg md:text-xl text-charcoal pr-4">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-full border border-charcoal/15 flex items-center justify-center text-charcoal/60 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs md:text-sm text-charcoal/75 leading-relaxed border-t border-charcoal/10 font-sans">
                    {faq.answer}
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
