'use client';
// ─── components/ProjectsSection.jsx ────────────────────────────────────────

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ChevronRight } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { useApp } from '../lib/AppContext';

function ProjectCard({ project, index, onOpen }) {
  const { template } = useApp();
  const isCreative = template === 'creative';
  const isDarkDev = template === 'dark-dev';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="portfolio-card overflow-hidden flex flex-col group"
      style={{ borderRadius: isCreative ? '16px' : isDarkDev ? '4px' : '8px' }}
    >
      {/* Gradient thumbnail */}
      <div
        className={`h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex-shrink-0`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 left-4">
          {project.featured && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-sm">
              ★ Featured
            </span>
          )}
        </div>
        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpen(project)}
            className="px-4 py-2 rounded-full bg-white/90 text-gray-900 text-sm font-semibold
              hover:bg-white transition-colors flex items-center gap-1.5"
            aria-label={`View details for ${project.title}`}
          >
            Details <ChevronRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className={`font-bold text-lg text-[var(--portfolio-text)] leading-tight
          ${isDarkDev ? 'font-mono' : ''}`}>
          {project.title}
        </h3>
        <p className="text-sm text-[var(--portfolio-muted)] leading-relaxed line-clamp-2 flex-1">
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge">+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-1 border-t border-[var(--portfolio-border)]">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.title}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--portfolio-muted)]
                hover:text-[var(--portfolio-accent)] transition-colors"
            >
              <Github size={14} /> Code
            </motion.a>
          )}
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live demo for ${project.title}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center gap-1.5 text-xs font-medium text-[var(--portfolio-muted)]
                hover:text-[var(--portfolio-accent)] transition-colors"
            >
              <ExternalLink size={14} /> Live Demo
            </motion.a>
          )}
          <button
            onClick={() => onOpen(project)}
            className="ml-auto text-xs font-medium text-[var(--portfolio-accent)]
              hover:underline flex items-center gap-1"
            aria-label={`View full details for ${project.title}`}
          >
            More info <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} project details`}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-[var(--portfolio-card)] rounded-xl border border-[var(--portfolio-border)]
            shadow-2xl overflow-hidden"
          style={{ maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Hero gradient */}
          <div className={`h-48 bg-gradient-to-br ${project.gradient} relative`} aria-hidden="true">
            <div className="absolute inset-0 bg-black/25" />
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-[var(--portfolio-text)]">{project.title}</h3>
            <p className="text-[var(--portfolio-muted)] leading-relaxed">{project.description}</p>

            <div>
              <p className="text-xs font-semibold text-[var(--portfolio-muted)] uppercase tracking-wider mb-2">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => <span key={t} className="tech-badge">{t}</span>)}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="btn-outline text-sm py-2 px-4"
                  aria-label="View source code on GitHub">
                  <Github size={15} /> View Code
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="btn-accent text-sm py-2 px-4"
                  aria-label="Open live demo">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectsSection({ projects = [] }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === 'dark-dev';

  // Build filter tags from all project tech stacks
  const allTags = ['All', ...new Set(projects.flatMap((p) => p.tech))].slice(0, 9);
  const [activeTag, setActiveTag] = useState('All');
  const [modalProject, setModalProject] = useState(null);

  const filtered = activeTag === 'All'
    ? projects
    : projects.filter((p) => p.tech.includes(activeTag));

  const headingClass = `text-3xl sm:text-4xl font-bold text-[var(--portfolio-text)] ${templateConfig.headingClass}`;

  return (
    <section id="projects" className={`section-padding ${templateConfig.sectionAltBg}`} aria-label="Projects">
      <div className="container-max">
        {/* Heading */}
        <FadeInSection className="mb-12 sm:mb-16">
          <h2 className={headingClass}>Projects</h2>
          <p className="mt-3 text-[var(--portfolio-muted)] max-w-xl">
            {isDarkDev ? '// ' : ''}A selection of things I&apos;ve built — from side projects to production apps.
          </p>
        </FadeInSection>

        {/* Filter buttons */}
        <FadeInSection delay={0.1} className="mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by technology">
            {allTags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <motion.button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-pressed={isActive}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${isActive
                      ? 'text-white shadow-accent'
                      : 'text-[var(--portfolio-muted)] bg-[var(--portfolio-card)] border border-[var(--portfolio-border)] hover:text-[var(--portfolio-text)]'
                    } ${isDarkDev ? 'font-mono text-xs' : ''}`}
                  style={isActive ? { background: 'var(--portfolio-accent)' } : {}}
                >
                  {tag}
                </motion.button>
              );
            })}
          </div>
        </FadeInSection>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onOpen={setModalProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-[var(--portfolio-muted)] py-20 text-lg"
          >
            No projects found for &quot;{activeTag}&quot;.
          </motion.p>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
