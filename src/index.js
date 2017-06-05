'use strict';
const Op = require(`object-path`);
const Traverse = require(`traverse`);

module.exports = (mapDefinition, defaults) => {

  defaults = defaults || {};

  return originalObj => Traverse(mapDefinition).map(
  /*eslint-disable prefer-arrow-callback */
  function (item) {

    let getMethod = `get`;
    let path = item;
    let process = x => x;

    if (!this.isLeaf) {
      const isObject = Object.prototype.toString.apply(item) === `[object Object]`;
      const hasAlternatives = isObject && Array.isArray(item.alternatives);
      const hasProcessor = isObject && typeof item.processor === `function`;
      // not leaf, not alternatives, no processor, this means a regular object so skip
      // it
      if (!hasAlternatives && !hasProcessor) {
        return;
      }
      if (hasAlternatives) {
        path = item.alternatives;
        getMethod = `coalesce`;
      }
      if (hasProcessor) {
        if (!hasAlternatives && !item.path) {
          console.warn(`You have provided a processor func. without path or alternatives. Null will be returned`);
          return null;
        }
        path = hasAlternatives
          ? path
          : item.path;
        process = item.processor;
      }
    }

    let originalValue = Op[ getMethod ](originalObj, path);
    // try to use a default value  ONLY if the original value is undefined. Values like false, 0, '', null, will pass as they are
    originalValue = originalValue === undefined ? Op[ getMethod ](defaults, path) : originalValue;

    const newValue = process(originalValue, originalObj);

    this.update(newValue, true);
  });

};
