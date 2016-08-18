
(function () {
  'use strict';
  var sliders = $('#good_page_sliders_list').children();
  for(var i = 0; i < sliders.length; i++) {
    var slider = $(sliders[i]);
    if ($(window).width() > 980) {
      slider.find('#product_slick_slider_content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: slider.find('#product_slick_slider_prev'),
        nextArrow: slider.find('#product_slick_slider_next'),
        variableWidth: true,
        centerMode: true
      });
    } else {
      slider.find('#product_slick_slider_content').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        arrows: false,
        mobileFirst: true,
        variableWidth: true
      });
    }
  }
})();