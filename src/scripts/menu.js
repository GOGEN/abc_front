(function () {
  'use strict';

  var slideout;
  var toggleButton = $('.navigation-checkbox-label');

  function initSlideout() {
    if (slideout) {
      toggleButton.off('click', slideout.toggle.bind(slideout));
      slideout.destroy();
    }

    if ($(window).width() > 980) {
      if (slideout) {
        $(slideout.panel).removeClass('slideout-panel');
        $(slideout.menu).removeClass('slideout-menu');
      }
      return;
    }

    slideout = new Slideout({
      panel: $('.slide-wrapper')[0],
      menu: $('#menu')[0],
      padding: $(window).width(),
      tolerance: 70,
      fx: 'linear',
      duration: 300
    });

    toggleButton.on('click', slideout.toggle.bind(slideout));

    slideout.on('beforeopen', function() {
      toggleButton.addClass('navigation-checkbox-label--open');
    });

    slideout.on('beforeclose', function() {
      toggleButton.removeClass('navigation-checkbox-label--open');
    });

  }

  initSlideout();

  var selectors = ['[id^="product_slick_slider_item"]', '#carousel', '#news_gallery_view', '#news_gallery_list'];

  selectors.forEach(function (selector) {
    $(selector).on('touchstart', function (event) {
      slideout.disableTouch();
    });
    $(selector).on('touchend', function (event) {
      slideout.enableTouch();
    });
  });


  $(window).resize(function () {
    initSlideout();
  });

})();

