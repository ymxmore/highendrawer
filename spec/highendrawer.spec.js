import Highendrawer from '../src/highendrawer';

describe('Testing the constructor', () => {
  let ins = null;
  let elem = null;

  describe('Specify only mandatory properties', () => {
    beforeAll(() => {
      // Size: 320x480
      window.resizeTo(320, 480);
      window.innerWidth = window.outerWidth = 320;
      window.innerHeight = window.outerHeight = 480;

      // Drawer element
      elem = document.createElement('div');
      elem.setAttribute('id', 'drawer');
      document.body.appendChild(elem);

      // Spy
      spyOn(window, 'addEventListener');

      // Setup instance
      ins = new Highendrawer({
        element: elem,
      });
    });

    afterAll(() => {
      let drawer = document.getElementById('drawer');
      drawer.parentNode.removeChild(drawer);

      let overlay = ins._overlay.element;
      overlay.parentNode.removeChild(overlay);
    });

    it('Property state should be created successfully', () => {
      expect(ins.state).toBe('close');
    });

    it('Property timeoutid should be created successfully', () => {
      expect(ins._timeoutId).toBeNull();
      expect(ins._intervalId).toBeNull();
    });

    it('Property drawer should be created successfully', () => {
      expect(ins._drawer).toEqual({
        direction: 'right',
        size: '80%',
        maxSize: -1,
        swipeable: true,
        swipeArea: 20,
        element: elem,
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

      expect(ins._drawer.element).toBe(elem);
    });

    it('Property process should be created successfully', () => {
      expect(ins._process).toEqual({
        touches: [],
        isTouchActive: null,
        isTouchPointActive: null,
        isTouchDirectionActive: null,
        time: {
          start: 0,
          end: 0,
        },
      });
    });

    it('Property enabled should be created successfully', () => {
      expect(ins._enabled).toBe(true);
    });

    it('Property handler should be created successfully', () => {
      expect(ins._handler).toEqual(jasmine.any(Object));
      expect(Object.keys(ins._handler)).toEqual([
        'resize',
        'touchstart',
        'touchmove',
        'touchend',
        'touchcancel',
        'popstate',
      ]);
      expect(ins._handler.touchstart).toEqual(jasmine.any(Function));
      expect(ins._handler.touchmove).toEqual(jasmine.any(Function));
      expect(ins._handler.touchend).toEqual(jasmine.any(Function));
      expect(ins._handler.touchcancel).toEqual(jasmine.any(Function));
      expect(ins._handler.resize).toEqual(jasmine.any(Function));
    });

    it('Property position should be created successfully', () => {
      expect(ins._position).toBe(null);
    });

    it('Property sizePixel should be created successfully', () => {
      expect(ins._sizePixel).toBe(256);
    });

    it('Property overlay should be created successfully', () => {
      expect(ins._overlay).toEqual(jasmine.any(Object));
      expect(ins._overlay.element).not.toBeUndefined();
      expect(ins._overlay.opacity).not.toBeUndefined();
      expect(ins._overlay.zIndex).not.toBeUndefined();
      expect(ins._overlay.element.tagName).toBe('DIV');
      expect(ins._overlay.element.innerHTML).toBe('');
      expect(ins._overlay.element.style.display).toBe('none');
      expect(ins._overlay.element.style.backgroundColor).toBe('rgb(0, 0, 0)');
      expect(ins._overlay.element.style.position).toBe('fixed');
      expect(ins._overlay.element.style.top).toBe('0px');
      expect(ins._overlay.element.style.right).toBe('0px');
      expect(ins._overlay.element.style.bottom).toBe('0px');
      expect(ins._overlay.element.style.left).toBe('0px');
      expect(ins._overlay.element.style.zIndex).toBe('-1');
      expect(ins._overlay.element.style.opacity).toBe('0');
      expect(ins._overlay.opacity).toBe(0.6);
      expect(ins._overlay.zIndex).toBe(9998);
      expect(document.getElementsByTagName('div').length).toBe(2);
    });

    it('Event should be registered correctly', () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(6);
      expect(window.addEventListener).toHaveBeenCalledWith('resize', ins._handler.resize, false);
      expect(window.addEventListener).toHaveBeenCalledWith('touchstart', ins._handler.touchstart, false);
      expect(window.addEventListener).toHaveBeenCalledWith('touchmove', ins._handler.touchmove, false);
      expect(window.addEventListener).toHaveBeenCalledWith('touchend', ins._handler.touchend, false);
      expect(window.addEventListener).toHaveBeenCalledWith('touchcancel', ins._handler.touchcancel, false);
      expect(window.addEventListener).toHaveBeenCalledWith('popstate', ins._handler.popstate, false);
    });

    it('Drawer should have the correct style', () => {
      expect(ins._drawer.element.style.display).toBe('block');
      expect(ins._drawer.element.style.position).toBe('fixed');
      expect(ins._drawer.element.style.overflowX).toBe('hidden');
      expect(ins._drawer.element.style.overflowY).toBe('auto');
      expect(ins._drawer.element.style.zIndex).toBe('-1');
      expect(ins._drawer.element.style.opacity).toBe('0');
      expect(ins._drawer.element.style.transition).toBe('0ms cubic-bezier(0, 0.8, 0.95, 1)');
      expect(ins._drawer.element.style.webkitTransition).toBe('0ms cubic-bezier(0, 0.8, 0.95, 1)');
      expect(ins._drawer.element.style.width).toBe('256px');
      expect(ins._drawer.element.style.height).toBe('100%');
      expect(ins._drawer.element.style.top).toBe('0px');
      expect(ins._drawer.element.style.right).toBe('-256px');
      expect(ins._drawer.element.style.bottom).toBe('auto');
      expect(ins._drawer.element.style.left).toBe('auto');
    });
  });

  describe('Specify all properties', () => {
    let oelem = null;
    let cbs = null;

    beforeAll(() => {
      // Size: 320x480
      window.resizeTo(320, 480);
      window.innerWidth = window.outerWidth = 320;
      window.innerHeight = window.outerHeight = 480;

      // Drawer element
      elem = document.createElement('div');
      elem.setAttribute('id', 'drawer');
      document.body.appendChild(elem);

      // Overlay element
      oelem = document.createElement('div');
      oelem.setAttribute('id', 'overlay');
      oelem.style.backgroundColor = '#f00';
      document.body.appendChild(oelem);

      // Spy
      spyOn(window, 'addEventListener');

      cbs = jasmine.createSpyObj('callbacks', [
        'onCreate',
        'onDestroy',
        'onOpen',
        'onClose',
        'onChangeState',
        'onResize',
        'onTouchStart',
        'onTouchMove',
        'onTouchFinish',
        'onError',
      ]);

      // Setup instance
      ins = new Highendrawer(Object.assign(cbs, {
        direction: 'left',
        size: '60%',
        maxSize: 320,
        swipeable: false,
        swipeArea: '5%',
        element: elem,
        duration: 200,
        zIndex: 99999,
        style: {
          backgroundColor: '#333',
        },
        overlay: {
          element: oelem,
          opacity: 0.6,
          zIndex: 50000,
        },
        initCreate: true,
        enabledMaxWidth: 320,
        history: true,
      }));
    });

    afterAll(() => {
      let drawer = document.getElementById('drawer');
      drawer.parentNode.removeChild(drawer);

      let overlay = document.getElementById('overlay');
      overlay.parentNode.removeChild(overlay);
    });

    it('Property state should be created successfully', () => {
      expect(ins.state).toBe('close');
    });

    it('Property timeoutId should be created successfully', () => {
      expect(ins._timeoutId).toBeNull();
      expect(ins._intervalId).toBeNull();
    });

    it('Property drawer should be created successfully', () => {
      expect(ins._drawer).toEqual(Object.assign(cbs, {
        direction: 'left',
        size: '60%',
        maxSize: 320,
        swipeable: false,
        swipeArea: '5%',
        element: elem,
        duration: 200,
        zIndex: 99999,
        style: {
          backgroundColor: '#333',
        },
        overlay: {
          element: oelem,
          opacity: 0.6,
          zIndex: 50000,
        },
        initCreate: true,
        enabledMaxWidth: 320,
        history: true,
      }));

      expect(ins._drawer.element).toBe(elem);
    });

    it('Property process should be created successfully', () => {
      expect(ins._process).toEqual({
        touches: [],
        isTouchActive: null,
        isTouchPointActive: null,
        isTouchDirectionActive: null,
        time: {
          start: 0,
          end: 0,
        },
      });
    });

    it('Property enabled should be created successfully', () => {
      expect(ins._enabled).toBe(true);
    });

    it('Property handler should be created successfully', () => {
      expect(ins._handler).toEqual(jasmine.any(Object));
      expect(Object.keys(ins._handler)).toEqual([
        'resize',
        'popstate',
      ]);
      expect(ins._handler.resize).toEqual(jasmine.any(Function));
      expect(ins._handler.popstate).toEqual(jasmine.any(Function));
    });

    it('Property position should be created successfully', () => {
      expect(ins._position).toBe(null);
    });

    it('Property sizePixel should be created successfully', () => {
      expect(ins._sizePixel).toBe(192);
    });

    it('Property overlay should be created successfully', () => {
      expect(ins._overlay).toEqual(jasmine.any(Object));
      expect(ins._overlay.element).not.toBeUndefined();
      expect(ins._overlay.opacity).not.toBeUndefined();
      expect(ins._overlay.zIndex).not.toBeUndefined();
      expect(ins._overlay.element.tagName).toBe('DIV');
      expect(ins._overlay.element.innerHTML).toBe('');
      expect(ins._overlay.element.style.display).toBe('');
      expect(ins._overlay.element.style.backgroundColor).toBe('rgb(255, 0, 0)');
      expect(ins._overlay.element.style.position).toBe('');
      expect(ins._overlay.element.style.top).toBe('');
      expect(ins._overlay.element.style.right).toBe('');
      expect(ins._overlay.element.style.bottom).toBe('');
      expect(ins._overlay.element.style.left).toBe('');
      expect(ins._overlay.element.style.zIndex).toBe('');
      expect(ins._overlay.element.style.opacity).toBe('');
      expect(ins._overlay.opacity).toBe(0.6);
      expect(ins._overlay.zIndex).toBe(50000);
      expect(document.getElementsByTagName('div').length).toBe(2);
    });

    it('Event should be registered correctly', () => {
      expect(window.addEventListener).toHaveBeenCalledTimes(3);
      expect(window.addEventListener.calls.first().args).toEqual(['resize', jasmine.any(Function), false]);
      expect(window.addEventListener).toHaveBeenCalledWith('resize', ins._handler.resize, false);
      expect(window.addEventListener).toHaveBeenCalledWith('popstate', ins._handler.popstate, false);
    });

    it('Drawer should have the correct style', () => {
      expect(ins._drawer.element.style.display).toBe('block');
      expect(ins._drawer.element.style.position).toBe('fixed');
      expect(ins._drawer.element.style.overflowX).toBe('hidden');
      expect(ins._drawer.element.style.overflowY).toBe('auto');
      expect(ins._drawer.element.style.zIndex).toBe('-1');
      expect(ins._drawer.element.style.opacity).toBe('0');
      expect(ins._drawer.element.style.transition).toBe('0ms cubic-bezier(0, 0.8, 0.95, 1)');
      expect(ins._drawer.element.style.webkitTransition).toBe('0ms cubic-bezier(0, 0.8, 0.95, 1)');
      expect(ins._drawer.element.style.width).toBe('192px');
      expect(ins._drawer.element.style.height).toBe('100%');
      expect(ins._drawer.element.style.top).toBe('0px');
      expect(ins._drawer.element.style.right).toBe('auto');
      expect(ins._drawer.element.style.bottom).toBe('auto');
      expect(ins._drawer.element.style.left).toBe('-192px');
      expect(ins._drawer.element.style.backgroundColor).toBe('rgb(51, 51, 51)');
    });

    it('Required callbacks should be called', () => {
      expect(cbs.onCreate).toHaveBeenCalledTimes(1);
      expect(cbs.onCreate).toHaveBeenCalledWith(ins._drawer);
      expect(cbs.onDestroy).toHaveBeenCalledTimes(0);
      expect(cbs.onOpen).toHaveBeenCalledTimes(0);
      expect(cbs.onClose).toHaveBeenCalledTimes(0);
      expect(cbs.onChangeState).toHaveBeenCalledTimes(0);
      expect(cbs.onResize).toHaveBeenCalledTimes(0);
      expect(cbs.onTouchStart).toHaveBeenCalledTimes(0);
      expect(cbs.onTouchMove).toHaveBeenCalledTimes(0);
      expect(cbs.onTouchFinish).toHaveBeenCalledTimes(0);
      expect(cbs.onError).toHaveBeenCalledTimes(0);
    });
  });
});

describe('Testing the create and destroy', () => {
  let ins = null;
  let elem = null;
  let cbs = null;

  beforeEach(() => {
    // Size: 320x480
    window.resizeTo(320, 480);
    window.innerWidth = window.outerWidth = 320;
    window.innerHeight = window.outerHeight = 480;

    // Drawer element
    elem = document.createElement('div');
    elem.setAttribute('id', 'drawer');
    document.body.appendChild(elem);

    // Spy
    spyOn(window, 'addEventListener');

    cbs = jasmine.createSpyObj('callbacks', [
      'onCreate',
      'onDestroy',
    ]);

    // Setup instance
    ins = new Highendrawer(Object.assign(cbs, {
      element: elem,
      initCreate: false,
    }));
  });

  afterEach(() => {
    let drawer = document.getElementById('drawer');
    drawer.parentNode.removeChild(drawer);

    let overlay = ins._overlay.element;

    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  });

  it('Drawer should be created successfully when calling method', () => {
    expect(ins._enabled).toBe(false);
    expect(cbs.onCreate).toHaveBeenCalledTimes(0);
    expect(cbs.onDestroy).toHaveBeenCalledTimes(0);
    expect(document.getElementsByTagName('div').length).toBe(1);
    expect(ins._drawer.element.style.display).toBe('');

    // Create
    ins.create();

    expect(ins._enabled).toBe(true);
    expect(cbs.onCreate).toHaveBeenCalledTimes(1);
    expect(cbs.onDestroy).toHaveBeenCalledTimes(0);
    expect(document.getElementsByTagName('div').length).toBe(2);
    expect(ins._drawer.element.style.display).toBe('block');

    // Destroy
    ins.destroy();

    expect(ins._enabled).toBe(false);
    expect(cbs.onCreate).toHaveBeenCalledTimes(1);
    expect(cbs.onDestroy).toHaveBeenCalledTimes(1);
    expect(document.getElementsByTagName('div').length).toBe(1);
    expect(ins._drawer.element.style.display).toBe('');

    // Create
    ins.create();

    expect(ins._enabled).toBe(true);
    expect(cbs.onCreate).toHaveBeenCalledTimes(2);
    expect(cbs.onDestroy).toHaveBeenCalledTimes(1);
    expect(document.getElementsByTagName('div').length).toBe(2);
    expect(ins._drawer.element.style.display).toBe('block');

    // Destroy
    ins.destroy();

    expect(ins._enabled).toBe(false);
    expect(cbs.onCreate).toHaveBeenCalledTimes(2);
    expect(cbs.onDestroy).toHaveBeenCalledTimes(2);
    expect(document.getElementsByTagName('div').length).toBe(1);
    expect(ins._drawer.element.style.display).toBe('');
  });
});

describe('Testing the open, close and toggle', () => {
  let ins = null;
  let elem = null;
  let cbs = null;

  beforeEach(() => {
    jasmine.clock().install();

    // Size: 320x480
    window.resizeTo(320, 480);
    window.innerWidth = window.outerWidth = 320;
    window.innerHeight = window.outerHeight = 480;

    // Drawer element
    elem = document.createElement('div');
    elem.setAttribute('id', 'drawer');
    document.body.appendChild(elem);

    // Spy
    spyOn(window, 'addEventListener');

    cbs = jasmine.createSpyObj('callbacks', [
      'onCreate',
      'onDestroy',
      'onOpen',
      'onClose',
      'onChangeState',
    ]);

    // Setup instance
    ins = new Highendrawer(Object.assign(cbs, {
      element: elem,
    }));
  });

  afterEach(() => {
    let drawer = document.getElementById('drawer');
    drawer.parentNode.removeChild(drawer);

    let overlay = ins._overlay.element;
    overlay.parentNode.removeChild(overlay);

    jasmine.clock().uninstall();
  });

  it('Drawer should be opened when calling method', () => {
    expect(ins.state).toBe('close');
    expect(cbs.onChangeState).toHaveBeenCalledTimes(0);
    expect(ins._drawer.element.style.zIndex).toBe('-1');
    expect(ins._drawer.element.style.opacity).toBe('0');
    expect(ins._drawer.element.style.webkitTransition).toBe('0ms cubic-bezier(0, 0.8, 0.95, 1)');
    expect(ins._drawer.element.style.webkitTransform).toBe('');
    expect(ins._overlay.element.style.zIndex).toBe('-1');
    expect(ins._overlay.element.style.opacity).toBe('0');
    expect(ins._overlay.element.style.webkitTransitionDuration).toBe('0ms');

    ins.open();

    expect(ins.state).toBe('open');

    jasmine.clock().tick(401);

    expect(cbs.onChangeState).toHaveBeenCalledTimes(1);
    expect(ins._drawer.element.style.zIndex).toBe('9999');
    expect(ins._drawer.element.style.opacity).toBe('1');
    expect(ins._drawer.element.style.webkitTransition).toBe('400ms cubic-bezier(0, 0.8, 0.95, 1)');
    expect(ins._drawer.element.style.webkitTransform).toBe('translate3d(-256px, 0, 0)');
    expect(ins._overlay.element.style.zIndex).toBe('9998');
    expect(ins._overlay.element.style.opacity).toBe('0.6');
    expect(ins._overlay.element.style.webkitTransitionDuration).toBe('400ms');

    ins.close();

    expect(ins.state).toBe('close');
    expect(ins._drawer.element.style.zIndex).toBe('9999');

    jasmine.clock().tick(401);

    expect(cbs.onChangeState).toHaveBeenCalledTimes(2);
    expect(ins._drawer.element.style.zIndex).toBe('-1');
    expect(ins._drawer.element.style.opacity).toBe('0');
    expect(ins._drawer.element.style.webkitTransition).toBe('400ms cubic-bezier(0, 0.8, 0.95, 1)');
    expect(ins._drawer.element.style.webkitTransform).toBe('translate3d(0px, 0, 0)');
    expect(ins._overlay.element.style.zIndex).toBe('-1');
    expect(ins._overlay.element.style.opacity).toBe('0');
    expect(ins._overlay.element.style.webkitTransitionDuration).toBe('400ms');

    ins.toggle();

    expect(ins.state).toBe('open');

    jasmine.clock().tick(401);

    expect(cbs.onChangeState).toHaveBeenCalledTimes(3);
    expect(ins._drawer.element.style.zIndex).toBe('9999');
    expect(ins._drawer.element.style.opacity).toBe('1');
    expect(ins._drawer.element.style.webkitTransition).toBe('400ms cubic-bezier(0, 0.8, 0.95, 1)');
    expect(ins._drawer.element.style.webkitTransform).toBe('translate3d(-256px, 0, 0)');
    expect(ins._overlay.element.style.zIndex).toBe('9998');
    expect(ins._overlay.element.style.opacity).toBe('0.6');
    expect(ins._overlay.element.style.webkitTransitionDuration).toBe('400ms');

    ins.toggle();

    expect(ins.state).toBe('close');
    expect(ins._drawer.element.style.zIndex).toBe('9999');

    jasmine.clock().tick(401);

    expect(cbs.onChangeState).toHaveBeenCalledTimes(4);
    expect(ins._drawer.element.style.zIndex).toBe('-1');
    expect(ins._drawer.element.style.opacity).toBe('0');
    expect(ins._drawer.element.style.webkitTransition).toBe('400ms cubic-bezier(0, 0.8, 0.95, 1)');
    expect(ins._drawer.element.style.webkitTransform).toBe('translate3d(0px, 0, 0)');
    expect(ins._overlay.element.style.zIndex).toBe('-1');
    expect(ins._overlay.element.style.opacity).toBe('0');
    expect(ins._overlay.element.style.webkitTransitionDuration).toBe('400ms');
  });
});

describe('Testing the callback on opened', () => {
  let ins = null;
  let elem = null;
  let cbs = null;

  beforeEach((done) => {
    // Size: 320x480
    window.resizeTo(320, 480);
    window.innerWidth = window.outerWidth = 320;
    window.innerHeight = window.outerHeight = 480;

    // Drawer element
    elem = document.createElement('div');
    elem.setAttribute('id', 'drawer');
    document.body.appendChild(elem);

    // Spy
    spyOn(window, 'addEventListener');

    cbs = jasmine.createSpyObj('callbacks', [
      'onCreate',
      'onDestroy',
      'onOpen',
      'onClose',
      'onChangeState',
    ]);

    // Setup instance
    ins = new Highendrawer(Object.assign(cbs, {
      element: elem,
    }));

    ins.open().then(done);
  });

  afterEach(() => {
    let drawer = document.getElementById('drawer');
    drawer.parentNode.removeChild(drawer);

    let overlay = ins._overlay.element;
    overlay.parentNode.removeChild(overlay);
  });

  it('Drawer should be opened when calling method', () => {
    expect(cbs.onOpen).toHaveBeenCalledTimes(1);
    expect(cbs.onClose).toHaveBeenCalledTimes(0);
    expect(cbs.onChangeState).toHaveBeenCalledTimes(1);
  });
});

describe('Testing the callback on closed', () => {
  let ins = null;
  let elem = null;
  let cbs = null;

  beforeEach((done) => {
    // Size: 320x480
    window.resizeTo(320, 480);
    window.innerWidth = window.outerWidth = 320;
    window.innerHeight = window.outerHeight = 480;

    // Drawer element
    elem = document.createElement('div');
    elem.setAttribute('id', 'drawer');
    document.body.appendChild(elem);

    // Spy
    spyOn(window, 'addEventListener');

    cbs = jasmine.createSpyObj('callbacks', [
      'onCreate',
      'onDestroy',
      'onOpen',
      'onClose',
      'onChangeState',
    ]);

    // Setup instance
    ins = new Highendrawer(Object.assign(cbs, {
      element: elem,
    }));

    ins.open().then(() => {
      ins.close().then(done);
    });
  });

  afterEach(() => {
    let drawer = document.getElementById('drawer');
    drawer.parentNode.removeChild(drawer);

    let overlay = ins._overlay.element;
    overlay.parentNode.removeChild(overlay);
  });

  it('Drawer should be closed when calling method', () => {
    expect(cbs.onOpen).toHaveBeenCalledTimes(1);
    expect(cbs.onClose).toHaveBeenCalledTimes(1);
    expect(cbs.onChangeState).toHaveBeenCalledTimes(2);
  });
});
