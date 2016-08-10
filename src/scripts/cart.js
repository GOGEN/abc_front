
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