'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var ListPage = require('../support/pages/ListPage');

  registerSuite(function() {

    var listPage;

    return {
      name: 'move items',
      setup: function() {
        listPage = new ListPage(this.remote);
      },
      beforeEach: function() {
        return listPage
          .addItems('Item 1', 'Item 2')
          .then(function(addedItems) {
            assert.isTrue(addedItems);
          });
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
    };
  });
});