'use strict';
const small = require(`../../fixtures/small`);
const OT = require(`../../../src`);

const map = {
  a: `a.b.c.a`,
  b: `a.b.c.b`
};

const triggerDefaults = Object.assign({}, map, {x: `a.b.c.x`});

const defaults = {
  a: {
    b: {
      c: {
        x: `X not defined`
      }
    }
  }
};

const basic = OT(map);
const withDefaults = OT(triggerDefaults, defaults);

module.exports = (suite, benchmark) => {

  suite(`4 nest levels`, () => {

    benchmark(`Basic converter`, () => basic(small));
    benchmark(`Using defaults`, () => withDefaults(small));

  });
};

