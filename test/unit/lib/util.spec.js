var util = v.lib('util');

describe('util', function () {
  describe('capitalize', function () {
    var a, b, c, d;

    before(function () {
      a = util.capitalize('ABcD');
      b = util.capitalize('aBCD');
      c = util.capitalize('abcd');
      d = util.capitalize();
    });

    it('should capitalize mixed case 1', function () {
      v.assert.equal(a, 'Abcd');
    });

    it('should capitalize mixed case 2', function () {
      v.assert.equal(b, 'Abcd');
    });

    it('should capitalize all lowercase', function () {
      v.assert.equal(c, 'Abcd');
    });

    it('should return undefined', function () {
      v.assert.equal(d, undefined);
    });
  });
});
