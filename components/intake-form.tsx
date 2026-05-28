"use client";

import { useActionState, useEffect, useId } from "react";
import { useFormStatus } from "react-dom";
import Script from "next/script";
import { submitIntake, type IntakeResult } from "@/app/contact/actions";

type Tone = "paper" | "ink";

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

function SubmitButton({ tone }: { tone: Tone }) {
  const { pending } = useFormStatus();
  const className = tone === "ink" ? "btn btn--ox" : "btn btn--primary";
  return (
    <button
      type="submit"
      className={className}
      style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? "Sending…" : "Send to response team"}{" "}
      <span className="arr">→</span>
    </button>
  );
}

export function IntakeForm({
  tone = "paper",
  siteKey,
  compact = false,
}: {
  tone?: Tone;
  siteKey: string;
  compact?: boolean;
}) {
  const [state, formAction] = useActionState<IntakeResult | null, FormData>(
    submitIntake,
    null
  );
  const widgetContainerId = useId();

  const inputStyle =
    tone === "ink"
      ? {
          background: "var(--color-ink)",
          borderColor: "rgba(246,242,233,0.2)",
          color: "var(--color-bone)",
        }
      : undefined;
  const labelStyle = tone === "ink" ? { color: "var(--color-ink-4)" } : undefined;
  const eyebrowStyle =
    tone === "ink" ? { color: "var(--color-ox-hi)" } : undefined;
  const formStyle =
    tone === "ink"
      ? {
          background: "#14110D",
          borderColor: "rgba(246,242,233,0.16)",
        }
      : undefined;
  const smallStyle =
    tone === "ink"
      ? { color: "var(--color-ink-4)" }
      : undefined;

  // Reset Turnstile widget after a failed submission so a new token is fetched
  useEffect(() => {
    if (state && !state.ok && window.turnstile) {
      try {
        window.turnstile.reset();
      } catch {
        // ignore
      }
    }
  }, [state]);

  return (
    <form action={formAction} className="form" style={formStyle} noValidate>
      <p className="eyebrow" style={eyebrowStyle}>
        Submit a loss
      </p>

      {state?.formError ? (
        <div
          role="alert"
          style={{
            marginTop: "16px",
            padding: "12px 14px",
            border: `1px solid ${tone === "ink" ? "rgba(148,65,63,0.6)" : "var(--color-ox)"}`,
            background: tone === "ink" ? "rgba(122,46,46,0.18)" : "var(--color-ox-soft)",
            color: tone === "ink" ? "var(--color-bone-bright)" : "var(--color-ox)",
            fontSize: "13.5px",
            lineHeight: 1.5,
          }}
        >
          {state.formError}
        </div>
      ) : null}

      <div className="form-field" style={{ marginTop: "18px" }}>
        <label htmlFor="role" style={labelStyle}>
          I am a…
        </label>
        <select id="role" name="role" defaultValue="" style={inputStyle} required>
          <option value="" disabled>
            Select your role
          </option>
          <option>Independent adjuster</option>
          <option>Public adjuster</option>
          <option>Carrier</option>
          <option>Restoration contractor</option>
          <option>Contents company</option>
          <option>Property manager</option>
          <option>Homeowner</option>
        </select>
        {state?.fieldErrors?.role ? (
          <p style={{ fontSize: "12px", color: "var(--color-ox)", marginTop: "6px" }}>
            {state.fieldErrors.role}
          </p>
        ) : null}
      </div>

      <div className="form__row">
        <div className="form-field">
          <label htmlFor="name" style={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Full name"
            style={inputStyle}
            autoComplete="name"
            required
          />
          {state?.fieldErrors?.name ? (
            <p style={{ fontSize: "12px", color: "var(--color-ox)", marginTop: "6px" }}>
              {state.fieldErrors.name}
            </p>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="phone" style={labelStyle}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="(000) 000-0000"
            style={inputStyle}
            autoComplete="tel"
            inputMode="tel"
            required
          />
          {state?.fieldErrors?.phone ? (
            <p style={{ fontSize: "12px", color: "var(--color-ox)", marginTop: "6px" }}>
              {state.fieldErrors.phone}
            </p>
          ) : null}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@company.com"
          style={inputStyle}
          autoComplete="email"
          required
        />
        {state?.fieldErrors?.email ? (
          <p style={{ fontSize: "12px", color: "var(--color-ox)", marginTop: "6px" }}>
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="form__row">
        <div className="form-field">
          <label htmlFor="lossType" style={labelStyle}>
            Loss type
          </label>
          <select id="lossType" name="lossType" defaultValue="" style={inputStyle} required>
            <option value="" disabled>
              Select
            </option>
            <option>Fire / Smoke</option>
            <option>Water / Flood</option>
            <option>Mold / Biohazard</option>
            <option>Other</option>
          </select>
          {state?.fieldErrors?.lossType ? (
            <p style={{ fontSize: "12px", color: "var(--color-ox)", marginTop: "6px" }}>
              {state.fieldErrors.lossType}
            </p>
          ) : null}
        </div>
        <div className="form-field">
          <label htmlFor="carrierAndClaim" style={labelStyle}>
            Carrier &amp; claim №
          </label>
          <input
            id="carrierAndClaim"
            name="carrierAndClaim"
            placeholder="State Farm · 2026-…"
            style={inputStyle}
          />
        </div>
      </div>

      {compact ? null : (
        <div className="form-field">
          <label htmlFor="lossAddress" style={labelStyle}>
            Loss address
          </label>
          <input
            id="lossAddress"
            name="lossAddress"
            placeholder="Street, City, TX, ZIP"
            style={inputStyle}
            autoComplete="street-address"
          />
        </div>
      )}

      {compact ? null : (
        <div className="form-field">
          <label htmlFor="notes" style={labelStyle}>
            Anything we should know
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Approx. item count, urgency, access notes…"
            style={inputStyle}
          />
        </div>
      )}

      {/* honeypot — hidden from real users, bots fill it */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor={`${widgetContainerId}-hp`}>Website</label>
        <input
          id={`${widgetContainerId}-hp`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {siteKey ? (
        <>
          <div
            className="cf-turnstile"
            data-sitekey={siteKey}
            data-theme={tone === "ink" ? "dark" : "light"}
            style={{ marginTop: "20px" }}
          />
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            async
            defer
          />
        </>
      ) : null}

      <SubmitButton tone={tone} />

      <p
        className="small"
        style={{ ...(smallStyle ?? {}), textAlign: "center", marginTop: "14px" }}
      >
        Typical response within 30 minutes during business hours. For active
        losses, call the response line.
      </p>
    </form>
  );
}
