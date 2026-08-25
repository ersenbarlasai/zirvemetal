(function () {
  "use strict";

  // ---- Mobile menu ----
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    mobileMenu.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  // ---- Header scroll shadow ----
  var header = document.getElementById("navbar");
  function onScrollHeader() {
    if (window.scrollY > 8) {
      header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
    } else {
      header.style.boxShadow = "none";
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // ---- Active nav link on scroll ----
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));

  function setActiveLink() {
    var scrollPos = window.scrollY + 140;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", isActive);
    });
  }
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  // ---- Back to top ----
  var toTop = document.getElementById("to-top");
  function onScrollToTop() {
    toTop.classList.toggle("is-visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScrollToTop, { passive: true });
  toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- Scroll reveal ----
  var revealTargets = document.querySelectorAll(
    ".capacity-card, .service-card, .timeline-step, .about-copy, .about-media, .section-head, .production-video-copy, .instagram-video-shell"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ---- Instagram embed click-to-load ----
  var igShell = document.getElementById("instagram-video-shell");
  var igPlayBtn = document.getElementById("instagram-play-btn");
  var igStatus = document.getElementById("instagram-status");
  if (igShell && igPlayBtn) {
    igPlayBtn.addEventListener("click", function () {
      if (igShell.classList.contains("is-playing")) return;
      igShell.classList.add("is-playing");
      if (igStatus) igStatus.textContent = "Instagram videosu yükleniyor.";

      var iframe = document.createElement("iframe");
      iframe.src = "https://www.instagram.com/reel/DbH8BKgMuvc/embed";
      iframe.title = "Zirve Metal CNC fiber lazer üretim videosu";
      iframe.loading = "lazy";
      iframe.setAttribute("allow", "encrypted-media; picture-in-picture; fullscreen");
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.tabIndex = -1;
      iframe.addEventListener("load", function () {
        if (igStatus) igStatus.textContent = "Instagram videosu yüklendi.";
        iframe.focus();
      });
      igShell.appendChild(iframe);
    });
  }

  // ---- Quote form ----
  var form = document.getElementById("quote-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = "Teklif formu çok yakında aktif olacaktır. Bu süre içinde Instagram üzerinden bizimle iletişime geçebilirsiniz.";
    });
  }
})();
