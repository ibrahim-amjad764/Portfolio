"use client";

// ─── components/HeroSection.jsx ────────────────────────────────────────────

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { useApp } from "../lib/AppContext";
import BlurTextAnimation from "./ui/BlurTextAnimation";
import { PulseBeams, PulseBeamButton } from "./ui/pulse-beams";
import { MotionButton } from "./ui/motion-button";
import { HoverPeek } from "../components/ui/link-preview";

/**
 * ============================================================
 * HERO BEAM CONFIGURATION
 * ============================================================
 *
 * Decorative animated connection paths used by PulseBeams.
 *
 * Keeping this configuration outside the component prevents
 * these objects from being recreated on every render.
 */
const heroBeams = [
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

    connectionPoints: [
      {
        cx: 6.5,
        cy: 398.5,
        r: 6,
      },
      {
        cx: 269,
        cy: 220.5,
        r: 6,
      },
    ],
  },

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

    connectionPoints: [
      {
        cx: 851,
        cy: 34,
        r: 6.5,
      },
      {
        cx: 568,
        cy: 200,
        r: 6,
      },
    ],
  },

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

    connectionPoints: [
      {
        cx: 142,
        cy: 427,
        r: 6.5,
      },
      {
        cx: 425.5,
        cy: 274,
        r: 6,
      },
    ],
  },

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

    connectionPoints: [
      {
        cx: 770,
        cy: 427,
        r: 6.5,
      },
      {
        cx: 493,
        cy: 274,
        r: 6,
      },
    ],
  },

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

    connectionPoints: [
      {
        cx: 420.5,
        cy: 6.5,
        r: 6,
      },
      {
        cx: 380,
        cy: 168,
        r: 6,
      },
    ],
  },
];

/**
 * Gradient colors used by the animated beam network.
 */
const heroGradientColors = {
  start: "#18CCFC",
  middle: "#6344F5",
  end: "#AE48FF",
};

/**
 * ============================================================
 * NAME REVEAL ANIMATION
 * ============================================================
 *
 * Character-by-character entrance animation.
 *
 * Keeping variants outside the component avoids recreating
 * animation objects during every render.
 */
const nameRevealContainer = {
  hidden: {},

  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.055,
    },
  },
};

