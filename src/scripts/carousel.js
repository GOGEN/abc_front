
(function () {
  'use strict';
  var slider = $('#carousel');
  slider.find('#carousel_list').slick({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: slider.find('#carousel_left'),
    nextArrow: slider.find('#carousel_right')      
  });
})();