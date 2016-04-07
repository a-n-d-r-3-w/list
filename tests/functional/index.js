'use strict';
define(function(require) {
  var registerSuite = require('intern!object');
  var assert = require('intern/chai!assert');

  registerSuite({
    name: 'index',
    'greeting form': function() {
      return this.remote
        .get(require.toUrl('http://localhost:5000/index.html'))
        .setFindTimeout(5000)
        .findByClassName('add-item-button')
        .moveMouseTo()
        .click()
        .end()
        .sleep(1000)
        .getActiveElement()
        .type('asdflkj ;lksjadf;lkasj df;lkasj f;lkadsj ')
        .sleep(1000)
        .pressKeys('\uE007')
        .end()
        .sleep(1000)
        .then(function() {
          assert.strictEqual(1, 1);
        });
    }
  });
});