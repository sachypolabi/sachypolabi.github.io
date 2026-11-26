'use strict';

// The same directory links work when a downloaded copy is opened from Finder.
if (location.protocol === 'file:') {
  for (const anchor of document.querySelectorAll('a[href]')) {
    const href = anchor.getAttribute('href');
    if (!/^(?:[a-z][\w+.-]*:|\/\/|#)/i.test(href) && href.split('#')[0].endsWith('/')) {
      anchor.setAttribute('href', href.replace(/\/(?=#|$)/, '/index.html'));
    }
  }
}

const menu = document.getElementById('menu');
const toggle = document.getElementById('menu-submit');
const header = document.querySelector('.l-h');
const closeButton = menu.querySelector('.menu-close');
const desktop = matchMedia('(min-width: 56.25em)');
const touch = matchMedia('(pointer: coarse)');
document.body.classList.add(touch.matches ? 'mobile' : 'desktop');

function refreshHeader() {
  header.classList.toggle('compact', !desktop.matches && window.scrollY >= 7);
}

function setMenu(open, returnFocus = false) {
  const expanded = open && !desktop.matches;
  menu.classList.toggle('visible', expanded);
  menu.classList.toggle('open', expanded);
  toggle.classList.toggle('active', expanded);
  toggle.setAttribute('aria-expanded', String(expanded));
  document.body.classList.toggle('menu-open', expanded);
  document.body.classList.toggle('noscroll', expanded);
  document.documentElement.classList.toggle('noscroll', expanded);
  menu.inert = !desktop.matches && !expanded;
  if (expanded) closeButton.focus({ preventScroll: true });
  if (returnFocus) toggle.focus({ preventScroll: true });
}

for (const button of [toggle, closeButton]) {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const wasOpen = menu.classList.contains('open');
    setMenu(!wasOpen, wasOpen);
  });
  button.addEventListener('keydown', (event) => {
    if (event.key === ' ') { event.preventDefault(); button.click(); }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false, true);
});
document.addEventListener('click', (event) => {
  if (menu.classList.contains('open') && !menu.contains(event.target) && !toggle.contains(event.target)) {
    setMenu(false, true);
  }
});
desktop.addEventListener('change', () => { refreshHeader(); setMenu(false); });
window.addEventListener('scroll', refreshHeader, { passive: true });
refreshHeader();
setMenu(false);
