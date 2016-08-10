
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


  $('a[href^=\\#popup_call]').magnificPopup({
    type:'inline',
    mainClass: 'popup-call-override'
  });

  $('a[href^=\\#popup_photo').magnificPopup({
    type: 'inline',
    mainClass: 'popup-photo-override'
  })

})();