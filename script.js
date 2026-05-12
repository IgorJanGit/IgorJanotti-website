/* ===================================================
   IgorJanotti Portfolio – script.js
   =================================================== */

(function () {
  "use strict";

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll shadow + active link ---------- */
  const navbar   = document.getElementById("navbar");
  const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  function onScroll() {
    // shadow
    navbar.classList.toggle("scrolled", window.scrollY > 20);

    // active nav link
    const scrollMid = window.scrollY + window.innerHeight / 2;
    let current = "";
    sections.forEach((sec) => {
      if (sec.offsetTop <= scrollMid) current = sec.id;
    });
    navLinks.forEach((a) => {
      const href = a.getAttribute("href").replace("#", "");
      a.classList.toggle("active", href === current);
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---------- Mobile nav toggle ---------- */
  const navToggle  = document.getElementById("navToggle");
  const navLinksEl = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinksEl.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // close menu when a link is clicked
  navLinksEl.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      navLinksEl.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
    });
  });

  /* ---------- Expandable timeline cards ---------- */
  document.querySelectorAll(".timeline-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const body = btn.closest(".timeline-card").querySelector(".timeline-body");

      // collapse all others
      document.querySelectorAll(".timeline-header").forEach((other) => {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          const otherBody = other.closest(".timeline-card").querySelector(".timeline-body");
          if (otherBody) otherBody.hidden = true;
        }
      });

      // toggle this one
      btn.setAttribute("aria-expanded", String(!expanded));
      if (body) body.hidden = expanded;
    });
  });

  /* ---------- Resume preview toggle ---------- */
  const previewToggle = document.getElementById("resumePreviewToggle");
  const resumePreview = document.getElementById("resumePreview");

  if (previewToggle && resumePreview) {
    previewToggle.addEventListener("click", () => {
      const isHidden = resumePreview.hidden;
      resumePreview.hidden = !isHidden;
      previewToggle.textContent = isHidden ? "✖ Close Preview" : "👁 Preview Resume";
    });
  }

  /* ---------- Intersection Observer – fade-in animations ---------- */
  const fadeEls = document.querySelectorAll(
    ".project-card, .timeline-card, .about-grid, .contact-link"
  );

  fadeEls.forEach((el) => el.classList.add("fade-in"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    fadeEls.forEach((el) => observer.observe(el));
  } else {
    // fallback: show everything immediately
    fadeEls.forEach((el) => el.classList.add("visible"));
  }
})();
