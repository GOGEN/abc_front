
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

(function () {
  'use strict';
  
  numeral.language('ru', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    },
    abbreviations: {
        thousand: 'тыс.',
        million: 'млн.',
        billion: 'билл.',
        trillion: 'трилл.'
    },
    currency: {
        symbol: 'руб.'
    }
  });

  // switch between languages
  numeral.language('ru');

  function getCoast(elem) {
    return $('#' + elem.id.replace(/count/, 'price'))[0].value * elem.value;
  }

  function changeCallback () {
    var cost = $('#' + this.id.replace(/count/, 'price'))[0].value * this.value;
    $('#' + this.id.replace(/count/, 'cost')).text(numeral(cost).format('0,0.00 $'));

    var total = $('input[type="number"][id^="cart_item"]').toArray().reduce(
                  function (memo, elem) {return memo + getCoast(elem);}, 
                  0);
    $('#cart_total_cost').text(numeral(total).format('0,0.00 $'));
  }

  $('input[type="number"][id^="cart_item"]').bind('change paste keyup', changeCallback);
  $('input[type="number"][id^="cart_item"]').each(changeCallback);

})();

(function () {
  'use strict';
  var catalogFactoriesFilter = $('#catalog_factories');
  var catalogFactoriesFilterLabel = $('label[for="catalog_factories"]');
  var catalogCategoriesFilter = $('#catalog_categories');
  var catalogCategoriesFilterLabel = $('label[for="catalog_categories"]');

  catalogCategoriesFilterLabel.click(function () {
    if (catalogCategoriesFilter.prop('checked')) {
      setTimeout(catalogCategoriesFilter.prop.bind(catalogCategoriesFilter, 'checked', false));
    }
  });

  catalogFactoriesFilterLabel.click(function () {
    if (catalogFactoriesFilter.prop('checked')) {
      setTimeout(catalogFactoriesFilter.prop.bind(catalogFactoriesFilter, 'checked', false));
    }
  });

})();

(function () {
  'use strict';

  $('#catalog_fixed_sidebar').stick_in_parent({offset_top: 40});

})();

(function () {
  'use strict';

  var map = new YMaps.Map(YMaps.jQuery('#contacts_map')[0]);
  var s = new YMaps.Style();
  s.iconStyle = new YMaps.IconStyle();
  s.iconStyle.href = 'images/icons/placeholder-blue.svg';
  s.iconStyle.size = new YMaps.Point(25, 40);
  s.iconStyle.offset = new YMaps.Point(-12.5, -40);

  function initMap(coord) {
    map.removeAllOverlays();
    map.setCenter(new YMaps.GeoPoint(coord.lat, coord.long), 8);

    var placemark = new YMaps.Placemark(new YMaps.GeoPoint(coord.lat, coord.long), {style: s});
    map.addOverlay(placemark);
  }

  var tabMenuItems = $('#contact_tab_menu').children();
  var tabContentItems = $('#contact_tab_content').children();
  for(var i = 0; i < tabMenuItems.length; i++) {

    $(tabMenuItems[i]).click(function (event) {
      for(var j = 0; j < tabMenuItems.length; j++) {
        $(tabMenuItems[j]).removeClass('contacts__tabs__menu__item--active');
        $(tabContentItems[j]).removeClass('contacts__tabs__content--active');
        if (tabMenuItems[j] === event.target) {
          $(tabMenuItems[j]).addClass('contacts__tabs__menu__item--active');
          $(tabContentItems[j]).addClass('contacts__tabs__content--active');

          $('#contact_tab_active_item').remove('#contact_tab_active_item_value');
          $('#contact_tab_active_item').text($(tabMenuItems[j]).text());
          $('#contact_tab_active_arrow').removeClass('contacts__tabs__active__arrow--active');
          $('#contact_tab_menu').removeClass('contacts__tabs__menu--show');

          var coordElem = $(tabMenuItems[j]).find('input[type="hidden"]');
          if (coordElem[0] === undefined) {
            map.removeAllOverlays();
            return;
          }
          var coord = $(coordElem)[0].value.split(',');
          initMap({lat: coord[0], long: coord[1]});
        }
      }

    });
  }

  $('#contact_tab_active').click(function () {
    if ($('#contact_tab_active_arrow').hasClass('contacts__tabs__active__arrow--active')) {
      $('#contact_tab_active_arrow').removeClass('contacts__tabs__active__arrow--active');
      $('#contact_tab_menu').removeClass('contacts__tabs__menu--show');
      return;   
    }
    $('#contact_tab_active_arrow').addClass('contacts__tabs__active__arrow--active');
    $('#contact_tab_menu').addClass('contacts__tabs__menu--show');
  });


  $(tabMenuItems[2]).click();

})();

(function (){ 
  'use strict';

  $.validate({
    borderColorOnError: ''
  });

})();

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



(function () {
  'use strict';

  YMaps.jQuery(function () {
    if ($('#geo_sale_map')[0] === undefined) {
      return;
    }

    var map = new YMaps.Map(YMaps.jQuery('#geo_sale_map')[0]);
    map.setCenter(new YMaps.GeoPoint(48.0497534, 56.62054997), 6);
    var coords = [{lat: 40.90140850, long: 57.77302080},
                  {lat: 40.99669350, long: 57.00858312},
                  {lat: 47.90040800, long: 56.62925561},
                  {lat: 56.23002700, long: 58.02286834},
                  {lat: 51.52664782, long: 56.25932260},
                  {lat: 52.95487047, long: 55.98315837},
                  {lat: 54.00955797, long: 55.26518834},
                  {lat: 51.91116930, long: 56.95907120}];

    var s = new YMaps.Style();
    s.iconStyle = new YMaps.IconStyle();
    s.iconStyle.href = 'images/icons/placeholder.svg';
    s.iconStyle.size = new YMaps.Point(25, 40);
    s.iconStyle.offset = new YMaps.Point(-12.5, -40);

    coords.forEach(function (coord) {
      var placemark = new YMaps.Placemark(new YMaps.GeoPoint(coord.lat, coord.long), {style: s});
      map.addOverlay(placemark);
    });

  });

})();

(function () {
  'use strict';

  $('#form_field_phone').mask('+7 (999) 999-9999');

})();

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