(function () {
  'use strict';

  var width = $(window).width();
  var slideout;
  var toggleButton = $('.navigation-checkbox-label');

  function initSlideout() {
    if (slideout) {
      toggleButton.off('click', slideout.toggle.bind(slideout));
      slideout.destroy();
    }

    if (width > 980) {
      if (slideout) {
        $(slideout.panel).removeClass('slideout-panel');
        $(slideout.menu).removeClass('slideout-menu');
      }
      return;
    }

    slideout = new Slideout({
      panel: $('.slide-wrapper')[0],
      menu: $('#menu')[0],
      padding: width,
      tolerance: 70,
      fx: 'linear',
      duration: 300,
      touch: false
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

  $(window).resize(function () {
    if ($(window).width() === width) {
      return;
    }
    width = $(window).width();
    initSlideout();
  });

})();

