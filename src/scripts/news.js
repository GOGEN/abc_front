
(function () {
  'use strict';
  var gallery = $('#news_gallery');

  var slidesCount = $(window).width() > 480 ? 4 : 3;

  gallery.find('#news_gallery_view').slick({
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '#news_gallery_list',
  });

  gallery.find('#news_gallery_list').slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    infinite: true,
    asNavFor: '#news_gallery_view',
    focusOnSelect: true,
    variableWidth: true
  });
})();
