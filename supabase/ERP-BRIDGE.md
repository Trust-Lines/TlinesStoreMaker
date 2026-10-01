# ERP <-> website bridge

Content (projects, blog, page headers): the website only **reads**, the ERP marketing screens **write** to Supabase. Contact form and newsletter go the other way, browser to ERP endpoint (last section).

## Setup
1. Apply the migrations in order (all idempotent):
   - `supabase/migrations/118_web_projects.sql`
   - `supabase/migrations/119_web_settings.sql`
   - `supabase/migrations/120_web_blog.sql`
   - `supabase/migrations/121_web_work_types.sql` (project work-type tiles, see `ERP-WORK-TYPES.md`)
   Copy them into the ERP repo's `supabase/migrations/` (same numbers) and run `supabase db push`,
   or paste 118, 119, 120, 121 in order into the Supabase SQL editor.
   `web_can_edit()` allows `marketing_manager`, `general_manager`, `ops_manager` (ERP migration 084);
   `marketing_pr` cannot write.
2. Website env (Vercel + `.env.local`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (same project as the ERP)
   - `REVALIDATE_SECRET` (any long random string)
3. ERP env: the same `REVALIDATE_SECRET` and the website URL.

## ERP write path (ERP repo)
All writes go through the ERP's service-role API layer, which must call `requireRole` with the role
list from `lib/marketing/roles.ts` (the existing marketing list, not a new one) before touching these tables.
RLS is the second line of defence. The website never uses the service-role key.

## Data the ERP writes
`web_projects` — one row per project
| column | example |
|---|---|
| title | `Teddy, Milford` |
| slug | `teddy-milford` (unique, lowercase, dashes) |
| category | `c-store` \| `truck-stops` \| `grocery` |
| location | `Milford, CT, USA` |
| project_type | `C Store Remodel` |
| year_built | `2024` |
| cover_image_url | ImageKit URL (gallery card) |
| is_published | `true` to show on the site |
| sort_order | lower shows first |
| work_types | `{shelving,signage}` (text[] of `web_work_types.slug`; tiles on the project page, see `ERP-WORK-TYPES.md`) |

`web_project_photos` — top carousel, any number: `project_id, image_url, alt, sort_order`

`web_project_sections` — body blocks, any number, ordered by `sort_order`:
`project_id, heading, body, image_url, image_alt, sort_order`
- `image_url` filled → text + photo block (photo side alternates automatically)
- `image_url` null → full-width text block

Images: upload to ImageKit in the ERP and store the resulting `https://ik.imagekit.io/...` URL.
Only `ik.imagekit.io` is allowed (see `next.config.ts`; add another host there if needed).
The site has no hard-coded projects: the gallery, its order (`sort_order`), the category filter counts and every detail page come only from these tables.

## Instant refresh after saving
The site refreshes on its own within 60 s. For instant updates, after saving call:
```
POST https://<website>/api/revalidate
x-revalidate-secret: <REVALIDATE_SECRET>
```

## Page header (hero text + image)
Migration 119 creates it (public read: only hero text and ImageKit URLs, no secrets). The ERP updates one row:
`web_settings` where `key = 'projects_page'`, `value` JSON:
`{ "eyebrow", "heading", "description", "hero_image_url" (ImageKit), "hero_image_alt" }`
Empty description hides the paragraph; empty image falls back to the built-in photo.
Same table will hold the home hero video later (`key = 'home_hero'`).

## Blog & News
Migration 120 creates `web_posts` and `web_post_sections`; the page header is `web_settings` key `blog_page`
(same JSON shape as `projects_page`). `/news` redirects to `/blog`.

`web_posts` — one row per post
| column | example |
|---|---|
| title | `Five ways to plan a c-store remodel` |
| slug | `plan-a-c-store-remodel` (unique, lowercase, dashes) |
| excerpt | short summary: card text and article intro |
| category | `industry-news` | `tips-and-tricks` | `success-stories` | `company-updates` |
| author | `Jane Doe` |
| cover_image_url | ImageKit URL: card image and article hero |
| published_at | date shown; a future date hides the post until then |
| is_published | `true` to show on the site |

`web_post_sections` — article body, any number, ordered by `sort_order`:
`post_id, heading, body, image_url, image_alt, sort_order` (all optional except the ordering; body is plain text, line breaks kept).
Posts are listed newest `published_at` first. Adding a category means changing the check constraint in 120
and `blogCategories` in `src/lib/content.ts`.

## Contact form and newsletter (website -> ERP)
The website posts these straight from the visitor browser to the ERP public endpoint. It does not go through
the website server (the ERP rate limits by visitor IP), and nothing here touches Supabase or service-role keys.

Website env (Vercel + `.env.local`): `NEXT_PUBLIC_WEB_LEADS_URL` = full endpoint URL, e.g.
`https://<ERP-ADDRESS>/api/public/web-leads`. Code: `src/lib/leads.ts`, `ContactForm.tsx`, `NewsletterForm.tsx`.
Because the request is cross-origin, the ERP must answer CORS for the website origin(s) (incl. the OPTIONS
preflight for `Content-Type: application/json`) and for Vercel preview URLs if those are used for testing.

`POST` `Content-Type: application/json`, no auth.

Contact body:
```json
{
  "kind": "contact",
  "name": "Jane Doe", "phone": "+1 555 123 4567", "email": "jane@example.com",
  "company": "Acme Fuel", "storeLocation": "123 Main St, Milford, CT",
  "storeCondition": "New Store",          // "New Store" | "Remodeling"
  "storeType": "C-store",                 // "C-store" | "Truck Stop" | "Grocery" | "Other"
  "consentAccepted": true,
  "consentTextVersion": "2026-09",
  "honeypot": "",                         // hidden input; bots fill it
  "sourcePage": "/contact",
  "utm": { "utm_source": "google" }       // only sent when utm_* params are in the URL
}
```
Newsletter body: `kind: "newsletter"`, `email`, `consentAccepted: true`, `honeypot`, plus `consentTextVersion`,
`sourcePage` and `utm` (the same optional extras as above; the ERP must accept or ignore them).

Responses handled by the site:
| code | site behaviour |
|---|---|
| 201 `{ ok: true }` | success message, form cleared |
| 400 `{ error, errorCode }` | shows `error` in the form |
| 413 | generic error |
| 429 `rate_limited` | "Too many attempts. Please try again in a little while." |
| 500 / network error | "Something went wrong. Please try again." (no mailto fallback; user can retry) |

Consent: the contact form has the required privacy-policy checkbox. The footer newsletter has no checkbox, it shows
"By subscribing you agree to our Privacy Policy" under the field and sends `consentAccepted: true` on submit.
`consentTextVersion` (`CONSENT_TEXT_VERSION` in `src/lib/leads.ts`) must be bumped when the policy wording changes.
The contact form has no message/notes field; if one is added it is sent as `message`.
