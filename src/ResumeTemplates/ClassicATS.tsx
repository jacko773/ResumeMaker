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

export function ClassicATS({
  order = [],
  hidden = {},
  data = {},
  defaultData = {},
}: {
  order?: string[];
  hidden?: Record<string, boolean>;
  data?: any;
  defaultData?: any;
}) {
  const contact = data?.sections?.contact || {};
  const name =
    [contact.firstName, contact.lastName].filter(Boolean).join(" ") ||
    "Your Name";
  const role = contact.profession || defaultData.profession;

  const contactLine = [
    contact.email,
    contact.phone,
    locLine(contact.city, contact.country),
    stripHttp(contact.linkedin),
    stripHttp(contact.website),
  ]
    .filter(Boolean)
    .join("  ·  ");

  const sections: Record<string, any | null> = {
    summary:
      data?.sections?.summary && !hidden.summary ? (
        <Section title="SUMMARY">
          <p>{data.sections.summary}</p>
        </Section>
      ) : null,

    experience:
      Array.isArray(data?.sections?.workHistory) && !hidden.workHistory ? (
        <Section title="EXPERIENCE">
          <div className="space-y-3">
            {data.sections.workHistory.map((e: any, i: number) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">
                    {e.role || "Role"}
                    {e.company ? ` — ${e.company}` : ""}
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {dateRange(e)}
                  </div>
                </div>
                <div className="text-[12px] text-gray-600">
                  {[e.city, e.country].filter(Boolean).join(", ")}
                </div>
                {Array.isArray(e.bullets) && e.bullets.length ? (
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    {e.bullets.map((b: string, j: number) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null,

    projects:
      Array.isArray(data?.sections?.projects) && !hidden.projects ? (
        <Section title="PROJECTS">
          <div className="space-y-3">
            {data.sections.projects.map((p: any, i: number) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">
                    {p.title || "Project"}
                    {p.role ? ` — ${p.role}` : ""}
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {dateRange(p)}
                  </div>
                </div>
                <div className="text-[12px] text-gray-600">
                  {(p.tech || []).join(", ")}
                </div>
                {Array.isArray(p.bullets) && p.bullets.length ? (
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    {p.bullets.map((b: string, j: number) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null,

    skills:
      Array.isArray(data?.sections?.skills) && !hidden.skills ? (
        <Section title="SKILLS">
          <div className="space-y-1 text-[14px]">
            {groupBy(data.sections.skills || [], "category").map(
              (g: any, i: number) => (
                <div key={i} className="break-inside-avoid">
                  <div className="font-semibold text-[12px] text-gray-700">
                    {g.key}
                  </div>
                  <div className="text-[13px]">
                    {g.items.map((s: any) => s.name).join(", ")}
                  </div>
                </div>
              )
            )}
          </div>
        </Section>
      ) : null,

    education:
      Array.isArray(data?.sections?.education) && !hidden.education ? (
        <Section title="EDUCATION">
          <div className="space-y-2">
            {data.sections.education.map((ed: any, i: number) => (
              <div key={i} className="break-inside-avoid">
                <div className="flex items-baseline justify-between">
                  <div className="font-semibold">
                    {ed.degree || "Degree"}
                    {ed.field ? `, ${ed.field}` : ""} —{" "}
                    {ed.school || "University"}
                  </div>
                  <div className="text-[12px] text-gray-600">
                    {dateRange(ed)}
                  </div>
                </div>
                <div className="text-[12px] text-gray-600">
                  {[ed.city, ed.country].filter(Boolean).join(", ")}{" "}
                  {ed.gpa ? ` • GPA ${ed.gpa}` : ""}
                </div>
                {Array.isArray(ed.bullets) && ed.bullets.length ? (
                  <ul className="mt-1 list-disc pl-5 space-y-1">
                    {ed.bullets.map((b: string, j: number) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </Section>
      ) : null,
  };

  return (
    <div className="font-sans text-[14px] leading-[1.45] text-gray-900 h-[297mm] w-[210mm] shadow-lg z-30 p-3">
      {/* Header */}
      <div className="pb-3 border-b border-gray-400">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-bold tracking-tight">{name}</div>
            {role && <div className="text-[13px] text-gray-700">{role}</div>}
          </div>
          {/* Right‑aligned contact (still ATS safe text) */}
          {contactLine && (
            <div
              className="text-right text-[12px] text-gray-700"
              aria-label="contact"
            >
              {contactLine.split("  ·  ").map((chunk, i) => (
                <div key={i}>{chunk}</div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body (always single column for ATS purity) */}
      <div className="mt-4 space-y-5">
        {order
          .filter((k) => !hidden[k])
          .map((k) => sections[k])
          .filter(Boolean)}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section break-inside-avoid">
      <h3 className="text-[11px] font-semibold tracking-[0.14em] text-gray-700 uppercase border-b border-gray-200 pb-1">
        {title}
      </h3>
      <div className="mt-2 text-[14px]">{children}</div>
    </section>
  );
}

function dateRange(x: any) {
  const s = x?.start || "";
  const e = x?.current ? "Present" : x?.end || "";
  return [s, e].filter(Boolean).join(" — ");
}

function groupBy(arr: any[], key: string) {
  const map: Record<string, any[]> = {};
  for (const it of arr || []) {
    const k = it?.[key] || "General";
    (map[k] = map[k] || []).push(it);
  }
  return Object.keys(map).map((k) => ({ key: k, items: map[k] }));
}

function stripHttp(u?: string) {
  if (!u) return "";
  return u.replace(/^https?:\/\//, "");
}

function locLine(city?: string, country?: string) {
  if (!city && !country) return "";
  return [city, country].filter(Boolean).join(", ");
}
