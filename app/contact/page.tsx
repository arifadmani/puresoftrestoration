import { IntakeForm } from "@/components/intake-form";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Reach the Pure Soft Restoration response team directly. Call for active losses, or submit a loss for response within one business hour.",
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
            No portal, no ticket queue. Call for an active loss, or send the details below
            and we&apos;ll mobilize. We work with adjusters, carriers and contractors first —
            homeowners through their pro.
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
                <span className="lbl">Response line</span>
                <a className="val" href={`tel:${site.contact.responseLineTel}`}>
                  {site.contact.responseLineLabel}
                  <small>24/7 for active losses</small>
                </a>
              </div>
              <div className="contact__method">
                <span className="lbl">Email</span>
                <a className="val" href={`mailto:${site.contact.responseEmail}`}>
                  Email us
                  <small>{site.contact.responseEmail}</small>
                </a>
              </div>
              <div className="contact__method">
                <span className="lbl">Facility</span>
                <span className="val">
                  {site.address.locality}, {site.address.region}
                  <small>
                    Serving {site.serviceArea.join(" · ")}
                  </small>
                </span>
              </div>
              <div className="contact__method">
                <span className="lbl">Hours</span>
                <span className="val">
                  Always on
                  <small>Office {site.hours.business} · response line 24/7</small>
                </span>
              </div>
            </div>

            <div className="seal-row" style={{ marginTop: "36px" }}>
              <div className="seal"><span className="seal__mark">✓</span><span className="seal__txt"><b>IICRC Certified</b><span>Textile &amp; odor control</span></span></div>
              <div className="seal"><span className="seal__mark">40+</span><span className="seal__txt"><b>Approved Carriers</b><span>Direct vendor status</span></span></div>
            </div>
          </div>

          <IntakeForm tone="paper" siteKey={turnstileSiteKey} />
        </div>
      </section>
    </>
  );
}
