(function(window){

    'use strict';
    function defineDirectionalHover(){
        var self = {};

        // Default Options
        var options = {
            item: '.dh__item', // The Item Element
            container: '#dh__container', // The Container of the items
            overlay: '.dh__overlay', // The Overlay Element inside the item
            transition: 'easeInOutCubic',    // Transition Type
            speed: 300  // Transition Speed
        };  

        // Easing Function
        const EasingFunctions = {
          // no easing, no acceleration
          'linear': function (t) { return t },
          // accelerating from zero velocity
          'easeInQuad': function (t) { return t*t },
          // decelerating to zero velocity
          'easeOutQuad': function (t) { return t*(2-t) },
          // acceleration until halfway, then deceleration
          'easeInOutQuad': function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
          // accelerating from zero velocity 
          'easeInCubic': function (t) { return t*t*t },
          // decelerating to zero velocity 
          'easeOutCubic': function (t) { return (--t)*t*t+1 },
          // acceleration until halfway, then deceleration 
          'easeInOutCubic': function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
          // accelerating from zero velocity 
          'easeInQuart': function (t) { return t*t*t*t },
          // decelerating to zero velocity 
          'easeOutQuart': function (t) { return 1-(--t)*t*t*t },
          // acceleration until halfway, then deceleration
          'easeInOutQuart': function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
          // accelerating from zero velocity
          'easeInQuint': function (t) { return t*t*t*t*t },
          // decelerating to zero velocity
          'easeOutQuint': function (t) { return 1+(--t)*t*t*t*t },
          // acceleration until halfway, then deceleration 
          'easeInOutQuint': function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
           // elastic bounce effect at the beginning
          'easeInElastic': function (t) { return (.04 - .04 / t) * Math.sin(25 * t) + 1 },
          // elastic bounce effect at the end
          'easeOutElastic': function (t) { return .04 * t / (--t) * Math.sin(25 * t) },
          // elastic bounce effect at the beginning and end
          'easeInOutElastic': function (t) { return (t -= .5) < 0 ? (.01 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1 }
        };

        // Get the container/element of the 
        self.item = options.item;
        self.elements = document.querySelectorAll(self.item);

        // Create bit flags
        const FLAG_T = 1, // top
            FLAG_R = 2, // right
            FLAG_B = 4, // bottom
            FLAG_L = 8; // left

        // Create bit masks
        const tlMask = FLAG_T | FLAG_L,
            trMask = FLAG_T | FLAG_R,
            blMask = FLAG_B | FLAG_L,
            brMask = FLAG_B | FLAG_R;

        self.setOptions = function(opt){
            options = opt;
        }    

        self.slideOverlay = function(overlay, direction, px, py, ew, eh, ex, ey) {
            var cornerFlags = 0; // top|right|bottom|left

            if (py - ey <= eh / 2) cornerFlags ^= FLAG_T;
            if (px - ex >= ew / 2) cornerFlags ^= FLAG_R;
            if (py - ey >  eh / 2) cornerFlags ^= FLAG_B;
            if (px - ex <  ew / 2) cornerFlags ^= FLAG_L;
            self.findSide(cornerFlags, overlay, direction, px-ex, py-ey, ew/2, eh/2);
        }

        self.findSide = function(flags, overlay, direction, x, y, w, h) {
            if (self.testMask(flags, tlMask)) {
                self.testTopLeftToBottomRight(x, y, w, h) ? self.animate(overlay, direction, 0, -w*2) : self.animate(overlay, direction, -h*2, 0);
            }
            else if (self.testMask(flags, trMask)) {
                self.testBottomRightToTopLeft(x, y, w, h) ? self.animate(overlay, direction, -h*2, 0) : self.animate(overlay, direction, 0, w*2);
            }
            else if (self.testMask(flags, blMask)) {
                self.testBottomRightToTopLeft(x, y, w, h) ? self.animate(overlay, direction, 0, -w*2) : self.animate(overlay, direction, h*2, 0);
            }
            else if (self.testMask(flags, brMask)) {
                self.testTopLeftToBottomRight(x, y, w, h) ? self.animate(overlay, direction, h*2, 0) : self.animate(overlay, direction, 0, w*2);
            }
        }

        self.testMask = function(flags, mask) {
            return (flags & mask) === mask;
        }

        self.testTopLeftToBottomRight = function(x, y, w, h) {
            return (h * x - w * y) < 0;
        }

        self.testBottomRightToTopLeft = function(x, y, w, h) {
            return (w * (y-h) + h * x - w * h) < 0;
        }

        self.animate = function (overlay, direction, top, left){
            // Set the transition to the overlay                
            if (direction === 'in') {

                // First bring the overlay to the  position
                overlay.style.top = top + 'px';
                overlay.style.left = left + 'px';

                // Animate the Overlay to {0, 0} positoin
                self.animateHelper(function(t){
                    var currTop = parseFloat(overlay.style.top.replace(/(px|%)$/, '')), 
                        currLeft = parseFloat(overlay.style.left.replace(/(px|%)$/, ''));

                    overlay.style.top = (currTop - (currTop * t)) + 'px';
                    overlay.style.left = (currLeft - (currLeft * t)) + 'px';
                });


            }else if(direction == 'out'){

                // Bring the overlay to {0, 0} position
                overlay.style.top = 0;
                overlay.style.left = 0;

                // Animate the Overlay to {top, left} positoin
                self.animateHelper(function(t){
                    overlay.style.top = (top * t) + 'px';
                    overlay.style.left = (left * t) + 'px';
                });
            }
        }

        self.animateHelper = function(callback, duration = options.speed, easing = EasingFunctions[options.easing]) {

            // Total Duration of the Animation and the Animation function
            if (!duration) duration = 300;
            if (!easing) easing = EasingFunctions['linear'];

            var start = (new Date).getTime();
            var animation = function() {
                var t = easing(((new Date).getTime()-start)/duration);
                t <= 1 ? requestAnimationFrame(animation) : t = 1;
                callback(t, t === 1);
            };
            animation();
        }



        // Loop through the elements and initialize the effect
        for(var i = 0; i < self.elements.length; i++){

            // Current item 
            let item = self.elements[i];

            // Set Initial CSS Attributes to the Item
            item.style.position = 'relative';
            item.style.overflow = 'hidden';

            // Set Initial CSS Attributes to the overlay
            var child = item.querySelector(options.overlay);
            child.style.position = 'absolute';
            child.style.top = '-' + item.offsetHeight + 'px';
            child.style.left = '-' + item.offsetWidth + 'px';

            // Add the Events
            item.addEventListener('mouseenter', function(e){

                // Get the target and the Overlay
                child = e.target.querySelector(options.overlay);
                item = e.target;

                // If they are in a container (fix for if you want to have the effect in lets say container that isnt 100% width)
                var ex = e.pageX - item.parentNode.offsetLeft;
                var ey = e.pageY - item.parentNode.offsetTop;

                // On entering with the mouuse, initialize the 'in' effect (sliding in)
                self.slideOverlay(child, 'in', ex, ey, item.offsetWidth, item.offsetHeight,
                    Math.floor(item.offsetLeft), item.offsetTop, options);

            });

            item.addEventListener('mouseleave', function(e){

                // Get the target and the Overlay
                child = e.target.querySelector(options.overlay);
                item = e.target;

                // If they are in a container (fix for if you want to have the effect in lets say container that isnt 100% width)
                var ex = e.pageX - item.parentNode.offsetLeft;
                var ey = e.pageY - item.parentNode.offsetTop;

                // On entering with the mouuse, initialize the 'out' effect (sliding out)
                self.slideOverlay(child, 'out', ex, ey, item.offsetWidth, item.offsetHeight,
                    Math.floor(item.offsetLeft), item.offsetTop, options);
            });

        };

        return self;
    }

    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window.DirectionalHover = defineDirectionalHover();
    }

})(window);