"use client";

import {
  motion,
  type Target,
  type TargetAndTransition,
  type Transition,
  type VariantLabels,
} from "motion/react";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";

/* ─────────────────────────────────────────────
 *  Preset type – every animation mode supported
 * ───────────────────────────────────────────── */
export type AnimationPreset =
  | "roll"
  | "fade"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "scale"
  | "glitch"
  | "wave"
  | "bounce"
  | "typewriter"
  | "scramble"
  | "blur"
  | "elastic"
  | "rotate"
  | "neon"
  | "mask-reveal"
  | "split"
  | "drop"
  | "swing";

/* ─────────────────────────────────────────────
 *  Public props – fully typed, self-documenting
 * ───────────────────────────────────────────── */
export type TextRollProps = {
  /** The raw string to animate */
  children: string;
  /** Built-in animation preset (default "roll") */
  preset?: AnimationPreset;
  /** Per-segment animation duration in seconds (default 0.5) */
  duration?: number;
  /** Delay between each segment's start (default 0.05) */
  stagger?: number;
  /** Global delay before first segment starts (default 0) */
  delay?: number;
  /** Override enter/exit motion variants */
  variants?: {
    enter: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
    exit?: {
      initial: Target | VariantLabels | boolean;
      animate: TargetAndTransition | VariantLabels;
    };
  };
  /** Override framer-motion Transition config */
  transition?: Transition;
  /** Loop the animation indefinitely (default false) */
  loop?: boolean;
  /** Pause between loops in seconds (default 2) */
  loopDelay?: number;
  /** Hover micro-interaction type */
  hoverEffect?: "scale" | "color" | "glow" | "bounce" | "flip" | "none";
  /** CSS color applied on hover (used with hoverEffect "color") */
  hoverColor?: string;
  /** Only start animation when element enters viewport (default false) */
  triggerOnView?: boolean;
  /** IntersectionObserver threshold 0–1 (default 0.3) */
  viewThreshold?: number;
  /** Character pool for scramble preset */
  scrambleChars?: string;
  /** Show a blinking cursor (typewriter / scramble) */
  showCursor?: boolean;
  /** The cursor character (default "|") */
  cursorChar?: string;
  /** Cursor blink cycle in seconds (default 0.7) */
  cursorBlinkSpeed?: number;
  /** Glow colour for neon preset (default "#00ff88") */
  neonColor?: string;
  /** Class on the outer <span> wrapper */
  className?: string;
  /** Class on every individual segment <span> */
  letterClassName?: string;
  /** Split strategy – letter-by-letter or word-by-word */
  splitBy?: "letter" | "word";
  /** Fires once when the last segment finishes animating */
  onAnimationComplete?: () => void;
  /** Fires once when the first segment starts animating */
  onAnimationStart?: () => void;
};

/* ─────────────────────────────────────────────
 *  Internal shape for a single preset config
 * ───────────────────────────────────────────── */
type PresetConfig = {
  enter: { initial: Target; animate: TargetAndTransition };
  exit?: { initial: Target; animate: TargetAndTransition };
  transition: Transition;
  containerStyle?: string;
};

/* ─────────────────────────────────────────────
 *  All 20 presets – lazy factories so unused
 *  variants are never allocated
 * ───────────────────────────────────────────── */
