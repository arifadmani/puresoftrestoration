"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/insurance-professionals", label: "Insurance Professionals" },
  { href: "/soft-contents-restoration", label: "Soft Contents" },
  { href: "/fire-smoke-odor-restoration", label: "Fire & Smoke" },
  { href: "/water-mold-textile-recovery", label: "Water & Mold" },
  { href: "/cat-emergency-response", label: "CAT Response" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-paper/95 backdrop-blur">
      <div className="bg-ink text-paper">
        <div className="container-prose flex h-9 items-center justify-between text-xs">
          <span className="hidden sm:inline text-slate-300">
            North Texas soft contents and textile restoration for insurance claims
          </span>
          <a
            href={`tel:${site.contact.catLineTel}`}
            className="inline-flex items-center gap-2 font-medium text-paper hover:text-accent transition-colors"
          >
            <Phone size={12} aria-hidden />
            <span>24/7 CAT Response: {site.contact.catLine}</span>
          </a>
        </div>
      </div>

      <div className="container-prose flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group" aria-label={`${site.name} home`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-navy text-paper text-sm font-semibold">
            PS
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-[0.04em] uppercase text-navy">
              Pure Soft
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Restoration
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-700 hover:text-navy transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/contact" variant="primary" size="md" className="hidden sm:inline-flex">
            Submit a Claim
          </Button>
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm border border-slate-200 text-navy"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden border-t border-slate-200 bg-paper transition-[max-height,opacity] duration-200 overflow-hidden",
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container-prose py-4 flex flex-col gap-1" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-slate-700 hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
          <Button
            href="/contact"
            variant="primary"
            size="md"
            className="mt-3 w-full sm:hidden"
          >
            Submit a Claim
          </Button>
        </nav>
      </div>
    </header>
  );
}
