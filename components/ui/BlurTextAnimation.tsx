"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

/* ─────────────────────────────────────────────
 *  Word-level configuration – each word can
 *  have independent timing, blur and scale.
 * ───────────────────────────────────────────── */
interface WordData {
  text: string;
  duration: number;
  delay: number;
  blur: number;
  scale?: number;
}

/* ─────────────────────────────────────────────
 *  Public props – designed to work both as a
 *  standalone showcase AND as an inline element
 *  inside existing layouts (e.g. a motion.p).
 * ───────────────────────────────────────────── */
interface BlurTextAnimationProps {
  /** Raw text to animate (split on spaces) */
  text?: string;
  /** Pre-built per-word config (overrides `text` splitting) */
  words?: WordData[];
  /** Outer wrapper class */
  className?: string;
  /** Per-word span class */
  wordClassName?: string;
  /** Tailwind font-size tokens (default "text-4xl md:text-5xl lg:text-6xl") */
  fontSize?: string;
  /** Tailwind font-family token */
  fontFamily?: string;
  /** Tailwind text-colour token */
  textColor?: string;
  /** Pause between loop cycles in ms (default 4000) */
  animationDelay?: number;
  /** Whether to loop the animation (default true) */
  loop?: boolean;
  /** Whether to start in the visible/animate state (default false) */
  startVisible?: boolean;
  /** Render as inline spans inside an existing wrapper instead of full page (default false) */
  inline?: boolean;
  /** Max blur in px — controls intensity of the de-focus effect (default 12) */
  maxBlur?: number;
  /** Base transition duration per word in seconds (default 2.2) */
  baseDuration?: number;
  /** Callback when one full animation cycle completes */
  onCycleComplete?: () => void;
}

