import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * Operating Theatre input. Inline mono label prefix + value.
 * No floating labels. Focus: signal border + 3px signal-15% ring.
 */
export function Field({
  label,
  className,
  children,
  htmlFor,
}: {
  label: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex flex-col gap-1.5 py-3.5 border-b border-ink-900/[0.10] last:border-b-0",
        className
      )}
    >
      <span className="mono text-[10px] tracking-[0.16em] uppercase text-ink-500">
        {label}
      </span>
      {children}
    </label>
  );
}

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-transparent text-[15px] font-medium text-ink-900 placeholder:text-ink-300 outline-none",
          className
        )}
        {...props}
      />
    );
  }
);

/* Compact framed input — used in carrier portals where the label appears inline as a prefix. */
export function FramedInput({
  label,
  value,
  placeholder,
  focus,
  className,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  focus?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-2.5 mono text-[12px] tracking-[0.04em] text-ink-700 bg-paper border rounded-sm",
        focus
          ? "border-signal shadow-[0_0_0_3px_rgba(217,105,31,0.15)] bg-paper-bright"
          : "border-ink-900/20",
        className
      )}
    >
      <span className="text-ink-400 mr-2">{label}</span>
      <span className="flex-1 truncate">{value ?? placeholder}</span>
    </div>
  );
}
