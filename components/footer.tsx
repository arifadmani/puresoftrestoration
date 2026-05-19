import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { site } from "@/lib/site";

const cols = [
  {
    h: "Capabilities",
    links: [
      { label: "Smoke & soot", href: "/fire-smoke-odor-restoration" },
      { label: "Water & flood", href: "/water-mold-textile-recovery" },
      { label: "Mold & biohazard", href: "/water-mold-textile-recovery" },
      { label: "Document recovery", href: "/soft-contents-restoration" },
      { label: "Art & heirloom", href: "/soft-contents-restoration" },
    ],
  },
  {
    h: "Operations",
    links: [
      { label: "Process", href: "/#process" },
      { label: "Chain of custody", href: "/#process" },
      { label: "CAT response", href: "/cat-emergency-response" },
      { label: "Mutual aid", href: "/cat-emergency-response" },
      { label: "Facility tour", href: "/about" },
    ],
  },
  {
    h: "For partners",
    links: [
      { label: "Carrier portal", href: "/insurance-professionals" },
      { label: "Adjuster portal", href: "/insurance-professionals" },
      { label: "GC partnership", href: "/insurance-professionals" },
      { label: "PM agreement", href: "/insurance-professionals" },
      { label: "Vendor onboarding", href: "/contact" },
    ],
  },
  {
    h: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Leadership", href: "/about" },
      { label: "Certifications", href: "/about" },
      { label: "Press", href: "/about" },
      { label: "Careers", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300">
      <div className="doc-shell gutter pt-16 pb-7 text-[13.5px]">
        <div className="grid gap-9 md:grid-cols-12 pb-12 border-b border-[rgb(255_251_242/0.10)]">
          <div className="md:col-span-4">
            <BrandMark tone="paper" />
            <div className="mono text-[11px] tracking-[0.08em] leading-[1.7] text-ink-300 mt-5">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region} {site.address.postalCode}
              <br />
              <br />
              Carrier line · <a href={`tel:${site.contact.carrierLineTel}`} className="text-paper hover:text-signal-hi">{site.contact.carrierLineLabel}</a>
              <br />
              Intake · <a href={`mailto:${site.contact.intakeEmail}`} className="text-paper hover:text-signal-hi">{site.contact.intakeEmail}</a>
              <br />
              {site.hours.dispatch}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.h} className="md:col-span-2">
              <h5 className="mono text-[11px] tracking-[0.18em] uppercase text-ink-200 font-medium">
                {c.h}
              </h5>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={`${c.h}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="block py-1 text-ink-300 hover:text-paper transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col md:flex-row md:justify-between gap-3 mono text-[10.5px] tracking-[0.14em] uppercase text-ink-400">
          <span>
            © {new Date().getFullYear()} {site.legalName} · IICRC {site.certifications.iicrc} · Texas DPS {site.certifications.texasDps}
          </span>
          <span>Privacy · Terms · Vendor compliance</span>
        </div>
      </div>
    </footer>
  );
}
