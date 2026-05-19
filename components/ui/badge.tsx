import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-[7px] rounded-full px-2.5 py-1 mono text-[10.5px] tracking-[0.14em] uppercase",
  {
    variants: {
      tone: {
        active: "bg-signal-soft text-[#7A3A0F]",
        audit: "bg-data-soft text-[#164055]",
        sealed: "bg-verified-soft text-[#1B402C]",
        pending: "bg-paper-shadow text-ink-600",
        caution: "bg-caution-soft text-[#5A4318]",
        intake: "bg-[rgba(176,122,42,0.16)] text-[#724E14]",
      },
    },
    defaultVariants: { tone: "active" },
  }
);

const dotVariants = cva("h-1.5 w-1.5 rounded-full", {
  variants: {
    tone: {
      active: "bg-signal",
      audit: "bg-data",
      sealed: "bg-verified",
      pending: "bg-ink-400",
      caution: "bg-[#B07A2A]",
      intake: "bg-[#B07A2A]",
    },
  },
  defaultVariants: { tone: "active" },
});

type BadgeProps = VariantProps<typeof badgeVariants> & {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
  /** Full accessible state — recommended on operational badges */
  "aria-label"?: string;
};

export function Badge({
  tone = "active",
  children,
  pulse,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone }), className)} {...rest}>
      <span
        className={cn(
          dotVariants({ tone }),
          pulse && tone === "active" && "motion-pulse-dot"
        )}
      />
      <span>{children}</span>
    </span>
  );
}
