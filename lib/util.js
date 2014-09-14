'use strict';

module.exports = {
  /**
   * Capitalize a string
   * @param {string} str
   * @return {string} capitalized string
   */
  capitalize: function (str) {
    if (str) {
      str    = str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
    }

    return str;
  }
};
