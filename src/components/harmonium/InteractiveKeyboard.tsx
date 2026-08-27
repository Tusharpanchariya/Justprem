"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { harmoniumSynth } from "@/lib/audio/HarmoniumSynth";

// Simplified list of natural and sharp keys for a 32-key harmonium.
const keys = Array.from({ length: 32 }, (_, i) => {
  const isSharp = [1, 3, 6, 8, 10].includes(i % 12);
  return { id: i, note: `Note-${i}`, isSharp };
});

export function InteractiveKeyboard() {
  const [activeKey, setActiveKey] = useState<number | null>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleCount = useRef(0);
  
  const playNote = (keyId: number, e: React.MouseEvent | React.TouchEvent) => {
    setActiveKey(keyId);
    if (harmoniumSynth) harmoniumSynth.playNote(keyId);
    
    // Create ripple effect
    let rect;
    let clientX, clientY;
    if ("touches" in e) {
        rect = (e.target as HTMLElement).getBoundingClientRect();
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        clientX = e.clientX;
        clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    const newRipple = { id: rippleCount.current++, x, y };
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1500);
  };

  const stopNote = (keyId: number) => {
    if (activeKey === keyId) {
      setActiveKey(null);
    }
    if (harmoniumSynth) harmoniumSynth.stopNote(keyId);
  };

  return (
    <div className="w-full overflow-x-auto pb-16 hide-scrollbar cursor-pointer flex justify-center">
      <div className="min-w-[900px] perspective-[1200px] px-8">
        
        {/* The Premium Wood Chassis */}
        <div 
          className="relative p-6 md:p-10 rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)] border-t border-b-4 border-[#1a0f0a] transform rotate-x-[15deg] translate-z-[50px] transform-style-3d bg-cover bg-center"
          style={{ backgroundImage: 'url(/harmonium-images/pur-1.webp)' }}
        >
          {/* Dark overlay to make the wood grain visible but suitable for UI */}
          <div className="absolute inset-0 bg-[#2c1810]/70 rounded-sm pointer-events-none" />

          {/* Brass Accent Line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-[#8a7342] via-[#d4af37] to-[#8a7342] shadow-sm rounded-full z-10" />

          <div className="text-center mt-6 mb-10 transform translate-z-[10px] relative z-10">
            <p className="font-serif text-[#d4af37] uppercase tracking-[0.3em] text-xs opacity-90 drop-shadow-md bg-black/30 inline-block px-4 py-1 rounded-sm">
              Touch to Awaken
            </p>
          </div>

          {/* Keyboard Bed */}
          <div className="relative z-10 flex h-56 md:h-72 bg-[#0a0a0a] p-2 rounded-md shadow-[inset_0_20px_40px_rgba(0,0,0,0.9)] border-t-[12px] border-black/80">
            
            {/* White Keys */}
            {keys.map((key) => !key.isSharp && (
              <div
                key={key.id}
                onMouseDown={(e) => playNote(key.id, e)}
                onTouchStart={(e) => playNote(key.id, e)}
                onMouseUp={() => stopNote(key.id)}
                onMouseLeave={() => stopNote(key.id)}
                onTouchEnd={() => stopNote(key.id)}
                onTouchCancel={() => stopNote(key.id)}
                className={`relative flex-1 mx-[1px] rounded-b-md transform origin-top transition-all duration-150 overflow-hidden ${
                  activeKey === key.id 
                    ? "rotate-x-[4deg] translate-y-2 bg-[#e6e4dc] shadow-[inset_0_-2px_5px_rgba(0,0,0,0.2)]" 
                    : "bg-[#fcfbf9] shadow-[0_6px_0_#d1cfc7,0_10px_10px_rgba(0,0,0,0.4)] hover:bg-[#ffffff]"
                }`}
                style={{ zIndex: 10 }}
              >
                {/* Vintage Ivory Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none" />

                {/* Wood reflection line */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

                {/* Ripples */}
                <AnimatePresence>
                  {ripples.map(ripple => (
                    <motion.div
                      key={ripple.id}
                      initial={{ opacity: 0.8, scale: 0 }}
                      animate={{ opacity: 0, scale: 4 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute rounded-full bg-[#d4af37]/30 pointer-events-none blur-sm"
                      style={{
                        left: ripple.x - 20,
                        top: ripple.y - 20,
                        width: 40,
                        height: 40,
                      }}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ))}

            {/* Black Keys */}
            <div className="absolute top-2 left-2 right-2 h-[65%] flex pointer-events-none" style={{ zIndex: 20 }}>
              {keys.map((key) => {
                if (!key.isSharp) {
                    return <div key={key.id} className="flex-1" />;
                }
                return (
                  <div key={key.id} className="flex-1 relative">
                    <div
                      onMouseDown={(e) => playNote(key.id, e)}
                      onTouchStart={(e) => playNote(key.id, e)}
                      onMouseUp={() => stopNote(key.id)}
                      onMouseLeave={() => stopNote(key.id)}
                      onTouchEnd={() => stopNote(key.id)}
                      onTouchCancel={() => stopNote(key.id)}
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-full rounded-b-sm pointer-events-auto transform origin-top transition-all duration-150 ${
                        activeKey === key.id 
                          ? "rotate-x-[4deg] translate-y-1 bg-[#111] shadow-[inset_0_-1px_3px_rgba(255,255,255,0.1)]" 
                          : "bg-[#1a1a1a] shadow-[0_5px_0_#000,2px_8px_10px_rgba(0,0,0,0.6)] hover:bg-[#222]"
                      }`}
                    >
                      {/* Subtle light reflection on black keys */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[90%] bg-gradient-to-b from-white/10 to-transparent rounded-sm pointer-events-none" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
          
          {/* Bottom Brass Accent */}
          <div className="absolute bottom-4 left-4 right-4 h-1 bg-gradient-to-r from-[#8a7342] via-[#d4af37] to-[#8a7342] shadow-sm rounded-full opacity-50" />
        </div>
      </div>
    </div>
  );
}
