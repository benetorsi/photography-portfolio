(() => {
  'use strict';
  const photos = window.PORTFOLIO_PHOTOS || [];
  const image = document.getElementById('main-photo');
  const count = document.getElementById('photo-count');
  const caption = document.getElementById('photo-caption');
  const albumList = document.getElementById('album-list');
  const galleryLayout = document.querySelector('.gallery-layout');
  const gallery = document.getElementById('gallery');
  const about = document.getElementById('about');
  let index = 0;
  const photoButtons = [];

  function labelForPhoto(photo, photoIndex) {
    return (
      photo.title ||
      photo.caption ||
      photo.alt ||
      `Photograph ${photoIndex + 1}`
    );
  }

  function renderPhotoList() {
    if (!albumList || !galleryLayout) return;
    albumList.textContent = '';
    photoButtons.length = 0;

    if (photos.length <= 1) {
      galleryLayout.classList.add('no-sidebar');
      return;
    }

    galleryLayout.classList.remove('no-sidebar');
    photos.forEach((photo, photoIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = labelForPhoto(photo, photoIndex);
      button.addEventListener('click', () => showPhoto(photoIndex));
      albumList.appendChild(button);
      photoButtons.push(button);
    });
  }

  function syncActivePhotoButton() {
    photoButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === index;
      button.classList.toggle('active', isActive);
      if (isActive) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
  }

  function showPhoto(nextIndex) {
    if (!photos.length) { image.alt = 'No photographs added yet'; count.textContent = '0 / 0'; return; }
    index = (nextIndex + photos.length) % photos.length;
    const photo = photos[index];
    image.src = photo.src;
    image.alt = photo.alt || `Photograph ${index + 1}`;
    caption.textContent = photo.caption || '';
    count.textContent = `${index + 1} / ${photos.length}`;
    syncActivePhotoButton();
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
  renderPhotoList();
  showPhoto(0);
  showSection();
})();
