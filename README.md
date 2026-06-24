# OpenAgent — Contact Workflow App

A full-stack contact workflow application built for the Junior Software Engineer tech test. It provides a **Contact Us** page with a validated form, a **Thank You** confirmation page, and a **Contacts list** page for verifying and removing submissions — backed by a REST API and a PostgreSQL database.

## Tech Stack

- **Frontend:** Next.js (App Router) + React + TypeScript, with `react-hook-form` + `zod` for form handling and validation.
- **Backend:** NestJS + TypeScript, with `class-validator` for request validation.
- **Database:** PostgreSQL, accessed via Prisma ORM.
- **Tooling:** npm workspaces (monorepo), Docker / Docker Compose.

## Project Structure

```
.
├── apps/
│   ├── api/                 # NestJS backend
│   │   ├── src/
│   │   │   ├── contacts/     # Contacts module (controller, service, DTOs)
│   │   │   └── prisma/       # Prisma service/module
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/   # SQL migrations (applied on container start)
│   │   └── Dockerfile
│   └── web/                  # Next.js frontend
│       ├── src/
│       │   ├── app/          # Routes: /contact-us, /contacts, /thank-you
│       │   ├── components/    # Layout, contact form, contacts table, UI primitives
│       │   └── lib/          # API client
│       └── Dockerfile
└── docker-compose.yml         # db + api + web
```

## Running the App (Docker — recommended)

**Prerequisites:** Docker Desktop (with Docker Compose).

```bash
docker compose up --build
```

This starts three services:

| Service | URL                    | Notes                                            |
| ------- | ---------------------- | ------------------------------------------------ |
| web     | http://localhost:3000  | Next.js app (redirects `/` → `/contact-us`)      |
| api     | http://localhost:3001  | NestJS API (routes under `/api`)                 |
| db      | (internal)             | PostgreSQL 16; data persisted in a named volume  |

Database migrations are applied automatically when the `api` container starts (`prisma migrate deploy`), so the schema is ready on first boot.

To stop:

```bash
docker compose down          # keep data
docker compose down -v       # also remove the database volume
```

## Running Locally (without Docker — optional)

**Prerequisites:** Node.js 20+, and a running PostgreSQL instance.

```bash
# 1. Install dependencies (root of the monorepo)
npm install

# 2. Point the API at your database
echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/openagent"' > apps/api/.env

# 3. Apply migrations and generate the Prisma client
cd apps/api && npx prisma migrate deploy && npx prisma generate && cd ../..

# 4. Run both apps (api on :3001, web on :3000)
npm run dev
```

By default the web app calls the API at `http://localhost:3001`; override with `NEXT_PUBLIC_API_URL` if needed.

## API

All routes are prefixed with `/api`.

| Method   | Endpoint             | Description                                  |
| -------- | -------------------- | -------------------------------------------- |
| `POST`   | `/api/contacts`      | Create a contact                             |
| `GET`    | `/api/contacts`      | List all contacts, newest first              |
| `PATCH`  | `/api/contacts/:id`  | Update a contact (used to mark as verified)  |
| `DELETE` | `/api/contacts/:id`  | Delete a contact                             |

### Validation

Validation runs server-side (NestJS `ValidationPipe` + `class-validator`) and is mirrored client-side (`zod`):

- **First name / Last name** — required, non-empty.
- **Email** — required, valid email format (also enforced unique at the database level).
- **Phone** — required, must be a valid Australian phone number (`/^(\+?61|0)[2-9]\d{8}$/`).
- **Additional info / Note** — optional.

Unknown fields are rejected (`whitelist` + `forbidNonWhitelisted`).

### Environment Variables

| Variable              | App | Purpose                                            | Default (compose)                  |
| --------------------- | --- | -------------------------------------------------- | ---------------------------------- |
| `DATABASE_URL`        | api | PostgreSQL connection string                       | set in `docker-compose.yml`        |
| `WEB_ORIGIN`          | api | Allowed CORS origin for the frontend               | `http://localhost:3000`            |
| `NEXT_PUBLIC_API_URL` | web | Base URL the browser uses to reach the API         | `http://localhost:3001`            |

## Features / Requirements Coverage

**Contact Us page**

- Company contact details (phone, email, postal address, contact-centre hours), based on the reference image.
- Contact form with First name, Last name, Email, Phone, and Additional info/Note — with validation (Australian phone format).
- On submit the data is saved via the API and the user is redirected to a **Thank You** page that greets them by their first name.

**Contacts list page**

- Lists all contacts, **newest first**.
- **Mark as verified** updates the contact; once verified, the button is disabled.
- **Delete** removes the contact from the list.

All pages share a common header and footer and are responsive.

## Assumptions

- **Phone numbers are Australian.** The form and API both validate against an Australian phone-number pattern, matching the AU-focused reference content.
- **Email is unique.** A duplicate email is rejected at the database level; the form surfaces a generic submission error.
- **Company contact details are static content** taken from the reference image (e.g. phone `13 24 34`, postal address in NSW) and are hard-coded in the Contact Us page rather than coming from the API.
- **"Newest first"** uses `createdAt` descending.
- **Verified is one-way** in the UI: once a contact is marked verified, the action is disabled (no un-verify).
- **Single (development) environment.** Configuration targets local Docker; there is no separate production hardening (secrets, TLS, etc.).
- **Optimistic UI updates** on the contacts page (verify/delete reflect immediately and roll back if the API call fails).

## AI Usage

> Per the brief, this section describes how AI tooling was used. Please review and adjust to reflect your own involvement before submitting.

**Tool used:** Claude Code (Anthropic) — an agentic CLI assistant — used for pair-programming, debugging, and iterating on the UI.

**What it was used for:**

- **Debugging the Docker build chain**, which surfaced several real issues that were diagnosed and fixed: a private npm registry leaking into `package-lock.json` (regenerated against the public registry), Next.js `output: 'standalone'` monorepo tracing (`outputFileTracingRoot`), a missing `nest-cli.json`/`tsconfig.build.json`, a stale `*.tsbuildinfo` causing `tsc` to skip JS emit in the container, and a missing initial Prisma migration (so the `Contact` table was never created).
- **Implementing and refining the UI** to match the reference design (green brand colour, purple highlight accents, sans-serif font), and small UX details (compact table action buttons, disabled state after verifying, red hover on Delete).

**What I wrote / reviewed / modified myself:**

- _(Fill in: e.g. designed the data model and API surface, reviewed and accepted/adjusted each change, verified behaviour by running the stack, etc.)_

Every change was reviewed and run locally (`docker compose up --build`) before being kept.
```
