/*!
 * highendrawer - Highendrawer provides javascript and css drawers to your website and applications.
 * @version v0.0.16
 * @link https://github.com/ym-aozora/highendrawer#readme
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Highendrawer"] = factory();
	else
		root["Highendrawer"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/highendrawer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: PREFIX, DRAWER_STYLE, OVERLAY_STYLE, TRANSITION_STYLE, DEFAULT_DRAWER_PROPERTY, DEFAULT_OVERLAY_PROPERTY, DEFAULT_PROCESS, TOUCH_EVENTS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PREFIX", function() { return PREFIX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DRAWER_STYLE", function() { return DRAWER_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OVERLAY_STYLE", function() { return OVERLAY_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TRANSITION_STYLE", function() { return TRANSITION_STYLE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_DRAWER_PROPERTY", function() { return DEFAULT_DRAWER_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_OVERLAY_PROPERTY", function() { return DEFAULT_OVERLAY_PROPERTY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PROCESS", function() { return DEFAULT_PROCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOUCH_EVENTS", function() { return TOUCH_EVENTS; });
/**
 * Vendor prefix list.
 *
 * @type {string[]}
 */
var PREFIX = ['webkit', 'moz', 'o', 'ms'];
/**
 * Drawer's default css style.
 *
 * @type {Object}
 */

var DRAWER_STYLE = Object.freeze({
  display: 'block',
  position: 'fixed',
  overflowX: 'hidden',
  overflowY: 'auto',
  zIndex: -1,
  opacity: 0,
  webkitOverflowScrolling: 'touch'
});
/**
 * Overlay's default css style.
 *
 * @type {Object}
 */

var OVERLAY_STYLE = Object.freeze({
  display: 'none',
  backgroundColor: '#000',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: -1,
  opacity: 0
});
/**
 * Css transition style.
 *
 * @type {Object}
 */

var TRANSITION_STYLE = Object.freeze({
  transform: '',
  transitionProperty: 'transform,opacity',
  transitionTimingFunction: 'cubic-bezier(0, 0.8, 0.95, 1)',
  transitionDuration: '0ms'
});
/**
 * Default drawer property.
 *
 * @type {Drawer}
 */

var DEFAULT_DRAWER_PROPERTY = Object.freeze({
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
  onError: null
});
/**
 * Default overlay property.
 *
 * @type {Overlay}
 */

var DEFAULT_OVERLAY_PROPERTY = Object.freeze({
  element: null,
  opacity: 0.6,
  zIndex: -1,
  autoCreate: false
});
/**
 * Default processing state object.
 *
 * @type {Object}
 */

var DEFAULT_PROCESS = Object.freeze({
  touches: [],
  isTouchActive: null,
  isTouchPointActive: null,
  isTouchDirectionActive: null,
  time: {
    start: 0,
    end: 0
  }
});
/**
 * Touch event list.
 *
 * @type {string[]}
 */

var TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/*! exports provided: generateId, hasStyle, setStyle, unsetStyle, isHTMLElement, addEventListenerWithOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateId", function() { return generateId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasStyle", function() { return hasStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyle", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsetStyle", function() { return unsetStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isHTMLElement", function() { return isHTMLElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addEventListenerWithOptions", function() { return addEventListenerWithOptions; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var dom = window.document.createElement('div');
var validStyleName = {};
var currentId = 0; // Feature detection for method 'preventDefault' of event.

var supportsPassive = false;

try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener('supportsPassiveTestEvent', null, opts);
} catch (e) {}
/**
 * Generate ID.
 *
 * @return {number} ID.
 */


function generateId() {
  return ++currentId;
}
/**
 * Verify that the style is present.
 *
 * @param {string[]|string} styles Css styles.
 * @return {boolean} Result of verification.
 */

