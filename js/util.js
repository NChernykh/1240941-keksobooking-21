'use strict';

(() => {
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

  const isMouseEvent = (evt, action) => {
    if (evt.button === 0) {
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
    isEscEvent,
    isEnterEvent,
    isMouseEvent,
    fieldsOff,
    fieldsOn,
    removeItem
  };
})();
