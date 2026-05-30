'use client';
// ─── components/Footer.jsx ─────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ArrowUp, Eye } from 'lucide-react';
import { useApp } from '../lib/AppContext';

export default function Footer({ data }) {
  const { viewCount, template } = useApp();
  const isDarkDev = template === 'dark-dev';
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { href: data.github, label: 'GitHub', icon: Github },
    { href: data.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: data.twitter, label: 'Twitter', icon: Twitter },
    { href: `mailto:${data.email}`, label: 'Email', icon: Mail },
  ].filter((s) => s.href);

  const year = new Date().getFullYear();

  return (
    <>
      <footer
        className="border-t border-[var(--portfolio-border)] bg-[var(--portfolio-card)]"
        aria-label="Site footer"
      >
        <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left — copyright */}
            <p className={`text-sm text-[var(--portfolio-muted)] text-center sm:text-left
              ${isDarkDev ? 'font-mono' : ''}`}>
              © {year}{' '}
              <span className="text-[var(--portfolio-text)] font-semibold">{data.name}</span>
              {isDarkDev ? '  All rights reserved' : '. All rights reserved.'}
            </p>

            {/* Centre — view count */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium
                border border-[var(--portfolio-border)] text-[var(--portfolio-muted)]
                ${isDarkDev ? 'font-mono' : ''}`}
              aria-label={`${viewCount.toLocaleString()} portfolio views`}
            >
              <Eye size={13} aria-hidden="true" />
              <span>{viewCount.toLocaleString()} views</span>
            </motion.div>

            {/* Right — social links */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-3" role="list">
                {socials.map(({ href, label, icon: Icon }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target={href.startsWith('mailto') ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 flex items-center justify-center rounded-full
                        border border-[var(--portfolio-border)] text-[var(--portfolio-muted)]
                        hover:text-[var(--portfolio-accent)] hover:border-[var(--portfolio-accent)]
                        transition-colors duration-200"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Built with line */}
          <p className={`mt-4 text-center text-xs text-[var(--portfolio-muted)]/60
            ${isDarkDev ? 'font-mono' : ''}`}>
            Built with Next.js, Tailwind CSS & Framer Motion ·{' '}
            <span className="text-[var(--portfolio-accent)]">PortifyAI</span>
          </p>
        </div>
      </footer>

      {/* Back to top FAB */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className="fixed bottom-6 right-6 z-30 w-12 h-12 flex items-center justify-center
              rounded-full text-white shadow-accent-lg transition-shadow duration-200
              hover:shadow-accent focus-visible:outline-2 focus-visible:outline-[var(--portfolio-accent)]"
            style={{ background: 'var(--portfolio-accent)' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
