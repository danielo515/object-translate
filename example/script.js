'use strict';

const ObjectTranslate = require(`../src`);

/** This describes the sape you want to get as result */
const mappings = {
  username: `response.data.user.name`,
  information: {
    surname: `response.data.user.surname`,
    zipCode: {alternatives: [`response.data.user.addr.zip`, `response.data.user.address.zip`]}
  }
};

const defaults = {response: {data: {user: {surname: `surname not set`}}}};

const converter = ObjectTranslate(mappings, defaults);

const fakeServerResponse = {
  response: {
    data: {
      statusCode: 200,
      headers: {
        "x-custom-header": {value: `Im useless information `}
      },
      user: {
        name: `Bob`,
        address: {
          zip: 29010
        }
      }
    },
    other: {
      comments: `This is just a bunch of extra data`
    }
  }
};


console.log(converter(fakeServerResponse));
