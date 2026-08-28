"use client";
// ─── components/PillMorphTabs.jsx ─────────────────────────────────────────────
// Animated morphing pill navigation component adapted for PortifyAI
// Features: glassmorphism, smooth spring animations, responsive design

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

/**
 * PillMorphTabs - Animated pill navigation with morphing indicator
 *
 * @param {Array} items - Navigation items with value, label, and optional panel
 * @param {string} defaultValue - Default active tab value
 * @param {string} value - Controlled active tab value (for external control)
 * @param {Function} onValueChange - Callback when value changes
 * @param {string} className - Additional CSS classes
 */
export default function PillMorphTabs({
  items = [],
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
}) {
  const first = items[0]?.value ?? "tab-0";
  const [internalValue, setInternalValue] = useState(defaultValue ?? first);

  // Sync internal state with controlled value when it changes
  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const listRef = useRef(null);
  const triggerRefs = useRef({});

  const [indicator, setIndicator] = useState(null);
  const [isExpanding, setIsExpanding] = useState(false);

  // Measure position & width of active trigger and set indicator
  const measure = useCallback(() => {
    const list = listRef.current;
    const activeEl = triggerRefs.current[value];
    if (!list || !activeEl) {
      setIndicator(null);
      return;
    }
    const listRect = list.getBoundingClientRect();
    const tRect = activeEl.getBoundingClientRect();
    setIndicator({
      left: tRect.left - listRect.left + list.scrollLeft,
      width: tRect.width,
    });
  }, [value]);

  // Measure on mount, value changes and resize
  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (listRef.current) ro.observe(listRef.current);
    Object.values(triggerRefs.current).forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Trigger expand animation when value changes
  useEffect(() => {
    setIsExpanding(true);
    const id = window.setTimeout(() => setIsExpanding(false), 300);
    return () => window.clearTimeout(id);
  }, [value]);

  // Notify parent of value changes
  useEffect(() => {
    if (onValueChange) onValueChange(value);
  }, [value, onValueChange]);

  const handleValueChange = (newValue) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    if (onValueChange) onValueChange(newValue);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={listRef}
        className={cn(
          "relative",
          // Glassmorphism + subtle gradient
          "inline-flex items-center gap-2 p-1 rounded-full",
          "bg-white/6 dark:bg-white/3 backdrop-blur-sm",
          "border border-white/6 dark:border-white/6",
        )}
        style={{
          // Soft gradient overlay (works both light/dark)
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.00))",
        }}
      >
        {/* Animated pill indicator */}
        {indicator && (
          <motion.div
            layout
            initial={false}
            animate={{
              left: indicator.left,
              width: indicator.width,
              // Slight vertical expand when "isExpanding"
              scaleY: isExpanding ? 1.06 : 1,
              borderRadius: isExpanding ? 24 : 999,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
            className="absolute pointer-events-none top-1 bottom-1 rounded-full"
            style={{
              // Gradient + subtle glass fill + soft border & shadow
              background:
                "linear-gradient(90deg, rgba(124,58,237,0.18), rgba(6,182,212,0.14))",
              boxShadow: "0 6px 20px rgba(16,24,40,0.08)",
              border: "1px solid rgba(255,255,255,0.04)",
              left: indicator.left,
              width: indicator.width,
            }}
          />
        )}

        {/* Blur glow behind pill for extra depth */}
        {indicator && (
          <motion.div
            layout
            initial={false}
            animate={{ left: indicator.left, width: indicator.width }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="absolute pointer-events-none top-0 bottom-0 rounded-full filter blur-2xl opacity-40"
            style={{
              background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
              mixBlendMode: "screen",
              left: indicator.left,
              width: indicator.width,
            }}
          />
        )}

        {/* Tab triggers */}
        <div className="relative flex gap-1 p-1">
          {items.map((it) => {
            const isActive = it.value === value;
            return (
              <button
                key={it.value}
                type="button"
                ref={(el) => (triggerRefs.current[it.value] = el)}
                onClick={() => handleValueChange(it.value)}
                className={cn(
                  "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive
                    ? "text-white"
                    : "text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]",
                )}
              >
                {it.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panels - optional content for each tab */}
      <div className="mt-4">
        {items.map(
          (it) =>
            it.value === value &&
            it.panel && (
              <div key={it.value} className="p-2">
                {it.panel}
              </div>
            ),
        )}
      </div>
    </div>
  );
}
