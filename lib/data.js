// ─── lib/data.js ────────────────────────────────────────────────────────────
// Central data store for the PortifyAI portfolio.
// Edit this file to personalize your portfolio content.
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiBootstrap,
  SiMui,
  SiSupabase,
  SiAxios,
  SiNetlify,
  SiTailwindcss,
  SiPostman,
  SiFramer,
  SiHtml5,
  SiRailway,
  SiNodedotjs,
  SiExpress,
  SiTypeorm,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSocketdotio,
  SiJsonwebtokens,
  SiPython,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiJest,
} from 'react-icons/si';

export const userData = {
  // ── Personal Info ──────────────────────────────────────────────────────────
  name: 'Ibrahim Amjad',
  role: 'Full-Stack Developer | Prompt Engineer',
  taglines: [
    'Full-Stack Developer',
    'Prompt Engineer',
    'UI/UX Enthusiast',
    'Open Source Contributor',
  ],
  email: 'ibrahimamjad126@gmail.com',
  phone: '+92 3084657085',
  location: 'Lahore, Pakistan',
  github: 'https://github.com/ibrahim-amjad764',
  linkedin: 'https://www.linkedin.com/in/ibrahim-amjad-0ab331246',
  portfolio: 'https://ibrahim-amjad.dev',
  resumeUrl: '/resume.pdf',
  yearsOfExperience: 5,

  // ── AI-Generated Bio ────────────────────────────────────────────────────────
bio: `I'm a passionate full-stack developer | Prompt Engineer with experience building scalable and performant web applications using the MERN stack. I specialize in React and Node.js ecosystems, focusing on clean architecture, reusable components, and optimized backend APIs.

I’ve worked on real-time and social platform features including authentication systems, chat applications, and interactive UI experiences. I enjoy turning ideas into production-ready products with attention to performance, usability, and maintainability.

Outside of development, I continuously explore modern web technologies, improve my problem-solving skills, and work on personal projects to grow as a developer.`,

  // ── Stats ────────────────────────────────────────────────────────────────────
  stats: {
    projects: 8,
    yearsExperience: 2,
    skillsCount: 30,
    coffeePerDay: 3,
  },

  // ── Skills ────────────────────────────────────────────────────────────────────
  skills: [
  // Frontend

{ name: 'React', category: 'Frontend', proficiency: 95, icon: SiReact },
{ name: 'Next.js', category: 'Frontend', proficiency: 92, icon: SiNextdotjs },
{ name: 'JavaScript', category: 'Frontend', proficiency: 82, icon: SiJavascript },
{ name: 'TypeScript', category: 'Frontend', proficiency: 92, icon: SiTypescript },
{ name: 'Tailwind CSS', category: 'Frontend', proficiency: 94, icon: SiTailwindcss },
{ name: 'Material UI', category: 'Frontend', proficiency: 85, icon: SiMui },
{ name: 'Bootstrap', category: 'Frontend', proficiency: 85, icon: SiBootstrap },
{ name: 'Axios', category: 'Frontend', proficiency: 87, icon: SiAxios },
{ name: 'Framer Motion', category: 'Frontend', proficiency: 82, icon: SiFramer },
{ name: 'HTML5', category: 'Frontend', proficiency: 97, icon: SiHtml5 },
{ name: 'CSS3', category: 'Frontend', proficiency: 95, icon: SiHtml5 },

// Backend
  { name: 'Node.js', category: 'Backend', proficiency: 90, icon: SiNodedotjs },
  { name: 'Express.js', category: 'Backend', proficiency: 86, icon: SiExpress },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 92, icon: SiPostgresql },
  { name: 'MongoDB', category: 'Backend', proficiency: 80, icon: SiMongodb },
  { name: 'Supabase', category: 'Backend', proficiency: 92, icon: SiSupabase },
  { name: 'Prisma ORM', category: 'Backend', proficiency: 85, icon: SiPrisma },
  { name: 'TypeORM', category: 'Backend', proficiency: 90, icon: SiTypeorm },
  { name: 'Redis', category: 'Backend', proficiency: 72, icon: SiRedis },
  { name: 'Socket.lO', category: 'Backend', proficiency: 90, icon: SiSocketdotio },
  { name: 'JWT', category: 'Backend', proficiency: 90, icon: SiJsonwebtokens },
  { name: 'REST APIs', category: 'Backend', proficiency: 93, icon: SiExpress },
  { name: 'Python', category: 'Backend', proficiency: 74, icon: SiPython },
  { name: 'Prisma ORM', category: 'Backend', proficiency: 85, icon: SiPrisma },

  // Tools & DevOps
  { name: 'Git ', category: 'Tools', proficiency: 92, icon: SiGithub },
  { name: 'GitHub', category: 'Tools', proficiency: 95, icon: SiGithub },
  { name: 'Postman', category: 'Tools', proficiency: 95, icon: SiPostman },
  { name: 'HTTPie', category: 'Tools', proficiency: 86, icon: SiPostman },
  { name: 'Netlify', category: 'Tools', proficiency: 90, icon: SiNetlify },
  { name: 'Railway', category: 'Tools', proficiency: 90, icon: SiRailway },
  { name: 'Jest / Vitest', category: 'Tools', proficiency: 82, icon: SiJest },
],
  // ── Projects ────────────────────────────────────────────────────────────────
