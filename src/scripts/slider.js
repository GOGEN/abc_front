
(function () {
  'use strict';
  setTimeout(function () {
    var sliders = $('[id^="product_slick_slider_item"]');
    if ($(window).width() > 980) {
      sliders.toArray().forEach(function (slider){
        setTimeout(function () {
          $(slider).find('#product_slick_slider_content').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: $(slider).find('#product_slick_slider_prev'),
            nextArrow: $(slider).find('#product_slick_slider_next'),
            variableWidth: true,
            centerMode: true
          });
        }, 5000);
      });
    } else {
      sliders.toArray().forEach(function (slider) {
        setTimeout(function () {
          $(slider).find('#product_slick_slider_content').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            variableWidth: true
          });
        }, 5000)
      });
    }
  }, 5000);
})();
