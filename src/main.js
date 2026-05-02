import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PER_PAGE } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  appendGallery,
  hideLoader,
  showLoader,
  hideLoadMoreBtn,
  showLoadMoreBtn,
} from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

const ERROR_MESSAGE = 'Something went wrong. Please try again later!';

let queryString = '';
let page = 1;
let totalHits = 0;

const showErrorNotification = message => {
  iziToast.show({
    message,
    color: 'red',
    position: 'topRight',
    timeout: 3000,
  });
};

const showWarningNotification = message => {
  iziToast.show({
    message,
    color: 'orange',
    position: 'topRight',
    timeout: 3000,
  });
};

const hasMorePages = () => page * PER_PAGE < totalHits;

const onSearchFormSubmit = () => async event => {
  try {
    event.preventDefault();
    const { target: searchForm } = event;
    queryString = searchForm.elements['search-text'].value.trim();

    if (!queryString) {
      searchForm.elements['search-text'].value = '';
      showErrorNotification('Please enter a search query');
      return;
    }

    page = 1;
    clearGallery();
    hideLoadMoreBtn();
    showLoader();

    const data = await getImagesByQuery(queryString, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      showErrorNotification(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      return;
    }

    createGallery(data.hits);

    if (hasMorePages()) {
      showLoadMoreBtn();
    }
  } catch (error) {
    console.error(error);
    showErrorNotification(ERROR_MESSAGE);
  } finally {
    hideLoader();
  }
};

const onLoadMoreClick = async () => {
  page += 1;
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(queryString, page);
    appendGallery(data.hits);

    if (hasMorePages()) {
      showLoadMoreBtn();
    } else {
      showWarningNotification(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.error(error);
    showErrorNotification(ERROR_MESSAGE);
  } finally {
    hideLoader();
  }
};

refs.form.addEventListener('submit', onSearchFormSubmit());
refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
