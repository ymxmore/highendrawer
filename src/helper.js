import {PREFIX} from './const';
import {isArray, ucFirst} from './util';

const dom = window.document.createElement('div');
const validStyleName = {};
let currentId = 0;

// Feature detection for method 'preventDefault' of event.
let supportsPassive = false;

try {
  const opts = Object.defineProperty({}, 'passive', {
    get: () => {
      supportsPassive = true;
    },
  });

  window.addEventListener('supportsPassiveTestEvent', null, opts);
} catch (e) {}

/**
 * Generate ID.
 *
 * @return {number} ID.
 */
export function generateId() {
  return ++currentId;
}

/**
 * Verify that the style is present.
 *
 * @param {string[]|string} styles Css styles.
 * @return {boolean} Result of verification.
 */
export function hasStyle(styles) {
  const ss = isArray(styles) ? styles : [styles];

  for (const style of ss) {
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
export function setStyle(element, style) {
  for (const name of Object.keys(style)) {
    const vsn = validStyleName[name];

    if (vsn) {
      element.style[vsn] = style[name];
    } else if (typeof element.style[name] === 'undefined') {
      for (let i = 0; i < 2; i++) {
        for (const pfx of PREFIX) {
          const nwp = (i === 0 ? pfx : ucFirst(pfx)) +
            ucFirst(name);

          if (typeof element.style[nwp] !== 'undefined') {
            validStyleName[name] = nwp;
            element.style[nwp] = style[name];
            break;
          }
        }
      }
    } else {
      validStyleName[name] = name;
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
export function unsetStyle(element, styles) {
  const style = {};

  for (const name of isArray(styles) ? styles : [styles]) {
    style[name] = '';
  }

  setStyle(element, style);
}

/**
 * Validate HTMLElement.
 *
 * @param {*} obj HTMLElement to be verified.
 * @return {boolean} Result of valid HTMLElement.
 */
export function isHTMLElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return (typeof obj === 'object') &&
      (obj.nodeType === 1) &&
      (typeof obj.style === 'object') &&
      (typeof obj.ownerDocument === 'object');
  }
}

/**
 * Add event listener with options.
 *
 * @param {Object} target Target object.
 * @param {string} type Event type.
 * @param {function} handler Event handler.
 * @param {Object} [options={}] Event options.
 */
export function addEventListenerWithOptions(
    target, type, handler, options = {}
) {
  const optionsOrCapture = Object.assign({
    passive: true,
    capture: false,
  }, options);

  target.addEventListener(type, handler, supportsPassive ?
    optionsOrCapture :
    optionsOrCapture.capture
  );
}
