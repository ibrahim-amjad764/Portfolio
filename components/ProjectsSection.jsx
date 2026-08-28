"use client";

// ─── components/ProjectsSection.jsx ────────────────────────────────────────

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github, ExternalLink, X } from "lucide-react";
import FadeInSection from "./FadeInSection";
import { useApp } from "../lib/AppContext";
import { MotionButton } from "./ui/motion-button";
import { TiltCard } from "./ui/tilt-card";

/**
 * Shared animation configuration.
 *
 * Using one transition everywhere keeps the opening and closing
 * animation visually consistent.
 *
 * The spring is intentionally a little softer than before:
 * - Lower stiffness prevents the card from snapping back.
 * - Higher damping reduces unwanted bouncing.
 * - Slightly higher mass gives the modal a more natural "weight".
 *
 * This is especially important for the CLOSE animation because
 * the large modal needs to smoothly return to the original card.
 */
const sharedLayoutTransition = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 0.9,
};

/**
 * ProjectCard
 *
 * Normal state:
 * - Project image
 * - Project title ONLY
 *
 * Clicking the card opens the expanded project.
 *
 * layoutId connects this card to ProjectModal so Framer Motion
 * can animate the same card into the expanded version.
 */
function ProjectCard({ project, index, onOpen }) {
  const { template } = useApp();

  const isCreative = template === "creative";
  const isDarkDev = template === "dark-dev";

  const cardRadius = isCreative ? "16px" : isDarkDev ? "4px" : "8px";

  return (
    <TiltCard
      className="h-full rounded-2xl"
      scale={1.02}
      spotlight={true}
      tiltLimit={10}
    >
      <motion.article
        layout
        layoutId={`project-card-${project.id}`}
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.8,
          y: 16,
        }}
        transition={{
          opacity: {
            duration: 0.3,
            delay: index * 0.05,
            ease: "easeOut",
          },
          y: {
            duration: 0.45,
            delay: index * 0.05,
            ease: [0.22, 1, 0.36, 1],
          },
          layout: sharedLayoutTransition,
        }}
        whileHover={{
          y: -4,
          transition: {
            duration: 0.2,
            ease: "easeOut",
          },
        }}
        whileTap={{
          scale: 0.99,
        }}
        onClick={() => onOpen(project)}
        className="portfolio-card overflow-hidden flex h-full flex-col group cursor-pointer"
        style={{
          borderRadius: cardRadius,
        }}
        aria-label={`Open ${project.title} project details`}
      >
        {/* ─────────────────────────────────────────────────────────────
          Project Image

          This image has the same layoutId as the expanded image.
          Framer Motion therefore animates it from the card position
          into the large project view.

          The same layoutId is also used during CLOSE, allowing the
          image to smoothly return to the original card position.
      ───────────────────────────────────────────────────────────── */}
        <motion.div
          layoutId={`project-image-${project.id}`}
          transition={sharedLayoutTransition}
          className={`h-44 bg-gradient-to-br ${project.gradient}
          relative overflow-hidden flex-shrink-0`}
        >
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          )}

          {/* Dark overlay for better visual depth */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

          {/* Featured badge remains available on normal card */}
          {project.featured && (
            <span
              className="absolute bottom-4 left-4 z-10
              px-2.5 py-0.5 rounded-full
              text-xs font-bold
              bg-white/20 text-white
              backdrop-blur-sm"
            >
              ★ Featured
            </span>
          )}
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
          Normal Card Content

          Requirement:
          Normal view should show ONLY the project title.

          Description, technologies and links are intentionally
          shown only inside the expanded project.
      ───────────────────────────────────────────────────────────── */}
        <div className="p-5">
          <motion.h3
            layoutId={`project-title-${project.id}`}
            transition={sharedLayoutTransition}
            className={`font-bold text-lg
            text-[var(--portfolio-text)]
            leading-tight
            ${isDarkDev ? "font-mono" : ""}`}
          >
            {project.title}
          </motion.h3>
        </div>
      </motion.article>
    </TiltCard>
  );
}

