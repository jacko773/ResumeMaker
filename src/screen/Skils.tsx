import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Trash2, MoveUp, MoveDown, Sparkles, Search, Stars } from "lucide-react";
import axios from "axios";
import Footer from "./Footer";

/**
 * Builder — Section 4: Skills
 *
 * - Add skills with category + proficiency (1–5)
 * - Quick add from suggestions (MERN‑focused) and CSV import
 * - Reorder/remove + live preview grouped by category
 * - Saves to resume.sections.skills[]
 */
export default function Skills() {
  const nav = useNavigate();
  const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  type Skill = { name: string; category: string; level: number };

  const [items, setItems] = useState<Skill[]>([
    { name: "JavaScript", category: "Programming", level: 4 },
    { name: "React", category: "Frontend", level: 4 },
    { name: "Node.js", category: "Backend", level: 4 },
    { name: "MongoDB", category: "Databases", level: 3 },
  ]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        if (!resumeId) { setLoading(false); return; }
        const res = await axios.get(`/api/resumes/${resumeId}`, { withCredentials: true });
        const skills = res?.data?.item?.sections?.skills;
        if (Array.isArray(skills) && skills.length) setItems(skills);
      } catch {}
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addEmpty() {
    setItems([...items, { name: "", category: "Programming", level: 3 }]);
  }
  function remove(i: number) {
    const next = [...items]; next.splice(i, 1); setItems(next.length ? next : [{ name: "", category: "Programming", level: 3 }]);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= items.length) return; const next = [...items]; const t = next[i]; next[i] = next[j]; next[j] = t; setItems(next);
  }
  function update(i: number, patch: Partial<Skill>) {
    const next = [...items]; next[i] = { ...next[i], ...patch }; setItems(next);
  }

  function upsertSkill(name: string, category = guessCategory(name), level = 3) {
    name = name.trim(); if (!name) return;
    const idx = items.findIndex(s => s.name.toLowerCase() === name.toLowerCase());
    if (idx >= 0) update(idx, { level: Math.max(items[idx].level, level), category });
    else setItems([...items, { name, category, level }]);
  }

  async function saveAndNext() {
    // if (!resumeId) return;
    // setSaving(true); setError("");
    try {
      // const payload = { sections: { skills: items } };
      // await axios.patch(`/api/resumes/${resumeId}`, payload, { withCredentials: true });
      nav("/builder/projects");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not save. Please try again.");
    } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="min-h-screen bg-white">

      <section className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-3 gap-10">
        {/* Editor */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">Add your skills</h1>
          <p className="text-gray-600 mt-1">Show your strongest technologies and tools. Recruiters scan this section first.</p>

          {/* Suggestions */}
          <SuggestionPanel onAdd={upsertSkill} />

          {/* Manual list */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-semibold">Your skills</div>
              <button type="button" onClick={addEmpty} className="inline-flex items-center gap-2 rounded-2xl border px-3 py-1.5 text-sm hover:bg-gray-50">
                <Plus className="h-4 w-4"/> Add skill
              </button>
            </div>
            <div className="space-y-3">
              {items.map((s, i) => (
                <div key={i} className="rounded-2xl border bg-white p-3">
                  <div className="grid md:grid-cols-[1fr,160px,160px,auto] gap-3 items-center">
                    <input className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200" placeholder="Skill (e.g., React, Express)" value={s.name} onChange={(e)=>update(i,{ name: e.target.value })} />
                    <CategorySelect value={s.category} onChange={(v)=>update(i,{ category: v })} />
                    <LevelSlider value={s.level} onChange={(v)=>update(i,{ level: v })} />
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,-1)}><MoveUp className="h-4 w-4"/></button>
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,1)}><MoveDown className="h-4 w-4"/></button>
                      <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>remove(i)}><Trash2 className="h-4 w-4"/></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
          </div>
        </div>

        {/* Preview */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold">Live preview</div>
            <SkillPreview items={items} />
          </div>
        </aside>
      </section>

      {/* Bottom actions */}
      {/* <div className="border-t bg-white sticky bottom-0">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button onClick={()=>nav('/builder/education')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4"/> Back: Education
          </button>
          <button disabled={saving} onClick={saveAndNext} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-70">
            Next: Projects <ArrowRight className="h-4 w-4"/>
          </button>
        </div>
      </div> */}
      <Footer nextSectionName="Projects" prevSectionName="Education" prevSection={() => nav("/builder/education")} nextSection={saveAndNext} saving={false} />
    </div>
  );
}

const CATEGORIES = [
  "Programming",
  "Frontend",
  "Backend",
  "Frameworks",
  "Databases",
  "DevOps",
  "Cloud",
  "Testing",
  "Tools",
  "Soft Skills",
];

const SUGGESTED: Record<string, string[]> = {
  Programming: ["JavaScript", "TypeScript", "Python"],
  Frontend: ["React", "Next.js", "Redux", "Tailwind CSS", "HTML", "CSS"],
  Backend: ["Node.js", "Express", "REST APIs", "GraphQL"],
  Frameworks: ["Mongoose", "Jest", "Cypress"],
  Databases: ["MongoDB", "PostgreSQL", "Redis"],
  DevOps: ["Docker", "CI/CD", "Git", "Nginx"],
  Cloud: ["AWS", "Vercel", "Netlify"],
  Testing: ["Jest", "Cypress", "Playwright"],
  Tools: ["GitHub", "Postman", "ESLint", "Prettier"],
  "Soft Skills": ["Communication", "Ownership", "Mentoring", "Collaboration"],
};

