'use client';
// ─── components/HeroSection.jsx ────────────────────────────────────────────

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from 'lucide-react';
import TypewriterText from './TypewriterText';
import { useApp } from '../lib/AppContext';

const PARTICLES_COUNT = 38;

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = (canvas.width = canvas.offsetWidth);
    let H = (canvas.height = canvas.offsetHeight);
    let animId;

    const particles = Array.from({ length: PARTICLES_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.opacity})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > W) p.dx *= -1;
        if (p.y < 0 || p.y > H) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particles-canvas"
      aria-hidden="true"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function HeroSection({ data }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === 'dark-dev';
  const isCreative = template === 'creative';

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger children
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Radial gradient overlay */}
      <div className="hero-gradient" aria-hidden="true" />

      {/* Particles */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <ParticleCanvas />
      </div>

      {/* Content */}
      <div className="container-max relative z-10 flex flex-col items-center text-center px-4 py-24 sm:py-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-5 sm:gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold
              bg-[var(--portfolio-accent)]/12 text-[var(--portfolio-accent)]
              border border-[var(--portfolio-accent)]/25 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[var(--portfolio-accent)] animate-pulse" aria-hidden="true" />
              {isDarkDev ? 'portfolio' : 'Available for work'}
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <h1
              className={`text-4xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight
                ${templateConfig.heroNameClass}`}
              style={templateConfig.heroNameStyle}
            >
              {isDarkDev ? (
                <span className="gradient-text-animated font-mono">{data.name}</span>
              ) : isCreative ? (
                <span className="gradient-text">{data.name}</span>
              ) : (
                data.name
              )}
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div variants={item} className="h-10 flex items-center">
            <p className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--portfolio-accent)]
              ${isDarkDev ? 'font-mono' : ''}`}>
              <TypewriterText phrases={data.taglines} interval={3000} />
            </p>
          </motion.div>

          {/* Bio excerpt */}
          <motion.p
            variants={item}
            className={`max-w-2xl text-base sm:text-lg text-[var(--portfolio-muted)] leading-relaxed
              ${isDarkDev ? 'font-mono text-sm sm:text-base' : ''}`}
          >
            {data.bio.slice(0, 160).trim()}…
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {isCreative ? (
              <div className="rotating-border">
                <button
                  onClick={scrollToProjects}
                  className="btn-accent relative z-10"
                  aria-label="View my projects"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  View Projects
                </button>
              </div>
            ) : (
              <button
                onClick={scrollToProjects}
                className="btn-accent"
                aria-label="View my projects"
              >
                <ExternalLink size={16} aria-hidden="true" />
                View Projects
              </button>
            )}
            <button
              onClick={scrollToContact}
              className="btn-outline"
              aria-label="Get in touch"
            >
              <Mail size={16} aria-hidden="true" />
              Get In Touch
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-4 mt-1">
            {data.github && (
              <SocialLink href={data.github} label="GitHub profile">
                <Github size={20} />
              </SocialLink>
            )}
            {data.linkedin && (
              <SocialLink href={data.linkedin} label="LinkedIn profile">
                <Linkedin size={20} />
              </SocialLink>
            )}
            {data.email && (
              <SocialLink href={`mailto:${data.email}`} label="Send email">
                <Mail size={20} />
              </SocialLink>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1
          text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)] transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={22} strokeWidth={1.5} />
        </motion.div>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
      </motion.button>
    </section>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.92 }}
      className="w-10 h-10 flex items-center justify-center rounded-full
        border border-[var(--portfolio-border)] bg-[var(--portfolio-card)]/60
        text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)]
        hover:border-[var(--portfolio-accent)] transition-colors duration-200"
    >
      {children}
    </motion.a>
  );
}
