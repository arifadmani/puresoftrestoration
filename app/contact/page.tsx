import { IntakeForm } from "@/components/intake-form";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach Pure Soft Restoration by email or by submitting a loss. We are available 24 hours for rush textile intake from contents companies, adjusters, carriers, and contractors across North Texas.",
  path: "/contact",
});

export default function ContactPage() {
  const turnstileSiteKey = process.env.TURNSTILE_SITE_KEY ?? "";

  return (
    <>
      <section className="phero shell">
        <div className="phero__grid">
          <div>
            <p className="eyebrow">Contact</p>
            <h1 className="display phero__display" style={{ marginTop: "20px" }}>
              Reach the response<br />team <em>directly.</em>
            </h1>
          </div>
          <p className="lede">
            Submit a loss below, or email us directly. We are available 24 hours
            for rush textile intake from contents companies, adjusters, carriers
            and contractors across North Texas.
          </p>
        </div>
      </section>

      <section className="section shell reveal" style={{ paddingTop: "80px" }}>
        <div className="contact__grid">
          <div>
            <h2 className="display" style={{ fontSize: "clamp(28px,3.4vw,42px)" }}>
              Direct lines.
            </h2>
            <div className="contact__methods">
              <div className="contact__method">
                <span className="lbl">Email</span>
                <a className="val" href={`mailto:${site.contact.responseEmail}`}>
                  Email us
                  <small>{site.contact.responseEmail}</small>
                </a>
              </div>
              <div className="contact__method">
                <span className="lbl">Service area</span>
                <span className="val">
                  North Texas
                  <small>
                    Counties served: {site.serviceArea.join(" · ")}
                  </small>
                </span>
              </div>
              <div className="contact__method">
                <span className="lbl">Availability</span>
                <span className="val">
                  24 hours
                  <small>{site.availability.rushTurnaround}</small>
                </span>
              </div>
            </div>
          </div>

          <IntakeForm tone="paper" siteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
