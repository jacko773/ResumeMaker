export const contact = {
  firstName: "Vinay",
  lastName: "Kumar",
  profession: "Software Engineer (MERN)",
  email: "vinay@example.com",
  phone: "+91 98765 43210",
  city: "Mumbai",
  country: "India",
  linkedin: "https://linkedin.com/in/vinay-kumar",
  website: "https://vinay.dev",
} as const;

export const summary =
  "Full‑stack MERN developer with 4+ years delivering SaaS products end‑to‑end. Strengths in React, Node.js, Express, MongoDB, and performance optimization. Proven track record shipping features from concept to production, collaborating cross‑functionally, and improving reliability with tests and CI/CD.";

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Acme Inc",
    city: "Mumbai",
    country: "India",
    start: "2022-05",
    current: true,
    bullets: [
      "Led development of a multi‑tenant MERN SaaS used by 8k+ users",
      "Reduced API latency by 40% by introducing caching + query tuning",
      "Implemented role‑based access and audit logging",
      "Set up CI/CD with automated tests and preview deployments",
    ],
  },
  {
    role: "Software Engineer",
    company: "Nimbus Labs",
    city: "Pune",
    country: "India",
    start: "2020-01",
    end: "2022-04",
    bullets: [
      "Built internal component library with Storybook to speed up UI delivery",
      "Migrated legacy REST endpoints to Express with validation + error handling",
      "Improved Lighthouse performance scores from 62 → 92",
    ],
  },
] as const;

export const projects = [
  {
    title: "MERN Resume Builder",
    role: "Full‑stack Developer",
    type: "Personal",
    start: "2024-06",
    current: true,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    bullets: [
      "Generated ATS‑friendly resumes with live preview",
      "Implemented schema‑driven sections and autosave",
      "Deployed on Vercel with CI/CD",
    ],
    links: {
      github: "https://github.com/you/resume-builder",
      live: "https://resume.you.app",
    },
  },
  {
    title: "Stock Analysis Dashboard",
    role: "Frontend Engineer",
    type: "Client",
    start: "2023-03",
    end: "2023-10",
    tech: ["React", "Zustand", "Highcharts", "Express"],
    bullets: [
      "Built interactive charts and screens for backtesting",
      "Implemented pagination + virtualization for 100k‑row tables",
      "Added auth + rate limiting for public endpoints",
    ],
    links: { github: "", live: "https://stocks.client.app" },
  },
] as const;

export const skills = [
  { name: "JavaScript", category: "Programming", level: 5 },
  { name: "TypeScript", category: "Programming", level: 4 },
  { name: "React", category: "Frontend", level: 5 },
  { name: "Redux", category: "Frontend", level: 4 },
  { name: "Tailwind CSS", category: "Frontend", level: 4 },
  { name: "Node.js", category: "Backend", level: 5 },
  { name: "Express", category: "Backend", level: 4 },
  { name: "REST APIs", category: "Backend", level: 4 },
  { name: "MongoDB", category: "Databases", level: 4 },
  { name: "PostgreSQL", category: "Databases", level: 3 },
  { name: "Docker", category: "DevOps", level: 3 },
  { name: "Git", category: "Tools", level: 5 },
  { name: "Jest", category: "Testing", level: 3 },
  { name: "Cypress", category: "Testing", level: 3 },
] as const;

export const education = [
  {
    degree: "B.Tech",
    field: "Computer Science",
    school: "Your University",
    city: "Mumbai",
    country: "India",
    start: "2019-08",
    end: "2023-05",
    gpa: "8.6/10",
    bullets: [
      "Data Structures & Algorithms",
      "Full‑Stack Web Development (MERN)",
    ],
  },
] as const;

export const DEFAULT_MOCK_RESUME = {
  title: "Vinay Kumar — Software Engineer (MERN)",
  templateId: "classic-ats",
  sections: {
    contact: contact,
    summary: summary,
    experience: experience,
    projects: projects,
    skills: skills,
    education: education,
    // certifications: [],
    // awards: [],
    // publications: [],
    // languages: [],
    // hobbies: [],
  },
} as const;
