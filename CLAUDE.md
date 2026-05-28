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

Recommended stack (as deployed 2026-05-28):

- Next.js 16
- TypeScript
- Tailwind CSS v4
- shadcn/ui-style primitives (hand-crafted)
- AWS SES (transactional email)
- Caddy 2 reverse proxy
- systemd deployment on EC2 (Ubuntu 24.04)

Intentionally not in scope today:

- Structured online claim-intake form (intake routes through phone + email)
- AWS S3 (no photo upload — adjusters/claimants do not submit photos)
- PostgreSQL (no claim-submissions table needed without a structured form)

These may return later if the intake model changes; for now they are out of the build.

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
