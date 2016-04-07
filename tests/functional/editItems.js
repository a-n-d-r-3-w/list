'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'edit items',
    'edit items': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByClassName('add-item-button')
        .moveMouseTo().click().end()

      .getActiveElement()
        .type('Item 1').pressKeys('\uE007').end()

      .findAllByClassName('item-container')
        .then(function(elements) {
          assert.strictEqual(elements.length, 1);
        })
        .end()

      .findByClassName('item-label')
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end()

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('edit-item-button')
        .click().end()

      .getActiveElement()
        .pressKeys('\uE003\uE003\uE003\uE003\uE003\uE003')
        .type('Item 2').pressKeys('\uE007').end()

      .findByClassName('item-label')
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end()

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