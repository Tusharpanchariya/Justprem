"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ReadMoreText({
  previewText,
  fullText,
}: {
  previewText: React.ReactNode;
  fullText: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-4 text-sm leading-6 text-charcoal/70">
      <AnimatePresence initial={false} mode="wait">
        {!isExpanded ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {previewText}
            <button
              onClick={() => setIsExpanded(true)}
              className="mt-2 block text-xs font-semibold uppercase tracking-widest text-[#ad684d] hover:text-charcoal transition-colors"
            >
              Know more
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {fullText}
            <button
              onClick={() => setIsExpanded(false)}
              className="mt-2 block text-xs font-semibold uppercase tracking-widest text-charcoal/50 hover:text-charcoal transition-colors"
            >
              Show less
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
