"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function AboutCollectionSection() {
  return (
    <section className="bg-[#c8cec0] px-6 py-16 md:px-12 md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.45fr_0.7fr] lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h2 className="mb-10 font-serif text-[clamp(2rem,3vw,2.8rem)] leading-tight text-charcoal">
            About the Collection
          </h2>
          <div className="space-y-5 text-sm leading-relaxed text-charcoal md:text-base">
            <p>
              Rooted in the signature colors of Just Prem – soft lavender tones, earthy shades and natural textures – these harmoniums instantly draw the eye through their unique finish, sculptural presence and thoughtful craftsmanship. Their lightweight and compact form makes them ideal companions for travel, ceremonies, Kirtan, meditation and creative gatherings, while also standing beautifully as pieces of art on their own.
            </p>
            <p>
              Each harmonium carries its own distinct character through the natural wood grain and hand-finished details, blending elegance with uniqueness. Designed for both beauty and function, they offer a soulful sound experience in a form that feels grounding, warm and incredibly inspiring.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[420px] aspect-[4/5] overflow-hidden"
        >
          <Image
            src="/harmonium-images/about-the-collection.webp"
            alt="Musicians gathered around Just Prem harmoniums"
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
