
(function () {
  'use strict';
  var sliders = $('#good_page_sliders_list').children();
  for(var i = 0; i < sliders.length; i++) {
    var slider = $(sliders[i]);
    slider.find('#product_slick_slider_content').slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: slider.find('#product_slick_slider_prev'),
      nextArrow: slider.find('#product_slick_slider_next')      
    });
  }
})();