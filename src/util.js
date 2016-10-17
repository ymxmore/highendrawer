'use strict';

/**
 * Convert the first letter to uppercase.
 *
 * @param {string} str Target character string.
 * @return {string} Converted string.
 */
export function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

/**
 * Whether or not the object is an array.
 *
 * @param {any} obj Target object.
 * @return {boolean} Returns true if object is an Array.
 */
export function isarray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
