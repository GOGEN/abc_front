
(function () {
  'use strict';
  var sliders = $('#good_page_sliders_list').children();
  for(var i = 0; i < sliders.length; i++) {
    var slider = $(sliders[i]);
    if ($(window).width() > 980) {
      slider.find('#product_slick_slider_content').slick({
        infinite: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: slider.find('#product_slick_slider_prev'),
        nextArrow: slider.find('#product_slick_slider_next')      
      });
    } else {
      slider.find('#product_slick_slider_content').slick({
        infinite: true,
        slidesToShow: Math.floor($(window).width()/250),
        slidesToScroll: 1,
        centerMode: true,
        arrows: false
      });
    }
  }
})();