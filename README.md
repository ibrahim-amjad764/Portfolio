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
portifyai/
├── app/
│   ├── api/contact/route.js   # Contact form API endpoint
│   ├── globals.css            # Design system + CSS tokens
│   ├── layout.js              # Root layout + SEO metadata
│   └── page.js                # Main page with loading screen
├── components/
│   ├── Navbar.jsx             # Sticky nav with mobile overlay
│   ├── HeroSection.jsx        # Particle bg + typewriter
│   ├── AboutSection.jsx       # Bio + stat cards
│   ├── SkillsSection.jsx      # Filter tabs + progress bars
│   ├── ProjectsSection.jsx    # Card grid + modal
│   ├── ExperienceSection.jsx  # Timeline layout
│   ├── ContactSection.jsx     # Hook Form + Zod + API
│   ├── Footer.jsx             # View counter + back-to-top
│   ├── FadeInSection.jsx      # Scroll-trigger wrapper
│   ├── TypewriterText.jsx     # Phrase cycler
│   ├── ThemeToggle.jsx        # Dark/light toggle
│   └── TemplateSwitcher.jsx   # Template dropdown
├── lib/
│   ├── data.js                # ← Edit this to personalize
│   ├── templates.js           # Template configs
│   └── AppContext.js          # Global state provider
├── tailwind.config.js
├── next.config.js
└── package.json
```
Portfolio-main/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js
│   ├── text-roll-demo/
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── layout.js
│   └── page.js
│
├── components/
│   └── ui/
│       ├── BlurTextAnimation.tsx
│       ├── pulse-beams.tsx
│       ├── cursor.jsx
│       ├── text-roll.tsx
│       ├── AboutSection.jsx
│       ├── ContactSection.jsx
│       ├── ExperienceSection.jsx
│       ├── FadeInSection.jsx
│       ├── Footer.jsx
│       ├── HeroSection.jsx
│       ├── Navbar.jsx
│       ├── PillMorphTabs.jsx
│       ├── ProjectsSection.jsx
│       ├── SkillsSection.jsx
│       ├── TemplateSwitcher.jsx
│       ├── ThemeToggle.jsx
│       └── TypewriterText.jsx
│
├── lib/
│   ├── AppContext.js
│   ├── data.js
│   ├── templates.js
│   └── utils.js
│
├── node_modules/
│
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── Resume.pdf
│
├── .gitignore
└── next-env.d.ts

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
