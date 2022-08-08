const BASE_URL = 'http://localhost:3000';

const options = {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ title: 'Финочка' }),
};

fetch(`${BASE_URL}/books/22`, options);
