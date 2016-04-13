var assert = require('assert');

function assertNumItems (expected) {
  var items = browser.elements('.item-container');
  assert.equal(items.value.length, expected);
}

function addItem (text) {
  var addItemButton = browser.element("[data-tag-test-id='last-add-item-button']");
  addItemButton.waitForVisible();
  addItemButton.click();
  var editor = browser.elementActive();
  editor.waitForVisible();
  editor.setValue(text + '\uE007');
}

function deleteItem () {
  browser.moveToObject("[data-tag-test-id='item-container-0']");
  var deleteButton = browser.element("[data-tag-test-id='item-container-0'] .delete-item-button");
  deleteButton.waitForVisible();
  deleteButton.click();
}

describe('webdriver.io page', function () {

  beforeEach(function () {
    browser.url('http://localhost:5000');
    browser.waitForExist("[data-tag-test-id='last-add-item-button']");
    browser.moveToObject("[data-tag-test-id='last-add-item-button']");



    addItem('Item 1');
    addItem('Item 2');
    addItem('Item 3');
    assertNumItems(3);
  });

  afterEach(function () {
    deleteItem();
    deleteItem();
    deleteItem();
    assertNumItems(0);
  });

  it('test page', function () {


  });
});
