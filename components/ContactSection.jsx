'use client';
// ─── components/ContactSection.jsx ─────────────────────────────────────────

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Mail, MapPin, Send, Loader2, Github, Linkedin, Twitter } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { useApp } from '../lib/AppContext';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

function InputField({ id, label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[var(--portfolio-text)]">
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 font-medium"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

const inputClass = `
  w-full px-4 py-3 rounded-lg text-sm
  bg-[var(--portfolio-bg)] border border-[var(--portfolio-border)]
  text-[var(--portfolio-text)] placeholder:text-[var(--portfolio-muted)]
  focus:outline-none focus:border-[var(--portfolio-accent)] focus:ring-1 focus:ring-[var(--portfolio-accent)]
  transition-colors duration-200
`;

export default function ContactSection({ data }) {
  const { templateConfig, template } = useApp();
  const isDarkDev = template === 'dark-dev';
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (res.ok && result.success) {
        toast.success(result.message || 'Message sent successfully!', {
          description: "I'll get back to you within 24 hours.",
          duration: 5000,
        });
        reset();
      } else {
        toast.error(result.message || 'Failed to send message.', {
          description: 'Please try again or email me directly.',
          duration: 5000,
        });
      }
    } catch {
      toast.error('Network error. Please check your connection.', {
        description: `You can also email me at ${data.email}`,
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const headingClass = `text-3xl sm:text-4xl font-bold text-[var(--portfolio-text)] ${templateConfig.headingClass}`;

  const socials = [
    { href: data.github, label: 'GitHub', icon: Github },
    { href: data.linkedin, label: 'LinkedIn', icon: Linkedin },
    { href: data.twitter, label: 'Twitter / X', icon: Twitter },
  ].filter((s) => s.href);

  return (
    <section id="contact" className={`section-padding ${templateConfig.sectionBg}`} aria-label="Contact">
      <div className="container-max">
        {/* Heading */}
        <FadeInSection className="mb-12 sm:mb-16">
          <h2 className={headingClass}>Get In Touch</h2>
          <p className="mt-3 text-[var(--portfolio-muted)] max-w-xl">
            {isDarkDev ? '' : ''}Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Left: Form ── */}
          <FadeInSection direction="left">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-label="Contact form"
              className="space-y-5"
            >
              <InputField id="name" label="Your Name" error={errors.name?.message}>
                <input
                  id="name"
                  type="text"
                  placeholder="Alex Johnson"
                  autoComplete="name"
                  className={inputClass}
                  {...register('name')}
                />
              </InputField>

              <InputField id="email" label="Email Address" error={errors.email?.message}>
                <input
                  id="email"
                  type="email"
                  placeholder="alex@example.com"
                  autoComplete="email"
                  className={inputClass}
                  {...register('email')}
                />
              </InputField>

              <InputField id="message" label="Message" error={errors.message?.message}>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or just say hi..."
                  className={`${inputClass} resize-none`}
                  {...register('message')}
                />
              </InputField>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.03 } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                className="btn-accent w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
              >
                {isSubmitting ? (
                  <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…</>
                ) : (
                  <><Send size={16} aria-hidden="true" /> Send Message</>
                )}
              </motion.button>
            </form>
          </FadeInSection>

          {/* ── Right: Contact Info ── */}
          <FadeInSection direction="right" className="space-y-8">
            <div className="portfolio-card p-6 space-y-5">
              <h3 className={`font-bold text-lg text-[var(--portfolio-text)] ${isDarkDev ? 'font-mono' : ''}`}>
                Contact Details
              </h3>

              <a
                href={`mailto:${data.email}`}
                className={`flex items-start gap-4 group`}
                aria-label={`Email ${data.email}`}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--portfolio-accent)', opacity: 0.85 }}>
                  <Mail size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[var(--portfolio-muted)] font-medium mb-0.5">Email</p>
                  <p className="text-[var(--portfolio-text)] font-semibold group-hover:text-[var(--portfolio-accent)]
                    transition-colors break-all">
                    {data.email}
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--portfolio-accent)', opacity: 0.85 }}>
                  <MapPin size={18} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-[var(--portfolio-muted)] font-medium mb-0.5">Location</p>
                  <p className="text-[var(--portfolio-text)] font-semibold">{data.location}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="portfolio-card p-6 space-y-4">
              <h3 className={`font-bold text-lg text-[var(--portfolio-text)] ${isDarkDev ? 'font-mono' : ''}`}>
                Find Me Online
              </h3>
              <div className="flex flex-col gap-3">
                {socials.map(({ href, label, icon: Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${label} profile`}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 text-[var(--portfolio-muted)]
                      hover:text-[var(--portfolio-accent)] transition-colors duration-200 group"
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="text-sm font-medium">{label}</span>
                    <span className="ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                border border-emerald-500/30 bg-emerald-500/8"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" aria-hidden="true" />
              <p className={`text-sm font-medium text-emerald-400 ${isDarkDev ? 'font-mono' : ''}`}>
                Currently available for new projects
              </p>
            </motion.div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
}
