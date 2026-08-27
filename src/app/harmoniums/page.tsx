"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { mockHarmoniums } from "@/lib/data/mockProducts";
import { Filter } from "lucide-react";

export default function HarmoniumsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      {/* Header Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-6xl text-charcoal mb-6 uppercase tracking-widest"
        >
          The JustPrem Collection
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif italic text-xl md:text-2xl text-wood max-w-2xl"
        >
          Every instrument carries its own character.<br />
          Every sound becomes part of the journey.
        </motion.p>
      </section>

      <div className="px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Filters sidebar - Desktop */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-32">
            <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            <ul className="space-y-4 text-sm tracking-wide text-charcoal">
              {["All", "Travel", "Studio", "Kirtan", "Professional"].map(filter => (
                <li key={filter}>
                  <button 
                    onClick={() => setActiveFilter(filter)}
                    className={`transition-colors hover:text-saffron ${activeFilter === filter ? "text-saffron font-medium" : "opacity-80"}`}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockHarmoniums
            .filter(h => activeFilter === "All" || h.categories.includes(activeFilter))
            .map((product, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              key={product.id}
              className="group flex flex-col"
            >
              <Link href={`/harmoniums/${product.slug}`} className="block relative aspect-[4/5] bg-sandstone/20 overflow-hidden mb-6">
                {/* Status Badge */}
                {product.availability === "SOLD_OUT" && (
                  <div className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest px-3 py-1 bg-charcoal text-ivory">
                    Sold Out
                  </div>
                )}
                {product.availability === "ON_DEMAND" && (
                  <div className="absolute top-4 left-4 z-10 text-[10px] uppercase tracking-widest px-3 py-1 bg-wood text-ivory">
                    On Demand
                  </div>
                )}
                
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
              
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="font-serif text-2xl text-charcoal">
                    <Link href={`/harmoniums/${product.slug}`} className="hover:text-saffron transition-colors">
                      {product.name}
                    </Link>
                  </h2>
                  <span className="text-sm tracking-widest">₹{product.priceINR.toLocaleString()}</span>
                </div>
                
                <p className="text-xs text-charcoal/60 uppercase tracking-widest mb-3">
                  {product.keyCount} Keys
                </p>
                
                <p className="text-sm text-charcoal/80 mb-6 flex-1">
                  {product.shortDescription}
                </p>

                <Link
                  href={`/harmoniums/${product.slug}`}
                  className="inline-flex items-center text-xs uppercase tracking-widest font-medium hover:text-saffron transition-colors group/btn"
                >
                  Explore 
                  <span className="ml-2 transform group-hover/btn:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
}
