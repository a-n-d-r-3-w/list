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

function assertText (index, expectedText) {
  var selector = "[data-tag-test-id='item-label-" + index + "']"
  var actualText = browser.getText(selector);
  assert.equal(actualText, expectedText)
}

function editItem (index, newText) {
  var containerSelector = "[data-tag-test-id='item-container-" + index + "']";
  browser.moveToObject(containerSelector);
  var container = browser.element(containerSelector);
  var editItemButton = container.element('.edit-item-button');
  editItemButton.click();
  var editor = browser.elementActive();
  editor.waitForVisible();
  editor.setValue(newText + '\uE007');
}

function clickMoveItem(index) {
  var containerSelector = "[data-tag-test-id='item-container-" + index + "']";
  browser.moveToObject(containerSelector);
  var container = browser.element(containerSelector);
  var moveItemButton = container.element( "[data-tag-test-id='move-item-button-" + index + "']");
  moveItemButton.click();
}

function moveItemToBottom (index) {
  clickMoveItem(index);
  var target = browser.element("[data-tag-test-id='last-move-target']");
  target.click();
}

function moveItemToTop (index) {
  clickMoveItem(index);
  var target = browser.element("[data-tag-test-id='move-target-0']");
  target.click();
}

module.exports = {
  assertNumItems: assertNumItems,
  addItem: addItem,
  deleteItem: deleteItem,
  assertText: assertText,
  editItem: editItem,
  moveItemToBottom: moveItemToBottom,
  moveItemToTop: moveItemToTop
};
