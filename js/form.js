'use strict';

(() => {
  const priceMap = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  }; // как словарь можно записать?

  const RoomMap = {
    MIN: 1,
    MAX: 100
  };

  const GuestsMin = `0`;

  const capacity = {
    1: {
      key: [1],
      message: `1 комната для 1-го гостя`
    },
    2: {
      key: [1, 2],
      message: `2 комнаты для 1-го или 2-х гостей`
    },
    3: {
      key: [1, 2, 3],
      message: `3 комнаты для 1-го, 2-х или 3-х гостей`
    },
    100: {
      key: [0],
      message: `100 комнат не для гостей`
    }
  }; // Словарь?


  const map = document.querySelector(`.map`);
  const mapFormFilters = map.querySelectorAll(`select, fieldset`);
  const adForm = document.querySelector(`.ad-form`);
  const fieldsets = adForm.querySelectorAll(`fieldset`);
  const roomNumberSelect = adForm.querySelector(`#room_number`);
  const capacitySelect = adForm.querySelector(`#capacity`);
  const apartmentTypeSelect = adForm.querySelector(`#type`);
  const priceInput = adForm.querySelector(`#price`);
  const checkinSelect = adForm.querySelector(`#timein`);
  const checkoutSelect = adForm.querySelector(`#timeout`);

  const capacityChangeHandler = () => {
    const rooms = roomNumberSelect.value;
    const guests = capacitySelect.value;
    const selectValue = capacity[rooms];
    if (+guests > selectValue.key.length || (+guests === GuestsMin && +rooms === RoomMap.MAX)) {
      capacitySelect.setCustomValidity(selectValue.message);
    } else if (+rooms === RoomMap.MAX && +guests === RoomMap.MIN || +rooms === RoomMap.MIN && +guests === GuestsMin) {
      capacitySelect.setCustomValidity(selectValue.message);
    } else {
      capacitySelect.setCustomValidity(``);
    }
    capacitySelect.reportValidity();
  };

  const minPriceChangeHandler = () => {
    const price = +priceInput.value;
    const minPrice = priceMap[apartmentTypeSelect.options[apartmentTypeSelect.selectedIndex].value];
    priceInput.placeholder = minPrice;
    priceInput.min = minPrice;

    if (price < minPrice) {
      priceInput.setCustomValidity(`Минимальная цена для данного размещения ${minPrice}`);
    } else if (price > +priceInput.max) {
      priceInput.setCustomValidity(`Максимально возможая цена ${priceInput.max}`);
    } else {
      priceInput.setCustomValidity(``);
    }
    priceInput.reportValidity();
  };

  const checkInOutChangeHandler = (evt) => {
    checkinSelect.value = evt.target.value;
    checkoutSelect.value = evt.target.value;
  };

  roomNumberSelect.addEventListener(`change`, capacityChangeHandler);
  capacitySelect.addEventListener(`change`, capacityChangeHandler);
  apartmentTypeSelect.addEventListener(`change`, minPriceChangeHandler);
  priceInput.addEventListener(`change`, minPriceChangeHandler);
  checkinSelect.addEventListener(`change`, checkInOutChangeHandler);
  checkoutSelect.addEventListener(`change`, checkInOutChangeHandler);

  const disabledForm = () => {
    window.util.fieldsOff(mapFormFilters);
    window.util.fieldsOff(fieldsets);
  };

  const activeForm = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);
    window.util.fieldsOn(mapFormFilters);
    window.util.fieldsOn(fieldsets);
  };

  window.form = {
    disabledForm,
    activeForm
  };
})();
