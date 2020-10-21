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

const CHECKIN_CHECKOUT = [
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

const rangeX = {
  MIN: 0,
  MAX: 1200
};

const rangeY = {
  MIN: 130,
  MAX: 630
};

const Price = {
  MIN: 0,
  MAX: 100000
};
const Rooms = {
  MIN: 1,
  MAX: 100
};
const Guests = {
  MIN: 0,
  MAX: 3
};

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const mainPin = {
  WIDTH: 65,
  HEIGHT: 87
};

const priceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const Capacity = {
  1: {
    key: [1],
    message: '1 комната для 1-го гостя'
  },
  2: {
    key: [1, 2],
    message: '2 комнаты для 1-го или 2-х гостей'
  },
  3: {
    key: [1, 2, 3],
    message: `3 комнаты для 1-го, 2-х или 3-х гостей`
  },
  100: {
    key: [0],
    message: `100 комнат не для гостей`
  }
};

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
 * Генерирует моки объявлений
 * @param {number} offersNumber Количество объявлений
 * @return {array} Массив объявлений
 */
const offersList = (offersNumber) => {
  const offersArray = [];


  for (let i = 1; i <= offersNumber; i++) {
    const locationX = getRandomInteger(rangeX.MIN, rangeX.MAX);
    const locationY = getRandomInteger(rangeY.MIN, rangeY.MAX);
    offersArray.push({
      author: {
        avatar: `img/avatars/user0${[i]}.png`,
      },
      offer: {
        title: getRandomElement(TITLE),
        address: `${locationX}, ${locationY}`,
        price: getRandomInteger(Price.MIN, Price.MAX),
        type: getRandomElement(TYPE),
        rooms: getRandomInteger(Rooms.MIN, Rooms.MAX),
        guests: getRandomInteger(Guests.MIN, Guests.MAX),
        checkin: getRandomElement(CHECKIN_CHECKOUT),
        checkout: getRandomElement(CHECKIN_CHECKOUT),
        features: getRandomArraySize(FEATURES),
        description: `Описание`,
        photos: getRandomArraySize(PHOTOS)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return offersArray;
};

const map = document.querySelector(`.map`);
const marksList = map.querySelector(`.map__pins`);
const markElementTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);

/**
 * Создвет DOM-элемент метки (клонирует шаблон и заполняет его данными метки)
 * @param {Object} newOffer данные объявления
 * @return {*} DOM-элемент
 */
const renderMark = (newOffer) => {
  const markElement = markElementTemplate.cloneNode(true);
  const avatarImg = markElement.querySelector(`img`);

  markElement.style.left = `${newOffer.location.x - Pin.WIDTH / 2}px`;
  markElement.style.top = `${newOffer.location.y - Pin.HEIGHT}px`;
  avatarImg.src = newOffer.author.avatar;
  avatarImg.alt = newOffer.offer.title;
  return markElement;
};

/**
 * Создает фрагмент документа (коллекция из DOM-элементов меток объяв)
 * @param {Array} newOffers массив объявлений
 * @return {*} фрагмент документа
 */
const renderMarks = (newOffers) => {
  const fragment = document.createDocumentFragment();

  newOffers.forEach(function (newOffer) {
    fragment.appendChild(renderMark(newOffer));
  });

  return fragment;
};

const mapPin = map.querySelector(`.map__pin--main`);
const mapFormFilters = map.querySelectorAll(`select, fieldset`);


const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const addressInput = adForm.querySelector(`#address`);
const roomNumberSelect = adForm.querySelector(`#room_number`);
const capacitySelect = adForm.querySelector(`#capacity`);
const apartmentTypeSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const checkinSelect = adForm.querySelector(`#timein`);
const checkoutSelect = adForm.querySelector(`#timeout`);

/**
 * Отдает координаты Пина
 * @param {element} pin любая метка
 * @return {object} объект с координатами пина X и Y
 */
const getCoords = (pin) => {
  let box = pin.getBoundingClientRect();

  return {
    left: Math.round(box.left + pageXOffset + mainPin.WIDTH / 2),
    top: Math.round(box.top + pageYOffset + mainPin.HEIGHT)
  };
};

/**
 * Добавляет аттрибут disabled всем интерактивным элементам
 * @param {object} fields Объект с интерактивными элементами
 */
const fieldsOff = (fields) => {
  fields.forEach(function (field) {
    field.setAttribute(`disabled`, `true`);
  });
};

fieldsOff(mapFormFilters);
fieldsOff(fieldsets);

/**
 * Удаляет аттрибут disabled
 * @param {object} fields объект с интерактивными элементами
 */
const fieldsOn = (fields) => {
  fields.forEach((field) => {
    field.removeAttribute(`disabled`);
  });
};

/**
 * Активирует страницу, удаляет классы и атрибуты, блоктрующие страницу
 */
const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  fieldsOn(mapFormFilters);
  fieldsOn(fieldsets);
  marksList.appendChild(renderMarks(offersList(NUMBER_OF_OFFERS)));
};

/**
 * Добавляет обработчик событий mousedown (левая кнопка)
 */
mapPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
  addressInput.value = `${getCoords(mapPin).left}, ${getCoords(mapPin).top}`;
});

mapPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
  addressInput.value = `${getCoords(mainPin).left}, ${getCoords(mainPin).top}`;
});

const capacityChangeHandler = () => {
  const rooms = roomNumberSelect.value;
  const guests = capacitySelect.value;
  const selectValue = Capacity[rooms];
  if (+guests > selectValue.key.length || (+guests === Guests.MIN && +rooms === Rooms.MAX)) {
    capacitySelect.setCustomValidity(selectValue.message);
  } else if (+rooms === Rooms.MAX && +guests === Rooms.MIN || +rooms === Rooms.MIN && +guests === Guests.MIN) {
      capacitySelect.setCustomValidity(selectValue.message);
    } else {
    capacitySelect.setCustomValidity(``);
  }
  capacitySelect.reportValidity();
};

const MinPriceChangeHandler = () => {
  const price = +priceInput.value;
  const minPrice = priceMap[apartmentTypeSelect.options[apartmentTypeSelect.selectedIndex].value];
  priceInput.placeholder = minPrice;
  priceInput.min = minPrice;

  if (price < minPrice) {
    priceInput.setCustomValidity(`Минимальная цена для данного размещения ${minPrice}`);
  } else if (price > +priceInput.max) {
    priceInput.setCustomValidity(`Максимально возможая цена ${priceInput.max}`);
  } else {
    priceInput.setCustomValidity(``);
  }
  priceInput.reportValidity(); // И цена тоже
};

const CheckInOutChangeHandler = (evt) => {
  checkinSelect.value = evt.target.value;
  checkoutSelect.value = evt.target.value;
  const check = checkinSelect;
};

roomNumberSelect.addEventListener(`change`, capacityChangeHandler);
capacitySelect.addEventListener(`change`, capacityChangeHandler);
apartmentTypeSelect.addEventListener(`change`, MinPriceChangeHandler);
priceInput.addEventListener(`change`, MinPriceChangeHandler);
checkinSelect.addEventListener(`change`, CheckInOutChangeHandler);
checkoutSelect.addEventListener(`change`, CheckInOutChangeHandler);
