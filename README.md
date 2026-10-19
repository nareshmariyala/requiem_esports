# NEXUS Clan Portal — starter

A starter gaming clan site built with Next.js, TypeScript, Tailwind CSS, and Supabase. Designed for local testing and Vercel deployment.

## Included

- Public landing page
- Games and squads showcase
- Public leaderboard backed by a read-only Supabase view
- Signup with pending membership status
- Login and member dashboard
- Supabase schema with signup trigger and Row Level Security (RLS)

## 1. Requirements

Install Node.js 20.9 or newer and Git. See the official Next.js installation guide: https://nextjs.org/docs/app/getting-started/installation

## 2. Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

On macOS/Linux, use `cp .env.example .env.local` instead of `copy`.

Open http://localhost:3000.

The site renders without Supabase credentials, but signup/login and live leaderboard require Supabase.

## 3. Configure Supabase

1. Create a project at https://database.new
2. In Project Settings / Connect, copy the project URL and publishable key.
3. Put them in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

4. In Supabase Dashboard > SQL Editor, run all of `supabase/schema.sql`.
5. In Authentication > URL Configuration, set the local site URL to `http://localhost:3000`.
6. If email confirmation is enabled, test the email confirmation flow. You may configure confirmation settings for local testing, but keep appropriate verification enabled for a public site.

Restart `npm run dev` after changing `.env.local`.

## 4. Test

- `/` — public homepage
- `/games` — example game cards
- `/leaderboard` — live results when verified records exist
- `/join` — register a test account
- `/login` — log in
- `/dashboard` — private member view; redirects to login if not signed in

New accounts are created with `membership_status = 'pending'`. The profile is created by a database trigger, so signup does not depend on the browser inserting its own profile.

## 5. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Import that repository at https://vercel.com/new.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel Project Settings > Environment Variables for the environments you need.
4. Deploy.
5. In Supabase Authentication > URL Configuration, add the deployed Vercel URL as a Site URL / allowed redirect URL as appropriate.
6. Test signup, email confirmation, login, logout, and access to `/dashboard`.

Vercel Hobby is intended for personal, non-commercial use. Review Vercel's current plan terms before using it for a public/commercial clan service: https://vercel.com/docs/plans/hobby

## Important security notes

- Never put a Supabase `service_role` key in a `NEXT_PUBLIC_` variable or browser code.
- RLS is enabled in the supplied SQL. The browser has no policy to change membership status or create/verify match scores.
- The admin approval UI, squad membership management, tournament management, and trusted match submission are not implemented yet.
- The leaderboard contains only verified results, and the supplied schema intentionally does not let ordinary users verify their own results.
- This is an MVP starter, not a complete production-ready authorization system. Before opening it to the public, design an admin role and server-side admin actions, add rate limiting/abuse controls, and test RLS policies.

## Customization

- Branding / navigation: `src/app/layout.tsx`
- Homepage: `src/app/page.tsx`
- Games: `src/app/games/page.tsx`
- Leaderboard: `src/app/leaderboard/page.tsx`
- Signup: `src/app/join/page.tsx`
- Supabase schema: `supabase/schema.sql`