function guessCategory(name: string): string {
  const n = name.toLowerCase();
  if (/react|next|redux|tailwind|html|css/.test(n)) return "Frontend";
  if (/node|express|graphql|rest/.test(n)) return "Backend";
  if (/mongo|postgres|redis|mysql/.test(n)) return "Databases";
  if (/docker|k8|ci|cd|nginx/.test(n)) return "DevOps";
  if (/aws|gcp|azure|vercel|netlify/.test(n)) return "Cloud";
  if (/jest|cypress|playwright|testing/.test(n)) return "Testing";
  if (/git|postman|eslint|prettier|vscode/.test(n)) return "Tools";
  if (/communication|leadership|ownership|collaboration|mentoring/.test(n)) return "Soft Skills";
  return "Programming";
}

function CategorySelect({ value, onChange }: { value: string; onChange: (v:string)=>void }) {
  return (
    <select className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200" value={value} onChange={(e)=>onChange(e.target.value)}>
      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}

function LevelSlider({ value, onChange }: { value: number; onChange: (v:number)=>void }) {
  return (
    <div className="grid grid-cols-[1fr,44px] items-center gap-2">
      <input type="range" min={1} max={5} value={value} onChange={(e)=>onChange(parseInt(e.target.value))} className="w-full" />
      <div className="text-xs text-gray-700 rounded-md border px-2 py-1 text-center">{value}/5</div>
    </div>
  );
}

function SuggestionPanel({ onAdd }: { onAdd: (name: string, category?: string, level?: number)=>void }) {
  const [q, setQ] = useState("");
  const [csv, setCsv] = useState("");
  const keys = Object.keys(SUGGESTED) as (keyof typeof SUGGESTED)[];
  const list = keys.flatMap(k => SUGGESTED[k].map(n => ({ name: n, category: k })));

  const filtered = list.filter(x => x.name.toLowerCase().includes(q.toLowerCase()) || x.category.toLowerCase().includes(q.toLowerCase()));

  function importCsv() {
    const parts = csv.split(/,|\n/).map(s => s.trim()).filter(Boolean);
    parts.forEach(s => onAdd(s));
    setCsv("");
  }

  return (
    <div className="mt-5 rounded-2xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold"><Sparkles className="h-4 w-4 text-sky-600"/> Quick add from suggestions</div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"/>
          <input className="w-64 rounded-lg border pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-sky-200" placeholder="Search skills or category" value={q} onChange={(e)=>setQ(e.target.value)} />
        </div>
      </div>

      <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.slice(0, 21).map((s, i) => (
          <button key={i} type="button" onClick={()=>onAdd(s.name, s.category)} className="rounded-xl border p-3 text-left hover:bg-gray-50">
            <div className="text-sm font-medium">{s.name}</div>
            <div className="text-[11px] text-gray-500">{s.category}</div>
          </button>
        ))}
      </div>

      <div className="mt-4 grid md:grid-cols-[1fr,auto] gap-3">
        <input className="rounded-lg border px-3 py-2 text-sm" value={csv} onChange={(e)=>setCsv(e.target.value)} placeholder="Or paste comma‑separated skills: React, Node.js, MongoDB" />
        <button onClick={importCsv} className="rounded-2xl border px-3 py-2 text-sm hover:bg-gray-50">Import</button>
      </div>
    </div>
  );
}

function SkillPreview({ items }: { items: { name: string; category: string; level: number }[] }) {
  const grouped = items.reduce<Record<string, { name: string; level: number }[]>>((acc, s) => {
    acc[s.category] = acc[s.category] || []; acc[s.category].push({ name: s.name, level: s.level }); return acc;
  }, {});
  const cats = Object.keys(grouped).sort((a,b)=>a.localeCompare(b));
  return (
    <div className="mt-3 space-y-4">
      {cats.map(c => (
        <div key={c} className="rounded-xl border p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">{c}</div>
          <div className="space-y-2">
            {grouped[c].sort((a,b)=>b.level-a.level).map((s, i) => (
              <div key={i} className="grid grid-cols-[1fr,90px] gap-3 items-center text-sm">
                <div className="truncate">{s.name}</div>
                <Bar n={s.level} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Bar({ n }: { n: number }) {
  const pct = Math.min(100, Math.max(0, (n/5)*100));
  return (
    <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
      <div className="h-full bg-sky-500" style={{ width: pct + '%' }} />
    </div>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-3 overflow-x-auto py-1">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${i === current ? 'bg-sky-50 border-sky-200 text-sky-800' : 'bg-white text-gray-600'}`}>
            {i < current ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600"/>
            ) : (
              <span className={`h-2 w-2 rounded-full ${i===current?'bg-sky-600':'bg-gray-300'}`}></span>
            )}
            <span className="whitespace-nowrap">{s}</span>
          </div>
          {i !== steps.length - 1 && <div className="h-px w-6 bg-gray-200" />}
        </div>
      ))}
    </div>
  );
}
