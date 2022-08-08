function getFruit(name) {
  const fruits = {
    strawberry: '🍓',
    kiwi: '🥝 ',
    apple: '🍎',
  };

  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(fruits[name]), 500)
  );
}

async function aMakeSmoothie() {
  try {
    console.time('aMakeSmoothie');
    const apple = await getFruit('apple');
    console.log('Проверка');
    const a = x();
    const kiwi = await getFruit('kiwi');
    const berry = await getFruit('strawberry');

    // const fruits = await Promise.all([apple, kiwi, berry]);
    // console.log(fruits);
    console.timeEnd('aMakeSmoothie');

    // return fruits;
  } catch (error) {
    console.log('Ошибка');
  }
}

aMakeSmoothie();

function x() {
  console.log('hi');
}
