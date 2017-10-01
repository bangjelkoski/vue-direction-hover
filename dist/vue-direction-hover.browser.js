!function(root,factory){"object"==typeof exports&&"object"==typeof module?module.exports=factory():"function"==typeof define&&define.amd?define([],factory):"object"==typeof exports?exports.VueDirectionHover=factory():root.VueDirectionHover=factory()}(this,function(){return function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={i:moduleId,l:!1,exports:{}};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.l=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.i=function(value){return value},__webpack_require__.d=function(exports,name,getter){__webpack_require__.o(exports,name)||Object.defineProperty(exports,name,{configurable:!1,enumerable:!0,get:getter})},__webpack_require__.n=function(module){var getter=module&&module.__esModule?function(){return module.default}:function(){return module};return __webpack_require__.d(getter,"a",getter),getter},__webpack_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=7)}([function(module,exports){module.exports=function(rawScriptExports,compiledTemplate,scopeId,cssModules){var esModule,scriptExports=rawScriptExports=rawScriptExports||{},type=typeof rawScriptExports.default;"object"!==type&&"function"!==type||(esModule=rawScriptExports,scriptExports=rawScriptExports.default);var options="function"==typeof scriptExports?scriptExports.options:scriptExports;if(compiledTemplate&&(options.render=compiledTemplate.render,options.staticRenderFns=compiledTemplate.staticRenderFns),scopeId&&(options._scopeId=scopeId),cssModules){var computed=options.computed||(options.computed={});Object.keys(cssModules).forEach(function(key){var module=cssModules[key];computed[key]=function(){return module}})}return{esModule:esModule,exports:scriptExports,options:options}}},function(module,exports){var g,_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj};g=function(){return this}();try{g=g||Function("return this")()||(0,eval)("this")}catch(e){"object"===("undefined"==typeof window?"undefined":_typeof(window))&&(g=window)}module.exports=g},function(module,exports,__webpack_require__){__webpack_require__(9);var Component=__webpack_require__(0)(__webpack_require__(4),__webpack_require__(11),"data-v-5b7d54ea",null);module.exports=Component.exports},function(module,exports,__webpack_require__){__webpack_require__(8);var Component=__webpack_require__(0)(__webpack_require__(5),__webpack_require__(10),"data-v-213a7c84",null);module.exports=Component.exports},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),__webpack_exports__.default={name:"VueDirectionHover",data:function(){return{options:{container:"",transition:"",speed:""}}},props:{container:{default:"body",type:String},transition:{default:"linear",type:String},speed:{default:300,type:Number}},created:function(){this.options.container=this.container,this.options.transition=this.transition,this.options.speed=this.speed}}},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0});var __WEBPACK_IMPORTED_MODULE_0__helpers_helpers__=__webpack_require__(6);__webpack_exports__.default={name:"VueDirectionHoverItem",data:function(){return{options:{item:".dh__item",container:"",overlay:".dh__overlay",transition:"",speed:""}}},props:{link:{type:String,default:"#"},image:{type:String,default:"/"},target:{type:Boolean,default:!0},itemClass:{type:String,default:""}},methods:{getOptions:function(parent){this.options.transition=parent.options.transition,this.options.speed=parent.options.speed,this.options.container=parent.options.container}},mounted:function(){this.getOptions(this.$parent);var item=this.$el,child=item.querySelector(this.options.overlay);child.style.top="-"+item.offsetHeight+"px",child.style.left="-"+item.offsetWidth+"px";var self=this;item.addEventListener("mouseenter",function(e){child=self.$el.querySelector(self.options.overlay),item=self.$el;var parent=document.querySelector(self.options.container),ex=e.pageX-parent.offsetLeft,ey=e.pageY-parent.offsetTop;__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__.a.slideOverlay(child,"in",ex,ey,item.offsetWidth,item.offsetHeight,Math.floor(item.offsetLeft),item.offsetTop,self.options)}),item.addEventListener("mouseleave",function(e){child=self.$el.querySelector(self.options.overlay),item=self.$el;var parent=document.querySelector(self.options.container),ex=e.pageX-parent.offsetLeft,ey=e.pageY-parent.offsetTop;__WEBPACK_IMPORTED_MODULE_0__helpers_helpers__.a.slideOverlay(child,"out",ex,ey,item.offsetWidth,item.offsetHeight,Math.floor(item.offsetLeft),item.offsetTop,self.options)})}}},function(module,__webpack_exports__,__webpack_require__){"use strict";var Helpers={slideOverlay:function(overlay,direction,px,py,ew,eh,ex,ey,options){var cornerFlags=0;py-ey<=eh/2&&(cornerFlags^=FLAG_T),px-ex>=ew/2&&(cornerFlags^=FLAG_R),py-ey>eh/2&&(cornerFlags^=FLAG_B),px-ex<ew/2&&(cornerFlags^=FLAG_L),findSide(cornerFlags,overlay,direction,px-ex,py-ey,ew/2,eh/2,options)}};__webpack_exports__.a=Helpers;var findSide=function(flags,overlay,direction,x,y,w,h,options){testMask(flags,tlMask)?testTopLeftToBottomRight(x,y,w,h)?animate(overlay,direction,0,2*-w,options):animate(overlay,direction,2*-h,0,options):testMask(flags,trMask)?testBottomRightToTopLeft(x,y,w,h)?animate(overlay,direction,2*-h,0,options):animate(overlay,direction,0,2*w,options):testMask(flags,blMask)?testBottomRightToTopLeft(x,y,w,h)?animate(overlay,direction,0,2*-w,options):animate(overlay,direction,2*h,0,options):testMask(flags,brMask)&&(testTopLeftToBottomRight(x,y,w,h)?animate(overlay,direction,2*h,0,options):animate(overlay,direction,0,2*w,options))},testMask=function(flags,mask){return(flags&mask)===mask},testTopLeftToBottomRight=function(x,y,w,h){return h*x-w*y<0},testBottomRightToTopLeft=function(x,y,w,h){return w*(y-h)+h*x-w*h<0},animate=function(overlay,direction,top,left){if("in"===direction)overlay.style.top=top+"px",overlay.style.left=left+"px",animateHelper(function(t){var currTop=parseFloat(overlay.style.top.replace(/(px|%)$/,"")),currLeft=parseFloat(overlay.style.left.replace(/(px|%)$/,""));overlay.style.top=currTop-currTop*t+"px",overlay.style.left=currLeft-currLeft*t+"px"});else if("out"===direction){overlay.style.top=0,overlay.style.left=0,animateHelper(function(t){overlay.style.top=top*t+"px",overlay.style.left=left*t+"px"});var currLeft=parseFloat(overlay.style.left.replace(/(px|%)$/,""));overlay.style.left=currLeft>0?currLeft+1+"px":currLeft-1+"px"}},animateHelper=function(callback,duration,easing,options){duration||(duration=300),easing||(easing=EasingFunctions.linear);var start=(new Date).getTime();!function animation(){var t=easing(((new Date).getTime()-start)/duration);t<=1?requestAnimationFrame(animation):t=1,callback(t,1===t)}()},FLAG_T=1,FLAG_R=2,FLAG_B=4,FLAG_L=8,tlMask=FLAG_T|FLAG_L,trMask=FLAG_T|FLAG_R,blMask=FLAG_B|FLAG_L,brMask=FLAG_B|FLAG_R,EasingFunctions={linear:function(t){return t},easeInQuad:function(t){return t*t},easeOutQuad:function(t){return t*(2-t)},easeInOutQuad:function(t){return t<.5?2*t*t:(4-2*t)*t-1},easeInCubic:function(t){return t*t*t},easeOutCubic:function(t){return--t*t*t+1},easeInOutCubic:function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1},easeInQuart:function(t){return t*t*t*t},easeOutQuart:function(t){return 1- --t*t*t*t},easeInOutQuart:function(t){return t<.5?8*t*t*t*t:1-8*--t*t*t*t},easeInQuint:function(t){return t*t*t*t*t},easeOutQuint:function(t){return 1+--t*t*t*t*t},easeInOutQuint:function(t){return t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t},easeInElastic:function(t){return(.04-.04/t)*Math.sin(25*t)+1},easeOutElastic:function(t){return.04*t/--t*Math.sin(25*t)},easeInOutElastic:function(t){return(t-=.5)<0?(.01+.01/t)*Math.sin(50*t):(.02-.01/t)*Math.sin(50*t)+1}}},function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:!0}),function(global){function install(Vue){Vue.component("vue-dh",__WEBPACK_IMPORTED_MODULE_0__components_VueDirectionHover_vue___default.a),Vue.component("vue-dh-item",__WEBPACK_IMPORTED_MODULE_1__components_VueDirectionHoverItem_vue___default.a)}__webpack_exports__.install=install;var __WEBPACK_IMPORTED_MODULE_0__components_VueDirectionHover_vue__=__webpack_require__(2),__WEBPACK_IMPORTED_MODULE_0__components_VueDirectionHover_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_VueDirectionHover_vue__),__WEBPACK_IMPORTED_MODULE_1__components_VueDirectionHoverItem_vue__=__webpack_require__(3),__WEBPACK_IMPORTED_MODULE_1__components_VueDirectionHoverItem_vue___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_VueDirectionHoverItem_vue__);__webpack_require__.d(__webpack_exports__,"VueDirectionHover",function(){return __WEBPACK_IMPORTED_MODULE_0__components_VueDirectionHover_vue___default.a});var plugin={version:"0.0.3",install:install};__webpack_exports__.default=plugin;var GlobalVue=null;"undefined"!=typeof window?GlobalVue=window.Vue:void 0!==global&&(GlobalVue=global.Vue),GlobalVue&&GlobalVue.use(plugin)}.call(__webpack_exports__,__webpack_require__(1))},function(module,exports){},function(module,exports){},function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement,_c=_vm._self._c||_h;return _c("div",{class:["dh__item",_vm.itemClass]},[_c("a",{attrs:{href:_vm.link,target:_vm.target?"_blank":"_self"}},[_c("img",{staticClass:"dh__image",attrs:{src:_vm.image}}),_vm._v(" "),_c("div",{staticClass:"dh__overlay"},[_vm._t("overlay")],2)])])},staticRenderFns:[]}},function(module,exports){module.exports={render:function(){var _vm=this,_h=_vm.$createElement;return(_vm._self._c||_h)("div",{attrs:{id:"dh__container"}},[_vm._t("default")],2)},staticRenderFns:[]}}])});