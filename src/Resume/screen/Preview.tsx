import React from "react";

/**
 * Template — Classic ATS
 *
 * Goals:
 * - Single‑column, semantic markup, no icons/emoji, no tables → ATS friendly
 * - Strong hierarchy: NAME, role, contact line, then sections
 * - Consistent spacing + page break control
 * - Works with the same data shape used across the builder
 *
 * Usage in Preview page:
 *   import TemplateClassicATS from "../templates/TemplateClassicATS";
 *   ...
 *   {template === 'classic' ? (
 *     <TemplateClassicATS data={data} order={order} hidden={hidden} />
 *   ) : (
 *     <ResumePaper .../> // your existing renderer for other templates
 *   )}
 */
const MOCK_RESUME = {
  title: "Vinay Kumar — Software Engineer (MERN)",
  templateId: "classic-ats",
  sections: {
    contact: {
      firstName: "Vinay",
      lastName: "Kumar",
      profession: "Software Engineer (MERN)",
      email: "vinay@example.com",
      phone: "+91 98765 43210",
      city: "Mumbai",
      country: "India",
      linkedin: "https://linkedin.com/in/vinay-kumar",
      website: "https://vinay.dev"
    },

    summary: "Full‑stack MERN developer with 4+ years delivering SaaS products end‑to‑end. Strengths in React, Node.js, Express, MongoDB, and performance optimization. Proven track record shipping features from concept to production, collaborating cross‑functionally, and improving reliability with tests and CI/CD.",

    experience: [
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
          "Set up CI/CD with automated tests and preview deployments"
        ]
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
          "Improved Lighthouse performance scores from 62 → 92"
        ]
      }
    ],

    projects: [
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
          "Deployed on Vercel with CI/CD"
        ],
        links: { github: "https://github.com/you/resume-builder", live: "https://resume.you.app" }
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
          "Added auth + rate limiting for public endpoints"
        ],
        links: { github: "", live: "https://stocks.client.app" }
      }
    ],

    skills: [
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
      { name: "Cypress", category: "Testing", level: 3 }
    ],

    education: [
      {
        degree: "B.Tech",
        field: "Computer Science",
        school: "Your University",
        city: "Mumbai",
        country: "India",
        start: "2019-08",
        end: "2023-05",
        gpa: "8.6/10",
        bullets: ["Data Structures & Algorithms", "Full‑Stack Web Development (MERN)"]
      }
    ]
  }
} as const;

