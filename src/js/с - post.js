const BASE_URL = 'http://localhost:3000';

function addBook(book) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };

  return fetch(`${BASE_URL}/books`, options).then(response => response.json());
}

// addBook({
//   title: 'Тестовая книга для Днепра',
//   author: 'Артем Багмет',
//   genres: ['Как не стать офисником'],
//   rating: 8,
// })
//   .then(renderBook)
//   .catch(error => console.log(error));

// function renderBook(book) {
//   console.log('Пришел ответ от бека');
//   console.log(book);
// }
