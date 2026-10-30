/*
 * TestForge QA sweep: full Playwright pass over the LaunchDarkly-style flow.
 *
 *   npm start            # (or npm run dev) in one terminal
 *   node qa-sweep.js 3000
 *
 * Covers: console cleanliness, horizontal overflow 320-1440, announcement
 * bar, mega-menu nav (mouse + keyboard), mobile menu, hero email carry,
 * use-case workflow deck (autoplay, drag
 * to slide, CTA), snippet tabs and clipboard copy, FAQ accordion, demo
 * form validation and success path (network intercepted), footer, anchors,
 * and screenshots.
 */
const { chromium } = require("playwright");

const BASE = `http://localhost:${process.argv[2] || process.env.PORT || 3000}`;
const results = [];
const ok = (pass, msg, detail = "") =>
  results.push(`${pass ? "PASS" : "FAIL"}  ${msg}${detail ? ` — ${detail}` : ""}`);

const ANCHORS = [
  "#top", "#how-it-works", "#coverage", "#platform", "#capabilities",
  "#developers", "#resources", "#faq", "#start",
];

// smooth scrolling means scrollIntoView keeps gliding for a moment;
// wait until the page stops moving before measuring geometry
async function settle(pg) {
  await pg.waitForFunction(
    () => new Promise((res) => {
      const y = window.scrollY;
      setTimeout(() => res(window.scrollY === y), 250);
    }),
  );
  await pg.waitForTimeout(200);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await ctx.newPage();

  const consoleErrors = [];
  const badResponses = [];
  page.on("pageerror", (e) => consoleErrors.push(`pageerror: ${String(e).slice(0, 140)}`));
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`console: ${m.text().slice(0, 140)}`);
  });
  page.on("response", (r) => {
    const u = r.url();
    if (u.startsWith(BASE) && r.status() >= 400 && !u.includes("/api/feedback")) {
      badResponses.push(`${r.status()} ${u.replace(BASE, "")}`);
    }
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  /* ------------------------------------------------ structure + console */
  const h1 = await page.locator("h1").first().textContent();
  ok(Boolean(h1 && h1.includes("Test at AI speed")), "H1 has the two-line hero message", (h1 ?? "").trim().slice(0, 60));
  ok(Boolean(h1 && h1.includes("You stay in control.")), "H1 keeps its second line with real spaces for screen readers");
  ok((await page.locator("h1 .text-signal-flow").count()) === 1, "second hero line carries the flowing gradient");
  const h1Words = await page.locator("h1 > span").count();
  ok(h1Words >= 5, "hero line 1 animates word by word as motion spans", `spans=${h1Words}`);
  const subWords = await page.locator("h1 + p span.inline-block").count();
  ok(subWords >= 20, "hero subline animates word by word", `spans=${subWords}`);

  const missing = await page.evaluate((anchors) =>
    anchors.filter((a) => !document.querySelector(a)), ANCHORS);
  ok(missing.length === 0, "every internal anchor resolves", missing.join(", ") || "all present");

  const widgetCount = await page.locator("[data-testid=hero-collage] .mock").count();
  ok(widgetCount === 4, "hero collage shows the four product widgets", `count=${widgetCount}`);

  ok((await page.locator("[data-testid=logo-strip]").count()) === 1, "QA lifecycle strip renders");
  const stripText = await page.locator("[data-testid=logo-strip]").textContent();
  ok(/Playwright/.test(stripText) && /Regression/.test(stripText) && /Boundary/.test(stripText), "marquee lists QA lifecycle phrases, not team or vendor logos", stripText.slice(0, 60));

  /* ------------------------------------------- ambient drift background */
  ok((await page.locator(".bg-drift").count()) === 1, "ambient drift layer renders behind the page");
  const driftProbe = await page.evaluate(async () => {
    const layer = document.querySelector(".bg-drift");
    const blob = layer.querySelector("span");
    const covers = layer.getBoundingClientRect().width === document.documentElement.clientWidth;
    const tx = () => {
      const m = getComputedStyle(blob).transform.match(/matrix\(([^)]+)\)/);
      return m ? m[1].split(",").map(Number).slice(4) : [0, 0];
    };
    const a = tx();
    await new Promise((res) => setTimeout(res, 1500));
    const b = tx();
    const dist = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return { covers, distPx: Math.round(dist) };
  });
  ok(driftProbe.covers, "drift layer spans the full viewport");
  ok(driftProbe.distPx >= 4, "drift glows visibly drift (≥4px per 1.5s), never stuck", `${driftProbe.distPx}px`);
  const howBg = await page.evaluate(() => getComputedStyle(document.querySelector("#how-it-works")).backgroundColor);
  ok(howBg === "rgba(0, 0, 0, 0)", "workflow section lets the drift show through", howBg);

  /* ---------------------------------------------- keyboard focus visibility
     Runs on the fresh load: Tab starts from the document top, so the first
     stops are skip link → announcement → logo. */
  let outline = "never-focused";
  for (let t = 0; t < 8; t++) {
    await page.keyboard.press("Tab");
    await page.waitForTimeout(60);
    const onLogo = await page.evaluate(() =>
      document.activeElement?.matches('header a[aria-label^="TestForge"]'));
    if (onLogo) {
      outline = await page.evaluate(() => getComputedStyle(document.activeElement).outlineStyle);
      break;
    }
  }
  ok(outline !== "none" && outline !== "never-focused", "logo link has visible keyboard focus", outline);
  await page.evaluate(() => document.activeElement?.blur());

  /* ------------------------------------------------------- announcement */
  const bar = page.locator("[data-testid=announcement]");
  ok(await bar.isVisible(), "announcement bar visible");
  await bar.getByRole("button", { name: "Dismiss announcement" }).click();
  ok(!(await bar.isVisible().catch(() => false)), "announcement bar dismisses");

  /* ------------------------------------------------ nav pill mega menus */
  for (const label of ["Platform", "Solutions", "Resources"]) {
    const btn = page.locator("header nav button", { hasText: label }).first();
    await btn.click();
    const panel = page.locator(`[data-testid=nav-panel-${label}]`);
    const open = await panel.isVisible();
    const items = open ? await panel.locator("a").count() : 0;
    ok(open && items >= 2, `nav "${label}" opens a mega panel with items`, `items=${items}`);
    // every dropdown link points at a live anchor or the GitHub repo
    const hrefs = open ? await panel.locator("a").evaluateAll((as) => as.map((a) => a.getAttribute("href"))) : [];
    const dead = hrefs.filter((h) => h && h.startsWith("#") && !ANCHORS.includes(h) && !h.startsWith("mailto") && !h.startsWith("http"));
    ok(dead.length === 0, `nav "${label}" links resolve`, dead.join(", ") || "ok");
    await page.keyboard.press("Escape");
    ok(!(await panel.isVisible().catch(() => false)), `nav "${label}" closes on Escape`);
  }

  // the Developers menu is gone from the nav bar, by request
  ok((await page.locator("header nav button", { hasText: "Developers" }).count()) === 0, "Developers menu removed from the nav bar");

  // hover opens too
  await page.locator("header nav button", { hasText: "Platform" }).first().hover();
  await page.waitForTimeout(250);
  ok(await page.locator("[data-testid=nav-panel-Platform]").isVisible(), "nav opens on hover");
  // move to a point the centered mega panel cannot reach (far left, low)
  await page.mouse.move(30, 700);
  await page.waitForTimeout(400);
  const closedAfterMove = !(await page.locator("[data-testid=nav-panel-Platform]").isVisible().catch(() => false));
  ok(closedAfterMove, "nav closes on outside click/move");
  // deterministic hygiene: if the tall panel still hangs open (pointer
  // landed inside it), force it shut so later clicks are never obscured
  if (!closedAfterMove) await page.keyboard.press("Escape");

  /* ------------------------------------------------------ hero email carry */
  await page.fill("#hero-email", "interviewer@bank.com");
  await page.locator("[data-testid=hero-form] button").click();
  await page.waitForTimeout(900);
  const carried = await page.inputValue("#fb-email").catch(() => "");
  ok(carried === "interviewer@bank.com", "hero email carries into the demo form", carried);
  const startVisible = await page.evaluate(() => {
    const r = document.querySelector("#start")?.getBoundingClientRect();
    return Boolean(r && r.top < window.innerHeight);
  });
  ok(startVisible, "hero submit scrolls to the demo form");

  /* -------------------------------------------------- workflow execution deck */
  await page.evaluate(() => {
    document.querySelector("#how-it-works")?.scrollIntoView({ block: "center" });
  });
  await settle(page);
  await page.mouse.move(10, 10);

  const STAGE_NAMES = ["FSD chat", "Test cases", "Automation", "Execution", "Report", "Tester assigning"];
  const deckCards = await page.locator("[data-testid=showcase-deck] img").count();
  ok(deckCards === 6, "workflow deck stacks the six stage cards", `cards=${deckCards}`);

  // the card images are the real stage screenshots and they actually decode
  const loaded = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid=showcase-deck] img")]
      .filter((i) => i.complete && i.naturalWidth > 500).length);
  ok(loaded === 6, "all six stage screenshots load at full resolution", `loaded=${loaded}`);

  // during a flip the exiting caption briefly shares the DOM with the
  // entering one (AnimatePresence exit), so a single read can catch the
  // stale node. Poll until two reads 250ms apart agree — only the settled
  // caption is stable, so the flip order assertions stop racing.
  const captionName = () =>
    page.locator("[data-testid=showcase-caption] h3").last().textContent();
  const rawStageNum = async () => {
    const d = await page.evaluate(() =>
      [...document.querySelectorAll("[data-testid=showcase-caption] p")]
        .map((p) => p.textContent)
        .filter((t) => /Stage 0\d/.test(t))
        .pop());
    return Number((d ?? "").match(/Stage 0(\d)/)?.[1] ?? 0);
  };
  const stageNum = async () => {
    let prev = -1;
    for (let i = 0; i < 10; i++) {
      const cur = await rawStageNum();
      if (cur === prev && cur > 0) return cur;
      prev = cur;
      await page.waitForTimeout(250);
    }
    return prev;
  };
  const caption = await captionName();
  // autoplay has been alive since page load, so any stage may be showing
  ok(STAGE_NAMES.some((n) => caption.includes(n)), "caption shows an execution stage", caption);

  const blurWords = await page.locator("[data-testid=showcase-caption] p span").count();
  ok(blurWords >= 15, "caption words render as blur-in animation spans", `words=${blurWords}`);

  const workflow = page.locator("[data-testid=workflow-showcase]");
  const arrowCount = await workflow.locator("[data-halomot-button]").evaluateAll((els) =>
    els.filter((el) => el.textContent?.match(/^(Previous|Next)$/)).length);
  ok(arrowCount === 0, "arrow buttons are gone from the workflow deck", `count=${arrowCount}`);

  // stage cards stay visually flat: no hover or click color change on them
  const flatCard = "#how-it-works .project-showcase-image-container";
  const flatBefore = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).backgroundColor, flatCard);
  await page.hover(flatCard);
  await page.waitForTimeout(400);
  const flatAfter = await page.evaluate((sel) => getComputedStyle(document.querySelector(sel)).backgroundColor, flatCard);
  ok(flatBefore === flatAfter, "workflow stage cards show no hover color change", `${flatBefore} → ${flatAfter}`);
  await page.mouse.move(30, 700); // leave the deck so autoplay resumes

  // autoplay: measure the actual inter-flip cadence. A fixed before/after
  // window races the interval's arbitrary phase (a 5.8s window can hold
  // one OR two flips), so timestamp consecutive flips directly instead.
  const flipTimes = await page.evaluate(() => new Promise((resolve) => {
    const t0 = performance.now();
    const times = [];
    let last = null;
    const read = () =>
      [...document.querySelectorAll("[data-testid=showcase-caption] p")]
        .map((p) => p.textContent)
        .filter((t) => /Stage 0\d/.test(t))
        .map((t) => Number(t.match(/Stage 0(\d)/)[1]))
        .pop();
    const tick = () => {
      const cur = read();
      if (cur !== last) {
        if (last !== null) times.push(Math.round(performance.now() - t0));
        last = cur;
      }
      if (performance.now() - t0 < 11500) setTimeout(tick, 80);
      else resolve(times);
    };
    tick();
  }));
  const gaps = flipTimes.slice(1).map((t, i) => t - flipTimes[i]);
  ok(gaps.length >= 1 && gaps.every((g) => g >= 4600 && g <= 5400),
    "deck auto-advances on a five-second cadence", gaps.join(", ") + "ms");

  // drag the deck with the cursor to slide to the next stage
  const deckBox = await page.locator("[data-testid=showcase-deck]").boundingBox();
  if (deckBox) {
    const beforeDrag = await stageNum();
    const cx = deckBox.x + deckBox.width / 2;
    const cy = deckBox.y + deckBox.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 150, cy, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(700);
    const afterDrag = await stageNum();
    ok(afterDrag === (beforeDrag % 6) + 1, "dragging the deck slides to the next stage", `${beforeDrag} → ${afterDrag}`);
  } else {
    ok(false, "dragging the deck slides to the next stage", "deck not visible");
  }

  const demoBtn = workflow.locator('[data-halomot-button][href="#start"]');
  ok((await demoBtn.count()) === 1 && (await demoBtn.textContent())?.includes("Request a demo"),
    "gradient CTA links to the demo form");

  /* ------------------------------------------- nav overlap during deck flips
     The flipping cards carry z-index 999 + 3D transforms; the workflow
     section isolates its stacking context so they can never paint above
                 the floating nav pill. Sample the nav's center for ~5.5s
     (at least one autoplay flip) and count intrusions. */
  await page.evaluate(() => {
    document.querySelector("[data-testid=showcase-deck]")?.scrollIntoView({ block: "start" });
  });
  await settle(page);
  const intrusions = await page.evaluate(async () => {
    const header = document.querySelector("header");
    const r = header.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    let overNav = 0;
    for (let i = 0; i < 110; i++) {
      const el = document.elementFromPoint(x, y);
      if (el && !header.contains(el)) overNav++;
      await new Promise((res) => setTimeout(res, 50));
    }
    return overNav;
  });
  ok(intrusions === 0, "flipping deck cards never cover the floating nav", `intrusions=${intrusions}`);

  /* ------------------------------------------------------- product split */
  const checkItems = await page.locator("#platform article li").count();
  ok(checkItems === 12, "Author/Run cards expose the full feature checklist", `items=${checkItems}`);

  /* ------------------------------------------------------ coverage map */
  await page.evaluate(() => {
    document.querySelector("#coverage")?.scrollIntoView({ block: "center" });
  });
  await settle(page);
  const tiles = await page.locator("#coverage [data-testid^=coverage-tile-]").count();
  ok(tiles === 10, "coverage map lays out all ten test types", `tiles=${tiles}`);
  const tileNames = await page.locator("#coverage [data-testid^=coverage-tile-] h3").evaluateAll((hs) => hs.map((h) => h.textContent.trim()));
  const expectedTypes = ["Smoke", "Functional", "Positive & negative", "Boundary & equivalence", "End-to-end", "Integration", "Regression", "Database validation", "Security checks", "Performance"];
  ok(JSON.stringify(tileNames) === JSON.stringify(expectedTypes), "coverage tiles match the plan's test taxonomy", tileNames.join(" · ").slice(0, 80));
  const chainNodes = await page.locator("#coverage [data-testid=trace-chain] .font-mono.text-violet").count();
  ok(chainNodes === 4, "traceability chain links requirement, case, script and run", `nodes=${chainNodes}`);
  const chainIds = await page.locator("#coverage [data-testid=trace-chain] .font-mono.text-violet").evaluateAll((ps) => ps.map((p) => p.textContent.trim()));
  ok(chainIds[0] === "REQ-042" && chainIds[3] === "RUN #48", "chain runs REQ to RUN in order", chainIds.join(" → "));
  await page.hover('[data-testid=coverage-tile-4] button');
  await page.waitForTimeout(300);
  const detailText = await page.locator("[data-testid=coverage-detail]").textContent();
  ok(
    /Boundary & equivalence/.test(detailText) && /Edges and partitions/.test(detailText),
    "coverage wheel: hovering a node surfaces its detail",
    detailText.trim().slice(0, 50),
  );

  /* ------------------------------------------- capabilities bento + modules */
  await page.evaluate(() => {
    document.querySelector("#capabilities")?.scrollIntoView({ block: "start" });
  });
  await settle(page);
  const cards = await page.locator("#capabilities [data-testid^=capability-card-]").count();
  ok(cards === 6, "workspace bento shows the six modules", `cards=${cards}`);
  const cardTitles = await page.locator("#capabilities article h3").evaluateAll((hs) => hs.map((h) => h.textContent.trim()));
  const moduleThemes = ["Test data", "every step", "Regression", "Load", "Failures", "Reports"];
  const missingTheme = moduleThemes.filter((t) => !cardTitles.some((c) => c.includes(t)));
  ok(missingTheme.length === 0, "bento covers data, execution, regression, load, defects and reports", missingTheme.join(", ") || "all six");
  const mocksInBento = await page.locator("#capabilities .mock, #capabilities img").count();
  ok(mocksInBento === 0, "bento cards are text-only, no embedded images", `mocks=${mocksInBento}`);
  const moduleChips = await page.locator("#capabilities [data-testid=module-strip] .chip").count();
  ok(moduleChips === 13, "module strip lists the thirteen workspace modules", `chips=${moduleChips}`);
  await page.click('[data-testid=capability-tab-4]');
  await page.waitForTimeout(200);
  const activePanel = await page.locator("#capabilities article:not([hidden]) h3").textContent();
  ok(/Load/.test(activePanel ?? ""), "workspace spec sheet: the rail switches the module panel", (activePanel ?? "").trim());
  const faqCount = await page.locator("#faq li").count();
  ok(faqCount === 7, "FAQ carries seven answers", `items=${faqCount}`);

  /* ------------------------------------------------ resource index rows */
  const rows = await page.locator("[data-testid=resource-index] > li").count();
  ok(rows === 3, "resources render as a three-row editorial index", `rows=${rows}`);
  const rowRadius = await page
    .locator("[data-testid=resource-row-1]")
    .evaluate((a) => getComputedStyle(a).borderRadius);
  ok(rowRadius === "0px", "resource rows sit on hairlines, not card chrome", rowRadius);

  /* ------------------------------------------------ developer snippet card */
  const before = await page.locator("[data-testid=snippet-code]").textContent();
  await page.locator("[data-testid=snippet-tab-cli]").click();
  const after = await page.locator("[data-testid=snippet-code]").textContent();
  ok(before !== after && after.includes("testforge init"), "snippet tabs switch code", after.trim().slice(0, 50));
  await page.locator("[data-testid=snippet-copy]").click();
  await page.waitForTimeout(200);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  ok(clip.includes("testforge init"), "copy button writes the snippet to the clipboard", clip.slice(0, 40));

  /* --------------------------------------------------------------- FAQ */
  const faqBtn = page.locator("#faq button").nth(1);
  await faqBtn.scrollIntoViewIfNeeded();
  const panel1 = page.locator("#faq-panel-1");
  ok(await panel1.isHidden(), "FAQ item 2 starts collapsed");
  await faqBtn.click();
  ok(await panel1.isVisible(), "FAQ item 2 expands on click");
  ok((await faqBtn.getAttribute("aria-expanded")) === "true", "FAQ button reports aria-expanded");

  /* ------------------------------------------- demo form: validation + success */
  await page.evaluate(() => document.querySelector("#start")?.scrollIntoView());
  await page.waitForTimeout(600);
  await page.fill("#fb-name", "A");
  await page.fill("#fb-email", "not-an-email");
  await page.fill("#fb-mobile", "123");
  await page.locator("#start button[type=submit]").click();
  await page.waitForTimeout(400);
  const alerts = await page.locator('#start [role="alert"]').count();
  ok(alerts >= 2, "demo form blocks bad input with field errors", `alerts=${alerts}`);

  // deterministic success: intercept both backends so the test never
  // touches real storage (Supabase is the primary path, the API route the
  // fallback)
  await page.route("**/rest/v1/demo_requests*", (route) =>
    route.fulfill({ status: 201, contentType: "application/json", body: "[]" }));
  await page.route("**/rest/v1/*", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "[]" }));
  await page.route("**/storage/v1/object/**", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ Key: "demo/test" }) }));
  await page.route("**/api/feedback", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }));
  await page.fill("#fb-name", "Interviewer");
  await page.fill("#fb-email", "interviewer@bank.com");
  await page.fill("#fb-mobile", "+971 50 123 4567");
  await page.fill("#fb-remarks", "FSD-to-Playwright walkthrough, please.");
  await page.locator("#start button[type=submit]").click();
  await page.waitForTimeout(800);
  const thanks = await page.locator("#start").getByText("Thanks").isVisible().catch(() => false);
  ok(thanks, "demo form completes to the success state");

  /* -------------------------------------------------------------- footer */
  ok((await page.locator("footer").count()) === 1, "footer renders");
  const tileSvgs = await page.locator("footer > div:first-child svg").count();
  ok(tileSvgs === 4, "footer tiles carry only their arrows, no star icons", `svgs=${tileSvgs}`);
  const gh = await page.locator('footer a[href^="https://github.com"]').count();
  ok(gh >= 2, "footer links to the GitHub source", `links=${gh}`);

  /* ------------------------------------------------- overflow 320 → 1440 */
  const overflowWidths = [];
  for (const width of [320, 375, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(350);
    const over = await page.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth - d.clientWidth;
    });
    if (over > 1) overflowWidths.push(`${width}px:+${over}`);
  }
  ok(overflowWidths.length === 0, "no horizontal overflow from 320 to 1440", overflowWidths.join(", ") || "clean");

  /* ------------------------------------------------------- mobile menu */
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator('header button[aria-controls="mobile-menu"]').click();
  ok(await page.locator("[data-testid=mobile-menu]").isVisible(), "mobile menu opens");
  const mobLinks = await page.locator("[data-testid=mobile-menu] a").count();
  ok(mobLinks >= 5, "mobile menu lists navigation links", `links=${mobLinks}`);
  // expand a collapsed section, then follow its link
  await page.locator('[data-testid=mobile-menu] details summary', { hasText: "Resources" }).click();
  await page.waitForTimeout(250);
  await page.locator('[data-testid=mobile-menu] details[open] a[href="#start"]').first().click();
  await page.waitForTimeout(700);
  ok(!(await page.locator("[data-testid=mobile-menu]").isVisible().catch(() => false)), "choosing a link closes the mobile menu");

  /* ------------------------------------------------------ reduced motion */
  const rmCtx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
  const rmPage = await rmCtx.newPage();
  await rmPage.goto(BASE, { waitUntil: "networkidle" });
  await rmPage.evaluate(() => {
    document.querySelector("#how-it-works")?.scrollIntoView({ block: "center" });
  });
  const rmPilot = await rmPage.locator("[data-testid=showcase-caption] h3").last().textContent();
  await rmPage.waitForTimeout(5800);
  const rmPilotAfter = await rmPage.locator("[data-testid=showcase-caption] h3").last().textContent();
  ok(rmPilot === rmPilotAfter, "reduced motion: workflow deck does not autoplay", rmPilotAfter);
  await rmCtx.close();

  /* --------------------------------------------------------- screenshots */
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);
  await page.screenshot({ path: "qa-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "qa-mobile.png", fullPage: true });

  /* ------------------------------------------------------------- summary */
  ok(consoleErrors.length === 0, "zero console/page errors", consoleErrors.slice(0, 4).join(" | "));
  ok(badResponses.length === 0, "no 4xx/5xx on site resources", badResponses.slice(0, 4).join(" | "));

  await browser.close();

  const fails = results.filter((r) => r.startsWith("FAIL"));
  console.log(results.join("\n"));
  console.log(`\n${results.length - fails.length}/${results.length} checks passed`);
  if (fails.length) {
    console.log("\nFAILURES:\n" + fails.join("\n"));
    process.exit(1);
  }
})().catch((e) => {
  console.error("SWEEP CRASHED:", e);
  process.exit(1);
});