export default function Preview({
  data = MOCK_RESUME,
  order = ["summary", "experience", "projects", "skills", "education"],
  hidden = {},
}: {
  data: any;
  order?: string[];
  hidden?: Record<string, boolean>;
}) {
  const contact = data?.sections?.contact || {};
  const name = [contact.firstName, contact.lastName].filter(Boolean).join(" ") || "Your Name";
  const role = contact.profession || "";

  const contactLine = [
    contact.email,
    contact.phone,
    locLine(contact.city, contact.country),
    stripHttp(contact.linkedin),
    stripHttp(contact.website),
  ].filter(Boolean).join("  ·  ");

  const sections: Record<string, JSX.Element | null> = {
    summary: data?.sections?.summary && !hidden.summary ? (
      <Section title="SUMMARY">
        <p>{data.sections.summary}</p>
      </Section>
    ) : null,

    experience: Array.isArray(data?.sections?.experience) && !hidden.experience ? (
      <Section title="EXPERIENCE">
        <div className="space-y-3">
          {data.sections.experience.map((e: any, i: number) => (
            <div key={i} className="break-inside-avoid">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">
                  {e.role || 'Role'}{e.company ? ` — ${e.company}` : ''}
                </div>
                <div className="text-[12px] text-gray-600">{dateRange(e)}</div>
              </div>
              <div className="text-[12px] text-gray-600">{[e.city, e.country].filter(Boolean).join(', ')}</div>
              {Array.isArray(e.bullets) && e.bullets.length ? (
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  {e.bullets.map((b: string, j: number) => <li key={j}>{b}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    ) : null,

    projects: Array.isArray(data?.sections?.projects) && !hidden.projects ? (
      <Section title="PROJECTS">
        <div className="space-y-3">
          {data.sections.projects.map((p: any, i: number) => (
            <div key={i} className="break-inside-avoid">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{p.title || 'Project'}{p.role ? ` — ${p.role}` : ''}</div>
                <div className="text-[12px] text-gray-600">{dateRange(p)}</div>
              </div>
              <div className="text-[12px] text-gray-600">{(p.tech||[]).join(', ')}</div>
              {Array.isArray(p.bullets) && p.bullets.length ? (
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  {p.bullets.map((b: string, j: number) => <li key={j}>{b}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    ) : null,

    skills: Array.isArray(data?.sections?.skills) && !hidden.skills ? (
      <Section title="SKILLS">
        <div className="space-y-1 text-[14px]">
          {groupBy((data.sections.skills||[]), 'category').map((g: any, i: number) => (
            <div key={i} className="break-inside-avoid">
              <div className="font-semibold text-[12px] text-gray-700">{g.key}</div>
              <div className="text-[13px]">{g.items.map((s: any)=>s.name).join(', ')}</div>
            </div>
          ))}
        </div>
      </Section>
    ) : null,

    education: Array.isArray(data?.sections?.education) && !hidden.education ? (
      <Section title="EDUCATION">
        <div className="space-y-2">
          {data.sections.education.map((ed: any, i: number) => (
            <div key={i} className="break-inside-avoid">
              <div className="flex items-baseline justify-between">
                <div className="font-semibold">{ed.degree || 'Degree'}{ed.field ? `, ${ed.field}` : ''} — {ed.school || 'University'}</div>
                <div className="text-[12px] text-gray-600">{dateRange(ed)}</div>
              </div>
              <div className="text-[12px] text-gray-600">{[ed.city, ed.country].filter(Boolean).join(', ')} {ed.gpa ? ` • GPA ${ed.gpa}` : ''}</div>
              {Array.isArray(ed.bullets) && ed.bullets.length ? (
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  {ed.bullets.map((b: string, j: number) => <li key={j}>{b}</li>)}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </Section>
    ) : null,
  };

  return (
    <div className="font-sans text-[14px] leading-[1.45] text-gray-900">
      {/* Header */}
      <div className="pb-3 border-b border-gray-400">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight">{name}</div>
            {role && <div className="text-[13px] text-gray-700">{role}</div>}
          </div>
          {/* Right‑aligned contact (still ATS safe text) */}
          {contactLine && (
            <div className="text-right text-[12px] text-gray-700" aria-label="contact">
              {contactLine.split("  ·  ").map((chunk, i) => <div key={i}>{chunk}</div>)}
            </div>
          )}
        </div>
      </div>

      {/* Body (always single column for ATS purity) */}
      <div className="mt-4 space-y-5">
        {order.filter(k=>!hidden[k]).map(k => sections[k]).filter(Boolean)}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section break-inside-avoid">
      <h3 className="text-[11px] font-semibold tracking-[0.14em] text-gray-700 uppercase border-b border-gray-200 pb-1">{title}</h3>
      <div className="mt-2 text-[14px]">{children}</div>
    </section>
  );
}

function dateRange(x: any) {
  const s = x?.start || ''; const e = x?.current ? 'Present' : (x?.end || '');
  return [s, e].filter(Boolean).join(' — ');
}

function groupBy(arr: any[], key: string) {
  const map: Record<string, any[]> = {};
  for (const it of arr || []) {
    const k = it?.[key] || 'General';
    (map[k] = map[k] || []).push(it);
  }
  return Object.keys(map).map(k => ({ key: k, items: map[k] }));
}

function stripHttp(u?: string) {
  if (!u) return ""; return u.replace(/^https?:\/\//, '');
}

function locLine(city?: string, country?: string) {
  if (!city && !country) return ""; return [city, country].filter(Boolean).join(', ');
}
