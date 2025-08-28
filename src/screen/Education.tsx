import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, Plus, Trash2, MoveUp, MoveDown, GraduationCap } from "lucide-react";
import axios from "axios";
import Footer from "./Footer";

/**
 * Builder — Section 3: Education
 *
 * - Manage a list of education entries (degree, field, school, location, dates, GPA)
 * - Optional highlights/coursework as bullets
 * - Reorder/remove with live preview
 * - Saves to resume.sections.education[]
 */
export default function Education() {
  const nav = useNavigate();
  const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  type Entry = {
    degree: string;        // e.g., B.Tech, BSc, MSc
    field?: string;        // e.g., Computer Science
    school: string;        // e.g., IIT Bombay
    city?: string;
    country?: string;
    start?: string;        // YYYY-MM
    end?: string;          // YYYY-MM
    current?: boolean;     // currently studying
    gpa?: string;          // e.g., 8.6/10 or 3.7/4.0
    bullets: string[];     // coursework/highlights
  };

  const [items, setItems] = useState<Entry[]>([
    { degree: "B.Tech", field: "Computer Science", school: "Your University", city: "Mumbai", country: "India", start: "2019-08", end: "2023-05", bullets: ["Data Structures & Algorithms","Full‑Stack Web Development (MERN)"] }
  ]);

  useEffect(() => {
    (async () => {
      try {
        if (!resumeId) { setLoading(false); return; }
        const res = await axios.get(`/api/resumes/${resumeId}`, { withCredentials: true });
        const edu = res?.data?.item?.sections?.education;
        if (Array.isArray(edu) && edu.length) {
          setItems(edu);
        }
      } catch {}
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function update(i: number, patch: Partial<Entry>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    if (patch.current) next[i].end = undefined;
    setItems(next);
  }

  function remove(i: number) {
    const next = [...items];
    next.splice(i, 1);
    setItems(next.length ? next : [{ degree: "", school: "", bullets: [] } as Entry]);
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const tmp = next[i]; next[i] = next[j]; next[j] = tmp;
    setItems(next);
  }

  function add() {
    setItems([...items, { degree: "", school: "", bullets: [] } as Entry]);
  }

  function isValid(e: Entry) {
    const base = e.degree.trim().length > 1 && e.school.trim().length > 1;
    const datesOk = !e.start || e.current || !e.end || (e.start <= (e.end || ""));
    return base && datesOk;
  }

  async function saveAndNext() {
    // if (!resumeId) return;
    setSaving(true); setError("");
    try {
      // const payload = { sections: { education: items } };
      // await axios.patch(`/api/resumes/${resumeId}`, payload, { withCredentials: true });
      nav("/builder/skills");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="min-h-screen bg-white">

      {/* Form + Preview */}
      <section className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">Add your education</h1>
          <p className="text-gray-600 mt-1">Include degrees, relevant coursework, and academic achievements.</p>

          <div className="mt-6 space-y-5">
            {items.map((e, i) => (
              <div key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold flex items-center gap-2"><GraduationCap className="h-4 w-4"/> Education #{i+1} {isValid(e) && <CheckCircle2 className="inline h-4 w-4 text-emerald-600 ml-1"/>}</div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,-1)}><MoveUp className="h-4 w-4"/></button>
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>move(i,1)}><MoveDown className="h-4 w-4"/></button>
                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50" onClick={()=>remove(i)}><Trash2 className="h-4 w-4"/></button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Degree *" value={e.degree} onChange={(v)=>update(i,{ degree: v })} placeholder="e.g., B.Tech / BSc / MSc" />
                  <Field label="Field of Study" value={e.field || ""} onChange={(v)=>update(i,{ field: v })} placeholder="e.g., Computer Science" />
                </div>

                <div className="mt-3 grid md:grid-cols-2 gap-4">
                  <Field label="School / University *" value={e.school} onChange={(v)=>update(i,{ school: v })} placeholder="e.g., IIT Bombay" />
                  <Field label="GPA (optional)" value={e.gpa || ""} onChange={(v)=>update(i,{ gpa: v })} placeholder="e.g., 8.6/10 or 3.7/4.0" />
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-4">
                  <Field label="City" value={e.city || ""} onChange={(v)=>update(i,{ city: v })} placeholder="e.g., Mumbai" />
                  <Field label="Country" value={e.country || ""} onChange={(v)=>update(i,{ country: v })} placeholder="e.g., India" />
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-4 items-end">
                  <MonthInput label="Start" value={e.start || ""} onChange={(v)=>update(i,{ start: v })} />
                  <MonthInput label="End" value={e.current ? "" : (e.end || "")} onChange={(v)=>update(i,{ end: v, current: false })} disabled={e.current} />
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={!!e.current} onChange={(ev)=>update(i,{ current: ev.target.checked })} />
                    I currently study here
                  </label>
                </div>

                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700">Coursework / Highlights</label>
                  <Bullets value={e.bullets} onChange={(v)=>update(i,{ bullets: v })} placeholder="e.g., Algorithms, Operating Systems, Databases" />
                </div>
              </div>
            ))}

            <button type="button" onClick={add} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50">
              <Plus className="h-4 w-4"/> Add another education
            </button>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        </div>

        {/* Preview */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="text-sm font-semibold">Live preview</div>
            <div className="mt-3 space-y-4">
              {items.map((e, i) => (
                <PreviewEdu key={i} e={e} />
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Bottom actions */}
      {/* <div className="border-t bg-white sticky bottom-0">
        <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button onClick={()=>nav('/builder/work-history')} className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm">
            <ArrowLeft className="h-4 w-4"/> Back: Work history
          </button>
          <button disabled={saving} onClick={saveAndNext} className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-300 disabled:opacity-70">
            Next: Skills <ArrowRight className="h-4 w-4"/>
          </button>
        </div>
      </div> */}
      <Footer nextSectionName="Skills" prevSectionName="Work History" prevSection={() => nav("/builder/work-history")} nextSection={saveAndNext} saving={false} />
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

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v:string)=>void; placeholder?: string }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <input className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} />
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
  function normalize(s: string) {
    return s.split(/\n+/).map(x => x.trim()).filter(Boolean);
  }
  return (
    <div className="mt-1">
      <textarea className="w-full min-h-[120px] rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200" placeholder={placeholder || "e.g., Algorithms, OS, DBMS, ML"} value={text} onChange={(e)=>{ setText(e.target.value); onChange(normalize(e.target.value)); }} />
      <div className="mt-1 text-xs text-gray-500">Use one line per item (e.g., "Operating Systems"). Keep 3–6 items max.</div>
    </div>
  );
}

function PreviewEdu({ e }: { e: any }) {
  const range = e.start ? `${e.start}${e.current ? ' — Present' : (e.end ? ` — ${e.end}` : '')}` : '';
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold leading-tight">{e.degree || 'Degree'}{e.field ? `, ${e.field}` : ''}</div>
          <div className="text-xs text-gray-600">{e.school || 'School/University'}{e.city ? ` • ${e.city}` : ''}{e.country ? `, ${e.country}` : ''}{e.gpa ? ` • GPA ${e.gpa}` : ''}</div>
        </div>
        <div className="text-[11px] text-gray-500">{range}</div>
      </div>
      {e.bullets?.length ? (
        <ul className="mt-2 list-disc pl-5 text-[13px] text-gray-700 space-y-1">
          {e.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
        </ul>
      ) : (
        <div className="mt-2 text-xs text-gray-500">Add 2–6 coursework/highlights.</div>
      )}
    </div>
  );
}
