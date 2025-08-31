import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Trash2, MoveUp, MoveDown, Github, Link2, FolderGit2, Sparkles } from "lucide-react";
import axios from "axios";
import Footer from "./Footer";

/**
 * Builder — Section 5: Projects
 *
 * - Add portfolio projects with title, role, type, dates, tech, links, bullets
 * - Reorder/remove + live preview
 * - Saves to resume.sections.projects[]
 */
export default function Projects() {
  const nav = useNavigate();
  const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  type Project = {
    title: string;
    role?: string;            // e.g., Full‑stack Developer
    organization?: string;    // e.g., Client / Company (optional)
    type?: 'Personal' | 'Client' | 'Open Source';
    start?: string;           // YYYY‑MM
    end?: string;             // YYYY‑MM
    current?: boolean;
    tech?: string[];          // tags
    links?: { github?: string; live?: string };
    bullets: string[];        // highlights / responsibilities / impact
  };

  const [items, setItems] = useState<Project[]>([
    {
      title: "MERN Resume Builder",
      role: "Full‑stack Developer",
      type: 'Personal',
      start: "2024-06",
      current: true,
      tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
      links: { github: "", live: "" },
      bullets: [
        "Generated ATS‑friendly resumes with live preview",
        "Implemented schema‑driven sections and autosave",
        "Deployed on Vercel with CI/CD",
      ],
    },
  ]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        if (!resumeId) { setLoading(false); return; }
        const res = await axios.get(`/api/resumes/${resumeId}`, { withCredentials: true });
        const projects = res?.data?.item?.sections?.projects;
        if (Array.isArray(projects) && projects.length) setItems(projects);
      } catch {}
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(i: number, patch: Partial<Project>) {
    const next = [...items];
    const prev = next[i] || {} as Project;
    next[i] = { ...prev, ...patch } as Project;
    if (patch.current) next[i].end = undefined;
    setItems(next);
  }
  function remove(i: number) {
    const next = [...items]; next.splice(i, 1);
    setItems(next.length ? next : [{ title: "", bullets: [] } as Project]);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir; if (j < 0 || j >= items.length) return;
    const next = [...items]; const t = next[i]; next[i] = next[j]; next[j] = t; setItems(next);
  }
  function addEmpty() { setItems([...items, { title: "", bullets: [] } as Project]); }

  async function saveAndNext() {
    // if (!resumeId) return;
    // setSaving(true); setError("");
    try {
      // await axios.patch(`/api/resumes/${resumeId}`, { sections: { projects: items } }, { withCredentials: true });
      nav("/builder/summary");
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
          <h1 className="text-3xl font-bold">Add your projects</h1>
          <p className="text-gray-600 mt-1">Showcase real impact, tech used, and links to code or a live demo.</p>

          <div className="mt-6 space-y-5">
            {items.map((p, i) => (
              <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">Project #{i+1} {isValid(p) && <CheckCircle2 className="inline h-4 w-4 text-emerald-600 ml-1"/>}</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,-1)}><MoveUp className="h-4 w-4"/></button>
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,1)}><MoveDown className="h-4 w-4"/></button>
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>remove(i)}><Trash2 className="h-4 w-4"/></button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Project Title *" value={p.title} onChange={(v)=>update(i,{ title: v })} placeholder="e.g., Stock Analysis SaaS" />
                  <Field label="Role" value={p.role || ''} onChange={(v)=>update(i,{ role: v })} placeholder="e.g., Full‑stack Developer" />
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-4 items-end">
                  <Select label="Type" value={p.type || 'Personal'} onChange={(v)=>update(i,{ type: v as Project['type'] })} options={["Personal","Client","Open Source"]} />
                  <MonthInput label="Start" value={p.start || ''} onChange={(v)=>update(i,{ start: v })} />
                  <MonthInput label="End" value={p.current ? '' : (p.end || '')} onChange={(v)=>update(i,{ end: v, current: false })} disabled={p.current} />
                  <label className="inline-flex items-center gap-2 text-sm col-span-full">
                    <input type="checkbox" checked={!!p.current} onChange={(ev)=>update(i,{ current: ev.target.checked })} />
                    Ongoing project
                  </label>
                </div>

                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <Field icon={<Github className="h-4 w-4"/>} label="GitHub" value={p.links?.github || ''} onChange={(v)=>update(i,{ links: { ...(p.links||{}), github: v } })} placeholder="https://github.com/username/repo" />
                  <Field icon={<Link2 className="h-4 w-4"/>} label="Live URL" value={p.links?.live || ''} onChange={(v)=>update(i,{ links: { ...(p.links||{}), live: v } })} placeholder="https://yourapp.com" />
                </div>

                <div className="mt-3">
                  <TagsInput label="Tech (comma to add)" value={p.tech || []} onChange={(v)=>update(i,{ tech: v })} placeholder="React, Node.js, MongoDB" />
                </div>

                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700">Highlights / responsibilities</label>
                  <Bullets value={p.bullets} onChange={(v)=>update(i,{ bullets: v })} placeholder="e.g., Designed REST APIs; Improved LCP by 35%; Added role‑based access" />
                </div>

                {/* Quick templates */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <QuickChip onClick={()=>appendBullet(i, "Reduced page load time by 30% by optimizing asset pipeline")} />
                  <QuickChip onClick={()=>appendBullet(i, "Designed and implemented JWT auth with role‑based access")} />
                  <QuickChip onClick={()=>appendBullet(i, "Shipped CI/CD pipeline (build, test, deploy) on Vercel")} />
                </div>
              </div>
            ))}

            <button type="button" onClick={addEmpty} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50">
              <Plus className="h-4 w-4"/> Add another project
            </button>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        </div>

        {/* Preview */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold">Live preview</div>
            <div className="mt-3 space-y-4">
              {items.map((p, i) => <PreviewProject key={i} p={p} />)}
            </div>
          </div>
        </aside>
      </section>

      {/* Bottom actions */}
      {/* <div className="border-t bg-white sticky bottom-0">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button onClick={()=>nav('/builder/skills')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4"/> Back: Skills
          </button>
          <button disabled={saving} onClick={saveAndNext} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-70">
            Next: Summary <ArrowRight className="h-4 w-4"/>
          </button>
        </div>
      </div> */}
      <Footer nextSectionName="Summary" prevSectionName="Skills" prevSection={() => nav("/builder/skills")} nextSection={saveAndNext} saving={false} />
    </div>
  );
}

