import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { searchPixabayImages } from './js/pixabay-api.js';
import {
  createGallery,
  renderMoreImages,
  clearGallery,
} from './js/render-functions.js';

const searchBar = document.querySelector('#search-bar');
const searchBarForm = document.querySelector('#search-bar-form');
const loader = document.querySelector('body > .loader');
const loadMoreImagesBtn = document.querySelector('#btn-load-more');
const loadMoreLoader = document.querySelector('.load-more-block .loader');
let page = 1;
let perPage = 15;
let lightbox;
let seachValue;

const toggleElement = (element, className, isActive) => {
  element.classList.toggle(className, isActive);
};

const hasNotFoundImages = data => {
  return !data.hits || !data.hits.length;
};

const hasMoreImages = (page, perPage, totalHits) => {
  return page * perPage < totalHits;
};

const showToastMessage = (type, message) => {
  iziToast[type]({
    message,
    position: 'topRight',
  });
};

const scrollDown = () => {
  const imageCard = document.querySelector('.image-card');
  const { height } = imageCard.getBoundingClientRect();
  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
};

const handleSearch = async event => {
  event.preventDefault();

  try {
    const form = event.target;
    seachValue = form.elements.search.value;

    if (seachValue.trim().length === 0) {
      return;
    }

    toggleElement(loadMoreImagesBtn, 'show', false);
    toggleElement(loader, 'is-active', true);
    page = 1;
    const data = await searchPixabayImages(seachValue, page, perPage);

    if (hasNotFoundImages(data)) {
      showToastMessage(
        'error',
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    createGallery(data.hits);

    if (hasMoreImages(page, perPage, data.totalHits)) {
      toggleElement(loadMoreImagesBtn, 'show', true);
    }

    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
    lightbox.refresh();
  } catch (error) {
    console.error(error);
    showToastMessage('error', error.message);
  } finally {
    toggleElement(loader, 'is-active', false);
  }
};

const handleLoadMoreImages = async event => {
  try {
    if (!seachValue || seachValue.trim().length === 0) {
      return;
    }

    page += 1;
    toggleElement(loadMoreImagesBtn, 'show', false);
    toggleElement(loadMoreLoader, 'is-active', true);
    const data = await searchPixabayImages(seachValue, page, perPage);

    if (hasNotFoundImages(data)) {
      showToastMessage(
        'error',
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    renderMoreImages(data.hits);
    scrollDown();

    if (hasMoreImages(page, perPage, data.totalHits)) {
      toggleElement(loadMoreImagesBtn, 'show', true);
    } else {
      showToastMessage(
        'info',
        "We're sorry, but you've reached the end of search results."
      );
    }

    lightbox.refresh();
  } catch (error) {
    console.error(error);
    showToastMessage('error', error.message);
  } finally {
    toggleElement(loadMoreLoader, 'is-active', false);
  }
};

const clear = () => {
  createGallery();
  toggleElement(loadMoreImagesBtn, 'show', false);
};

searchBar.addEventListener('input', clear);
searchBarForm.addEventListener('submit', handleSearch);
loadMoreImagesBtn.addEventListener('click', handleLoadMoreImages);
