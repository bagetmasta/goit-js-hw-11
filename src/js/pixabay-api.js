import Notiflix from 'notiflix';
const axios = require('axios').default;

const refs = {
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.load-more'),
};

const BASE_URL =
  'https://pixabay.com/api/?key=28962115-98d4b9d0b477d5dce3ce531ef';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.isItFirstQuery = true;
  }

  async fetchCards() {
    const params = new URLSearchParams({
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    });

    const url = `${BASE_URL}&q=${this.searchQuery}&${params}`;

    const response = await axios.get(url);

    const {
      data: { hits, totalHits },
    } = response;

    if (totalHits === 0) {
      refs.button.classList.add('is-hidden');
      refs.gallery.innerHTML = '';
      throw new Error(
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      );
    }

    if (hits.length < 1) {
      Notiflix.Notify.warning(
        `We're sorry, but you've reached the end of search results.`
      );
      return;
    }

    if (this.isItFirstQuery === false && this.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    this.incrementPage();

    this.isItFirstQuery = false;

    return hits;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
