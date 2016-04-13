var assert = require('assert');

describe('webdriver.io page', function () {
  it('test page', function () {
    browser.url('http://localhost:5000');
    browser.waitForExist("[data-tag-test-id='last-add-item-button']");
    browser.moveToObject("[data-tag-test-id='last-add-item-button']");

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

    addItem('Item 1');
    addItem('Item 2');
    addItem('Item 3');
    assertNumItems(3);
    deleteItem();
    deleteItem();
    deleteItem();
    assertNumItems(0);
  });
});
