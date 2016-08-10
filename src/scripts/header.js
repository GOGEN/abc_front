
(function () {
  'use strict';
  
  $(window).scroll(function () {
    if ($(this).scrollTop() > 65){  
      $('#header').addClass("header--sticky");
    }
    else{
      $('#header').removeClass("header--sticky");
    }
  });
})();