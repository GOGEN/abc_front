
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