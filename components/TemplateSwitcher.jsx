'use client';
// ─── components/TemplateSwitcher.jsx ──────────────────────────────────────
// Palette icon button that opens a dropdown to switch between the 3 templates.

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import { templateList } from '../lib/templates';

export default function TemplateSwitcher({ className = '' }) {
  const { template, switchTemplate } = useApp();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Switch template"
        aria-expanded={open}
        aria-haspopup="listbox"
        title="Switch template"
        className={`
          flex items-center justify-center w-10 h-10 rounded-full
          border border-[var(--portfolio-border)] bg-[var(--portfolio-card)]
          text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)]
          hover:border-[var(--portfolio-accent)] transition-colors duration-200
        `}
      >
        <Palette size={18} strokeWidth={1.75} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="listbox"
            aria-label="Select template"
            className={`
              absolute right-0 top-12 z-50 min-w-[180px]
              bg-[var(--portfolio-card)] border border-[var(--portfolio-border)]
              rounded-xl shadow-xl overflow-hidden
            `}
          >
            <div className="p-1.5">
              <p className="px-3 py-1.5 text-xs text-[var(--portfolio-muted)] font-semibold uppercase tracking-wider">
                Template
              </p>
              {templateList.map((t) => {
                const isActive = template === t.id;
                return (
                  <motion.button
                    key={t.id}
                    role="option"
                    aria-selected={isActive}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.12 }}
                    onClick={() => {
                      switchTemplate(t.id);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                      text-sm font-medium transition-colors duration-150 text-left
                      ${isActive
                        ? 'bg-[var(--portfolio-accent)]/15 text-[var(--portfolio-accent)]'
                        : 'text-[var(--portfolio-text)] hover:bg-[var(--portfolio-border)]'
                      }
                    `}
                  >
                    <span className="text-base leading-none" aria-hidden="true">{t.icon}</span>
                    <span className="flex-1">{t.name}</span>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Check size={14} className="text-[var(--portfolio-accent)]" />
                      </motion.span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
