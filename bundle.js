/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/util.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const isEscEvent = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

const isEnterEvent = (evt, action) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    action();
  }
};

const isMouseEvent = (evt, action) => {
  if (evt.button === 0) {
    evt.preventDefault();
    action();
  }
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

/**
 * Удаляет аттрибут disabled
 * @param {object} fields объект с интерактивными элементами
 */
const fieldsOn = (fields) => {
  fields.forEach((field) => {
    field.removeAttribute(`disabled`);
  });
};

const removeItem = (item) => {
  if (item) {
    item.remove();
  }
};

window.util = {
  isEscEvent,
  isEnterEvent,
  isMouseEvent,
  fieldsOff,
  fieldsOn,
  removeItem
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.debounce = ((cb, delay) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, delay);
  };
});

})();

(() => {
/*!***********************!*\
  !*** ./js/backend.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const TIMEOUT = 10000;
const StatusCodes = {
  OK: 200,
  NOT_FOUND: 404
};
/**
 * Загружает и отправляет данные с сервера
 * @param {string} method тип запроса, который отправлям на сервер
 * @param {string} url адрес, куда отправляется запрос
 * @param {object} data данные формы
 * @param {function} onSuccess cb, который запускается в случае успешного запроса
 * @param {function} onError cb, который запускается в случае ошибки
 */
const sendRequest = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCodes.OK:
        onSuccess(xhr.response);
        break;
      case StatusCodes.NOT_FOUND:
        error = `ошибка ${xhr.status} ${xhr.statusText} данные не найдены`;
        break;
      default:
        error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(method, url);
  xhr.send(data);
};

window.backend = {
  sendRequest
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const GUEST_MIN = 0;

const priceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const RoomMap = {
  MIN: 1,
  MAX: 100
};

const capacity = {
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

const adForm = document.querySelector(`.ad-form`);
const fieldsets = adForm.querySelectorAll(`fieldset`);
const roomNumberSelect = adForm.querySelector(`#room_number`);
const capacitySelect = adForm.querySelector(`#capacity`);
const apartmentTypeSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const checkinSelect = adForm.querySelector(`#timein`);
const checkoutSelect = adForm.querySelector(`#timeout`);

const onCapacityChange = () => {
  const rooms = roomNumberSelect.value;
  const guests = capacitySelect.value;
  const selectValue = capacity[rooms];
  if (+guests > selectValue.key.length || (+guests === GUEST_MIN && +rooms < RoomMap.MAX)) {
    capacitySelect.setCustomValidity(selectValue.message);
  } else if (+rooms === RoomMap.MAX && +guests === RoomMap.MIN || +rooms === RoomMap.MIN && +guests === GUEST_MIN) {
    capacitySelect.setCustomValidity(selectValue.message);
  } else {
    capacitySelect.setCustomValidity(``);
  }
  capacitySelect.reportValidity();
};

const onPriceChange = () => {
  priceInput.placeholder = priceMap[apartmentTypeSelect.value];
  priceInput.min = priceMap[apartmentTypeSelect.value];
};

const onCheckInOutChange = (evt) => {
  checkinSelect.value = evt.target.value;
  checkoutSelect.value = evt.target.value;
};

roomNumberSelect.addEventListener(`change`, onCapacityChange);
capacitySelect.addEventListener(`change`, onCapacityChange);
apartmentTypeSelect.addEventListener(`change`, onPriceChange);
priceInput.addEventListener(`change`, onPriceChange);
checkinSelect.addEventListener(`change`, onCheckInOutChange);
checkoutSelect.addEventListener(`change`, onCheckInOutChange);

const disableForm = () => {
  adForm.classList.add(`ad-form--disabled`);
  window.util.fieldsOff(fieldsets);
};

const activeForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
  window.util.fieldsOn(fieldsets);
};

window.form = {
  disable: disableForm,
  active: activeForm,
  onPriceChange
};

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const typesMap = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};

const map = document.querySelector(`.map`);
const mapFiltersContainer = document.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const card = cardTemplate.cloneNode(true);

/**
 * Создает список удобств
 * @param {Array} featuresArray массив удобств
 * @return {HTMLCollection} коллекция удобств
 */
const getFeatures = (featuresArray) => {
  const popupFeatures = card.querySelector(`.popup__features`);
  const featuresList = card.querySelectorAll(`.popup__feature`);
  for (let feature of featuresList) {
    window.util.removeItem(feature);
  }

  featuresArray.forEach((featuresElem) => {
    const featuresItem = document.createElement(`li`);
    featuresItem.className = `popup__feature popup__feature--${featuresElem}`;
    popupFeatures.appendChild(featuresItem);
  });

  return popupFeatures;
};

/**
 * Создает список удобств
 * @param {Array} photosArray массив фото
 * @return {HTMLCollection} коллекция фото
 */
const getPhotos = (photosArray) => {
  const popupPhotos = card.querySelector(`.popup__photos`);
  const photosList = popupPhotos.querySelectorAll(`.popup__photo`);
  for (let photo of photosList) {
    window.util.removeItem(photo);
  }

  photosArray.forEach((photosElem) => {
    const photosItem = document.createElement(`img`);
    photosItem.className = `popup__photo`;
    photosItem.src = photosElem;
    photosItem.width = 45;
    photosItem.height = 40;
    popupPhotos.appendChild(photosItem);
  });

  return popupPhotos;
};

/**
 * Создает карточку объявления
 * @param {object} offerData Объект объявления
 */
const renderCard = (offerData) => {
  card.querySelector(`.popup__title`).textContent = offerData.offer.title;
  card.querySelector(`.popup__text--address`).textContent = offerData.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${offerData.offer.price} ₽/ночь`;
  card.querySelector(`.popup__type`).textContent = typesMap[offerData.offer.type];
  card.querySelector(`.popup__text--capacity`).textContent = `${offerData.offer.rooms} комнаты для ${offerData.offer.guests} гостей`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${offerData.offer.checkin}, выезд до ${offerData.offer.checkout}`;
  card.querySelector(`.popup__description`).textContent = offerData.offer.description;
  card.querySelector(`.popup__avatar`).src = offerData.author.avatar;
  getFeatures(offerData.offer.features);
  getPhotos(offerData.offer.photos);

  map.insertBefore(card, mapFiltersContainer);
};

const removeCard = () => {
  const mapCard = document.querySelector(`.map__card`);
  window.util.removeItem(mapCard);
};

const onPopupKeyPress = (evt) => {
  window.util.isEscEvent(evt, onCardClose);
};

const onCardClose = () => {
  const mapCard = document.querySelector(`.map__card`);
  window.util.removeItem(mapCard);
  document.removeEventListener(`keydown`, onPopupKeyPress);
};

const onCardOpen = (pinNumber) => {
  removeCard();
  renderCard(pinNumber);
  document.addEventListener(`keydown`, onPopupKeyPress);
  const cardClose = map.querySelector(`.popup__close`);
  cardClose.addEventListener(`click`, onCardClose);
};

window.card = {
  onCardClose,
  onCardOpen,
  remove: removeCard
};

})();

