// Homepage slideshow
// Edit this list to change the 6 photographs that cycle automatically on load.
window.HOMEPAGE_PHOTOS = [
  { src: 'assets/photos/000.jpg', alt: 'Analog photograph 1', caption: '' },
  { src: 'assets/photos/001.jpg', alt: 'Analog photograph 2', caption: '' },
  { src: 'assets/photos/002.jpg', alt: 'Analog photograph 3', caption: '' },
  { src: 'assets/photos/003.jpg', alt: 'Analog photograph 4', caption: '' },
  { src: 'assets/photos/004.jpg', alt: 'Analog photograph 5', caption: '' },
  { src: 'assets/photos/005.jpg', alt: 'Analog photograph 6', caption: '' }
];

// Albums
// Each album renders as a scrollable list of photos, with a short text block next
// to each photograph.
window.ALBUMS = [
  {
    name: 'album one',
    description: 'A short album description can go here.',
    photos: [
      { src: 'assets/photos/000.jpg', alt: 'Analog photograph 1', text: 'Optional lines about this photograph.' },
      { src: 'assets/photos/001.jpg', alt: 'Analog photograph 2', text: '' },
      { src: 'assets/photos/002.jpg', alt: 'Analog photograph 3', text: '' },
      { src: 'assets/photos/003.jpg', alt: 'Analog photograph 4', text: '' }
    ]
  },
  {
    name: 'album two',
    description: 'Another album description can live here.',
    photos: [
      { src: 'assets/photos/004.jpg', alt: 'Analog photograph 5', text: '' },
      { src: 'assets/photos/005.jpg', alt: 'Analog photograph 6', text: '' },
      { src: 'assets/photos/006.jpg', alt: 'Analog photograph 7', text: '' },
      { src: 'assets/photos/007.jpg', alt: 'Analog photograph 8', text: '' }
    ]
  }
];

// Backward-compatible fallback (older versions of this template).
window.PORTFOLIO_PHOTOS = window.PORTFOLIO_PHOTOS || window.HOMEPAGE_PHOTOS;
