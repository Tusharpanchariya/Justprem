"use client";

import Image from "next/image";
import { PlayCircle, ShieldCheck, Check, Sparkles, ShoppingBag, Download, Video, Music, BookOpen, Clock } from "lucide-react";
import { COURSE_META } from "@/data/courseData";
import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

interface StickyCourseEnrollCardProps {
  onOpenVideoPreview: () => void;
  onEnrollClick: () => void;
}

export function StickyCourseEnrollCard({ onOpenVideoPreview, onEnrollClick }: StickyCourseEnrollCardProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: COURSE_META.id,
      name: `${COURSE_META.title} · ${COURSE_META.subtitle}`,
      slug: "sound-of-devotion-foundation",
      priceEUR: COURSE_META.priceEUR,
      image: "/harmonium-images/mainpage.JPG",
    });
    setAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const inclusions = [
    { icon: Video, text: "15 core lessons across five beginner-friendly modules" },
    { icon: Music, text: "Recognise notes and practise Sargam" },
    { icon: Music, text: "Learn seven first devotional kirtans" },
    { icon: BookOpen, text: "Learn foundational scales, chords and chord families" },
    { icon: Download, text: "Beginner-friendly harmonium guidance" },
    { icon: Music, text: "Practise singing with your harmonium" },
    { icon: Clock, text: "Self-paced learning" },
    { icon: Sparkles, text: "Lifetime access on mobile, tablet & desktop" },
  ];

  return (
    <aside className="w-full lg:max-w-sm xl:max-w-md border border-charcoal/15 bg-ivory shadow-[16px_16px_0_#e8e0d1] overflow-hidden sticky top-24 z-20">
      {/* Video Preview Thumbnail */}
      <div className="relative aspect-video w-full bg-forest overflow-hidden group cursor-pointer" onClick={onOpenVideoPreview}>
        <Image
          src="/course_images/justprem-kirtan.png"
          alt="Harmonium and vocal masterclass preview"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory">
          <div className="w-16 h-16 rounded-full bg-ivory/90 text-[#ad684d] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
            <PlayCircle className="w-9 h-9 fill-[#ad684d] text-ivory ml-0.5" />
          </div>
          <span className="mt-3 text-xs uppercase tracking-widest font-medium bg-forest/80 px-3 py-1 rounded backdrop-blur-sm">
            Preview Course Lesson
          </span>
        </div>

        <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-widest text-[#efd09a]">
          Lesson 1.1 Preview Available
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Pricing header */}
        <div className="flex items-baseline justify-between border-b border-charcoal/15 pb-5">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-5xl md:text-6xl text-[#ad684d] tracking-tight">
                {COURSE_META.priceDisplay}
              </span>
              <span className="text-xs uppercase tracking-widest text-charcoal/60">One-time payment</span>
            </div>
            <p className="mt-1 text-[11px] text-[#567262] font-medium">
              108 · Sacred number of mantras & devotion
            </p>
          </div>
          <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#567262]/10 text-[#567262] rounded font-medium">
            Lifetime Access
          </span>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onEnrollClick}
            className="w-full min-h-13 bg-[#567262] hover:bg-forest text-ivory text-xs uppercase tracking-[0.2em] font-medium py-4 px-6 transition-all hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
          >
            Enroll in Course &nbsp; ↗
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full min-h-12 border border-charcoal/20 hover:border-charcoal bg-transparent text-charcoal text-xs uppercase tracking-widest py-3 px-6 transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#ad684d]" />
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>
        </div>

        <p className="mt-3 text-center text-[11px] text-charcoal/60 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#567262]" />
          No previous musical experience needed
        </p>

        {/* Course Inclusions Checklist */}
        <div className="mt-7 pt-6 border-t border-charcoal/15">
          <h4 className="text-xs uppercase tracking-widest font-semibold text-charcoal mb-4">
            Your Level 1 Course Includes:
          </h4>
          <ul className="space-y-3 text-xs text-charcoal/80">
            {inclusions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <Icon className="w-4 h-4 text-[#ad684d] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Share or Gift callout */}
        <div className="mt-8 pt-5 border-t border-charcoal/15 bg-[#f4efe5] -mx-6 -mb-6 md:-mx-8 md:-mb-8 p-5 text-center">
          <p className="text-[11px] text-charcoal/70">
            Want to study privately 1-to-1 with live teachers?
          </p>
          <a
            href="/sound-of-devotion#class-offerings"
            className="inline-block mt-1 text-xs uppercase tracking-wider font-medium text-[#ad684d] hover:underline"
          >
            Explore 1-on-1 Mentorship (€850) &nbsp; ↗
          </a>
        </div>
      </div>
    </aside>
  );
}
