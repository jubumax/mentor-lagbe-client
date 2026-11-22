# MentorLagbe

**MentorLagbe** is a Smart Tuition & Mentorship Platform for Bangladesh. Tutors post tuitions, admins
review them, and students find the right tutor, apply, and track every request. Tutors and students can
upgrade to a Pro plan through Stripe.

## Purpose

Help students and parents find a tutor by subject, class level, mode (online or offline) and budget,
and give tutors one place to publish their batches and manage applicants.

## Live URL

- Client: https://mentorlagbe-jubumax.vercel.app
- Server: https://mentorlagbe-server-eight.vercel.app

## Admin credentials

- Email: `admin@mentorlagbe.com`
- Password: `Admin@12345`

Other demo accounts (created by the server's seed script):

| Role    | Email                            | Password        |
| ------- | -------------------------------- | --------------- |
| Tutor   | `rafiq.tutor@mentorlagbe.com`    | `Tutor@12345`   |
| Student | `tasnim.student@mentorlagbe.com` | `Student@12345` |

## Key features

**Public pages**
- Home page with an animated hero and search, latest approved tuitions, a how-it-works guide for
  students and tutors, popular subjects with live platform statistics, testimonials, pricing and a call to action
- Browse Tuitions with server-side search, filters (subject, class level, mode), sorting by fee and pagination
- Tuition Details page with the tutor's profile and a role-aware Apply button (students only)
- Pricing page with Free and Pro plans for tutors and students, and Stripe Checkout
- Custom 404, loading and error pages, light and dark theme

**Authentication**
- Email/password sign up (as a student or a tutor) and sign in with BetterAuth, optional Google sign in
- Navbar shows the signed-in user with a dropdown menu
- Private dashboard routes keep you signed in on reload and send visitors to sign in, then back to the page

**Student dashboard**
- Overview with stats, quick actions and recent applications
- Apply form (phone, preferred schedule, note) with duplicate prevention
- My Applications with status filter and cancel for pending requests

**Tutor dashboard**
- Overview with stats and the free-plan usage
- Post a tuition with banner upload through ImgBB (free plan: 2 posts, Pro: unlimited)
- My Tuitions: edit, close or reopen, delete
- Applicants: view details, accept or reject. Pro students are listed first

**Admin dashboard**
- Overview with platform statistics and a tuition moderation breakdown
- User management: search, filter and change roles
- Tuition moderation: preview, approve, reject, revoke and reinstate
- Transaction history of Stripe payments

**Shared**
- Update profile (name, phone, bio, photo)
- Pro plan purchase with Stripe Checkout and a payment success page that confirms the payment

## Tech stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- BetterAuth client
- Stripe Checkout (hosted by Stripe)

## npm packages used

**Dependencies**

| Package                      | Used for                              |
| ---------------------------- | ------------------------------------- |
| `next`, `react`, `react-dom` | The framework and UI library          |
| `better-auth`                | Sign up, sign in and session handling |
| `sonner`                     | Toast notifications                   |
| `lucide-react`               | Icons                                 |

**Dev dependencies**

| Package                                 | Used for       |
| --------------------------------------- | -------------- |
| `tailwindcss`, `@tailwindcss/turbopack` | Styling        |
| `babel-plugin-react-compiler`           | React Compiler |
| `eslint`, `eslint-config-next`          | Linting        |

Other services: ImgBB (image upload) and Stripe (payments).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The API server must be running too, see the
server repository.

## Environment variables

| Variable                    | What it is                                              |
| --------------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL`       | URL of the API server (default `http://localhost:5000`) |
| `NEXT_PUBLIC_SITE_URL`      | URL of this site (default `http://localhost:3000`)      |
| `NEXT_PUBLIC_IMGBB_API_KEY` | ImgBB key for banner and profile photo uploads          |
| `NEXT_PUBLIC_GOOGLE_AUTH`   | Set to `true` to show the Google sign in button         |

## Scripts

| Command         | What it does                 |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Run the production build     |
| `npm run lint`  | Check the code with ESLint   |

## Project structure

```
src/
  app/
    (public)/     Home, Browse tuitions, Tuition details, Pricing
    (auth)/       Sign in, Sign up
    dashboard/    Student, tutor and admin areas, shared profile
    payment/      Stripe success and cancel pages
  components/     ui, layout, home, tuition, dashboard, forms, pricing, auth
  data/           Static content (navigation, plans, testimonials)
  hooks/          useAuth, useApi, useDebounce, useSignOut
  lib/            API helper with JWT, auth client, validators, formatters
  providers/      Theme, auth and toast providers
```

## Deploy

Deploy to Vercel. Add the environment variables above, with `NEXT_PUBLIC_API_URL` pointing to the
deployed server. The server's `CLIENT_URL` must include this site's address.

---

© 2026 MentorLagbe — [@jubumax](https://www.linkedin.com/in/jubumax) • All rights reserved