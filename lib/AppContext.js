'use client';
// ─── lib/AppContext.js ──────────────────────────────────────────────────────
// Global React Context for template selection, theme preference, and view count.

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getTemplate } from './templates';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  template: 'portifyai_template',
  theme: 'portifyai_theme',
  viewCount: 'portifyai_views',
};

export function AppProvider({ children }) {
  const [template, setTemplateState] = useState('minimal');
  const [theme, setThemeState] = useState('dark');
  const [viewCount, setViewCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  // ── Initialize from localStorage on mount ─────────────────────────────────
  useEffect(() => {
    const savedTemplate = localStorage.getItem(STORAGE_KEYS.template) || 'minimal';
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
    const savedViews = parseInt(localStorage.getItem(STORAGE_KEYS.viewCount) || '0', 10);

    // Generate random base view count if first visit
    const baseViews = savedViews === 0
      ? Math.floor(Math.random() * 4000) + 1000
      : savedViews;

    const newViews = baseViews + 1;

    setTemplateState(savedTemplate);
    setThemeState(savedTheme);
    setViewCount(newViews);

    // Persist incremented view count
    localStorage.setItem(STORAGE_KEYS.viewCount, String(newViews));

    // Apply to DOM
    applyTemplate(savedTemplate);
    applyTheme(savedTheme);

    setMounted(true);
  }, []);

  // ── Apply template to DOM ─────────────────────────────────────────────────
  function applyTemplate(templateId) {
    document.documentElement.setAttribute('data-template', templateId);
    const templateConfig = getTemplate(templateId);
    // Apply font family
    document.documentElement.style.setProperty(
      '--portfolio-font',
      templateConfig.font
    );
  }

  // ── Apply theme to DOM ────────────────────────────────────────────────────
  function applyTheme(newTheme) {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }

  // ── Switch template ───────────────────────────────────────────────────────
  const switchTemplate = useCallback((newTemplate) => {
    setTemplateState(newTemplate);
    localStorage.setItem(STORAGE_KEYS.template, newTemplate);
    applyTemplate(newTemplate);
  }, []);

  // ── Toggle theme ──────────────────────────────────────────────────────────
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEYS.theme, next);
      applyTheme(next);
      return next;
    });
  }, []);

  // ── Computed template config ──────────────────────────────────────────────
  const templateConfig = getTemplate(template);

  const value = {
    template,
    templateConfig,
    switchTemplate,
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    viewCount,
    mounted,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ── Custom hook ───────────────────────────────────────────────────────────────
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}

export default AppContext;
