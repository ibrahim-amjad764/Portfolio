/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        'portfolio-bg': 'var(--portfolio-bg)',
        'portfolio-card': 'var(--portfolio-card)',
        'portfolio-text': 'var(--portfolio-text)',
        'portfolio-muted': 'var(--portfolio-muted)',
        'portfolio-accent': 'var(--portfolio-accent)',
        'portfolio-border': 'var(--portfolio-border)',
        // Dark theme
        dark: {
          bg: '#0a0a0f',
          card: '#16161e',
          text: '#f1f1f3',
          muted: '#8888a0',
          accent: '#6c63ff',
          border: 'rgba(255,255,255,0.08)',
        },
        // Light theme
        light: {
          bg: '#fafafa',
          card: '#ffffff',
          text: '#1a1a2e',
          muted: '#6b6b80',
          accent: '#6c63ff',
          border: 'rgba(0,0,0,0.08)',
        },
        accent: {
          purple: '#6c63ff',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          from: { boxShadow: '0 0 20px rgba(108,99,255,0.4)' },
          to: { boxShadow: '0 0 40px rgba(108,99,255,0.8), 0 0 80px rgba(108,99,255,0.2)' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'accent': '0 4px 24px rgba(108,99,255,0.25)',
        'accent-lg': '0 8px 40px rgba(108,99,255,0.35)',
        'card': '0 2px 16px rgba(0,0,0,0.12)',
        'card-dark': '0 2px 16px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
};
