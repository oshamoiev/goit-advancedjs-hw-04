import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
  galleryContainer: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const createGalleryItem = image => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img class="gallery-image" src="${image.previewURL}" alt="${image.name}" />
      </a>
      <div class="gallery-stats">
        <div class="gallery-stat">
          <span class="stat-label">Likes</span>
          <span class="stat-value">${image.likes}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Views</span>
          <span class="stat-value">${image.views}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Comments</span>
          <span class="stat-value">${image.comments}</span>
        </div>
        <div class="gallery-stat">
          <span class="stat-label">Downloads</span>
          <span class="stat-value">${image.downloads}</span>
        </div>
      </div>
    </li>
  `;
};

export const createGallery = images => {
  refs.galleryContainer.innerHTML = images
    .map(image => createGalleryItem(image))
    .join('');
  gallery.refresh();
};

export const clearGallery = () => {
  refs.galleryContainer.innerHTML = '';
};

export const showLoader = () => {
  refs.loader.classList.add('is-active');
};

export const hideLoader = () => {
  refs.loader.classList.remove('is-active');
};
