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

module.exports = {
  assertNumItems: assertNumItems,
  addItem: addItem,
  deleteItem: deleteItem
};