projects: [
  {
    id: 1,
    title: 'AI Shopping Assistant (FYP)',
    description:
      'An AI-powered e-commerce assistant that helps users compare products across multiple stores, discover the best prices, manage favourites and carts, and receive personalized shopping recommendations through an intelligent conversational interface. Includes secure authentication and complete profile management.',
    shortDesc:
      'AI-driven shopping assistant with product comparison and smart recommendations.',
    tech: [
      'Next.js',
      'React',
      'Node.js',
      'Supabase',
      'Spring Boot',
      'OpenAI',
      'Tailwind CSS',
      'JWT Authentication',
    ],
    github: 'https://github.com/ibrahim-amjad764/AI-Shopping-Assistant---Advanced-React-Frontend.git',
    gradient: 'from-violet-600 to-indigo-600',
    featured: true,
  },

  {
    id: 2,
    title: 'Zentia Social Platform',
    description:
      'A modern image-sharing social platform featuring real-time interactions including likes, reactions, comments, notifications, and user engagement systems. Built with secure authentication, profile customization, and responsive social feeds for seamless user experience.',
    shortDesc:
      'Image-based social media platform with real-time engagement features.',
    tech: [
      'React',
      'Next.js',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JSON Web Tokens',
      'Socket.io',
      'Tailwind CSS',
      'Firebase Authentication',
    ],
    github: 'https://github.com/ibrahim-amjad764/Zentia-Reel-App.git',
    gradient: 'from-cyan-500 to-blue-600',
    featured: true,
  },

  {
    id: 3,
    title: 'Realtime Chat Room',
    description:
      'A scalable real-time messaging application supporting multiple chat rooms, live user presence, instant messaging, and secure authentication. Designed for seamless communication with responsive UI and optimized socket-based architecture.',
    shortDesc:
      'Real-time multi-room chat application with authentication.',
    tech: [
      'React',
      'Next.js',
      'Node.js',
      'Socket.io',
      'PostgreSQL',
      'Firebase Authentication',
    ],
    github: 'https://github.com/ibrahim-amjad764/Next-JS-ChatRoom.git',
    gradient: 'from-emerald-500 to-teal-600',
    featured: false,
  },
],

  // ── Experience ───────────────────────────────────────────────────────────────

experience: [
  {
    id: 1,
    role: 'Full Stack Developer',
    company: 'Cinnova Technologies',
    companyUrl: 'https://cinnova.com',
    duration: 'Nov 2025 – June 2026',
    type: 'Full-time',
    location: 'Remote',
    points: [
      'Developed scalable MERN-stack applications with focus on clean architecture, responsiveness, and maintainable code structure.',
      'Worked on the Zentia social platform, implementing image posts, likes, comments, notifications, and profile management features.',
      'Built realtime chat functionality using Socket.IO including authentication, chat rooms, live messaging, and active user presence.',
      'Integrated secure JWT-based authentication and optimized REST APIs for efficient frontend-backend communication.',
      'Collaborated with frontend and backend teams using Git workflows and agile development practices to deliver production-ready features.',
    ],
    gradient: 'from-violet-600 to-indigo-600',
  },
],

  // experience: [
  //   {
  //     id: 1,
  //     role: 'Senior Full-Stack Engineer',
  //     company: 'Stripe',
  //     companyUrl: 'https://stripe.com',
  //     duration: '2022 – Present',
  //     type: 'Full-time',
  //     location: 'San Francisco, CA',
  //     points: [
  //       'Led frontend architecture redesign of the Stripe Dashboard, improving core web vitals by 40% and reducing bounce rate by 18%.',
  //       'Built and open-sourced a component library used across 12 internal teams with 95%+ test coverage.',
  //       'Mentored 4 junior engineers through structured 1:1s, code reviews, and pair programming sessions.',
  //       'Collaborated with product and design to ship 6 major features, each handling $1B+ in annual transaction volume.',
  //     ],
  //     gradient: 'from-violet-600 to-indigo-600',
  //   },
  //   {
  //     id: 2,
  //     role: 'Full-Stack Developer',
  //     company: 'Vercel',
  //     companyUrl: 'https://vercel.com',
  //     duration: '2020 – 2022',
  //     type: 'Full-time',
  //     location: 'Remote',
  //     points: [
  //       'Contributed to the Next.js framework core — 15+ merged PRs improving SSR performance and developer ergonomics.',
  //       'Architected the deployment preview feature used by 500,000+ developers to validate changes before production.',
  //       'Reduced CI/CD pipeline execution time by 55% through intelligent caching and parallel job optimization.',
  //       'Wrote technical documentation and created tutorial content that reached 200,000+ monthly readers.',
  //     ],
  //     gradient: 'from-gray-700 to-gray-900',
  //   },
  //   {
  //     id: 3,
  //     role: 'Frontend Engineer',
  //     company: 'Figma',
  //     companyUrl: 'https://figma.com',
  //     duration: '2019 – 2020',
  //     type: 'Full-time',
  //     location: 'San Francisco, CA',
  //     points: [
  //       'Developed the Plugin API developer experience tools, enabling 1M+ designers to extend Figma with custom workflows.',
  //       'Optimized canvas rendering performance, achieving 60fps on complex documents with 10,000+ nodes.',
  //       'Built the community file browser feature that now drives 30% of new user activation.',
  //     ],
  //     gradient: 'from-pink-500 to-rose-600',
  //   },
  //   {
  //     id: 4,
  //     role: 'Junior Web Developer',
  //     company: 'Freelance',
  //     companyUrl: null,
  //     duration: '2018 – 2019',
  //     type: 'Freelance',
  //     location: 'Remote',
  //     points: [
  //       'Delivered 12 client projects across e-commerce, SaaS, and marketing verticals on time and under budget.',
  //       'Built custom WordPress themes and React SPAs for clients in the US, UK, and Australia.',
  //       'Established a 5-star reputation on Upwork with 100% job success score.',
  //     ],
  //     gradient: 'from-emerald-500 to-teal-600',
  //   },
  // ],
};

export default userData;
