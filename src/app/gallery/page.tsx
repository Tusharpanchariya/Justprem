"use client";

import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582298654854-f5ebba6e70a4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558556405-30717447d251?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=800&auto=format&fit=crop"
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl text-charcoal uppercase tracking-widest"
        >
          Gallery
        </motion.h1>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((src, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid"
          >
            <div className="relative overflow-hidden rounded-sm group cursor-pointer">
              <img src={src} alt="JustPrem Journey" className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
