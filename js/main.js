'use strict';
const NUMBER_OF_OFFERS = 8;
const TITLE = [
  `Unique`,
  `Telmo`,
  `Recoleta`,
  `Iguazu`,
  `Palermo`,
  `Madero`,
  `Hilton`,
  `MArriott`
];

const TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const CHECKIN = [
  `12:00`,
  `13:00`,
  `14:00`
];

const CHECKOUT = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector('.map');
map.classList.remove(`map--faded`);

const X_MIN = 0;
const X_MAX = map.offsetWidth;
const Y_MIN = 130;
const Y_MAX = 630;
const PRICE_MIN = 1000;
const PRICE_MAX = 100000;
const ROOM_MIN = 1;
const ROOM_MAX = 3; //Или массив лучше?
const GUESTS_MIN = 0;
const GUESTS_MAX = 2;


/**
 * Выбирает случайное целое число от min до max включительно.
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Случайное целое число
 */
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

/**
 * Выбирает рандомный элемент из массива
 * @param {Array} array случайный массив
 * @return {*} случайный элемент массива
 */
const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Создает массив случайной длины
 * @param {array} array Случайный массив
 * @return {array} Массив случайной длины
 */
const getRandomArraySize = (array) => {
  return array.slice(0, getRandomInteger(0, array.length - 1));
};

/**
 * Перемешивает элементы в массиве
 * @param {Array} array случайный массив
 * @return {Array} перемешанный массив
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let swap = array[i];
    array[i] = array[j];
    array[j] = swap;
  }

  return array;
};

/**
 * Создает массив с адресами аватаров
 * @param {number} number количество аватаров
 * @return {array} Массив адресов вида: 01, 02...
 */
const getAvatarName = (number) => {
  const avatarArray = [];
  for (let i = 1; i <= number; i++) {
    avatarArray.push(`0${i}`);
  }

  return avatarArray;
};

const shuffleNames = shuffleArray(getAvatarName(NUMBER_OF_OFFERS));

/**
 * Генерирует моки объявлений
 * @param {number} number Количество объявлений
 * @return {array} Массив объявлений
 */
const offersList = (number) => {
  const offersArray = [];
  for (let i = 0; i < number; i++) {
    offersArray.push({
      author: {
        avatar: `img/avatars/user${shuffleNames[i]}.png`,
      },
      offer: {
        title: getRandomElement(TITLE),
        price: getRandomInteger(PRICE_MIN, PRICE_MAX),
        type: getRandomElement(TYPE),
        rooms: getRandomInteger(ROOM_MIN, ROOM_MAX),
        guests: getRandomInteger(GUESTS_MIN, GUESTS_MAX),
        checkin: getRandomElement(CHECKIN),
        checkout: getRandomElement(CHECKOUT),
        features: getRandomArraySize(FEATURES),
        description: `Описание`,
        photos: getRandomArraySize(PHOTOS)
      },
      location: {
        x: getRandomInteger(X_MIN, X_MAX ),
        y: getRandomInteger(Y_MIN, Y_MAX)
      }
    });
  }

  return offersArray
};

const marksList = map.querySelector(`.map__pins`);
const markElementTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

/**
 * Создвет DOM-элемент метки (клонирует шаблон и заполняет его данными метки)
 * @param {Object} offer объект ъявления
 * @return {*} DOM-элемент
 */
const renderMark = (newOffer) => {
  const markElement = markElementTemplate.cloneNode(true);

  markElement.style.left = `${newOffer.location.x - PIN_WIDTH / 2}px`;
  markElement.style.top = `${newOffer.location.y - PIN_HEIGHT}px`;
  markElement.querySelector(`img`)
    .src = newOffer.author.avatar;
    markElement.querySelector(`img`)
    .alt = newOffer.offer.title;
  return markElement;
};

/**
 * Создает фрагмент документа (коллекция из DOM-элементов меток объяв)
 * @param {Array} array массив объявлений
 * @return {*} фрагмент документа
 */
const getFragment = (array) => {
  const fragment = document.createDocumentFragment();

  array.forEach(function (element) {
    fragment.appendChild(renderMark(element));
  });

  return fragment;
};

marksList.appendChild(getFragment(offersList(NUMBER_OF_OFFERS)));
