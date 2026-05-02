import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
};

const showErrorNotification = message => {
  iziToast.show({
    message,
    color: 'red',
    position: 'topRight',
    timeout: 3000,
  });
};

const onSearchFormSubmit = () => event => {
  event.preventDefault();
  const { target: searchForm } = event;
  const queryString = searchForm.elements['search-text'].value.trim();

  if (!queryString) {
    searchForm.elements['search-text'].value = '';
    showErrorNotification('Please enter a search query');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(queryString)
    .then(data => {
      if (data.hits.length === 0) {
        showErrorNotification(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(data.hits);
    })
    .catch(error => {
      console.error(error);
      showErrorNotification('Something went wrong. Please try again later!');
    })
    .finally(() => hideLoader());
};

refs.form.addEventListener('submit', onSearchFormSubmit());
