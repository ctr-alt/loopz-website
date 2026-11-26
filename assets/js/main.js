(() => {
  const cfg = window.LOOPZ_CONFIG || {};
  const isConfiguredUrl = (value) => /^https:\/\//i.test((value || "").trim()) && !/REPLACE_WITH/i.test(value);
  const isConfiguredValue = (value) => !!(value || "").trim() && !/REPLACE_WITH/i.test(value);
  const displayValue = (value, fallback = "To be confirmed") => isConfiguredValue(value) ? value : fallback;

  // Mobile nav
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    const close = () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); };
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
    document.addEventListener("click", (e) => { if (!nav.contains(e.target) && !toggle.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  }

  // Active nav link
  const path = location.pathname.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
  document.querySelectorAll("[data-nav] a[href]").forEach((a) => {
    const raw = a.getAttribute("href") || "";
    if (raw.startsWith("#")) return;
    const href = raw.replace(/\/index\.html$/, "/").replace(/\/$/, "") || "/";
    if (href === path) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
  });

  // Config-driven text
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    const fallback = el.getAttribute("data-fallback") || "To be confirmed";
    el.textContent = displayValue(cfg[key], fallback);
  });

  // Support mailto
  document.querySelectorAll("[data-support-email]").forEach((el) => {
    const email = cfg.supportEmail;
    if (isConfiguredValue(email)) {
      el.textContent = email;
      if (el.tagName === "A") el.href = `mailto:${email}`;
    } else {
      el.textContent = "Official support email: to be confirmed";
      if (el.tagName === "A") { el.href = "#support-placeholder"; el.removeAttribute("target"); }
    }
  });

  // Download buttons
  document.querySelectorAll("[data-download-btn]").forEach((btn) => {
    const noteId = btn.getAttribute("aria-describedby");
    const note = noteId ? document.getElementById(noteId) : btn.closest("section, .download-card")?.querySelector("[data-download-note]");
    const setNote = (msg, ok=false) => { if (note) { note.textContent = msg; note.className = `download-note ${ok ? "ok" : "pending"}`; } };
    if (isConfiguredUrl(cfg.apkUrl)) {
      btn.href = cfg.apkUrl;
      btn.removeAttribute("aria-disabled");
      btn.classList.remove("is-disabled");
      btn.addEventListener("click", () => setNote("Download starting from the configured official source.", true));
      setNote("Official APK link configured.", true);
    } else {
      btn.href = "#download-not-configured";
      btn.setAttribute("aria-disabled", "true");
      btn.classList.add("is-disabled");
      const msg = "Official APK download link is not configured yet. Check back on the official LOOPZ release channel.";
      setNote(msg, false);
      btn.addEventListener("click", (e) => { e.preventDefault(); setNote(msg, false); btn.blur(); });
    }
  });

  // SHA256 copy
  document.querySelectorAll("[data-copy-sha]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const sha = (cfg.sha256 || "").trim();
      const out = document.getElementById(btn.getAttribute("data-copy-sha"));
      if (!isConfiguredValue(sha)) { if (out) out.textContent = "Checksum placeholder — no verified SHA-256 configured yet."; return; }
      try { await navigator.clipboard.writeText(sha); if (out) out.textContent = "SHA-256 copied to clipboard."; }
      catch { if (out) out.textContent = "Could not copy automatically. Please copy the checksum manually."; }
    });
  });

  // Reveal on scroll
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (prefersReduced || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  }
})();
