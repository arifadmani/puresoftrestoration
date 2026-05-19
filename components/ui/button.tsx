import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/*
 * Operating Theatre button.
 * Rectangular, 4px radius, no shadow. Mono arrow glyph translates 2px on hover.
 * `signal` variant is reserved for CAT-hotline use only (per design spec).
 */
const buttonVariants = cva(
  "group inline-flex items-center gap-2.5 rounded-sm font-medium leading-none tracking-[-0.005em] border transition-[transform,background-color,border-color,color] duration-150 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-signal/30 focus-visible:border-signal disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-ink-900 text-paper-bright border-ink-900 hover:bg-black",
        ghost:
          "bg-transparent text-ink-900 border-ink-900/20 hover:bg-ink-900/[0.04] hover:border-ink-900/30",
        signal:
          "bg-signal text-ink-900 border-signal hover:bg-signal-hi hover:border-signal-hi",
        link:
          "bg-transparent text-ink-900 border-transparent px-0 hover:text-ink-700 underline-offset-4 hover:underline",
        ghostInk:
          "bg-transparent text-paper border-paper/20 hover:bg-paper/[0.06] hover:border-paper/40",
      },
      size: {
        sm: "h-9 px-3 text-[12.5px]",
        md: "h-10 px-4 text-[13.5px]",
        lg: "h-11 px-5 text-[14px]",
        xl: "h-12 px-6 text-[14.5px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant, size, className, children } = props;
  const classes = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsLink;
    const isExternal = /^https?:\/\/|^mailto:|^tel:/.test(href);
    if (isExternal) {
      return (
        <a className={classes} href={href} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }
  const { ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/* Arrow glyph used inside buttons. Mono, translates 2px on hover. */
export function BtnArrow({
  glyph = "→",
  className,
}: {
  glyph?: "→" | "↗";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "mono font-medium leading-none transition-transform duration-150 group-hover:translate-x-[2px]",
        className
      )}
    >
      {glyph}
    </span>
  );
}

export { buttonVariants };
