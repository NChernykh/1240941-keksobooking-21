'use strict';

const GUEST_MIN = 0;

const priceMap = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const RoomMap = {
  MIN: 1,
  MAX: 100
};

const FILE_TYPES = [
  `gif`,
  `jpg`,
  `jpeg`,
  `png`
];

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
};

const adForm = document.querySelector(`.ad-form`);
const avatarInput = adForm.querySelector(`#avatar`);
const avatarPreview = adForm.querySelector(`.ad-form-header__preview img`);
const imagesInput = adForm.querySelector(`#images`);
const imagesPreview = adForm.querySelector(`.ad-form__photo`);
const avatarPreviewStartSrc = avatarPreview.src;
const fieldsets = adForm.querySelectorAll(`fieldset`);
const roomNumberSelect = adForm.querySelector(`#room_number`);
const capacitySelect = adForm.querySelector(`#capacity`);
const apartmentTypeSelect = adForm.querySelector(`#type`);
const priceInput = adForm.querySelector(`#price`);
const checkinSelect = adForm.querySelector(`#timein`);
const checkoutSelect = adForm.querySelector(`#timeout`);

const getFileChange = (inputFile) => {
  const file = inputFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((end) => {
    return fileName.endsWith(end);
  });

  if (matches) {
    const reader = new FileReader();
    if (inputFile === avatarInput) {

      reader.addEventListener(`load`, () => {
        avatarPreview.src = reader.result;
      });
    } else if (inputFile === imagesInput) {
      reader.addEventListener(`load`, () => {
        imagesPreview.style.backgroundSize = `contain`;
        imagesPreview.style.backgroundImage = `url(${reader.result})`;
      });
    }
    reader.readAsDataURL(file);
  }
};

avatarInput.addEventListener(`change`, ()=> {
  avatarPreview.src = avatarPreviewStartSrc;
  getFileChange(avatarInput);
});

imagesInput.addEventListener(`change`, ()=> {
  imagesPreview.style.backgroundImage = ``;
  getFileChange(imagesInput);
});

const onCapacityChange = () => {
  const rooms = roomNumberSelect.value;
  const guests = capacitySelect.value;
  const selectValue = capacity[rooms];
  if (+guests > selectValue.key.length || (+guests === GUEST_MIN && +rooms < RoomMap.MAX)) {
    capacitySelect.setCustomValidity(selectValue.message);
  } else if (+rooms === RoomMap.MAX && +guests === RoomMap.MIN || +rooms === RoomMap.MIN && +guests === GUEST_MIN) {
    capacitySelect.setCustomValidity(selectValue.message);
  } else {
    capacitySelect.setCustomValidity(``);
  }
  capacitySelect.reportValidity();
};

const onPriceChange = () => {
  priceInput.placeholder = priceMap[apartmentTypeSelect.value];
  priceInput.min = priceMap[apartmentTypeSelect.value];
};

const onCheckInOutChange = (evt) => {
  checkinSelect.value = evt.target.value;
  checkoutSelect.value = evt.target.value;
};

roomNumberSelect.addEventListener(`change`, onCapacityChange);
capacitySelect.addEventListener(`change`, onCapacityChange);
apartmentTypeSelect.addEventListener(`change`, onPriceChange);
priceInput.addEventListener(`change`, onPriceChange);
checkinSelect.addEventListener(`change`, onCheckInOutChange);
checkoutSelect.addEventListener(`change`, onCheckInOutChange);

const disableForm = () => {
  adForm.classList.add(`ad-form--disabled`);
  window.util.fieldsOff(fieldsets);
  avatarPreview.src = avatarPreviewStartSrc;
  imagesPreview.style.backgroundImage = ``;
};

const activeForm = () => {
  adForm.classList.remove(`ad-form--disabled`);
  window.util.fieldsOn(fieldsets);
};

window.form = {
  disable: disableForm,
  active: activeForm,
  onPriceChange
};
