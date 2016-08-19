(function () {
  'use strict';

  if ($(window).width() > 980) {
    return;
  }
  var slideout = new Slideout({
        'panel': $('.slide-wrapper')[0],
        'menu': $('#menu')[0],
        'padding': 980,
        'tolerance': 70
      });

  var toggleButton = $('.navigation-checkbox-label');

  toggleButton.click(function () {
    slideout.toggle();
  });

  slideout.on('open', function() {
    toggleButton.addClass('navigation-checkbox-label--open');
  });

  slideout.on('close', function() {
    toggleButton.removeClass('navigation-checkbox-label--open');
  });

  var selectors = ['[id^="product_slick_slider_item"]', '#carousel', '#news_gallery_view', '#news_gallery_list'];

  selectors.forEach(function (selector) {
    $(selector).on('touchstart', function (event) {
      slideout.disableTouch();
    });

    $(selector).on('touchend', function (event) {
      slideout.enableTouch();
    });
  });

})();

