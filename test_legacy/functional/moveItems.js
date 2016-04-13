'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');
  var ListPage = require('../support/pages/ListPage');

  function addItem(text) {
    return function() {
      return this.parent
      .findByCssSelector("[data-tag-test-id='last-add-item-button']")
        .moveMouseTo().click().end()

      .getActiveElement()
        .type(text).pressKeys('\uE007').end();
    }
  }

  registerSuite(function() {

    var listPage;

    return {
      name: 'move items',
      setup: function() {
        listPage = new ListPage(this.remote);
      },

      beforeEach: function() {
        return this.remote
        .setFindTimeout(1000)
        .get(require.toUrl('http://localhost:5000/index.html'))
        .then(addItem('Item 1'))
        .then(addItem('Item 2'))
        .then(addItem('Item 3'))
        .sleep(1000);
      },

      afterEach: function() {
        // return listPage.deleteItem();
        listPage.deleteItem();
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
      //
      // 'Move to top': function() {
      //   return this.remote
      //     .get(require.toUrl('http://localhost:5000/index.html'))

      //   .findByCssSelector("[data-tag-test-id='item-container-1']")
      //     .moveMouseTo()
      //     .findByCssSelector("[data-tag-test-id='move-item-button-1']")
      //     .click().end().end()

      //   .findByCssSelector("[data-tag-test-id='move-target-0']")
      //     .click()
      //     .end()

      //   .findByCssSelector("[data-tag-test-id='item-label-0']")
      //     .getVisibleText()
      //     .then(function(text) {
      //       assert.strictEqual(text, 'Item 2');
      //     }).end().end()

      //   .findByCssSelector("[data-tag-test-id='item-label-1']")
      //     .getVisibleText()
      //     .then(function(text) {
      //       assert.strictEqual(text, 'Item 1');
      //     }).end().end()

      //   .refresh()

      //   .findByCssSelector("[data-tag-test-id='item-label-0']")
      //     .getVisibleText()
      //     .then(function(text) {
      //       assert.strictEqual(text, 'Item 2');
      //     }).end().end()

      //   .findByCssSelector("[data-tag-test-id='item-label-1']")
      //     .getVisibleText()
      //     .then(function(text) {
      //       assert.strictEqual(text, 'Item 1');
      //     }).end().end();
      // }
    };
  });
});
