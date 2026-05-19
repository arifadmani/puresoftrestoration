import * as React from "react";
import { cn } from "@/lib/utils";

type SectionTone = "paper" | "muted" | "navy" | "ink";

export function Section({
  tone = "paper",
  className,
  innerClassName,
  children,
  as: As = "section",
}: {
  tone?: SectionTone;
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  const toneClass: Record<SectionTone, string> = {
    paper: "bg-paper text-ink",
    muted: "bg-paper-muted text-ink",
    navy: "bg-navy text-paper",
    ink: "bg-ink text-paper",
  };
  return (
    <As className={cn("py-14 md:py-20", toneClass[tone], className)}>
      <div className={cn("container-prose", innerClassName)}>{children}</div>
    </As>
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
        "text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mt-3 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg",
        className
      )}
    >
      {children}
    </p>
  );
}
