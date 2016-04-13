var utils = require('../utils.js');

describe('list', function () {

  beforeEach(function () {
    browser.url('http://localhost:5000');
    browser.waitForExist("[data-tag-test-id='last-add-item-button']");
    browser.moveToObject("[data-tag-test-id='last-add-item-button']");
    utils.addItem('Original item');
  });

  afterEach(function() {
    utils.deleteItem();
  });

  it('edit, refresh', function () {
    // edit item
    // assert item text
    browser.refresh();
    // assert item text
  });
});
