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
} from "react-icons/si";

export const userData = {
  // ── Personal Info ──────────────────────────────────────────────────────────
  name: "Ibrahim Amjad",
  role: "Full-Stack Developer | Prompt Engineer",
  taglines: [
    "Full-Stack Developer",
    "Prompt Engineer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
  ],
  email: "ibrahimamjad126@gmail.com",
  phone: "+92 3084657085",
  location: "Lahore, Pakistan",
  github: "https://github.com/ibrahim-amjad764",
  linkedin: "https://www.linkedin.com/in/ibrahim-amjad-0ab331246",
  portfolio: "https://ibrahim-amjad.dev",
  resumeUrl: "/resume.pdf",
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

    { name: "React", category: "Frontend", proficiency: 95, icon: SiReact },
    {
      name: "Next.js",
      category: "Frontend",
      proficiency: 92,
      icon: SiNextdotjs,
    },
    {
      name: "JavaScript",
      category: "Frontend",
      proficiency: 82,
      icon: SiJavascript,
    },
    {
      name: "TypeScript",
      category: "Frontend",
      proficiency: 92,
      icon: SiTypescript,
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      proficiency: 94,
      icon: SiTailwindcss,
    },
    { name: "Material UI", category: "Frontend", proficiency: 85, icon: SiMui },
    {
      name: "Bootstrap",
      category: "Frontend",
      proficiency: 85,
      icon: SiBootstrap,
    },
    { name: "Axios", category: "Frontend", proficiency: 87, icon: SiAxios },
    {
      name: "Framer Motion",
      category: "Frontend",
      proficiency: 82,
      icon: SiFramer,
    },
    { name: "HTML5", category: "Frontend", proficiency: 97, icon: SiHtml5 },
    { name: "CSS3", category: "Frontend", proficiency: 95, icon: SiHtml5 },

    // Backend
    {
      name: "Node.js",
      category: "Backend",
      proficiency: 90,
      icon: SiNodedotjs,
    },
    {
      name: "Express.js",
      category: "Backend",
      proficiency: 86,
      icon: SiExpress,
    },
    {
      name: "PostgreSQL",
      category: "Backend",
      proficiency: 92,
      icon: SiPostgresql,
    },
    { name: "MongoDB", category: "Backend", proficiency: 80, icon: SiMongodb },
    {
      name: "Supabase",
      category: "Backend",
      proficiency: 92,
      icon: SiSupabase,
    },
    {
      name: "Prisma ORM",
      category: "Backend",
      proficiency: 85,
      icon: SiPrisma,
    },
    { name: "TypeORM", category: "Backend", proficiency: 90, icon: SiTypeorm },
    { name: "Redis", category: "Backend", proficiency: 72, icon: SiRedis },
    {
      name: "Socket.lO",
      category: "Backend",
      proficiency: 90,
      icon: SiSocketdotio,
    },
    {
      name: "JWT",
      category: "Backend",
      proficiency: 90,
      icon: SiJsonwebtokens,
    },
    {
      name: "REST APIs",
      category: "Backend",
      proficiency: 93,
      icon: SiExpress,
    },
    { name: "Python", category: "Backend", proficiency: 74, icon: SiPython },

    // Tools & DevOps
    { name: "Git", category: "Tools", proficiency: 92, icon: SiGithub },
    { name: "GitHub", category: "Tools", proficiency: 95, icon: SiGithub },
    { name: "Postman", category: "Tools", proficiency: 95, icon: SiPostman },
    { name: "HTTPie", category: "Tools", proficiency: 86, icon: SiPostman },
    { name: "Netlify", category: "Tools", proficiency: 90, icon: SiNetlify },
    { name: "Railway", category: "Tools", proficiency: 90, icon: SiRailway },
    { name: "Jest / Vitest", category: "Tools", proficiency: 82, icon: SiJest },
  ].map((skill, index) => ({
    ...skill,
    id: `skill-${index + 1}`,
  })),
  // ── Projects ────────────────────────────────────────────────────────────────
  projects: [
    {
      id: 1,
      title: "AI Shopping Assistant (FYP)",
      description:
        "An AI-powered e-commerce assistant that helps users compare products across multiple stores, discover the best prices, manage favourites and carts, and receive personalized shopping recommendations through an intelligent conversational interface. Includes secure authentication and complete profile management.",
      shortDesc:
        "AI-driven shopping assistant with product comparison and smart recommendations.",
      tech: [
        "Next.js",
        "React",
        "Node.js",
        "Supabase",
        "Spring Boot",
        "OpenAI",
        "Tailwind CSS",
        "JWT Authentication",
      ],
      github:
        "https://github.com/ibrahim-amjad764/AI-Shopping-Assistant---Advanced-React-Frontend.git",
      image: "/ai-shopping-assistant.png",
      featured: true,
    },

    {
      id: 2,
      title: "Zentia Social Platform",
      description:
        "A modern image-sharing social platform featuring real-time interactions including likes, reactions, comments, notifications, and user engagement systems. Built with secure authentication, profile customization, and responsive social feeds for seamless user experience.",
      shortDesc:
        "Image-based social media platform with real-time engagement features.",
      tech: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "PostgreSQL",
        "JSON Web Tokens",
        "Socket.io",
        "Tailwind CSS",
        "Firebase Authentication",
      ],
      image: "/projects/zentia-reel-app.png",
      github: "https://github.com/ibrahim-amjad764/Zentia-Reel-App.git",
      image: "/zentia-reel-app.png",
      featured: true,
    },

    {
      id: 3,
      title: "SprintForge ",
      description:
        "SprintForge is a production-ready SaaS project management platform built with Next.js, React, TypeScript, Tailwind CSS, MongoDB, Mongoose, Auth.js, Socket.IO, Cloudinary, and Recharts. It enables teams to create workspaces, manage projects and tasks, collaborate with teammates, organize work with Kanban boards, track productivity, receive notifications, manage files, analyze performance, and monitor work history. The platform features a responsive interface, real-time collaboration, role-based permissions, analytics, time tracking, and a scalable MongoDB architecture.",
      shortDesc:
        "Production-ready project management SaaS with workspaces, teams, tasks, Kanban boards, realtime collaboration, and analytics.",
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "MongoDB",
        "Mongoose",
        "Auth.js",
        "Cloudinary",
        "Socket.IO",
        "Recharts",
      ],
      image: "/sprintfoge.png",
      github: "https://github.com/ibrahim-amjad764/SprintForge.git",
      featured: true,
    },

    {
      id: 4,
      title: "Realtime Chat Room",
      description:
        "A scalable real-time messaging application supporting multiple chat rooms, live user presence, instant messaging, and secure authentication. Designed for seamless communication with responsive UI and optimized socket-based architecture.",
      shortDesc: "Real-time multi-room chat application with authentication.",
      tech: [
        "React",
        "Next.js",
        "Node.js",
        "Socket.io",
        "PostgreSQL",
        "Firebase Authentication",
      ],
      image: "/realtime-chat-room.png",
      github: "https://github.com/ibrahim-amjad764/Next-JS-ChatRoom.git",
      featured: false,
    },

    {
      id: 5,
      title: "CodeMedic ",
      description:
        "An AI-powered code review tool that provides real-time feedback and suggestions for improving code quality and maintaining consistency across development teams.",
      shortDesc:
        "AI-driven code review assistant for enhanced development workflows.",
      tech: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "OpenAI",
        "Tailwind CSS",
      ],
      image: "/codemedic.png",
      github: "https://github.com/ibrahim-amjad764/CodeMedic.git",
      featured: false,
    },

    {
      id: 6,
      title: "Neurix AI ",
      description:
        "Neurix AI is a fast and secure AI-powered chatbot built with Next.js, React, TypeScript, Tailwind CSS, and OpenRouter. It provides a clean conversational experience with multi-turn context, Markdown rendering, browser-based chat history, dark/light mode, and a responsive UI. The backend securely handles AI requests with server-side API key protection, Zod input/output validation, request limits, timeout handling, and graceful error states.",
      shortDesc:
        "AI-powered chatbot with multi-turn context, secure API handling, and local chat history.",
      tech: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Zod",
        "OpenRouter",
        "React Markdown",
        "LocalStorage",
      ],
      image: "/neurix-ai.png",
      github: "https://github.com/ibrahim-amjad764/Neurix.git",
      featured: false,
    },
  ],

  // ── Experience ───────────────────────────────────────────────────────────────

  experience: [
    {
      id: 1,
      role: "Full Stack Developer",
      company: "Cinnova Technologies",
      companyUrl: "https://cinnova.com",
      duration: "Nov 2025 – June 2026",
      type: "Full-time",
      location: "On-site (Lahore, Pakistan)",
      points: [
        "Developed scalable MERN-stack applications with focus on clean architecture, responsiveness, and maintainable code structure.",
        "Worked on the Zentia social platform, implementing image posts, likes, comments, notifications, and profile management features.",
        "Built realtime chat functionality using Socket.IO including authentication, chat rooms, live messaging, and active user presence.",
        "Integrated secure JWT-based authentication and optimized REST APIs for efficient frontend-backend communication.",
        "Collaborated with frontend and backend teams using Git workflows and agile development practices to deliver production-ready features.",
      ],
      gradient: "from-violet-600 to-indigo-600",
    },

    {
      id: 2,
      role: "Software Engineering & DevOps Virtual Simulations",
      company: "(Forage)",
      companyUrl: "https://www.theforage.com",
      duration: "Aug 2026",
      type: "Virtual Experience",
      location: "Remote",
      points: [
        "Software Engineering: Designed and developed RESTful web services using Java and Spring Boot.",
        "Built a REST API to manage employee data with HTTP GET and POST endpoints using JSON.",
        "Implemented Java classes, controllers, data management, and tested API functionality with Gradle.",
        "DevOps: Configured GitHub, Git, Visual Studio Code, and Azure for cloud-based development workflows.",
        "Created and cloned GitHub repositories, practiced Git version control, and worked with remote repositories.",
        "Created a GitHub Actions workflow using YAML to automate development workflows and CI/CD processes.",
        "Walmart Tech: Designed system architectures and automated data munging Python pipelines.",
        "Skyscanner: Built a Backpack React web app, microservices, and mobile flight itineraries.",
      ],
      gradient: "from-emerald-500 to-teal-700",
    },
  ],
};

export default userData;
