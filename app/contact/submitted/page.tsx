import Link from "next/link";
import { GenerateLeadEvent } from "@/components/conversion-event";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Submission received",
  description:
    "Your intake submission has been received. Our response team will reach out within one business hour.",
  path: "/contact/submitted",
});

export default function SubmittedPage() {
  return (
    <section className="section shell reveal in" style={{ paddingTop: "120px" }}>
      <GenerateLeadEvent />
      <div style={{ maxWidth: "720px", marginInline: "auto", textAlign: "center" }}>
        <p className="eyebrow">Submission received</p>
        <h1 className="display" style={{ fontSize: "clamp(40px,5vw,72px)", marginTop: "18px" }}>
          Thank you. We&apos;re on it.
        </h1>
        <p className="body-copy" style={{ marginTop: "28px", marginInline: "auto", fontSize: "17px" }}>
          A member of our team will reach out by email. We are available 24
          hours for rush textile intake.
        </p>

        <div
          style={{
            marginTop: "44px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px",
          }}
        >
          <a className="btn btn--ox" href={`mailto:${site.contact.responseEmail}`}>
            Email us <span className="arr">→</span>
          </a>
          <Link href="/" className="btn btn--ghost">
            Return home <span className="arr">→</span>
          </Link>
        </div>

        <div
          style={{
            marginTop: "56px",
            paddingTop: "28px",
            borderTop: "1px solid var(--color-bone-rule)",
            color: "var(--color-ink-3)",
            fontSize: "13.5px",
          }}
        >
          {site.contact.responseEmail}
        </div>
      </div>
    </section>
  );
}
