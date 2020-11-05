'use strict';

(() => {
  const NUMBER_OF_OFFERS = 8;

  const Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const offersArray = window.data.getoffers(NUMBER_OF_OFFERS);
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
      for (let pin of mapPins) {
        pin.remove();
      }
    }
  };

  /**
   * Создает фрагмент документа (коллекция из DOM-элементов меток объяв)
   */
  const renderPins = () => {
    const fragment = document.createDocumentFragment();

    offersArray.forEach((offerData) => {
      fragment.appendChild(renderPin(offerData));
    });

    pinsContainer.appendChild(fragment);
  };

  window.pins = {
    render: renderPins,
    remove: removePins
  };
})();