/**
 * ProjectModal
 *
 * Expanded project view.
 *
 * Animation architecture:
 *
 * 1. Same layoutId as ProjectCard
 * 2. LayoutGroup in parent
 * 3. Shared spring transition
 * 4. Content fades in AFTER the main card expands
 * 5. Content explicitly fades OUT during close
 * 6. Backdrop fades independently
 * 7. AnimatePresence keeps the modal mounted during exit
 *
 * This separation is important:
 *
 * Shared layout animation:
 *   - Card size
 *   - Card position
 *   - Image
 *   - Title
 *
 * Independent animation:
 *   - Description
 *   - Technologies
 *   - Buttons
 *   - Close button
 *   - Backdrop
 */
function ProjectModal({ project, onClose }) {
  const [isContentReady, setIsContentReady] = useState(false);

  /**
   * Close expanded project using Escape.
   *
   * Escape uses the same onClose callback as the close button,
   * so there is only one source of truth for closing the modal.
   */
  useEffect(() => {
    if (!project) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  /**
   * Prevent the portfolio page from scrolling behind
   * the expanded project.
   *
   * The previous overflow value is restored when the modal
   * finishes its lifecycle.
   */
  useEffect(() => {
    if (!project) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  /**
   * Delay the detailed content slightly.
   *
   * This prevents description/buttons from appearing before
   * the main card has finished expanding.
   *
   * The same content has an explicit EXIT animation below,
   * which makes closing feel cleaner.
   */
  useEffect(() => {
    if (!project) return undefined;

    setIsContentReady(false);

    const timer = window.setTimeout(() => {
      setIsContentReady(true);
    }, 180);

    return () => {
      window.clearTimeout(timer);
    };
  }, [project]);

  if (!project) {
    return null;
  }

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          Backdrop

          The backdrop intentionally fades faster than the main card.

          Close sequence:
          1. Backdrop starts disappearing quickly.
          2. Detailed content fades away.
          3. Shared card animation smoothly returns the project
             to its original grid position.
      ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          // Faster backdrop makes the card movement the visual focus.
          duration: 0.22,
          ease: "easeOut",
        }}
        className="fixed inset-0 z-[90]
          bg-black/50 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          Expanded Project Layer

          pointer-events-none is applied to the wrapper so only
          the actual project card receives mouse/touch events.

          Keeping this wrapper fixed prevents the expanded card from
          affecting the underlying portfolio layout.
      ───────────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-[100]
          flex items-center justify-center
          p-0 sm:p-6
          pointer-events-none"
      >
        <motion.div
          layoutId={`project-card-${project.id}`}
          transition={sharedLayoutTransition}
          onClick={(event) => event.stopPropagation()}
          className="pointer-events-auto relative
            w-full max-w-[850px]
            h-[100dvh] sm:h-auto sm:max-h-[90dvh]
            overflow-y-auto
            bg-[var(--portfolio-card)]
            border border-[var(--portfolio-border)]
            shadow-2xl"
          style={{
            borderRadius: "16px",
            scrollbarWidth: "thin",
          }}
        >
          {/* ─────────────────────────────────────────────────────────
              Expanded Hero Image

              The image uses the exact same layoutId as the card image.

              This is what allows Framer Motion to animate:
                Card image
                    ↓
                Large hero image

              And when closing:
                Large hero image
                    ↓
                Original card image
          ───────────────────────────────────────────────────────── */}
          <motion.div
            layoutId={`project-image-${project.id}`}
            transition={sharedLayoutTransition}
            className={`h-64 sm:h-80
              bg-gradient-to-br ${project.gradient}
              relative overflow-hidden`}
          >
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 640px) 100vw, 850px"
                className="object-cover"
              />
            )}

            <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

            {/* ─────────────────────────────────────────────────────
                Close button

                The button fades/scales out independently before
                the shared card finishes returning to the grid.
            ───────────────────────────────────────────────────── */}
            <motion.button
              type="button"
              aria-label="Close project details"
              onClick={onClose}
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
              }}
              transition={{
                duration: 0.2,
                delay: 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="absolute top-4 right-4 z-20
                h-10 w-10
                flex items-center justify-center
                rounded-full
                bg-black/40 text-white
                backdrop-blur-sm
                border border-white/10
                hover:bg-black/60
                transition-colors"
            >
              <X size={18} />
            </motion.button>

            {/* Featured badge */}
            {project.featured && (
              <motion.span
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 5,
                }}
                transition={{
                  duration: 0.3,
                  delay: 0.12,
                }}
                className="absolute bottom-5 left-6
                  px-3 py-1 rounded-full
                  text-xs font-bold
                  bg-white/20 text-white
                  backdrop-blur-sm"
              >
                ★ Featured
              </motion.span>
            )}
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              Expanded Body
          ───────────────────────────────────────────────────────── */}
          <div className="p-6 sm:p-8">
            {/* ─────────────────────────────────────────────────────
                Title

                This title shares its layoutId with the normal card.

                Therefore the title smoothly moves from:
                  Card title
                      ↓
                  Expanded title

                and back again when closing.
            ───────────────────────────────────────────────────── */}
            <motion.h3
              layoutId={`project-title-${project.id}`}
              transition={sharedLayoutTransition}
              className="text-2xl sm:text-4xl
                font-bold
                text-[var(--portfolio-text)]
                leading-tight"
            >
              {project.title}
            </motion.h3>

            {/* ─────────────────────────────────────────────────────
                Detailed Content

                This content does NOT participate in the shared
                layout animation.

                OPEN:
                  opacity 0 → 1
                  y 18px → 0

                CLOSE:
                  opacity 1 → 0
                  y 0 → 12px

                Explicit exit animation is important because
                AnimatePresence removes this component only after
                its exit animation finishes.
            ───────────────────────────────────────────────────── */}
            <motion.div
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: isContentReady ? 1 : 0,
                y: isContentReady ? 0 : 18,
              }}
              exit={{
                opacity: 0,
                y: 12,
                transition: {
                  duration: 0.18,
                  ease: "easeIn",
                },
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 space-y-6"
            >
              {/* ─────────────────────────────────────────────────
                  Description
              ───────────────────────────────────────────────── */}
              <p
                className="text-[var(--portfolio-muted)]
                  leading-relaxed
                  text-base sm:text-lg"
              >
                {project.description}
              </p>

              {/* ─────────────────────────────────────────────────
                  Technologies
              ───────────────────────────────────────────────── */}
              <div>
                <p
                  className="text-xs font-semibold
                    text-[var(--portfolio-muted)]
                    uppercase tracking-wider
                    mb-3"
                >
                  Technologies
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* ─────────────────────────────────────────────────
                  Project Links
              ───────────────────────────────────────────────── */}
              <div
                className="flex flex-wrap gap-3 pt-4
                  border-t border-[var(--portfolio-border)]"
              >
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="btn-outline
                      text-sm py-2 px-4
                      inline-flex items-center gap-2"
                    aria-label={`View source code for ${project.title}`}
                  >
                    <Github size={15} />
                    View Code
                  </a>
                )}

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="btn-accent
                      text-sm py-2 px-4
                      inline-flex items-center gap-2"
                    aria-label={`Open live demo for ${project.title}`}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

