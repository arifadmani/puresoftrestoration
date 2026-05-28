import Link from "next/link";
import { site } from "@/lib/site";

const cols = [
  {
    h: "Capabilities",
    links: [
      { label: "What we restore", href: "/#restore" },
      { label: "Process", href: "/#process" },
      { label: "Soft contents", href: "/soft-contents-restoration" },
      { label: "Smoke & fire", href: "/fire-smoke-odor-restoration" },
      { label: "Water & mold", href: "/water-mold-textile-recovery" },
      { label: "CAT response", href: "/cat-emergency-response" },
    ],
  },
  {
    h: "For Partners",
    links: [
      { label: "Adjusters", href: "/insurance-professionals" },
      { label: "Carriers", href: "/insurance-professionals" },
      { label: "Contractors", href: "/insurance-professionals" },
      { label: "Property managers", href: "/insurance-professionals" },
    ],
  },
  {
    h: "Contact",
    links: [
      { label: site.contact.responseLineLabel, href: `tel:${site.contact.responseLineTel}` },
      { label: "Email response team", href: `mailto:${site.contact.responseEmail}` },
      { label: "Submit a loss", href: "/contact" },
      { label: "About", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-ink)",
        color: "var(--color-bone-deep)",
        paddingTop: "72px",
        paddingBottom: "40px",
      }}
    >
      <div className="shell">
        <div
          className="grid gap-10"
          style={{
            gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          }}
        >
          <div>
            <Link href="/" className="flex items-baseline gap-2.5">
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "23px",
                  letterSpacing: "-0.01em",
                  color: "var(--color-bone-bright)",
                }}
              >
                Pure&nbsp;Soft
              </span>
              <span
                style={{
                  fontSize: "10.5px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-4)",
                  fontWeight: 600,
                }}
              >
                Restoration
              </span>
            </Link>
            <p
              style={{
                fontSize: "13.5px",
                color: "var(--color-ink-4)",
                marginTop: "16px",
                maxWidth: "30ch",
                lineHeight: 1.6,
              }}
            >
              North Texas&apos;s textile and soft-contents restoration authority. {site.address.locality}, {site.address.region} — serving the DFW metroplex since {site.estYear}.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.h}>
              <h5
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-4)",
                  marginBottom: "16px",
                  fontWeight: 700,
                }}
              >
                {c.h}
              </h5>
              <ul>
                {c.links.map((l) => (
                  <li key={`${c.h}-${l.label}`}>
                    <Link
                      href={l.href}
                      className="block transition-colors"
                      style={{
                        fontSize: "14px",
                        color: "var(--color-bone-deep)",
                        marginBottom: "10px",
                      }}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4"
          style={{
            marginTop: "52px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(246,242,233,0.14)",
            fontSize: "12px",
            color: "var(--color-ink-4)",
          }}
        >
          <span>
            © {new Date().getFullYear()} {site.legalName} · IICRC-certified · Licensed &amp; insured in Texas
          </span>
          <span>Textile &amp; soft-contents restoration · North Texas</span>
        </div>
      </div>
    </footer>
  );
}
