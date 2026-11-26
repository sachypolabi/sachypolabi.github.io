"use strict";

function arrangeFeed(feed) {
  const figures = [...feed.querySelectorAll("figure")];
  function fitRows() {
    const gap = parseFloat(getComputedStyle(feed).columnGap) || 0;
    for (const figure of figures) {
      const height = figure.offsetHeight;
      figure.closest(".b-gal-item").style.gridRowEnd = "span " + Math.max(1, Math.ceil((height + gap) / 2));
    }
  }
  fitRows();
  const observer = new ResizeObserver(fitRows);
  figures.forEach(figure => observer.observe(figure));
}

function enableSlideshow(slider) {
  const track = slider.querySelector(".b-gal-list");
  const originals = [...track.querySelectorAll(".original")];
  const dots = [...slider.querySelectorAll("[data-slide-to]")];
  const loopDots = slider.querySelector(".dots-content.infinite ul");
  const clones = Number(slider.dataset.clones);
  const count = originals.length;
  let current = 0;
  let touched;
  let wasSwiped = false;
  let timer;

  function setPosition(value, animate) {
    track.classList.toggle("moving", animate);
    track.style.setProperty("--slideshow-position", value);
  }
  function select(index, animate = true) {
    current = (index % count + count) % count;
    setPosition(clones + index, animate);
    originals.forEach((item, i) => {
      item.querySelector("a").tabIndex = i === current ? 0 : -1;
      item.setAttribute("aria-hidden", String(i !== current));
    });
    dots.forEach((button) => {
      const i = Number(button.dataset.slideTo);
      const distance = Math.min(Math.abs(i - current), count - Math.abs(i - current));
      button.parentElement.classList.toggle("active", distance === 0);
      button.parentElement.classList.toggle("large", distance === 1);
      button.setAttribute("aria-current", String(i === current));
    });
    if (loopDots) {
      const active = loopDots.querySelector("li.original.active");
      loopDots.style.transform = `translateX(${(loopDots.parentElement.clientWidth - active.offsetWidth) / 2 - active.offsetLeft}px)`;
    }
    clearTimeout(timer);
    if (index !== current) {
      timer = setTimeout(() => setPosition(clones + current, false), 310);
    }
  }
  slider.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button?.hasAttribute("data-slide-step")) select(current + Number(button.dataset.slideStep));
    if (button?.hasAttribute("data-slide-to")) select(Number(button.dataset.slideTo));
  });
  slider.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    select(current + (event.key === "ArrowLeft" ? -1 : 1));
    if (event.target.closest("a.photo-link")) originals[current].querySelector("a").focus({ preventScroll: true });
  });
  slider.addEventListener("touchstart", (event) => {
    touched = event.touches.length === 1 ? [event.touches[0].clientX, event.touches[0].clientY] : undefined;
    wasSwiped = false;
  }, { passive: true });
  slider.addEventListener("touchend", (event) => {
    if (!touched) return;
    const dx = event.changedTouches[0].clientX - touched[0];
    const dy = event.changedTouches[0].clientY - touched[1];
    touched = undefined;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      wasSwiped = true;
      select(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  slider.addEventListener("touchcancel", () => { touched = undefined; });
  slider.addEventListener("click", (event) => {
    if (wasSwiped && event.target.closest("a.photo-link")) {
      event.preventDefault();
      event.stopPropagation();
      wasSwiped = false;
    }
  }, true);
  slider.dataset.enhanced = "true";
  select(0, false);
}

function enableLightbox(gallery) {
  if (!window.PhotoSwipe || !window.PhotoSwipeLightbox) return;
  const lightbox = new PhotoSwipeLightbox({
    gallery,
    children: ".original a.photo-link",
    pswpModule: PhotoSwipe,
    bgOpacity: 0.9,
    padding: { top: 50, right: 20, bottom: 50, left: 20 },
    closeTitle: "Zavřít",
    zoomTitle: "Přiblížit fotografii",
    arrowPrevTitle: "Předchozí fotografie",
    arrowNextTitle: "Další fotografie"
  });
  const desktop = window.matchMedia("(min-width: 600px)");
  const captions = new PhotoSwipeDynamicCaption(lightbox, {
    type: "below",
    captionContent: "figcaption",
    verticallyCenterImage: desktop.matches
  });
  desktop.addEventListener("change", event => { captions.options.verticallyCenterImage = event.matches; });
  lightbox.on("uiRegister", () => {
    const viewer = lightbox.pswp;
    viewer.on("afterInit", () => viewer.element.setAttribute("aria-label", "Zvětšená fotografie"));
    if (!document.fullscreenEnabled) return;
    viewer.ui.registerElement({
      name: "fullscreen-toggle",
      title: "Celá obrazovka",
      ariaLabel: "Celá obrazovka",
      order: 8,
      isButton: true,
      html: {
        isCustomSVG: true,
        inner: '<path d="M8 8h6v2.4h-3.6V14H8zm10 0h6v6h-2.4v-3.6H18zM8 18h2.4v3.6H14V24H8zm13.6 0H24v6h-6v-2.4h3.6z"/>'
      },
      onClick: () => {
        const change = document.fullscreenElement ? document.exitFullscreen() : viewer.element.requestFullscreen();
        change.catch(() => {});
      }
    });
  });
  lightbox.init();
}

for (const gallery of document.querySelectorAll("[data-gallery]")) {
  const feed = gallery.querySelector(".b-gal-feed");
  const slider = gallery.querySelector(".b-gal-slideshow");
  if (feed) arrangeFeed(feed);
  if (slider) enableSlideshow(slider);
  enableLightbox(gallery);
}