function hasStyle(styles) {
  var ss = Object(_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(styles) ? styles : [styles];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = ss[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var style = _step.value;

      if (typeof dom.style[style] !== 'undefined') {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
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

function setStyle(element, style) {
  for (var _i = 0, _Object$keys = Object.keys(style); _i < _Object$keys.length; _i++) {
    var name = _Object$keys[_i];
    var vsn = validStyleName[name];

    if (vsn) {
      element.style[vsn] = style[name];
    } else if (typeof element.style[name] === 'undefined') {
      for (var i = 0; i < 2; i++) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _const__WEBPACK_IMPORTED_MODULE_0__["PREFIX"][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var pfx = _step2.value;
            var nwp = (i === 0 ? pfx : Object(_util__WEBPACK_IMPORTED_MODULE_1__["ucFirst"])(pfx)) + Object(_util__WEBPACK_IMPORTED_MODULE_1__["ucFirst"])(name);

            if (typeof element.style[nwp] !== 'undefined') {
              validStyleName[name] = nwp;
              element.style[nwp] = style[name];
              break;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
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

function unsetStyle(element, styles) {
  var style = {};
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = (Object(_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(styles) ? styles : [styles])[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var name = _step3.value;
      style[name] = '';
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  setStyle(element, style);
}
/**
 * Validate HTMLElement.
 *
 * @param {*} obj HTMLElement to be verified.
 * @return {boolean} Result of valid HTMLElement.
 */

function isHTMLElement(obj) {
  try {
    return obj instanceof HTMLElement;
  } catch (e) {
    return _typeof(obj) === 'object' && obj.nodeType === 1 && _typeof(obj.style) === 'object' && _typeof(obj.ownerDocument) === 'object';
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

function addEventListenerWithOptions(target, type, handler) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var optionsOrCapture = _extends({
    passive: true,
    capture: false
  }, options);

  target.addEventListener(type, handler, supportsPassive ? optionsOrCapture : optionsOrCapture.capture);
}

/***/ }),

/***/ "./src/highendrawer.js":
/*!*****************************!*\
  !*** ./src/highendrawer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Highendrawer; });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const */ "./src/const.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/util.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./src/helper.js");
/* harmony import */ var _support__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./support */ "./src/support.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





/**
 * Class providing a drawer function.
 *
 * @public
 * @class
 * @example
 * var drawer = new Highendrawer({
 *   element: document.getElementById('drawer')
 * });
 */

var Highendrawer =
/*#__PURE__*/
function () {
  /**
   * Initialize object.
   *
   * @constructor
   * @param {Drawer} drawer Initial parameters of drawer.
   */
  function Highendrawer(drawer) {
    var _this = this;

    _classCallCheck(this, Highendrawer);

    /**
     * Drawer status ('open' or 'close')
     *
     * @public
     * @type {string}
     */
    this.state = 'close';
    this._id = _helper__WEBPACK_IMPORTED_MODULE_2__["generateId"]();
    this._drawer = _extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_DRAWER_PROPERTY"], drawer);
    this._overlay = this._drawer.overlay === false ? false : _extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_OVERLAY_PROPERTY"], this._drawer.overlay);
    this._timeoutId = null;
    this._intervalId = null;
    this._process = _extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["DEFAULT_PROCESS"]);
    this._enabled = false;
    this._handler = this._getDrawerHandler();

    if (!this._drawer.element) {
      throw new Error("'element' is required.");
    }

    if (!_helper__WEBPACK_IMPORTED_MODULE_2__["isHTMLElement"](this._drawer.element)) {
      throw new Error("Invalid HTMLElement specified for 'element'.");
    }

    if (this._drawer.enabledMaxWidth > -1) {
      _helper__WEBPACK_IMPORTED_MODULE_2__["addEventListenerWithOptions"](window, 'resize', function () {
        if (_this._enabled && window.innerWidth > _this._drawer.enabledMaxWidth) {
          _this.destroy();
        } else if (!_this._enabled && window.innerWidth <= _this._drawer.enabledMaxWidth) {
          _this.create();
        }
      });
    }

    if (window.history && window.history.pushState && this._drawer.history) {
      window.history.replaceState({
        id: this._id
      }, null, null);
    }

    if (this._drawer.initCreate && (this._drawer.enabledMaxWidth < 0 || window.innerWidth <= this._drawer.enabledMaxWidth)) {
      this.create();
    }
  }
  /**
   * Create the drawer set.
   *
   * @public
   */


  _createClass(Highendrawer, [{
    key: "create",
    value: function create() {
      try {
        this._createDrawer();

        this._createOverlay();

        this._enabled = true;

        if (this._drawer.onCreate) {
          this._drawer.onCreate.apply(this, [this._drawer]);
        }
      } catch (e) {
        if (this._drawer && this._drawer.onError && typeof this._drawer.onError === 'function') {
          this._drawer.onError.apply(this, [e]);
        } else {
          throw e;
        }
      }
    }
    /**
     * Destroy the drawer set.
     *
     * @public
     */

  }, {
    key: "destroy",
    value: function destroy() {
      try {
        if (this.state === 'open') {
          this.close(0, true, true);
        }

        this._destroyDrawer();

        this._destroyOverlay();

        this._enabled = false;

        if (this._drawer.onDestroy) {
          this._drawer.onDestroy.apply(this, [this._drawer]);
        }
      } catch (e) {
        if (this._drawer && this._drawer.onError && typeof this._drawer.onError === 'function') {
          this._drawer.onError.apply(this, [e]);
        } else {
          throw e;
        }
      }
    }
    /**
     * Open drawer.
     *
     * @public
     * @param {number} [duration] Drawer moving time.
     * @param {boolean} [isFireEvent] Whether to fire an event on the drawer.
     * @param {boolean} [isChangeHistory=false] Make a change in history.
     * @return {Promise} Promise object for open.
     */

  }, {
    key: "open",
    value: function open() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isFireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isChangeHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return this._changeState(0, duration, {
        onChangeState: isFireEvent ? this._drawer.onChangeState : null,
        done: isFireEvent ? this._drawer.onOpen : null,
        fail: isFireEvent ? this._drawer.onError : null
      }, isChangeHistory);
    }
    /**
     * Close drawer.
     *
     * @public
     * @param {number} [duration] Drawer moving time.
     * @param {boolean} [isFireEvent] Whether to fire an event on the drawer.
     * @param {boolean} [isChangeHistory=false] Make a change in history.
     * @return {Promise} Promise object for close.
     */

  }, {
    key: "close",
    value: function close() {
      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isFireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isChangeHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return this._changeState(this._getMinPosition(), duration, {
        onChangeState: isFireEvent ? this._drawer.onChangeState : null,
        done: isFireEvent ? this._drawer.onClose : null,
        fail: isFireEvent ? this._drawer.onError : null
      }, isChangeHistory);
    }
    /**
     * Toggle drawer.
     *
     * @public
     * @param {number} [duration] Drawer moving time.
     * @param {boolean} [isFireEvent] Whether to fire an event on the drawer.
     * @param {boolean} [isChangeHistory=false] Make a change in history.
     * @return {Promise} Promise object for toggle.
     */

  }, {
    key: "toggle",
    value: function toggle() {
      var _this2 = this;

      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var isFireEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isChangeHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return new Promise(function (resolve, reject) {
        try {
          _this2[_this2.state === 'open' ? 'close' : 'open'](duration, isFireEvent, isChangeHistory).then(resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
    /**
     * Create drawer.
     */

  }, {
    key: "_createDrawer",
    value: function _createDrawer() {
      var _this3 = this;

      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, _extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["DRAWER_STYLE"], _support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim ? _const__WEBPACK_IMPORTED_MODULE_0__["TRANSITION_STYLE"] : {}));

      this._resetDrawer();

      Object.keys(this._handler).forEach(function (name) {
        _helper__WEBPACK_IMPORTED_MODULE_2__["addEventListenerWithOptions"](window, name, _this3._handler[name], {
          passive: name !== 'touchmove'
        });
      });
    }
    /**
     * Destroy drawer.
     */

  }, {
    key: "_destroyDrawer",
    value: function _destroyDrawer() {
      var _this4 = this;

      Object.keys(this._handler).forEach(function (name) {
        window.removeEventListener(name, _this4._handler[name]);
      });

      this._resetDrawer(true);

      _helper__WEBPACK_IMPORTED_MODULE_2__["unsetStyle"](this._drawer.element, Object.keys(_extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["DRAWER_STYLE"], _support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim ? _const__WEBPACK_IMPORTED_MODULE_0__["TRANSITION_STYLE"] : {})));
    }
    /**
     * Create overlay.
     */

  }, {
    key: "_createOverlay",
    value: function _createOverlay() {
      var _this5 = this;

      if (this._overlay === false) {
        return;
      }

      if (this._overlay.zIndex === -1) {
        this._overlay.zIndex = this._drawer.zIndex - 1;
      }

      if (!this._overlay.element) {
        this._overlay.element = window.document.createElement('div');
        this._overlay.autoCreated = true;
        _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._overlay.element, _extends({}, _const__WEBPACK_IMPORTED_MODULE_0__["OVERLAY_STYLE"], _support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim ? _const__WEBPACK_IMPORTED_MODULE_0__["TRANSITION_STYLE"] : {}));
      }

      if (!this._overlay.touchHandler) {
        this._overlay.touchHandler = function (e) {
          _this5.close();
        };
      }

      window.document.body.appendChild(this._overlay.element);
    }
    /**
     * Destroy overlay.
     */

  }, {
    key: "_destroyOverlay",
    value: function _destroyOverlay() {
      if (this._overlay === false) {
        return;
      }

      if (this._overlay.element) {
        this._overlay.element.removeEventListener('click', this._overlay.touchHandler);

        if (this._overlay.autoCreated) {
          this._overlay.element.parentNode.removeChild(this._overlay.element);
        }
      }
    }
    /**
     * Reset drawer.
     *
     * @param {boolean} [isUnset] Unset style.
     */

  }, {
    key: "_resetDrawer",
    value: function _resetDrawer() {
      var isUnset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      try {
        this._setProps();

        var ims = this._getInitDrawerStyle();

        if (isUnset) {
          _helper__WEBPACK_IMPORTED_MODULE_2__["unsetStyle"](this._drawer.element, Object.keys(ims));
        } else {
          _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, ims);
        }
      } catch (e) {
        if (this._drawer.onError && typeof this._drawer.onError === 'function') {
          this._drawer.onError.apply(this, [e]);
        } else {
          throw e;
        }
      }
    }
    /**
     * Show drawer.
     */

  }, {
    key: "_showDrawer",
    value: function _showDrawer() {
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, {
        zIndex: this._drawer.zIndex,
        opacity: 1
      });
    }
    /**
     * Hide drawer.
     */

  }, {
    key: "_hideDrawer",
    value: function _hideDrawer() {
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, {
        zIndex: -1,
        opacity: 0
      });
    }
    /**
     * Show overlay.
     */

  }, {
    key: "_showOverlay",
    value: function _showOverlay() {
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._overlay.element, {
        zIndex: this._overlay.zIndex,
        display: 'block'
      });
    }
    /**
     * Hide overlay.
     */

  }, {
    key: "_hideOverlay",
    value: function _hideOverlay() {
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._overlay.element, {
        zIndex: -1,
        display: 'none'
      });
    }
    /**
     * Set properties.
     */

  }, {
    key: "_setProps",
    value: function _setProps() {
      // set sizePixel
      var sizePixel = this._normalizePixel(this._drawer.size);

      if (this._drawer.maxSize && this._drawer.maxSize !== -1) {
        var maxSizePixel = this._normalizePixel(this._drawer.maxSize);

        if (sizePixel > maxSizePixel) {
          sizePixel = maxSizePixel;
        }
      }

      this._sizePixel = sizePixel; // set position

      this._position = typeof this._position === 'undefined' ? null : this._position;
    }
    /**
     * Return initial style of drawer.
     *
     * @return {Object} Style for drawer.
     */

  }, {
    key: "_getInitDrawerStyle",
    value: function _getInitDrawerStyle() {
      var style = null;

      switch (this._drawer.direction) {
        case 'top':
          style = {
            width: '100%',
            height: "".concat(this._sizePixel, "px"),
            top: "-".concat(this._sizePixel, "px"),
            right: 'auto',
            bottom: 'auto',
            left: 0
          };
          break;

        case 'right':
          style = {
            width: "".concat(this._sizePixel, "px"),
            height: '100%',
            top: 0,
            right: "-".concat(this._sizePixel, "px"),
            bottom: 'auto',
            left: 'auto'
          };
          break;

        case 'bottom':
          style = {
            width: '100%',
            height: "".concat(this._sizePixel, "px"),
            top: 'auto',
            right: 'auto',
            bottom: "-".concat(this._sizePixel, "px"),
            left: 0
          };
          break;

        case 'left':
          style = {
            width: "".concat(this._sizePixel, "px"),
            height: '100%',
            top: 0,
            right: 'auto',
            bottom: 'auto',
            left: "-".concat(this._sizePixel, "px")
          };
          break;

        default:
          throw new Error("'".concat(this._drawer.direction, "' does not support"));
      }

      return _extends(style, this._drawer.style || {});
    }
    /**
     * Return style for moving the drawer.
     *
     * @param {number} position Moving position.
     * @param {number} [duration] Drawer moving time.
     * @return {Object} Move style for drawer.
     */

  }, {
    key: "_getDrawerStyle",
    value: function _getDrawerStyle(position) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var minp = this._getMinPosition(this._drawer);

      var style = {};

      if (_support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim) {
        style.transitionDuration = "".concat(duration === null ? this._drawer.duration : duration, "ms");

        switch (this._drawer.direction) {
          case 'top':
            style.transform = "".concat(_support__WEBPACK_IMPORTED_MODULE_3__["support"].transrate, "(0,").concat(-(minp - position), "px,0)");
            break;

          case 'right':
            style.transform = "".concat(_support__WEBPACK_IMPORTED_MODULE_3__["support"].transrate, "(").concat(minp - position, "px,0,0)");
            break;

          case 'bottom':
            style.transform = "".concat(_support__WEBPACK_IMPORTED_MODULE_3__["support"].transrate, "(0,").concat(minp - position, "px,0)");
            break;

          case 'left':
            style.transform = "".concat(_support__WEBPACK_IMPORTED_MODULE_3__["support"].transrate, "(").concat(-(minp - position), "px,0,0)");
            break;

          default:
            throw new Error("'".concat(this._drawer.direction, "' does not support"));
        }
      } else {
        style[this._drawer.direction] = "".concat(position, "px");
      }

      return style;
    }
    /**
     * Return style for moving the overlay.
     *
     * @param {float} opacity Overlay opacity.
     * @param {number} [duration] Drawer moving time.
     * @return {Object} Move style for overlay.
     */

  }, {
    key: "_getOverlayStyle",
    value: function _getOverlayStyle(opacity) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var style = {
        opacity: opacity
      };

      if (_support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim) {
        style.transitionDuration = "".concat(duration === null ? this._drawer.duration : duration, "ms");
      }

      return style;
    }
    /**
     * Change overlay state.
     *
     * @param {string} state Drawer status ('open' or 'close')
     */

  }, {
    key: "_changeOverlayState",
    value: function _changeOverlayState(state) {
      if (state === 'open') {
        _helper__WEBPACK_IMPORTED_MODULE_2__["addEventListenerWithOptions"](this._overlay.element, 'click', this._overlay.touchHandler);
      } else {
        this._hideDrawer();

        this._hideOverlay();
      }
    }
    /**
     * Make animation with CSS3.
     *
     * @param {number} duration Drawer moving time.
     */

  }, {
    key: "_cssAnimate",
    value: function _cssAnimate(duration) {
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._overlay.element, this._getOverlayStyle(this._getOverlayOpacityFromPosition(this._position), duration));
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, this._getDrawerStyle(this._position, duration));
    }
    /**
     * Make animation with Javascript.
     *
     * @param {number} duration Drawer moving time.
     */

  }, {
    key: "_jsAnimate",
    value: function _jsAnimate(duration) {
      var _this6 = this;

      var start = +new Date();

      var fromOpy = this._getOverlayOpacityFromStyle();

      var toOpy = this._getOverlayOpacityFromPosition(this._position);

      var fromPos = this._getDrawerPositionFromStyle();

      var toPos = this._position;

      if (this._intervalId) {
        clearInterval(this._intervalId);
      }

      this._intervalId = setInterval(function () {
        var time = new Date() - start;
        var nowPos = null;
        var nowOpy = null;

        if (time > duration) {
          clearInterval(_this6._intervalId);
          _this6._intervalId = null;
          nowOpy = toOpy;
          nowPos = toPos;
        } else {
          var prp = (time /= duration) * (time - 2);
          nowOpy = fromOpy - (toOpy - fromOpy) * prp;
          nowPos = fromPos - (toPos - fromPos) * prp;
        }

        _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](_this6._overlay.element, _this6._getOverlayStyle(nowOpy, duration));
        _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](_this6._drawer.element, _this6._getDrawerStyle(nowPos, duration));
      }, 10);
    }
    /**
     * Return state by touch movement.
     *
     * @return {string} State by touch movement.
     */

  }, {
    key: "_getTouchMoveState",
    value: function _getTouchMoveState() {
      if (this._process.time.end - this._process.time.start <= 300) {
        var len = this._process.touches.length;

        var moveInfo = this._getTouchMoveInfo(this._process.touches[len - 2], this._process.touches[len - 1]);

        var vertical = moveInfo.axis === 'vertical';
        var horizontal = moveInfo.axis === 'horizontal';
        var top = this._drawer.direction === 'top' && moveInfo.y >= 0;
        var right = this._drawer.direction === 'right' && moveInfo.x < 0;
        var bottom = this._drawer.direction === 'bottom' && moveInfo.y < 0;
        var left = this._drawer.direction === 'left' && moveInfo.x >= 0;
        return vertical && (bottom || top) || horizontal && (right || left) ? 'open' : 'close';
      }

      return this._getStateFromPosition();
    }
    /**
     * Return drawer event handler.
     *
     * @return {Object} Drawer event handler.
     */

  }, {
    key: "_getDrawerHandler",
    value: function _getDrawerHandler() {
      var _this7 = this;

      var handler = {};

      handler.resize = function () {
        _this7._resetDrawer();

        _this7[_this7.state](0, false, false);

        if (_this7._drawer.onResize) {
          _this7._drawer.onResize.apply(_this7, [_this7._drawer]);
        }
      };

      if (this._drawer.swipeable) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _const__WEBPACK_IMPORTED_MODULE_0__["TOUCH_EVENTS"][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var event = _step.value;
            handler[event] = this._touchHandler.bind(this);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      if (window.history && window.history.pushState && this._drawer.history) {
        handler.popstate = function (e) {
          if (e.state && e.state.id === _this7._id && _this7.state === 'open') {
            _this7.close(null, true, false);
          }
        };
      }

      return handler;
    }
    /**
     * Touch event handler.
     *
     * @param {Event} ev Touch event object.
     * @return {boolean} Event bubbling.
     */

  }, {
    key: "_touchHandler",
    value: function _touchHandler(ev) {
      try {
        if (ev.touches.length > 1) {
          return true;
        }

        var touch = ev.touches[0];

        if (touch) {
          this._process.touches.push(touch);
        }

        switch (ev.type) {
          case 'touchstart':
            this._onTouchStart(ev);

            break;

          case 'touchmove':
            this._onTouchMove(ev);

            break;

          case 'touchcancel':
          case 'touchend':
            this._onTouchFinish(ev);

            break;

          default:
            break;
        }
      } catch (e) {
        if (this._drawer.onError && typeof this._drawer.onError === 'function') {
          this._drawer.onError.apply(this, [e]);
        } else {
          throw e;
        }
      }

      return true;
    }
    /**
     * Touch start event handler.
     *
     * @param {Event} ev Touch event object.
     */

  }, {
    key: "_onTouchStart",
    value: function _onTouchStart(ev) {
      this._process.time.start = new Date().getTime();
    }
    /**
     * Touch move event handler.
     *
     * @param {Event} ev Touch event object.
     */

  }, {
    key: "_onTouchMove",
    value: function _onTouchMove(ev) {
      var len = this._process.touches.length;

      if (len < 2) {
        return;
      }

      if (!this._process.isTouchPointActive) {
        this._process.isTouchPointActive = this._isTouchPointActive();
      }

      if (!this._process.isTouchPointActive) {
        return;
      }

      if (this._process.isTouchDirectionActive === null) {
        this._process.isTouchDirectionActive = this._isTouchDirectionActive();
      }

      if (!this._process.isTouchDirectionActive) {
        return;
      }

      var isFireTouchStart = false;
      var isTouchActive = this._process.isTouchPointActive && this._process.isTouchDirectionActive;

      if (!isTouchActive) {
        return;
      }

      if (!this._process.isTouchActive) {
        this._process.isTouchActive = isTouchActive;

        this._showOverlay();

        this._showDrawer();

        if (this._drawer.onTouchStart) {
          isFireTouchStart = true;
        }
      }

      ev.stopPropagation();
      ev.preventDefault();
      this._position = this._getDrawerPositionFromTouches(this._process.touches[len - 2], this._process.touches[len - 1]);

      if (isFireTouchStart) {
        this._drawer.onTouchStart.apply(this, [this._drawer, this._position]);
      }

      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._overlay.element, this._getOverlayStyle(this._getOverlayOpacityFromPosition(this._position), 0));
      _helper__WEBPACK_IMPORTED_MODULE_2__["setStyle"](this._drawer.element, this._getDrawerStyle(this._position, 0));

      if (this._drawer.onTouchMove) {
        this._drawer.onTouchMove.apply(this, [this._drawer, this._position]);
      }
    }
    /**
     * Touch finish event handler.
     *
     * @param {Event} ev Touch event object.
     */

  }, {
    key: "_onTouchFinish",
    value: function _onTouchFinish(ev) {
      var len = this._process.touches.length;

      if (this._process.isTouchActive && len >= 2) {
        this._process.time.end = new Date().getTime();

        var state = this._getTouchMoveState();

        var changeState = this.state !== state;
        this[state](null, changeState, changeState);

        if (this._drawer.onTouchFinish) {
          this._drawer.onTouchFinish.apply(this, [this._drawer, this._getDrawerPositionFromTouches(this._process.touches[len - 2], this._process.touches[len - 1])]);
        }
      }

      this._process.touches = [];
      this._process.isTouchActive = null;
      this._process.isTouchPointActive = null;
      this._process.isTouchDirectionActive = null;
      this._process.time.start = 0;
      this._process.time.end = 0;
    }
    /**
     * Return whether or not a valid touch.
     *
     * @param {number} position Moving position.
     * @param {number} [duration=null] Drawer moving time.
     * @param {Object} [callbacks=null] Callback objects.
     * @param {boolean} [isChangeHistory=false] Make a change in history.
     * @return {Promise} Promise object.
     */

  }, {
    key: "_changeState",
    value: function _changeState(position) {
      var _this8 = this;

      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var isChangeHistory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      return this._handleCallback(new Promise(function (resolve, reject) {
        try {
          if (!_this8._enabled) {
            throw new Error('Drawer is disabled.');
          }

          _this8._position = position;
          var du = duration === null ? _this8._drawer.duration : duration;

          if (_this8._timeoutId !== null) {
            clearTimeout(_this8._timeoutId);
            _this8._timeoutId = null;
          }

          var state = _this8._getStateFromPosition();

          if (state === 'open') {
            _this8._showOverlay();

            _this8._showDrawer();
          } else {
            _this8._overlay.element.removeEventListener('click', _this8._overlay.touchHandler);
          }

          if (isChangeHistory && _this8._drawer.history && window.history && window.history.pushState) {
            if (state === 'open') {
              window.history.pushState({
                id: _this8._id
              }, null, null);
            } else {
              window.history.back();
            }
          }

          _this8[_support__WEBPACK_IMPORTED_MODULE_3__["support"].cssAnim ? '_cssAnimate' : '_jsAnimate'](du);

          if (du > 0) {
            _this8._timeoutId = setTimeout(function () {
              _this8._changeOverlayState(state);

              _this8._timeoutId = null;
            }, du);
          } else {
            _this8._changeOverlayState(state);
          }

          _this8.state = state;

          if (_typeof(callbacks) === 'object' && callbacks.onChangeState) {
            callbacks.onChangeState.apply(_this8, [_this8._drawer, state]);
          }

          resolve.apply(_this8, [_this8._drawer]);
        } catch (e) {
          reject(e);
        }
      }), {
        done: _typeof(callbacks) === 'object' && callbacks.done ? callbacks.done : null,
        fail: _typeof(callbacks) === 'object' && callbacks.fail ? callbacks.fail : null
      });
    }
    /**
     * Return whether or not a valid touch point.
     *
     * @return {boolean} Result of valid touch point.
     */

  }, {
    key: "_isTouchPointActive",
    value: function _isTouchPointActive() {
      var rg = this._getRange(this.state === 'open' ? this._sizePixel : this._drawer.swipeArea);

      var len = this._process.touches.length;
      return rg.from.x <= this._process.touches[len - 2].clientX && this._process.touches[len - 2].clientX <= rg.to.x && rg.from.y <= this._process.touches[len - 2].clientY && this._process.touches[len - 2].clientY <= rg.to.y;
    }
    /**
     * Return whether or not a valid touch direction.
     *
     * @return {boolean} Result of valid touch direction.
     */

  }, {
    key: "_isTouchDirectionActive",
    value: function _isTouchDirectionActive() {
      var len = this._process.touches.length;

      var moveInfo = this._getTouchMoveInfo(this._process.touches[len - 2], this._process.touches[len - 1]);

      var vertical = moveInfo.axis === 'vertical';
      var horizontal = moveInfo.axis === 'horizontal';

      if (!(vertical && (this._drawer.direction === 'top' || this._drawer.direction === 'bottom') || horizontal && (this._drawer.direction === 'right' || this._drawer.direction === 'left'))) {
        return false;
      }

      return this.state === 'open' && (this._drawer.direction === 'top' && moveInfo.y < 0 || this._drawer.direction === 'right' && moveInfo.x >= 0 || this._drawer.direction === 'bottom' && moveInfo.y >= 0 || this._drawer.direction === 'left' && moveInfo.x < 0) || this.state === 'close' && (this._drawer.direction === 'top' && moveInfo.y >= 0 || this._drawer.direction === 'right' && moveInfo.x < 0 || this._drawer.direction === 'bottom' && moveInfo.y < 0 || this._drawer.direction === 'left' && moveInfo.x >= 0);
    }
    /**
     * Return the state of the drawer.
     *
     * @return {string} State of the drawer.
     */

  }, {
    key: "_getStateFromPosition",
    value: function _getStateFromPosition() {
      var pos = this._position === null ? this._getDrawerPositionFromStyle() : this._position;
      return Math.abs(pos) < this._sizePixel / 2 ? 'open' : 'close';
    }
    /**
     * Return the position of the drawer.
     *
     * @param {Object} touchbasis Basic touch information.
     * @param {Object} touchlast Last touch information.
     * @return {number} Position of the drawer.
     */

  }, {
    key: "_getDrawerPositionFromTouches",
    value: function _getDrawerPositionFromTouches(touchbasis, touchlast) {
      var distance = this._getDistance(this._getTouchMoveInfo(touchbasis, touchlast));

      var curpos = this._position === null ? this._getDrawerPositionFromStyle() : this._position;

      var minp = this._getMinPosition(this._drawer);

      var pos = Math.round(curpos + distance);

      if (pos > 0) {
        pos = 0;
      } else if (pos < minp) {
        pos = minp;
      }

      return pos;
    }
    /**
     * Return the position in the style.
     *
     * @return {number} Position in the style.
     */

  }, {
    key: "_getDrawerPositionFromStyle",
    value: function _getDrawerPositionFromStyle() {
      var value = this._drawer.element.style[this._drawer.direction];
      return this._normalizeNumber(value).value;
    }
    /**
     * Return the opacity of the overlay.
     *
     * @param {number} position Moving position.
     * @return {number} Position of the drawer.
     */

  }, {
    key: "_getOverlayOpacityFromPosition",
    value: function _getOverlayOpacityFromPosition(position) {
      var minp = this._getMinPosition(this._drawer);

      var posRatio = 1 - Math.abs(position) / Math.abs(minp);
      return this._overlay.opacity * posRatio * 10000 / 10000;
    }
    /**
     * Return the opacity in the style.
     *
     * @return {number} Opacity in the style.
     */

  }, {
    key: "_getOverlayOpacityFromStyle",
    value: function _getOverlayOpacityFromStyle() {
      return parseFloat(this._overlay.element.style.opacity);
    }
    /**
     * Return the swipe range.
     *
     * @param {string|number} value Target swipe area value.
     * @return {Object} Drag range.
     * @throws {Error} Is thrown if direction value is invalid.
     */

  }, {
    key: "_getRange",
    value: function _getRange(value) {
      var basis = this._convertPixelAbs(value);

      var width = window.innerWidth;
      var height = window.innerHeight;

      switch (this._drawer.direction) {
        case 'top':
          return {
            from: {
              x: 0,
              y: 0
            },
            to: {
              x: width,
              y: basis
            }
          };

        case 'right':
          return {
            from: {
              x: basis,
              y: 0
            },
            to: {
              x: width,
              y: height
            }
          };

        case 'bottom':
          return {
            from: {
              x: 0,
              y: basis
            },
            to: {
              x: width,
              y: height
            }
          };

        case 'left':
          return {
            from: {
              x: 0,
              y: 0
            },
            to: {
              x: basis,
              y: height
            }
          };

        default:
          throw new Error("'".concat(this._drawer.direction, "' does not support"));
      }
    }
    /**
     * Return a value converted to the absolute value of the pixel.
     *
     * @param {string|number} value Target value.
     * @return {number} Converted to the absolute value of the pixel.
     * @throws {Error} Is thrown if direction value is invalid.
     */

  }, {
    key: "_convertPixelAbs",
    value: function _convertPixelAbs(value) {
      var nValue = this._normalizePixel(value);

      switch (this._drawer.direction) {
        case 'top':
        case 'left':
          return nValue;

        case 'right':
          return window.innerWidth - nValue;

        case 'bottom':
          return window.innerHeight - nValue;

        default:
          throw new Error("'".concat(this._drawer.direction, "' does not support"));
      }
    }
    /**
     * Return the normalized pixel value.
     *
     * @param {string|number} value Target value.
     * @return {number} Normalized pixel value.
     * @throws {Error} Is thrown if direction value is invalid.
     */

  }, {
    key: "_normalizePixel",
    value: function _normalizePixel(value) {
      var nValue = this._normalizeNumber(value);

      if (nValue.unit === 'number' || nValue.unit === 'pixel') {
        return nValue.value;
      } else if (nValue.unit === 'percent') {
        switch (this._drawer.direction) {
          case 'top':
          case 'bottom':
            return window.innerHeight * (nValue.value / 100);

          case 'right':
          case 'left':
            return window.innerWidth * (nValue.value / 100);

          default:
            throw new Error("'".concat(this._drawer.direction, "' does not support"));
        }
      }
    }
    /**
     * Return the numeric normalized information.
     *
     * @param {string|number} value Target value.
     * @return {Object} Numeric normalized information.
     * @throws {Error} Is thrown if value is invalid.
     */

  }, {
    key: "_normalizeNumber",
    value: function _normalizeNumber(value) {
      if (typeof value === 'number') {
        return {
          value: value,
          unit: 'number'
        };
      } else if (String(value).match(/^[.\-0-9]+$/)) {
        return {
          value: Number(value),
          unit: 'number'
        };
      } else if (value.match(/^[.\-0-9]+px$/)) {
        return {
          value: Number(value.replace(/px$/ig, '')),
          unit: 'pixel'
        };
      } else if (value.match(/[.\-0-9]+%$/)) {
        return {
          value: Number(value.replace(/%$/ig, '')),
          unit: 'percent'
        };
      }

      throw new Error("'".concat(value, "' does not support"));
    }
    /**
     * Return to the minimum position for the drawer.
     *
     * @return {number} Minimum position for the drawer.
     * @throws {Error} Is thrown if direction value is invalid.
     */

  }, {
    key: "_getMinPosition",
    value: function _getMinPosition() {
      switch (this._drawer.direction) {
        case 'top':
        case 'bottom':
          return -1 * this._drawer.element.offsetHeight;

        case 'right':
        case 'left':
          return -1 * this._drawer.element.offsetWidth;

        default:
          throw new Error("'".concat(this._drawer.direction, "' does not support"));
      }
    }
    /**
     * Return the distance of the drawer.
     *
     * @param {Object} moveInfo Movement information of the drawer.
     * @return {number} Distance of the drawer.
     * @throws {Error} Is thrown if direction value is invalid.
     */

  }, {
    key: "_getDistance",
    value: function _getDistance(moveInfo) {
      switch (this._drawer.direction) {
        case 'top':
          return moveInfo.y;

        case 'right':
          return -1 * moveInfo.x;

        case 'bottom':
          return -1 * moveInfo.y;

        case 'left':
          return moveInfo.x;

        default:
          throw new Error("'".concat(this._drawer.direction, "' does not support"));
      }
    }
    /**
     * Return the information of touch move.
     *
     * @param {Object} touchbasis Basic touch information.
     * @param {Object} touchlast Last touch information.
     * @return {Object} Movement distance of the x, y direction, movement direction.
     */

  }, {
    key: "_getTouchMoveInfo",
    value: function _getTouchMoveInfo(touchbasis, touchlast) {
      var x = touchlast.clientX - touchbasis.clientX;
      var y = touchlast.clientY - touchbasis.clientY;
      var axis = Math.abs(x) >= Math.abs(y) ? 'horizontal' : 'vertical';
      return {
        x: x,
        y: y,
        axis: axis
      };
    }
    /**
     * Return the information of touch move.
     *
     * @param {Promise} promise Promise instance.
     * @param {Object} callbacks Callback function with the key to 'done', 'fail', 'always' (each optional).
     * @return {Promise} Promise instance.
     */

  }, {
    key: "_handleCallback",
    value: function _handleCallback(promise, callbacks) {
      var _this9 = this;

      if (!callbacks) {
        return promise;
      }

      for (var _i = 0, _Object$keys = Object.keys(callbacks); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        var callback = callbacks[key];

        if (!callback) {
          continue;
        }

        var cb = Object(_util__WEBPACK_IMPORTED_MODULE_1__["isArray"])(callback) ? callback : [callback];
        var rcb = null;

        switch (key) {
          case 'done':
            rcb = function rcb(prom, value) {
              return prom.then(value.bind(_this9));
            };

            break;

          case 'fail':
            rcb = function rcb(prom, value) {
              return prom["catch"](value.bind(_this9));
            };

            break;

          case 'always':
            rcb = function rcb(prom, value) {
              return prom.then(value.bind(_this9), value.bind(_this9));
            };

            break;

          default:
            break;
        }

        if (rcb) {
          cb.reduce(rcb, promise);
        }
      }

      return promise;
    }
  }]);

  return Highendrawer;
}(); // module.exports = Highendrawer;




