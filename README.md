This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database (MongoDB)

All persistence is MongoDB via the official Node driver. There are two collections,
both defined in one place: `src/lib/db/schema.ts`.

### Environment

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | Atlas connection string. Server-side only — never prefix with `NEXT_PUBLIC_`. |
| `MONGODB_DB` | Database name. Defaults to `fables_lab`. |
| `CONTACT_HASH_SALT` | Salt used to hash client IPs on contact submissions. |
| `ADMIN_PASSWORD` | Password for `/admin/*`. Rotating it invalidates all admin sessions. |

### Commands

```bash
npm run db:setup    # create collections + $jsonSchema validators + indexes (idempotent)
npm run db:seed     # upsert the portfolio projects from scripts/data/projects-seed.ts
npm run db:verify   # connection, index, validator and round-trip checks
```

Run `db:setup` first — `db:verify` assumes the schema exists.

### Schema

`src/lib/db/schema.ts` is the single source of truth: TypeScript document types,
the `$jsonSchema` validators applied to the live collections, and the index list.

- **`contacts`** — one document per contact-form submission. Public fields are
  `name`, `email`, `project_name`, `architecture_details`; everything else
  (`status`, `source`, `ipHash`, `userAgent`, `dedupeKey`, timestamps) is
  server-owned. `email` is lowercased on write and `ipHash` stores a salted
  SHA-256 rather than a raw IP.
- **`projects`** — one document per portfolio case study, keyed by a unique
  lowercase `slug`. Stored in camelCase; `slug` is unique so re-seeding updates
  in place and preserves `createdAt`.

### Layers

| Path | Role |
| --- | --- |
| `src/lib/mongodb.ts` | Lazy pooled connection singleton (reuses one client across hot reloads). |
| `src/lib/db/schema.ts` | Types + validators + indexes. |
| `src/lib/db/contacts.ts`, `src/lib/db/projects.ts` | Repositories: validation, insert, query. |
| `src/lib/db/serialize.ts` | Documents → JSON, dropping internal fields. |
| `src/app/api/contact/route.ts` | Public write endpoint. |
| `src/app/api/projects/**` | Public read endpoints used by the client pages. |

MongoDB is only reachable from the server, so the client pages fetch through the
`/api` routes rather than holding a connection in the browser.

## Admin

`/admin/inquiries` lists contact submissions (filter by status, search, change
status, delete) and `/admin/projects/new` creates projects. Both are gated by
`src/app/admin/layout.tsx`, which redirects to `/admin/login` unless a valid
signed session cookie is present. Every mutating server action re-checks the
session, so the gate does not rely on the layout alone.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
