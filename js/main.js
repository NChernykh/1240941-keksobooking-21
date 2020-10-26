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

const Type = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

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
    message: `1 комната для 1-го гостя`
  },
  2: {
    key: [1, 2],
    message: `2 комнаты для 1-го или 2-х гостей`
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
        type: getRandomElement(Object.keys(Type)),
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
const pinTemplate = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const mapFiltersContainer = map.querySelector(`.map__filters-container`);

/**
 * Создвет DOM-элемент метки (клонирует шаблон и заполняет его данными метки)
 * @param {Object} offerData данные объявления
 * @return {*} DOM-элемент
 */
const renderPin = (offerData) => {
  const pinElement = pinTemplate.cloneNode(true);
  const avatarImg = pinElement.querySelector(`img`);

  pinElement.style.left = `${offerData.location.x - Pin.WIDTH / 2}px`;
  pinElement.style.top = `${offerData.location.y - Pin.HEIGHT}px`;
  avatarImg.src = offerData.author.avatar;
  avatarImg.alt = offerData.offer.title;
  return pinElement;
};

/**
 * Создает фрагмент документа (коллекция из DOM-элементов меток объяв)
 * @param {Array} offersArr массив объявлений
 * @return {*} фрагмент документа
 */
const renderPins = (offersArr) => {
  const fragment = document.createDocumentFragment();

  offersArr.forEach(function (offerData) {
    fragment.appendChild(renderPin(offerData));
  });

  return fragment;
};

/**
 * Создает карточку объявления
 * @param {object} item Объект объявления
 */
const renderCard = (item) => {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const card = cardTemplate.cloneNode(true);

  const getFeature = (offerData) => {
    const fragment = document.createDocumentFragment();
    const popupFeatures = card.querySelector(`.popup__features`);

    offerData.offer.features.forEach(function (featuresElem) {
      const element = document.createElement(`li`);
      element.className = `popup__feature popup__feature--${featuresElem}`;
      fragment.appendChild(element);
    });

    popupFeatures.appendChild(fragment);
    return popupFeatures;
  };

  const getPhotos = function (offerData) {
    const fragment = document.createDocumentFragment();
    const popupPhotos = card.querySelector(`.popup__photos`);
    const photo = popupPhotos.querySelector(`.popup__photo`);
    popupPhotos.removeChild(photo);

    offerData.offer.photos.forEach(function (photosElem) {
      const element = document.createElement(`img`);
      element.src = photosElem;
      element.width = 45;
      element.height = 40;
      element.alt = item.offer.title;
      fragment.appendChild(element);
    });

    popupPhotos.appendChild(fragment);
    return popupPhotos;
  };

  card.querySelector(`.popup__title`).textContent = item.offer.title;
  card.querySelector(`.popup__text--address`).textContent = item.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
  card.querySelector(`.popup__type`).textContent = Type[item.offer.type];
  card.querySelector(`.popup__text--capacity`).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  getFeature(item);
  card.querySelector(`.popup__description`).textContent = item.offer.description;
  getPhotos(item);
  card.querySelector(`.popup__avatar`).src = item.author.avatar;

  map.insertBefore(card, mapFiltersContainer);
};

const onPopupKeyPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closePopup();
  }
};

const closePopup = function () {
  let mapCard = map.querySelector(`.map__card`);
  mapCard.remove();
  document.removeEventListener(`keydown`, onPopupKeyPress);
};

const openPopup = (pinNumber) => {
  let mapCard = map.querySelector(`.map__card`);

  if (mapCard) {
    mapCard.remove();
  }
  renderCard(pinNumber);
  const cardClose = map.querySelector(`.popup__close`);
  document.addEventListener(`keydown`, onPopupKeyPress);
  cardClose.addEventListener(`click`, closePopup);
};

const mapPinMain = map.querySelector(`.map__pin--main`);
const pinsContainer = map.querySelector(`.map__pins`);
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
  fields.forEach((field) => {
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

  const offerArr = offersList(NUMBER_OF_OFFERS);
  pinsContainer.appendChild(renderPins(offerArr));

  const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin, index) => {
    pin.hidden = false;
    pin.addEventListener(`click`, () => {
      openPopup(offerArr[index]);
    });
  });
};

/**
 * Добавляет обработчик событий mousedown (левая кнопка)
 */
mapPinMain.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
  addressInput.value = `${getCoords(mapPinMain).left}, ${getCoords(mapPinMain).top}`;
});

mapPinMain.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
  addressInput.value = `${getCoords(mapPinMain).left}, ${getCoords(mapPinMain).top}`;
});

function capacityChangeHandler() {
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
}

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
};

roomNumberSelect.addEventListener(`change`, capacityChangeHandler);
capacitySelect.addEventListener(`change`, capacityChangeHandler);
apartmentTypeSelect.addEventListener(`change`, MinPriceChangeHandler);
priceInput.addEventListener(`change`, MinPriceChangeHandler);
checkinSelect.addEventListener(`change`, CheckInOutChangeHandler);
checkoutSelect.addEventListener(`change`, CheckInOutChangeHandler);
