export const SITE = {
  name: "Kamron Fazilov",
  title: "Frontend Developer — Crafting Modern Web Experiences",
  description:
    "Passionate frontend developer specializing in React, JavaScript, and modern web technologies. Mars IT School intern.",
  url: "https://kamron-fazilov.vercel.app",
  author: "Kamron Fazilov",
  email: "kama58077@gmail.com",
  phone: "+998 97 090 05 50",
  telegram: "@programmer_1107",
  workHours: "10:00 — 22:00",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { name: "GitHub", url: "https://github.com/kamronfazilov", icon: "github" },
  { name: "LinkedIn", url: "https://linkedin.com/in/kamronfazilov", icon: "linkedin" },
  { name: "Telegram", url: "https://t.me/programmer_1107", icon: "send" },
  { name: "Instagram", url: "https://instagram.com/kamronfazilov", icon: "instagram" },
  { name: "Email", url: "mailto:kamronfazilov@example.com", icon: "mail" },
] as const;

export const SKILLS = {
  frontend: [
    { name: "React", level: 92 },
    { name: "JavaScript", level: 90 },
    { name: "Tailwind CSS", level: 92 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 93 },
    { name: "Redux", level: 75 },
  ],
  backend: [
    { name: "Firebase", level: 78 },
    { name: "Node.js", level: 70 },
    { name: "REST APIs", level: 80 },
  ],
  tools: [
    { name: "Git / GitHub", level: 90 },
    { name: "Vite", level: 85 },
    { name: "Figma", level: 80 },
    { name: "NPM", level: 82 },
  ],
} as const;

export const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A modern e-commerce platform built with React and Firebase. Features user authentication, product catalog, shopping cart, and Stripe payment integration.",
    image: "/projects/project-1.jpg",
    tags: ["React", "Firebase", "Tailwind", "Stripe"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A productivity app for managing tasks and projects with drag-and-drop functionality, real-time updates, and team collaboration features.",
    image: "/projects/project-2.jpg",
    tags: ["React", "Redux", "Node.js", "MongoDB"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with forecast data, interactive maps, and location search. Clean UI with smooth animations.",
    image: "/projects/project-3.jpg",
    tags: ["React", "OpenWeather API", "Chart.js", "CSS3"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 4,
    title: "Social Media App",
    description:
      "A social networking platform with posts, comments, likes, and real-time chat functionality built with modern web technologies.",
    image: "/projects/project-4.jpg",
    tags: ["React", "Firebase", "Socket.io", "Material-UI"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Personal portfolio showcasing projects and skills with a stunning space-themed particle background and neon cyberpunk aesthetic.",
    image: "/projects/project-5.jpg",
    tags: ["React", "Vite", "Tailwind", "Framer Motion"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 6,
    title: "Admin Dashboard",
    description:
      "Admin panel with CRUD operations for managing projects, skills, certificates, and user messages. Includes authentication and Firebase integration.",
    image: "/projects/project-6.jpg",
    tags: ["React", "Firebase", "Tailwind", "Admin"],
    github: "https://github.com/kamronfazilov",
    demo: "https://example.com",
  },
  {
    id: 7,
    title: "Spotify Clone",
    description:
      "A fully functional Spotify clone with music playback, playlist management, search functionality, and a sleek dark-mode UI inspired by the original Spotify design.",
    image: "/projects/project-7.jpg",
    tags: ["React", "Tailwind", "Vite", "Music"],
    github: "https://github.com/kamronfazilov",
    demo: "https://spotify-clone-one-kohl.vercel.app/",
  },
] as const;

export const EXPERIENCE = [
  {
    id: 1,
    role: "Frontend Developer Intern",
    company: "Mars IT School",
    period: "2024 — Present",
    description:
      "Learning and building modern web applications with React and related technologies. Collaborating on real-world projects to gain hands-on experience.",
    highlights: [
      "Developed responsive web applications using React and Tailwind CSS",
      "Integrated Firebase for backend services and real-time data",
      "Built portfolio projects showcasing frontend development skills",
    ],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Freelance",
    period: "2023 — 2024",
    description:
      "Started journey in frontend development, building websites and web applications for clients. Focused on React and modern CSS frameworks.",
    highlights: [
      "Delivered multiple client projects on time and within budget",
      "Built reusable component libraries for faster development",
      "Achieved excellent performance and accessibility scores",
    ],
  },
] as const;

export const EDUCATION = [
  {
    id: 1,
    degree: "Frontend Development",
    institution: "Mars IT School",
    period: "2024 — Present",
    description:
      "Intensive program focused on modern web development including React, JavaScript, and responsive design.",
  },
  {
    id: 2,
    degree: "Self-Taught Web Developer",
    institution: "Online Learning",
    period: "2023 — 2024",
    description:
      "Self-directed learning covering HTML, CSS, JavaScript, React, and modern development tools through various online resources.",
  },
] as const;

export const CERTIFICATES = [
  {
    id: 1,
    title: "React Development",
    issuer: "Mars IT School",
    date: "2024",
    url: "#",
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    issuer: "Online Course",
    date: "2024",
    url: "#",
  },
  {
    id: 3,
    title: "Tailwind CSS Mastery",
    issuer: "Online Course",
    date: "2023",
    url: "#",
  },
  {
    id: 4,
    title: "Frontend Development Basics",
    issuer: "Online Course",
    date: "2023",
    url: "#",
  },
] as const;

export const BLOG_POSTS = [
  {
    id: 1,
    title: "Getting Started with React in 2024",
    excerpt:
      "A beginner's guide to building your first React application with modern tools and best practices.",
    date: "2024-12-15",
    readTime: "5 min",
    slug: "getting-started-react-2024",
  },
  {
    id: 2,
    title: "Building a Portfolio with Tailwind CSS",
    excerpt:
      "How I built my portfolio website using Tailwind CSS, Framer Motion, and a cosmic particle background.",
    date: "2024-11-20",
    readTime: "8 min",
    slug: "building-portfolio-tailwind",
  },
  {
    id: 3,
    title: "My Learning Journey as a Developer",
    excerpt:
      "From self-taught beginner to Mars IT School intern — my journey into frontend development.",
    date: "2024-10-05",
    readTime: "4 min",
    slug: "learning-journey-developer",
  },
] as const;
