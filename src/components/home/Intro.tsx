"use client";

import { motion } from "framer-motion";

export function Intro() {
  return (
    <section className="py-32 md:py-48 px-6 bg-ivory">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-charcoal leading-tight">
            Some journeys take you somewhere.<br />
            <span className="italic text-wood">Some journeys bring you back to yourself.</span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
