'use strict';

const MainPin = {
  WIDTH: 65,
  HEIGHT: 87
};

const mapPinMain = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelectorAll(`#address`);


/**
 * Отдает координаты Пина
 * @param {element} pin любая метка
 */
const getCoords = (pin) => {
  let box = pin.getBoundingClientRect();
  const X = Math.round(box.left + pageXOffset + MainPin.WIDTH / 2);
  const Y = Math.round(box.top + pageYOffset + MainPin.HEIGHT);
  addressInput.value = `${X}, ${Y}`;
};

const onMainPinPressEnter = (evt) => {
  window.util.isEnterEvent(evt, activatePage);
};

/**
 * Активирует страницу, удаляет классы и атрибуты, блоктрующие страницу
 */
const activatePage = () => {
  window.form.activeForm();
  window.data.renderPins();
  window.data.onPinClick();
  getCoords(mapPinMain);
  mapPinMain.removeEventListener(`keydown`, onMainPinPressEnter);
  mapPinMain.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      activatePage();
    }
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
});

mapPinMain.addEventListener(`keydown`, onMainPinPressEnter);

