'use strict';

/**
 * Vendor prefix list.
 *
 * @type {string[]}
 */
export const PREFIX = ['webkit', 'moz', 'o', 'ms'];

/**
 * Drawer's default css style.
 *
 * @type {Object}
 */
export const DRAWER_STYLE = Object.freeze({
  display: 'block',
  position: 'fixed',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: -1,
  opacity: 0,
  webkitOverflowScrolling: 'touch',
});

/**
 * Overlay's default css style.
 *
 * @type {Object}
 */
export const OVERLAY_STYLE = Object.freeze({
  display: 'none',
  backgroundColor: '#000',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
  opacity: 0,
});

/**
 * Css transition style.
 *
 * @type {Object}
 */
export const TRANSITION_STYLE = Object.freeze({
  transform: '',
  transitionProperty: 'transform,opacity',
  transitionTimingFunction: 'cubic-bezier(0, 0.8, 0.95, 1)',
  transitionDuration: '0ms',
});

/**
 * Default drawer property.
 *
 * @type {Drawer}
 */
export const DEFAULT_DRAWER_PROPERTY = Object.freeze({
  element: null,
  direction: 'right',
  size: '80%',
  maxsize: -1,
  swipeable: true,
  swipearea: 20,
  duration: 400,
  zindex: 9999,
  style: {},
  initcreate: true,
  enabledmaxwidth: -1,
  history: true,
  overlay: null,
  oncreate: null,
  ondestroy: null,
  onopen: null,
  onclose: null,
  onchangestate: null,
  onresize: null,
  ontouchstart: null,
  ontouchmove: null,
  ontouchfinish: null,
  onerror: null,
});

/**
 * Default overlay property.
 *
 * @type {Overlay}
 */
export const DEFAULT_OVERLAY_PROPERTY = Object.freeze({
  element: null,
  opacity: 0.4,
  zindex: -1,
  autocreate: false,
});

/**
 * Default processing state object.
 *
 * @type {Object}
 */
export const DEFAULT_PROCESS = Object.freeze({
  touches: [],
  istouchactive: null,
  istouchpointactive: null,
  istouchdirectionactive: null,
  time: {
    start: 0,
    end: 0,
  },
});

/**
 * Touch event list.
 *
 * @type {string[]}
 */
export const TOUCH_EVENTS = [
  'touchstart',
  'touchmove',
  'touchend',
  'touchcancel',
];
