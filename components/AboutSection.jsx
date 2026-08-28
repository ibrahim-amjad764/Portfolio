"use client";
// ─── components/AboutSection.jsx ───────────────────────────────────────────

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Download, Briefcase, Code2, Layers } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useApp } from "../lib/AppContext";
import { MotionButton } from "./ui/motion-button";
import { PulseBeamButton } from "./ui/pulse-beams";
import { TiltCard } from "./ui/tilt-card";

function CounterCard({ value, label, icon: Icon, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="portfolio-card p-6 flex items-center gap-4"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--portfolio-accent)", opacity: 0.9 }}
        aria-hidden="true"
      >
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <motion.p
          className="stat-number"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.1 }}
        >
          {value}+
        </motion.p>
        <p className="text-sm text-[var(--portfolio-muted)] font-medium mt-0.5">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutSection({ data }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === "dark-dev";

  const headingClass = `text-3xl sm:text-4xl font-bold text-[var(--portfolio-text)] ${templateConfig.headingClass}`;

  const themeColor =
    template === "dark-dev"
      ? "#02c4e8"
      : template === "creative"
        ? "#de3b58"
        : "#645be9";
  const stats = [
    {
      value: data.stats.projects,
      label: "Projects Shipped",
      icon: Layers,
      delay: 0.1,
    },
    {
      value: data.stats.yearsExperience,
      label: "Years of Experience",
      icon: Briefcase,
      delay: 0.2,
    },
    {
      value: data.stats.skillsCount,
      label: "Technologies Mastered",
      icon: Code2,
      delay: 0.3,
    },
  ];

  return (
    <section
      id="about"
      className={`section-padding ${templateConfig.sectionAltBg}`}
      aria-label="About me"
    >
      <div className="container-max">
        {/* Heading */}
        <FadeInSection className="mb-12 sm:mb-16">
          <h2 className={headingClass}>{isDarkDev ? "" : ""}About Me</h2>
          <p className="mt-3 text-[var(--portfolio-muted)] max-w-xl">
            {isDarkDev ? " " : ""}A little about who I am and what I do.
          </p>
        </FadeInSection>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Bio text */}
          <FadeInSection direction="left">
            <div className="space-y-5">
              <p
                className={`text-[var(--portfolio-text)] leading-relaxed text-base sm:text-lg
                  ${isDarkDev ? "font-mono text-sm sm:text-base" : ""}`}
                style={{ whiteSpace: "pre-line" }}
              >
                {data.bio}
              </p>

              {/* Highlights */}
              <ul className="mt-6 space-y-3" aria-label="Key highlights">
                {[
                  `Based in ${data.location}`,
                  `Open to remote & hybrid opportunities`,
                  `${data.stats.yearsExperience}+ years of professional experience`,
                  "Passionate about clean code & great UX",
                ].map((item) => (
                  <li
                    key={item}
                    className={`flex items-center gap-3 text-sm text-[var(--portfolio-muted)]
                      ${isDarkDev ? "font-mono" : ""}`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--portfolio-accent)" }}
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Resume download */}
              <div className="mt-8">
                <PulseBeamButton color={themeColor}>
                  <MotionButton
                    label="Download Resume"
                    icon={Download}
                    href="/𝓡𝓮𝓼𝓾𝓶𝓮.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    ariaLabel="Download resume PDF"
                  />
                </PulseBeamButton>
              </div>
            </div>
          </FadeInSection>

          {/* Right — Stat cards */}
          <FadeInSection direction="right" className="space-y-4">
            {stats.map((stat) => (
              <TiltCard key={stat.label}>
                <CounterCard key={stat.label} {...stat} />
              </TiltCard>
            ))}

            {/* Fun fact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="portfolio-card p-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--portfolio-accent)/10, var(--portfolio-accent-2)/10)",
                borderColor: "var(--portfolio-accent)",
                borderWidth: "1px",
              }}
            >
              <p className="text-sm text-[var(--portfolio-muted)] font-medium mb-1">
                Fun fact
              </p>
              <p
                className={`text-[var(--portfolio-text)] font-semibold ${isDarkDev ? "font-mono" : ""}`}
              >
                ☕ Powered by {data.stats.coffeePerDay} cups of coffee per day
              </p>
            </motion.div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
