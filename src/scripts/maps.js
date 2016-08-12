


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