/*!
 * highendrawer - Highendrawer provides javascript and css drawers to your website and applications.
 * @version v0.0.8
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
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _const = __webpack_require__(1);
	
	var _util = __webpack_require__(2);
	
	var _helper = __webpack_require__(3);
	
	var helper = _interopRequireWildcard(_helper);
	
	var _support = __webpack_require__(4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class providing a drawer function.
	 *
	 * @public
	 * @class
	 * @example
	 * var drawer = new DrawerMenu({
	 *   element: document.getElementById('drawer')
	 * });
	 */
	var Highendrawer = function () {
	
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
	
	    this._id = helper.generateid();
	    this._drawer = _extends({}, _const.DEFAULT_DRAWER_PROPERTY, drawer);
	    this._overlay = this._drawer.overlay === false ? false : _extends({}, _const.DEFAULT_OVERLAY_PROPERTY, this._drawer.overlay);
	    this._timeoutid = null;
	    this._intervalid = null;
	    this._process = _extends({}, _const.DEFAULT_PROCESS);
	    this._enabled = false;
	    this._handler = this._getdrawerhandler();
	
	    if (this._drawer.enabledmaxwidth > -1) {
	      window.addEventListener('resize', function () {
	        if (_this._enabled && window.innerWidth > _this._drawer.enabledmaxwidth) {
	          _this.destroy();
	        } else if (!_this._enabled && window.innerWidth <= _this._drawer.enabledmaxwidth) {
	          _this.create();
	        }
	      });
	    }
	
	    if (window.history && window.history.pushState && this._drawer.history) {
	      window.history.replaceState({
	        id: this._id
	      }, null, null);
	    }
	
	    if (this._drawer.initcreate) {
	      this.create();
	    }
	  }
	
	  /**
	   * Create the drawer set.
	   *
	   * @public
	   */
	
	
	  _createClass(Highendrawer, [{
	    key: 'create',
	    value: function create() {
	      try {
	        this._createdrawer();
	        this._createoverlay();
	        this._enabled = true;
	
	        if (this._drawer.oncreate) {
	          this._drawer.oncreate.apply(this, [this._drawer]);
	        }
	      } catch (e) {
	        if (this._drawer && this._drawer.onerror && typeof this._drawer.onerror === 'function') {
	          this._drawer.onerror.apply(this, [e]);
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
	    key: 'destroy',
	    value: function destroy() {
	      try {
	        this._destroydrawer();
	        this._destroyoverlay();
	        this._enabled = false;
	
	        if (this._drawer.ondestroy) {
	          this._drawer.ondestroy.apply(this, [this._drawer]);
	        }
	      } catch (e) {
	        if (this._drawer && this._drawer.onerror && typeof this._drawer.onerror === 'function') {
	          this._drawer.onerror.apply(this, [e]);
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
	     * @param {boolean} [isfireevent] Whether to fire an event on the drawer.
	     * @param {boolean} [ischangehistory=false] Make a change in history.
	     * @return {Promise} Promise object for open.
	     */
	
	  }, {
	    key: 'open',
	    value: function open() {
	      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var isfireevent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var ischangehistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	      return this._changestate(0, duration, {
	        onchangestate: isfireevent ? this._drawer.onchangestate : null,
	        done: isfireevent ? this._drawer.onopen : null,
	        fail: isfireevent ? this._drawer.onerror : null
	      }, ischangehistory);
	    }
	
	    /**
	     * Close drawer.
	     *
	     * @public
	     * @param {number} [duration] Drawer moving time.
	     * @param {boolean} [isfireevent] Whether to fire an event on the drawer.
	     * @param {boolean} [ischangehistory=false] Make a change in history.
	     * @return {Promise} Promise object for close.
	     */
	
	  }, {
	    key: 'close',
	    value: function close() {
	      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var isfireevent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var ischangehistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	      return this._changestate(this._getminposition(), duration, {
	        onchangestate: isfireevent ? this._drawer.onchangestate : null,
	        done: isfireevent ? this._drawer.onclose : null,
	        fail: isfireevent ? this._drawer.onerror : null
	      }, ischangehistory);
	    }
	
	    /**
	     * Toggle drawer.
	     *
	     * @public
	     * @param {number} [duration] Drawer moving time.
	     * @param {boolean} [isfireevent] Whether to fire an event on the drawer.
	     * @param {boolean} [ischangehistory=false] Make a change in history.
	     * @return {Promise} Promise object for toggle.
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
	      var _this2 = this;
	
	      var isfireevent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	      var ischangehistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	      return new Promise(function (resolve, reject) {
	        try {
	          _this2[_this2.state === 'open' ? 'close' : 'open'](duration, isfireevent, ischangehistory).then(resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	      });
	    }
	
	    /**
	     * Create drawer.
	     */
	
	  }, {
	    key: '_createdrawer',
	    value: function _createdrawer() {
	      var _this3 = this;
	
	      helper.setstyle(this._drawer.element, _extends({}, _const.DRAWER_STYLE, _support.support.cssanim ? _const.TRANSITION_STYLE : {}));
	
	      this._resetdrawer();
	
	      Object.keys(this._handler).forEach(function (name) {
	        window.addEventListener(name, _this3._handler[name]);
	      });
	    }
	
	    /**
	     * Destroy drawer.
	     */
	
	  }, {
	    key: '_destroydrawer',
	    value: function _destroydrawer() {
	      var _this4 = this;
	
	      Object.keys(this._handler).forEach(function (name) {
	        window.removeEventListener(name, _this4._handler[name]);
	      });
	
	      this._resetdrawer(true);
	
	      helper.unsetstyle(this._drawer.element, Object.keys(_extends({}, _const.DRAWER_STYLE, _support.support.cssanim ? _const.TRANSITION_STYLE : {})));
	    }
	
	    /**
	     * Create overlay.
	     */
	
	  }, {
	    key: '_createoverlay',
	    value: function _createoverlay() {
	      var _this5 = this;
	
	      if (this._overlay === false) {
	        return;
	      }
	
	      if (this._overlay.zindex === -1) {
	        this._overlay.zindex = this._drawer.zindex - 1;
	      }
	
	      if (!this._overlay.element) {
	        this._overlay.element = window.document.createElement('div');
	        this._overlay.isautocreated = true;
	
	        helper.setstyle(this._overlay.element, _extends({}, _const.OVERLAY_STYLE, _support.support.cssanim ? _const.TRANSITION_STYLE : {}));
	      }
	
	      if (!this._overlay.touchhandler) {
	        this._overlay.touchhandler = function (e) {
	          _this5.close();
	        };
	      }
	
	      window.document.body.appendChild(this._overlay.element);
	    }
	
	    /**
	     * Destroy overlay.
	     */
	
	  }, {
	    key: '_destroyoverlay',
	    value: function _destroyoverlay() {
	      if (this._overlay === false) {
	        return;
	      }
	
	      if (this._overlay.element) {
	        this._overlay.element.removeEventListener('click', this._overlay.touchhandler);
	
	        if (this._overlay.isautocreated) {
	          this._overlay.element.parentNode.removeChild(this._overlay.element);
	        }
	      }
	    }
	
	    /**
	     * Reset drawer.
	     *
	     * @param {boolean} [isunset] Unset style.
	     */
	
	  }, {
	    key: '_resetdrawer',
	    value: function _resetdrawer() {
	      var isunset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	
	      try {
	        this._setprops();
	
	        var ims = this._getinitdrawerstyle();
	
	        if (isunset) {
	          helper.unsetstyle(this._drawer.element, Object.keys(ims));
	        } else {
	          helper.setstyle(this._drawer.element, ims);
	        }
	      } catch (e) {
	        if (this._drawer.onerror && typeof this._drawer.onerror === 'function') {
	          this._drawer.onerror.apply(this, [e]);
	        } else {
	          throw e;
	        }
	      }
	    }
	
	    /**
	     * Show drawer.
	     */
	
	  }, {
	    key: '_showdrawer',
	    value: function _showdrawer() {
	      helper.setstyle(this._drawer.element, {
	        zIndex: this._drawer.zindex,
	        display: 'block'
	      });
	    }
	
	    /**
	     * Hide drawer.
	     */
	
	  }, {
	    key: '_hidedrawer',
	    value: function _hidedrawer() {
	      helper.setstyle(this._drawer.element, {
	        zIndex: -1,
	        display: 'none'
	      });
	    }
	
	    /**
	     * Show overlay.
	     */
	
	  }, {
	    key: '_showoverlay',
	    value: function _showoverlay() {
	      helper.setstyle(this._overlay.element, {
	        zIndex: this._overlay.zindex,
	        display: 'block'
	      });
	    }
	
	    /**
	     * Hide overlay.
	     */
	
	  }, {
	    key: '_hideoverlay',
	    value: function _hideoverlay() {
	      helper.setstyle(this._overlay.element, {
	        zIndex: -1,
	        display: 'none'
	      });
	    }
	
	    /**
	     * Set properties.
	     */
	
	  }, {
	    key: '_setprops',
	    value: function _setprops() {
	      // set sizepixel
	      var sizepixel = this._normalizepixel(this._drawer.size);
	
	      if (this._drawer.maxsize && this._drawer.maxsize !== -1) {
	        var maxsizepixel = this._normalizepixel(this._drawer.maxsize);
	
	        if (sizepixel > maxsizepixel) {
	          sizepixel = maxsizepixel;
	        }
	      }
	
	      this._sizepixel = sizepixel;
	
	      // set position
	      this._position = typeof this._position === 'undefined' ? null : this._position;
	    }
	
	    /**
	     * Return initial style of drawer.
	     *
	     * @return {Object} Style for drawer.
	     */
	
	  }, {
	    key: '_getinitdrawerstyle',
	    value: function _getinitdrawerstyle() {
	      var style = null;
	
	      switch (this._drawer.direction) {
	        case 'top':
	          style = {
	            width: '100%',
	            height: this._sizepixel + 'px',
	            top: '-' + this._sizepixel + 'px',
	            right: 'auto',
	            bottom: 'auto',
	            left: 0
	          };
	          break;
	        case 'right':
	          style = {
	            width: this._sizepixel + 'px',
	            height: '100%',
	            top: 0,
	            right: '-' + this._sizepixel + 'px',
	            bottom: 'auto',
	            left: 'auto'
	          };
	          break;
	        case 'bottom':
	          style = {
	            width: '100%',
	            height: this._sizepixel + 'px',
	            top: 'auto',
	            right: 'auto',
	            bottom: '-' + this._sizepixel + 'px',
	            left: 0
	          };
	          break;
	        case 'left':
	          style = {
	            width: this._sizepixel + 'px',
	            height: '100%',
	            top: 0,
	            right: 'auto',
	            bottom: 'auto',
	            left: '-' + this._sizepixel + 'px'
	          };
	          break;
	        default:
	          throw new Error('\'' + this._drawer.direction + '\' does not support');
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
	    key: '_getdrawerstyle',
	    value: function _getdrawerstyle(position) {
	      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      var minp = this._getminposition(this._drawer);
	      var style = {};
	
	      if (_support.support.cssanim) {
	        style.transitionDuration = (duration === null ? this._drawer.duration : duration) + 'ms';
	
	        switch (this._drawer.direction) {
	          case 'top':
	            style.transform = _support.support.transrate + '(0,' + -(minp - position) + 'px,0)';
	            break;
	          case 'right':
	            style.transform = _support.support.transrate + '(' + (minp - position) + 'px,0,0)';
	            break;
	          case 'bottom':
	            style.transform = _support.support.transrate + '(0,' + (minp - position) + 'px,0)';
	            break;
	          case 'left':
	            style.transform = _support.support.transrate + '(' + -(minp - position) + 'px,0,0)';
	            break;
	          default:
	            throw new Error('\'' + this._drawer.direction + '\' does not support');
	        }
	      } else {
	        style[this._drawer.direction] = position + 'px';
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
	    key: '_getoverlaystyle',
	    value: function _getoverlaystyle(opacity) {
	      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      var style = {
	        opacity: opacity
	      };
	
	      if (_support.support.cssanim) {
	        style.transitionDuration = (duration === null ? this._drawer.duration : duration) + 'ms';
	      }
	
	      return style;
	    }
	
	    /**
	     * Make animation with CSS3.
	     *
	     * @param {number} duration Drawer moving time.
	     */
	
	  }, {
	    key: '_cssanimate',
	    value: function _cssanimate(duration) {
	      helper.setstyle(this._overlay.element, this._getoverlaystyle(this._getoverlayopacityfromposition(this._position), duration));
	
	      helper.setstyle(this._drawer.element, this._getdrawerstyle(this._position, duration));
	    }
	
	    /**
	     * Make animation with Javascript.
	     *
	     * @param {number} duration Drawer moving time.
	     */
	
	  }, {
	    key: '_jsanimate',
	    value: function _jsanimate(duration) {
	      var _this6 = this;
	
	      var start = +new Date();
	      var fromopy = this._getoverlayopacityfromstyle();
	      var toopy = this._getoverlayopacityfromposition(this._position);
	      var frompos = this._getdrawerpositionfromstyle();
	      var topos = this._position;
	
	      if (this._intervalid) {
	        clearInterval(this._intervalid);
	      }
	
	      this._intervalid = setInterval(function () {
	        var time = new Date() - start;
	        var nowpos = null;
	        var nowopy = null;
	
	        if (time > duration) {
	          clearInterval(_this6._intervalid);
	          _this6._intervalid = null;
	          nowopy = toopy;
	          nowpos = topos;
	        } else {
	          var prp = (time /= duration) * (time - 2);
	          nowopy = fromopy - (toopy - fromopy) * prp;
	          nowpos = frompos - (topos - frompos) * prp;
	        }
	
	        helper.setstyle(_this6._overlay.element, _this6._getoverlaystyle(nowopy, duration));
	
	        helper.setstyle(_this6._drawer.element, _this6._getdrawerstyle(nowpos, duration));
	      }, 10);
	    }
	
	    /**
	     * Return state by touch movement.
	     *
	     * @return {string} State by touch movement.
	     */
	
	  }, {
	    key: '_gettouchmovestate',
	    value: function _gettouchmovestate() {
	      if (this._process.time.end - this._process.time.start <= 300) {
	        var len = this._process.touches.length;
	        var moveinfo = this._gettouchmoveinfo(this._process.touches[len - 2], this._process.touches[len - 1]);
	        var vertical = moveinfo.axis === 'vertical';
	        var horizontal = moveinfo.axis === 'horizontal';
	        var top = this._drawer.direction === 'top' && moveinfo.y >= 0;
	        var right = this._drawer.direction === 'right' && moveinfo.x < 0;
	        var bottom = this._drawer.direction === 'bottom' && moveinfo.y < 0;
	        var left = this._drawer.direction === 'left' && moveinfo.x >= 0;
	
	        return vertical && (bottom || top) || horizontal && (right || left) ? 'open' : 'close';
	      }
	
	      return this._getstatefromposition();
	    }
	
	    /**
	     * Return drawer event handler.
	     *
	     * @return {Object} Drawer event handler.
	     */
	
	  }, {
	    key: '_getdrawerhandler',
	    value: function _getdrawerhandler() {
	      var _this7 = this;
	
	      var handler = {};
	
	      handler.resize = function () {
	        _this7._resetdrawer();
	        _this7[_this7.state](0, false, false);
	
	        if (_this7._drawer.onresize) {
	          _this7._drawer.onresize.apply(_this7, [_this7._drawer]);
	        }
	      };
	
	      if (this._drawer.swipeable) {
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = _const.TOUCH_EVENTS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var event = _step.value;
	
	            handler[event] = this._touchhandler.bind(this);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
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
	    key: '_touchhandler',
	    value: function _touchhandler(ev) {
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
	            this._ontouchstart(ev);
	            break;
	          case 'touchmove':
	            this._ontouchmove(ev);
	            break;
	          case 'touchcancel':
	          case 'touchend':
	            this._ontouchfinish(ev);
	            break;
	          default:
	            break;
	        }
	      } catch (e) {
	        if (this._drawer.onerror && typeof this._drawer.onerror === 'function') {
	          this._drawer.onerror.apply(this, [e]);
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
	    key: '_ontouchstart',
	    value: function _ontouchstart(ev) {
	      this._process.time.start = new Date().getTime();
	    }
	
	    /**
	     * Touch move event handler.
	     *
	     * @param {Event} ev Touch event object.
	     */
	
	  }, {
	    key: '_ontouchmove',
	    value: function _ontouchmove(ev) {
	      var len = this._process.touches.length;
	      var isfiretouchstart = false;
	
	      if (!this._process.istouchactive && len >= 2) {
	        this._process.istouchactive = this._istouchactive();
	
	        if (this._process.istouchactive) {
	          this._showoverlay();
	          this._showdrawer();
	
	          if (this._drawer.ontouchstart) {
	            isfiretouchstart = true;
	          }
	        }
	      }
	
	      if (this._process.istouchactive) {
	        ev.stopPropagation();
	        ev.preventDefault();
	
	        this._position = this._getdrawerpositionfromtouches(this._process.touches[len - 2], this._process.touches[len - 1]);
	
	        if (isfiretouchstart) {
	          this._drawer.ontouchstart.apply(this, [this._drawer, this._position]);
	        }
	
	        helper.setstyle(this._overlay.element, this._getoverlaystyle(this._getoverlayopacityfromposition(this._position), 0));
	
	        helper.setstyle(this._drawer.element, this._getdrawerstyle(this._position, 0));
	
	        if (this._drawer.ontouchmove) {
	          this._drawer.ontouchmove.apply(this, [this._drawer, this._position]);
	        }
	      }
	    }
	
	    /**
	     * Touch finish event handler.
	     *
	     * @param {Event} ev Touch event object.
	     */
	
	  }, {
	    key: '_ontouchfinish',
	    value: function _ontouchfinish(ev) {
	      var len = this._process.touches.length;
	
	      if (this._process.istouchactive && len >= 2) {
	        this._process.time.end = new Date().getTime();
	
	        var state = this._gettouchmovestate();
	        var changestate = this.state !== state;
	
	        this[state](null, changestate, changestate);
	
	        if (this._drawer.ontouchfinish) {
	          this._drawer.ontouchfinish.apply(this, [this._drawer, this._getdrawerpositionfromtouches(this._process.touches[len - 2], this._process.touches[len - 1])]);
	        }
	      }
	
	      this._process.touches = [];
	      this._process.istouchactive = false;
	      this._process.time.start = 0;
	      this._process.time.end = 0;
	    }
	
	    /**
	     * Return whether or not a valid touch.
	     *
	     * @param {number} position Moving position.
	     * @param {number} [duration=null] Drawer moving time.
	     * @param {Object} [callbacks=null] Callback objects.
	     * @param {boolean} [ischangehistory=false] Make a change in history.
	     * @return {Promise} Promise object.
	     */
	
	  }, {
	    key: '_changestate',
	    value: function _changestate(position) {
	      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	      var _this8 = this;
	
	      var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
	      var ischangehistory = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
	      return this._handlecallback(new Promise(function (resolve, reject) {
	        try {
	          (function () {
	            _this8._position = position;
	
	            var du = duration === null ? _this8._drawer.duration : duration;
	
	            if (_this8._timeoutid !== null) {
	              clearTimeout(_this8._timeoutid);
	              _this8._timeoutid = null;
	            }
	
	            var state = _this8._getstatefromposition();
	
	            if (state === 'open') {
	              _this8._showoverlay();
	              _this8._showdrawer();
	            } else {
	              _this8._overlay.element.removeEventListener('click', _this8._overlay.touchhandler);
	            }
	
	            if (ischangehistory && _this8._drawer.history && window.history && window.history.pushState) {
	              if (state === 'open') {
	                window.history.pushState({
	                  id: _this8._id
	                }, null, null);
	              } else {
	                window.history.back();
	              }
	            }
	
	            _this8[_support.support.cssanim ? '_cssanimate' : '_jsanimate'](du);
	
	            _this8._timeoutid = setTimeout(function () {
	              if (state === 'open') {
	                _this8._overlay.element.addEventListener('click', _this8._overlay.touchhandler);
	              } else {
	                _this8._hidedrawer();
	                _this8._hideoverlay();
	              }
	
	              _this8._timeoutid = null;
	            }, du);
	
	            _this8.state = state;
	
	            if ((typeof callbacks === 'undefined' ? 'undefined' : _typeof(callbacks)) === 'object' && callbacks.onchangestate) {
	              callbacks.onchangestate.apply(_this8, [_this8._drawer, state]);
	            }
	
	            resolve.apply(_this8, [_this8._drawer]);
	          })();
	        } catch (e) {
	          reject(e);
	        }
	      }), {
	        done: (typeof callbacks === 'undefined' ? 'undefined' : _typeof(callbacks)) === 'object' && callbacks.done ? callbacks.done : null,
	        fail: (typeof callbacks === 'undefined' ? 'undefined' : _typeof(callbacks)) === 'object' && callbacks.fail ? callbacks.fail : null
	      });
	    }
	
	    /**
	     * Return whether or not a valid touch.
	     *
	     * @return {boolean} Result of valid touch.
	     */
	
	  }, {
	    key: '_istouchactive',
	    value: function _istouchactive() {
	      var rg = this._getrange(this.state === 'open' ? this._sizepixel : this._drawer.swipearea);
	
	      if (!(rg.from.x <= this._process.touches[0].clientX && this._process.touches[0].clientX <= rg.to.x && rg.from.y <= this._process.touches[0].clientY && this._process.touches[0].clientY <= rg.to.y)) {
	        return false;
	      }
	
	      var len = this._process.touches.length;
	      var moveinfo = this._gettouchmoveinfo(this._process.touches[len - 2], this._process.touches[len - 1]);
	      var vertical = moveinfo.axis === 'vertical';
	      var horizontal = moveinfo.axis === 'horizontal';
	
	      if (!(vertical && (this._drawer.direction === 'top' || this._drawer.direction === 'bottom') || horizontal && (this._drawer.direction === 'right' || this._drawer.direction === 'left'))) {
	        return false;
	      }
	
	      return this.state === 'open' && (this._drawer.direction === 'top' && moveinfo.y < 0 || this._drawer.direction === 'right' && moveinfo.x >= 0 || this._drawer.direction === 'bottom' && moveinfo.y >= 0 || this._drawer.direction === 'left' && moveinfo.x < 0) || this.state === 'close' && (this._drawer.direction === 'top' && moveinfo.y >= 0 || this._drawer.direction === 'right' && moveinfo.x < 0 || this._drawer.direction === 'bottom' && moveinfo.y < 0 || this._drawer.direction === 'left' && moveinfo.x >= 0);
	    }
	
	    /**
	     * Return the state of the drawer.
	     *
	     * @return {string} State of the drawer.
	     */
	
	  }, {
	    key: '_getstatefromposition',
	    value: function _getstatefromposition() {
	      var pos = this._position === null ? this._getdrawerpositionfromstyle() : this._position;
	
	      return Math.abs(pos) < this._sizepixel / 2 ? 'open' : 'close';
	    }
	
	    /**
	     * Return the position of the drawer.
	     *
	     * @param {Object} touchbasis Basic touch information.
	     * @param {Object} touchlast Last touch information.
	     * @return {number} Position of the drawer.
	     */
	
	  }, {
	    key: '_getdrawerpositionfromtouches',
	    value: function _getdrawerpositionfromtouches(touchbasis, touchlast) {
	      var distance = this._getdistance(this._gettouchmoveinfo(touchbasis, touchlast));
	
	      var curpos = this._position === null ? this._getdrawerpositionfromstyle() : this._position;
	
	      var pos = Math.round(curpos + distance);
	      var minp = this._getminposition(this._drawer);
	
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
	    key: '_getdrawerpositionfromstyle',
	    value: function _getdrawerpositionfromstyle() {
	      var value = this._drawer.element.style[this._drawer.direction];
	      return this._normalizenumber(value).value;
	    }
	
	    /**
	     * Return the opacity of the overlay.
	     *
	     * @param {number} position Moving position.
	     * @return {number} Position of the drawer.
	     */
	
	  }, {
	    key: '_getoverlayopacityfromposition',
	    value: function _getoverlayopacityfromposition(position) {
	      var minp = this._getminposition(this._drawer);
	      var posratio = 1 - Math.abs(position) / Math.abs(minp);
	      return this._overlay.opacity * posratio * 10000 / 10000;
	    }
	
	    /**
	     * Return the opacity in the style.
	     *
	     * @return {number} Opacity in the style.
	     */
	
	  }, {
	    key: '_getoverlayopacityfromstyle',
	    value: function _getoverlayopacityfromstyle() {
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
	    key: '_getrange',
	    value: function _getrange(value) {
	      var basis = this._convertpixelabs(value);
	      var width = window.innerWidth;
	      var height = window.innerHeight;
	
	      switch (this._drawer.direction) {
	        case 'top':
	          return { from: { x: 0, y: 0 }, to: { x: width, y: basis } };
	        case 'right':
	          return { from: { x: basis, y: 0 }, to: { x: width, y: height } };
	        case 'bottom':
	          return { from: { x: 0, y: basis }, to: { x: width, y: height } };
	        case 'left':
	          return { from: { x: 0, y: 0 }, to: { x: basis, y: height } };
	        default:
	          throw new Error('\'' + this._drawer.direction + '\' does not support');
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
	    key: '_convertpixelabs',
	    value: function _convertpixelabs(value) {
	      var nvalue = this._normalizepixel(value);
	
	      switch (this._drawer.direction) {
	        case 'top':
	        case 'left':
	          return nvalue;
	        case 'right':
	          return window.innerWidth - nvalue;
	        case 'bottom':
	          return window.innerHeight - nvalue;
	        default:
	          throw new Error('\'' + this._drawer.direction + '\' does not support');
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
	    key: '_normalizepixel',
	    value: function _normalizepixel(value) {
	      var normalized = this._normalizenumber(value);
	
	      if (normalized.unit === 'number' || normalized.unit === 'pixel') {
	        return normalized.value;
	      } else if (normalized.unit === 'percent') {
	        switch (this._drawer.direction) {
	          case 'top':
	          case 'bottom':
	            return window.innerHeight * (normalized.value / 100);
	          case 'right':
	          case 'left':
	            return window.innerWidth * (normalized.value / 100);
	          default:
	            throw new Error('\'' + this._drawer.direction + '\' does not support');
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
	    key: '_normalizenumber',
	    value: function _normalizenumber(value) {
	      if (typeof value === 'number') {
	        return { value: value, unit: 'number' };
	      } else if (String(value).match(/^[.\-0-9]+$/)) {
	        return { value: Number(value), unit: 'number' };
	      } else if (value.match(/^[.\-0-9]+px$/)) {
	        return { value: Number(value.replace(/px$/ig, '')), unit: 'pixel' };
	      } else if (value.match(/[.\-0-9]+%$/)) {
	        return { value: Number(value.replace(/%$/ig, '')), unit: 'percent' };
	      }
	
	      throw new Error('\'' + value + '\' does not support');
	    }
	
	    /**
	     * Return to the minimum position for the drawer.
	     *
	     * @return {number} Minimum position for the drawer.
	     * @throws {Error} Is thrown if direction value is invalid.
	     */
	
	  }, {
	    key: '_getminposition',
	    value: function _getminposition() {
	      switch (this._drawer.direction) {
	        case 'top':
	        case 'bottom':
	          return -1 * this._drawer.element.offsetHeight;
	        case 'right':
	        case 'left':
	          return -1 * this._drawer.element.offsetWidth;
	        default:
	          throw new Error('\'' + this._drawer.direction + '\' does not support');
	      }
	    }
	
	    /**
	     * Return the distance of the drawer.
	     *
	     * @param {Object} moveinfo Movement information of the drawer.
	     * @return {number} Distance of the drawer.
	     * @throws {Error} Is thrown if direction value is invalid.
	     */
	
	  }, {
	    key: '_getdistance',
	    value: function _getdistance(moveinfo) {
	      switch (this._drawer.direction) {
	        case 'top':
	          return moveinfo.y;
	        case 'right':
	          return -1 * moveinfo.x;
	        case 'bottom':
	          return -1 * moveinfo.y;
	        case 'left':
	          return moveinfo.x;
	        default:
	          throw new Error('\'' + this._drawer.direction + '\' does not support');
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
	    key: '_gettouchmoveinfo',
	    value: function _gettouchmoveinfo(touchbasis, touchlast) {
	      var x = touchlast.clientX - touchbasis.clientX;
	      var y = touchlast.clientY - touchbasis.clientY;
	      var axis = Math.abs(x) >= Math.abs(y) ? 'horizontal' : 'vertical';
	
	      return { x: x, y: y, axis: axis };
	    }
	
	    /**
	     * Return the information of touch move.
	     *
	     * @param {Promise} promise Promise instance.
	     * @param {Object} callbacks Callback function with the key to 'done', 'fail', 'always' (each optional).
	     * @return {Promise} Promise instance.
	     */
	
	  }, {
	    key: '_handlecallback',
	    value: function _handlecallback(promise, callbacks) {
	      var _this9 = this;
	
	      if (!callbacks) {
	        return promise;
	      }
	
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = Object.keys(callbacks)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var key = _step2.value;
	
	          var callback = callbacks[key];
	
	          if (!callback) {
	            continue;
	          }
	
	          var cb = (0, _util.isarray)(callback) ? callback : [callback];
	          var rcb = null;
	
	          switch (key) {
	            case 'done':
	              rcb = function rcb(prom, value) {
	                return prom.then(value.bind(_this9));
	              };
	              break;
	            case 'fail':
	              rcb = function rcb(prom, value) {
	                return prom.catch(value.bind(_this9));
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
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	
	      return promise;
	    }
	  }]);
	
	  return Highendrawer;
	}();
	
	exports.default = Highendrawer;
	
	
	module.exports = Highendrawer;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Vendor prefix list.
	 *
	 * @type {string[]}
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PREFIX = exports.PREFIX = ['webkit', 'moz', 'o', 'ms'];
	
	/**
	 * Drawer's default css style.
	 *
	 * @type {Object}
	 */
	var DRAWER_STYLE = exports.DRAWER_STYLE = Object.freeze({
	  display: 'none',
	  position: 'fixed',
	  overflowX: 'hidden',
	  overflowY: 'auto',
	  zIndex: -1,
	  webkitOverflowScrolling: 'touch'
	});
	
	/**
	 * Overlay's default css style.
	 *
	 * @type {Object}
	 */
	var OVERLAY_STYLE = exports.OVERLAY_STYLE = Object.freeze({
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
	var TRANSITION_STYLE = exports.TRANSITION_STYLE = Object.freeze({
	  transform: '',
	  transitionProperty: 'transform,opacity',
	  transitionTimingFunction: 'cubic-bezier(0,0,0.25,1)',
	  transitionDuration: '0ms'
	});
	
	/**
	 * Default drawer property.
	 *
	 * @type {Drawer}
	 */
	var DEFAULT_DRAWER_PROPERTY = exports.DEFAULT_DRAWER_PROPERTY = Object.freeze({
	  element: null,
	  direction: 'right',
	  size: '80%',
	  maxsize: -1,
	  swipeable: true,
	  swipearea: 5,
	  duration: 300,
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
	  onerror: null
	});
	
	/**
	 * Default overlay property.
	 *
	 * @type {Overlay}
	 */
	var DEFAULT_OVERLAY_PROPERTY = exports.DEFAULT_OVERLAY_PROPERTY = Object.freeze({
	  element: null,
	  opacity: 0.2,
	  zindex: -1,
	  autocreate: false
	});
	
	/**
	 * Default processing state object.
	 *
	 * @type {Object}
	 */
	var DEFAULT_PROCESS = exports.DEFAULT_PROCESS = Object.freeze({
	  touches: [],
	  istouchactive: false,
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
	var TOUCH_EVENTS = exports.TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Convert the first letter to uppercase.
	 *
	 * @param {string} str Target character string.
	 * @return {string} Converted string.
	 */
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ucfirst = ucfirst;
	exports.isarray = isarray;
	function ucfirst(str) {
	  return str.charAt(0).toUpperCase() + str.substr(1);
	}
	
	/**
	 * Whether or not the object is an array.
	 *
	 * @param {any} obj Target object.
	 * @return {boolean} Returns true if object is an Array.
	 */
	function isarray(obj) {
	  return Object.prototype.toString.call(obj) === '[object Array]';
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.generateid = generateid;
	exports.hasstyle = hasstyle;
	exports.setstyle = setstyle;
	exports.unsetstyle = unsetstyle;
	
	var _const = __webpack_require__(1);
	
	var _util = __webpack_require__(2);
	
	var dom = window.document.createElement('div');
	
	var currentid = 0;
	var validstylename = {};
	
	/**
	 * Generate ID.
	 *
	 * @return {number} ID.
	 */
	function generateid() {
	  return ++currentid;
	}
	
	/**
	 * Verify that the style is present.
	 *
	 * @param {string[]|string} styles Css styles.
	 * @return {boolean} Result of verification.
	 */
	function hasstyle(styles) {
	  var ss = styles;
	
	  if (!(0, _util.isarray)(styles)) {
	    ss = [styles];
	  }
	
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
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
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
	function setstyle(element, style) {
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = Object.keys(style)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var name = _step2.value;
	
	      var vsn = validstylename[name];
	
	      if (vsn) {
	        element.style[vsn] = style[name];
	      } else if (typeof element.style[name] === 'undefined') {
	        for (var i = 0; i < 2; i++) {
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;
	
	          try {
	            for (var _iterator3 = _const.PREFIX[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              var pfx = _step3.value;
	
	              var namewithprefix = (i === 0 ? pfx : (0, _util.ucfirst)(pfx)) + (0, _util.ucfirst)(name);
	
	              if (typeof element.style[namewithprefix] !== 'undefined') {
	                validstylename[name] = namewithprefix;
	                element.style[namewithprefix] = style[name];
	                break;
	              }
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }
	        }
	      } else {
	        validstylename[name] = name;
	        element.style[name] = style[name];
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	}
	
	/**
	 * Unset the CSS style to element.
	 *
	 * @param {Object} element Target element object.
	 * @param {string[]|string} styles Css styles.
	 */
	function unsetstyle(element, styles) {
	  var style = {};
	
	  var _iteratorNormalCompletion4 = true;
	  var _didIteratorError4 = false;
	  var _iteratorError4 = undefined;
	
	  try {
	    for (var _iterator4 = ((0, _util.isarray)(styles) ? styles : [styles])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	      var name = _step4.value;
	
	      style[name] = '';
	    }
	  } catch (err) {
	    _didIteratorError4 = true;
	    _iteratorError4 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion4 && _iterator4.return) {
	        _iterator4.return();
	      }
	    } finally {
	      if (_didIteratorError4) {
	        throw _iteratorError4;
	      }
	    }
	  }
	
	  setstyle(element, style);
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.support = undefined;
	
	var _helper = __webpack_require__(3);
	
	/**
	 * Browser support information.
	 *
	 * @type {Object}
	 */
	var sup = {};
	
	sup.transform3d = (0, _helper.hasstyle)(['perspectiveProperty', 'webkitPerspective', 'mozPerspective', 'oPerspective', 'msPerspective']);
	
	sup.transform = (0, _helper.hasstyle)(['transformProperty', 'webkitTransform', 'mozTransform', 'oTransform', 'msTransform']);
	
	sup.transition = (0, _helper.hasstyle)(['transitionProperty', 'webkitTransitionProperty', 'mozTransitionProperty', 'oTransitionProperty', 'msTransitionProperty']);
	
	sup.cssanim = (sup.transform3d || sup.transform) && sup.transition;
	
	sup.transrate = sup.transform3d ? 'translate3d' : 'translate';
	
	/**
	 * Browser support information.
	 *
	 * @type {Object}
	 */
	var support = exports.support = Object.freeze(sup);

/***/ }
/******/ ])
});
;
//# sourceMappingURL=highendrawer.js.map