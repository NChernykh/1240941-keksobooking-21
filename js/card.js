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
  const getPhotos = function (photosArray) {
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

  const onPopupKeyPress = (evt) => {
    window.util.isEscEvent(evt, closePopup);
  };

  const closePopup = () => {
    const mapCard = document.querySelector(`.map__card`);
    window.util.removeItem(mapCard);
    document.removeEventListener(`keydown`, onPopupKeyPress);
  };

  const openPopup = (pinNumber) => {
    const mapCard = document.querySelector(`.map__card`);
    window.util.removeItem(mapCard);
    renderCard(pinNumber);
    document.addEventListener(`keydown`, onPopupKeyPress);
    const cardClose = map.querySelector(`.popup__close`);
    cardClose.addEventListener(`click`, closePopup);
  };

  window.card = {
    closePopup,
    openPopup
  };
})();
