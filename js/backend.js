'use strict';
(() => {
  const TIMEOUT = 10000;
  const StatusCodes = {
    OK: 200,
    NOT_FOUND: 404
  };
  /**
   * Загружает и отправляет данные с сервера
   * @param {*} method POST/GET
   * @param {*} URL адрес
   * @param {*} data данные формы
   * @param {*} onSuccess успешный запрос
   * @param {*} onError ошибка
   */
  const sendRequest = (method, URL, data, onSuccess, onError) => {
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
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, URL);
    xhr.send(data);
  };

  window.backend = {
    sendRequest
  };
})();
