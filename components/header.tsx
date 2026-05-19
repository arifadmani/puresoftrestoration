"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, BtnArrow } from "@/components/ui/button";
import { BrandMark } from "@/components/brand-mark";
import { CatStrip } from "@/components/ops/cat-strip";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#process", label: "Process" },
  { href: "/cat-emergency-response", label: "CAT Response" },
  { href: "/insurance-professionals", label: "For Carriers" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/95 supports-[backdrop-filter]:backdrop-blur border-b border-ink-900/10">
      <CatStrip
        state="active"
        code={site.activeCat.code}
        eventName={site.activeCat.name}
        region={site.activeCat.counties}
        mobilizedAgo={site.activeCat.mobilizedAgo}
        propertyCount={site.activeCat.properties}
        lotCount={site.activeCat.lots}
        carrierLineLabel={site.contact.carrierLineLabel}
        carrierLineTel={site.contact.carrierLineTel}
      />

      <div className="doc-shell gutter flex h-[60px] items-center justify-between">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="shrink-0"
        >
          <BrandMark />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-7 text-[13.5px] text-ink-700"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ink-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Button
            href="/contact"
            variant="ghost"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Lot Lookup <BtnArrow glyph="↗" />
          </Button>
          <Button href="/contact" variant="primary" size="sm">
            Initiate Claim <BtnArrow glyph="→" />
          </Button>
          <button
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-sm border border-ink-900/15 text-ink-900"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-ink-900/10 bg-paper-bright overflow-hidden transition-[max-height,opacity] duration-200",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav
          aria-label="Mobile"
          className="doc-shell gutter py-3 flex flex-col"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[14px] text-ink-700 hover:text-ink-900 border-b border-ink-900/5 last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
