
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
    map.setCenter(new YMaps.GeoPoint(coord.lat, Number.parseFloat(coord.long) + 0.3), 8);

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