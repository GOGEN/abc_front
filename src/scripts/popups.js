
(function () {
  'use strict';

  $("a[href^=\\#dealers_popup]").on("click", function(e) {
    e.preventDefault();
    history.pushState({}, "", this.href);
    $(e.delegateTarget.hash).fadeIn("fast");

    $(e.delegateTarget.hash).find("a[id^=\\#dealers_hide_popup]").on("click", function(e2) {
      e2.preventDefault();
      history.pushState({}, "", this.href);
      $(e.delegateTarget.hash).fadeOut("fast");
    });
  });


  var startWindowScroll = 0;

  if (!Modernizr.touchevents) {
    $('a[href^=\\#popup_call]').magnificPopup({
      type:'inline',
      mainClass: 'popup-call-override',
      fixedContentPos: true
    });
  } else {
    $('a[href^=\\#popup_call]').magnificPopup({
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

  $('a[href^=\\#popup_photo').magnificPopup({
    type: 'inline',
    mainClass: 'popup-photo-override',
    fixedContentPos: true
  })

})();
