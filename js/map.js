'use strict';

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
