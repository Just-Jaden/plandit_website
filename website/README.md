# Plandit production landing page

A responsive, static launch site prepared for `https://plandit.app/`. It can be deployed to Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any basic static host.

## Campaign pages

- `/group-plans/` speaks to the friend who turns group-chat ideas into a concrete, budget-visible plan.
- `/free-window/` speaks to students with a short free window who need a close, time-boxed plan.

Each campaign has email CTAs in the hero and closing section. Formspree stores signups with the
campaign page as the `source`; GA4 records successful signups and errors by page and form location.
Vercel Web Analytics records page-level traffic after it is enabled for the project.

## Preview locally

Run a local server from this folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy (Vercel)

The repo is pre-configured for Vercel with a root-level `vercel.json`: no build step, `website/` is served as the output directory, clean URLs are on, and the legacy `make-plans` / `share-plans` pages 301-redirect to their homepage sections.

1. In Vercel: **Add New → Project → Import** `Just-Jaden/plandit_website`. If the repo is not listed, grant the Vercel GitHub App access: GitHub → Settings → Applications → Installed GitHub Apps → Vercel → Configure → add `plandit_website`.
2. Leave every setting at its default (Framework Preset: Other, Root Directory: `./`, no build command). `vercel.json` handles the rest. Click **Deploy**.
3. Project → Settings → Domains → add `plandit.app` and `www.plandit.app`, then copy the DNS records Vercel shows into the domain registrar.

Production deploys from `main`; every other branch and PR gets a preview URL.

## Waitlist and analytics

The waitlist posts to the Formspree endpoint configured in `config.js`. GA4 uses measurement ID
`G-R1ZGRKW23Z`. In Vercel, open **Project → Analytics** and select **Enable** to activate Vercel
Web Analytics.

## Before launch

- Choose a static host and connect the `plandit.app` DNS records.
- Replace the cropped picnic photo with the original high-resolution source if available.
- Confirm that TikTok/Instagram imports, budgets, routes, and group sharing match the launch product.