/***/ }),

/***/ "./src/support.js":
/*!************************!*\
  !*** ./src/support.js ***!
  \************************/
/*! exports provided: support */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "support", function() { return support; });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/helper.js");

/**
 * Browser support information.
 *
 * @type {Object}
 */

var sup = {};
sup.transform3d = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["hasStyle"])(['perspectiveProperty', 'webkitPerspective', 'mozPerspective', 'oPerspective', 'msPerspective']);
sup.transform = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["hasStyle"])(['transformProperty', 'webkitTransform', 'mozTransform', 'oTransform', 'msTransform']);
sup.transition = Object(_helper__WEBPACK_IMPORTED_MODULE_0__["hasStyle"])(['transitionProperty', 'webkitTransitionProperty', 'mozTransitionProperty', 'oTransitionProperty', 'msTransitionProperty']);
sup.cssAnim = (sup.transform3d || sup.transform) && sup.transition;
sup.transrate = sup.transform3d ? 'translate3d' : 'translate';
/**
 * Browser support information.
 *
 * @type {Object}
 */

var support = Object.freeze(sup);

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: ucFirst, isArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucFirst", function() { return ucFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/**
 * Convert the first letter to uppercase.
 *
 * @param {string} str Target character string.
 * @return {string} Converted string.
 */
function ucFirst(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}
/**
 * Whether or not the object is an array.
 *
 * @param {any} obj Target object.
 * @return {boolean} Returns true if object is an Array.
 */

function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=highendrawer.js.map