# Claude Code Prompt — Phase 1 Review, Polish, and Deployment Prep

## Instruction

Read the existing repository state and complete a disciplined Phase 1 review/polish pass.

Required context files:

- `CLAUDE.md`
- `README.md`
- `docs/DECISIONS.md`
- `docs/ROADMAP.md`
- `docs/ARCHITECTURE.md` if present
- `handoff/NEXT_STEPS.md`

Do not restart the project. Do not replace the scaffold unless something is broken. Improve the current implementation.

## Objective

The Phase 1 site scaffold appears to be built. Your task is to verify, polish, and prepare it for deployment on the AWS Ubuntu server.

## Scope

### 1. Verify current implementation

Check:

- all expected routes exist
- homepage compiles
- navigation links work
- footer links work
- metadata is present
- shared components are clean
- app structure is understandable
- no placeholder consumer dry-cleaner language remains
- no secrets are committed
- build/lint results are documented

Expected pages:

- `/`
- `/insurance-professionals`
- `/soft-contents-restoration`
- `/fire-smoke-odor-restoration`
- `/water-mold-textile-recovery`
- `/cat-emergency-response`
- `/about`
- `/contact`

### 2. Tighten homepage copy

The current homepage direction is good, but make the copy more scan-friendly for adjusters.

Reduce density where needed while preserving the insurance-industry authority.

Improve clarity around:

- who Pure Soft Restoration works with
- why adjusters should call directly
- fast response
- chain of custody
- documentation
- salvage versus replacement
- North Texas coverage
- CAT response readiness

Add or improve a section titled something like:

- `Who We Work With`
- `Built for Insurance Professionals`

Include audiences:

- Independent adjusters
- Public adjusters
- Carriers
- Contents companies
- Restoration contractors
- Property managers

### 3. Add proof/credibility placeholders

Add a clean operational proof section with placeholders that can be edited later.

Examples:

- Same-day response available
- North Texas coverage
- Item-level intake documentation
- Chain-of-custody workflow
- Salvage-focused textile restoration
- CAT/event-mode capacity

Do not invent hard metrics unless clearly marked as placeholders.

### 4. Deployment readiness

Review or create:

- `deployment/Caddyfile.example`
- `deployment/puresoft.service.example`
- `deployment/README.md`
- `.env.example`

Make sure deployment docs reflect:

- AWS Ubuntu 24.04
- Caddy reverse proxy
- systemd app service
- domain `puresoftrestoration.com`
- app on `127.0.0.1:3000`
- GitHub repo pull-based deployment

### 5. Next.js version check

The repo may currently be on Next.js 16 even though earlier planning referenced Next.js 15.

Do not downgrade automatically.

Instead:

- check whether the app builds cleanly
- document the actual version in `docs/ARCHITECTURE.md`
- note whether there are any compatibility concerns
- only change versions if there is a build or dependency issue

### 6. Documentation updates

Update:

- `docs/ARCHITECTURE.md` with actual current app structure, stack versions, and deployment topology
- `docs/ROADMAP.md` with Phase 1 status
- `handoff/NEXT_STEPS.md` with the next concrete deployment steps
- `docs/DECISIONS.md` only if a new decision was made

### 7. Validation commands

Run as appropriate:

```bash
npm install
npm run lint
npm run build
```

If any command fails, document:

- exact command
- failure reason
- whether you fixed it
- remaining blocker

## Required GitHub persistence

At the end, commit and push:

```bash
git status
git add .
git commit -m "Polish Phase 1 scaffold and prepare deployment"
git push origin main
```

## Final response required from Claude Code

Provide a concise summary with:

- what changed
- files changed
- commands run
- lint/build status
- deployment readiness
- blockers
- exact next action for the user
