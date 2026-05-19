import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "paper" | "paper-bright" | "paper-shadow" | "ink";

/*
 * Section primitive. Paper-on-paper sections use 96px padding; dark sections
 * are deliberate "moments of gravity" with 120–140px padding.
 */
export function Section({
  tone = "paper",
  className,
  innerClassName,
  children,
  as: As = "section",
  pad = "default",
}: {
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  pad?: "default" | "gravity" | "tight";
}) {
  const toneClass: Record<SectionTone, string> = {
    paper: "bg-paper text-ink-900",
    "paper-bright": "bg-paper-bright text-ink-900",
    "paper-shadow": "bg-paper-shadow text-ink-900",
    ink: "bg-ink-900 text-paper",
  };
  const padClass =
    pad === "gravity"
      ? "py-[120px]"
      : pad === "tight"
      ? "py-[56px]"
      : "py-[96px]";
  return (
    <As
      className={cn(
        "border-b border-ink-900/10",
        toneClass[tone],
        padClass,
        className
      )}
    >
      <div className={cn("doc-shell gutter", innerClassName)}>{children}</div>
    </As>
  );
}

/* Section-tag — the thin mono band that introduces a section. */
export function SectionTag({
  label,
  right,
  pulse,
}: {
  label: string;
  right?: React.ReactNode;
  pulse?: boolean;
}) {
  return (
    <div className="relative z-[1] flex items-center justify-between gutter h-10 bg-paper/90 backdrop-blur supports-[backdrop-filter]:backdrop-saturate-150 border-y border-ink-900/10 mono text-[11px] tracking-[0.16em] uppercase text-ink-500">
      <span className="flex items-center gap-6">
        <span
          aria-hidden
          className={cn(
            "h-1.5 w-1.5 rounded-full bg-signal",
            pulse && "motion-pulse"
          )}
        />
        <span>{label}</span>
      </span>
      {right && <span>{right}</span>}
    </div>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mono text-[11px] tracking-[0.18em] uppercase text-ink-500",
        className
      )}
    >
      {children}
    </p>
  );
}

/*
 * Display heading — Instrument Serif. Used for section opens (D2) and
 * card / exhibit titles (H1). Size is opt-in.
 */
export function Display({
  level = 2,
  size = "d2",
  children,
  className,
}: {
  level?: 1 | 2 | 3;
  size?: "d1" | "d2" | "h1" | "h2";
  children: React.ReactNode;
  className?: string;
}) {
  const sizeClass = {
    d1: "text-[64px] sm:text-[80px] lg:text-[96px] leading-[0.96] tracking-[-0.025em]",
    d2: "text-[44px] sm:text-[56px] lg:text-[64px] leading-[1] tracking-[-0.02em]",
    h1: "text-[34px] sm:text-[40px] leading-[1.1] tracking-[-0.015em]",
    h2: "text-[24px] sm:text-[28px] leading-[1.15] tracking-[-0.01em]",
  } as const;
  const Tag = (`h${level}` as unknown) as React.ElementType;
  return (
    <Tag
      className={cn(
        "serif-display text-balance",
        sizeClass[size],
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function Lede({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "max-w-[52ch] text-[16px] leading-[1.6] text-ink-600",
        className
      )}
    >
      {children}
    </p>
  );
}

/* Back-compat: old service pages used <SectionHeading> + <SectionLead>.
 * These thin wrappers keep that API working while the rest of the system
 * standardizes on <Display> + <Lede>. */
export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Display level={2} size="d2" className={cn("mt-3", className)}>
      {children}
    </Display>
  );
}

export const SectionLead = Lede;
