'use client';
// ─── components/FadeInSection.jsx ──────────────────────────────────────────
// Reusable scroll-triggered fade-in wrapper using Framer Motion + Intersection Observer.

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number}  [props.delay=0]     — stagger delay in seconds
 * @param {string}  [props.className]   — extra class names on the wrapper
 * @param {string}  [props.direction]   — 'up' (default) | 'left' | 'right' | 'none'
 */
export default function FadeInSection({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '-60px 0px',
    threshold: 0.05,
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 30 : direction === 'down' ? -30 : 0,
      x: direction === 'left' ? 30 : direction === 'right' ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.55,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
