import {
  DEFAULT_DRAWER_PROPERTY,
  DEFAULT_OVERLAY_PROPERTY,
  DEFAULT_PROCESS,
  DRAWER_STYLE,
  OVERLAY_STYLE,
  TOUCH_EVENTS,
  TRANSITION_STYLE,
} from './const';

import {isarray} from './util';
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

    this._id = helper.generateid();
    this._drawer = Object.assign({}, DEFAULT_DRAWER_PROPERTY, drawer);
    this._overlay = this._drawer.overlay === false ?
      false :
      Object.assign({}, DEFAULT_OVERLAY_PROPERTY, this._drawer.overlay);
    this._timeoutid = null;
    this._intervalid = null;
    this._process = Object.assign({}, DEFAULT_PROCESS);
    this._enabled = false;
    this._handler = this._getdrawerhandler();

    if (!this._drawer.element) {
      throw new Error(`'element' is required.`);
    }

    if (!this._isHTMLElement(this._drawer.element)) {
      throw new Error(`Invalid HTMLElement specified for 'element'.`);
    }

    if (this._drawer.enabledmaxwidth > -1) {
      window.addEventListener('resize', () => {
        if (this._enabled
          && window.innerWidth > this._drawer.enabledmaxwidth) {
          this.destroy();
        } else if (!this._enabled
          && window.innerWidth <= this._drawer.enabledmaxwidth) {
          this.create();
        }
      });
    }

    if (window.history
      && window.history.pushState
      && this._drawer.history
    ) {
      window.history.replaceState({
        id: this._id,
      }, null, null);
    }

    if (this._drawer.initcreate
      && (this._drawer.enabledmaxwidth < 0
        || window.innerWidth <= this._drawer.enabledmaxwidth)
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
  destroy() {
    try {
      if (this.state === 'open') {
        this.close(0, true, true);
      }

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
  open(duration = null, isfireevent = true, ischangehistory = true) {
    return this._changestate(
      0,
      duration,
      {
        onchangestate: isfireevent ? this._drawer.onchangestate : null,
        done: isfireevent ? this._drawer.onopen : null,
        fail: isfireevent ? this._drawer.onerror : null,
      },
      ischangehistory
    );
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
  close(duration = null, isfireevent = true, ischangehistory = true) {
    return this._changestate(
      this._getminposition(),
      duration,
      {
        onchangestate: isfireevent ? this._drawer.onchangestate : null,
        done: isfireevent ? this._drawer.onclose : null,
        fail: isfireevent ? this._drawer.onerror : null,
      },
      ischangehistory
    );
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
  toggle(duration = null, isfireevent = true, ischangehistory = true) {
    return new Promise((resolve, reject) => {
      try {
        this[this.state === 'open' ? 'close' : 'open'](duration, isfireevent, ischangehistory)
          .then(resolve, reject);
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Create drawer.
   */
  _createdrawer() {
    helper.setstyle(
      this._drawer.element,
      Object.assign(
        {},
        DRAWER_STYLE,
        support.cssanim ? TRANSITION_STYLE : {}
      )
    );

    this._resetdrawer();

    Object.keys(this._handler).forEach((name) => {
      window.addEventListener(name, this._handler[name]);
    });
  }

  /**
   * Destroy drawer.
   */
  _destroydrawer() {
    Object.keys(this._handler).forEach((name) => {
      window.removeEventListener(name, this._handler[name]);
    });

    this._resetdrawer(true);

    helper.unsetstyle(
      this._drawer.element,
      Object.keys(
        Object.assign(
          {},
          DRAWER_STYLE,
          support.cssanim ? TRANSITION_STYLE : {}
        )
      )
    );
  }

  /**
   * Create overlay.
   */
  _createoverlay() {
    if (this._overlay === false) {
      return;
    }

    if (this._overlay.zindex === -1) {
      this._overlay.zindex = this._drawer.zindex - 1;
    }

    if (!this._overlay.element) {
      this._overlay.element = window.document.createElement('div');
      this._overlay.isautocreated = true;

      helper.setstyle(
        this._overlay.element,
        Object.assign(
          {},
          OVERLAY_STYLE,
          support.cssanim ? TRANSITION_STYLE : {}
        )
      );
    }

    if (!this._overlay.touchhandler) {
      this._overlay.touchhandler = (e) => {
        this.close();
      };
    }

    window.document.body.appendChild(this._overlay.element);
  }

  /**
   * Destroy overlay.
   */
  _destroyoverlay() {
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
  _resetdrawer(isunset = false) {
    try {
      this._setprops();

      let ims = this._getinitdrawerstyle();

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
  _showdrawer() {
    helper.setstyle(this._drawer.element, {
      zIndex: this._drawer.zindex,
      opacity: 1,
    });
  }

  /**
   * Hide drawer.
   */
  _hidedrawer() {
    helper.setstyle(this._drawer.element, {
      zIndex: -1,
      opacity: 0,
    });
  }

  /**
   * Show overlay.
   */
  _showoverlay() {
    helper.setstyle(this._overlay.element, {
      zIndex: this._overlay.zindex,
      display: 'block',
    });
  }

  /**
   * Hide overlay.
   */
  _hideoverlay() {
    helper.setstyle(this._overlay.element, {
      zIndex: -1,
      display: 'none',
    });
  }

  /**
   * Set properties.
   */
  _setprops() {
    // set sizepixel
    let sizepixel = this._normalizepixel(
      this._drawer.size
    );

    if (this._drawer.maxsize && this._drawer.maxsize !== -1) {
      let maxsizepixel = this._normalizepixel(
        this._drawer.maxsize
      );

      if (sizepixel > maxsizepixel) {
        sizepixel = maxsizepixel;
      }
    }

    this._sizepixel = sizepixel;

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
  _getinitdrawerstyle() {
    let style = null;

    switch (this._drawer.direction) {
      case 'top':
        style = {
          width: '100%',
          height: `${this._sizepixel}px`,
          top: `-${this._sizepixel}px`,
          right: 'auto',
          bottom: 'auto',
          left: 0,
        };
        break;
      case 'right':
        style = {
          width: `${this._sizepixel}px`,
          height: '100%',
          top: 0,
          right: `-${this._sizepixel}px`,
          bottom: 'auto',
          left: 'auto',
        };
        break;
      case 'bottom':
        style = {
          width: '100%',
          height: `${this._sizepixel}px`,
          top: 'auto',
          right: 'auto',
          bottom: `-${this._sizepixel}px`,
          left: 0,
        };
        break;
      case 'left':
        style = {
          width: `${this._sizepixel}px`,
          height: '100%',
          top: 0,
          right: 'auto',
          bottom: 'auto',
          left: `-${this._sizepixel}px`,
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
  _getdrawerstyle(position, duration = null) {
    let minp = this._getminposition(this._drawer);
    let style = {};

    if (support.cssanim) {
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
  _getoverlaystyle(opacity, duration = null) {
    let style = {
      opacity,
    };

    if (support.cssanim) {
      style.transitionDuration = `${duration === null ? this._drawer.duration : duration}ms`;
    }

    return style;
  }

  /**
   * Make animation with CSS3.
   *
   * @param {number} duration Drawer moving time.
   */
  _cssanimate(duration) {
    helper.setstyle(
      this._overlay.element,
      this._getoverlaystyle(
        this._getoverlayopacityfromposition(this._position),
        duration
      )
    );

    helper.setstyle(
      this._drawer.element,
      this._getdrawerstyle(this._position, duration)
    );
  }

  /**
   * Make animation with Javascript.
   *
   * @param {number} duration Drawer moving time.
   */
  _jsanimate(duration) {
    let start = +new Date();
    let fromopy = this._getoverlayopacityfromstyle();
    let toopy = this._getoverlayopacityfromposition(this._position);
    let frompos = this._getdrawerpositionfromstyle();
    let topos = this._position;

    if (this._intervalid) {
      clearInterval(this._intervalid);
    }

    this._intervalid = setInterval(() => {
      let time = new Date() - start;
      let nowpos = null;
      let nowopy = null;

      if (time > duration) {
        clearInterval(this._intervalid);
        this._intervalid = null;
        nowopy = toopy;
        nowpos = topos;
      } else {
        let prp = (time /= duration) * (time - 2);
        nowopy = fromopy - ((toopy - fromopy) * prp);
        nowpos = frompos - ((topos - frompos) * prp);
      }

      helper.setstyle(
        this._overlay.element,
        this._getoverlaystyle(nowopy, duration)
      );

      helper.setstyle(
        this._drawer.element,
        this._getdrawerstyle(nowpos, duration)
      );
    }, 10);
  }

  /**
   * Return state by touch movement.
   *
   * @return {string} State by touch movement.
   */
  _gettouchmovestate() {
    if (this._process.time.end - this._process.time.start <= 300) {
      let len = this._process.touches.length;
      let moveinfo = this._gettouchmoveinfo(
        this._process.touches[len - 2],
        this._process.touches[len - 1]
      );
      let vertical = moveinfo.axis === 'vertical';
      let horizontal = moveinfo.axis === 'horizontal';
      let top = this._drawer.direction === 'top' && moveinfo.y >= 0;
      let right = this._drawer.direction === 'right' && moveinfo.x < 0;
      let bottom = this._drawer.direction === 'bottom' && moveinfo.y < 0;
      let left = this._drawer.direction === 'left' && moveinfo.x >= 0;

      return (vertical && (bottom || top)) ||
        (horizontal && (right || left)) ?
        'open' :
        'close';
    }

    return this._getstatefromposition();
  }

  /**
   * Return drawer event handler.
   *
   * @return {Object} Drawer event handler.
   */
  _getdrawerhandler() {
    let handler = {};

    handler.resize = () => {
      this._resetdrawer();
      this[this.state](0, false, false);

      if (this._drawer.onresize) {
        this._drawer.onresize.apply(
          this,
          [this._drawer]
        );
      }
    };

    if (this._drawer.swipeable) {
      for (let event of TOUCH_EVENTS) {
        handler[event] = this._touchhandler.bind(this);
      }
    }

    if (window.history
      && window.history.pushState
      && this._drawer.history
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
  _touchhandler(ev) {
    try {
      if (ev.touches.length > 1) {
        return true;
      }

      let touch = ev.touches[0];

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
  _ontouchstart(ev) {
    this._process.time.start = new Date().getTime();
  }

  /**
   * Touch move event handler.
   *
   * @param {Event} ev Touch event object.
   */
  _ontouchmove(ev) {
    let len = this._process.touches.length;

    if (len < 2) {
      return;
    }

    if (!this._process.istouchpointactive) {
      this._process.istouchpointactive = this._istouchpointactive();
    }

    if (!this._process.istouchpointactive) {
      return;
    }

    if (this._process.istouchdirectionactive === null) {
      this._process.istouchdirectionactive = this._istouchdirectionactive();
    }

    if (!this._process.istouchdirectionactive) {
      return;
    }

    let isfiretouchstart = false;
    let istouchactive = this._process.istouchpointactive &&
        this._process.istouchdirectionactive;

    if (!istouchactive) {
      return;
    }

    if (!this._process.istouchactive) {
      this._process.istouchactive = istouchactive;
      this._showoverlay();
      this._showdrawer();

      if (this._drawer.ontouchstart) {
        isfiretouchstart = true;
      }
    }

    ev.stopPropagation();
    ev.preventDefault();

    this._position = this._getdrawerpositionfromtouches(
      this._process.touches[len - 2],
      this._process.touches[len - 1]
    );

    if (isfiretouchstart) {
      this._drawer.ontouchstart.apply(
        this,
        [this._drawer, this._position]
      );
    }

    helper.setstyle(
      this._overlay.element,
      this._getoverlaystyle(
        this._getoverlayopacityfromposition(this._position),
        0
      )
    );

    helper.setstyle(
      this._drawer.element,
      this._getdrawerstyle(this._position, 0)
    );

    if (this._drawer.ontouchmove) {
      this._drawer.ontouchmove.apply(
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
  _ontouchfinish(ev) {
    let len = this._process.touches.length;

    if (this._process.istouchactive && len >= 2) {
      this._process.time.end = new Date().getTime();

      let state = this._gettouchmovestate();
      let changestate = this.state !== state;

      this[state](null, changestate, changestate);

      if (this._drawer.ontouchfinish) {
        this._drawer.ontouchfinish.apply(
          this,
          [
            this._drawer,
            this._getdrawerpositionfromtouches(
              this._process.touches[len - 2],
              this._process.touches[len - 1]
            ),
          ]
        );
      }
    }

    this._process.touches = [];
    this._process.istouchactive = null;
    this._process.istouchpointactive = null;
    this._process.istouchdirectionactive = null;
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
  _changestate(
    position,
    duration = null,
    callbacks = null,
    ischangehistory = true
  ) {
    return this._handlecallback(new Promise((resolve, reject) => {
      try {
        if (!this._enabled) {
          throw new Error('Drawer is disabled.');
        }

        this._position = position;

        let du = duration === null ? this._drawer.duration : duration;

        if (this._timeoutid !== null) {
          clearTimeout(this._timeoutid);
          this._timeoutid = null;
        }

        let state = this._getstatefromposition();

        if (state === 'open') {
          this._showoverlay();
          this._showdrawer();
        } else {
          this._overlay.element.removeEventListener('click', this._overlay.touchhandler);
        }

        if (ischangehistory
          && this._drawer.history
          && window.history
          && window.history.pushState
        ) {
          if (state === 'open') {
            window.history.pushState({
              id: this._id,
            }, null, null);
          } else {
            window.history.back();
          }
        }

        this[support.cssanim
          ? '_cssanimate'
          : '_jsanimate'](du);

        this._timeoutid = setTimeout(
          () => {
            if (state === 'open') {
              this._overlay.element.addEventListener('click', this._overlay.touchhandler);
            } else {
              this._hidedrawer();
              this._hideoverlay();
            }

            this._timeoutid = null;
          },
          du
        );

        this.state = state;

        if (typeof callbacks === 'object' && callbacks.onchangestate) {
          callbacks.onchangestate.apply(
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
  _istouchpointactive() {
    let rg = this._getrange(
      this.state === 'open' ?
        this._sizepixel :
        this._drawer.swipearea
    );
    let len = this._process.touches.length;

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
  _istouchdirectionactive() {
    let len = this._process.touches.length;
    let moveinfo = this._gettouchmoveinfo(
      this._process.touches[len - 2],
      this._process.touches[len - 1]
    );
    let vertical = moveinfo.axis === 'vertical';
    let horizontal = moveinfo.axis === 'horizontal';

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
          this._drawer.direction === 'top' && moveinfo.y < 0 ||
          this._drawer.direction === 'right' && moveinfo.x >= 0 ||
          this._drawer.direction === 'bottom' && moveinfo.y >= 0 ||
          this._drawer.direction === 'left' && moveinfo.x < 0
        )
      ) ||
      (
        this.state === 'close' &&
        (
          this._drawer.direction === 'top' && moveinfo.y >= 0 ||
          this._drawer.direction === 'right' && moveinfo.x < 0 ||
          this._drawer.direction === 'bottom' && moveinfo.y < 0 ||
          this._drawer.direction === 'left' && moveinfo.x >= 0
        )
      )
    );
  }

  /**
   * Return the state of the drawer.
   *
   * @return {string} State of the drawer.
   */
  _getstatefromposition() {
    let pos = this._position === null ?
      this._getdrawerpositionfromstyle() :
      this._position;

    return Math.abs(pos) < this._sizepixel / 2 ?
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
  _getdrawerpositionfromtouches(touchbasis, touchlast) {
    let distance = this._getdistance(
      this._gettouchmoveinfo(touchbasis, touchlast)
    );

    let curpos = this._position === null ?
      this._getdrawerpositionfromstyle() :
      this._position;

    let pos = Math.round(curpos + distance);
    let minp = this._getminposition(this._drawer);

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
  _getdrawerpositionfromstyle() {
    let value = this._drawer.element.style[this._drawer.direction];
    return this._normalizenumber(value).value;
  }


  /**
   * Return the opacity of the overlay.
   *
   * @param {number} position Moving position.
   * @return {number} Position of the drawer.
   */
  _getoverlayopacityfromposition(position) {
    let minp = this._getminposition(this._drawer);
    let posratio = 1 - (Math.abs(position) / Math.abs(minp));
    return ((this._overlay.opacity * posratio) * 10000) / 10000;
  }

  /**
   * Return the opacity in the style.
   *
   * @return {number} Opacity in the style.
   */
  _getoverlayopacityfromstyle() {
    return parseFloat(this._overlay.element.style.opacity);
  }

  /**
   * Return the swipe range.
   *
   * @param {string|number} value Target swipe area value.
   * @return {Object} Drag range.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _getrange(value) {
    let basis = this._convertpixelabs(value);
    let width = window.innerWidth;
    let height = window.innerHeight;

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
  _convertpixelabs(value) {
    let nvalue = this._normalizepixel(value);

    switch (this._drawer.direction) {
      case 'top':
      case 'left':
        return nvalue;
      case 'right':
        return window.innerWidth - nvalue;
      case 'bottom':
        return window.innerHeight - nvalue;
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
  _normalizepixel(value) {
    let normalized = this._normalizenumber(value);

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
  _normalizenumber(value) {
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
  _getminposition() {
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
   * @param {Object} moveinfo Movement information of the drawer.
   * @return {number} Distance of the drawer.
   * @throws {Error} Is thrown if direction value is invalid.
   */
  _getdistance(moveinfo) {
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
  _gettouchmoveinfo(touchbasis, touchlast) {
    let x = touchlast.clientX - touchbasis.clientX;
    let y = touchlast.clientY - touchbasis.clientY;
    let axis = Math.abs(x) >= Math.abs(y) ? 'horizontal' : 'vertical';

    return {x, y, axis};
  }

  /**
   * Validate HTMLElement
   *
   * @param {*} obj HTMLElement to be verified.
   * @return {boolean} Result of valid HTMLElement.
   */
  _isHTMLElement(obj) {
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
   * Return the information of touch move.
   *
   * @param {Promise} promise Promise instance.
   * @param {Object} callbacks Callback function with the key to 'done', 'fail', 'always' (each optional).
   * @return {Promise} Promise instance.
   */
  _handlecallback(promise, callbacks) {
    if (!callbacks) {
      return promise;
    }

    for (let key of Object.keys(callbacks)) {
      let callback = callbacks[key];

      if (!callback) {
        continue;
      }

      let cb = isarray(callback) ? callback : [callback];
      let rcb = null;

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

module.exports = Highendrawer;
