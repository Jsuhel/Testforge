// How-it-works probe: walk each step, confirm text/card swap together,
// stay parallel, and the card sidebar only ever shows earned icons.
const { chromium } = require("playwright");

const BASE = `http://localhost:${process.argv[2] || process.env.PORT || 3000}`;

(async () => {
  const browser = await chromium.launch();
  const page = await (
    await browser.newContext({ viewport: { width: 1280, height: 900 } })
  ).newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const rows = [];
  for (let i = 0; i < 5; i++) {
    await page.evaluate((idx) => {
      const d = [...document.querySelectorAll("[data-step-driver]")];
      d[idx].scrollIntoView({ block: "center", behavior: "instant" });
    }, i);
    await page.waitForTimeout(700);
    const r = await page.evaluate(() => {
      const sec = document.getElementById("how-it-works");
      const card = sec.querySelector(".mock");
      const h3 = sec.querySelector("h3");
      const c = card.getBoundingClientRect();
      const t = h3.getBoundingClientRect();
      return {
        step: h3.textContent.trim(),
        icons: card.querySelectorAll("div[title] svg").length,
        placeholders: card.querySelectorAll('[title="Not unlocked yet"]').length,
        cardTop: Math.round(c.top),
        textMid: Math.round(t.top + t.height / 2),
        cardMid: Math.round(c.top + c.height / 2),
      };
    });
    rows.push(r);
  }

  let fail = false;
  const expect = ["Read and discuss the FSD", "Generate and verify test cases", "Automate", "Execute", "Report"];
  rows.forEach((r, i) => {
    const parallel = Math.abs(r.textMid - r.cardMid) < 60;
    const rightStep = r.step === expect[i];
    const rightIcons = r.icons === i + 1;
    const noPlaceholders = r.placeholders === 0;
    const pinned = r.cardTop < 200;
    const good = parallel && rightStep && rightIcons && noPlaceholders && pinned;
    if (!good) fail = true;
    console.log(
      `${good ? "PASS" : "FAIL"}  step ${i + 1}: "${r.step}" icons=${r.icons}/expect ${i + 1} ` +
        `placeholders=${r.placeholders} cardTop=${r.cardTop} textMid=${r.textMid} cardMid=${r.cardMid} delta=${r.textMid - r.cardMid}`
    );
  });
  console.log(fail ? "\nSTEP PROBE FAILED" : "\nSTEP PROBE CLEAN");
  await browser.close();
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error("PROBE ERROR:", e);
  process.exit(1);
});
