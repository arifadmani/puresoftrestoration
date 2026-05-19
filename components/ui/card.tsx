import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Operating Theatre cards: hairlined (1px ink-900/10), never shadowed
 * except for the elevated ops/intake panels (use shadow-op explicitly).
 */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border border-ink-900/10 bg-paper-bright",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-7", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "serif-display text-[28px] leading-[1.15] tracking-[-0.015em] text-ink-900",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-[13.5px] leading-6 text-ink-600", className)}
      {...props}
    />
  );
}
