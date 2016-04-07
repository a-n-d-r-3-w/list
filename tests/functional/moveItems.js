'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'move items',
    beforeEach: function() {
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

    afterEach: function() {
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
        }).end();
    },

    'Move to bottom': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByCssSelector("[data-tag-test-id='item-container-0']")
        .moveMouseTo()
        .findByCssSelector("[data-tag-test-id='move-item-button-0']")
        .click().end().end()

      .findByCssSelector("[data-tag-test-id='last-move-target']")
        .click()
        .end()

      .findByCssSelector("[data-tag-test-id='item-label-0']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end()

      .findByCssSelector("[data-tag-test-id='item-label-1']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end().end()

      .refresh()

      .findByCssSelector("[data-tag-test-id='item-label-0']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end()

      .findByCssSelector("[data-tag-test-id='item-label-1']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end().end();
    },

    'Move to top': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByCssSelector("[data-tag-test-id='item-container-1']")
        .moveMouseTo()
        .findByCssSelector("[data-tag-test-id='move-item-button-1']")
        .click().end().end()

      .findByCssSelector("[data-tag-test-id='move-target-0']")
        .click()
        .end()

      .findByCssSelector("[data-tag-test-id='item-label-0']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end()

      .findByCssSelector("[data-tag-test-id='item-label-1']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end().end()

      .refresh()

      .findByCssSelector("[data-tag-test-id='item-label-0']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 2');
        }).end().end()

      .findByCssSelector("[data-tag-test-id='item-label-1']")
        .getVisibleText()
        .then(function(text) {
          assert.strictEqual(text, 'Item 1');
        }).end().end();
    }
  });
});