// Senior-QA sweep: interactive behaviors, animation loop, a11y basics.
const { chromium } = require("playwright");

const BASE = `http://localhost:${process.argv[2] || process.env.PORT || 3000}`;
const results = [];
const ok = (pass, msg, detail = "") =>
  results.push(`${pass ? "PASS" : "FAIL"}  ${msg}${detail ? " — " + detail : ""}`);

(async () => {
  const browser = await chromium.launch();
  const page = await (
    await browser.newContext({ viewport: { width: 1280, height: 900 } })
  ).newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 100)));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 100)); });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  // --- 2a. Focus visibility (keyboard Tab; first Tab hits the skip link) ---
  await page.evaluate(() => document.activeElement?.blur());
  let outline = "never-focused";
  for (let t = 0; t < 8; t++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(80);
    const onLogo = await page.evaluate(() =>
      document.activeElement?.matches('header a[aria-label^="TestForge"]'),
    );
    if (onLogo) {
      outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
      break;
    }
  }
  ok(outline !== "none" && outline !== "never-focused", "logo link has visible keyboard focus outline", outline);

  // --- 1. Typing animation loops ---
  const samples = [];
  for (const at of [500, 2500, 4500, 7000]) {
    await page.waitForTimeout(at - (samples.at(-1)?.at ?? 0) || 0);
    const text = await page.locator("[data-typing-inner]").evaluate((el) => el.textContent.length);
    samples.push({ at, len: text });
  }
  const lens = samples.map((s) => s.len);
  const grew = lens[1] > lens[0];
  const changedAfterFull = new Set(lens.slice(2)).size > 1 || lens[3] !== lens[1];
  ok(grew, "typing animation types", JSON.stringify(samples.map((s) => `${s.at}ms:${s.len}`)));
  ok(changedAfterFull, "typing animation LOOPS (does not stop at full text)");
  const finalLen = await page.locator("[data-typing-inner]").evaluate((el) => el.textContent.length);
  ok(finalLen <= 46, "typing box never exceeds text length", `len=${finalLen}`);
  const boxR = await page.locator("[data-typing-box]").boundingBox();
  const innerW = await page.locator("[data-typing-inner]").evaluate((el) => el.scrollWidth);
  ok(innerW - (boxR?.width ?? 0) < 400, "typing overflow contained (no reflow)", `inner=${innerW}px box=${Math.round(boxR?.width ?? 0)}px`);

  // --- 2. Hero sidebar icons all present ---
  const heroIcons = await page.evaluate(() => {
    const mock = document.querySelector(".mock");
    const slots = mock.querySelectorAll(".flex.h-8.w-8, [class*='h-8'][class*='w-8']");
    const svgs = mock.querySelectorAll("div[title] svg");
    return { titled: mock.querySelectorAll("div[title]").length, withIcon: svgs.length };
  });
  ok(heroIcons.titled === 5 && heroIcons.withIcon === 5, "hero sidebar: all 5 icons render", JSON.stringify(heroIcons));

  // --- 3. All images load (scroll through the page so lazy images load) ---
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page
    .waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0), undefined, { timeout: 8000 })
    .catch(() => {});
  const imgs = await page.evaluate(() =>
    [...document.images].map((i) => ({
      src: (i.currentSrc || i.src).split("/").pop(),
      ok: i.complete && i.naturalWidth > 0,
    })),
  );
  ok(imgs.every((i) => i.ok), "all images loaded", imgs.filter((i) => !i.ok).map((i) => i.src).join(",") || `${imgs.length} ok`);

  // --- 4. FAQ accordion works ---
  const faqButtons = await page.locator("#faq button, #faq summary").all();
  if (faqButtons.length) {
    const before = await faqButtons[0].evaluate((el) => {
      const panel = el.getAttribute("aria-controls") ? document.getElementById(el.getAttribute("aria-controls")) : el.nextElementSibling;
      return panel ? panel.getBoundingClientRect().height : -1;
    });
    await faqButtons[0].click();
    await page.waitForTimeout(400);
    const after = await faqButtons[0].evaluate((el) => {
      const panel = el.getAttribute("aria-controls") ? document.getElementById(el.getAttribute("aria-controls")) : el.nextElementSibling;
      return panel ? panel.getBoundingClientRect().height : -1;
    });
    ok(after !== before, "FAQ first question toggles", `h ${Math.round(before)} → ${Math.round(after)}`);
  } else ok(false, "FAQ has no interactive questions", "none found");

  // --- 5. Buttons/links have accessible names ---
  const unnamed = await page.evaluate(() =>
    [...document.querySelectorAll("button, a")]
      .filter((el) => !(el.getAttribute("aria-label") || el.textContent?.trim() || el.querySelector("img[alt]:not([alt=''])")))
      .map((el) => el.tagName + (el.className ? "." + String(el.className).split(" ")[0] : "")),
  );
  ok(unnamed.length === 0, "all buttons/links have accessible names", unnamed.slice(0, 3).join(", ") || "clean");

  // --- 6. Theme toggle persists ---
  await page.click('button[aria-label*="dark theme"]');
  await page.waitForTimeout(300);
  await page.reload({ waitUntil: "networkidle" });
  const themeAfterReload = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
  ok(themeAfterReload === "dark", "dark theme persists across reload", themeAfterReload);
  await page.click('button[aria-label*="light theme"]');

  // --- 7. Form validation messages ---
  await page.locator("#start").scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);
  const valErrors = await page.evaluate(() => document.querySelectorAll("#start [role=alert]").length);
  ok(valErrors >= 2, "empty form shows inline validation errors", `${valErrors} messages`);


  ok(errors.length === 0, "zero console/page errors", errors.slice(0, 3).join(" | ") || "clean");

  await browser.close();
  console.log(results.join("\n"));
  console.log(results.some((r) => r.startsWith("FAIL")) ? "\nSOME CHECKS FAILED" : "\nQA SWEEP CLEAN");
})().catch((e) => { console.error("SWEEP ERROR:", e); process.exit(1); });
