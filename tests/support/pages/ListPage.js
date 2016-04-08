'use strict';

define(function(require) {
  // the page object is created as a constructor
  // so we can provide the remote Command object
  // at runtime
  function ListPage(remote) {
    this.remote = remote;
  }

  ListPage.prototype = {
    constructor: ListPage,

    addItems: function(text1, text2) {
      return this.remote
        .setFindTimeout(1000)
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByCssSelector("[data-tag-test-id='last-add-item-button']")
        .moveMouseTo().click().end()

      .getActiveElement()
        .type(text1).pressKeys('\uE007').end()

      .findByCssSelector("[data-tag-test-id='last-add-item-button']")
        .moveMouseTo().click().end()

      .getActiveElement()
        .type(text2).pressKeys('\uE007').end()

      .then(function() {
        return true;
      });
    },

    deleteItems: function() {
      return this.remote
        .setFindTimeout(100)
        .get(require.toUrl('http://localhost:5000/index.html'))

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('delete-item-button')
        .click().end().end()

      .findByClassName('item-container').moveMouseTo()
        .findByClassName('delete-item-button')
        .click().end().end()

      .then(function() {
        return true;
      });
    }
  };

  return ListPage;
});