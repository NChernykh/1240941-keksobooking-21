'use strict';

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
