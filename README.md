# OpenAgent: Contact Workflow App

A full-stack contact workflow application built for the Junior Software Engineer tech test. It provides a **Contact Us** page with a validated form, a **Thank You** confirmation page, and a **Contacts list** page for verifying and removing submissions, backed by a REST API and a PostgreSQL database.

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

## Running the App (Docker, recommended)

This runs the full stack (web + API + database) with a single command.

### Prerequisites

- **Docker Desktop** 4.x or newer (includes Docker Compose v2). Verify with:
  ```bash
  docker --version
  docker compose version
  ```
- Docker Desktop must be running.
- Ports **3000** and **3001** must be free on your machine.

### Steps

1. Clone the repository and move into it:
   ```bash
   git clone <your-repo-url>
   cd OpenAgent_Test
   ```
2. Build the images and start all services:
   ```bash
   docker compose up --build
   ```
   The first run takes a few minutes (it installs dependencies and builds both apps). Later runs are cached and much faster.
3. Wait until the logs show all services ready, for example:
   ```
   api-1  | All migrations have been successfully applied.
   api-1  | API running on http://localhost:3001
   web-1  | ✓ Ready in 40ms
   ```

The database schema is created automatically: on startup the `api` container runs `prisma migrate deploy` before launching, so there is no manual migration step.

### What gets started

| Service | URL                    | Notes                                            |
| ------- | ---------------------- | ------------------------------------------------ |
| web     | http://localhost:3000  | Next.js app (redirects `/` to `/contact-us`)     |
| api     | http://localhost:3001  | NestJS API (routes under `/api`)                 |
| db      | (internal only)        | PostgreSQL 16; data persisted in a named volume  |

### Verify it works

- Open **http://localhost:3000** and you should see the Contact Us page. Submit the form, get redirected to the Thank You page, then see the entry on **http://localhost:3000/contacts**.
- Or test the API directly:
  ```bash
  # Create a contact
  curl -X POST http://localhost:3001/api/contacts \
    -H "Content-Type: application/json" \
    -d '{"firstName":"Alex","lastName":"Yun","email":"alex@example.com","phone":"0412345678","note":"Hello"}'

  # List contacts (newest first)
  curl http://localhost:3001/api/contacts
  ```

### Stop / reset

```bash
# If running in the foreground, press Ctrl+C first, then:
docker compose down          # stop and remove containers, keep the database
docker compose down -v       # also delete the database volume (fresh start)
```

After changing code, rebuild with `docker compose up --build`.

### Troubleshooting

- **Port already in use** (`bind: address already in use`): another process is using 3000 or 3001. Stop it, or remap the published ports in `docker-compose.yml` (for example `"3100:3000"`).
- **Code changes not appearing:** rebuild the images with `docker compose up --build`.
- **Start completely clean:** `docker compose down -v` then `docker compose up --build`.

## Running Locally (without Docker, optional)

Use this if you prefer running the apps directly with Node instead of containers.

### Prerequisites

- **Node.js 20+** and npm 10+ (`node --version`).
- A reachable **PostgreSQL 14+** instance (local install, Docker, or hosted).

### Steps

1. Install dependencies from the repository root (installs both workspaces):
   ```bash
   npm install
   ```
2. Create the API's database connection file. Adjust the URL to match your Postgres (user, password, host, port, database name):
   ```bash
   echo 'DATABASE_URL="postgresql://postgres:postgres@localhost:5432/openagent"' > apps/api/.env
   ```
   Ensure the target database exists (for example `createdb openagent`).
3. Apply migrations and generate the Prisma client:
   ```bash
   cd apps/api
   npx prisma migrate deploy
   npx prisma generate
   cd ../..
   ```
4. Start both apps together (API on :3001, web on :3000):
   ```bash
   npm run dev
   ```
   Or run them in separate terminals:
   ```bash
   npm run dev:api    # NestJS API on http://localhost:3001
   npm run dev:web    # Next.js web on http://localhost:3000
   ```
5. Open **http://localhost:3000**.

By default the web app calls the API at `http://localhost:3001`. To change this, set `NEXT_PUBLIC_API_URL` for the web app, and set `WEB_ORIGIN` on the API to the web app's origin so CORS allows the requests.

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

- **First name / Last name**: required, non-empty.
- **Email**: required, valid email format (also enforced unique at the database level).
- **Phone**: required, must be a valid Australian phone number (`/^(\+?61|0)[2-9]\d{8}$/`).
- **Additional info / Note**: optional.

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
- Contact form with First name, Last name, Email, Phone, and Additional info/Note, with validation (Australian phone format).
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

### Tools Used

- **Claude Code (claude-sonnet-4-6)**: architecture planning, used for pair-programming, debugging, and iterating on the UI.

**What it was used for:**

- **Debugging the Docker build chain**, which surfaced several real issues that were diagnosed and fixed: an incorrect npm registry leaking into `package-lock.json` (regenerated against the public registry), Next.js `output: 'standalone'` monorepo tracing (`outputFileTracingRoot`), a missing `nest-cli.json`/`tsconfig.build.json`, a stale `*.tsbuildinfo` causing `tsc` to skip JS emit in the container, and a missing initial Prisma migration (so the `Contact` table was never created).
- Generated the step-by-step implementation plan
- Wrote initial boilerplate for all components, services, DTOs, and configuration files
- **Implementing and refining the UI** to match the reference design (green brand colour, purple highlight accents, sans-serif font), and small UX details (compact table action buttons, disabled state after verifying, red hover on Delete).
- Cleaning README file (writing style and the structure)

**What I wrote / reviewed / modified myself:**

- Reviewed and approved all architectural decisions (PostgreSQL over SQLite, shadcn/ui, Prisma)
- Selected the technology stack at each decision point
- Reviewed all generated code for correctness, quality, and alignment with requirements
- Fixed file structure and coding patterns
- Ran and manually tested the full application end-to-end
- Walked through and verified understanding of every file before submission

Every change was reviewed and run locally (`docker compose up --build`) before being kept.
```
