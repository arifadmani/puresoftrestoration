# Architectural & Strategic Decisions

## Website stack

Approved stack:

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui

Reasoning:

The platform will evolve beyond a static website into:

- claim intake
- CRM
- adjuster portal
- chain of custody workflows
- reporting
- CAT response operations

## Hosting

AWS Ubuntu server.

## Reverse proxy

Use Caddy.

Reasoning:

- simpler TLS management
- lower operational overhead
- easier deployment velocity

## Deployment strategy

Use systemd for the Next.js application.

Docker is optional for infrastructure services like PostgreSQL.

## Database

Use PostgreSQL from the beginning.

Reasoning:

Avoid future migration complexity as claim workflows and CRM functionality expand.

## Email delivery

Use AWS SES.

Reasoning:

- production-grade deliverability
- AWS-native integration
- lower long-term cost
- future automation alignment

## File uploads

Use AWS S3 architecture from the beginning.

Reasoning:

Future workflows will include:

- claim photos
- inventories
- PDFs
- chain-of-custody documentation
- adjuster uploads

## Branding direction

Professional insurance-industry identity.

Avoid:

- consumer dry-cleaner visuals
- playful laundry branding
- coupon aesthetics

Preferred:

- navy/slate/white palette
- restrained enterprise look
- operational credibility

## SEO strategy

Strong local SEO foundation required.

Priority geographies:

- Dallas
- Fort Worth
- Plano
- Frisco
- McKinney
- Denton
- Richardson
- Irving
- Arlington

## Operational philosophy

Pure Soft Restoration should become:

> the North Texas textile restoration authority for insurance claims.
