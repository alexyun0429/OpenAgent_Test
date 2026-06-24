# OpenAgent

Monorepo scaffold for a contact workflow application with a NestJS API and a Next.js frontend.

## Structure

- `apps/api`: Nest-style backend with Prisma schema and contacts module skeleton.
- `apps/web`: Next.js App Router frontend with contact form, thank-you page, and contacts table.
- `docker-compose.yml`: Local Postgres, API, and web composition.

## Getting Started

1. Run `npm install` at the repository root.
2. Create a Prisma client in `apps/api` with `npx prisma generate`.
3. Start the workspace with `npm run dev` or use `npm run docker:up`.

## Notes

- No global CLIs are required; use workspace scripts or `npx`.
- This scaffold is intentionally minimal so later feature work can refine it without undoing generated boilerplate.