'use strict';

(() => {
  /**
 * Выбирает случайное целое число от min до max включительно.
 * @param {number} min Минимальное число
 * @param {number} max Максимальное число
 * @return {number} Случайное целое число
 */
  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  /**
 * Выбирает рандомный элемент из массива
 * @param {Array} array случайный массив
 * @return {*} случайный элемент массива
 */
  const getRandomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  /**
 * Создает массив случайной длины
 * @param {array} array Случайный массив
 * @return {array} Массив случайной длины
 */
  const getRandomArraySize = (array) => {
    return array.slice(0, getRandomInteger(0, array.length));
  };

  const isEscEvent = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  const isEnterEvent = (evt, action) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      action();
    }
  };

  /**
 * Добавляет аттрибут disabled всем интерактивным элементам
 * @param {object} fields Объект с интерактивными элементами
 */
  const fieldsOff = (fields) => {
    fields.forEach((field) => {
      field.setAttribute(`disabled`, `true`);
    });
  };

  /**
 * Удаляет аттрибут disabled
 * @param {object} fields объект с интерактивными элементами
 */
  const fieldsOn = (fields) => {
    fields.forEach((field) => {
      field.removeAttribute(`disabled`);
    });
  };

  const removeItem = (item) => {
    if (item) {
      item.remove();
    }
  };

  window.util = {
    getRandomInteger,
    getRandomElement,
    getRandomArraySize,
    isEscEvent,
    isEnterEvent,
    fieldsOff,
    fieldsOn,
    removeItem
  };
})();
