import { useEffect, useMemo, useState } from "react";
import { Camera, Upload} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router";
import Field from "../components/Field";
import Select from "../components/Select";
import Chip from "../components/Chip";
import PreviewCard from "./PreviewCard";
import Footer from "./Footer";
import Header from "./Header";
import { useHeadingSection } from "../context/ResumeContext";

/**
 * Builder — Section 1: Heading
 *
 * - Clean, ATS-friendly form for the resume heading/contact block
 * - Right-side live preview card
 * - Validations with green checkmarks
 * - Persists to backend (/api/resumes). Creates first, then updates
 * - Stores resumeId in localStorage for subsequent steps
 */

export default function Heading() {
  const nav = useNavigate();
  // const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [extra, setExtra] = useState<{ linkedin?: string; website?: string; drivingLicense?: string }>({});

  // The core heading state
  // const [heading, setHeading] = useState({
  //   firstName: "",
  //   lastName: "",
  //   profession: "",
  //   city: "",
  //   country: "India",
  //   pincode: "",
  //   phone: "",
  //   email: "",
  // });

  const [heading = {}, dispatchHeading] = useHeadingSection();

  console.log("heading", heading)
  // const resumeId = useMemo(() => localStorage.getItem("resumeId"), []);

  // useEffect(() => {
  //         setHeading({
  //           firstName: contact.firstName || heading.firstName,
  //           lastName: contact.lastName || heading.lastName,
  //           profession: contact.profession || heading.profession,
  //           city: contact.city || heading.city,
  //           country: contact.country || heading.country,
  //           pincode: contact.pincode || heading.pincode,
  //           phone: contact.phone || heading.phone,
  //           email: contact.email || heading.email,
  //         });
  //         setPhoto(contact.photoUrl || null);
  //         setExtra({
  //           linkedin: contact.linkedin || "",
  //           website: contact.website || "",
  //           drivingLicense: contact.drivingLicense || "",
  //         });

  //     setLoading(false);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  function update<K extends keyof typeof heading>(key: K, val: (typeof heading)[K]) {
    dispatchHeading({ ...heading, [key]: val });
  }

  function validEmail(v: string) {
    return /\S+@\S+\.\S+/.test(v);
  }
  function validPhone(v: string) {
    return /^\+?[0-9\- ]{7,15}$/.test(v);
  }
  function validStr(v: string) {
    return (v || "").trim().length > 1;
  }
  function has(value: string) {
    return (value || "").trim().length > 0;
  }

  async function saveAndNext() {
    setSaving(true); setError("");
    try {
    //   const payload = {
    //     title: `${heading.firstName} ${heading.lastName} — ${heading.profession}`.trim(),
    //     templateId: "classic-ats",
    //     sections: {
    //       contact: {
    //         ...heading,
    //         photoUrl: photo,
    //         ...extra,
    //       },
    //     },
    //   };
    //   if (!resumeId) {
    //     const res = await axios.post("/api/resumes", payload, { withCredentials: true });
    //     localStorage.setItem("resumeId", res.data.item._id);
    //   } else {
    //     await axios.patch(`/api/resumes/${resumeId}`, payload, { withCredentials: true });
    //   }
      nav("/builder/work-history"); // next step route
    } catch (e: any) {
      setError(e?.response?.data?.error || "Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhoto(url);
  }

  // if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <>
      {/* Heading form + Preview */}
      <section className="mx-auto max-w-6xl px-4 py-6 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold">What’s the best way for employers to contact you?</h1>
          <p className="text-gray-600 mt-1">We suggest including an email and phone number.</p>

          <div className="mt-6 grid grid-cols-[96px,1fr] gap-6">
            {/* Photo */}
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-xl bg-gray-100 border grid place-items-center overflow-hidden">
                {photo ? (
                  <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <label className="mt-2 text-sm text-sky-700 inline-flex items-center gap-2 cursor-pointer">
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
              </label>
            </div>

            {/* Form */}
            <div>
              <div className="text-xs text-gray-500">* indicates a required field</div>

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Field label="First Name *" value={heading.firstName} onChange={(v)=>update("firstName", v)} ok={validStr(heading.firstName)} placeholder="e.g., Vinay" />
                <Field label="Surname *" value={heading.lastName} onChange={(v)=>update("lastName", v)} ok={validStr(heading.lastName)} placeholder="e.g., Kumar" />
              </div>

              <Field className="mt-3" label="Profession" value={heading.profession} onChange={(v)=>update("profession", v)} placeholder="e.g., Senior Software Engineer" />

              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <Field label="City" value={heading.city} onChange={(v)=>update("city", v)} placeholder="e.g., Mumbai" />
                <Select label="Country" value={heading.country} onChange={(v)=>update("country", v)} options={["India","USA","UK","Canada","Australia","Germany"]} />
                <Field label="Pin Code" value={heading.pincode} onChange={(v)=>update("pincode", v)} placeholder="e.g., 400089" />
              </div>

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Field label="Phone" value={heading.phone} onChange={(v)=>update("phone", v)} ok={has(heading.phone) && validPhone(heading.phone)} placeholder="e.g., +91 98765 43210" />
                <Field label="Email *" value={heading.email} onChange={(v)=>update("email", v)} ok={validEmail(heading.email)} placeholder="e.g., you@example.com" />
              </div>

              {/* Optional extras */}
              <div className="mt-4">
                <div className="text-sm font-medium">Add additional information to your resume <span className="text-gray-400">(optional)</span></div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Chip editable label="LinkedIn" value={extra.linkedin || ""} placeholder="https://linkedin.com/in/username" onChange={(v)=>setExtra({ ...extra, linkedin: v })} />
                  <Chip editable label="Website" value={extra.website || ""} placeholder="https://yourdomain.com" onChange={(v)=>setExtra({ ...extra, website: v })} />
                </div>
              </div>

              {error && (
                <div className="mt-4 text-sm text-red-600">{error}</div>
              )}
            </div>
          </div>
        </div>

        {/* Right panel: social proof + preview */}
        <aside className="lg:col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-sky-700 font-medium">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-100">↑</span>
              30% Higher chance of getting a job
            </div>
            <div className="mt-4 rounded-xl border bg-gradient-to-br from-gray-50 to-white p-3">
              <PreviewCard />
            </div>
            <button onClick={()=>nav("/templates")} className="mt-3 text-sm text-sky-700 hover:text-sky-900">Change template</button>
            <div className="mt-3 text-[11px] text-gray-500 leading-relaxed">
              <sup>†</sup> Our results are based on feedback from early users building ATS‑friendly resumes with these templates.
            </div>
          </div>
        </aside>
      </section>

      {/* Bottom actions */}
        <Footer nextSectionName="Work History" prevSectionName="" prevSection={() => {}} nextSection={saveAndNext} saving={false} />
    </>
  );
}
