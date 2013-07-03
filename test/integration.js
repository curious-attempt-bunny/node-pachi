var fuego = require('..');
var test = require('tape');

test('responds to version', function(t) {
  var gtp = fuego();
  gtp.send('version', function(error, response) {
    gtp.exit();
    t.notOk(error);
    t.ok(response);
    t.equal(response.split(' ')[0], "10.99");
    t.end();
  });
});

test('lists commands', function(t) {
  var gtp = fuego();
  gtp.send('list_commands', function(error, response) {
    gtp.exit();
    t.notOk(error);
    t.ok(response);
    t.notEqual(response.indexOf("kgs-time_settings"), -1);
    t.notEqual(response.indexOf("echo"), -1);
    t.end();
  });
});