(() => {
/*!********************!*\
  !*** ./js/pins.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const pinsContainer = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
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

  const onPinClick = () => {
    window.card.onCardOpen(offerData);
  };

  const onPinEnterPress = () => {
    window.card.onCardOpen(offerData);
  };

  pinElement.addEventListener(`click`, onPinClick);

  pinElement.addEventListener(`keydown`, (evt) => {
    window.util.isEnterEvent(evt, onPinEnterPress);
  });

  return pinElement;
};

/**
 * Удаляет метки
 */
const removePins = () => {
  const mapPin = document.querySelector(`.map__pin:not(.map__pin--main)`);
  const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  if (mapPin) {
    mapPins.forEach((pinElem) => {
      pinElem.remove();
    });
  }
};

/**
 * Отрисовывает пины объявлений
 * @param {Array} ads Массивы объявлений
 */
const renderPins = (ads) => {
  const fragment = document.createDocumentFragment();
  ads.forEach((ad) => {
    fragment.appendChild(renderPin(ad));
  });

  pinsContainer.appendChild(fragment);
};

window.pins = {
  render: renderPins,
  remove: removePins
};

})();

(() => {
/*!***********************!*\
  !*** ./js/mainPin.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MainPin = {
  DIAGONAL: 65,
  SPINE: 22
};

const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

const mapLimits = {
  top: 130 - MainPin.DIAGONAL - MainPin.SPINE,
  right: map.offsetWidth - (MainPin.DIAGONAL / 2),
  left: -(MainPin.DIAGONAL / 2),
  bottom: 630 - MainPin.DIAGONAL - MainPin.SPINE
};

/**
 * Считает координаты и записывает в строку адреса
 */
const setCoords = () => {
  const x = Math.round(mapPinMain.offsetLeft + MainPin.DIAGONAL / 2);
  const y = Math.round(mapPinMain.offsetTop + MainPin.DIAGONAL / 2);
  const spine = Math.round(y + MainPin.DIAGONAL / 2 + MainPin.SPINE);
  addressInput.value = map.classList.contains(`map--faded`) ? `${x - 1}, ${y - 1}` : `${x - 1}, ${spine - 1}`;
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const checkLocation = (coords) => {
    if (coords.x >= mapLimits.right) {
      coords.x = mapLimits.right;
    }
    if (coords.x <= mapLimits.left) {
      coords.x = mapLimits.left;
    }
    if (coords.y >= mapLimits.bottom) {
      coords.y = mapLimits.bottom;
    }
    if (coords.y <= mapLimits.top) {
      coords.y = mapLimits.top;
    }
  };

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const newLocation = {
      x: mapPinMain.offsetLeft - shift.x,
      y: mapPinMain.offsetTop - shift.y
    };

    checkLocation(newLocation);

    mapPinMain.style.top = `${newLocation.y}px`;
    mapPinMain.style.left = `${newLocation.x}px`;

    setCoords();
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    setCoords();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});

window.mainPin = {
  setCoords
};

})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const NUMBER_OF_PINS = 5;
const TIMEOUT = 500;
const mapFiltersForm = document.querySelector(`.map__filters`);
const houseType = mapFiltersForm.querySelector(`#housing-type`);
const housePrice = mapFiltersForm.querySelector(`#housing-price`);
const houseRooms = mapFiltersForm.querySelector(`#housing-rooms`);
const houseGuests = mapFiltersForm.querySelector(`#housing-guests`);
const houseFeatures = mapFiltersForm.querySelector(`#housing-features`);
const priceMap = {
  low: {
    start: 0,
    end: 10000
  },
  middle: {
    start: 10000,
    end: 50000
  },
  high: {
    start: 50000,
    end: Infinity
  }
};

