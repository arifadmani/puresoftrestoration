import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Brand mark — circular `PS` glyph + wordmark.
 * The glyph color follows the surface: on paper it uses ink-900, on ink it uses paper.
 */
export function BrandMark({
  tone = "ink",
  size = "md",
  showWordmark = true,
  className,
}: {
  tone?: "ink" | "paper";
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
}) {
  const glyphSize = size === "sm" ? "h-[18px] w-[18px] text-[9px]" : size === "lg" ? "h-7 w-7 text-[12px]" : "h-[22px] w-[22px] text-[10px]";
  const toneClass =
    tone === "ink"
      ? "border-ink-900 text-ink-900"
      : "border-paper text-paper";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "inline-grid place-items-center rounded-full border-[1.5px] mono font-semibold",
          glyphSize,
          toneClass
        )}
      >
        PS
      </span>
      {showWordmark && (
        <span
          className={cn(
            "font-semibold tracking-[-0.01em] whitespace-nowrap",
            tone === "ink" ? "text-ink-900" : "text-paper",
            size === "sm" ? "text-[13px]" : size === "lg" ? "text-base" : "text-[14.5px]"
          )}
        >
          Pure Soft Restoration
        </span>
      )}
    </span>
  );
}