export default function BlurTextAnimation({
  text = "Elegant blur animation that brings your words to life with cinematic transitions.",
  words,
  className = "",
  wordClassName = "",
  fontSize = "text-4xl md:text-5xl lg:text-6xl",
  fontFamily = "font-['Avenir_Next',_'Avenir',_system-ui,_sans-serif]",
  textColor = "text-white",
  animationDelay = 4000,
  loop = true,
  startVisible = false,
  inline = false,
  maxBlur = 12,
  baseDuration = 2.2,
  onCycleComplete,
}: BlurTextAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(startVisible);

  /* ── hasSettled: once true, words stay visible forever ──
   *  This is the fix — when loop=false, after the
   *  entrance animation finishes we lock to the
   *  "visible" state so words never disappear. */
  const [hasSettled, setHasSettled] = useState(false);

  const animationTimeoutRef = useRef<number | undefined>(undefined);
  const resetTimeoutRef = useRef<number | undefined>(undefined);
  const cycleCountRef = useRef(0);

  /* ── Build per-word config from raw text ── */
  const textWords = useMemo(() => {
    if (words) return words;

    const splitWords = text.split(" ");
    const totalWords = splitWords.length;

    return splitWords.map((word, index) => {
      const progress = index / totalWords;
      const exponentialDelay = Math.pow(progress, 0.8) * 0.5;
      const baseDelayVal = index * 0.06;
      const microVariation = (Math.random() - 0.5) * 0.05;

      return {
        text: word,
        duration: baseDuration + Math.cos(index * 0.3) * 0.3,
        delay: baseDelayVal + exponentialDelay + microVariation,
        blur: maxBlur + Math.floor(Math.random() * 8),
        scale: 0.9 + Math.sin(index * 0.2) * 0.05,
      };
    });
  }, [text, words, maxBlur, baseDuration]);

  /* ── Calculate the longest word timeline ── */
  const maxTime = useMemo(() => {
    let max = 0;
    for (const w of textWords) {
      max = Math.max(max, w.delay + w.duration);
    }
    return max;
  }, [textWords]);

  /* ── Animation lifecycle ──
   *  loop=true  → animate in → animate out → pause → repeat
   *  loop=false → animate in → STAY visible (hasSettled lock) */
  const startAnimation = useCallback(() => {
    console.log("[BlurText] Cycle started", {
      cycle: cycleCountRef.current,
      wordCount: textWords.length,
      loop,
    });

    // Small grace period before marking as animating
    const graceId = setTimeout(() => setIsAnimating(true), 200);

    // After all words finish their entrance transition
    animationTimeoutRef.current = window.setTimeout(
      () => {
        // animationTimeoutRef.current = setTimeout(() => {
        cycleCountRef.current++;
        console.log("[BlurText] Cycle complete", {
          cycle: cycleCountRef.current,
          loop,
        });
        onCycleComplete?.();

        if (loop) {
          /* ── LOOPING: animate out, then schedule next cycle ── */
          setIsAnimating(false);

          resetTimeoutRef.current = window.setTimeout(() => {
            startAnimation();
          }, animationDelay);
        } else {
          /* ── NON-LOOPING: lock into visible state forever ──
           *  hasSettled=true means the render ignores
           *  isAnimating and always shows the "sharp"
           *  styles. Words stay on screen permanently. */
          setHasSettled(true);
          console.log("[BlurText] Settled — words will stay visible");
        }
      },
      (maxTime + 1) * 1000,
    );

    return graceId;
  }, [textWords, animationDelay, maxTime, loop, onCycleComplete]);

  useEffect(() => {
    const graceId = startAnimation();

    return () => {
      clearTimeout(graceId);
      if (animationTimeoutRef.current)
        clearTimeout(animationTimeoutRef.current);
      if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
    };
  }, [startAnimation]);

  /* ── CSS transition timing function — smooth deceleration ── */
  const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  /* ── Derive per-word visual state ──
   *  hasSettled always wins → words stay sharp.
   *  Otherwise follow isAnimating for in/out cycles. */
  const isVisible = hasSettled || isAnimating;

  /* ── Render words ── */
  const renderedWords = (
    <>
      {textWords.map((word, index) => (
        <span
          key={`bw-${index}`}
          className={`inline-block transition-all ${wordClassName} ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            transitionDuration: `${word.duration}s`,
            transitionDelay: `${word.delay}s`,
            transitionTimingFunction: easing,
            // Blur + brightness: de-focused → sharp
            filter: isVisible
              ? "blur(0px) brightness(1)"
              : `blur(${word.blur}px) brightness(0.6)`,
            // Transform: slide up, scale in, un-rotate
            transform: isVisible
              ? "translateY(0) scale(1) rotateX(0deg)"
              : `translateY(20px) scale(${word.scale || 1}) rotateX(-15deg)`,
            marginRight: "0.35em",
            willChange: "filter, transform, opacity",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            // Subtle glow when sharp, wide glow when blurred
            textShadow: isVisible
              ? "0 2px 8px rgba(255,255,255,0.1)"
              : "0 0 40px rgba(255,255,255,0.4)",
          }}
        >
          {word.text}
        </span>
      ))}
    </>
  );

  /* ── Inline mode: just the word spans, no wrapper layout ── */
  if (inline) {
    console.log("[BlurText] Render (inline)", {
      isAnimating,
      hasSettled,
      isVisible,
      wordCount: textWords.length,
    });
    return <>{renderedWords}</>;
  }

  /* ── Standalone mode: full-page centered showcase ── */
  console.log("[BlurText] Render (standalone)", {
    isAnimating,
    hasSettled,
    isVisible,
    wordCount: textWords.length,
  });

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-black ${className}`}
    >
      <div className="text-center max-w-5xl px-8">
        <p
          className={`${textColor} ${fontSize} ${fontFamily} font-light leading-relaxed tracking-wide`}
        >
          {renderedWords}
        </p>
      </div>
    </div>
  );
}

/* ── Standalone demo component ── */
export function Component() {
  return <BlurTextAnimation />;
}
