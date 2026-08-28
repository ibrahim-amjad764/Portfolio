"use client";
// ─── components/ExperienceSection.jsx ──────────────────────────────────────

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, Calendar, MapPin } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useApp } from "../lib/AppContext";

function ExperienceCard({ exp, index }) {
  const { template } = useApp();
  const isDarkDev = template === "dark-dev";
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex gap-6 ${isEven ? "flex-row" : "flex-row"} items-start`}
    >
      {/* Timeline dot */}
      <div
        className="flex flex-col items-center flex-shrink-0 mt-1"
        aria-hidden="true"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 300, delay: index * 0.1 }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white z-10"
          style={{
            background: `linear-gradient(135deg, var(--portfolio-accent), var(--portfolio-accent-2))`,
          }}
        >
          <Briefcase size={16} />
        </motion.div>
        {/* Vertical line */}
        <div
          className="timeline-line w-0.5 flex-1 mt-2 min-h-[2rem]"
          aria-hidden="true"
        />
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: index * 0.1 }}
        className="portfolio-card p-6 mb-6 flex-1 min-w-0"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3
              className={`font-bold text-lg text-[var(--portfolio-text)] leading-tight
              ${isDarkDev ? "font-mono" : ""}`}
            >
              {exp.role}
            </h3>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${exp.company} website`}
                  className="text-[var(--portfolio-accent)] font-semibold text-sm
                    hover:underline flex items-center gap-1"
                >
                  {exp.company}
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              ) : (
                <span className="text-[var(--portfolio-accent)] font-semibold text-sm">
                  {exp.company}
                </span>
              )}
              <span
                className="text-xs text-[var(--portfolio-muted)] px-2 py-0.5 rounded-full
                border border-[var(--portfolio-border)] bg-[var(--portfolio-bg)]"
              >
                {exp.type}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right flex-shrink-0">
            <span className="flex items-center gap-1 text-xs text-[var(--portfolio-muted)]">
              <Calendar size={11} aria-hidden="true" /> {exp.duration}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--portfolio-muted)]">
              <MapPin size={11} aria-hidden="true" /> {exp.location}
            </span>
          </div>
        </div>

        {/* Bullet points */}
        <ul
          className="space-y-2"
          aria-label={`Responsibilities at ${exp.company}`}
        >
          {exp.points.map((point, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--portfolio-accent)" }}
                aria-hidden="true"
              />
              <span
                className={`text-sm text-[var(--portfolio-muted)] leading-relaxed
                ${isDarkDev ? "font-mono text-xs" : ""}`}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
      </motion.article>
    </div>
  );
}

export default function ExperienceSection({ experience = [] }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === "dark-dev";
  const headingClass = `text-3xl sm:text-4xl font-bold text-[var(--portfolio-text)] ${templateConfig.headingClass}`;

  return (
    <section
      id="experience"
      className={`section-padding ${templateConfig.sectionBg}`}
      aria-label="Work experience"
    >
      <div className="container-max">
        <FadeInSection className="mb-12 sm:mb-16">
          <h2 className={headingClass}>Experience</h2>
          <p className="mt-3 text-[var(--portfolio-muted)] max-w-xl">
            My professional journey and the companies I&apos;ve had the
            privilege to work with.
          </p>
        </FadeInSection>

        <div className="max-w-3xl">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
