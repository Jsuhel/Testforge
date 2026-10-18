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

## Feedback API (`POST /api/feedback`)

Validates `{ name, email, mobile, remarks }` and appends the row to
`data/feedback.xlsx` (created on first submission).

**Deployed on Vercel:** serverless functions have a read-only filesystem, so
the route falls back to the OS temp dir automatically — submissions never
crash, and each row is logged to the function logs
(Vercel → Project → Logs).

For durable storage on Vercel, set this environment variable to any webhook
that accepts a JSON POST (Google Apps Script sheet, Slack incoming webhook,
Zapier catch hook):

```
FEEDBACK_WEBHOOK_URL=https://…
```

Each submission forwards `{ at, name, email, mobile, remarks }` there.

## Repo

<https://github.com/Jsuhel/Testforge>
