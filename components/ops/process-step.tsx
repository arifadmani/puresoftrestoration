import * as React from "react";
import { cn } from "@/lib/utils";

type StepState = "done" | "active" | "pending";

export function ProcessStep({
  state,
  stageLabel,
  index,
  name,
  description,
  meta,
  className,
}: {
  state: StepState;
  stageLabel: string;
  index: string;
  name: string;
  description: string;
  meta: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-state={state}
      className={cn("relative z-[2] px-6 py-5 text-left", className)}
    >
      <div className="mono text-[10px] tracking-[0.18em] uppercase text-ink-500">
        {stageLabel}
      </div>
      <Node state={state}>{index}</Node>
      <div className="serif-display text-[22px] leading-[1.1] tracking-[-0.01em] mt-1.5">
        {name}
      </div>
      <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-600 max-w-[22ch]">
        {description}
      </p>
      <div className="mono mt-3.5 pt-2.5 border-t border-dashed border-ink-200 text-[10px] tracking-[0.08em] leading-[1.6] text-ink-500">
        {meta}
      </div>
    </div>
  );
}

function Node({
  state,
  children,
}: {
  state: StepState;
  children: React.ReactNode;
}) {
  const base =
    "relative mt-6 mb-4 flex h-8 w-8 items-center justify-center rounded-full mono text-[11px] font-semibold";
  if (state === "active") {
    return (
      <div
        className={cn(
          base,
          "bg-signal text-paper-bright shadow-[0_0_0_6px_rgba(217,105,31,0.12)]"
        )}
        aria-current="step"
      >
        {children}
      </div>
    );
  }
  if (state === "done") {
    return (
      <div className={cn(base, "bg-ink-900 text-paper")}>
        {children}
      </div>
    );
  }
  return (
    <div
      className={cn(
        base,
        "bg-paper-bright text-ink-500 border-[1.5px] border-ink-300"
      )}
    >
      {children}
    </div>
  );
}
