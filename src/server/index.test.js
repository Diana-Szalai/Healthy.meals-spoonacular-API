
var request = require('supertest');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('./index');
  });
  afterEach(function () {
    server.close();
  });
  it(' 200 on /test ', function testSlash(done) {
  request(server)
    .get('/test')
    .expect(200, done);
  });
  it('404 ongo trip', function testPath(done) {
    request(server)
      .get('/goo/trip')
      .expect(404, done);
  });
});