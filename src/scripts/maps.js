


(function () {
  'use strict';

  YMaps.jQuery(function () {
    if ($('#geo_sale_map')[0] === undefined) {
      return;
    }

    var map = new YMaps.Map(YMaps.jQuery('#geo_sale_map')[0]);
    map.setCenter(new YMaps.GeoPoint(48.0497534, 56.62054997), 6);

    var zoom = new YMaps.Zoom();
    map.addControl(zoom);

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
