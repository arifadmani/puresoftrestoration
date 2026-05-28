"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `.reveal` fade-in-up entrance animation.
 *
 * Subtleties (both learned the hard way):
 *
 * 1. **Default state must be visible if the JS path fails.** The CSS rule
 *    that hides `.reveal` elements (`opacity: 0`) is gated on the
 *    `html.js-ready` class, which an inline `<script>` in `<head>` adds on
 *    first paint. If JS doesn't run at all (content blocker, network glitch),
 *    `.reveal` elements remain visible — content-first.
 *
 * 2. **SPA navigation must re-run the observer.** This component lives in the
 *    root layout, which does NOT unmount on client-side navigation between
 *    pages. With an empty dependency array the IntersectionObserver setup
 *    fired once on mount and never again — so the next page's `.reveal`
 *    sections rendered with the `opacity: 0` default and stayed permanently
 *    invisible. The user saw the hero/title but everything below was a blank
 *    band, until they refreshed. The dependency on `pathname` re-runs the
 *    effect on every route change; on every re-run (after the first) we just
 *    immediately mark every `.reveal` element visible — no entrance animation
 *    on SPA navigation, which would be jarring anyway.
 */
export function Reveal() {
  const pathname = usePathname();
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    // SPA navigation (or reduced-motion users): immediately mark every
    // `.reveal` section visible. No fade-in.
    if (!isInitialLoadRef.current || reducedMotion) {
      isInitialLoadRef.current = false;
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }

    // Initial page load: use IntersectionObserver for the fade-in.
    isInitialLoadRef.current = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
