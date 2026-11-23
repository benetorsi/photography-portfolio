(() => {
  'use strict';
  const homepagePhotos = window.HOMEPAGE_PHOTOS || window.PORTFOLIO_PHOTOS || [];
  const albums = window.ALBUMS || [];
  const image = document.getElementById('main-photo');
  const count = document.getElementById('photo-count');
  const caption = document.getElementById('photo-caption');
  const albumList = document.getElementById('album-list');
  const galleryLayout = document.querySelector('.gallery-layout');
  const homepageStage = document.getElementById('homepage-stage');
  const albumView = document.getElementById('album-view');
  const albumTitle = document.getElementById('album-title');
  const albumDescription = document.getElementById('album-description');
  const albumItems = document.getElementById('album-items');
  const gallery = document.getElementById('gallery');
  const about = document.getElementById('about');
  const previous = document.getElementById('previous');
  const next = document.getElementById('next');
  const previousSmall = document.getElementById('previous-small');
  const nextSmall = document.getElementById('next-small');
  let homepageIndex = 0;
  let selectedAlbum = null;
  const sidebarButtons = [];
  let autoplayTimer = null;
  let fadeTimeout = null;
  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const autoplayIntervalMs = 3200;
  const fadeOutMs = 220;

  function stopAutoplay() {
    if (!autoplayTimer) return;
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function startAutoplay() {
    stopAutoplay();
    if (prefersReducedMotion) return;
    if (selectedAlbum) return;
    if (homepagePhotos.length <= 1) return;

    autoplayTimer = window.setInterval(() => {
      showHomepagePhoto(homepageIndex + 1, { userInitiated: false });
    }, autoplayIntervalMs);
  }

  function showHomepageStage() {
    selectedAlbum = null;
    if (homepageStage) homepageStage.hidden = false;
    if (albumView) albumView.hidden = true;
    syncActiveSidebarButton();
    startAutoplay();
  }

  function showAlbumStage(albumIndex) {
    const album = albums[albumIndex];
    if (!album) return;

    selectedAlbum = albumIndex;
    stopAutoplay();
    if (homepageStage) homepageStage.hidden = true;
    if (albumView) albumView.hidden = false;

    if (albumTitle) albumTitle.textContent = album.name || 'album';
    if (albumDescription) albumDescription.textContent = album.description || '';
    renderAlbumPhotos(album);
    syncActiveSidebarButton();
  }

  function renderAlbumPhotos(album) {
    if (!albumItems) return;
    albumItems.textContent = '';

    (album.photos || []).forEach((photo, photoIndex) => {
      const article = document.createElement('article');
      article.className = 'album-item';

      const text = document.createElement('p');
      text.className = 'album-item-text';
      text.textContent =
        photo.text || photo.caption || photo.title || photo.alt || `Photograph ${photoIndex + 1}`;

      const imageWrap = document.createElement('div');
      imageWrap.className = 'album-item-image';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = photo.src;
      img.alt = photo.alt || `Photograph ${photoIndex + 1}`;
      imageWrap.appendChild(img);

      article.appendChild(text);
      article.appendChild(imageWrap);
      albumItems.appendChild(article);
    });
  }

  function renderSidebar() {
    if (!albumList || !galleryLayout) return;
    albumList.textContent = '';
    sidebarButtons.length = 0;

    if (!albums.length) {
      galleryLayout.classList.add('no-sidebar');
      return;
    }

    galleryLayout.classList.remove('no-sidebar');

    const homeButton = document.createElement('button');
    homeButton.type = 'button';
    homeButton.textContent = 'home';
    homeButton.addEventListener('click', showHomepageStage);
    albumList.appendChild(homeButton);
    sidebarButtons.push({ kind: 'home', button: homeButton });

    albums.forEach((album, albumIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = album.name || `Album ${albumIndex + 1}`;
      button.addEventListener('click', () => showAlbumStage(albumIndex));
      albumList.appendChild(button);
      sidebarButtons.push({ kind: 'album', albumIndex, button });
    });
  }

  function syncActiveSidebarButton() {
    sidebarButtons.forEach(entry => {
      const isActive =
        (selectedAlbum === null && entry.kind === 'home') ||
        (selectedAlbum !== null && entry.kind === 'album' && entry.albumIndex === selectedAlbum);

      entry.button.classList.toggle('active', isActive);
      if (isActive) entry.button.setAttribute('aria-current', 'true');
      else entry.button.removeAttribute('aria-current');
    });
  }

  function showHomepagePhoto(nextIndex, options = {}) {
    if (!homepagePhotos.length) {
      image.alt = 'No photographs added yet';
      if (count) count.textContent = '0 / 0';
      return;
    }

    homepageIndex = (nextIndex + homepagePhotos.length) % homepagePhotos.length;
    const photo = homepagePhotos[homepageIndex];

    if (fadeTimeout) {
      window.clearTimeout(fadeTimeout);
      fadeTimeout = null;
    }

    if (!prefersReducedMotion) image.style.opacity = '0';
    fadeTimeout = window.setTimeout(() => {
      image.src = photo.src;
      image.alt = photo.alt || `Photograph ${homepageIndex + 1}`;
      if (caption) caption.textContent = photo.caption || '';
      if (count) count.textContent = `${homepageIndex + 1} / ${homepagePhotos.length}`;
      if (!prefersReducedMotion) {
        window.requestAnimationFrame(() => {
          image.style.opacity = '1';
        });
      }
    }, prefersReducedMotion ? 0 : fadeOutMs);

    if (options.userInitiated !== false) startAutoplay();
    if (homepagePhotos.length > 1) {
      const preload = new Image();
      preload.src = homepagePhotos[(homepageIndex + 1) % homepagePhotos.length].src;
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

    if (isAbout) stopAutoplay();
    else startAutoplay();
  }

  if (previous) {
    previous.addEventListener('click', () => {
      if (selectedAlbum) return;
      showHomepagePhoto(homepageIndex - 1);
    });
  }
  if (next) {
    next.addEventListener('click', () => {
      if (selectedAlbum) return;
      showHomepagePhoto(homepageIndex + 1);
    });
  }
  if (previousSmall) {
    previousSmall.addEventListener('click', () => {
      if (selectedAlbum) return;
      showHomepagePhoto(homepageIndex - 1);
    });
  }
  if (nextSmall) {
    nextSmall.addEventListener('click', () => {
      if (selectedAlbum) return;
      showHomepagePhoto(homepageIndex + 1);
    });
  }
  document.addEventListener('keydown', event => {
    if (gallery.hidden || event.altKey || event.ctrlKey || event.metaKey) return;
    if (selectedAlbum) return;
    if (event.key === 'ArrowLeft') showHomepagePhoto(homepageIndex - 1);
    if (event.key === 'ArrowRight') showHomepagePhoto(homepageIndex + 1);
  });
  window.addEventListener('hashchange', showSection);
  document.getElementById('year').textContent = new Date().getFullYear();

  if (homepageStage) {
    homepageStage.addEventListener('pointerenter', stopAutoplay);
    homepageStage.addEventListener('pointerleave', startAutoplay);
  }

  renderSidebar();
  showHomepageStage();
  showHomepagePhoto(0);
  showSection();
})();
