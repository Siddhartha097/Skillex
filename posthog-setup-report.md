<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Skillex TanStack Start application. The following changes were made:

- **`@posthog/react`** and **`posthog-node`** already installed as dependencies
- **`PostHogProvider`** in `src/routes/__root.tsx` wraps the full app, enabling client-side analytics, session replay, and exception capture via `/ingest` reverse proxy
- **`PostHogClerkIdentifier`** component in `src/routes/__root.tsx` automatically calls `posthog.identify()` on sign-in and `posthog.reset()` on sign-out via Clerk's `useUser` hook
- **Reverse proxy** in `vite.config.ts` routing `/ingest/static`, `/ingest/array`, and `/ingest` to EU PostHog endpoints (`eu-assets.i.posthog.com` / `eu.i.posthog.com`)
- **Environment variables** set in `.env`: `VITE_PUBLIC_POSTHOG_PROJECT_TOKEN` and `VITE_PUBLIC_POSTHOG_HOST`
- **`src/utils/posthog-server.ts`** — new singleton server-side PostHog client using `posthog-node` for use in future API routes
- **9 events** instrumented across 5 files, covering skill interactions, homepage CTAs, auth page views, and navbar navigation

| Event | Description | File |
|-------|-------------|------|
| `skill_install_command_copied` | User copies the install command for a skill | `src/components/SkillCard.tsx` |
| `skill_upvoted` | User clicks the upvote button on a skill card | `src/components/SkillCard.tsx` |
| `skill_bookmarked` | User clicks the bookmark/save button on a skill card | `src/components/SkillCard.tsx` |
| `skill_card_opened` | User clicks Open on a skill card | `src/components/SkillCard.tsx` |
| `explore_skills_clicked` | User clicks the Explore Skills CTA on the homepage hero | `src/routes/index.tsx` |
| `publish_skill_clicked` | User clicks the Publish Skill CTA on the homepage hero | `src/routes/index.tsx` |
| `sign_in_page_viewed` | User views the sign-in page — top of the auth funnel | `src/routes/__auth/sign-in.$.tsx` |
| `sign_up_page_viewed` | User views the sign-up page — top of the registration funnel | `src/routes/__auth/sign-up.$.tsx` |
| `navbar_sign_in_clicked` | User clicks the Sign In button in the navbar | `src/components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics dashboard](/dashboard/669792)
- [Auth Conversion Funnel](/insights/e1ZdtRjw) — 2-step funnel from `navbar_sign_in_clicked` to `sign_in_page_viewed`
- [Skill Engagement Trends](/insights/adDtoS4d) — Daily line chart of all 4 skill interaction events
- [Homepage CTA Clicks](/insights/KRMpvaHV) — Explore Skills vs Publish Skill CTA clicks over time
- [Sign-up vs Sign-in Page Views](/insights/XJfoHZ2F) — Top-of-funnel auth page view trends
- [Total Skill Interactions (30 days)](/insights/c0Wt9GVK) — Bold number: combined skill engagement total

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