/**
 * Main Projects Section
 *
 * Existing functionality preserved:
 * - Project filtering
 * - All project data
 * - GitHub links
 * - Live Demo links
 * - Featured projects
 * - Responsive grid
 * - Portfolio templates
 * - Dark developer template
 * - Empty state
 *
 * Updated:
 * - Expandable shared-layout animation
 * - Smoother open
 * - Smoother close
 * - Explicit content exit animation
 * - Faster backdrop exit
 * - Softer shared spring
 * - Modern mobile viewport handling with 100dvh
 * - Normal cards show only image + title
 * - Details appear only after expansion
 */
export default function ProjectsSection({ projects = [] }) {
  const { templateConfig, template } = useApp();

  const isDarkDev = template === "dark-dev";

  /**
   * Build filter tags from all project technologies.
   *
   * Set removes duplicate technologies.
   * Original project data is never modified.
   */
  const allTags = [
    "All",
    ...new Set(projects.flatMap((project) => project.tech)),
  ].slice(0, 9);

  const tagCounts = projects.reduce(
    (counts, project) => {
      project.tech.forEach((tech) => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
      return counts;
    },
    { All: projects.length },
  );

  const [activeTag, setActiveTag] = useState("All");
  const [modalProject, setModalProject] = useState(null);

  /**
   * Filter projects based on selected technology.
   */
  const filtered =
    activeTag === "All"
      ? projects
      : projects.filter((project) => project.tech.includes(activeTag));

  const headingClass = `
    text-3xl sm:text-4xl
    font-bold
    text-[var(--portfolio-text)]
    ${templateConfig.headingClass}
  `;

  /**
   * Open selected project.
   *
   * Project data is passed directly without modification.
   */
  const handleOpenProject = (project) => {
    setModalProject(project);
  };

  /**
   * Close selected project.
   *
   * AnimatePresence receives the state change and keeps the
   * ProjectModal mounted long enough to run its exit animation.
   *
   * This is preferable to manually using setTimeout here because
   * Framer Motion remains responsible for animation lifecycle.
   */
  const handleCloseProject = () => {
    setModalProject(null);
  };

  return (
    <LayoutGroup id="portfolio-projects">
      <section
        id="projects"
        className={`section-padding ${templateConfig.sectionAltBg}`}
        aria-label="Projects"
      >
        <div className="container-max">
          {/* ─────────────────────────────────────────────────────────
              Heading
          ───────────────────────────────────────────────────────── */}
          <FadeInSection className="mb-12 sm:mb-16">
            <h2 className={headingClass}>Projects</h2>

            <p
              className="mt-3
                text-[var(--portfolio-muted)]
                max-w-xl"
            >
              A selection of things I&apos;ve built — from side projects to
              production apps.
            </p>
          </FadeInSection>

          {/* ─────────────────────────────────────────────────────────
              Filter Buttons
          ───────────────────────────────────────────────────────── */}
          <FadeInSection delay={0.1} className="mb-8">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter projects by technology"
            >
              {allTags.map((tag) => {
                const isActive = activeTag === tag;

                return (
                  <motion.button
                    key={tag}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    aria-pressed={isActive}
                    className={`relative
                      px-4 py-1.5
                      rounded-full
                      text-sm font-medium
                      transition-all duration-200

                      ${
                        isActive
                          ? "text-white shadow-accent"
                          : `
                            text-[var(--portfolio-muted)]
                            bg-[var(--portfolio-card)]
                            border border-[var(--portfolio-border)]
                            hover:text-[var(--portfolio-text)]
                          `
                      }

                      ${isDarkDev ? "font-mono text-xs" : ""}
                    `}
                    style={{ zIndex: isActive ? 1 : 0 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeFilter"
                        transition={sharedLayoutTransition}
                        className="absolute inset-0 z-0 rounded-full bg-[var(--portfolio-accent)] shadow-accent"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 inline-flex items-center gap-2">
                      {tag}
                      <motion.span
                        key={`${tag}-${tagCounts[tag] || 0}`}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[var(--portfolio-border)] text-[var(--portfolio-muted)]"
                        }`}
                      >
                        {tagCounts[tag] || 0}
                      </motion.span>
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </FadeInSection>

          {/* ─────────────────────────────────────────────────────────
              Project Grid
          ───────────────────────────────────────────────────────── */}
          <motion.div
            layout
            transition={{
              layout: sharedLayoutTransition,
            }}
            className="grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-6"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={handleOpenProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────
              Empty State
          ───────────────────────────────────────────────────────── */}
          {filtered.length === 0 && (
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 0.3,
              }}
              className="text-center
                text-[var(--portfolio-muted)]
                py-20
                text-lg"
            >
              No projects found for &quot;{activeTag}&quot;.
            </motion.p>
          )}
        </div>

        {/* ─────────────────────────────────────────────────────────
            Expanded Project

            AnimatePresence keeps the component alive during exit.

            This is the key to the smooth CLOSE animation:

              Expanded Project
                    ↓
              exit animation starts
                    ↓
              content fades out
                    ↓
              backdrop fades out
                    ↓
              shared layout transforms modal
                    ↓
              original project card
                    ↓
              component is finally removed
        ───────────────────────────────────────────────────────── */}
        <AnimatePresence initial={false} mode="sync">
          {modalProject && (
            <ProjectModal
              key={modalProject.id}
              project={modalProject}
              onClose={handleCloseProject}
            />
          )}
        </AnimatePresence>
      </section>
    </LayoutGroup>
  );
}
