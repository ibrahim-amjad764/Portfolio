# PortifyAI 

> An AI-powered, production-ready developer portfolio — three templates, dark/light theme, smooth animations, and a real contact API. Built with Next.js 14, Tailwind CSS, and Framer Motion.

---

##  Features

| Tier | Features |
|------|----------|
| **Core** | Responsive layout · Navbar with smooth-scroll · Typewriter hero · About · Skills with progress bars · Projects grid · Contact form · Dark/Light toggle · 3 templates |
| **Enhanced** | Scroll-triggered animations · Animated progress bars · Project filter · Sticky backdrop-blur nav · Card hover lifts · Back-to-top FAB · Open Graph / Twitter Card meta |
| **Bonus** | Canvas particle background · Project detail modal · Experience timeline · Loading screen · View counter |

---

##  Templates

| Name | Feel | Flourish |
|------|------|----------|
| **Minimal** | Clean, distraction-free | CSS grid background + left-border headings |
| **Dark Dev** | Terminal hacker aesthetic | Animated gradient name + monospace font |
| **Creative** | Bold & expressive | Rotating gradient CTA border + glow ring |

Switch templates live using the palette icon in the navbar — preference is saved to `localStorage`.

---

##  Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **Animations:** Framer Motion 11
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod + @hookform/resolvers
- **Scroll:** react-intersection-observer
- **Toasts:** Sonner

---

##  Quick Start

### 1. Install dependencies

```bash
cd portifyai
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Personalize your portfolio

Edit **`lib/data.js`** — all portfolio content lives here:

```js
export const userData = {
  name: 'Your Name',
  role: 'Your Role',
  taglines: ['Full-Stack Developer', 'UI/UX Enthusiast', '...'],
  email: 'you@example.com',
  github: 'https://github.com/you',
  linkedin: 'https://linkedin.com/in/you',
  // ... skills, projects, experience
};
```

---

##  Project Structure
```
Portfolio-main/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js              # Contact form API endpoint
│   │
│   ├── text-roll-demo/
│   │   ├── page.tsx                  # Text roll demo page
│   │   └── globals.css               # Demo page styles
│   │
│   ├── layout.js                     # Root layout + SEO metadata
│   └── page.js                       # Main portfolio page
│
├── components/
│   └── ui/
│       ├── BlurTextAnimation.tsx     # Blur text animation
│       ├── pulse-beams.tsx           # Animated pulse beam effect
│       ├── cursor.jsx                # Custom cursor
│       ├── text-roll.tsx             # Text rolling animation
│       │
│       ├── AboutSection.jsx          # About / bio section
│       ├── ContactSection.jsx        # Contact form + API integration
│       ├── ExperienceSection.jsx     # Experience timeline
│       ├── FadeInSection.jsx         # Scroll fade-in animation wrapper
│       ├── Footer.jsx                # Footer + utility links
│       ├── HeroSection.jsx           # Hero section + animations
│       ├── Navbar.jsx                # Responsive navigation bar
│       ├── PillMorphTabs.jsx         # Animated pill-style tabs
│       ├── ProjectsSection.jsx       # Projects grid + project details
│       ├── SkillsSection.jsx         # Skills + progress/filter tabs
│       ├── TemplateSwitcher.jsx      # Portfolio template switcher
│       ├── ThemeToggle.jsx            # Dark/light mode toggle
│       └── TypewriterText.jsx        # Typewriter text animation
│
├── lib/
│   ├── AppContext.js                 # Global application state
│   ├── data.js                       # ← Edit this to personalize portfolio
│   ├── templates.js                  # Portfolio template configurations
│   └── utils.js                      # Reusable utility functions
│
├── node_modules/                     # Installed npm dependencies
│
├── public/
│   ├── favicon.svg                   # Website favicon
│   ├── manifest.json                 # Web app manifest
│   └── Resume.pdf                    # Downloadable resume
│
├── .gitignore                        # Git ignored files/folders
└── next-env.d.ts                     # Next.js TypeScript declarations
```
---

##  Deployment

### Vercel (Recommended — zero config)

```bash
npm install -g vercel
vercel --prod
```

### Build for production

```bash
npm run build
npm start
```

---

##  Contact Form Integration

The contact form POSTs to `/api/contact`. It currently logs submissions to the console. To enable real email delivery, install [Resend](https://resend.com) and update `app/api/contact/route.js`:

```bash
npm install resend
```

```js
// In route.js, replace the console.log with:
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({
  from: 'portfolio@yourdomain.com',
  to: 'your@email.com',
  subject: `New message from ${sanitized.name}`,
  text: sanitized.message,
  replyTo: sanitized.email,
});
```

Add your key to `.env.local`:
```
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

##  Accessibility

- Full keyboard navigation
- ARIA labels on all interactive elements
- Skip-to-content link
- `prefers-reduced-motion` support
- Semantic HTML5 throughout
- Visible focus indicators

---

## License

MIT — free to use, modify, and deploy for personal and commercial projects.

---

##  Author

**Ibrahim Amjad** - [@ibrahim-amjad764](https://github.com/ibrahim-amjad764)
