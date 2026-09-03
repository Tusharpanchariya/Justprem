"use client";

import { motion } from "framer-motion";

const reviews = [
  { src: "/reviews/review-1.mp4", label: "Customer video review one" },
  { src: "/reviews/review-2.mp4", label: "Customer video review two" },
  { src: "/reviews/review-3.mp4", label: "Customer video review three" },
  { src: "/reviews/review-4.mp4", label: "Customer video review four" },
  { src: "/reviews/review-5.mp4", label: "Customer video review five" },
  { src: "/reviews/review-6.mp4", label: "Customer video review six" },
  { src: "/reviews/review-7.mp4", label: "Customer video review seven" },
];

export function ReviewFeedback() {
  return (
    <section className="bg-white px-6 py-24 md:py-32" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="mb-3 text-center text-xs uppercase tracking-[0.26em] text-charcoal/55">From our community</p>
          <h2 id="reviews-heading" className="font-serif text-center text-4xl text-charcoal md:text-6xl">Reviews &amp; Feedback</h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 md:mt-20 md:gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.src}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative aspect-[9/14] overflow-hidden bg-charcoal"
            >
              <video controls playsInline preload="metadata" className="h-full w-full object-cover" aria-label={review.label}>
                <source src={review.src} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/45 to-transparent px-3 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-widest text-white">Customer review</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-12 max-w-xl border-l-2 border-saffron bg-ivory px-6 py-5 text-center md:mt-16 md:px-10">
          <p className="font-serif text-xl leading-relaxed text-charcoal md:text-2xl">“The sound is incredible. I enjoy it very much and highly recommend it.”</p>
          <footer className="mt-3 text-xs uppercase tracking-[0.18em] text-charcoal/55">A member of the JustPrem community</footer>
        </motion.blockquote>
      </div>
    </section>
  );
}