const presets: Record<AnimationPreset, () => PresetConfig> = {
  roll: () => ({
    enter: {
      initial: { rotateX: 90, opacity: 0 },
      animate: { rotateX: 0, opacity: 1 },
    },
    exit: {
      initial: { rotateX: 0, opacity: 1 },
      animate: { rotateX: -90, opacity: 0 },
    },
    transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    containerStyle: "perspective-[1000px]",
  }),

  fade: () => ({
    enter: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    exit: { initial: { opacity: 1 }, animate: { opacity: 0 } },
    transition: { ease: "easeOut" },
  }),

  "slide-up": () => ({
    enter: {
      initial: { y: "100%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    exit: {
      initial: { y: 0, opacity: 1 },
      animate: { y: "-100%", opacity: 0 },
    },
    transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    containerStyle: "overflow-hidden",
  }),

  /* slide-down: starts above, slides into place —
     opacity included so text never flashes before
     the overflow-hidden clips it */
  "slide-down": () => ({
    enter: {
      initial: { y: "-100%", opacity: 0 },
      animate: { y: 0, opacity: 1 },
    },
    exit: { initial: { y: 0, opacity: 1 }, animate: { y: "100%", opacity: 0 } },
    transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    containerStyle: "overflow-hidden",
  }),

  "slide-left": () => ({
    enter: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    exit: {
      initial: { x: 0, opacity: 1 },
      animate: { x: "-100%", opacity: 0 },
    },
    transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    containerStyle: "overflow-hidden",
  }),

  "slide-right": () => ({
    enter: {
      initial: { x: "-100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
    },
    exit: { initial: { x: 0, opacity: 1 }, animate: { x: "100%", opacity: 0 } },
    transition: { ease: [0.25, 0.46, 0.45, 0.94] },
    containerStyle: "overflow-hidden",
  }),

  scale: () => ({
    enter: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
    },
    exit: {
      initial: { scale: 1, opacity: 1 },
      animate: { scale: 0, opacity: 0 },
    },
    transition: { ease: "backOut" },
  }),

  glitch: () => ({
    enter: {
      initial: { x: 0, opacity: 0, filter: "blur(10px)" },
      animate: { x: 0, opacity: 1, filter: "blur(0px)" },
    },
    transition: { ease: "linear" },
  }),

  wave: () => ({
    enter: { initial: { y: 0 }, animate: { y: -15 } },
    exit: { initial: { y: -15 }, animate: { y: 0 } },
    transition: { ease: "easeInOut", repeat: 2, repeatType: "reverse" },
  }),

  bounce: () => ({
    enter: { initial: { y: -200, opacity: 0 }, animate: { y: 0, opacity: 1 } },
    exit: { initial: { y: 0, opacity: 1 }, animate: { y: 200, opacity: 0 } },
    transition: { ease: "bounceOut" },
  }),

  typewriter: () => ({
    enter: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    transition: { ease: "linear", duration: 0 },
  }),

  scramble: () => ({
    enter: { initial: { opacity: 1 }, animate: { opacity: 1 } },
    transition: { ease: "linear", duration: 0 },
  }),

  blur: () => ({
    enter: {
      initial: { filter: "blur(20px)", opacity: 0 },
      animate: { filter: "blur(0px)", opacity: 1 },
    },
    exit: {
      initial: { filter: "blur(0px)", opacity: 1 },
      animate: { filter: "blur(20px)", opacity: 0 },
    },
    transition: { ease: "easeOut" },
  }),

  elastic: () => ({
    enter: { initial: { scale: 0, y: 50 }, animate: { scale: 1, y: 0 } },
    exit: { initial: { scale: 1, y: 0 }, animate: { scale: 0, y: -50 } },
    transition: { type: "spring", stiffness: 200, damping: 15 },
  }),

  rotate: () => ({
    enter: {
      initial: { rotate: -180, scale: 0, opacity: 0 },
      animate: { rotate: 0, scale: 1, opacity: 1 },
    },
    exit: {
      initial: { rotate: 0, scale: 1, opacity: 1 },
      animate: { rotate: 180, scale: 0, opacity: 0 },
    },
    transition: { ease: "easeOut" },
    containerStyle: "perspective-[1000px]",
  }),

  neon: () => ({
    enter: {
      initial: { opacity: 0, textShadow: "0 0 0px currentColor" },
      animate: {
        opacity: 1,
        textShadow:
          "0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor",
      },
    },
    exit: { initial: { opacity: 1 }, animate: { opacity: 0 } },
    transition: { ease: "easeOut" },
  }),

  "mask-reveal": () => ({
    enter: { initial: { y: "110%" }, animate: { y: 0 } },
    exit: { initial: { y: 0 }, animate: { y: "-110%" } },
    transition: { ease: [0.77, 0, 0.175, 1] },
    containerStyle: "overflow-hidden",
  }),

  split: () => ({
    enter: { initial: { y: 0, x: 0 }, animate: { y: 0, x: 0 } },
    exit: { initial: { y: 0, x: 0 }, animate: { y: 0, x: 0 } },
    transition: { ease: "easeOut" },
  }),

  drop: () => ({
    enter: {
      initial: { y: -100, rotate: -15, opacity: 0 },
      animate: { y: 0, rotate: 0, opacity: 1 },
    },
    exit: {
      initial: { y: 0, rotate: 0, opacity: 1 },
      animate: { y: 100, rotate: 15, opacity: 0 },
    },
    transition: { ease: "bounceOut" },
  }),

  swing: () => ({
    enter: {
      initial: { rotate: 45, opacity: 0 },
      animate: { rotate: 0, opacity: 1 },
    },
    exit: {
      initial: { rotate: 0, opacity: 1 },
      animate: { rotate: -45, opacity: 0 },
    },
    transition: { ease: "easeOut" },
  }),
};

/* ─────────────────────────────────────────────
 *  Hover micro-interaction variants
 * ───────────────────────────────────────────── */
const hoverVariants = {
  none: {},
  scale: {
    hover: { scale: 1.3, transition: { type: "spring", stiffness: 400 } },
  },
  color: { hover: { transition: { duration: 0.2 } } },
  glow: {
    hover: {
      textShadow: "0 0 20px currentColor, 0 0 40px currentColor",
      transition: { duration: 0.2 },
    },
  },
  bounce: {
    hover: {
      y: -10,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  },
  flip: {
    hover: { rotateY: 360, transition: { duration: 0.6, ease: "easeInOut" } },
  },
};

/* ═════════════════════════════════════════════
 *  TextRoll – animated text component
 *  Splits a string into letters/words and applies
 *  staggered motion presets with optional hover,
 *  loop, view-trigger, cursor and scramble support.
 * ═════════════════════════════════════════════ */
export function TextRoll({
  children,
  preset = "roll",
  duration = 0.5,
  stagger = 0.05,
  delay = 0,
  variants,
  transition,
  loop = false,
  loopDelay = 2,
  hoverEffect = "none",
  hoverColor,
  triggerOnView = false,
  viewThreshold = 0.3,
  scrambleChars = "!@#$%^&*()_+{}|:<>?~",
  showCursor = false,
  cursorChar = "|",
  cursorBlinkSpeed = 0.7,
  neonColor,
  className,
  letterClassName,
  splitBy = "letter",
  onAnimationComplete,
  onAnimationStart,
}: TextRollProps) {
  /* ── State ── */
  const [isInView, setIsInView] = useState(!triggerOnView);
  const [isAnimating, setIsAnimating] = useState(true);
  const [scrambleTexts, setScrambleTexts] = useState<string[]>([]);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  /* Using *state* instead of a plain ref so that bumping
     the key actually triggers a re-render and re-mounts
     the motion spans – critical for loop & hover re-trigger */
  const [animationKey, setAnimationKey] = useState(0);

  const containerRef = useRef<HTMLSpanElement>(null);

  /* ── Memoised derived values ── */
  // Split the raw string into animatable segments
  const segments = useMemo(
    () => (splitBy === "word" ? children.split(" ") : children.split("")),
    [children, splitBy],
  );
  const isWordMode = splitBy === "word";

  // Resolve the preset config once (lazy factory → cached result)
  const presetConfig = useMemo(
    () => (preset ? presets[preset]() : null),
    [preset],
  );

  /* ── Intersection Observer: trigger animation on scroll ── */
  useEffect(() => {
    if (!triggerOnView || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log(
            "[TextRoll] Element entered viewport → starting animation",
            { preset },
          );
          setIsInView(true);
          observer.disconnect(); // one-shot: only trigger once
        }
      },
      { threshold: viewThreshold },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [triggerOnView, viewThreshold, preset]);

  /* ── Cursor blink interval ── */
  useEffect(() => {
    if (!showCursor) return;
    const id = setInterval(
      () => setCursorVisible((v) => !v),
      cursorBlinkSpeed * 1000,
    );
    return () => clearInterval(id);
  }, [showCursor, cursorBlinkSpeed]);

  /* ── Scramble effect: randomise characters then resolve ── */
  useEffect(() => {
    if (preset !== "scramble" || !isInView) return;

    const targetLetters = children.split("");
    const totalSteps = targetLetters.length + 5;
    let step = 0;

    console.log("[TextRoll] Scramble started", { text: children, totalSteps });
    onAnimationStart?.();

    const id = setInterval(() => {
      const newScramble = targetLetters.map((letter, i) => {
        // Characters before the "reveal wave" stay resolved
        if (i < step - 4) return letter;
        // Spaces never scramble
        if (letter === " ") return " ";
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      });

      setScrambleTexts(newScramble);
      step++;

      if (step > totalSteps) {
        clearInterval(id);
        setScrambleTexts(targetLetters);
        console.log("[TextRoll] Scramble complete");
        onAnimationComplete?.();
      }
    }, 50);

    return () => clearInterval(id);
  }, [
    preset,
    isInView,
    children,
    scrambleChars,
    onAnimationStart,
    onAnimationComplete,
  ]);

  /* ── Typewriter effect: reveal one character at a time ── */
  useEffect(() => {
    if (preset !== "typewriter" || !isInView) return;

    const letters = children.split("");
    console.log("[TextRoll] Typewriter started", {
      length: letters.length,
      speed: duration,
    });

    onAnimationStart?.();

    const id = setInterval(() => {
      setTypewriterIndex((prev) => {
        const next = prev + 1;
        if (next > letters.length) {
          clearInterval(id);
          console.log("[TextRoll] Typewriter complete");
          onAnimationComplete?.();
          return prev;
        }
        return next;
      });
    }, duration * 1000);

    return () => clearInterval(id);
  }, [
    preset,
    isInView,
    children,
    duration,
    onAnimationStart,
    onAnimationComplete,
  ]);

  /* ── Loop: reset and replay the animation ── */
  useEffect(() => {
    if (!loop) return;

    // Calculate how long the full animation takes before looping
    const fullDuration = duration + stagger * segments.length + loopDelay;

    const id = setInterval(() => {
      // Phase 1: collapse to exit state
      setIsAnimating(false);

      // Phase 2: after a brief pause, reset and replay
      setTimeout(() => {
        setAnimationKey((k) => k + 1);
        setIsAnimating(true);

        // Reset special modes
        if (preset === "scramble") {
          setScrambleTexts(
            children
              .split("")
              .map((l) =>
                l === " "
                  ? " "
                  : scrambleChars[
                      Math.floor(Math.random() * scrambleChars.length)
                    ],
              ),
          );
        }
        if (preset === "typewriter") setTypewriterIndex(0);

        console.log("[TextRoll] Loop cycle restarted", {
          preset,
          fullDuration,
        });
      }, 100);
    }, fullDuration * 1000);

    return () => clearInterval(id);
  }, [
    loop,
    loopDelay,
    duration,
    stagger,
    segments.length,
    preset,
    children,
    scrambleChars,
  ]);

  /* ── Per-segment stagger delay calculator ── */
  const getDelay = useCallback(
    (index: number) => {
      // Typewriter & scramble handle their own timing
      if (preset === "typewriter" || preset === "scramble") return 0;
      return delay + index * stagger;
    },
    [delay, stagger, preset],
  );

  /* ── Resolve hover variant once ── */
  const resolvedHover =
    hoverEffect !== "none" ? hoverVariants[hoverEffect].hover : undefined;

  /* ══════════════════════════════════════════
   *  SPECIAL RENDERERS
   *  Each preset with unique DOM structure gets
   *  its own early-return block for clarity.
   * ══════════════════════════════════════════ */

  // ── SCRAMBLE ──
  if (preset === "scramble" && !variants) {
    return (
      <span ref={containerRef} className={className}>
        {isInView &&
          scrambleTexts.map((char, i) => (
            <motion.span
              key={`s-${animationKey}-${i}`}
              className={`inline-block ${char === children[i] ? "text-foreground" : "text-muted-foreground"} ${letterClassName || ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02, duration: 0.1 }}
              whileHover={resolvedHover}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        {showCursor && isInView && (
          <motion.span
            className="inline-block ml-0.5"
            animate={{ opacity: cursorVisible ? 1 : 0 }}
          >
            {cursorChar}
          </motion.span>
        )}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  // ── TYPEWRITER ──
  if (preset === "typewriter" && !variants) {
    return (
      <span ref={containerRef} className={className}>
        {isInView &&
          children.split("").map((char, i) => (
            <motion.span
              key={`t-${animationKey}-${i}`}
              className={`inline-block ${letterClassName || ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < typewriterIndex ? 1 : 0 }}
              transition={{ duration: 0 }}
              whileHover={resolvedHover}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        {showCursor && isInView && (
          <motion.span
            className="inline-block ml-0.5 font-light"
            animate={{ opacity: cursorVisible ? 1 : 0 }}
          >
            {cursorChar}
          </motion.span>
        )}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  // ── SPLIT ── (even/odd segments fly in from opposite directions)
  if (preset === "split" && !variants) {
    const totalSegments = segments.length;
    const splitAmount = 20; // px offset for the split spread

    return (
      <span ref={containerRef} className={className}>
        {isInView &&
          segments.map((segment, i) => {
            const isEven = i % 2 === 0;
            const displayText = isWordMode
              ? segment === ""
                ? "\u00A0"
                : segment + " "
              : segment === " "
                ? "\u00A0"
                : segment;

            return (
              <motion.span
                key={`sp-${animationKey}-${i}`}
                className={`inline-block ${letterClassName || ""}`}
                initial={{
                  y: isEven ? -splitAmount : splitAmount,
                  x: isEven ? -splitAmount / 2 : splitAmount / 2,
                  opacity: 0,
                  rotate: isEven ? -10 : 10,
                }}
                animate={{ y: 0, x: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: getDelay(i),
                  duration,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={resolvedHover}
                onAnimationComplete={
                  i === totalSegments - 1 ? onAnimationComplete : undefined
                }
              >
                {displayText}
              </motion.span>
            );
          })}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  // ── WAVE ── (continuous oscillation, each segment phase-shifted)
  if (preset === "wave" && !variants) {
    return (
      <span ref={containerRef} className={className}>
        {isInView &&
          segments.map((segment, i) => {
            const displayText = isWordMode ? segment + " " : segment;

            return (
              <motion.span
                key={`w-${animationKey}-${i}`}
                className={`inline-block ${letterClassName || ""}`}
                animate={{ y: [0, -15, 0] }}
                transition={{
                  delay: i * stagger,
                  duration: 0.8,
                  ease: "easeInOut",
                  repeat: loop ? Infinity : 2,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
                whileHover={
                  resolvedHover || {
                    y: -25,
                    transition: { type: "spring", stiffness: 400 },
                  }
                }
              >
                {segment === " " ? "\u00A0" : displayText}
              </motion.span>
            );
          })}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  // ── GLITCH ── (chromatic-aberration with red/cyan offset layers)
  if (preset === "glitch" && !variants) {
    return (
      <span
        ref={containerRef}
        className={`relative inline-block ${className || ""}`}
      >
        {isInView &&
          segments.map((segment, i) => {
            const displayText = segment === " " ? "\u00A0" : segment;

            return (
              <motion.span
                key={`g-${animationKey}-${i}`}
                className={`relative inline-block ${letterClassName || ""}`}
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: getDelay(i), duration, ease: "linear" }}
              >
                {/* Base layer */}
                <span className="relative z-10">{displayText}</span>

                {/* Red offset layer */}
                <motion.span
                  className="absolute top-0 left-0 text-red-500 opacity-0 z-20"
                  style={{ mixBlendMode: "multiply" }}
                  animate={{ opacity: [0, 0.8, 0], x: [0, -3, 2, 0] }}
                  transition={{
                    delay: getDelay(i) + 0.1,
                    duration: 0.3,
                    repeat: 3,
                    repeatDelay: 0.5,
                  }}
                >
                  {displayText}
                </motion.span>

                {/* Cyan offset layer */}
                <motion.span
                  className="absolute top-0 left-0 text-cyan-500 opacity-0 z-20"
                  style={{ mixBlendMode: "multiply" }}
                  animate={{ opacity: [0, 0.8, 0], x: [0, 3, -2, 0] }}
                  transition={{
                    delay: getDelay(i) + 0.15,
                    duration: 0.3,
                    repeat: 3,
                    repeatDelay: 0.5,
                  }}
                >
                  {displayText}
                </motion.span>
              </motion.span>
            );
          })}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  // ── NEON ── (progressive glow buildup via text-shadow keyframes)
  if (preset === "neon" && !variants) {
    const color = neonColor || "#00ff88";

    return (
      <span ref={containerRef} className={className}>
        {isInView &&
          segments.map((segment, i) => {
            const displayText = segment === " " ? "\u00A0" : segment;

            return (
              <motion.span
                key={`n-${animationKey}-${i}`}
                className={`inline-block ${letterClassName || ""}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  textShadow: [
                    `0 0 0px ${color}`,
                    `0 0 7px ${color}`,
                    `0 0 10px ${color}`,
                    `0 0 21px ${color}`,
                    `0 0 42px ${color}`,
                    `0 0 82px ${color}`,
                    `0 0 92px ${color}`,
                    `0 0 102px ${color}`,
                    `0 0 151px ${color}`,
                  ],
                }}
                transition={{
                  delay: getDelay(i),
                  duration: duration * 2,
                  ease: "easeOut",
                }}
                whileHover={{
                  scale: 1.2,
                  textShadow: `0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
                }}
              >
                {displayText}
              </motion.span>
            );
          })}
        <span className="sr-only">{children}</span>
      </span>
    );
  }

  /* ══════════════════════════════════════════
   *  GENERIC RENDERER
   *  Used for: roll, fade, slide-up, slide-down,
   *  slide-left, slide-right, scale, blur, elastic,
   *  rotate, mask-reveal, drop, swing
   * ══════════════════════════════════════════ */
  const currentPreset = presetConfig || presets.roll();
  const enterConfig = variants?.enter || currentPreset.enter;
  const currentTransition = transition || currentPreset.transition;

  console.log("[TextRoll] Render", {
    preset,
    segments: segments.length,
    isAnimating,
    isInView,
    animationKey,
  });

  return (
    <span
      ref={containerRef}
      className={`${currentPreset.containerStyle || ""} ${className || ""}`}
    >
      {isInView &&
        segments.map((segment, i) => {
          // Build display text – add nbsp after words in word mode,
          // or replace spaces with nbsp in letter mode
          const displayText = isWordMode
            ? segment === ""
              ? "\u00A0"
              : segment + "\u00A0"
            : segment === " "
              ? "\u00A0"
              : segment;

          const isLast = i === segments.length - 1;

          return (
            <motion.span
              key={`g-${animationKey}-${i}`}
              className={`inline-block ${letterClassName || ""}`}
              initial={enterConfig.initial}
              animate={isAnimating ? enterConfig.animate : undefined}
              transition={{
                ...currentTransition,
                delay: getDelay(i),
                duration,
              }}
              whileHover={resolvedHover}
              onAnimationComplete={isLast ? onAnimationComplete : undefined}
              style={neonColor ? { color: neonColor } : undefined}
            >
              {displayText}
            </motion.span>
          );
        })}
      {showCursor && isInView && (
        <motion.span
          className="inline-block ml-0.5"
          animate={{ opacity: cursorVisible ? 1 : 0 }}
        >
          {cursorChar}
        </motion.span>
      )}
      {/* Screen-reader-only fallback for accessibility */}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default TextRoll;