const nameRevealLetter = {
  hidden: {
    opacity: 0,
    y: "120%",
    scale: 0.94,
    filter: "blur(16px)",
  },

  visible: {
    opacity: 1,
    y: "0%",
    scale: 1,
    filter: "blur(0px)",

    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Character-based name reveal.
 *
 * The component intentionally remains simple so the animation
 * can be restarted by changing its key.
 */
function NameReveal({ children, className = "" }) {
  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={nameRevealContainer}
      initial="hidden"
      animate="visible"
    >
      {Array.from(children).map((char, index) => (
        <span key={`${char}-${index}`} className="inline-block overflow-hidden">
          <motion.span className="inline-block" variants={nameRevealLetter}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * ============================================================
 * PARTICLE SYSTEM
 * ============================================================
 *
 * Lightweight canvas particle background.
 *
 * Optimizations:
 * - Uses requestAnimationFrame.
 * - Uses ResizeObserver instead of constantly polling dimensions.
 * - Supports devicePixelRatio for sharper rendering.
 * - Respects prefers-reduced-motion.
 * - Properly cleans up animation and observers.
 */
const PARTICLES_COUNT = 38;

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return undefined;
    }

    /**
     * Respect the user's accessibility preference.
     *
     * When reduced motion is enabled, we keep the canvas
     * static instead of running an infinite animation loop.
     */
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    let animationFrameId = null;
    let resizeObserver = null;

    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    const particles = Array.from({ length: PARTICLES_COUNT }, () => ({
      x: 0,
      y: 0,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    /**
     * Resize canvas while keeping the drawing sharp on
     * Retina/high-density displays.
     */
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();

      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);

      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * devicePixelRatio);
      canvas.height = Math.round(height * devicePixelRatio);

      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      /**
       * Keep existing particles within the new viewport.
       */
      particles.forEach((particle) => {
        particle.x = Math.min(Math.max(particle.x, 0), width);
        particle.y = Math.min(Math.max(particle.y, 0), height);
      });
    };

    /**
     * Initial canvas sizing.
     */
    resizeCanvas();

    /**
     * ResizeObserver is more efficient than listening to every
     * window resize event because it reacts only when the canvas
     * itself actually changes size.
     */
    resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas);

    /**
     * Draw a single frame.
     */
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        ctx.beginPath();

        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(108,99,255,${particle.opacity})`;
        ctx.fill();

        /**
         * Only move particles when animation is allowed.
         */
        if (!reducedMotionQuery.matches) {
          particle.x += particle.dx;
          particle.y += particle.dy;

          if (particle.x < 0 || particle.x > width) {
            particle.dx *= -1;
          }

          if (particle.y < 0 || particle.y > height) {
            particle.dy *= -1;
          }
        }
      });

      /**
       * Avoid creating an unnecessary animation loop when
       * the user prefers reduced motion.
       */
      if (!reducedMotionQuery.matches) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    /**
     * Start rendering.
     */
    draw();

    /**
     * If the user changes reduced-motion preference while the
     * page is open, restart the particle loop accordingly.
     */
    const handleMotionPreferenceChange = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      draw();
    };

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener(
        "change",
        handleMotionPreferenceChange,
      );
    }

    /**
     * Cleanup prevents memory leaks and orphaned animation frames.
     */
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      resizeObserver?.disconnect();

      if (typeof reducedMotionQuery.removeEventListener === "function") {
        reducedMotionQuery.removeEventListener(
          "change",
          handleMotionPreferenceChange,
        );
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      aria-hidden="true"
      className="block h-full w-full"
    />
  );
}

/**
 * ============================================================
 * HERO SECTION
 * ============================================================
 */
export default function HeroSection({ data }) {
  const { templateConfig, template } = useApp();

  const isDarkDev = template === "dark-dev";
  const isCreative = template === "creative";

  /**
   * Changing this key restarts the character reveal animation.
   */
  const [nameKey, setNameKey] = useState(0);

  /**
   * Template-specific accent color.
   */
  const themeColor =
    template === "dark-dev"
      ? "#02c4e8"
      : template === "creative"
        ? "#de3b58"
        : "#645be9";

  /**
   * ==========================================================
   * SCROLL HELPERS
   * ==========================================================
   *
   * Centralized smooth-scroll functions keep the CTA and
   * navigation behavior consistent.
   */
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  /**
   * ==========================================================
   * HERO CONTENT ANIMATION
   * ==========================================================
   *
   * Shared stagger animation for badge, name, role, bio,
   * buttons and social links.
   */
  const container = {
    hidden: {},

    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 28,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.55,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="hero"
      className="
        relative
        flex
        min-h-screen
        flex-col
        items-center
        justify-center
        overflow-hidden
      "
      aria-label="Hero section"
    >
      {/* =====================================================
          RADIAL GRADIENT
          -----------------------------------------------------
          Decorative background layer.
          It does not interfere with interaction.
      ===================================================== */}
      <div className="hero-gradient" aria-hidden="true" />

      {/* =====================================================
          PULSE BEAMS BACKGROUND
          -----------------------------------------------------
          Decorative animated beam network.

          pointer-events-none guarantees that:
          - buttons remain clickable
          - links remain clickable
          - scrolling remains unaffected
      ===================================================== */}
      <PulseBeams
        beams={heroBeams}
        width={858}
        height={434}
        gradientColors={heroGradientColors}
        baseColor="rgba(148, 163, 184, 0.16)"
        accentColor="rgba(148, 163, 184, 0.30)"
        className="
          absolute
          inset-0
          !h-full
          w-full
          z-[1]
          pointer-events-none
          scale-[0.65]
          sm:scale-[0.8]
          md:scale-100
        "
      />

      {/* =====================================================
          PARTICLE BACKGROUND
      ===================================================== */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <ParticleCanvas />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}
      <div
        className="
          container-max
          relative
          z-10
          flex
          flex-col
          items-center
          px-4
          py-24
          text-center
          sm:py-32
        "
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="
            flex
            w-full
            flex-col
            items-center
            gap-5
            sm:gap-6
          "
        >
          {/* =================================================
              AVAILABILITY BADGE
          ================================================= */}
          <motion.div variants={item}>
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-accent)]/25
                bg-[var(--portfolio-accent)]/12
                px-4
                py-1.5
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-[var(--portfolio-accent)]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[var(--portfolio-accent)]
                  animate-pulse
                "
                aria-hidden="true"
              />

              {isDarkDev ? "portfolio" : "Available for work"}
            </span>
          </motion.div>

          {/* =================================================
              NAME
              -------------------------------------------------
              Hovering the name restarts the letter reveal.
          ================================================= */}
          <motion.div
            variants={item}
            onHoverStart={() => setNameKey((key) => key + 1)}
            className="max-w-full"
          >
            <h1
              className={`
                text-4xl
                font-black
                leading-none
                tracking-tight
                sm:text-6xl
                lg:text-7xl
                ${templateConfig.heroNameClass}
              `}
              style={templateConfig.heroNameStyle}
            >
              {isDarkDev ? (
                <NameReveal
                  key={nameKey}
                  className="gradient-text-animated font-mono"
                >
                  {data.name}
                </NameReveal>
              ) : isCreative ? (
                <NameReveal key={nameKey} className="gradient-text">
                  {data.name}
                </NameReveal>
              ) : (
                <NameReveal key={nameKey}>{data.name}</NameReveal>
              )}
            </h1>
          </motion.div>

          {/* =================================================
              TYPEWRITER ROLE
          ================================================= */}
          <motion.div
            variants={item}
            className="
              flex
              h-10
              w-full
              items-center
              justify-center
            "
          >
            <p
              className={`
                max-w-full
                text-xl
                font-semibold
                text-[var(--portfolio-accent)]
                sm:text-2xl
                lg:text-3xl
                ${isDarkDev ? "font-mono" : ""}
              `}
            >
              <TypewriterText phrases={data.taglines} interval={3000} />
            </p>
          </motion.div>

          {/* =================================================
              BIO
          ================================================= */}
          <motion.div variants={item}>
            <p
              className={`
                max-w-2xl
                text-base
                leading-relaxed
                text-[var(--portfolio-muted)]
                sm:text-lg
                ${isDarkDev ? "font-mono text-sm sm:text-base" : ""}
              `}
            >
              <BlurTextAnimation
                text={`${data.bio.slice(0, 160).trim()}…`}
                inline
                loop={false}
                startVisible={false}
                maxBlur={8}
                baseDuration={1.8}
                wordClassName={isDarkDev ? "font-mono" : ""}
                textColor=""
                fontSize=""
                fontFamily=""
              />
            </p>
          </motion.div>

          {/* =================================================
              CTA BUTTONS
          ================================================= */}
          <motion.div
            variants={item}
            className="
              mt-2
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
            "
          >
            {isCreative ? (
              <div>
                <MotionButton
                  label="View Projects"
                  icon={ArrowRight}
                  onClick={scrollToProjects}
                  className="relative z-10"
                  aria-label="View my projects"
                />
              </div>
            ) : (
              <MotionButton
                label="View Projects"
                icon={ArrowRight}
                onClick={scrollToProjects}
                className=""
                aria-label="View my projects"
              />
            )}

            <PulseBeamButton color={themeColor}>
              <button
                type="button"
                onClick={scrollToContact}
                className="btn-outline"
                aria-label="Get in touch"
              >
                <Mail size={16} aria-hidden="true" />
                Get In Touch
              </button>
            </PulseBeamButton>
          </motion.div>

          {/* =================================================
              SOCIAL LINKS
          ================================================= */}
          <motion.div
            variants={item}
            className="
              mt-1
              flex
              items-center
              gap-4
            "
          >
            {data.github && (
              <HoverPeek url={data.github}>
                <SocialLink href={data.github} label="GitHub profile">
                  <Github size={20} />
                </SocialLink>
              </HoverPeek>
            )}

            {data.linkedin && (
              <HoverPeek url={data.linkedin}>
                <SocialLink href={data.linkedin} label="LinkedIn profile">
                  <Linkedin size={20} />
                </SocialLink>
              </HoverPeek>
            )}

            {data.email && (
              <SocialLink href={`mailto:${data.email}`} label="Send email">
                <Mail size={20} />
              </SocialLink>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
          -----------------------------------------------------
          Positioned relative to the hero section rather than
          the content container, so it remains stable on
          different screen sizes.
      ===================================================== */}
      <motion.button
        type="button"
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1.4,
          duration: 0.6,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-1
          text-[var(--portfolio-muted)]
          transition-colors
          duration-200
          hover:text-[var(--portfolio-accent)]
        "
      >
        <motion.div
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={22} strokeWidth={1.5} />
        </motion.div>

        <span className="text-xs uppercase tracking-widest">Scroll</span>
      </motion.button>
    </section>
  );
}

/**
 * ============================================================
 * SOCIAL LINK
 * ============================================================
 *
 * Reusable social button.
 *
 * Uses Framer Motion for transform animation while CSS handles
 * colors/borders. This avoids unnecessary layout animations.
 */
function SocialLink({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{
        scale: 1.15,
        y: -2,
      }}
      whileTap={{
        scale: 0.92,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-card)]/60
        text-[var(--portfolio-muted)]
        transition-colors
        duration-200
        hover:border-[var(--portfolio-accent)]
        hover:text-[var(--portfolio-accent)]
      "
    >
      {children}
    </motion.a>
  );
}
