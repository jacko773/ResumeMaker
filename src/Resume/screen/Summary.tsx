import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
} from "lucide-react";
import axios from "axios";

/**
 * Builder — Section 6: Summary
 *
 * - Short professional summary (40–120 words) with tone presets
 * - Keyword checker (for ATS) and quick templates from your skills/experience
 * - Live preview; saves to resume.sections.summary (string)
 */
export default function Summary() {
  const nav = useNavigate();
  const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  const [summary, setSummary] = useState<string>("");
  const [tone, setTone] = useState<Tone>("Neutral");
  const [targetRole, setTargetRole] = useState<string>("");
  const [keywordsText, setKeywordsText] = useState<string>(""); // comma separated

  type Tone = "Neutral" | "Confident" | "Friendly" | "Technical";

  // Context for templates
  const [profession, setProfession] = useState<string>("");
  const [skills, setSkills] = useState<{ name: string; level?: number }[]>([]);
  const [bullets, setBullets] = useState<string[]>([]);
  const [yoe, setYoe] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        if (!resumeId) {
          setLoading(false);
          return;
        }
        const res = await axios.get(`/api/resumes/${resumeId}`, {
          withCredentials: true,
        });
        const r = res?.data?.item;
        const existing = r?.sections?.summary;
        if (typeof existing === "string") setSummary(existing);
        const contact = r?.sections?.contact || {};
        setProfession(contact.profession || "Software Engineer");
        const sk = r?.sections?.skills || [];
        if (Array.isArray(sk))
          setSkills(sk.map((s: any) => ({ name: s.name, level: s.level })));
        const exp = r?.sections?.experience || [];
        if (Array.isArray(exp)) {
          setBullets(exp.flatMap((e: any) => e.bullets || []).slice(0, 20));
          const years = estimateYears(exp);
          setYoe(years);
        }
      } catch {}
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function estimateYears(exp: any[]): number {
    // Very light estimate: min(start) → max(end or now)
    const now = new Date();
    const starts: number[] = [];
    const ends: number[] = [];
    for (const e of exp) {
      if (e.start && /^\d{4}-\d{2}$/.test(e.start))
        starts.push(+new Date(e.start + "-01"));
      if (e.current) ends.push(+now);
      else if (e.end && /^\d{4}-\d{2}$/.test(e.end))
        ends.push(+new Date(e.end + "-01"));
    }
    if (!starts.length) return 0;
    const minStart = Math.min(...starts);
    const maxEnd = ends.length ? Math.max(...ends) : +now;
    const years = (maxEnd - minStart) / (365.25 * 24 * 3600 * 1000);
    return Math.max(0, Math.round(years * 10) / 10);
  }

  function useTemplate(t: Tone) {
    setTone(t);
    const top = skills
      .sort((a, b) => (b.level || 0) - (a.level || 0))
      .map((s) => s.name)
      .slice(0, 5);
    const text = buildTemplate({
      tone: t,
      profession,
      yoe,
      targetRole: targetRole || profession,
      topSkills: top,
    });
    setSummary(text);
  }

  function addBulletSentence(b: string) {
    const s = summarizeBullet(b);
    setSummary((v) =>
      v ? v.replace(/\s*$/, "") + (v.trim().endsWith(".") ? " " : ". ") + s : s
    );
  }

  function summarizeBullet(b: string) {
    // Naive cleanup → sentence
    let s = b.trim();
    s = s.replace(/^[-•\s]+/, "");
    // Capitalize first letter and ensure trailing period
    s = s.charAt(0).toUpperCase() + s.slice(1);
    if (!/[.!?]$/.test(s)) s += ".";
    return s;
  }

  async function saveAndNext() {
    if (!resumeId) return;
    setSaving(true);
    setError("");
    try {
      await axios.patch(
        `/api/resumes/${resumeId}`,
        { sections: { summary } },
        { withCredentials: true }
      );
      nav("/builder/preview");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  const words = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const targets = (keywordsText || "")
    .split(/,|\n/)
    .map((x) => x.trim())
    .filter(Boolean);
  const missing = targets.filter(
    (k) =>
      !new RegExp("(^|\\W)" + escapeRegExp(k) + "(\\W|$)", "i").test(summary)
  );

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-3 gap-10">
        {/* Editor */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">
            Craft your professional summary
          </h1>
          <p className="text-gray-600 mt-1">
            Keep it concise (ideally 40–120 words). Highlight scope, stack, and
            measurable wins.
          </p>

          {/* Tone presets + template */}
          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm font-semibold">Tone presets</div>
              <div className="flex flex-wrap gap-2">
                {(
                  ["Neutral", "Confident", "Friendly", "Technical"] as Tone[]
                ).map((t) => (
                  <button
                    key={t}
                    onClick={() => useTemplate(t)}
                    type="button"
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      tone === t
                        ? "bg-sky-50 border-sky-200 text-sky-800"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Sparkles className="inline h-3.5 w-3.5 mr-1 text-sky-600" />{" "}
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 grid md:grid-cols-[1fr,240px] gap-3 items-end">
              <label className="block">
                <div className="text-sm font-medium text-gray-700">
                  Target role (optional)
                </div>
                <input
                  className="mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior MERN Developer"
                />
              </label>
              <div className="text-xs text-gray-500">
                Uses your skills ({skills.length}) and experience (~{yoe || 0}{" "}
                yrs) to seed template.
              </div>
            </div>
          </div>

          {/* Summary box */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Summary
              </label>
              <div
                className={`text-xs ${
                  words < 40 || words > 120
                    ? "text-amber-700"
                    : "text-emerald-700"
                }`}
              >
                {words} words{" "}
                {words < 40
                  ? "(aim 40+)"
                  : words > 120
                  ? "(trim to ≤120)"
                  : "✓ good"}
              </div>
            </div>
            <textarea
              className="mt-1 w-full min-h-[160px] rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
              placeholder={`E.g., MERN developer with ${
                yoe || ""
              }+ years building scalable web apps. Notable strengths: ${skills
                .slice(0, 3)
                .map((s) => s.name)
                .join(", ")}. Delivered XYZ impact...`}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="mt-1 text-[11px] text-gray-500">
              Tip: Start with role + scope, add 2–3 strengths, end with a
              tangible result.
            </div>
          </div>

          {/* Keyword checker */}
          <div className="mt-4 rounded-2xl border bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Target className="h-4 w-4" /> ATS keyword checker
            </div>
            <div className="mt-2 grid md:grid-cols-[1fr,auto] gap-3 items-start">
              <input
                className="rounded-lg border px-3 py-2 text-sm"
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                placeholder="Paste target keywords (comma separated): React, Express, MongoDB, AWS"
              />
              <div className="text-xs text-gray-500">
                We’ll flag what’s missing below.
              </div>
            </div>
            {!!targets.length && (
              <div className="mt-2 flex flex-wrap gap-2">
                {targets.map((k) => (
                  <span
                    key={k}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] ${
                      missing.includes(k)
                        ? "bg-white text-gray-700"
                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    }`}
                  >
                    {missing.includes(k) ? "○" : "✓"} {k}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Import from work bullets */}
          {bullets.length ? (
            <div className="mt-4 rounded-2xl border bg-white p-4">
              <div className="text-sm font-semibold mb-2">
                Quick add from your work history
              </div>
              <div className="grid sm:grid-cols-2 gap-2 max-h-56 overflow-auto">
                {bullets.slice(0, 12).map((b, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => addBulletSentence(b)}
                    className="text-left rounded-xl border px-3 py-2 text-xs hover:bg-gray-50"
                  >
                    + {b}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>

        {/* Preview */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold">Live preview</div>
            <div className="mt-3 rounded-xl border bg-gradient-to-br from-gray-50 to-white p-3 text-sm text-gray-800 leading-relaxed">
              {summary || (
                <span className="text-gray-500">
                  Your summary will appear here.
                </span>
              )}
            </div>
            {targets.length ? (
              <div className="mt-3 text-[11px] text-gray-600">
                Missing keywords:{" "}
                {missing.length ? missing.join(", ") : "None — great!"}
              </div>
            ) : null}
          </div>
        </aside>
      </section>

      {/* Bottom actions */}
      <div className="border-t bg-white sticky bottom-0">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={() => nav("/builder/projects")}
            className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Back: Projects
          </button>
          <button
            disabled={saving}
            onClick={saveAndNext}
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-70"
          >
            Next: Preview <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function buildTemplate({
  tone,
  profession,
  yoe,
  topSkills,
  targetRole,
}: {
  tone: "Neutral" | "Confident" | "Friendly" | "Technical";
  profession: string;
  yoe: number;
  topSkills: string[];
  targetRole: string;
}) {
  const skillList = topSkills.join(", ");
  const yrs = yoe ? `${yoe}+ years` : "hands‑on";
  const base = {
    Neutral: `${profession} with ${yrs} of experience building web applications. Strengths in ${skillList}. Focused on writing maintainable code, collaborating across teams, and delivering measurable impact aligned with business goals. Seeking ${targetRole} opportunities to solve real customer problems.`,
    Confident: `${profession} with ${yrs} delivering scalable products end‑to‑end. Expert in ${skillList}. I turn ambiguous requirements into performant, well‑tested features and drive outcomes across frontend, backend, and DX. Looking for a ${targetRole} role to raise the bar for quality and speed.`,
    Friendly: `${profession} with ${yrs} crafting user‑centric features. Comfortable across the stack with ${skillList}. I enjoy collaborating with designers and PMs, simplifying complex problems, and helping teams ship with confidence. Exploring ${targetRole} roles where I can contribute and keep learning.`,
    Technical: `${profession} with ${yrs} across distributed web systems. Deep experience in ${skillList}. Strong focus on performance, reliability, testing, and observability. Pragmatic about trade‑offs; fluent in CI/CD and modern tooling. Targeting ${targetRole} roles on high‑impact teams.`,
  } as const;
  return base[tone];
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
