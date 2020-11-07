'use strict';
const Url = {
  GET: `https://21.javascript.pages.academy/keksobooking/data`,
  POST: `https://21.javascript.pages.academy/keksobooking`,
};

const InitialPosition = {
  left: `570px`,
  top: `375px`
};

const map = document.querySelector(`.map`);
const mapPinMain = map.querySelector(`.map__pin--main`);
const mapFormFilters = map.querySelectorAll(`select, fieldset`);
const adForm = document.querySelector(`.ad-form`);
const adFormResetButton = adForm.querySelector(`.ad-form__reset`);

const onMainPinPressEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
  window.mainPin.setCoords();
};

const onMainPinPressMouse = (evt) => {
  window.util.isMouseEvent(evt, activatePage);

};

const onAdFormResetClick = () => {
  deactivatePage();
};

const successHandler = (serverData) => {
  window.pins.render(serverData);
};

const errorHandler = (errorMessage) => {
  window.serverMessage.renderError(errorMessage);
};

/**
 * Активирует страницу, удаляет классы и атрибуты, блоктрующие страницу
 */
const activatePage = () => {
  map.classList.remove(`map--faded`);
  window.util.fieldsOn(mapFormFilters);
  window.mainPin.setCoords();
  window.form.active();
  window.backend.sendRequest(`GET`, Url.GET, ``, successHandler, errorHandler);
  mapPinMain.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinMain.removeEventListener(`click`, onMainPinPressMouse);
  adFormResetButton.addEventListener(`click`, onAdFormResetClick);
};

const deactivatePage = () => {
  window.util.fieldsOff(mapFormFilters);
  map.classList.add(`map--faded`);
  window.form.disable();
  adForm.reset();
  mapPinMain.style.left = InitialPosition.left;
  mapPinMain.style.top = InitialPosition.top;
  window.mainPin.setCoords();
  window.pins.remove();
  window.card.remove();
  adFormResetButton.removeEventListener(`click`, onAdFormResetClick);
  mapPinMain.addEventListener(`mousedown`, onMainPinPressMouse);
  mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);
};

/**
 * Добавляет обработчик событий mousedown (левая кнопка) И Enter
 */
mapPinMain.addEventListener(`mousedown`, onMainPinPressMouse);
mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);

deactivatePage();
