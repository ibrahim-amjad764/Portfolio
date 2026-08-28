"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "../../lib/utils";

/* =========================================================
   TYPES
   ========================================================= */

interface BeamPath {
  path: string;

  gradientConfig: {
    initial: {
      x1: string;
      x2: string;
      y1: string;
      y2: string;
    };

    animate: {
      x1: string | string[];
      x2: string | string[];
      y1: string | string[];
      y2: string | string[];
    };

    transition?: Transition;
  };

  /*
   * Kept for compatibility with existing beam data.
   * Connection points are no longer rendered.
   */
  connectionPoints?: Array<{
    cx: number;
    cy: number;
    r: number;
  }>;
}

/* =========================================================
   THEME COLORS
   ========================================================= */

export const PULSE_THEME_COLORS = {
  minimal: "#645be9",
  darkDev: "#02c4e8",
  creative: "#de3b58",
} as const;

/* =========================================================
   PULSE BEAMS PROPS
   ========================================================= */

interface PulseBeamsProps {
  children?: React.ReactNode;

  className?: string;

  background?: React.ReactNode;

  beams: BeamPath[];

  width?: number;
  height?: number;

  /*
   * Static beam color.
   */
  baseColor?: string;

  /*
   * Kept for backwards compatibility.
   * No connection points are rendered anymore.
   */
  accentColor?: string;

  /*
   * Animated gradient colors.
   */
  gradientColors?: {
    start: string;
    middle: string;
    end: string;
  };

  /*
   * Optional theme color.
   *
   * If gradientColors are not supplied,
   * this color will be used for the pulse.
   */
  color?: string;
}

/* =========================================================
   SVG PROPS
   ========================================================= */

interface SVGsProps {
  beams: BeamPath[];

  width: number;
  height: number;

  baseColor: string;
  accentColor: string;

  gradientColors?: {
    start: string;
    middle: string;
    end: string;
  };

  color?: string;
}

/* =========================================================
   GRADIENT COLORS PROPS
   ========================================================= */

interface GradientColorsProps {
  colors?: {
    start: string;
    middle: string;
    end: string;
  };

  color?: string;
}

/* =========================================================
   MAIN PULSE BEAMS
   ========================================================= */

export const PulseBeams = ({
  children,
  className,
  background,
  beams,
  width = 858,
  height = 434,

  baseColor = "rgba(148, 163, 184, 0.16)",

  accentColor = "rgba(148, 163, 184, 0.30)",

  gradientColors,

  color = "var(--portfolio-accent)",
}: PulseBeamsProps) => {
  /*
   * If custom gradient colors are not provided,
   * use the current portfolio theme color.
   */
  const resolvedGradientColors = gradientColors ?? {
    start: color,
    middle: color,
    end: color,
  };

  return (
    <div
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden antialiased",
        className,
      )}
    >
      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      {background}

      {/* =====================================================
          CONTENT
          ===================================================== */}

      <div className="relative z-10">{children}</div>

      {/* =====================================================
          BEAM LAYER
          ===================================================== */}

      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs
          beams={beams}
          width={width}
          height={height}
          baseColor={baseColor}
          accentColor={accentColor}
          gradientColors={resolvedGradientColors}
          color={color}
        />
      </div>
    </div>
  );
};

/* =========================================================
   PULSE BEAM BUTTON
   ========================================================= */

interface PulseBeamButtonProps {
  children: React.ReactNode;

  className?: string;

  /*
   * Theme color for button beam animation.
   */
  color?: string;
}

