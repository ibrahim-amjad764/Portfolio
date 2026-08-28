"use client";
// ─── components/ThemeToggle.jsx ────────────────────────────────────────────
// Dark / light mode toggle with animated Sun/Moon icon swap.

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useApp } from "../lib/AppContext";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full
        border border-[var(--portfolio-border)] bg-[var(--portfolio-card)]
        text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)]
        hover:border-[var(--portfolio-accent)] transition-colors duration-200
        focus-visible:outline-2 focus-visible:outline-[var(--portfolio-accent)]
        overflow-hidden
        ${className}
      `}
    >
      {/* AnimatePresence is required so exit animation fires on icon swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={18} strokeWidth={1.75} />
          ) : (
            <Sun size={18} strokeWidth={1.75} />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
