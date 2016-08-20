
(function () {
  'use strict';

  var searchBox = $('#search_box');
  var input = searchBox.find('input[type="text"]');

  input.on('focus', function () {
    searchBox.addClass('topbar__search__form--open');
  });

  input.on('blur', function () {
    searchBox.removeClass('topbar__search__form--open');
  });

  searchBox.on('mousedown', function (event) {
    event.preventDefault();
  }).on('click', 'button[type="reset"]', function (event) {
    searchBox[0].reset();
  }).on('click', 'button[type="submit"]', function (event) {
    searchBox[0].submit();
  }).on('click', 'input', function (event) {
    input.focus();
  });


})();