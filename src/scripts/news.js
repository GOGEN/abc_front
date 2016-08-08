
(function () {
  'use strict';
  var gallery = $('#news_gallery');

  gallery.find('#news_gallery_view').slick({
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '#news_gallery_list',
  });

  gallery.find('#news_gallery_list').slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    asNavFor: '#news_gallery_view',
    focusOnSelect: true
  });
})();