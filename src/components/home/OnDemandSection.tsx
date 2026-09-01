"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function OnDemandSection() {
  return (
    <section className="bg-ivory pb-32 pt-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Big Image of people playing harmoniums */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/5] lg:aspect-square relative overflow-hidden bg-sandstone/10 rounded-sm shadow-sm"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('/harmonium-images/preview-section.webp')` }}
            />
          </motion.div>

          {/* Right Column: Pre-order info & products */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-start"
            >
              <span className="text-[10px] md:text-xs uppercase tracking-widest text-charcoal/60 mb-2">
                Pre-order
              </span>
              <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-charcoal leading-tight mb-4">
                On Demand
              </h2>
              <p className="text-sm text-charcoal/70 mb-6 max-w-md leading-relaxed">
                These harmoniums are handcrafted upon request. Please allow 20–25 days for production before shipping.
              </p>
              
              <Link
                href="/harmoniums"
                className="inline-flex items-center justify-center border border-charcoal/80 rounded-full py-3 px-8 text-xs uppercase tracking-widest text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-300 font-medium mb-12"
              >
                Shop the Collection
              </Link>
            </motion.div>

            {/* On-demand products */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Product 1 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="group flex flex-col"
              >
                <Link href="/harmoniums/kirtan-mini-deluxe" className="flex flex-col">
                <div className="relative aspect-[4/5] bg-sandstone/20 overflow-hidden mb-4 rounded-sm">
                  {/* SOLD OUT Badge */}
                  <div className="absolute top-3 right-3 bg-charcoal text-ivory text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium z-10">
                    Sold Out
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('/harmonium-images/kirtan/kirtan1.webp')` }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-serif text-sm md:text-base text-charcoal leading-snug mb-1">
                  Kirtan Mini Deluxe Harmonium (27 keys) ON DEMAND
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest">
                  <span className="text-charcoal/80">€950.00</span>
                  <span className="text-charcoal/40 line-through">€1,350.00</span>
                </div>
                </Link>
              </motion.div>

              {/* Product 2 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group flex flex-col"
              >
                <Link href="/harmoniums/eclipse" className="flex flex-col">
                <div className="relative aspect-[4/5] bg-sandstone/20 overflow-hidden mb-4 rounded-sm">
                  {/* SOLD OUT Badge */}
                  <div className="absolute top-3 right-3 bg-charcoal text-ivory text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium z-10">
                    Sold Out
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('/harmonium-images/eclipse/eclipse.webp')` }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-serif text-sm md:text-base text-charcoal leading-snug mb-1">
                  Just Prem &quot;Eclipse&quot; (32 keys) ON DEMAND
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest">
                  <span className="text-charcoal/80">€850.00</span>
                  <span className="text-charcoal/40 line-through">€1,200.00</span>
                </div>
                </Link>
              </motion.div>

              {/* Product 3 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="group flex flex-col"
              >
                <Link href="/harmoniums/saffron" className="flex flex-col">
                <div className="relative aspect-[4/5] bg-sandstone/20 overflow-hidden mb-4 rounded-sm">
                  <div className="absolute top-3 right-3 bg-charcoal text-ivory text-[9px] uppercase tracking-widest px-2.5 py-1 font-medium z-10">
                    Sold Out
                  </div>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url('/harmonium-images/saffron/saffron.webp')` }}
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <h3 className="font-serif text-sm md:text-base text-charcoal leading-snug mb-1">
                  Just Prem &quot;Saffron&quot; (32 Keys) ON DEMAND
                </h3>
                <div className="flex items-center gap-2 text-xs md:text-sm tracking-widest">
                  <span className="text-charcoal/80">â‚¬850.00</span>
                  <span className="text-charcoal/40 line-through">â‚¬1,200.00</span>
                </div>
                </Link>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
