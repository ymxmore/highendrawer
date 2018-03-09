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
  maxSize: -1,
  swipeable: true,
  swipeArea: 20,
  duration: 400,
  zIndex: 9999,
  style: {},
  initCreate: true,
  enabledMaxWidth: -1,
  history: true,
  overlay: null,
  onCreate: null,
  onDestroy: null,
  onOpen: null,
  onClose: null,
  onChangeState: null,
  onResize: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchFinish: null,
  onError: null,
});

/**
 * Default overlay property.
 *
 * @type {Overlay}
 */
export const DEFAULT_OVERLAY_PROPERTY = Object.freeze({
  element: null,
  opacity: 0.6,
  zIndex: -1,
  autoCreate: false,
});

/**
 * Default processing state object.
 *
 * @type {Object}
 */
export const DEFAULT_PROCESS = Object.freeze({
  touches: [],
  isTouchActive: null,
  isTouchPointActive: null,
  isTouchDirectionActive: null,
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
