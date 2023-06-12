import { searchImages } from './api.js';
import Notiflix from 'notiflix';
import getRefs from './refs.js';
let page = 1;
let prePage = 40;
let currentSearchQuery = '';
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;
  currentSearchQuery = searchQuery;
  page = 1;
  clearGallery();
  refs.loadMoreButton.classList.add('hidden');
  searchImages(searchQuery, page, prePage)
    .then(data => {
      data.hits.forEach(image => {
        createPhotoCard(image);
      });
      refs.loadMoreButton.classList.remove('hidden');
      page++;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

refs.loadMoreButton.addEventListener('click', loadMoreImages);

function loadMoreImages() {
  searchImages(currentSearchQuery, page, prePage)
    .then(data => {
      data.hits.forEach(image => {
        createPhotoCard(image);
      });
      page++;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

const createPhotoCard = hits => {
  const markupPhotoCard = `<div class="photo-card">
  <img src="${hits[0].webformatURL}" 
  alt="${hits[0].tags}" 
  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${hits[0].likes}</b>
    </p>
    <p class="info-item">
      <b>${hits[0].views}</b>
    </p>
    <p class="info-item">
      <b>${hits[0].comments}</b>
    </p>
    <p class="info-item">
      <b>${hits[0].downloads}</b>
    </p>
  </div>
</div>`;

  refs.gallery.innerHTML = markupPhotoCard;
};

function clearGallery() {
  refs.gallery.innerHTML = '';
}
