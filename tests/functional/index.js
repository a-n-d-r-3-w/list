'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'index',
    'add items': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))
        .setFindTimeout(5000)

      .findByClassName('add-item-button')
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 1').pressKeys('\uE007').end()

      .findByClassName('add-item-button')
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 2').pressKeys('\uE007').end()

      .findByClassName('add-item-button')
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 3').pressKeys('\uE007').end()

      .sleep(1000)
        .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 3);
        });
    }
  });
});