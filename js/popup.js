'use strict';

const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const successElement = successTemplate.cloneNode(true);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const errorElement = errorTemplate.cloneNode(true);
const errorCloseButton = errorElement.querySelector(`.error__button`);

/**
 * Добавляет в DOM сообщение оБ успешной отправке объявления
 */
const getSuccess = () => {
  document.body.appendChild(successElement);

  /**
 * Удаляет сообщение и его обработчики из DOM
 */
  const closeSuccess = () => {
    successElement.remove();
    document.removeEventListener(`click`, onSuccessClick);
    document.removeEventListener(`keydown`, onSuccessEscPress);
  };

  const onSuccessClick = () => {
    closeSuccess();
  };

  const onSuccessEscPress = (evt) => {
    window.util.isEscEvent(evt, closeSuccess);
  };

  document.addEventListener(`click`, onSuccessClick);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

/**
 * Добавляет в DOM сообщение об ошибке
 * @param {String} errorMessage текст ошибки
 */
const getError = (errorMessage) => {
  errorElement.querySelector(`.error__message`).textContent = errorMessage;
  document.body.appendChild(errorElement);

  const onErrorButtonClick = () => {
    closeError();
  };

  const onErrorEscPress = (evt) => {
    window.util.isEscEvent(evt, closeError);
  };

  errorCloseButton.addEventListener(`click`, onErrorButtonClick);
  document.addEventListener(`keydown`, onErrorEscPress);

  /**
  * Удаляет сообщение и его обработчики из DOM
  */
  const closeError = () => {
    errorElement.remove();
    document.removeEventListener(`keydown`, onErrorEscPress);
  };
};

window.popup = {
  getSuccess,
  getError
};
