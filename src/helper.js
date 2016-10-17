'use strict';

import {PREFIX} from './const';
import {isarray, ucfirst} from './util';

const dom = window.document.createElement('div');

let currentid = 0;
let validstylename = {};

/**
 * Generate ID.
 *
 * @return {number} ID.
 */
export function generateid() {
  return ++currentid;
}

/**
 * Verify that the style is present.
 *
 * @param {string[]|string} styles Css styles.
 * @return {boolean} Result of verification.
 */
export function hasstyle(styles) {
  let ss = styles;

  if (!isarray(styles)) {
    ss = [styles];
  }

  for (let style of ss) {
    if (typeof dom.style[style] !== 'undefined') {
      return true;
    }
  }

  return false;
}

/**
 * Set the CSS style to element.
 *
 * @param {Object} element Target element object.
 * @param {Object} style Css style.
 */
export function setstyle(element, style) {
  for (let name of Object.keys(style)) {
    let vsn = validstylename[name];

    if (vsn) {
      element.style[vsn] = style[name];
    } else if (typeof element.style[name] === 'undefined') {
      for (let i = 0; i < 2; i++) {
        for (let pfx of PREFIX) {
          let namewithprefix = (i === 0 ? pfx : ucfirst(pfx)) +
            ucfirst(name);

          if (typeof element.style[namewithprefix] !== 'undefined') {
            validstylename[name] = namewithprefix;
            element.style[namewithprefix] = style[name];
            break;
          }
        }
      }
    } else {
      validstylename[name] = name;
      element.style[name] = style[name];
    }
  }
}

/**
 * Unset the CSS style to element.
 *
 * @param {Object} element Target element object.
 * @param {string[]|string} styles Css styles.
 */
export function unsetstyle(element, styles) {
  let style = {};

  for (let name of isarray(styles) ? styles : [styles]) {
    style[name] = '';
  }

  setstyle(element, style);
}
