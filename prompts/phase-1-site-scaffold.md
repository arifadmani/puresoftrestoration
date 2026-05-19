# Claude Code Prompt — Phase 1 Site Scaffold

## Instruction

Read the project context and execute Phase 1 of the Pure Soft Restoration roadmap.

Required context files:

- `CLAUDE.md`
- `README.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `handoff/NEXT_STEPS.md`

Do not ask for additional business positioning unless a true blocker exists. Use the repo context as the source of truth.

## Objective

Build the initial production website foundation for Pure Soft Restoration.

This is not a consumer dry-cleaner website. Build it as an insurance-industry credible soft contents/textile restoration platform for adjusters, carriers, public adjusters, contents companies, restoration companies, property managers, and future claim intake workflows.

## Phase 1 scope

Implement:

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui setup
- responsive layout shell
- shared header/navigation
- shared footer
- prominent `Submit a Claim` CTA
- professional insurance-industry design system
- all eight initial pages
- metadata framework
- JSON-LD schema placeholders
- sitemap/robots setup if appropriate for the selected Next.js structure
- Caddy deployment configuration
- systemd deployment configuration
- `.env.example`
- basic deployment documentation

## Pages to create

Create these initial routes/pages:

1. Home
2. Insurance Professionals
3. Soft Contents Restoration
4. Fire & Smoke Odor Restoration
5. Water & Mold Textile Recovery
6. CAT / Emergency Response
7. About
8. Contact / Submit a Claim

## Design direction

The design should feel:

- operational
- professional
- credible
- calm under pressure
- documentation-forward
- enterprise/insurance-ready
- North Texas regional authority

Use:

- deep navy
- slate gray
- white/off-white
- restrained accent color
- clean typography
- strong layout hierarchy

Avoid:

- consumer dry-cleaner aesthetics
- playful laundry imagery
- coupon/promo language
- script fonts
- saturated retail colors
- generic restoration clichés

## Messaging direction

Primary positioning:

> North Texas soft contents and textile restoration specialists for insurance claims.

Core themes:

- fast response
- claim documentation
- chain of custody
- textile salvage expertise
- reduced claim severity
- CAT readiness
- adjuster/carrier confidence
- smoke, water, and mold textile recovery

## Technical requirements

- Use production-quality file structure.
- Keep components reusable.
- Create constants/config files where useful.
- Keep future portal/CRM expansion in mind.
- Do not build full claim intake persistence yet unless trivial. Phase 1 should prepare the architecture, not overbuild Phase 2.
- Include placeholders for AWS SES, AWS S3, PostgreSQL, and Cloudflare Turnstile where appropriate.
- Do not commit secrets.

## Deployment artifacts

Create or update:

- `deployment/Caddyfile.example`
- `deployment/puresoft.service.example`
- `deployment/README.md`
- `.env.example`

The deployment target is:

- AWS EC2 Ubuntu 24.04 LTS
- Caddy reverse proxy
- systemd running Next.js standalone app
- domain: `puresoftrestoration.com`
- email: `admin@puresoftrestoration.com`

## Validation

Before finishing:

- run install/build/lint checks as appropriate
- verify the app builds locally
- note any commands that failed and why
- do not hide errors

## Required documentation updates

Update:

- `docs/ROADMAP.md` with Phase 1 status
- `docs/ARCHITECTURE.md` with actual implemented structure
- `docs/DECISIONS.md` only if new decisions were made
- `handoff/NEXT_STEPS.md` with the next concrete tasks

If `docs/ARCHITECTURE.md` does not exist, create it.

## Required GitHub persistence

At the end, commit and push:

```bash
git status
git add .
git commit -m "Implement Phase 1 website scaffold"
git push origin main
```

## Final response required from Claude Code

Provide a concise summary with:

- what was built
- files changed
- commands run
- build status
- deployment status
- blockers
- next recommended action
