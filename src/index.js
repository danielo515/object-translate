'use strict';
const Op = require(`object-path`);
const Traverse = require(`traverse`);
const tryDefault = (method, src, path, altPath) => {
  const def = Op[method](src, path);
  return def === undefined ? Op[method](src, altPath) : def;
};

/**
 * @function {function name}
 * @param  {Object} mapDefinition Mapping description describing the final shape you want and paths to where those values are
 * @param  {Object} defaults      An object with default values on the same paths as the expected object
 * @param  {Object} options       An object containing additional options
 * @param  {String = $default} Options.defaultPath  Name of the default path when something does not exist on the defaults object
 * @return {Function} A converter function with the provided configuration
 */
module.exports = (mapDefinition, defaults, {defaultPath = `$default`} = {}) => {

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
        // it to traverse it later
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

      let originalValue = Op[getMethod](originalObj, path);
      // try to use a default value  ONLY if the original value is undefined. Values like false, 0, '', null, will pass as they are
      originalValue = originalValue === undefined
        ? tryDefault(getMethod, defaults, path, defaultPath)
        : originalValue;

      const newValue = process(originalValue, originalObj);

      this.update(newValue, true);
    });

};
