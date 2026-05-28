"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitIntake, type IntakeResult } from "@/app/contact/actions";

type Tone = "paper" | "ink";

type TurnstileGlobal = {
  render: (
    container: string | HTMLElement,
    options: {
      sitekey: string;
      theme?: "light" | "dark" | "auto";
      callback?: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    }
  ) => string | undefined;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileGlobal;
    __turnstileScriptLoading?: boolean;
  }
}

const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

function loadTurnstileScript(): Promise<TurnstileGlobal> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("ssr"));
    if (window.turnstile) return resolve(window.turnstile);

    const existing = document.querySelector(
      `script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]`
    ) as HTMLScriptElement | null;

    const onReady = () => {
      const start = Date.now();
      const check = () => {
        if (window.turnstile) return resolve(window.turnstile);
        if (Date.now() - start > 10_000) return reject(new Error("timeout"));
        setTimeout(check, 50);
      };
      check();
    };

    if (existing) {
      onReady();
      return;
    }

    const script = document.createElement("script");
    script.src = TURNSTILE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = onReady;
    script.onerror = () => reject(new Error("script-load-failed"));
    document.head.appendChild(script);
  });
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
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [turnstileStatus, setTurnstileStatus] = useState<
    "idle" | "loading" | "ready" | "failed"
  >("idle");

  // Explicit render of the Turnstile widget — implicit auto-init via
  // <Script> from next/script was inconsistent. With explicit rendering we
  // guarantee the widget mounts after this component does.
  useEffect(() => {
    if (!siteKey) return;
    if (!turnstileRef.current) return;
    if (widgetIdRef.current) return; // already rendered

    setTurnstileStatus("loading");
    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !turnstileRef.current) return;
        try {
          const id = turnstile.render(turnstileRef.current, {
            sitekey: siteKey,
            theme: tone === "ink" ? "dark" : "light",
            "error-callback": () => setTurnstileStatus("failed"),
            "expired-callback": () => {
              if (widgetIdRef.current && window.turnstile) {
                window.turnstile.reset(widgetIdRef.current);
              }
            },
          });
          widgetIdRef.current = id ?? null;
          setTurnstileStatus("ready");
        } catch (err) {
          console.error("[turnstile] render failed", err);
          setTurnstileStatus("failed");
        }
      })
      .catch((err) => {
        console.error("[turnstile] script load failed", err);
        setTurnstileStatus("failed");
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, tone]);

  // Reset Turnstile widget after a failed submission so a new token is fetched
  useEffect(() => {
    if (state && !state.ok && widgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(widgetIdRef.current);
      } catch {
        // ignore
      }
    }
  }, [state]);

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
        <div style={{ marginTop: "20px", minHeight: "70px" }}>
          <div ref={turnstileRef} />
          {turnstileStatus === "loading" ? (
            <p
              className="small"
              style={{
                ...(smallStyle ?? {}),
                fontSize: "12.5px",
                marginTop: "4px",
              }}
            >
              Loading bot-protection challenge…
            </p>
          ) : null}
          {turnstileStatus === "failed" ? (
            <p
              role="alert"
              style={{
                fontSize: "12.5px",
                color: tone === "ink" ? "var(--color-ox-hi)" : "var(--color-ox)",
                marginTop: "4px",
              }}
            >
              Couldn&apos;t load the bot-protection challenge. You can still
              submit — or call the response line directly.
            </p>
          ) : null}
        </div>
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
