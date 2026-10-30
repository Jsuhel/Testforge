# TestForge.Ai — Landing Page

Next.js 14 landing page for TestForge.Ai: upload the FSD, get Playwright test
cases a human approves. The page flow mirrors the LaunchDarkly homepage
(floating nav pill with mega menus, two-line violet hero, glowing email form,
product-widget collage, QA lifecycle strip, workflow-of-execution deck, coverage map,
author/run split, workspace-modules bento, developer cards, resources, FAQ,
demo form) on the neon control-room design system: midnight canvas, carbon
surfaces, voltage-blue CTAs, glow elevation, product UI always shown as white
panels. Behind everything, a fixed layer of three slow-drifting blue glows
(`.bg-drift` in `app/globals.css`, mounted in `app/layout.tsx`) breathes
through every section; it stops under reduced motion. The logo is the
TestForge AI lockup (`components/ui/Logo.tsx`): three indigo test lines
flow in from the left, merge into one point and resolve as an amber
checkmark ("many tests, one pass") beside a lowercase `testforgeai`
wordmark in Inter 500, the icon at 1.8em, the whole lockup linked to `/`.
The favicon is the same mark on a rounded indigo tile (`app/icon.svg`);
apple-touch and legacy rasters regenerate from it via
`scripts/generate-logo-assets.ps1`.

The "Workflow of execution" section (`#how-it-works`) runs the ProjectShowcase
deck (`components/ui/project-showcase.tsx` +
`components/ui/project-showcase-utils/`): one card per execution stage, each
showing a screenshot of that stage's product page (`public/workflow/
stage-0*.png`, six stages from FSD chat to tester assigning; clean white
panels, no window chrome). A card turns itself every five seconds (paused on
hover, off under reduced motion) and visitors can drag the deck with the
cursor to slide between stages. No arrow buttons; the gradient CTA links to
the demo form. The stage cards stay visually flat: no hover or click color
change on them. The section isolates its stacking context so the flipping
cards (z-index 999 + 3D transforms) can never paint above the floating nav
pill.

To regenerate the stage screenshots: `npm run dev`, open `/capture`, and
screenshot each `#stage-0N .mock` frame at deviceScaleFactor 2 (704×320 css,
ratio 2.2 — keep in sync with `imageAspectRatio` in WorkflowShowcase).

## Typography

General Sans, the 21st.dev homepage's signature typeface (free via
Fontshare), self-hosted from `public/fonts/` and declared in
`app/globals.css`; it carries display and body copy site-wide. Inter stays
as the fallback, JetBrains Mono voices technical labels. Cards across the
site share one standard: `rounded-[30px]`, carbon surface, `h-11` violet
icon tile, and an identical hover lift with a 50px blue glow.

The coverage map (`#coverage`) lays out the ten test types the generator
drafts (smoke through performance) plus the traceability chain
REQ → TC → script → run. The workspace bento (`#capabilities`) covers the
remaining modules as text cards: secure database test data, headed execution
with live step monitoring, change-driven regression, k6 performance testing,
defect classification with developer assignment, and reports with analytics.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Test

```bash
npm run build && npm start        # production server in one terminal
node qa-sweep.js 3000             # full Playwright QA sweep
```

The sweep (Playwright, `qa-sweep.js`) covers 67 checks: console cleanliness,
no horizontal overflow from 320px to 1440px, announcement bar, mega-menu nav
(mouse, click and Escape), mobile menu, hero email carry-through, use-case
tabs and auto-advance, platform tour playback, coverage-map taxonomy and
traceability chain, workspace bento and module strip, snippet tabs and
clipboard copy, FAQ accordion, demo-form validation and success path
(network intercepted so no real submission is made), footer, anchors, focus
visibility, reduced-motion behavior, and full-page screenshots.

## Production build

```bash
npm run build && npm start
```

## Demo-request API (`POST /api/feedback`)

The hero email form carries into the demo form (`#start`). Submissions go to
Supabase first (database row + document in storage) and fall back to the API
route, which:

1. Appends a row to `data/feedback.xlsx` locally (OS temp dir on serverless)
2. Forwards the row to a Google Apps Script webhook → Google Sheet
3. Uploads the attached document to Google Drive (via the script's
   `doPost`) and stores the Drive link in the sheet row's Document column

Accepts JSON `{ name, email, mobile, remarks }` or multipart form data with
an optional `document` file (PDF/DOCX/MD/TXT, ≤ 5 MB). The webhook URL is
baked in as a default; `FEEDBACK_WEBHOOK_URL` overrides it. Apps Script
note: `/exec` 302-redirects and drops POST bodies, so the row travels as GET
query params (`doGet`) and the document as a redirect-following JSON POST
with base64 (`doPost` → Drive).

## Repo

<https://github.com/Jsuhel/Testforge>
