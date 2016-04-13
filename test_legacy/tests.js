QUnit.test( "hello test", function( assert ) {
  F('#text-input').text('Hello world!');
  F('#text-input').visible();
  assert.ok( 1 == "1", "Passed!" );
  // F('.sample').text('Hello World!', 'h1 should have text hello world');
});