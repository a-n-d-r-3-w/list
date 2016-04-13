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

    addItem: function(text) {
      return function() {
          this.remote
          .setFindTimeout(1000)
          .get(require.toUrl('http://localhost:5000/index.html'))

        .findByCssSelector("[data-tag-test-id='last-add-item-button']")
          .moveMouseTo().click().end()

        .getActiveElement()
          .type(text).pressKeys('\uE007').end();
      }
    },

    deleteItem: function() {
      return this.remote
        .setFindTimeout(100)
        .get(require.toUrl('http://localhost:5000/index.html'))

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
