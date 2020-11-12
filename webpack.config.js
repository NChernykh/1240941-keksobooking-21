const path = require('path');
module.exports = {
  entry: [
    './js/util.js',
    './js/debounce.js',
    './js/backend.js',
    './js/form.js',
    './js/card.js',
    './js/pins.js',
    './js/mainPin.js',
    './js/filters.js',
    './js/popup.js',
    './js/map.js',
    './js/main.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
