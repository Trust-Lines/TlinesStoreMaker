# Work types ("Ceiling fixtures", "Shelving", ...) — task for the ERP developer

Written for: the ERP (marketing module) developer — backend and frontend.

## What it is
Each **project page** on the website shows, to the right of its text, a panel of tiles. Each tile is a *kind of work*
this project covered (Ceiling fixtures, Shelving, Mill-work, Branding, Signage, Furniture). Only the types selected
for that project are shown; a project with none shows no panel. (They are not a filter on the project list.)

Design: Figma node `650:10316` (file `Hyd6eZiztYZxpE7oq7Gczg`, "Tlines Websites"),
reference image: [`supabase/design/work-types-tiles.png`](design/work-types-tiles.png).
Tile: 149 x 149 px rounded-chamfer shape in sage green (#547255), cream icon (77 px) above an uppercase 15 px
Montserrat SemiBold label; 3 columns, 9 px / 11 px gaps (465 px wide).

The website part is done (`src/components/projects/WorkTypeTiles.tsx`, used by `src/app/projects/[slug]/page.tsx`).
What is missing is **ERP data entry**: choosing the types per project, and managing the list of types.

## Database (already written — migration `supabase/migrations/121_web_work_types.sql`)
Apply it after 118–120 (copy into the ERP repo's migrations with the same number, then `supabase db push`).

- `web_work_types` — the list: `slug` (unique, lowercase-dashes, what projects store), `label`, `icon_url`
  (cream icon on a transparent background, SVG or PNG, ImageKit URL; empty = the site's built-in icon for the six
  default slugs), `sort_order`, `is_active`. RLS: public read of active rows; writes need `web_can_edit()`.
  Seeded with the six default rows.
- `web_projects.work_types text[]` — slugs from `web_work_types`. A trigger rejects unknown slugs.
- To retire a type set `is_active = false` rather than deleting it.

## Backend (ERP API, service-role layer — same rules as the other web_* writes)
All routes must call `requireRole` with the existing marketing role list from `lib/marketing/roles.ts` first.

1. **Work types CRUD**: list (incl. inactive), create, update (label, icon, sort order, active), reorder.
   Validate `slug` against `^[a-z0-9]+(-[a-z0-9]+)*$` and uniqueness; generate it from the label on create and do not
   change it afterwards (projects reference it).
2. **Project create/update**: accept `workTypes: string[]`, check every slug exists in `web_work_types` (active), write it
   to `web_projects.work_types`. Return it when a project is read for editing.
3. After any of the above, call the website's `POST /api/revalidate` (see ERP-BRIDGE.md) so the site updates at once.

## Frontend (ERP marketing screens)
1. **Project form** (where projects are created/edited): a "Types of work" multi-select. Show it as the same tile grid as
   the design (icon + label, tap to toggle) so marketing sees what the visitor will see. Zero or more may be selected.
2. **Work types screen** (marketing settings): table/grid of the types with add, rename, upload icon, drag to reorder, and
   an active toggle. Upload icons through the existing ImageKit upload; recommended 77 x 77 px or larger, cream
   (#FFF4E0) on transparent, SVG preferred.
3. Existing projects start with an empty selection; marketing fills them in.

## Acceptance
- Ticking "Shelving" and "Signage" on a project and publishing it shows those two tiles on that project's page (right of the text).
- A project with nothing ticked shows no tile panel.
- Marketing can add a new work type with an icon; it becomes available in the project form and shows as a tile on projects that use it.
- Deactivating a type removes its tile everywhere; projects keep their stored slugs.
