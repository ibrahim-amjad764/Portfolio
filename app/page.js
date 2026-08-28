"use client";

// ─── app/page.js ───────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import { useApp } from "../lib/AppContext";
import userData from "../lib/data";

// ── Introductory Animation (Loading screen) component — unchanged logic ────
function IntroAnimation({ onDone }) {
  useEffect(() => {
    // Keep it slightly longer for better effect if desired, e.g., 2000ms
    const timer = setTimeout(onDone, 1800);

    return () => clearTimeout(timer);
  }, [onDone]);

  const colors = {
    cyan: "#02c4e8",
    red: "#de3b58",
    purple: "#645be9",
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6, // Longer fade out for smoothness
        ease: "easeInOut",
      }}
      className="loading-screen bg-[#050505] fixed inset-0 z-[100] flex items-center justify-center"
      aria-label="Welcome animation"
      role="status"
    >
      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.2,
        }}
        className="flex flex-col items-center gap-4"
      >
        {/* Animated LOGO */}
        <motion.div
          animate={{
            rotate: [0, 120, 240, 360],
            backgroundColor: [
              colors.cyan,
              colors.cyan,
              colors.red,
              colors.red,
              colors.purple,
              colors.purple,
              colors.cyan,
            ],
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 2.2, // slightly slower
              ease: "linear",
              times: [0, 0.3333, 0.6666, 1],
            },
            backgroundColor: {
              repeat: Infinity,
              duration: 2.2,
              ease: "linear",
              times: [0, 0.3333, 0.3334, 0.6666, 0.6667, 1, 1],
            },
          }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-2xl"
          aria-hidden="true"
        >
          P
        </motion.div>

        {/* PORTFOLIO TITLE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-bold text-white font-mono tracking-wider"
        >
          Crafting your portfolio…
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

// ── Main page content ─────────────────────────────────────────────────────
function PortfolioContent() {
  const { template, mounted } = useApp();

  if (!mounted) return null;

  // Variants for staggered opening animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each section starting its animation
        delayChildren: 0.3, // Global delay before children start
      },
    },
  };

  // Variant applied to each section
  const sectionVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // modern ease-out
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {/* Root motion.main for page enter/exit and staggering */}
      <motion.main
        key={template}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        id="main-content"
        aria-label="Portfolio content"
        className="relative min-h-screen w-full bg-[var(--portfolio-bg)]"
      >
        <Navbar name="IA." />

        {/* Wrap sections with motion.div for animation stagger */}
        <motion.div variants={sectionVariants}>
          <HeroSection data={userData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <AboutSection data={userData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <SkillsSection skills={userData.skills} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <ProjectsSection projects={userData.projects} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <ExperienceSection experience={userData.experience} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <ContactSection data={userData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <Footer data={userData} />
        </motion.div>
      </motion.main>
    </AnimatePresence>
  );
}

// ── Root page export — Fixes the Runtime Error structure ────────────────
export default function Page() {
  const [loading, setLoading] = useState(true);

  // If loading is done, show the main content.
  // The structure here avoids having the root 'Page' component itself be the motion component.

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--portfolio-accent)] focus:text-white focus:font-semibold"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {loading ? (
          <IntroAnimation key="intro" onDone={() => setLoading(false)} />
        ) : (
          <PortfolioContent key="content" />
        )}
      </AnimatePresence>
    </>
  );
}
