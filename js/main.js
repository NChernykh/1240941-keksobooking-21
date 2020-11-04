'use strict';

const mapPinMain = document.querySelector(`.map__pin--main`);

const onMainPinPressEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
};

/**
 * Активирует страницу, удаляет классы и атрибуты, блоктрующие страницу
 */
const activatePage = () => {
  window.form.active();
  window.pins.render();
  window.mainPin.getCoords();
  mapPinMain.removeEventListener(`keydown`, onMainPinPressEnter);
};

const deactivatePage = () => {
  window.mainPin.getCoords();
  window.form.disable();
};

/**
 * Добавляет обработчик событий mousedown (левая кнопка)
 */
mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    evt.preventDefault();
    activatePage();
  }
});

mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);

deactivatePage();
