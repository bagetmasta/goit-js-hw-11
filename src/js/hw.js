import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;

// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');

const refs = {
  form: document.querySelector('.search-form'),
};

const BASE_URL =
  'https://pixabay.com/api/?key=28962115-98d4b9d0b477d5dce3ce531ef';

refs.form.addEventListener('submit', onSubmitButtonClick);

async function onSubmitButtonClick(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value;
  const requestParameters =
    'image_type=photo&orientation=horizontal&safesearch=true';

  const response = await axios.get(
    `${BASE_URL}&q=${searchQuery}&${requestParameters}`
  );

  const { data } = response;

  console.log(data);
}

// Пример более глубокой деструктуризации

// const {
//   data: {},
// } = response;
