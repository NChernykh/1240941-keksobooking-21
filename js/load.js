'use strict';
(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const TIMEOUT = 10000;
  window.load = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      let error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 404:
          error = `Ничего не найдено`;
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
      onError(`Запрос не успел выполниться за  ${xhr.timeout} мс`);
    });

    xhr.timeout = TIMEOUT;
    xhr.open(`POST`, URL);
    xhr.send(data);
  };
})();
