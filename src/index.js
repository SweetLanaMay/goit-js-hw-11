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

  const searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  console.log(searchQuery)
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
      data.hits.forEach(hits => {
        createPhotoCard(hits);
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
  <img src="${hits.webformatURL}" 
  alt="${hits.tags}" 
  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: </b>${hits.likes}
    </p>
    <p class="info-item">
      <b>Views: </b>${hits.views}
    </p>
    <p class="info-item">
      <b>Comments: </b>${hits.comments}
    </p>
    <p class="info-item">
      <b>Downloads: </b>${hits.downloads}
    </p>
  </div>
</div>`;

  refs.gallery.innerHTML = markupPhotoCard;
};

function clearGallery() {
  refs.gallery.innerHTML = '';
}