export const PulseBeamButton = ({
  children,
  className,
  color = "var(--portfolio-accent)",
}: PulseBeamButtonProps) => {
  const gradientId = React.useId().replace(/:/g, "");

  /*
   * These paths surround the button.
   *
   * Button is positioned around the center:
   *
   * x ≈ 429
   * y ≈ 217
   *
   * Only lines are rendered.
   * Connection circles have been removed.
   */

  const buttonBeams: BeamPath[] = [
    /* =====================================================
       LEFT BEAM
       ===================================================== */

    {
      path: "M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5",

      gradientConfig: {
        initial: {
          x1: "0%",
          x2: "0%",
          y1: "80%",
          y2: "100%",
        },

        animate: {
          x1: ["0%", "0%", "200%"],
          x2: ["0%", "0%", "180%"],
          y1: ["80%", "0%", "0%"],
          y2: ["100%", "20%", "20%"],
        },

        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 2,
          delay: 0,
        },
      },
    },

    /* =====================================================
       RIGHT BEAM
       ===================================================== */

    {
      path: "M568 200H841C846.523 200 851 195.523 851 190V40",

      gradientConfig: {
        initial: {
          x1: "0%",
          x2: "0%",
          y1: "80%",
          y2: "100%",
        },

        animate: {
          x1: ["20%", "100%", "100%"],
          x2: ["0%", "90%", "90%"],
          y1: ["80%", "80%", "-20%"],
          y2: ["100%", "100%", "0%"],
        },

        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 2,
          delay: 0.5,
        },
      },
    },

    /* =====================================================
       BOTTOM LEFT BEAM
       ===================================================== */

    {
      path: "M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5",

      gradientConfig: {
        initial: {
          x1: "0%",
          x2: "0%",
          y1: "80%",
          y2: "100%",
        },

        animate: {
          x1: ["20%", "100%", "100%"],
          x2: ["0%", "90%", "90%"],
          y1: ["80%", "80%", "-20%"],
          y2: ["100%", "100%", "0%"],
        },

        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 2,
          delay: 1,
        },
      },
    },

    /* =====================================================
       BOTTOM RIGHT BEAM
       ===================================================== */

    {
      path: "M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427",

      gradientConfig: {
        initial: {
          x1: "40%",
          x2: "50%",
          y1: "160%",
          y2: "180%",
        },

        animate: {
          x1: "0%",
          x2: "10%",
          y1: "-40%",
          y2: "-20%",
        },

        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 2,
          delay: 1.5,
        },
      },
    },

    /* =====================================================
       TOP BEAM
       ===================================================== */

    {
      path: "M380 168V17C380 11.4772 384.477 7 390 7H414",

      gradientConfig: {
        initial: {
          x1: "-40%",
          x2: "-10%",
          y1: "0%",
          y2: "20%",
        },

        animate: {
          x1: ["40%", "0%", "0%"],
          x2: ["10%", "0%", "0%"],
          y1: ["0%", "0%", "180%"],
          y2: ["20%", "20%", "200%"],
        },

        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          repeatDelay: 2,
          delay: 0.8,
        },
      },
    },
  ];

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      {/* =====================================================
          ANIMATED BEAM SVG
          ===================================================== */}

      <svg
        width="858"
        height="434"
        viewBox="0 0 858 434"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-auto
          w-[min(858px,100vw)]
          max-w-none
          -translate-x-1/2
          -translate-y-1/2
          overflow-visible
        "
        fill="none"
        aria-hidden="true"
      >
        {/* =================================================
            ANIMATED GRADIENTS
            ================================================ */}

        <defs>
          {buttonBeams.map((beam, index) => (
            <motion.linearGradient
              key={beam.path}
              id={`${gradientId}-${index}`}
              gradientUnits="userSpaceOnUse"
              initial={beam.gradientConfig.initial}
              animate={beam.gradientConfig.animate}
              transition={beam.gradientConfig.transition}
            >
              {/* Fade in */}
              <stop offset="0%" stopColor={color} stopOpacity="0" />

              {/* Start of light */}
              <stop offset="20%" stopColor={color} stopOpacity="0.35" />

              {/* Main light */}
              <stop offset="50%" stopColor={color} stopOpacity="1" />

              {/* Fade out */}
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>

        {/* =================================================
            BEAM PATHS
            ================================================ */}

        {buttonBeams.map((beam, index) => (
          <React.Fragment key={beam.path}>
            {/* Animated theme-colored beam */}
            <path
              d={beam.path}
              stroke={`url(#${gradientId}-${index})`}
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* No connection circles */}
          </React.Fragment>
        ))}
      </svg>

      {/* =====================================================
          ACTUAL BUTTON WRAPPER
          ===================================================== */}

      <div
        className="
          relative
          z-10
          inline-flex
          items-center
          justify-center
          rounded-full
          bg-transparent
          shadow-none
        "
      >
        {children}
      </div>
    </div>
  );
};

/* =========================================================
   SVG BEAM RENDERER
   ========================================================= */

const SVGs = ({
  beams,
  width,
  height,
  baseColor,
  accentColor,
  gradientColors,
  color,
}: SVGsProps) => {
  /*
   * Use theme color when no gradient colors are supplied.
   */
  const resolvedColors = gradientColors ?? {
    start: color ?? "var(--portfolio-accent)",
    middle: color ?? "var(--portfolio-accent)",
    end: color ?? "var(--portfolio-accent)",
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex flex-shrink-0"
      aria-hidden="true"
    >
      {/* =====================================================
          BEAM PATHS
          ===================================================== */}

      {beams.map((beam, index) => (
        <React.Fragment key={index}>
          {/* Static beam */}
          <path d={beam.path} stroke={baseColor} strokeWidth="1" />

          {/* Animated pulse */}
          <path
            d={beam.path}
            stroke={`url(#grad${index})`}
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* =================================================
              CONNECTION POINTS REMOVED
              ================================================= */}
        </React.Fragment>
      ))}

      {/* =====================================================
          ANIMATED GRADIENTS
          ===================================================== */}

      <defs>
        {beams.map((beam, index) => (
          <motion.linearGradient
            key={index}
            id={`grad${index}`}
            gradientUnits="userSpaceOnUse"
            initial={beam.gradientConfig.initial}
            animate={beam.gradientConfig.animate}
            transition={beam.gradientConfig.transition}
          >
            <GradientColors colors={resolvedColors} color={color} />
          </motion.linearGradient>
        ))}
      </defs>
    </svg>
  );
};

/* =========================================================
   GRADIENT COLORS
   ========================================================= */

const GradientColors = ({
  colors,
  color = "var(--portfolio-accent)",
}: GradientColorsProps) => {
  /*
   * Theme color fallback.
   */
  const resolvedColor = color;

  const finalColors = colors ?? {
    start: resolvedColor,
    middle: resolvedColor,
    end: resolvedColor,
  };

  return (
    <>
      {/* Fade in */}
      <stop offset="0%" stopColor={finalColors.start} stopOpacity="0" />

      {/* Light begins */}
      <stop offset="20%" stopColor={finalColors.start} stopOpacity="0.35" />

      {/* Main pulse */}
      <stop offset="50%" stopColor={finalColors.middle} stopOpacity="1" />

      {/* Fade out */}
      <stop offset="100%" stopColor={finalColors.end} stopOpacity="0" />
    </>
  );
};
