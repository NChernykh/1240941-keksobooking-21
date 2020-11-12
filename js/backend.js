'use strict';

const TIMEOUT = 10000;
const StatusCodes = {
  OK: 200,
  NOT_FOUND: 404
};
/**
 * Загружает и отправляет данные с сервера
 * @param {string} method тип запроса, который отправлям на сервер
 * @param {string} url адрес, куда отправляется запрос
 * @param {object} data данные формы
 * @param {function} onSuccess cb, который запускается в случае успешного запроса
 * @param {function} onError cb, который запускается в случае ошибки
 */
const sendRequest = (method, url, data, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case StatusCodes.OK:
        onSuccess(xhr.response);
        break;
      case StatusCodes.NOT_FOUND:
        error = `ошибка ${xhr.status} ${xhr.statusText} данные не найдены`;
        break;
      default:
        error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT;
  xhr.open(method, url);
  xhr.send(data);
};

window.backend = {
  sendRequest
};
