import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PixabayApiService from './pixabay-api';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};

const pixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSubmitButtonClick);
refs.button.addEventListener('click', onLoadMoreButtonClick);

function onSubmitButtonClick(e) {
  e.preventDefault();

  clearCadrsContainer();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  requestToPixabayApiService();
}

function onLoadMoreButtonClick() {
  refs.button.classList.add('is-hidden');
  requestToPixabayApiService();
}

function requestToPixabayApiService() {
  pixabayApiService
    .fetchCards()
    .then(renderMarkup)
    .catch(error => console.log(error.stack));
}

function renderMarkup(data) {
  const newMarkup = data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
    <div class="photo-card">
      <a class="photo-link" href="${largeImageURL}">
        <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', newMarkup);
  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
  refs.button.classList.remove('is-hidden');
}

function clearCadrsContainer() {
  refs.gallery.innerHTML = '';
}
