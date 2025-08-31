import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, Plus, Trash2, MoveUp, MoveDown } from "lucide-react";
import Footer from "./Footer";
import PreviewCard from "./PreviewCard";
import { useExperienceSection } from "../context/ResumeContext";

/**
 * Builder — Section 2: Work History
 *
 * - Manage a list of experience entries (role, company, location, dates, bullets)
 * - Inline validation + reorder + remove
 * - Right-side live preview synced with form
 * - Saves to resume.sections.experience[]
 */
export default function Experience() {
  // const nav = useNavigate();
  const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");

  const nav = useNavigate();

  type Entry = {
    role: string;
    company: string;
    city?: string;
    country?: string;
    start?: string; // YYYY-MM
    end?: string; // YYYY-MM or "present"
    current?: boolean;
    bullets: string[];
  };

  const [items = [{ role: "", company: "", bullets: [] }], setItems] =
    useExperienceSection();

  function update(i: number, patch: Partial<Entry>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    if (patch.current) {
      next[i].end = undefined;
    }
    setItems(next);
  }

  function remove(i: number) {
    const next = [...items];
    next.splice(i, 1);
    setItems(
      next.length ? next : [{ role: "", company: "", bullets: [] } as Entry]
    );
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const tmp = next[i];
    next[i] = next[j];
    next[j] = tmp;
    setItems(next);
  }

  function add() {
    setItems([...items, { role: "", company: "", bullets: [] } as Entry]);
  }

  function isValid(e: Entry) {
    const base = e.role.trim().length > 1 && e.company.trim().length > 1;
    const datesOk = !e.start || e.current || !e.end || e.start <= (e.end || "");
    return base && datesOk;
  }

  async function saveAndNext() {
    // if (!resumeId) return;
    // setSaving(true); setError("");
    try {
      // const payload = { sections: { experience: items } };
      // await axios.patch(`/api/resumes/${resumeId}`, payload, { withCredentials: true });
      nav("/builder/education");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-3 gap-10">
        {/* Form */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">
            Tell us about your work experience
          </h1>
          <p className="text-gray-600 mt-1">
            Add your roles, responsibilities and key achievements.
          </p>

          <div className="mt-6 space-y-5">
            {items.map((e, i) => (
              <div
                key={i}
                className="rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold">
                    Position #{i + 1}{" "}
                    {isValid(e) && (
                      <CheckCircle2 className="inline h-4 w-4 text-emerald-600 ml-1" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <button
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                      onClick={() => move(i, -1)}
                    >
                      <MoveUp className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                      onClick={() => move(i, 1)}
                    >
                      <MoveDown className="h-4 w-4" />
                    </button>
                    <button
                      className="rounded-lg border px-2 py-1 text-xs hover:bg-gray-50"
                      onClick={() => remove(i)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field
                    label="Job Title *"
                    value={e.role}
                    onChange={(v) => update(i, { role: v })}
                    placeholder="e.g., Senior Software Engineer"
                  />
                  <Field
                    label="Company *"
                    value={e.company}
                    onChange={(v) => update(i, { company: v })}
                    placeholder="e.g., Acme Inc"
                  />
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-4">
                  <Field
                    label="City"
                    value={e.city || ""}
                    onChange={(v) => update(i, { city: v })}
                    placeholder="e.g., Mumbai"
                  />
                  <Field
                    label="Country"
                    value={e.country || ""}
                    onChange={(v) => update(i, { country: v })}
                    placeholder="e.g., India"
                  />
                </div>

                <div className="mt-3 grid md:grid-cols-3 gap-4 items-end">
                  <MonthInput
                    label="Start"
                    value={e.start || ""}
                    onChange={(v) => update(i, { start: v })}
                  />
                  <MonthInput
                    label="End"
                    value={e.current ? "" : e.end || ""}
                    onChange={(v) => update(i, { end: v, current: false })}
                    disabled={e.current}
                  />
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={!!e.current}
                      onChange={(ev) =>
                        update(i, { current: ev.target.checked })
                      }
                    />
                    I currently work here
                  </label>
                </div>

                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-700">
                    Key achievements / responsibilities
                  </label>
                  <Bullets
                    value={e.bullets}
                    onChange={(v) => update(i, { bullets: v })}
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={add}
              className="inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" /> Add another position
            </button>
          </div>

          {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
        </div>

        {/* Preview */}
        <aside className="lg:col-span-1">
          <PreviewCard DEFAULT_DATA={{}} scale={0.5} />
        </aside>
      </section>

      <Footer nextSection={saveAndNext} saving={false} />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <input
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function MonthInput({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <input
        type="month"
        className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200 disabled:bg-gray-50"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
    </label>
  );
}

function Bullets({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const [text, setText] = useState((value || []).join("\n"));
  useEffect(() => {
    setText((value || []).join("\n"));
  }, [value]);
  function normalize(s: string) {
    return s
      .split(/\n+/)
      .map((x) => x.trim())
      .filter(Boolean);
  }
  return (
    <div className="mt-1">
      <textarea
        className="w-full min-h-[120px] rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-200"
        placeholder="Use one line per bullet (e.g., Reduced API latency by 40%)"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          onChange(normalize(e.target.value));
        }}
      />
      <div className="mt-1 text-xs text-gray-500">
        Tip: Start bullets with an action verb and a metric (e.g., "Led",
        "Improved", "Reduced by 20%").
      </div>
    </div>
  );
}

function PreviewJob({ e }: { e: any }) {
  const range = e.start
    ? `${e.start}${e.current ? " — Present" : e.end ? ` — ${e.end}` : ""}`
    : "";
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold leading-tight">
            {e.role || "Job Title"}
          </div>
          <div className="text-xs text-gray-600">
            {e.company || "Company"}
            {e.city ? ` • ${e.city}` : ""}
            {e.country ? `, ${e.country}` : ""}
          </div>
        </div>
        <div className="text-[11px] text-gray-500">{range}</div>
      </div>
      {e.bullets?.length ? (
        <ul className="mt-2 list-disc pl-5 text-[13px] text-gray-700 space-y-1">
          {e.bullets.map((b: string, i: number) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-2 text-xs text-gray-500">
          Add 2–5 bullets that quantify impact.
        </div>
      )}
    </div>
  );
}
