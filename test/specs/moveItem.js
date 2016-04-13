var utils = require('../utils.js');

describe('list', function () {

  beforeEach(function () {
    browser.url('http://localhost:5000');
    browser.waitForExist("[data-tag-test-id='last-add-item-button']");
    browser.moveToObject("[data-tag-test-id='last-add-item-button']");
    utils.addItem('Item 0');
    utils.addItem('Item 1');
    utils.addItem('Item 2');
    utils.assertText(0, 'Item 0');
    utils.assertText(1, 'Item 1');
    utils.assertText(2, 'Item 2');
  });

  afterEach(function() {
    utils.deleteItem();
    utils.deleteItem();
    utils.deleteItem();
  });

  it('move to bottom, refresh', function () {
    utils.moveItemToBottom(0);
    utils.assertText(0, 'Item 1');
    utils.assertText(1, 'Item 2');
    utils.assertText(2, 'Item 0');

    browser.refresh();
    utils.assertText(0, 'Item 1');
    utils.assertText(1, 'Item 2');
    utils.assertText(2, 'Item 0');
  });

  it('move to top, refresh', function () {
    utils.moveItemToTop(2);
    utils.assertText(0, 'Item 2');
    utils.assertText(1, 'Item 0');
    utils.assertText(2, 'Item 1');

    browser.refresh();
    utils.assertText(0, 'Item 2');
    utils.assertText(1, 'Item 0');
    utils.assertText(2, 'Item 1');
  });
});