let arrFilterData = [];

/**
 * Создает новый массив c выбранными удобствами
 * @return {array} массив с выбранными удобствами
 */
const getFilterFeatures = () => {
  const checkedFeatures = Array.from(houseFeatures.querySelectorAll(`input:checked`));
  const featuresArray = checkedFeatures.map(function (item) {
    return item.value;
  });
  return featuresArray;
};

/**
 * Фильтрует пины по заданным требованиям
 * @param {Array} data массив, который надо фильтровать
 * @return {Array} новый отфильтрованный массив
 */
const renderData = ((data) => {
  arrFilterData = data;
  return data.filter((item) => {
    let isTypeMatched = houseType.value === `any` ? true : item.offer.type === houseType.value;
    let isRoomsMatched = houseRooms.value === `any` ? true : item.offer.rooms === +houseRooms.value;
    let isGuestMatched = houseGuests.value === `any` ? true : item.offer.guests === +houseGuests.value;
    let isPriceMatched = housePrice.value === `any` ? true : item.offer.price >= priceMap[housePrice.value].start && item.offer.price < priceMap[housePrice.value].end;
    let isFeatureMatched = getFilterFeatures().every((feature) => {
      return item.offer.features.includes(feature);
    });
    return isTypeMatched && isRoomsMatched && isGuestMatched && isPriceMatched && isFeatureMatched;
  }).slice(0, NUMBER_OF_PINS);
});

const onFilterChange = window.debounce(() => {
  window.pins.remove();
  window.card.remove();
  window.pins.render(renderData(arrFilterData));
}, TIMEOUT);

mapFiltersForm.addEventListener(`change`, onFilterChange);

window.filters = {
  renderData
};

})();

