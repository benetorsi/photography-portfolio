(() => {
  'use strict';
  const photos = window.PORTFOLIO_PHOTOS || [];
  const image = document.getElementById('main-photo');
  const count = document.getElementById('photo-count');
  const caption = document.getElementById('photo-caption');
  const gallery = document.getElementById('gallery');
  const about = document.getElementById('about');
  let index = 0;

  function showPhoto(nextIndex) {
    if (!photos.length) { image.alt = 'No photographs added yet'; count.textContent = '0 / 0'; return; }
    index = (nextIndex + photos.length) % photos.length;
    const photo = photos[index];
    image.src = photo.src;
    image.alt = photo.alt || `Photograph ${index + 1}`;
    caption.textContent = photo.caption || '';
    count.textContent = `${index + 1} / ${photos.length}`;
    if (photos.length > 1) {
      const preload = new Image();
      preload.src = photos[(index + 1) % photos.length].src;
    }
  }

  function showSection() {
    const isAbout = window.location.hash === '#about';
    gallery.hidden = isAbout;
    about.hidden = !isAbout;
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === (isAbout ? 'about' : 'gallery')) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  document.getElementById('previous').addEventListener('click', () => showPhoto(index - 1));
  document.getElementById('next').addEventListener('click', () => showPhoto(index + 1));
  document.getElementById('previous-small').addEventListener('click', () => showPhoto(index - 1));
  document.getElementById('next-small').addEventListener('click', () => showPhoto(index + 1));
  document.addEventListener('keydown', event => {
    if (gallery.hidden || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft') showPhoto(index - 1);
    if (event.key === 'ArrowRight') showPhoto(index + 1);
  });
  window.addEventListener('hashchange', showSection);
  document.getElementById('year').textContent = new Date().getFullYear();
  showPhoto(0);
  showSection();
})();
