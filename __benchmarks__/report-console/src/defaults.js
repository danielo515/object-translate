'use strict';

const OT = require(`../../../src`);

const map = {
  a: `a.b.c.a`,
  b: `a.b.c.b`,
  x: `a.b.c.x`
};

const defaults = {
  a: {
    b: {
      c: {
        x: `X not defined`
      }
    }
  }
};


module.exports = OT(map, defaults);
