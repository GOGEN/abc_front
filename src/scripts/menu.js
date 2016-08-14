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

  $('.navigation-checkbox-label').click(function () {
    slideout.toggle();
  });

})();

      