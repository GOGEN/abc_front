
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

  if($(window).width() < 980) {
    return;
  }

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

  function initMap(coord, description) {
    map.removeAllOverlays();
    map.setCenter(new YMaps.GeoPoint(coord.lat, Number.parseFloat(coord.long) + 0.3), 8);

    var placemark = new YMaps.Placemark(new YMaps.GeoPoint(coord.lat, coord.long), {style: s});
    placemark.description = description;
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

          var coordElem = $(tabMenuItems[j]).find('input[type="hidden"][name="coords"]');
          if (coordElem[0] === undefined) {
            map.removeAllOverlays();
            return;
          }
          var coord = $(coordElem)[0].value.split(',');
          var descriptionElem = $(tabMenuItems[j]).find('input[type="hidden"][name="description"]');
          initMap({lat: coord[0], long: coord[1]}, descriptionElem[0] ? descriptionElem[0].value : '');
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

    var placemarkElems = $('div[id^="geo-sale_placemark"]');
    var coordsElems = placemarkElems.find('input[type="hidden"][name="coords"]').toArray();
    var descriptionsElems = placemarkElems.find('input[type="hidden"][name="description"]').toArray();
    var placemarksOptions = [];
    for(var i = 0; i < coordsElems.length; i++) {
      var coord = coordsElems[i].value.split(',');
      var description = descriptionsElems[i] ? descriptionsElems[i].value : '';
      placemarksOptions.push({coord: {lat: coord[0], long: coord[1]}, description: description});
    }

    var s = new YMaps.Style();
    s.iconStyle = new YMaps.IconStyle();
    s.iconStyle.href = 'images/icons/placeholder.svg';
    s.iconStyle.size = new YMaps.Point(25, 40);
    s.iconStyle.offset = new YMaps.Point(-12.5, -40);

    placemarksOptions.forEach(function (option) {
      var coord = option.coord;
      var placemark = new YMaps.Placemark(new YMaps.GeoPoint(coord.lat, coord.long), {style: s});
      placemark.description = option.description;
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

  var width = $(window).width();
  var slideout;
  var toggleButton = $('.navigation-checkbox-label');

  function initSlideout() {
    if (slideout) {
      toggleButton.off('click', slideout.toggle.bind(slideout));
      slideout.destroy();
    }

    if (width > 980) {
      if (slideout) {
        $(slideout.panel).removeClass('slideout-panel');
        $(slideout.menu).removeClass('slideout-menu');
      }
      return;
    }

    slideout = new Slideout({
      panel: $('.slide-wrapper')[0],
      menu: $('#menu')[0],
      padding: width + 15,
      tolerance: 70,
      fx: 'linear',
      duration: 300,
      touch: false
    });

    toggleButton.on('click', slideout.toggle.bind(slideout));

    slideout.on('beforeopen', function() {
      toggleButton.addClass('navigation-checkbox-label--open');
    });

    slideout.on('beforeclose', function() {
      toggleButton.removeClass('navigation-checkbox-label--open');
    });

  }

  initSlideout();

  $(window).resize(function () {
    if ($(window).width() === width) {
      return;
    }
    width = $(window).width();
    initSlideout();
  });

})();


/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=u.className,t=Modernizr._config.classPrefix||"";if(p&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),p?u.className.baseVal=n:u.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):p?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(p?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",p=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),p.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:p).appendChild(a),h.appendChild(p),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),p.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=u.style.overflow,u.style.overflow="hidden",u.appendChild(h)),l=t(p,e),h.fake?(h.parentNode.removeChild(h),u.style.overflow=c,u.offsetHeight):p.parentNode.removeChild(p),!!l}var f=[],c=[],d={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=n.documentElement,p="svg"===u.nodeName.toLowerCase(),h=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=h;var m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",h.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);


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


(function () {
  'use strict';

  var startWindowScroll = 0;

  if (!Modernizr.touchevents) {
    $('a[href^="#popup_call"]').magnificPopup({
      type:'inline',
      mainClass: 'popup-call-override',
      fixedContentPos: true
    });
  } else {
    $('a[href^="#popup_call"]').magnificPopup({
      type:'inline',
      mainClass: 'popup-call-override',
      fixedContentPos: false,
      callbacks: {
        beforeOpen: function () {
          startWindowScroll = $(window).scrollTop();
          $('html').addClass('mfp-helper');

        },
        close: function () {
          $('html').removeClass('mfp-helper');
          $(window).scrollTop(startWindowScroll);
        }
      }
    });
  }

  $('a[href^="#popup_photo"]').magnificPopup({
    type: 'inline',
    mainClass: 'popup-photo-override',
    fixedContentPos: true
  });

  $('a[href^="#popup_dealer"]').magnificPopup({
    type: 'inline',
    mainClass: 'popup-dealer-override',
    fixedContentPos: true
  });


})();


(function () {
  'use strict';

  var searchBox = $('#search_box');
  var input = searchBox.find('input[type="text"]');

  input.on('focus', function () {
    searchBox.addClass('topbar__search__form--open');
  });

  input.on('blur', function () {
    searchBox.removeClass('topbar__search__form--open');
  });

  searchBox.on('mousedown', function (event) {
    event.preventDefault();
  }).on('click', 'button[type="reset"]', function (event) {
    searchBox[0].reset();
    input.blur();
  }).on('click', 'button[type="submit"]', function (event) {
    searchBox[0].submit();
  }).on('click', 'input', function (event) {
    input.focus();
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 65 && input.val() === ''){
      input.blur();
    }
  });



})();


(function () {
  'use strict';
  $(document).ready(function () {
    var sliders = $('[id^="product_slick_slider_item"]');
    if ($(window).width() > 980) {
      sliders.toArray().forEach(function (slider){
        $(slider).find('#product_slick_slider_content').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: $(slider).find('#product_slick_slider_prev'),
          nextArrow: $(slider).find('#product_slick_slider_next'),
          variableWidth: true,
          centerMode: true
        });
      });
    } else {
      sliders.toArray().forEach(function (slider) {
        $(slider).find('#product_slick_slider_content').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          variableWidth: true
        });
      });
    }
  });

})();
