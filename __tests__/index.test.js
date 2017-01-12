'use strict';

// Load modules
const Generator = require(`../src/index`);

describe(`object-translate`, () => {

  describe(`Testing instantiation`, () => {
    it(`Should return a converter function`, () => {

      const converter = Generator({});
      expect(typeof converter).toBe(`function`);

    });
  });

  describe(`Basic usage`, () => {

    it(`Should generate an object from the description`, () => {

      const original = {
        a: {
          b: {
            c: `cvalue`
          }
        },
        d: {
          e: {
            f: `fvalue`
          }
        }
      };
      const expected = {
        c: `cvalue`,
        f: `fvalue`
      };

      const converter = Generator({c: `a.b.c`, f: `d.e.f`});
      const result = converter(original);
      expect(result).toEqual(expected);

    });
    it(`Should save the values to an array`, () => {

      const original = {
        a: {
          b: {
            c: `cvalue`
          }
        },
        d: {
          e: {
            f: `fvalue`
          }
        }
      };
      const expected = {
        c: [`cvalue`, `fvalue`]
      };

      //const converter = Generator( { 'a.b.c': 'c.0', 'd.e.f': 'c.1' });
      const converter = Generator({
        c: [`a.b.c`, `d.e.f`]
      });
      const result = converter(original);
      expect(result).toEqual(expected);

    });
    it(`Should pick the third value from an array`, () => {

      const original = {
        a: {
          b: {
            c: [`avalue`, `bvalue`, `cvalue`]
          }
        },
        d: {
          e: {
            f: `fvalue`
          }
        }
      };
      const expected = {
        c: [`cvalue`, `fvalue`]
      };

      const converter = Generator({
        c: [`a.b.c.2`, `d.e.f`]
      });
      const result = converter(original);
      expect(result).toEqual(expected);

    });
  });

  describe(`Advanced usage`, () => {

    it(`Should pick the first alternative that matches`, () => {

      const original = {
        user: {
          name: `Bill`,
          addr: {
            zip: 2020,
            cityName: `Madrid`
          }
        }
      };
      const expected = {
        name: `Bill`,
        postalCode: 2020
      };

      const mapping = {

        name: {
          path: `name`,
          alternatives: [`user.Name`, `user.name`]
        },
        postalCode: {
          path: `postalCode`,
          alternatives: [`user.address.zip`, `user.addr.zip`]
        }

      };

      const converter = Generator(mapping);
      const result = converter(original);
      expect(result).toEqual(expected);

    });
    it(`Using a function for processing the original value`, () => {

      const original = {
        a: {
          b: {
            c: `cvalue`
          }
        },
        d: {
          e: {
            f: `fvalue`
          }
        }
      };
      const expected = {
        more: {
          deep: {
            cvalue: `cvalue from function`,
            fvalue: `fvalue from function`
          }
        }
      };
      const processor = o => (`${o} from function`);
      const mapping = {
        more: {
          deep: {
            cvalue: {
              processor,
              path: `a.b.c`
            },
            fvalue: {
              processor,
              path: `d.e.f`
            }
          }
        }
      };

      const converter = Generator(mapping);
      const result = converter(original);
      expect(result).toEqual(expected);

    });
    it(`Using a function for concatenating two values`, () => {

      const original = {
        a: {
          b: {
            c: `cvalue`
          }
        },
        d: {
          e: {
            f: `fvalue`
          }
        }
      };
      const expected = {
        more: {
          deep: {
            cvalue: `cvalue + cvalue`,
            fvalue: `cvalue + fvalue`
          }
        }
      };
      const processor = (o, fullObject) => `${fullObject.a.b.c} + ${o}`;
      const mapping = {
        more: {
          deep: {
            cvalue: {
              processor,
              path: `a.b.c`
            },
            fvalue: {
              processor,
              path: `d.e.f`
            }
          }
        }
      };

      const converter = Generator(mapping);
      const result = converter(original);
      expect(result).toEqual(expected);

    });
    it(`Generator inception!`, () => {

      const original = {
        address: {
          city: {
            postalCode: 1234,
            name: `Madrid`
          }
        },
        family: {
          members: {
            sister: `Sandra`
          }
        }
      };
      const expected = {
        location: {
          cityName: `Madrid`
        },
        Sister: `Sandra`
      };

      const processor = (o, fullObject) => Generator({cityName: `city.name`})(o);

      const mapping = {
        location: {
          processor,
          path: `address`
        },
        Sister: `family.members.sister`
      };

      const converter = Generator(mapping);
      const result = converter(original);
      expect(result).toEqual(expected);

    });
  });
});
