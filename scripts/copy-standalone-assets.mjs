#!/usr/bin/env node
/**
 * Next.js standalone mode produces a self-contained server at
 * .next/standalone/server.js, but it does NOT copy .next/static/ or public/
 * into the standalone directory. Without this step, a locally-run
 * standalone server returns the HTML correctly but 404s every CSS, JS chunk,
 * and woff2 — the page renders as unstyled markup.
 *
 * Wired as the `postbuild` script so `npm run build` is self-contained.
 * The production deploy recipe in deployment/README.md uses rsync for the same
 * purpose and is unaffected by this script.
 */
import { rmSync, cpSync, existsSync, statSync } from "node:fs";

const moves = [
  { src: ".next/static", dst: ".next/standalone/.next/static" },
  { src: "public", dst: ".next/standalone/public" },
];

let copied = 0;
for (const { src, dst } of moves) {
  if (!existsSync(src) || !statSync(src).isDirectory()) {
    console.warn(`[postbuild] skipped ${src} → ${dst} (source missing)`);
    continue;
  }
  rmSync(dst, { recursive: true, force: true });
  cpSync(src, dst, { recursive: true });
  console.log(`[postbuild] copied ${src} → ${dst}`);
  copied += 1;
}

if (copied === 0) {
  console.error("[postbuild] nothing copied — did `next build` run?");
  process.exit(1);
}
