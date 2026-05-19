import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Metric — serif numeral + mono unit superscript + mono label below.
 * The brand's primary regional-authority device.
 */
export function Metric({
  value,
  unit,
  label,
  size = "md",
  tone = "ink",
  className,
}: {
  value: React.ReactNode;
  unit?: string;
  label: string;
  size?: "sm" | "md" | "lg";
  tone?: "ink" | "paper" | "signal";
  className?: string;
}) {
  const sizes = {
    sm: "text-[28px]",
    md: "text-[36px]",
    lg: "text-[48px]",
  } as const;
  const tones = {
    ink: "text-ink-900",
    paper: "text-paper-bright",
    signal: "text-signal-hi",
  } as const;
  return (
    <div className={className}>
      <div
        className={cn(
          "serif-display leading-none tracking-[-0.02em]",
          sizes[size],
          tones[tone]
        )}
      >
        {value}
        {unit && (
          <span className="mono ml-1.5 text-[11px] tracking-[0.14em] text-ink-500">
            {unit}
          </span>
        )}
      </div>
      <div className="mono mt-2 text-[10px] tracking-[0.16em] uppercase text-ink-500">
        {label}
      </div>
    </div>
  );
}
