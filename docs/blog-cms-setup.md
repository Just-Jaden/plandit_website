# Plandit blog CMS setup

The codebase is ready to publish static, search-friendly blog pages from an invite-only Sanity
Studio at `https://plandit.app/studio`.

## 1. Create the Sanity project

1. Sign in at [sanity.io/manage](https://sanity.io/manage).
2. Create a project named **Plandit Blog**.
3. Create or keep the `production` dataset. A public dataset is appropriate because published blog
   posts are public; drafts still require authentication.
4. Copy the project ID.

## 2. Configure Vercel

In the Plandit Vercel project, open **Settings → Environment Variables** and add these values for
Production, Preview, and Development:

| Variable | Value |
|---|---|
| `SANITY_PROJECT_ID` | The Sanity project ID |
| `SANITY_DATASET` | `production` |
| `SANITY_STUDIO_PROJECT_ID` | The same Sanity project ID |
| `SANITY_STUDIO_DATASET` | `production` |

Redeploy after saving them.

## 3. Allow the Studio domain

In Sanity Manage, open **API → CORS origins** and add:

- `https://plandit.app` with credentials enabled.
- The Vercel preview origin when testing a preview deployment.
- `http://localhost:3333` with credentials enabled for local Studio development.

## 4. Register the self-hosted Studio and schema

After the environment variables are available locally, authenticate and register the Studio:

```sh
npx sanity@latest login
cd studio
npx sanity@latest deploy --external --url https://plandit.app/studio
```

The command registers the externally hosted Studio and deploys the schema. The website itself
continues to deploy through Vercel.

## 5. Invite writers

In Sanity Manage, open the project members area and invite the internal writers who should be able
to create, edit, and publish articles. The Studio application files are public like any web app,
but content access and publishing require an authenticated, invited Sanity account.

## 6. Import the sample article

Create an Editor API token in Sanity Manage, then run this command locally:

```sh
SANITY_PROJECT_ID=your-project-id \
SANITY_DATASET=production \
SANITY_WRITE_TOKEN=your-temporary-token \
npm run seed:blog
```

Delete the token after the import. Never commit it or add it to a public Vercel environment.

## 7. Redeploy whenever an article is published

1. In Vercel, open **Settings → Git → Deploy Hooks**.
2. Create a hook named **Sanity blog publish** for the `main` branch.
3. In Sanity Manage, open **API → Webhooks** and create a webhook:
   - URL: the Vercel Deploy Hook URL.
   - Trigger: Create, Update, and Delete.
   - Filter: `_type == "post"`.
   - Drafts and versions: disabled.
4. Save and enable the webhook.

Sanity ignores draft events by default, so editing does not repeatedly deploy the website.
Publishing, unpublishing, or deleting a post triggers a fresh static build.

## Publishing workflow

1. Visit `https://plandit.app/studio`.
2. Sign in with an invited Sanity account.
3. Create a **Blog post**.
4. Add the title, slug, description, cover image and alt text, author, category, article body, SEO
   fields, and Plandit CTA.
5. Publish the document.
6. The Sanity webhook starts a Vercel deployment.
7. The post appears at `https://plandit.app/blog/{slug}` and is added to the blog index and
   sitemap.

Drafts are available on all plans. Sanity Scheduled Drafts are enabled in the Studio configuration
but require Sanity's Growth plan. On the free tier, publish manually when the article should go
live.
