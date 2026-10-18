# TestForge.Ai — Landing Page

Next.js 14 landing page for TestForge.Ai: upload the FSD, get Playwright test
cases a human approves. Tailwind CSS, framer-motion, light/dark theme.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Test

```bash
npm run dev                       # in another terminal:
node test-website.js 3000         # Playwright smoke suite (needs `npx playwright install chromium`)
```

Checks horizontal overflow from 320px to 1440px, console errors, nav/footer
structure, anchors, theme toggle and the mobile menu.

## Production build

```bash
npm run build && npm start
```

## Demo-request API (`POST /api/feedback`)

Accepts JSON `{ name, email, mobile, remarks }` or multipart form data with
an optional `document` file (PDF/DOCX/MD/TXT, ≤ 5 MB). Every submission:

1. Appends a row to `data/feedback.xlsx` locally (OS temp dir on serverless)
2. Forwards the row to a Google Apps Script webhook → Google Sheet
3. Uploads the attached document to Google Drive (via the script's
   `doPost`) and stores the Drive link in the sheet row's Document column

The webhook URL is baked in as a default; `FEEDBACK_WEBHOOK_URL` overrides it.
Apps Script note: `/exec` 302-redirects and drops POST bodies, so the row
travels as GET query params (`doGet`) and the document as a redirect-following
JSON POST with base64 (`doPost` → Drive). The Apps Script must implement both
handlers — see the repo's route comments for the expected script.

## Repo

<https://github.com/Jsuhel/Testforge>
