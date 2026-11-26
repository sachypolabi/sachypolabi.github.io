"use strict";

// A downloaded folder opens in Finder too. Web servers resolve directory URLs themselves.
if (location.protocol === "file:") {
  for (const anchor of document.querySelectorAll("a[href]")) {
    const href = anchor.getAttribute("href");
    if (!/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(href) && href.split("#")[0].endsWith("/")) {
      anchor.setAttribute("href", href.replace(/\/(?=#|$)/, "/index.html"));
    }
  }
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigace");
const compactScreen = window.matchMedia("(max-width: 54rem)");

function setMenu(open) {
  navigation.hidden = compactScreen.matches && !open;
  menuButton.setAttribute("aria-expanded", String(!navigation.hidden));
}

menuButton.hidden = false;
setMenu(false);
compactScreen.addEventListener("change", () => setMenu(false));
menuButton.addEventListener("click", () => setMenu(navigation.hidden));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && compactScreen.matches && !navigation.hidden) {
    setMenu(false);
    menuButton.focus();
  }
});

// Each thumbnail is a normal link to its full-size photograph even without JavaScript.
const lightbox = document.querySelector(".lightbox");
if (lightbox && typeof lightbox.showModal === "function") {
  const fullSize = document.createElement("img");
  const caption = lightbox.querySelector("figcaption");
  const counter = lightbox.querySelector(".lightbox-number");
  let links = [];
  let index = 0;
  let opener;

  function showPhoto(position) {
    index = (position + links.length) % links.length;
    const current = links[index];
    fullSize.alt = current.querySelector("img").alt;
    fullSize.src = current.href;
    caption.before(fullSize);
    caption.textContent = current.closest("figure").querySelector("figcaption").textContent;
    counter.textContent = (index + 1) + " / " + links.length;
  }

  for (const gallery of document.querySelectorAll("[data-gallery]")) {
    gallery.addEventListener("click", (event) => {
      const link = event.target.closest("a.photo-link");
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      links = [...gallery.querySelectorAll("a.photo-link")];
      opener = link;
      showPhoto(links.indexOf(link));
      lightbox.showModal();
    });
  }

  lightbox.querySelector("[data-previous]").addEventListener("click", () => showPhoto(index - 1));
  lightbox.querySelector("[data-next]").addEventListener("click", () => showPhoto(index + 1));
  lightbox.querySelector("[data-close]").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      showPhoto(index + (event.key === "ArrowLeft" ? -1 : 1));
    }
  });
  lightbox.addEventListener("close", () => {
    fullSize.remove();
    opener?.focus({ preventScroll: true });
  });
}
