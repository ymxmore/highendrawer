/**
 * Drawer object.
 *
 * @typedef {Object} Drawer
 * @property {!Object} element HTML DOM Element.
 * @property {string} [direction="right"] Drawer placement direction.
 * @property {string|number} [size="80%"] Drawer size. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {string|number} [maxSize=-1] Drawer max size. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {boolean} [swipeable=true] Enable opening and closing of the drawer with a swipe gesture.
 * @property {string|number} [swipeArea=20] Swipeable area. In the case of character strings, the units are '%' and 'px' are supported.
 * @property {number} [duration=400] Drawer moving time.
 * @property {number} [zIndex=9999] Drawer stacking order.
 * @property {Object} [style={}] Drawer's css style.
 * @property {boolean} [initCreate=true] Create a drawer at initialization.
 * @property {number} [enabledMaxWidth=-1] Maximum screen width with drawer enabled. Always valid when -1.
 * @property {boolean} [history=true] Activate if history is supported.
 * @property {Overlay} [overlay=null] Overlay object. If not specified, it will be created automatically. Specify false if it is unnecessary.
 * @property {function} [onCreate=null] Called when a drawer is created.
 * @property {function} [onDestroy=null] Called when a drawer is destroyed.
 * @property {function} [onOpen=null] Called when a drawer is opened.
 * @property {function} [onClose=null] Called when a drawer is closed.
 * @property {function} [onChangeState=null] Called when the opening / closing state is changed.
 * @property {function} [onResize=null] Called when the size of the drawer has changed.
 * @property {function} [onTouchStart=null] Called when the drawer starts moving with a swipe gesture.
 * @property {function} [onTouchMove=null] Called when the drawer is moving with a swipe gesture.
 * @property {function} [onTouchFinish=null] Called when the drawer has finished moving with a swipe gesture.
 * @property {function} [onError=null] Called when there is an error in processing within the object.
 */

/**
 * Overlay object.
 *
 * @typedef {Object} Overlay
 * @property {Object} element HTML DOM Element.
 * @property {number} [opacity=0.6] Overlay object transparency.
 * @property {number} [zIndex=-1] Overlay stacking order. If -1, zIndex - 1 of the drawer is specified automatically.
 */
