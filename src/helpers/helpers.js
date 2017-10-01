const Helpers = {

  slideOverlay: (overlay, direction, px, py, ew, eh, ex, ey, options) => {
    var cornerFlags = 0 // top|right|bottom|left

    if (py - ey <= eh / 2) cornerFlags ^= FLAG_T
    if (px - ex >= ew / 2) cornerFlags ^= FLAG_R
    if (py - ey > eh / 2) cornerFlags ^= FLAG_B
    if (px - ex < ew / 2) cornerFlags ^= FLAG_L
    findSide(cornerFlags, overlay, direction, px - ex, py - ey, ew / 2, eh / 2, options)
  },
}
export default Helpers

/*
|--------------------------------------------------------------------------
| Functions:
| findSide: Find the Side
| testMask: Helper function to find which side is the mouse event coming from
| testTopLeftToBottomRight, testBottomRightToTopLeft: Some math calculations you dont care about.
| animate: Javascript animation function
| animateHelper: Helper function for generating animations
| getParents: Helper function for getting parent's node
|--------------------------------------------------------------------------
*/

const findSide = (flags, overlay, direction, x, y, w, h, options) => {
  if (testMask(flags, tlMask)) {
    testTopLeftToBottomRight(x, y, w, h) ? animate(overlay, direction, 0, -w * 2, options) : animate(overlay, direction, -h * 2, 0, options)
  } else if (testMask(flags, trMask)) {
    testBottomRightToTopLeft(x, y, w, h) ? animate(overlay, direction, -h * 2, 0, options) : animate(overlay, direction, 0, w * 2, options)
  } else if (testMask(flags, blMask)) {
    testBottomRightToTopLeft(x, y, w, h) ? animate(overlay, direction, 0, -w * 2, options) : animate(overlay, direction, h * 2, 0, options)
  } else if (testMask(flags, brMask)) {
    testTopLeftToBottomRight(x, y, w, h) ? animate(overlay, direction, h * 2, 0, options) : animate(overlay, direction, 0, w * 2, options)
  }
}

const testMask = (flags, mask) => {
  return (flags & mask) === mask
}

const testTopLeftToBottomRight = (x, y, w, h) => {
  return (h * x - w * y) < 0
}

const testBottomRightToTopLeft = (x, y, w, h) => {
  return (w * (y - h) + h * x - w * h) < 0
}

const animate = (overlay, direction, top, left) => {
    // Set the transition to the overlay
  if (direction === 'in') {
    // First bring the overlay to the  position
    overlay.style.top = top + 'px'
    overlay.style.left = left + 'px'

    // Animate the Overlay to {0, 0} positoin
    animateHelper(function (t) {
      var currTop = parseFloat(overlay.style.top.replace(/(px|%)$/, ''))
      var currLeft = parseFloat(overlay.style.left.replace(/(px|%)$/, ''))

      overlay.style.top = (currTop - (currTop * t)) + 'px'
      overlay.style.left = (currLeft - (currLeft * t)) + 'px'
    })
  } else if (direction === 'out') {
    // Bring the overlay to {0, 0} position
    overlay.style.top = 0
    overlay.style.left = 0

    // Animate the Overlay to {top, left} positoin
    animateHelper(function (t) {
      overlay.style.top = (top * t) + 'px'
      overlay.style.left = (left * t) + 'px'
    })
    // Round Fix
    currLeft = parseFloat(overlay.style.left.replace(/(px|%)$/, '');
    overlay.style.left = (currLeft > 0) ? currLeft + 1 + 'px' : currLeft - 1 + 'px'
  }
}

const animateHelper = (callback, duration, easing, options) => {
    // Total Duration of the Animation and the Animation function
  if (!duration) duration = 300
  if (!easing) easing = EasingFunctions['linear']

  var start = (new Date()).getTime()
  var animation = function () {
    var t = easing(((new Date()).getTime() - start) / duration)
    t <= 1 ? requestAnimationFrame(animation) : t = 1
    callback(t, t === 1)
  }
  animation()
}

/*
|--------------------------------------------------------------------------
| Constants: Bit Flags, Bit Masks, Easing Functions
|--------------------------------------------------------------------------
*/
const FLAG_T = 1 // top
const FLAG_R = 2 // right
const FLAG_B = 4 // bottom
const FLAG_L = 8 // left

const tlMask = FLAG_T | FLAG_L
const trMask = FLAG_T | FLAG_R
const blMask = FLAG_B | FLAG_L
const brMask = FLAG_B | FLAG_R

const EasingFunctions = {
  // no easing, no acceleration
  'linear': function (t) { return t },
  // accelerating from zero velocity
  'easeInQuad': function (t) { return t * t },
  // decelerating to zero velocity
  'easeOutQuad': function (t) { return t * (2 - t) },
  // acceleration until halfway, then deceleration
  'easeInOutQuad': function (t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t },
  // accelerating from zero velocity
  'easeInCubic': function (t) { return t * t * t },
  // decelerating to zero velocity
  'easeOutCubic': function (t) { return (--t) * t * t + 1 },
  // acceleration until halfway, then deceleration
  'easeInOutCubic': function (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 },
  // accelerating from zero velocity
  'easeInQuart': function (t) { return t * t * t * t },
  // decelerating to zero velocity
  'easeOutQuart': function (t) { return 1 - (--t) * t * t * t },
  // acceleration until halfway, then deceleration
  'easeInOutQuart': function (t) { return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t },
  // accelerating from zero velocity
  'easeInQuint': function (t) { return t * t * t * t * t },
  // decelerating to zero velocity
  'easeOutQuint': function (t) { return 1 + (--t) * t * t * t * t },
  // acceleration until halfway, then deceleration
  'easeInOutQuint': function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t },
   // elastic bounce effect at the beginning
  'easeInElastic': function (t) { return (0.04 - 0.04 / t) * Math.sin(25 * t) + 1 },
  // elastic bounce effect at the end
  'easeOutElastic': function (t) { return 0.04 * t / (--t) * Math.sin(25 * t) },
  // elastic bounce effect at the beginning and end
  'easeInOutElastic': function (t) { return (t -= 0.5) < 0 ? (0.01 + 0.01 / t) * Math.sin(50 * t) : (0.02 - 0.01 / t) * Math.sin(50 * t) + 1 },
}
