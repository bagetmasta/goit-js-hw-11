import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const BASE_URL =
  'https://pixabay.com/api/?key=28962115-98d4b9d0b477d5dce3ce531ef';

const REQUEST_PARAMETRS =
  'image_type=photo&orientation=horizontal&safesearch=true';

refs.form.addEventListener('submit', onSubmitButtonClick);

async function onSubmitButtonClick(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;

  const response = await axios.get(
    `${BASE_URL}&q=${searchQuery}&${REQUEST_PARAMETRS}`
  );

  const {
    data: { hits },
  } = response;

  if (hits.length === 0) {
    refs.gallery.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

    return;
  }

  const newMarkup = renderMarkup(hits);

  const lightbox = new SimpleLightbox('.gallery a');
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

  refs.gallery.innerHTML = newMarkup;
}
