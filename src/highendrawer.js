import {
  DEFAULT_DRAWER_PROPERTY,
  DEFAULT_OVERLAY_PROPERTY,
  DEFAULT_PROCESS,
  DRAWER_STYLE,
  OVERLAY_STYLE,
  TOUCH_EVENTS,
  TRANSITION_STYLE,
} from './const';

import {isArray} from './util';
import * as helper from './helper';
import {support} from './support';

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
export default class Highendrawer {
  /**
   * Initialize object.
   *
   * @constructor
   * @param {Drawer} drawer Initial parameters of drawer.
   */
  constructor(drawer) {
    /**
     * Drawer status ('open' or 'close')
     *
     * @public
     * @type {string}
     */
    this.state = 'close';

    this._id = helper.generateId();
    this._drawer = Object.assign({}, DEFAULT_DRAWER_PROPERTY, drawer);
    this._overlay = this._drawer.overlay === false ?
      false :
      Object.assign({}, DEFAULT_OVERLAY_PROPERTY, this._drawer.overlay);
    this._timeoutId = null;
    this._intervalId = null;
    this._process = Object.assign({}, DEFAULT_PROCESS);
    this._enabled = false;
    this._handler = this._getDrawerHandler();

    if (!this._drawer.element) {
      throw new Error(`'element' is required.`);
    }

    if (!helper.isHTMLElement(this._drawer.element)) {
      throw new Error(`Invalid HTMLElement specified for 'element'.`);
    }

    if (this._drawer.enabledMaxWidth > -1) {
      helper.addEventListenerWithOptions(window, 'resize', () => {
        if (this._enabled &&
          window.innerWidth > this._drawer.enabledMaxWidth) {
          this.destroy();
        } else if (!this._enabled &&
          window.innerWidth <= this._drawer.enabledMaxWidth) {
          this.create();
        }
      });
    }

    if (window.history &&
      window.history.pushState &&
      this._drawer.history
    ) {
      window.history.replaceState({
        id: this._id,
      }, null, null);
    }

    if (this._drawer.initCreate &&
      (this._drawer.enabledMaxWidth < 0 ||
        window.innerWidth <= this._drawer.enabledMaxWidth)
    ) {
      this.create();
    }
  }

