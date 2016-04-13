var utils = require('../utils.js');

describe('list', function () {

  it('add, refresh, delete, refresh', function () {
    browser.url('http://localhost:5000');
    browser.waitForExist("[data-tag-test-id='last-add-item-button']");
    browser.moveToObject("[data-tag-test-id='last-add-item-button']");
    var NUM_ITEMS = 10;
    for (var i = 0; i < NUM_ITEMS; i++) {
      utils.addItem('Item ' + i);
    }
    utils.assertNumItems(NUM_ITEMS);

    browser.refresh();
    utils.assertNumItems(NUM_ITEMS);

    for (var i = 0; i < NUM_ITEMS; i++) {
      utils.deleteItem();
    }
    utils.assertNumItems(0);

    browser.refresh();
    utils.assertNumItems(0);
  });
});
