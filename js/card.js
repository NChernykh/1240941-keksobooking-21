'use strict';

(() => {
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
   * Создает карточку объявления
   * @param {object} item Объект объявления
   */
  const renderCard = (item) => {

    const getFeatures = (offerData) => {
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
      if (photo) {
        photo.remove();
      }

      offerData.offer.photos.forEach(function (photosElem) {
        const element = document.createElement(`img`);
        element.src = photosElem;
        element.width = 45;
        element.height = 40;
        element.alt = offerData.offer.title;
        fragment.appendChild(element);
      });

      popupPhotos.appendChild(fragment);

      return popupPhotos;
    };

    card.querySelector(`.popup__title`).textContent = item.offer.title;
    card.querySelector(`.popup__text--address`).textContent = item.offer.address;
    card.querySelector(`.popup__text--price`).textContent = `${item.offer.price} ₽/ночь`;
    card.querySelector(`.popup__type`).textContent = typesMap[item.offer.type];
    card.querySelector(`.popup__text--capacity`).textContent = `${item.offer.rooms} комнаты для ${item.offer.guests} гостей`;
    card.querySelector(`.popup__text--time`).textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
    card.querySelector(`.popup__description`).textContent = item.offer.description;
    card.querySelector(`.popup__avatar`).src = item.author.avatar;
    getFeatures(item);
    getPhotos(item);

    map.insertBefore(card, mapFiltersContainer);
  };

  const onPopupKeyPress = (evt) => {
    window.util.isEscEvent(evt, closePopup);
  };

  const closePopup = () => {
    const mapCard = document.querySelector(`.map__card`);
    mapCard.remove();
    document.removeEventListener(`keydown`, onPopupKeyPress);
  };

  const openPopup = (pinNumber) => {
    const mapCard = document.querySelector(`.map__card`);

    if (mapCard) {
      mapCard.remove();
    }
    renderCard(pinNumber);
    document.addEventListener(`keydown`, onPopupKeyPress);
    const cardClose = map.querySelector(`.popup__close`);
    cardClose.addEventListener(`click`, closePopup);
  };

  window.card = {
    renderCard,
    closePopup,
    openPopup
  };
})();
