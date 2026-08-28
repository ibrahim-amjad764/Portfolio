"use client";
// ─── components/SkillsSection.jsx ──────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeInSection from "./FadeInSection";
import { useApp } from "../lib/AppContext";

const CATEGORIES = ["All", "Frontend", "Backend", "Tools"];

function SkillCard({ skill, index, animate }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === "dark-dev";

  const Icon = skill.icon;
  return (
    <div className={templateConfig.skillCardClass}>
      <div className="flex items-center gap-3 mb-3">
        {skill.icon && (
          <skill.icon className="text-2xl text-[var(--portfolio-accent)] flex-shrink-0" />
        )}

        <div className="min-w-0">
          <p
            className={`font-semibold text-sm text-[var(--portfolio-text)] truncate
      ${isDarkDev ? "font-mono" : ""}`}
          >
            {skill.name}
          </p>

          <p className="text-xs text-[var(--portfolio-muted)]">
            {skill.category}
          </p>
        </div>

        <span className="ml-auto text-xs font-bold text-[var(--portfolio-accent)] flex-shrink-0">
          {skill.proficiency}%
        </span>
      </div>
      {/* Progress bar */}
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={animate ? skill.proficiency : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name} proficiency`}
      >
        <motion.div
          className="progress-bar-fill"
          initial={{ width: "0%" }}
          animate={{ width: animate ? `${skill.proficiency}%` : "0%" }}
          transition={{
            duration: 1,
            delay: 0.1 + index * 0.05,
            ease: [0.25, 1, 0.5, 1],
          }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection({ skills = [] }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === "dark-dev";
  const [activeCategory, setActiveCategory] = useState("All");

  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "-80px" });

  const uniqueSkills = Array.from(
    new Map(
      skills.map((skill) => [
        `${skill.name?.trim().toLowerCase()}-${skill.category?.trim().toLowerCase()}`,
        skill,
      ]),
    ).values(),
  );

  const filtered =
    activeCategory === "All"
      ? uniqueSkills
      : uniqueSkills.filter(
          (skill) =>
            skill.category?.trim().toLowerCase() ===
            activeCategory.trim().toLowerCase(),
        );

  const headingClass = `text-3xl sm:text-4xl font-bold text-[var(--portfolio-text)] ${templateConfig.headingClass}`;

  return (
    <section
      id="skills"
      className={`section-padding ${templateConfig.sectionBg}`}
      aria-label="Skills"
    >
      <div className="container-max" ref={ref}>
        {/* Heading */}
        <FadeInSection className="mb-12 sm:mb-16">
          <h2 className={headingClass}>Skills & Technologies</h2>
          <p className="mt-3 text-[var(--portfolio-muted)] max-w-xl">
            Technologies I work with daily and have mastered over the years.
          </p>
        </FadeInSection>

        {/* Filter Tabs */}
        <FadeInSection delay={0.1} className="mb-8">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter skills by category"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200
                    ${
                      isActive
                        ? "text-white"
                        : "text-[var(--portfolio-muted)] bg-[var(--portfolio-card)] border border-[var(--portfolio-border)] hover:text-[var(--portfolio-text)]"
                    } ${isDarkDev ? "font-mono" : ""}`}
                  style={
                    isActive ? { background: "var(--portfolio-accent)" } : {}
                  }
                >
                  {cat}
                  {isActive && (
                    <motion.span
                      layoutId="skill-tab-indicator"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "var(--portfolio-accent)" }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </FadeInSection>

        {/* Skill Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          role="tabpanel"
          aria-label={`${activeCategory} skills`}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.id || `${skill.name}-${skill.category}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ y: -4 }}
              >
                <SkillCard skill={skill} index={i} animate={inView} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--portfolio-muted)] py-16">
            No skills in this category.
          </p>
        )}
      </div>
    </section>
  );
}
