"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockHarmoniums } from "@/lib/data/mockProducts";

export function HomeCollection() {
  // Show only the first 3 harmoniums on the homepage
  const displayProducts = mockHarmoniums.slice(0, 3);

  return (
    <section className="bg-ivory py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4 md:gap-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-[clamp(1.75rem,5vw,3rem)] text-charcoal uppercase tracking-widest mb-2 md:mb-4 leading-tight"
            >
              The Collection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-charcoal/60 uppercase tracking-widest text-xs"
            >
              Instruments of devotion
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/harmoniums"
              className="text-xs uppercase tracking-widest border-b border-charcoal pb-1 hover:text-saffron hover:border-saffron transition-colors"
            >
              View All Instruments
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              key={product.id}
              className="group flex flex-col"
            >
              <Link href={`/harmoniums/${product.slug}`} className="block relative aspect-[4/5] bg-sandstone/20 overflow-hidden mb-6">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl text-charcoal">
                  <Link href={`/harmoniums/${product.slug}`} className="hover:text-saffron transition-colors">
                    {product.name}
                  </Link>
                </h3>
                <span className="text-sm tracking-widest text-charcoal/80">€{product.priceEUR.toLocaleString()}</span>
              </div>
              
              <p className="text-xs text-charcoal/50 uppercase tracking-widest">
                {product.categories.join(" · ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
