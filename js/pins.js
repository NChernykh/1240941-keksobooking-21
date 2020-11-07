'use strict';

(() => {
  const NUMBER_OF_PINS = 20;
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
      window.card.openPopup(offerData);
    };

    const onPinEnterPress = () => {
      window.card.openPopup(offerData);
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
    if (document.querySelector(`.map__pin:not(.map__pin--main)`)) {
      const mapPins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      mapPins.forEach((pin) => {
        pin.remove();
      });
    }
  };

  /**
   * Отрисовывает пины объявлений
   * @param {Array} ads Массивы объявлений
   */
  const renderPins = (ads) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < Math.min(NUMBER_OF_PINS, ads.length); i++) {
      fragment.appendChild(renderPin(ads[i]));
    }

    pinsContainer.appendChild(fragment);
  };

  window.pins = {
    render: renderPins,
    remove: removePins
  };
})();
