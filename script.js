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

  // Hero: pinned photograph -> composed layout, driven by one smoothed progress
  // value (--hero-p). scrollcraft writes the raw pinned progress onto the act
  // element as --sc-p; that raw value is only ever read here as a TARGET, never
  // applied to an element directly, so a fast wheel flick smooths instead of
  // snapping. Everything downstream (opacity/transform per element) is derived
  // from the smoothed value alone.
  function initHero() {
    var hero = document.getElementById("home");
    if (!hero) return;

    var heroImage = hero.querySelector(".hero-image");
    var heroScrim = hero.querySelector(".hero-scrim-left");
    var heroEyebrow = hero.querySelector(".hero-eyebrow");
    var heroLines = Array.prototype.slice.call(hero.querySelectorAll(".hero-line"));
    var heroLede = hero.querySelector(".hero-lede");
    var heroCta = hero.querySelector(".hero-cta");
    var heroServicesEl = hero.querySelector(".hero-services");
    var heroServices = Array.prototype.slice.call(hero.querySelectorAll(".hero-service"));

    var reduceMQ = matchMedia("(prefers-reduced-motion: reduce)");
    var mobileMQ = matchMedia("(max-width: 760px)");

    function smooth(x) { x = x < 0 ? 0 : x > 1 ? 1 : x; return x * x * (3 - 2 * x); }
    function enterVis(p, from, to) {
      if (p <= from) return 0;
      if (p >= to) return 1;
      return smooth((p - from) / (to - from));
    }

    var WIN = { bg: [0.10, 0.38], eyebrow: [0.20, 0.38], lede: [0.48, 0.68], cta: [0.60, 0.78] };
    var LINE_WIN = [[0.28, 0.42], [0.32, 0.46], [0.36, 0.50], [0.40, 0.54]];
    var SERVICE_WIN = [[0.70, 0.82], [0.74, 0.86], [0.78, 0.90], [0.82, 0.94]];

    function serviceShift() {
      return mobileMQ.matches ? 56 : Math.min(innerWidth * 0.28, 360);
    }

    function applyHero(p) {
      hero.style.setProperty("--hero-p", p.toFixed(4));

      var visBg = enterVis(p, WIN.bg[0], WIN.bg[1]);
      if (heroImage) {
        heroImage.style.filter = "brightness(" + (1 - 0.12 * visBg).toFixed(3) + ") saturate(" + (1 - 0.08 * visBg).toFixed(3) + ")";
        heroImage.style.transform = "scale(" + (1 + 0.03 * visBg).toFixed(4) + ")";
      }
      if (heroScrim) heroScrim.style.opacity = visBg.toFixed(3);

      if (heroEyebrow) {
        var visEye = enterVis(p, WIN.eyebrow[0], WIN.eyebrow[1]);
        heroEyebrow.style.opacity = visEye.toFixed(3);
        heroEyebrow.style.transform = "translate3d(0," + ((1 - visEye) * 18).toFixed(2) + "px,0)";
      }

      heroLines.forEach(function (line, i) {
        var w = LINE_WIN[i] || LINE_WIN[LINE_WIN.length - 1];
        var vis = enterVis(p, w[0], w[1]);
        line.style.opacity = vis.toFixed(3);
        line.style.transform = "translate3d(0," + ((1 - vis) * 22).toFixed(2) + "px,0)";
      });

      if (heroLede) {
        var visLede = enterVis(p, WIN.lede[0], WIN.lede[1]);
        heroLede.style.opacity = visLede.toFixed(3);
        heroLede.style.transform = "translate3d(0," + ((1 - visLede) * 18).toFixed(2) + "px,0)";
      }

      if (heroCta) {
        var visCta = enterVis(p, WIN.cta[0], WIN.cta[1]);
        heroCta.style.opacity = visCta.toFixed(3);
        heroCta.style.transform = "translate3d(0," + ((1 - visCta) * 14).toFixed(2) + "px,0)";
      }

      if (heroServicesEl) heroServicesEl.style.opacity = enterVis(p, SERVICE_WIN[0][0], SERVICE_WIN[0][1]).toFixed(3);
      var shift = serviceShift();
      heroServices.forEach(function (box, i) {
        var w = SERVICE_WIN[i] || SERVICE_WIN[SERVICE_WIN.length - 1];
        var vis = enterVis(p, w[0], w[1]);
        box.style.opacity = vis.toFixed(3);
        box.style.transform = "translate3d(" + ((1 - vis) * shift).toFixed(2) + "px,0,0)";
      });
    }

    if (reduceMQ.matches) {
      applyHero(1);
      return;
    }

    var current = 0, target = 0, lastTime = null, ticking = false;
    var SPEED = 7, EPS = 0.0006;

    function readTarget() {
      var v = parseFloat(getComputedStyle(hero).getPropertyValue("--sc-p"));
      target = isNaN(v) ? 0 : v;
    }

    function frame(ts) {
      readTarget();
      if (lastTime === null) lastTime = ts;
      var dt = Math.min((ts - lastTime) / 1000, 0.1);
      lastTime = ts;
      var alpha = 1 - Math.exp(-SPEED * dt);
      current += (target - current) * alpha;
      if (Math.abs(target - current) < EPS) current = target;
      applyHero(current);
      if (Math.abs(target - current) > EPS) {
        requestAnimationFrame(frame);
      } else {
        ticking = false;
        lastTime = null;
      }
    }

    // Always (re)start the loop on scroll/resize rather than gating on the
    // current diff: at the moment a scroll event fires, scrollcraft's own
    // (separately rAF-batched) read() may not have written the new --sc-p
    // yet, so a pre-check here can see a stale target and never start.
    // frame() re-reads the target fresh on every tick and stops itself once
    // the two values actually converge.
    function kick() {
      if (!ticking) {
        ticking = true;
        lastTime = null;
        requestAnimationFrame(frame);
      }
    }

    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", function () { applyHero(current); kick(); }, { passive: true });
    if (reduceMQ.addEventListener) {
      reduceMQ.addEventListener("change", function (e) {
        if (e.matches) { current = target = 1; applyHero(1); }
      });
    }

    readTarget();
    applyHero(current);
    kick();
  }

  if (window.ScrollCraft && typeof window.ScrollCraft.mount === "function") {
    window.ScrollCraft.mount(document.body);
  }

  initHero();

  requestAnimationFrame(function () {
    updatePageState();
    setTimeout(updatePageState, 120);
  });
})();
