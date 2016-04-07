'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'move items',
    setup: function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByCssSelector("[data-tag-test-id='last-add-item-button']")
        .moveMouseTo().click().end()

      .getActiveElement()
        .type('Item 1').pressKeys('\uE007').end()

      .findByCssSelector("[data-tag-test-id='last-add-item-button']")
        .moveMouseTo().click().end()

      .getActiveElement()
        .type('Item 2').pressKeys('\uE007').end()

      .findByCssSelector("[data-tag-test-id='item-label-0']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end().end()

      .findByCssSelector("[data-tag-test-id='item-label-1']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end();
    },

    teardown: function() {

    },

    'Test 1': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))

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
        .end();
    }
  });
});