'use strict';

(() => {
  const MainPin = {
    DIAGONAL: 65,
    SPINE: 22
  };

  const map = document.querySelector(`.map`);
  const mapPinMain = map.querySelector(`.map__pin--main`);
  const addressInput = document.querySelector(`#address`);

  const mapLimits = {
    top: 130 - mapPinMain.offsetHeight - MainPin.SPINE,
    right: map.offsetWidth - (mapPinMain.offsetWidth / 2),
    left: -(mapPinMain.offsetWidth / 2),
    bottom: 630 - mapPinMain.offsetHeight - MainPin.SPINE
  };

  const getCoords = () => {
    const x = Math.round(mapPinMain.offsetLeft + MainPin.DIAGONAL / 2);
    const y = Math.round(mapPinMain.offsetTop + MainPin.DIAGONAL / 2);
    const spine = Math.round(y + MainPin.DIAGONAL / 2 + MainPin.SPINE);
    addressInput.value = map.classList.contains(`map--faded`) ? `${x}, ${y}` : `${x}, ${spine}`;
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkLocation = (coords) => {
      if (coords.x >= mapLimits.right) {
        coords.x = mapLimits.right;
      }
      if (coords.x <= mapLimits.left) {
        coords.x = mapLimits.left;
      }
      if (coords.y >= mapLimits.bottom) {
        coords.y = mapLimits.bottom;
      }
      if (coords.y <= mapLimits.top) {
        coords.y = mapLimits.top;
      }
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newLocation = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      checkLocation(newLocation);

      mapPinMain.style.top = `${newLocation.y}px`;
      mapPinMain.style.left = `${newLocation.x}px`;

      getCoords();
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      getCoords();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.mainPin = {
    getCoords
  };
})();
