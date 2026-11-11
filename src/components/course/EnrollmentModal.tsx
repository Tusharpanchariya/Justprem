"use client";

import { useState } from "react";
import { X, Sparkles, Check, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import { COURSE_META } from "@/data/courseData";
import { useCart } from "@/lib/context/CartContext";
import { useRouter } from "next/navigation";

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnrollmentModal({ isOpen, onClose }: EnrollmentModalProps) {
  const router = useRouter();
  const { addItem, setIsCartOpen } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!isOpen) return null;

  const handleEnrollment = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Add item to cart
    addItem({
      id: COURSE_META.id,
      name: `${COURSE_META.title} · ${COURSE_META.subtitle}`,
      slug: "sound-of-devotion-foundation",
      priceEUR: COURSE_META.priceEUR,
      image: "/harmonium-images/mainpage.JPG",
    });

    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onClose();
        router.push("/checkout");
      }, 1200);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-charcoal/70 backdrop-blur-md flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Course Enrollment"
    >
      <div className="relative w-full max-w-lg bg-ivory border border-charcoal/20 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#567262] text-ivory px-6 py-6 md:px-8 flex items-center justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#efd09a]">
              <Sparkles className="w-3.5 h-3.5" />
              Just Prem Academy
            </p>
            <h3 className="font-serif text-2xl text-ivory mt-1">Begin Your Sacred Journey</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-ivory/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#567262] text-[#efd09a] flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-2xl text-charcoal mb-2">Welcome to the Academy</h4>
            <p className="text-xs text-charcoal/70 mb-4">
              Taking you to the checkout to finalize your lifetime access...
            </p>
          </div>
        ) : (
          <form onSubmit={handleEnrollment} className="p-6 md:p-8 space-y-4">
            {/* Course Summary Box */}
            <div className="p-4 bg-[#f4efe5] border border-charcoal/15 flex items-baseline justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-charcoal/60">Selected Course</p>
                <h4 className="font-serif text-base text-charcoal font-medium">
                  {COURSE_META.title} · Foundation
                </h4>
                <p className="text-[11px] text-[#567262]">Lifetime Access · 5 Modules · 15 Lessons</p>
              </div>
              <span className="font-serif text-3xl text-[#ad684d] font-normal">
                {COURSE_META.priceDisplay}
              </span>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-charcoal mb-1">
                Full Name
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-3.5 py-2.5 border border-charcoal/20 bg-white/70 text-sm focus:border-[#567262] focus:outline-none placeholder:text-charcoal/35"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-charcoal mb-1">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com (Where course logins & PDFs are sent)"
                className="w-full px-3.5 py-2.5 border border-charcoal/20 bg-white/70 text-sm focus:border-[#567262] focus:outline-none placeholder:text-charcoal/35"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-charcoal mb-1">
                WhatsApp / Phone Number
              </label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 border border-charcoal/20 bg-white/70 text-sm focus:border-[#567262] focus:outline-none placeholder:text-charcoal/35"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-medium text-charcoal mb-1">
                Referral / Discount Code <span className="text-charcoal/40 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                placeholder="Enter coupon or referral"
                className="w-full px-3.5 py-2.5 border border-charcoal/20 bg-white/70 text-sm font-mono uppercase focus:border-[#567262] focus:outline-none placeholder:normal-case placeholder:font-sans placeholder:text-charcoal/35"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full mt-4 min-h-12 bg-[#567262] hover:bg-forest text-ivory text-xs uppercase tracking-[0.2em] font-medium py-3 px-6 transition-all flex items-center justify-center gap-2"
            >
              {status === "loading" ? "Setting up your access..." : `Proceed to Secure Checkout · ${COURSE_META.priceDisplay}`}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center">
              <p className="text-[11px] text-charcoal/60 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#567262]" />
                Beginner Friendly · Instant Lifetime Access
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
