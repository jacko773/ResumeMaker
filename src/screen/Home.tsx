import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  Globe,
  Palette,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import Faq from "../components/Faq";
import Feature from "../components/Feature";
import PriceCard from "../components/PriceCard";
import TemplateCard from "../components/TemplateCard";
import Header from "./Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-sky-50/50 to-white text-gray-800">
      {/* Header */}
      <Header isNav={true}></Header>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[50rem] rounded-full bg-sky-200/40 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs text-gray-600 shadow-sm mb-4">
              <ShieldCheck className="h-3.5 w-3.5 text-sky-600" /> ATS‑friendly
              PDF • Customizable templates • Free plan
            </div>
            <h1 className="text-4xl/tight sm:text-5xl/tight font-extrabold">
              Build a job‑winning <span className="text-sky-600">resume</span> &
              <br className="hidden sm:block" /> a beautiful{" "}
              <span className="text-sky-600">portfolio</span> in minutes
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
              Create, customize, and export ATS‑friendly resumes. Publish your
              developer portfolio to a shareable subdomain with one click.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="/builder/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-600"
              >
                Create your resume <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#templates"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 border hover:bg-gray-50"
              >
                View templates
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-600" /> 3 free
                templates
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-600" /> No watermark
                on Pro
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-sky-600" /> Export
                PDF/DOCX
              </div>
            </div>
          </div>

          {/* Mock preview card */}
          <div className="relative">
            <div className="rounded-3xl border bg-white shadow-xl p-4 md:p-6">
              <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-white border p-4">
                <div className="h-6 w-40 rounded bg-gray-200 mb-4" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <div className="h-3.5 w-11/12 rounded bg-gray-200" />
                    <div className="h-3.5 w-9/12 rounded bg-gray-200" />
                    <div className="h-3.5 w-10/12 rounded bg-gray-200" />
                    <div className="h-3.5 w-6/12 rounded bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-3.5 w-full rounded bg-gray-200" />
                    <div className="h-3.5 w-10/12 rounded bg-gray-200" />
                    <div className="h-3.5 w-8/12 rounded bg-gray-200" />
                    <div className="h-3.5 w-7/12 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="inline-flex items-center justify-center rounded-xl border-2 border border-gray-200 px-3 py-2 text-sm">
                  Preview
                </button>
                <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-sky-500  px-3 py-2 text-sm">
                  Export PDF
                </button>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 hidden md:block">
              <div className="rounded-2xl border bg-white shadow-lg p-3 flex items-center gap-3">
                <FileDown className="h-5 w-5 text-sky-600" />
                <div className="text-sm">
                  <div className="font-semibold">ATS‑ready PDF</div>
                  <div className="text-gray-500">
                    Clean typography, smart spacing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-14 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Everything you need to ship fast
          </h2>
          <p className="text-gray-600 mt-2">
            Craft your resume, publish your portfolio, track results — in one
            place.
          </p>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Feature
              icon={<FileDown className="h-5 w-5" />}
              title="ATS‑friendly exports"
              desc="Pixel‑perfect PDF and DOCX without weird breaks."
            />
            <Feature
              icon={<Globe className="h-5 w-5" />}
              title="1‑click portfolio"
              desc="Publish to your subdomain with built‑in SEO."
            />
            <Feature
              icon={<Palette className="h-5 w-5" />}
              title="Template gallery"
              desc="Classic ATS, two‑column, minimal serif & more."
            />
            <Feature
              icon={<BarChart3 className="h-5 w-5" />}
              title="Basic analytics"
              desc="See views and top referrers on your portfolio."
            />
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Templates that get interviews
              </h2>
              <p className="text-gray-600 mt-2">
                Switch instantly — your content adapts to the layout.
              </p>
            </div>
            <a
              href="/login"
              className="hidden sm:inline text-sm font-medium text-sky-600 hover:text-sky-700"
            >
              Try for free →
            </a>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <TemplateCard name="Classic ATS" />
            <TemplateCard name="Modern Two‑Column" />
            <TemplateCard name="Minimal Serif" />
          </div>
          <div className="mt-10">
            <h3 className="text-lg font-semibold">Portfolio layouts</h3>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              <TemplateCard name="Developer Minimal" />
              <TemplateCard name="Case Study" />
              <TemplateCard name="One Pager" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (teaser) */}
      <section id="pricing" className="py-14 bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Simple, India‑friendly pricing
          </h2>
          <p className="text-gray-600 mt-2">Start free. Upgrade anytime.</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <PriceCard
              name="Free"
              price="₹0"
              cta="Start free"
              perks={[
                "1 resume • 1 portfolio",
                "3 templates",
                "PDF with watermark",
              ]}
            />
            <PriceCard
              highlight
              name="Pro"
              price="₹399/mo"
              cta="Upgrade to Pro"
              perks={[
                "Unlimited resumes",
                "All templates",
                "No watermark • Export DOCX",
              ]}
            />
            <PriceCard
              name="Plus"
              price="₹799/mo"
              cta="Go Plus"
              perks={[
                "Custom domain",
                "Advanced analytics",
                "Priority support",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700">
            “Clean templates, zero fuss. I exported my resume and published a
            portfolio in under 15 minutes. Got interview callbacks in a week.”
          </p>
          <div className="mt-3 text-sm text-gray-500">
            — Early user, Senior MERN Dev
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 bg-gray-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6">
            <Faq
              q="Is the PDF ATS‑friendly?"
              a="Yes. We avoid text in images and keep semantic structure so most ATS parsers read your resume correctly."
            />
            <Faq
              q="Can I switch templates anytime?"
              a="Absolutely. Your content is schema‑based, so switching is instant without re‑typing."
            />
            <Faq
              q="Do you offer a free plan?"
              a="Yes — create 1 resume and 1 portfolio for free. Upgrade to remove watermark and unlock all templates."
            />
          </dl>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-lg bg-sky-500/90" />
              <span className="font-semibold text-gray-800">
                Resume/Portfolio
              </span>
            </div>
            <nav className="flex flex-wrap items-center gap-4">
              <a href="#features" className="hover:text-gray-900">
                Features
              </a>
              <a href="#templates" className="hover:text-gray-900">
                Templates
              </a>
              <a href="#pricing" className="hover:text-gray-900">
                Pricing
              </a>
              <a href="#faq" className="hover:text-gray-900">
                FAQ
              </a>
              <a href="#" className="hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="hover:text-gray-900">
                Terms
              </a>
            </nav>
          </div>
          <div className="mt-6 text-xs text-gray-500">
            © {new Date().getFullYear()} Resume/Portfolio — All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
