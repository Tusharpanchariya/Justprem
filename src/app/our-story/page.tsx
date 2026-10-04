"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function OurStoryPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subscribeNews: false,
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ede9e3] text-charcoal">
      {/* SECTION 1: WHO WE ARE (Header section with picture) */}
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 max-w-[1500px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Story Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-8"
          >
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1a1a1a] tracking-tight font-normal mb-8 leading-none">
              Who we are
            </h1>

            {/* Sanskrit Quote */}
            <div className="mb-10">
              <p className="font-bold text-base text-[#1a1a1a] tracking-wide mb-0.5">
                प्रेम ही मार्ग है
              </p>
              <p className="font-serif italic text-sm text-[#4a4a4a]">
                Prema hī mārg hai — Love is the path
              </p>
            </div>

            {/* Story Paragraphs */}
            <div className="space-y-6 text-[#2d2d2d] text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              <p>
                We didn’t set out to build a brand.<br />
                <span className="italic font-serif font-medium">We followed a longing.</span><br />
                To walk together in service of something sacred.<br />
                To create spaces where hearts can breathe again —<br />
                and where devotion becomes a way of life.
              </p>

              <p>
                Just Prem was born in 2021 and continued with Vanamali Dasi, re-emerging and rebranding as <span className="italic font-serif font-medium">Just Prem</span> in 2024, when our paths came together by the Grace of our teacher. Since then, our life has become our practice.<br />
                We host soulful journeys — retreats and pilgrimages that bring you back to the beauty of nature, the silence within, and the song of your soul.
              </p>

              <p>
                Through sacred music, kirtan, mantra, and stillness, we invite you to remember what you already are.
              </p>

              <p>
                But more than that…<br />
                <span className="italic font-serif font-medium">we hold a dream.</span>
              </p>

              <p>
                A vision rooted deep in the mountains — a school, a sanctuary, a place not shared on social media. A space for those who feel the call.<br />
                Here, children and seekers will learn to chant, to sing, to speak the language of the sacred.<br />
                To study Sanskrit, scriptures, and the art of devotion — not to perform, but to carry the light forward into this fast and noisy world.
              </p>

              <p>
                We are still learning. Still becoming.<br />
                But we know this: we are here to serve.<br />
                To build slowly.<br />
                To live in tune with love.
              </p>

              <p>
                We are currently based in Rishikesh, growing our team and offering both online and in-person spaces of gathering, study, and remembrance.
              </p>

              <p>
                Just Prem is not a place. It is a prayer in motion.<br />
                A living ecosystem for those longing to live with more depth, more sincerity, and more connection to the Divine.
              </p>

              <p className="pt-4 font-serif italic text-lg text-[#1a1a1a] font-medium">
                Welcome home.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Founder / Header Image from about_page */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 h-full w-full"
          >
            <div className="relative w-full h-[500px] sm:h-[650px] lg:h-full min-h-[550px] rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/our-story/couple.webp"
                alt="Just Prem Founders"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* SECTION 2: CONNECT (With Mountain Background & Form) */}
      <section className="relative min-h-[700px] py-24 md:py-32 px-6 md:px-12 bg-cover bg-center overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/our-story/mountains.jpg"
            alt="Misty Rishikesh Mountains"
            fill
            className="object-cover object-center filter brightness-105 contrast-[0.92]"
          />
          {/* Subtle natural tint layer matching Screenshot 2 */}
          <div className="absolute inset-0 bg-[#d9d5bf]/30 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left side: Connect Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 text-[#1c2e1e]"
            >
              <h2 className="font-serif text-5xl sm:text-6xl text-[#2d402f] font-normal mb-8 tracking-tight">
                Connect
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-[#233324] mb-6 max-w-lg font-normal">
                Whether you&apos;re curious about our retreats, pilgrimages, community offerings, or ways to co-create — this is your space to reach out.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[#233324] mb-8 max-w-lg font-normal">
                At Just Prem, we believe in the power of sacred connection — in creating spaces where all feel seen, welcomed, and held in love. If something here stirs your heart, or you simply feel called to connect, we would be honoured to hear from you.
              </p>

              <div className="font-serif italic text-sm sm:text-base text-[#233324] space-y-1">
                <p>With love and in devotion,</p>
                <p className="font-medium">The Just Prem Family</p>
              </div>
            </motion.div>

            {/* Right side: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              {submitted ? (
                <div className="bg-white/60 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-[#4a5c4c]/20 shadow-sm text-center">
                  <h3 className="font-serif text-3xl text-[#1c2e1e] mb-4">Thank You</h3>
                  <p className="text-sm text-[#233324] leading-relaxed">
                    Your message has been received with warmth and gratitude. We will reach back out to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-xs uppercase tracking-widest text-[#1c2e1e] underline hover:opacity-75 transition-opacity"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-900 text-xs">
                      {errorMessage}
                    </div>
                  )}
                  {/* Name Fields */}
                  <div className="space-y-2">
                    <label className="block text-xs text-[#283829] font-medium tracking-wide">
                      Name
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full bg-white/30 backdrop-blur-sm border border-[#3e4f3f]/40 rounded-full px-5 py-2.5 text-sm text-[#1a2b1c] placeholder-[#3e4f3f]/60 focus:outline-none focus:ring-1 focus:ring-[#1c2e1e] focus:bg-white/50 transition-all"
                        />
                        <span className="text-[11px] text-[#2b3c2c] opacity-80 mt-1 block pl-2">
                          First Name (required)
                        </span>
                      </div>
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full bg-white/30 backdrop-blur-sm border border-[#3e4f3f]/40 rounded-full px-5 py-2.5 text-sm text-[#1a2b1c] placeholder-[#3e4f3f]/60 focus:outline-none focus:ring-1 focus:ring-[#1c2e1e] focus:bg-white/50 transition-all"
                        />
                        <span className="text-[11px] text-[#2b3c2c] opacity-80 mt-1 block pl-2">
                          Last Name (required)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="block text-xs text-[#283829] font-medium tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/30 backdrop-blur-sm border border-[#3e4f3f]/40 rounded-full px-5 py-2.5 text-sm text-[#1a2b1c] focus:outline-none focus:ring-1 focus:ring-[#1c2e1e] focus:bg-white/50 transition-all"
                    />
                    <span className="text-[11px] text-[#2b3c2c] opacity-80 block pl-2">
                      (required)
                    </span>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      type="checkbox"
                      id="signupNews"
                      checked={formData.subscribeNews}
                      onChange={(e) => setFormData({ ...formData, subscribeNews: e.target.checked })}
                      className="w-4 h-4 rounded-full accent-[#1c2e1e] cursor-pointer"
                    />
                    <label htmlFor="signupNews" className="text-xs text-[#283829] cursor-pointer">
                      Signup for news and updates
                    </label>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1 pt-1">
                    <label className="block text-xs text-[#283829] font-medium tracking-wide">
                      Message <span className="font-normal opacity-80">(required)</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white/30 backdrop-blur-sm border border-[#3e4f3f]/40 rounded-2xl p-4 text-sm text-[#1a2b1c] focus:outline-none focus:ring-1 focus:ring-[#1c2e1e] focus:bg-white/50 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black hover:bg-neutral-800 text-white font-medium text-sm px-8 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
