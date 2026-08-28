(function () {
  "use strict";

  var root = document.documentElement;
  var header = document.getElementById("navbar");
  var menuToggle = document.getElementById("menu-toggle");
  var mobileMenu = document.getElementById("mobile-menu");
  var cncAct = document.getElementById("cnc");
  var routeTicking = false;

  function closeMenu(restoreFocus) {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
    if (restoreFocus) menuToggle.focus();
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var open = menuToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeMenu(false);
      } else {
        mobileMenu.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Menüyü kapat");
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") closeMenu(true);
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
  var navSections = navLinks.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  function updatePageState() {
    routeTicking = false;
    var maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    var pageProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    root.style.setProperty("--route-progress", pageProgress.toFixed(4));
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);

    var current = navSections[0];
    navSections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= window.innerHeight * 0.34) current = section;
    });
    navLinks.forEach(function (link) {
      var active = current && link.getAttribute("href") === "#" + current.id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    if (cncAct) {
      var value = parseFloat(getComputedStyle(cncAct).getPropertyValue("--sc-p")) || 0;
      var cutProgress = Math.min(1, Math.max(0, (value - 0.08) / 0.78));
      root.style.setProperty("--cut-progress", cutProgress.toFixed(4));
      var stage = cncAct.querySelector("[data-sc-verify-state]");
      if (stage) stage.setAttribute("data-sc-verify-state", "cut-" + Math.round(cutProgress * 20));
    }
  }

  function requestPageUpdate() {
    if (routeTicking) return;
    routeTicking = true;
    requestAnimationFrame(updatePageState);
  }

  window.addEventListener("scroll", requestPageUpdate, { passive: true });
  window.addEventListener("resize", requestPageUpdate, { passive: true });

  var igShell = document.getElementById("instagram-video-shell");
  var igPlay = document.getElementById("instagram-play-btn");
  var igStatus = document.getElementById("instagram-status");

  if (igShell && igPlay) {
    igPlay.addEventListener("click", function () {
      if (igShell.classList.contains("is-playing")) return;
      if (igStatus) igStatus.textContent = "Instagram videosu yükleniyor.";

      var iframe = document.createElement("iframe");
      iframe.src = "https://www.instagram.com/reel/DbH8BKgMuvc/embed";
      iframe.title = "Zirve Metal CNC fiber lazer üretim videosu";
      iframe.loading = "lazy";
      iframe.setAttribute("allow", "encrypted-media; picture-in-picture; fullscreen");
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.addEventListener("load", function () {
        if (igStatus) igStatus.textContent = "Instagram videosu yüklendi.";
        iframe.focus();
      });
      igShell.appendChild(iframe);
      igShell.classList.add("is-playing");
    });
  }

  document.addEventListener("focusin", function (event) {
    var target = event.target;
    if (!target.matches("a,button")) return;
    if (!target.matches(":focus-visible")) return;
    var act = target.closest(".sc-act--pinned");
    if (!act) return;
    var travel = Math.max(0, act.offsetHeight - window.innerHeight);
    if (!travel) return;
    var progress = act.id === "contact" ? 0.18 : 0.5;
    window.scrollTo({ top: act.offsetTop + travel * progress, behavior: "instant" });
  });

  if (window.ScrollCraft && typeof window.ScrollCraft.mount === "function") {
    window.ScrollCraft.mount(document.body);
  }

  requestAnimationFrame(function () {
    updatePageState();
    setTimeout(updatePageState, 120);
  });
})();
