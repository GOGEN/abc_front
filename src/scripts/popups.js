
(function () {
  'use strict';

  var startWindowScroll = 0;

  if (!Modernizr.touchevents) {
    $('a[href^="#popup_call"]').magnificPopup({
      type:'inline',
      mainClass: 'popup-call-override',
      fixedContentPos: true
    });
  } else {
    $('a[href^="#popup_call"]').magnificPopup({
      type:'inline',
      mainClass: 'popup-call-override',
      fixedContentPos: false,
      callbacks: {
        beforeOpen: function () {
          startWindowScroll = $(window).scrollTop();
          $('html').addClass('mfp-helper');

        },
        close: function () {
          $('html').removeClass('mfp-helper');
          $(window).scrollTop(startWindowScroll);
        }
      }
    });
  }

  $('a[href^="#popup_photo"]').magnificPopup({
    type: 'inline',
    mainClass: 'popup-photo-override',
    fixedContentPos: true
  });

  $('a[href^="#popup_dealer"]').magnificPopup({
    type: 'inline',
    mainClass: 'popup-photo-override',
    fixedContentPos: true
  });


})();