function isValid(p: any) {
  return (p.title || '').trim().length > 1;
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

function Field({ label, value, onChange, placeholder, icon }: { label: string; value: string; onChange: (v:string)=>void; placeholder?: string; icon?: any }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700 flex items-center gap-2">{icon}{label}</div>
      <input className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} />
    </label>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v:string)=>void; options: string[] }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <select className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" value={value} onChange={(e)=>onChange(e.target.value)}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function MonthInput({ label, value, onChange, disabled }: { label: string; value: string; onChange: (v:string)=>void; disabled?: boolean }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <input type="month" className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50" value={value} onChange={(e)=>onChange(e.target.value)} disabled={disabled} />
    </label>
  );
}

function Bullets({ value, onChange, placeholder }: { value: string[]; onChange: (v:string[])=>void; placeholder?: string }) {
  const [text, setText] = useState((value || []).join("\n"));
  useEffect(()=>{ setText((value || []).join("\n")); }, [value]);
  function normalize(s: string) { return s.split(/\n+/).map(x => x.trim()).filter(Boolean); }
  return (
    <div className="mt-1">
      <textarea className="w-full min-h-[120px] rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" placeholder={placeholder || "Use one line per bullet"} value={text} onChange={(e)=>{ setText(e.target.value); onChange(normalize(e.target.value)); }} />
      <div className="mt-1 text-xs text-gray-500">Tip: Start with action + metric. E.g., "Improved conversion by 18%".</div>
    </div>
  );
}

function TagsInput({ label, value, onChange, placeholder }: { label: string; value: string[]; onChange: (v:string[])=>void; placeholder?: string }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>(value || []);
  useEffect(()=>{ setTags(value || []); }, [value]);

  function add(tag: string) {
    tag = tag.trim();
    if (!tag) return;
    const next = Array.from(new Set([...tags, tag]));
    setTags(next); onChange(next);
    setText("");
  }
  function remove(tag: string) {
    const next = tags.filter(t => t !== tag); setTags(next); onChange(next);
  }
  function onKey(e: any) {
    if (e.key === ',' || e.key === 'Enter') { e.preventDefault(); add(text); }
  }

  return (
    <div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="mt-1 rounded-lg border p-2">
        <div className="flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs">
              <FolderGit2 className="h-3.5 w-3.5"/> {t}
              <button type="button" className="ml-1 text-gray-500 hover:text-gray-900" onClick={()=>remove(t)}>×</button>
            </span>
          ))}
        </div>
        <input className="mt-2 w-full px-2 py-1 text-sm outline-none" placeholder={placeholder || 'React, Node.js, MongoDB'} value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={onKey} />
      </div>
    </div>
  );
}

function QuickChip({ onClick }: { onClick: ()=>void }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs hover:bg-gray-50">
      <Sparkles className="h-3.5 w-3.5 text-sky-600"/> Add template bullet
    </button>
  );
}

function appendBullet(i: number, text: string) {
  // stub — will be replaced by local closure call inside component via update()
}

function PreviewProject({ p }: { p: any }) {
  const range = p.start ? `${p.start}${p.current ? ' — Present' : (p.end ? ` — ${p.end}` : '')}` : '';
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold leading-tight">{p.title || 'Project Title'}</div>
          <div className="text-xs text-gray-600">
            {(p.role || 'Contributor')}{p.type ? ` • ${p.type}` : ''}
            {p.tech?.length ? ` • ${p.tech.join(', ')}` : ''}
          </div>
        </div>
        <div className="text-[11px] text-gray-500">{range}</div>
      </div>
      {p.bullets?.length ? (
        <ul className="mt-2 list-disc pl-5 text-[13px] text-gray-700 space-y-1">
          {p.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
        </ul>
      ) : (
        <div className="mt-2 text-xs text-gray-500">Add 2–5 highlights that show impact.</div>
      )}
      {(p.links?.github || p.links?.live) && (
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-sky-700">
          {p.links.github && <a href={p.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Github className="h-3.5 w-3.5"/> GitHub</a>}
          {p.links.live && <a href={p.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Link2 className="h-3.5 w-3.5"/> Live</a>}
        </div>
      )}
    </div>
  );
}
