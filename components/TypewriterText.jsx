"use client";
// ─── components/TypewriterText.jsx ─────────────────────────────────────────
// Cycles through an array of phrases with smooth AnimatePresence transitions.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * @param {object} props
 * @param {string[]} props.phrases   — array of strings to cycle through
 * @param {number}  [props.interval] — ms between phrase changes (default 3000)
 * @param {string}  [props.className]
 */
export default function TypewriterText({
  phrases = [],
  interval = 3000,
  className = "",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (phrases.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, interval);
    return () => clearInterval(timer);
  }, [phrases, interval]);

  return (
    <span
      className={`relative inline-block ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={phrases[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          className="inline-block"
        >
          {phrases[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
