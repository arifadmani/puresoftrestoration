import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { site } from "@/lib/site";

const services = [
  { href: "/soft-contents-restoration", label: "Soft Contents Restoration" },
  { href: "/fire-smoke-odor-restoration", label: "Fire & Smoke Odor" },
  { href: "/water-mold-textile-recovery", label: "Water & Mold Recovery" },
  { href: "/cat-emergency-response", label: "CAT / Emergency Response" },
];

const company = [
  { href: "/insurance-professionals", label: "Insurance Professionals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Submit a Claim" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="container-prose py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-paper text-navy text-sm font-semibold">
                PS
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-[0.04em] uppercase">
                  Pure Soft Restoration
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  Insurance-grade textile restoration
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-6 text-slate-300">
              {site.tagline} Documentation, chain of custody, and severity
              reduction for adjusters, carriers, and contents companies across
              the DFW metroplex.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a
                href={`tel:${site.contact.catLineTel}`}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Phone size={14} aria-hidden />
                <span>24/7 CAT Response: {site.contact.catLine}</span>
              </a>
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail size={14} aria-hidden />
                <span>{site.contact.email}</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Services
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.href}>
                  <Link className="text-slate-200 hover:text-accent" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {company.map((s) => (
                <li key={s.href}>
                  <Link className="text-slate-200 hover:text-accent" href={s.href}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Service Area
            </h4>
            <p className="mt-4 text-sm text-slate-300 leading-6">
              {site.serviceArea.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate-700/60 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </span>
          <span>
            {site.address.locality}, {site.address.region} · Insurance-grade
            textile restoration
          </span>
        </div>
      </div>
    </footer>
  );
}
