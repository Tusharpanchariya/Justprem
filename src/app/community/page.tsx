"use client";

import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-forest pt-32 pb-24 text-ivory">
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-saffron mb-6"
        >
          The Community
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl leading-tight mb-8"
        >
          A Global Sangha of <br />
          <span className="italic text-wood">Devotion</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-ivory/70 max-w-2xl mx-auto"
        >
          Whether you are chanting in your living room or joining us in the Himalayas, you are part of the JustPrem family. Our community is bound by a shared love for sacred sound, authentic connection, and spiritual growth.
        </motion.p>
      </section>

      <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        {/* Card 1 */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent opacity-90" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="font-serif text-3xl mb-4">Kirtan Gatherings</h2>
            <p className="text-sm text-ivory/70">Join our monthly online and offline kirtan sessions.</p>
          </div>
        </div>
        
        {/* Card 2 */}
        <div className="relative aspect-square md:aspect-[4/5] overflow-hidden group mt-12 md:mt-24">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1000&auto=format&fit=crop')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-forest to-transparent opacity-90" />
          <div className="absolute bottom-10 left-10 right-10">
            <h2 className="font-serif text-3xl mb-4">Workshops</h2>
            <p className="text-sm text-ivory/70">Learn how to play the harmonium and dive deep into mantra science.</p>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="max-w-xl mx-auto px-6 text-center">
        <h3 className="font-serif text-2xl mb-6">Stay Close to the Journey</h3>
        <p className="text-sm text-ivory/70 mb-8">Join our newsletter to receive updates on retreats, instruments, and community events.</p>
        <form className="flex border-b border-ivory/30 pb-2">
          <input type="email" placeholder="Email Address" className="w-full bg-transparent outline-none text-sm placeholder:text-ivory/50" />
          <button type="button" className="text-xs uppercase tracking-widest hover:text-saffron transition-colors">Join</button>
        </form>
      </section>
    </div>
  );
}
