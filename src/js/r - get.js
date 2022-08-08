const BASE_URL = 'http://localhost:3000';

function fetchBooks() {
  return fetch(`${BASE_URL}/books`).then(response => response.json());
}

fetchBooks();
