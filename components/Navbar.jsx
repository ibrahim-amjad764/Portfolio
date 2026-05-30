'use client';
// ─── components/Navbar.jsx ─────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useApp } from '../lib/AppContext';
import ThemeToggle from './ThemeToggle';
import TemplateSwitcher from './TemplateSwitcher';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ name = 'PortifyAI' }) {
  const { templateConfig } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // ── Scroll detection ───────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ───────────────────────────
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ── Lock body scroll when mobile menu open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const brandInitials = name.slice(0, 2).toUpperCase();

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'nav-scrolled' : 'bg-transparent'
        }`}
      >
        <nav
          className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* ── Brand ── */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}
            className={`text-lg font-bold tracking-tight flex items-center gap-2 ${templateConfig.navbarBrand}`}
            aria-label="Back to top"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black text-white"
              style={{ background: 'var(--portfolio-accent)' }}
              aria-hidden="true"
            >
              {brandInitials}
            </span>
            <span className="hidden sm:inline">{name}</span>
          </a>

          {/* ── Desktop Links ── */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className={`
                      relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                      ${isActive
                        ? 'text-[var(--portfolio-accent)]'
                        : 'text-[var(--portfolio-muted)] hover:text-[var(--portfolio-text)]'
                      }
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-full bg-[var(--portfolio-accent)]/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ── Controls ── */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <TemplateSwitcher />
            {/* Hamburger — mobile only */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className={`
                lg:hidden flex items-center justify-center w-10 h-10 rounded-full
                border border-[var(--portfolio-border)] bg-[var(--portfolio-card)]
                text-[var(--portfolio-muted)] hover:text-[var(--portfolio-accent)]
                transition-colors duration-200
              `}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* ── Mobile Overlay Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="nav-overlay lg:hidden"
          >
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-4 w-10 h-10 flex items-center justify-center
                rounded-full border border-[var(--portfolio-border)] text-[var(--portfolio-muted)]"
            >
              <X size={20} />
            </button>

            {/* Brand */}
            <p className="absolute top-5 left-4 text-lg font-bold text-[var(--portfolio-accent)]">
              {name}
            </p>

            {/* Links */}
            <ul className="flex flex-col items-center gap-2 w-full px-8" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  className="w-full"
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="block w-full text-center py-4 text-2xl font-semibold
                      text-[var(--portfolio-text)] hover:text-[var(--portfolio-accent)]
                      transition-colors duration-200 border-b border-[var(--portfolio-border)]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
