/**
 * Drawer object.
 *
 * @typedef {Object} Drawer
 * @property {!Object} element HTML DOM Element.
 * @property {string} [direction="right"] Drawer placement direction.
 * @property {string|number} [size="80%"] Drawer size. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {string|number} [maxsize=-1] Drawer max size. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {boolean} [swipeable=true] Enable opening and closing of the drawer with a swipe gesture.
 * @property {string|number} [swipearea=20] Swipeable area. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {number} [duration=256] Drawer moving time.
 * @property {number} [zindex=9999] Drawer stacking order.
 * @property {Object} [style={}] Drawer's css style.
 * @property {boolean} [initcreate=true] Create a drawer at initialization.
 * @property {number} [enabledmaxwidth=-1] Maximum screen width with drawer enabled. Always valid when -1.
 * @property {boolean} [history=true] Activate if history is supported.
 * @property {Overlay} [overlay=null] Overlay object. If not specified, it will be created automatically. Specify false if it is unnecessary.
 * @property {function} [oncreate=null] Called when a drawer is created.
 * @property {function} [ondestroy=null] Called when a drawer is destroyed.
 * @property {function} [onopen=null] Called when a drawer is opened.
 * @property {function} [onclose=null] Called when a drawer is closed.
 * @property {function} [onchangestate=null] Called when the opening / closing state is changed.
 * @property {function} [onresize=null] Called when the size of the drawer has changed.
 * @property {function} [ontouchstart=null] Called when the drawer starts moving with a swipe gesture.
 * @property {function} [ontouchmove=null] Called when the drawer is moving with a swipe gesture.
 * @property {function} [ontouchfinish=null] Called when the drawer has finished moving with a swipe gesture.
 * @property {function} [onerror=null] Called when there is an error in processing within the object.
 */

/**
 * Overlay object.
 *
 * @typedef {Object} Overlay
 * @property {Object} element HTML DOM Element.
 * @property {number} [opacity=0.2] Overlay object transparency.
 * @property {number} [zindex=-1] Overlay stacking order. If -1, zindex - 1 of the drawer is specified automatically.
 */
