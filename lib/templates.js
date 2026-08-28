// ─── lib/templates.js ───────────────────────────────────────────────────────
// Configuration objects for the three portfolio templates.
// Each template defines styling, fonts, flourishes, and color overrides.

export const templates = {
  minimal: {
    id: "minimal",
    name: "Minimal",
    icon: "◻",
    description: "Clean, distraction-free design",
    font: "Inter, system-ui, sans-serif",
    // Section headings
    headingClass: "section-heading-minimal",
    headingPrefix: "",
    // Hero text — plain, no gradient effect on name
    heroNameClass: "text-[var(--portfolio-text)]",
    heroNameStyle: {},
    // Card styling
    cardClass: "portfolio-card",
    cardStyle: { borderRadius: "8px" },
    // Section backgrounds
    sectionAltBg: "bg-[var(--portfolio-card)]",
    sectionBg: "bg-transparent",
    // Button styles
    primaryBtn: "btn-accent",
    outlineBtn: "btn-outline",
    // Flourish
    flourish: "grid-bg",
    flourishClass: "",
    ctaWrapperClass: "",
    // Accent
    accentVar: "#6c63ff",
    // Navbar
    navbarBrand: "text-[var(--portfolio-accent)] font-bold tracking-tight",
    // Skills
    skillCardClass: "portfolio-card p-4",
    // Stat cards
    statCardClass: "portfolio-card p-6",
  },

  "dark-dev": {
    id: "dark-dev",
    name: "Dark Dev",
    icon: "⌨",
    description: "Terminal-inspired hacker aesthetic",
    font: '"JetBrains Mono", "Fira Code", monospace',
    // Section headings — terminal prefix
    headingClass: "terminal-prefix font-mono",
    headingPrefix: "",
    // Hero text — animated gradient
    heroNameClass: "gradient-text-animated font-mono",
    heroNameStyle: {},
    // Card styling
    cardClass: "portfolio-card border border-[var(--portfolio-accent)]/20",
    cardStyle: { borderRadius: "4px" },
    // Section backgrounds
    sectionAltBg: "bg-[var(--portfolio-card)]",
    sectionBg: "bg-transparent",
    // Button styles (monospace styled)
    primaryBtn: "btn-accent font-mono text-sm",
    outlineBtn: "btn-outline font-mono text-sm",
    // Flourish
    flourish: "gradient-text-name",
    flourishClass: "gradient-text-animated",
    ctaWrapperClass: "",
    // Accent
    accentVar: "#00d9ff",
    // Navbar
    navbarBrand:
      "text-[var(--portfolio-accent)] font-mono font-bold tracking-widest",
    // Skills
    skillCardClass:
      "portfolio-card p-4 border border-[var(--portfolio-accent)]/20 font-mono",
    // Stat cards
    statCardClass:
      "portfolio-card p-6 border border-[var(--portfolio-accent)]/20",
  },

  creative: {
    id: "creative",
    name: "Creative",
    icon: "✦",
    description: "Bold, colorful, expressive",
    font: "Inter, system-ui, sans-serif",
    // Section headings — clean bold
    headingClass: "font-extrabold",
    headingPrefix: "",
    // Hero text — gradient
    heroNameClass: "gradient-text",
    heroNameStyle: {},
    // Card styling
    cardClass: "portfolio-card",
    cardStyle: { borderRadius: "16px" },
    // Section backgrounds
    sectionAltBg: "bg-[var(--portfolio-card)]",
    sectionBg: "bg-transparent",
    // Button styles
    primaryBtn: "btn-accent rotating-border",
    outlineBtn: "btn-outline",
    // Flourish
    flourish: "rotating-border-cta",
    flourishClass: "glow-ring",
    ctaWrapperClass: "",
    // Accent
    accentVar: "#f43f5e",
    // Navbar
    navbarBrand: "gradient-text font-extrabold text-xl",
    // Skills
    skillCardClass: "portfolio-card p-4",
    // Stat cards
    statCardClass: "portfolio-card p-6",
  },
};

export const templateList = Object.values(templates);

export function getTemplate(id) {
  return templates[id] ?? templates.minimal;
}
