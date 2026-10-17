// Full website test: responsiveness, overflow, console errors, nav/footer lockup,
// dark theme, mobile menu, anchors, hover. Outputs a readable report.
const { chromium } = require("playwright");

const BASE = `http://localhost:${process.argv[2] || process.env.PORT || 3000}`;
const VIEWPORTS = [
  { name: "xs-320", width: 320, height: 700 },
  { name: "mobile-375", width: 375, height: 800 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1280", width: 1280, height: 900 },
  { name: "wide-1440", width: 1440, height: 900 },
];

(async () => {
  const browser = await chromium.launch();
  const report = [];
  const failures = [];
  const ok = (cond, msg) => {
    report.push(`${cond ? "PASS" : "FAIL"}  ${msg}`);
    if (!cond) failures.push(msg);
  };

  // --- 1. responsiveness + overflow across viewports ---
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);
    const m = await page.evaluate(() => ({
      scrollW: document.documentElement.scrollWidth,
      clientW: document.documentElement.clientWidth,
    }));
    ok(m.scrollW <= m.clientW, `${vp.name} (${vp.width}px): no horizontal overflow (scroll ${m.scrollW} / client ${m.clientW})`);
    ok(errors.length === 0, `${vp.name}: no console/page errors${errors.length ? " -> " + errors[0].slice(0, 120) : ""}`);

    if (vp.name === "mobile-375" || vp.name === "desktop-1280") {
      // lockup geometry
      const nav = await page.evaluate(() => {
        const a = document.querySelector('header a[aria-label^="TestForge"]');
        const img = a?.querySelector("img");
        const txt = a?.querySelector("span");
        if (!a || !img || !txt) return null;
        const ar = a.getBoundingClientRect();
        const ir = img.getBoundingClientRect();
        const tr = txt.getBoundingClientRect();
        return {
          lockupW: Math.round(ar.width), imgW: Math.round(ir.width), imgH: Math.round(ir.height),
          txt: txt.textContent, txtW: Math.round(tr.width),
          right: Math.round(window.innerWidth - ar.right), left: Math.round(ar.left),
        };
      });
      ok(!!nav, `${vp.name}: nav lockup present`);
      if (nav) {
        report.push(`      nav: img ${nav.imgW}x${nav.imgH}, text "${nav.txt}" ${nav.txtW}px, lockup ${nav.lockupW}px, x=${nav.left}, right-gap=${nav.right}`);
        ok(nav.txt.includes("TestForge") && nav.txt.includes(".Ai"), `${vp.name}: nav text reads TestForge.Ai`);
      }
      const foot = await page.evaluate(() => {
        const img = document.querySelector("footer img");
        const span = document.querySelector("footer span");
        return img ? { w: Math.round(img.getBoundingClientRect().width), txt: span?.textContent ?? "" } : null;
      });
      ok(!!foot, `${vp.name}: footer logo present`);
      if (foot) report.push(`      footer: img ${foot.w}px, text "${foot.txt}"`);
    }
    await ctx.close();
  }

  // --- 2. sections present ---
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const ids = await page.evaluate(() => [...document.querySelectorAll("main section[id]")].map((s) => s.id));
    for (const want of ["how-it-works", "trust", "faq", "start"]) {
      ok(ids.includes(want), `section#${want} exists`);
    }
    // anchors resolve
    const anchors = await page.evaluate(() =>
      [...document.querySelectorAll('header a[href^="#"], footer a[href^="#"]')]
        .map((a) => a.getAttribute("href"))
        .filter((h) => h !== "#top")
    );
    const missing = await page.evaluate((hrefs) => hrefs.filter((h) => !document.querySelector(h)), anchors);
    ok(missing.length === 0, `all nav/footer anchors resolve${missing.length ? " -> missing " + missing.join(",") : ""}`);

    // hero visible
    const h1 = await page.evaluate(() => {
      const el = document.querySelector("h1");
      const r = el.getBoundingClientRect();
      return { text: el.textContent.slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) };
    });
    ok(h1.w > 100 && h1.h > 30, `h1 renders (${h1.w}x${h1.h}) "${h1.text}"`);

    // solid nav (no blur)
    const navOk = await page.evaluate(() => {
      const h = document.querySelector("header");
      const cls = h.className;
      const bg = getComputedStyle(h).backgroundColor;
      return { noBlur: !cls.includes("backdrop-blur"), bg };
    });
    ok(navOk.noBlur, `nav has no backdrop-blur (bg ${navOk.bg})`);

    // footer structure (compact single-row, light)
    const foot = await page.evaluate(() => {
      const links = document.querySelectorAll("footer ul a").length;
      const github = !!document.querySelector('footer a[href*="github.com"]');
      const form = !!document.querySelector("#start form");
      const fields = document.querySelectorAll("#start form input, #start form textarea").length;
      const ctaH = Math.round(document.querySelector("#start").getBoundingClientRect().height);
      const footH = Math.round(document.querySelector("footer").getBoundingClientRect().height);
      const footerBg = getComputedStyle(document.querySelector("footer")).backgroundColor;
      return { links, github, form, fields, ctaH, footH, footerBg };
    });
    ok(foot.links >= 5 && foot.github, `footer has ${foot.links} links incl. GitHub`);
    ok(foot.form && foot.fields >= 4, `feedback form present with ${foot.fields} fields`);
    ok(foot.ctaH + foot.footH < 1100, `end-of-page compact: CTA ${foot.ctaH}px + footer ${foot.footH}px`);
    report.push(`      end-of-page: dark CTA ${foot.ctaH}px, light footer ${foot.footH}px (bg ${foot.footerBg})`);

    // theme toggle works
    await page.click('button[aria-label*="dark theme"]');
    await page.waitForTimeout(300);
    const theme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
    ok(theme === "dark", `theme toggle switches to dark (got ${theme})`);
    const navImg = await page.evaluate(() => {
      const img = document.querySelector("header img");
      return img ? img.complete && img.naturalWidth > 0 : false;
    });
    ok(navImg, "logo image loaded in dark mode");
    await page.screenshot({ path: "test-dark-nav.png" });

    // hover state on the logo
    await page.hover('header a[aria-label^="TestForge"]');
    await page.waitForTimeout(400);
    await page.locator("header").screenshot({ path: "test-hover-nav.png" });
    await ctx.close();
  }

  // --- 3. mobile menu ---
  {
    const ctx = await browser.newContext({ viewport: { width: 375, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    await page.click('button[aria-label="Open menu"]');
    await page.waitForTimeout(300);
    const menuVisible = await page.evaluate(() => {
      const el = document.getElementById("mobile-menu");
      return !!el && el.offsetHeight > 0;
    });
    ok(menuVisible, "mobile menu opens on hamburger tap");
    await page.click('#mobile-menu a[href="#faq"]');
    await page.waitForTimeout(600);
    const closed = await page.evaluate(() => !document.getElementById("mobile-menu"));
    ok(closed, "mobile menu closes after link tap");
    await page.screenshot({ path: "test-mobile-hero.png" });
    await ctx.close();
  }

  await browser.close();
  console.log(report.join("\n"));
  console.log(`\n${failures.length === 0 ? "ALL TESTS PASSED" : failures.length + " FAILURE(S)"}`);
})().catch((e) => { console.error("TEST RUN ERROR:", e); process.exit(1); });
