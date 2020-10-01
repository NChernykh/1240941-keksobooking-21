'use strict';

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

const MIN_X = 0;
const MAX_X = map.offsetWidth;
const Y_MIN = 130;
const Y_MAX = 630;
const MIN_PRICE = 0;
const MAX_PRICE = 10000;

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
 * Перемешивает элементы массива
 * @param {array} array Случайный массив
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

