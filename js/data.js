'use strict';

(() => {
  const NUMBER_OF_OFFERS = 8;

  const TITLES = [
    `Unique`,
    `Telmo`,
    `Recoleta`,
    `Iguazu`,
    `Palermo`,
    `Madero`,
    `Hilton`,
    `MArriott`
  ];

  const TYPE = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];

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

  const RangeX = {
    MIN: 0,
    MAX: 1200
  };

  const RangeY = {
    MIN: 130,
    MAX: 630
  };

  const Price = {
    MIN: 0,
    MAX: 100000
  };
  const Rooms = {
    MIN: 1,
    MAX: 3,
    NOGUESTS: 100
  };
  const Guests = {
    MIN: 0,
    MAX: 3
  };

  const Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const pinsContainer = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  /**
   * Генерирует моки объявлений
   * @param {number} offersNumber Количество объявлений
   * @return {array} Массив объявлений
   */
  const getoffersData = (offersNumber) => {
    const offersArray = [];

    for (let i = 1; i <= offersNumber; i++) {
      const locationX = window.util.getRandomInteger(RangeX.MIN, RangeX.MAX);
      const locationY = window.util.getRandomInteger(RangeY.MIN, RangeY.MAX);
      offersArray.push({
        author: {
          avatar: `img/avatars/user0${[i]}.png`,
        },
        offer: {
          title: window.util.getRandomElement(TITLES),
          address: `${locationX}, ${locationY}`,
          price: window.util.getRandomInteger(Price.MIN, Price.MAX),
          type: window.util.getRandomElement(TYPE),
          rooms: window.util.getRandomInteger(Rooms.MIN, Rooms.MAX),
          guests: window.util.getRandomInteger(Guests.MIN, Guests.MAX),
          checkin: window.util.getRandomElement(CHECKIN_CHECKOUT),
          checkout: window.util.getRandomElement(CHECKIN_CHECKOUT),
          features: window.util.getRandomArraySize(FEATURES),
          description: `Описание`,
          photos: window.util.getRandomArraySize(PHOTOS)
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }

    return offersArray;
  };

  const offersArray = getoffersData(NUMBER_OF_OFFERS);
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
   */
  const renderPins = () => {
    const fragment = document.createDocumentFragment();

    offersArray.forEach((offerData) => {
      fragment.appendChild(renderPin(offerData));
    });

    pinsContainer.appendChild(fragment);
  };

  const onPinClick = () => {
    const pins = pinsContainer.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin, index) => {
      pin.hidden = false;
      pin.addEventListener(`click`, () => {
        window.card.openPopup(offersArray[index]);
      });
    });
  };


  window.data = {
    renderPins,
    onPinClick
  };
})();
