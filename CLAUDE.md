@AGENTS.md

# Pure Soft Restoration — Persistent Claude Context

## Company

Pure Soft Restoration is a North Texas soft contents and textile restoration company focused on insurance claims.

The business already has the backend operational infrastructure to clean/process textiles through existing dry-cleaning infrastructure.

## Primary objective

Become the default textile/soft contents restoration authority in North Texas for:

- Insurance adjusters
- Independent adjusters
- Public adjusters
- Carriers
- Contents companies
- Restoration companies
- Property managers

## Positioning

This is NOT a consumer dry-cleaner website.

The website and platform should feel:

- operational
- insurance-focused
- credible
- responsive
- documentation-heavy
- catastrophe-ready

Avoid:

- playful laundry branding
- generic restoration marketing fluff
- consumer coupon-style aesthetics

Preferred visual identity:

- navy
- slate
- white
- restrained accent color
- clean typography
- operational/enterprise feel

## Initial website pages

- Home
- Insurance Professionals
- Soft Contents Restoration
- Fire & Smoke Odor Restoration
- Water & Mold Textile Recovery
- CAT / Emergency Response
- About
- Contact / Submit a Claim

## Technical direction

Recommended stack:

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- AWS SES
- AWS S3
- Caddy reverse proxy
- systemd deployment

## Important operational principles

- Every major task should end with git commit + push.
- All architectural decisions must be documented.
- No hidden deployment changes.
- Update docs after implementation.
- Keep persistent memory in GitHub.

## Required post-task workflow

After completing work:

1. Update:
- docs/DECISIONS.md
- docs/ROADMAP.md
- docs/ARCHITECTURE.md
- handoff/NEXT_STEPS.md

2. Commit changes:

git add .
git commit -m "<descriptive message>"
git push origin main

3. Summarize:
- work completed
- files changed
- deployment status
- blockers
- recommended next steps
