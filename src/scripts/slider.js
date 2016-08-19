
(function () {
  'use strict';

  var sliders = $('[id^="product_slick_slider_item"]');
  if ($(window).width() > 980) {
    sliders.find('#product_slick_slider_content').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      prevArrow: sliders.find('#product_slick_slider_prev'),
      nextArrow: sliders.find('#product_slick_slider_next'),
      variableWidth: true,
      centerMode: true
    });
  } else {
    sliders.find('#product_slick_slider_content').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      arrows: false,
      variableWidth: true
    });
  }

})();
