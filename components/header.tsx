"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const nav = [
  { href: "/#serve", label: "Who We Serve" },
  { href: "/#restore", label: "What We Restore" },
  { href: "/#process", label: "Process" },
  { href: "/insurance-professionals", label: "For Adjusters" },
  { href: "/cat-emergency-response", label: "CAT Response" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: "color-mix(in srgb, var(--color-bone) 86%, transparent)",
        backdropFilter: "saturate(140%) blur(8px)",
        WebkitBackdropFilter: "saturate(140%) blur(8px)",
        borderColor: "var(--color-bone-rule)",
      }}
    >
      <div className="shell flex items-center justify-between gap-8 py-4">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="shrink-0"
        >
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "23px",
              letterSpacing: "-0.01em",
              color: "var(--color-ink)",
              whiteSpace: "nowrap",
            }}
          >
            Pure Soft Restoration
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-[30px]"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors"
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--color-ink-2)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-ox)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-ink-2)")}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[22px]">
          {/*
            Per CANONICAL_FACTS Round 1 #5: no public phone number is published
            until the Twilio line is provisioned. When it is, restore a phone
            link block here pulled from site.contact.responseLineLabel/Tel.
          */}
          <Link href="/contact" className="btn btn--primary">
            Contact <span className="arr">→</span>
          </Link>
          <button
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center border"
            style={{
              borderColor: "var(--color-bone-rule)",
              color: "var(--color-ink)",
            }}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className="lg:hidden overflow-hidden transition-[max-height,opacity] duration-200"
        style={{
          maxHeight: open ? "420px" : "0",
          opacity: open ? 1 : 0,
          borderTop: open ? "1px solid var(--color-bone-rule)" : "0",
          background: "var(--color-bone-bright)",
        }}
      >
        <nav aria-label="Mobile" className="shell py-3 flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 transition-colors"
              style={{
                fontSize: "14px",
                color: "var(--color-ink-2)",
                borderBottom: "1px solid var(--color-bone-rule)",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
