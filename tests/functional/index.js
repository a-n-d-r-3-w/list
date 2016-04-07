'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'index',
    'add items': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))
        .setFindTimeout(500)

      .findByClassName('add-item-button')
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 1').pressKeys('\uE007').end()

      .findByCssSelector("[data-tag-test-id='add-item-button-0']")
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 2').pressKeys('\uE007').end()

      .findByCssSelector("[data-tag-test-id='add-item-button-1']")
        .moveMouseTo().click().end()
        .getActiveElement()
        .type('Item 3').pressKeys('\uE007').end()

      .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 3);
        })
        .end()

      .refresh()

      .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 3);
        })
        .end()

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('delete-item-button')
        .click().end().end()

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('delete-item-button')
        .click().end().end()

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('delete-item-button')
        .click().end().end()

      .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 0);
        })
        .end()

      .refresh()

      .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 0);
        })
        .end();
    }
  });
});