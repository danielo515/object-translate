'use strict';

const OT = require(`../../../src`);

const map = {
  a: `a.b.c.a`,
  b: `a.b.c.b`
};

module.exports = OT(map);