  /**
   * Create the drawer set.
   *
   * @public
   */
  create() {
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
  destroy() {
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
  open(duration = null, isFireEvent = true, isChangeHistory = true) {
    return this._changeState(
        0,
        duration,
        {
          onChangeState: isFireEvent ? this._drawer.onChangeState : null,
          done: isFireEvent ? this._drawer.onOpen : null,
          fail: isFireEvent ? this._drawer.onError : null,
        },
        isChangeHistory
    );
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
  close(duration = null, isFireEvent = true, isChangeHistory = true) {
    return this._changeState(
        this._getMinPosition(),
        duration,
        {
          onChangeState: isFireEvent ? this._drawer.onChangeState : null,
          done: isFireEvent ? this._drawer.onClose : null,
          fail: isFireEvent ? this._drawer.onError : null,
        },
        isChangeHistory
    );
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
  toggle(duration = null, isFireEvent = true, isChangeHistory = true) {
    return new Promise((resolve, reject) => {
      try {
        this[this.state === 'open' ? 'close' : 'open'](duration, isFireEvent, isChangeHistory)
            .then(resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Create drawer.
   */
  _createDrawer() {
    helper.setStyle(
        this._drawer.element,
        Object.assign(
            {},
            DRAWER_STYLE,
        support.cssAnim ? TRANSITION_STYLE : {}
        )
    );

    this._resetDrawer();

    Object.keys(this._handler).forEach((name) => {
      helper.addEventListenerWithOptions(window, name, this._handler[name], {
        passive: name !== 'touchmove',
      });
    });
  }

  /**
   * Destroy drawer.
   */
  _destroyDrawer() {
    Object.keys(this._handler).forEach((name) => {
      window.removeEventListener(name, this._handler[name]);
    });

    this._resetDrawer(true);

    helper.unsetStyle(
        this._drawer.element,
        Object.keys(
            Object.assign(
                {},
                DRAWER_STYLE,
          support.cssAnim ? TRANSITION_STYLE : {}
            )
        )
    );
  }

  /**
   * Create overlay.
   */
  _createOverlay() {
    if (this._overlay === false) {
      return;
    }

    if (this._overlay.zIndex === -1) {
      this._overlay.zIndex = this._drawer.zIndex - 1;
    }

    if (!this._overlay.element) {
      this._overlay.element = window.document.createElement('div');
      this._overlay.autoCreated = true;

      helper.setStyle(
          this._overlay.element,
          Object.assign(
              {},
              OVERLAY_STYLE,
          support.cssAnim ? TRANSITION_STYLE : {}
          )
      );
    }

    if (!this._overlay.touchHandler) {
      this._overlay.touchHandler = (e) => {
        this.close();
      };
    }

    window.document.body.appendChild(this._overlay.element);
  }

  /**
   * Destroy overlay.
   */
  _destroyOverlay() {
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
  _resetDrawer(isUnset = false) {
    try {
      this._setProps();

      const ims = this._getInitDrawerStyle();

      if (isUnset) {
        helper.unsetStyle(this._drawer.element, Object.keys(ims));
      } else {
        helper.setStyle(this._drawer.element, ims);
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
  _showDrawer() {
    helper.setStyle(this._drawer.element, {
      zIndex: this._drawer.zIndex,
      opacity: 1,
    });
  }

  /**
   * Hide drawer.
   */
  _hideDrawer() {
    helper.setStyle(this._drawer.element, {
      zIndex: -1,
      opacity: 0,
    });
  }

  /**
   * Show overlay.
   */
  _showOverlay() {
    helper.setStyle(this._overlay.element, {
      zIndex: this._overlay.zIndex,
      display: 'block',
    });
  }

  /**
   * Hide overlay.
   */
  _hideOverlay() {
    helper.setStyle(this._overlay.element, {
      zIndex: -1,
      display: 'none',
    });
  }

  /**
   * Set properties.
   */
  _setProps() {
    // set sizePixel
    let sizePixel = this._normalizePixel(
        this._drawer.size
    );

    if (this._drawer.maxSize && this._drawer.maxSize !== -1) {
      const maxSizePixel = this._normalizePixel(
          this._drawer.maxSize
      );

      if (sizePixel > maxSizePixel) {
        sizePixel = maxSizePixel;
      }
    }

    this._sizePixel = sizePixel;

    // set position
    this._position = typeof this._position === 'undefined' ?
      null :
      this._position;
  }

  /**
   * Return initial style of drawer.
   *
   * @return {Object} Style for drawer.
   */
  _getInitDrawerStyle() {
    let style = null;

    switch (this._drawer.direction) {
      case 'top':
        style = {
          width: '100%',
          height: `${this._sizePixel}px`,
          top: `-${this._sizePixel}px`,
          right: 'auto',
          bottom: 'auto',
          left: 0,
        };
        break;
      case 'right':
        style = {
          width: `${this._sizePixel}px`,
          height: '100%',
          top: 0,
          right: `-${this._sizePixel}px`,
          bottom: 'auto',
          left: 'auto',
        };
        break;
      case 'bottom':
        style = {
          width: '100%',
          height: `${this._sizePixel}px`,
          top: 'auto',
          right: 'auto',
          bottom: `-${this._sizePixel}px`,
          left: 0,
        };
        break;
      case 'left':
        style = {
          width: `${this._sizePixel}px`,
          height: '100%',
          top: 0,
          right: 'auto',
          bottom: 'auto',
          left: `-${this._sizePixel}px`,
        };
        break;
      default:
        throw new Error(`'${this._drawer.direction}' does not support`);
    }

    return Object.assign(style, this._drawer.style || {});
  }

  /**
   * Return style for moving the drawer.
   *
   * @param {number} position Moving position.
   * @param {number} [duration] Drawer moving time.
   * @return {Object} Move style for drawer.
   */
  _getDrawerStyle(position, duration = null) {
    const minp = this._getMinPosition(this._drawer);
    const style = {};

    if (support.cssAnim) {
      style.transitionDuration = `${duration === null ? this._drawer.duration : duration}ms`;

      switch (this._drawer.direction) {
        case 'top':
          style.transform = `${support.transrate}(0,${-(minp - position)}px,0)`;
          break;
        case 'right':
          style.transform = `${support.transrate}(${minp - position}px,0,0)`;
          break;
        case 'bottom':
          style.transform = `${support.transrate}(0,${minp - position}px,0)`;
          break;
        case 'left':
          style.transform = `${support.transrate}(${-(minp - position)}px,0,0)`;
          break;
        default:
          throw new Error(`'${this._drawer.direction}' does not support`);
      }
    } else {
      style[this._drawer.direction] = `${position}px`;
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
  _getOverlayStyle(opacity, duration = null) {
    const style = {
      opacity,
    };

    if (support.cssAnim) {
      style.transitionDuration = `${duration === null ? this._drawer.duration : duration}ms`;
    }

    return style;
  }

  /**
   * Change overlay state.
   *
   * @param {string} state Drawer status ('open' or 'close')
   */
  _changeOverlayState(state) {
    if (state === 'open') {
      helper.addEventListenerWithOptions(this._overlay.element, 'click', this._overlay.touchHandler);
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
  _cssAnimate(duration) {
    helper.setStyle(
        this._overlay.element,
        this._getOverlayStyle(
            this._getOverlayOpacityFromPosition(this._position),
            duration
        )
    );

    helper.setStyle(
        this._drawer.element,
        this._getDrawerStyle(this._position, duration)
    );
  }

  /**
   * Make animation with Javascript.
   *
   * @param {number} duration Drawer moving time.
   */
  _jsAnimate(duration) {
    const start = +new Date();
    const fromOpy = this._getOverlayOpacityFromStyle();
    const toOpy = this._getOverlayOpacityFromPosition(this._position);
    const fromPos = this._getDrawerPositionFromStyle();
    const toPos = this._position;

    if (this._intervalId) {
      clearInterval(this._intervalId);
    }

    this._intervalId = setInterval(() => {
      let time = new Date() - start;
      let nowPos = null;
      let nowOpy = null;

      if (time > duration) {
        clearInterval(this._intervalId);
        this._intervalId = null;
        nowOpy = toOpy;
        nowPos = toPos;
      } else {
        const prp = (time /= duration) * (time - 2);
        nowOpy = fromOpy - ((toOpy - fromOpy) * prp);
        nowPos = fromPos - ((toPos - fromPos) * prp);
      }

      helper.setStyle(
          this._overlay.element,
          this._getOverlayStyle(nowOpy, duration)
      );

      helper.setStyle(
          this._drawer.element,
          this._getDrawerStyle(nowPos, duration)
      );
    }, 10);
  }

  /**
   * Return state by touch movement.
   *
   * @return {string} State by touch movement.
   */
  _getTouchMoveState() {
    if (this._process.time.end - this._process.time.start <= 300) {
      const len = this._process.touches.length;
      const moveInfo = this._getTouchMoveInfo(
          this._process.touches[len - 2],
          this._process.touches[len - 1]
      );
      const vertical = moveInfo.axis === 'vertical';
      const horizontal = moveInfo.axis === 'horizontal';
      const top = this._drawer.direction === 'top' && moveInfo.y >= 0;
      const right = this._drawer.direction === 'right' && moveInfo.x < 0;
      const bottom = this._drawer.direction === 'bottom' && moveInfo.y < 0;
      const left = this._drawer.direction === 'left' && moveInfo.x >= 0;

      return (vertical && (bottom || top)) ||
        (horizontal && (right || left)) ?
        'open' :
        'close';
    }

    return this._getStateFromPosition();
  }

  /**
   * Return drawer event handler.
   *
   * @return {Object} Drawer event handler.
   */
  _getDrawerHandler() {
    const handler = {};

    handler.resize = () => {
      this._resetDrawer();
      this[this.state](0, false, false);

      if (this._drawer.onResize) {
        this._drawer.onResize.apply(
            this,
            [this._drawer]
        );
      }
    };

    if (this._drawer.swipeable) {
      for (const event of TOUCH_EVENTS) {
        handler[event] = this._touchHandler.bind(this);
      }
    }

    if (window.history &&
      window.history.pushState &&
      this._drawer.history
    ) {
      handler.popstate = (e) => {
        if (e.state && e.state.id === this._id && this.state === 'open') {
          this.close(null, true, false);
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
  _touchHandler(ev) {
    try {
      if (ev.touches.length > 1) {
        return true;
      }

      const touch = ev.touches[0];

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
  _onTouchStart(ev) {
    this._process.time.start = new Date().getTime();
  }

  /**
   * Touch move event handler.
   *
   * @param {Event} ev Touch event object.
   */
  _onTouchMove(ev) {
    const len = this._process.touches.length;

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

    let isFireTouchStart = false;
    const isTouchActive = this._process.isTouchPointActive &&
        this._process.isTouchDirectionActive;

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

    this._position = this._getDrawerPositionFromTouches(
        this._process.touches[len - 2],
        this._process.touches[len - 1]
    );

    if (isFireTouchStart) {
      this._drawer.onTouchStart.apply(
          this,
          [this._drawer, this._position]
      );
    }

    helper.setStyle(
        this._overlay.element,
        this._getOverlayStyle(
            this._getOverlayOpacityFromPosition(this._position),
            0
        )
    );

    helper.setStyle(
        this._drawer.element,
        this._getDrawerStyle(this._position, 0)
    );

    if (this._drawer.onTouchMove) {
      this._drawer.onTouchMove.apply(
          this,
          [this._drawer, this._position]
      );
    }
  }

  /**
   * Touch finish event handler.
   *
   * @param {Event} ev Touch event object.
   */
  _onTouchFinish(ev) {
    const len = this._process.touches.length;

    if (this._process.isTouchActive && len >= 2) {
      this._process.time.end = new Date().getTime();

      const state = this._getTouchMoveState();
      const changeState = this.state !== state;

      this[state](null, changeState, changeState);

      if (this._drawer.onTouchFinish) {
        this._drawer.onTouchFinish.apply(
            this,
            [
              this._drawer,
              this._getDrawerPositionFromTouches(
                  this._process.touches[len - 2],
                  this._process.touches[len - 1]
              ),
            ]
        );
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
  _changeState(
      position,
      duration = null,
      callbacks = null,
      isChangeHistory = true
  ) {
    return this._handleCallback(new Promise((resolve, reject) => {
      try {
        if (!this._enabled) {
          throw new Error('Drawer is disabled.');
        }

        this._position = position;

        const du = duration === null ? this._drawer.duration : duration;

        if (this._timeoutId !== null) {
          clearTimeout(this._timeoutId);
          this._timeoutId = null;
        }

        const state = this._getStateFromPosition();

        if (state === 'open') {
          this._showOverlay();
          this._showDrawer();
        } else {
          this._overlay.element.removeEventListener('click', this._overlay.touchHandler);
        }

        if (isChangeHistory &&
          this._drawer.history &&
          window.history &&
          window.history.pushState
        ) {
          if (state === 'open') {
            window.history.pushState({
              id: this._id,
            }, null, null);
          } else {
            window.history.back();
          }
        }

        this[support.cssAnim ?
          '_cssAnimate' :
          '_jsAnimate'](du);

        if (du > 0) {
          this._timeoutId = setTimeout(
              () => {
                this._changeOverlayState(state);
                this._timeoutId = null;
              },
              du
          );
        } else {
          this._changeOverlayState(state);
        }

        this.state = state;

        if (typeof callbacks === 'object' && callbacks.onChangeState) {
          callbacks.onChangeState.apply(
              this,
              [this._drawer, state]
          );
        }

        resolve.apply(this, [this._drawer]);
      } catch (e) {
        reject(e);
      }
    }), {
      done: typeof callbacks === 'object' && callbacks.done ? callbacks.done : null,
      fail: typeof callbacks === 'object' && callbacks.fail ? callbacks.fail : null,
    });
  }

  /**
   * Return whether or not a valid touch point.
   *
   * @return {boolean} Result of valid touch point.
   */
  _isTouchPointActive() {
    const rg = this._getRange(
      this.state === 'open' ?
        this._sizePixel :
        this._drawer.swipeArea
    );
    const len = this._process.touches.length;

    return (rg.from.x <= this._process.touches[len - 2].clientX &&
      this._process.touches[len - 2].clientX <= rg.to.x &&
      rg.from.y <= this._process.touches[len - 2].clientY &&
      this._process.touches[len - 2].clientY <= rg.to.y);
  }

  /**
   * Return whether or not a valid touch direction.
   *
   * @return {boolean} Result of valid touch direction.
   */
  _isTouchDirectionActive() {
    const len = this._process.touches.length;
    const moveInfo = this._getTouchMoveInfo(
        this._process.touches[len - 2],
        this._process.touches[len - 1]
    );
    const vertical = moveInfo.axis === 'vertical';
    const horizontal = moveInfo.axis === 'horizontal';

    if (!(vertical &&
      (this._drawer.direction === 'top' ||
      this._drawer.direction === 'bottom') ||
      horizontal &&
      (this._drawer.direction === 'right' ||
      this._drawer.direction === 'left'))
    ) {
      return false;
    }

    return (
      (
        this.state === 'open' &&
        (
          this._drawer.direction === 'top' && moveInfo.y < 0 ||
          this._drawer.direction === 'right' && moveInfo.x >= 0 ||
          this._drawer.direction === 'bottom' && moveInfo.y >= 0 ||
          this._drawer.direction === 'left' && moveInfo.x < 0
        )
      ) ||
      (
        this.state === 'close' &&
        (
          this._drawer.direction === 'top' && moveInfo.y >= 0 ||
          this._drawer.direction === 'right' && moveInfo.x < 0 ||
          this._drawer.direction === 'bottom' && moveInfo.y < 0 ||
          this._drawer.direction === 'left' && moveInfo.x >= 0
        )
      )
    );
  }

  /**
   * Return the state of the drawer.
   *
   * @return {string} State of the drawer.
   */
  _getStateFromPosition() {
    const pos = this._position === null ?
      this._getDrawerPositionFromStyle() :
      this._position;

    return Math.abs(pos) < this._sizePixel / 2 ?
      'open' :
      'close';
  }

  /**
   * Return the position of the drawer.
   *
   * @param {Object} touchbasis Basic touch information.
   * @param {Object} touchlast Last touch information.
   * @return {number} Position of the drawer.
   */
  _getDrawerPositionFromTouches(touchbasis, touchlast) {
    const distance = this._getDistance(
        this._getTouchMoveInfo(touchbasis, touchlast)
    );
    const curpos = this._position === null ?
      this._getDrawerPositionFromStyle() :
      this._position;
    const minp = this._getMinPosition(this._drawer);
    let pos = Math.round(curpos + distance);

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
  _getDrawerPositionFromStyle() {
    const value = this._drawer.element.style[this._drawer.direction];
    return this._normalizeNumber(value).value;
  }

  /**
   * Return the opacity of the overlay.
   *
   * @param {number} position Moving position.
   * @return {number} Position of the drawer.
   */
  _getOverlayOpacityFromPosition(position) {
    const minp = this._getMinPosition(this._drawer);
    const posRatio = 1 - (Math.abs(position) / Math.abs(minp));
    return ((this._overlay.opacity * posRatio) * 10000) / 10000;
  }

  /**
   * Return the opacity in the style.
   *
   * @return {number} Opacity in the style.
   */
  _getOverlayOpacityFromStyle() {
    return parseFloat(this._overlay.element.style.opacity);
  }

  /**
   * Return the swipe range.
   *
   * @param {string|number} value Target swipe area value.
   * @return {Object} Drag range.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _getRange(value) {
    const basis = this._convertPixelAbs(value);
    const width = window.innerWidth;
    const height = window.innerHeight;

    switch (this._drawer.direction) {
      case 'top':
        return {from: {x: 0, y: 0}, to: {x: width, y: basis}};
      case 'right':
        return {from: {x: basis, y: 0}, to: {x: width, y: height}};
      case 'bottom':
        return {from: {x: 0, y: basis}, to: {x: width, y: height}};
      case 'left':
        return {from: {x: 0, y: 0}, to: {x: basis, y: height}};
      default:
        throw new Error(`'${this._drawer.direction}' does not support`);
    }
  }

  /**
   * Return a value converted to the absolute value of the pixel.
   *
   * @param {string|number} value Target value.
   * @return {number} Converted to the absolute value of the pixel.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _convertPixelAbs(value) {
    const nValue = this._normalizePixel(value);

    switch (this._drawer.direction) {
      case 'top':
      case 'left':
        return nValue;
      case 'right':
        return window.innerWidth - nValue;
      case 'bottom':
        return window.innerHeight - nValue;
      default:
        throw new Error(`'${this._drawer.direction}' does not support`);
    }
  }

  /**
   * Return the normalized pixel value.
   *
   * @param {string|number} value Target value.
   * @return {number} Normalized pixel value.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _normalizePixel(value) {
    const nValue = this._normalizeNumber(value);

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
          throw new Error(`'${this._drawer.direction}' does not support`);
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
  _normalizeNumber(value) {
    if (typeof value === 'number') {
      return {value: value, unit: 'number'};
    } else if (String(value).match(/^[.\-0-9]+$/)) {
      return {value: Number(value), unit: 'number'};
    } else if (value.match(/^[.\-0-9]+px$/)) {
      return {value: Number(value.replace(/px$/ig, '')), unit: 'pixel'};
    } else if (value.match(/[.\-0-9]+%$/)) {
      return {value: Number(value.replace(/%$/ig, '')), unit: 'percent'};
    }

    throw new Error(`'${value}' does not support`);
  }

  /**
   * Return to the minimum position for the drawer.
   *
   * @return {number} Minimum position for the drawer.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _getMinPosition() {
    switch (this._drawer.direction) {
      case 'top':
      case 'bottom':
        return -1 * this._drawer.element.offsetHeight;
      case 'right':
      case 'left':
        return -1 * this._drawer.element.offsetWidth;
      default:
        throw new Error(`'${this._drawer.direction}' does not support`);
    }
  }

  /**
   * Return the distance of the drawer.
   *
   * @param {Object} moveInfo Movement information of the drawer.
   * @return {number} Distance of the drawer.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _getDistance(moveInfo) {
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
        throw new Error(`'${this._drawer.direction}' does not support`);
    }
  }

  /**
   * Return the information of touch move.
   *
   * @param {Object} touchbasis Basic touch information.
   * @param {Object} touchlast Last touch information.
   * @return {Object} Movement distance of the x, y direction, movement direction.
   */
  _getTouchMoveInfo(touchbasis, touchlast) {
    const x = touchlast.clientX - touchbasis.clientX;
    const y = touchlast.clientY - touchbasis.clientY;
    const axis = Math.abs(x) >= Math.abs(y) ? 'horizontal' : 'vertical';
    return {x, y, axis};
  }

  /**
   * Return the information of touch move.
   *
   * @param {Promise} promise Promise instance.
   * @param {Object} callbacks Callback function with the key to 'done', 'fail', 'always' (each optional).
   * @return {Promise} Promise instance.
   */
  _handleCallback(promise, callbacks) {
    if (!callbacks) {
      return promise;
    }

    for (const key of Object.keys(callbacks)) {
      const callback = callbacks[key];

      if (!callback) {
        continue;
      }

      const cb = isArray(callback) ? callback : [callback];
      const rcb = null;

      switch (key) {
        case 'done':
          rcb = (prom, value) => prom.then(value.bind(this));
          break;
        case 'fail':
          rcb = (prom, value) => prom.catch(value.bind(this));
          break;
        case 'always':
          rcb = (prom, value) => prom.then(value.bind(this), value.bind(this));
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
}
