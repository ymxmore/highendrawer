import {hasStyle} from './helper';

/**
 * Browser support information.
 *
 * @type {Object}
 */
const sup = {};

sup.transform3d = hasStyle([
  'perspectiveProperty',
  'webkitPerspective',
  'mozPerspective',
  'oPerspective',
  'msPerspective',
]);

sup.transform = hasStyle([
  'transformProperty',
  'webkitTransform',
  'mozTransform',
  'oTransform',
  'msTransform',
]);

sup.transition = hasStyle([
  'transitionProperty',
  'webkitTransitionProperty',
  'mozTransitionProperty',
  'oTransitionProperty',
  'msTransitionProperty',
]);

sup.cssAnim = (sup.transform3d || sup.transform) &&
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
