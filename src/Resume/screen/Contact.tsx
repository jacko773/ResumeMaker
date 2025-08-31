import { useState } from "react";
import {
  ArrowRight,
  Camera,
  Eye,
  LayoutTemplate,
  Save,
  Upload,
} from "lucide-react";
import { useNavigate } from "react-router";
import Field from "../../components/Field";
import Select from "../../components/Select";
import PreviewCard from "./PreviewCard";
import { useContactSection } from "../context/ResumeContext";
import Footer from "./Footer";

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

  const [contact = {}, dispatchHeading] = useContactSection();

  function update<K extends keyof typeof contact>(
    key: K,
    val: (typeof contact)[K]
  ) {
    dispatchHeading({ ...contact, [key]: val });
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
    setSaving(true);
    setError("");
    try {
      //TODO : dispatch to backend
      nav("/builder/experience"); // next step route
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
          <h2 className="text-4xl font-bold">
            What’s the best way for employers to contact you?
          </h2>
          <p className="text-gray-600 mt-1">
            We suggest including an email and phone number.
          </p>

          <div className="mt-6 grid grid-cols-[96px,1fr] gap-6">
            {/* Photo */}
            <div className="flex flex-col items-center">
              <div className="h-20 w-20 rounded-xl bg-gray-100 border grid place-items-center overflow-hidden">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Camera className="h-6 w-6 text-gray-400" />
                )}
              </div>
              <label className="mt-2 text-sm text-sky-700 inline-flex items-center gap-2 cursor-pointer">
                <Upload className="h-4 w-4" />
                <span>Upload Photo</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPhotoChange}
                />
              </label>
            </div>

            {/* Form */}
            <div>
              {/* <div className="text-xs text-gray-500">
                * indicates a required field
              </div> */}

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Field
                  label="First Name *"
                  value={contact.firstName}
                  onChange={(v) => update("firstName", v)}
                  ok={validStr(contact.firstName)}
                  placeholder="e.g., Vinay"
                />
                <Field
                  label="Surname *"
                  value={contact.lastName}
                  onChange={(v) => update("lastName", v)}
                  ok={validStr(contact.lastName)}
                  placeholder="e.g., Kumar"
                />
              </div>

              <Field
                className="mt-3"
                label="Profession"
                value={contact.profession}
                onChange={(v) => update("profession", v)}
                placeholder="e.g., Senior Software Engineer"
              />

              <div className="mt-3 grid md:grid-cols-3 gap-4">
                <Field
                  label="City"
                  value={contact.city}
                  onChange={(v) => update("city", v)}
                  placeholder="e.g., Mumbai"
                />
                <Select
                  label="Country"
                  value={contact.country}
                  onChange={(v) => update("country", v)}
                  options={[
                    "- Select -",
                    "India",
                    "USA",
                    "UK",
                    "Canada",
                    "Australia",
                    "Germany",
                  ]}
                />
                <Field
                  label="Pin Code"
                  value={contact.pincode}
                  onChange={(v) => update("pincode", v)}
                  placeholder="e.g., 400089"
                />
              </div>

              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Field
                  label="Phone"
                  value={contact.phone}
                  onChange={(v) => update("phone", v)}
                  ok={has(contact.phone) && validPhone(contact.phone)}
                  placeholder="e.g., +91 98765 43210"
                />
                <Field
                  label="Email *"
                  value={contact.email}
                  onChange={(v) => update("email", v)}
                  ok={validEmail(contact.email)}
                  placeholder="e.g., you@example.com"
                />
              </div>
              {/* <div className="text-sm font-medium mt-4">
                Add additional information to your resume{" "}
                <span className="text-gray-400">(optional)</span>
              </div> */}
              <div className="mt-3 grid md:grid-cols-2 gap-4">
                <Field
                  label="LinkedIn"
                  value={contact.linkedin}
                  onChange={(v) => update("linkedin", v)}
                  placeholder="https://linkedin.com/in/username"
                />

                <Field
                  label="Website"
                  value={contact.website}
                  placeholder="https://yourdomain.com"
                  onChange={(v) => update("website", v)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: social proof + preview */}
        <aside className="lg:col-span-1">
          <PreviewCard DEFAULT_DATA={{}} scale={0.5} />
        </aside>
      </section>
      {/* Footer nav */}
      <Footer nextSection={saveAndNext} saving={false} />
    </>
  );
}
