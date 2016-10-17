'use strict';

import {hasstyle} from './helper';

/**
 * Browser support information.
 *
 * @type {Object}
 */
let sup = {};

sup.transform3d = hasstyle([
  'perspectiveProperty',
  'webkitPerspective',
  'mozPerspective',
  'oPerspective',
  'msPerspective',
]);

sup.transform = hasstyle([
  'transformProperty',
  'webkitTransform',
  'mozTransform',
  'oTransform',
  'msTransform',
]);

sup.transition = hasstyle([
  'transitionProperty',
  'webkitTransitionProperty',
  'mozTransitionProperty',
  'oTransitionProperty',
  'msTransitionProperty',
]);

sup.cssanim = (sup.transform3d || sup.transform) &&
  sup.transition;

sup.transrate = sup.transform3d ?
  'translate3d' :
  'translate';

/**
 * Browser support information.
 *
 * @type {Object}
 */
export const support = Object.freeze(sup);