(() => {
/*!*********************!*\
  !*** ./js/popup.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const errorElement = errorTemplate.cloneNode(true);
const errorCloseButton = errorElement.querySelector(`.error__button`);

/**
 * Добавляет в DOM сообщение оБ успешной отправке объявления
 */
const getSuccess = () => {
  document.body.appendChild(successElement);

  /**
 * Удаляет сообщение и его обработчики из DOM
 */
  const closeSuccess = () => {
    successElement.remove();
    document.removeEventListener(`click`, onSuccessClick);
    document.removeEventListener(`keydown`, onSuccessEscPress);
  };

  const onSuccessClick = () => {
    closeSuccess();
  };

  const onSuccessEscPress = (evt) => {
    window.util.isEscEvent(evt, closeSuccess);
  };

  document.addEventListener(`click`, onSuccessClick);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

/**
 * Добавляет в DOM сообщение об ошибке
 * @param {String} errorMessage текст ошибки
 */
const getError = (errorMessage) => {
  errorElement.querySelector(`.error__message`).textContent = errorMessage;
  document.body.appendChild(errorElement);

  const onErrorButtonClick = () => {
    closeError();
  };

  const onErrorEscPress = (evt) => {
    window.util.isEscEvent(evt, closeError);
  };

  errorCloseButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`keydown`, onErrorEscPress);

  /**
  * Удаляет сообщение и его обработчики из DOM
  */
  const closeError = () => {
    errorElement.remove();
    document.removeEventListener(`keydown`, onErrorEscPress);
  };
};

window.popup = {
  getSuccess,
  getError
};

})();

(() => {
/*!*******************!*\
  !*** ./js/map.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Url = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`,
};

const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const mapFormFilters = map.querySelectorAll(`select, fieldset`);
const adForm = document.querySelector(`.ad-form`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);

const InitialPosition = {
  LEFT: 570,
  TOP: 375
};

const onMainPinPressEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
};

const onMainPinPressMouse = (evt) => {
  window.util.isMouseEvent(evt, activatePage);

};
/**
 * При клике на сброс формы переводит страницу в неактивное состояние
 */
const onAdFormReset = () => {
  deactivatePage();
};

/**
 * Отправляет данные из формы на сервер посредством XHR и переводит страницу в неактивное состояние
 * @param {object} evt объект события
 */
const onAdFormSubmit = (evt) => {
  evt.preventDefault();
  let dataForm = new FormData(adForm);
  window.backend.sendRequest(`POST`, Url.POST, dataForm, window.popup.getSuccess, window.popup.getError);
  deactivatePage();
};

/**
 * Добавляет обработчик отправки формы
 */
adForm.addEventListener(`submit`, onAdFormSubmit);

/**
 * При успешной загрузке отрисовывает метки на карте с данными с сервера
 * @param {Array} serverData массив данных
 */
const onSuccessDownload = (serverData) => {
  window.util.fieldsOn(mapFormFilters);
  const offers = window.filters.renderData(serverData);
  window.pins.render(offers);
};

/**
 * При ошибке загрузки выводит сообщение
 * @param {String} errorMessage cообщение об ошибке
 */
const onErrorDownload = (errorMessage) => {
  window.popup.getError(errorMessage);
};

/**
 * Активирует страницу, удаляет классы и атрибуты, блоктрующие страницу
 */
const activatePage = () => {
  map.classList.remove(`map--faded`);
  window.mainPin.setCoords();
  window.form.active();
  window.backend.sendRequest(`GET`, Url.GET, ``, onSuccessDownload, onErrorDownload);
  mapPinMain.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinMain.removeEventListener(`click`, onMainPinPressMouse);
  adFormResetButton.addEventListener(`click`, onAdFormReset);
};

/**
 * Переводит страницу в неактивное состояние
 */
const deactivatePage = () => {
  window.util.fieldsOff(mapFormFilters);
  map.classList.add(`map--faded`);
  adForm.reset();
  window.form.onPriceChange();
  window.form.disable();
  mapPinMain.style.left = `${InitialPosition.LEFT}px`;
  mapPinMain.style.top = `${InitialPosition.TOP}px`;
  window.mainPin.setCoords();
  window.pins.remove();
  window.card.remove();
  adFormResetButton.removeEventListener(`click`, onAdFormReset);
  mapPinMain.addEventListener(`mousedown`, onMainPinPressMouse);
  mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);
};

/**
 * Добавляет обработчик событий mousedown (левая кнопка) И Enter
 */
mapPinMain.addEventListener(`mousedown`, onMainPinPressMouse);
mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);

window.map = {
  deactivatePage
};

})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.map.deactivatePage();

})();

/******/ })()
;