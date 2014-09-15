'use strict';

var util      = require('./util');
var providers = require('require-dir')('./providers');

module.exports = Conf;

/**
 * @constructor
 */
function Conf() {
  this.stores = [];
}

/**
 * @property {array}
 * @default
 */
Conf.prototype.stores = null;

/**
 * Add value store to configuration
 * @param {object} store
 */
Conf.prototype.addStore = function (store) {
  var providerName = util.capitalize(store.provider);
  var ProviderFn   = providers[providerName];

  this.stores.unshift(new ProviderFn(store));
};

/**
 * Get value from configuration
 * @param {string} key The key of the value to retrieve
 * @return {object}
 */
Conf.prototype.get = function (key) {
  var value;

  this.stores.some(function (store) {
    value = this.lookupValue(key, store.getData());

    return value !== undefined;
  }, this);

  return value;
};

/**
 * Look up property path in object literal
 * @param {string} key
 * @param {object} data
 * @return {object} value
 */
Conf.prototype.lookupValue = function (key, data) {
  var parts, firstPart, value;

  if (key && key.split) {
    parts     = key.split('.');
    firstPart = parts.shift();
    value     = data[firstPart];
  } else {
    return undefined;
  }

  if (parts.length === 0) {
    return value;
  }

  if (typeof value !== 'object' && parts.length > 0) {
    return undefined;
  }

  return this.lookupValue(parts.join('.'), value);
};
