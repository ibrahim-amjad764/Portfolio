'use client';
// ─── app/page.js ───────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useApp } from '../lib/AppContext';
import userData from '../lib/data';

// ── Loading screen ────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1400);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="loading-screen"
      aria-label="Loading portfolio"
      role="status"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'backOut' }}
        className="flex flex-col items-center gap-4"
      >
        {/* Logo mark */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
          style={{ background: 'linear-gradient(135deg, var(--portfolio-accent), var(--portfolio-accent-2))' }}
          aria-hidden="true"
        >
          P
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl font-bold text-[var(--portfolio-text)]"
        >
          Portfolio
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-[var(--portfolio-muted)]"
        >
          Crafting your portfolio…
        </motion.p>
        {/* Progress bar */}
        <div className="w-40 h-1 rounded-full bg-[var(--portfolio-border)] overflow-hidden mt-2">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="h-full rounded-full"
            style={{ background: 'var(--portfolio-accent)' }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main page content ─────────────────────────────────────────────────────
function PortfolioContent() {
  const { template, mounted } = useApp();

  if (!mounted) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={template}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        id="main-content"
        aria-label="Portfolio content"
      >
        <Navbar name="PortifyAI" />

        <HeroSection data={userData} />

        <AboutSection data={userData} />

        <SkillsSection skills={userData.skills} />

        <ProjectsSection projects={userData.projects} />

        <ExperienceSection experience={userData.experience} />

        <ContactSection data={userData} />

        <Footer data={userData} />
      </motion.main>
    </AnimatePresence>
  );
}

// ── Root page export ──────────────────────────────────────────────────────
export default function Page() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
          focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--portfolio-accent)]
          focus:text-white focus:font-semibold"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" onDone={() => setLoading(false)} />
        ) : (
          <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <PortfolioContent />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
