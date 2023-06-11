import searchImages from './api.js';
import Notiflix from 'notiflix';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let page = 1;
let currentSearchQuery = '';

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;
  currentSearchQuery = searchQuery;
  page = 1;
  clearGallery();
  searchImages(searchQuery, page, 40)
    .then(data => {
      data.hits.forEach(image => {
        createPhotoCard(image);
      });
      showLoadMoreButton();
      page++;
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
});

loadMoreButton.addEventListener('click', () => {
  searchImages(currentSearchQuery, page, 40)
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
});

function createPhotoCard(image) {
  const photoCard = document.createElement('div');
  photoCard.classList.add('photo-card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;
  img.loading = 'lazy';

  const info = document.createElement('div');
  info.classList.add('info');

  const likes = createInfoItem('Likes', image.likes);
  const views = createInfoItem('Views', image.views);
  const comments = createInfoItem('Comments', image.comments);
  const downloads = createInfoItem('Downloads', image.downloads);

  info.appendChild(likes);
  info.appendChild(views);
  info.appendChild(comments);
  info.appendChild(downloads);

  photoCard.appendChild(img);
  photoCard.appendChild(info);

  gallery.appendChild(photoCard);
}

function createInfoItem(label, value) {
  const infoItem = document.createElement('p');
  infoItem.classList.add('info-item');
  infoItem.innerHTML = `<b>${label}:</b> ${value}`;
  return infoItem;
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

    
    
    
