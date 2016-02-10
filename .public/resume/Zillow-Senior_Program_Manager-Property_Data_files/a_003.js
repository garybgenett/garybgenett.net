System.register("z-plugin-nav-scrolling",["base-build","plugin","node-base","node-pluginhost","z-event-handle-manager","anim-base","anim-easing","z-event-outside","yui-instance"],function(t){"use strict";var e,n,o,i;return{setters:[function(t){},function(t){},function(t){},function(t){},function(t){},function(t){},function(t){},function(t){},function(t){e=t["default"]}],execute:function(){n=e.config.win,o=e.UA.touchEnabled?"touchstart":"mouseenter",i=e.UA.touchEnabled?"touchstartoutside":"mouseleave",e.namespace("Z.Plugin").NavScrolling=e.Base.create("navScrolling",e.Plugin.Base,[e.Z.EventHandleManager],{throttle:e.Z.throttle,_previousScrollY:null,initializer:function(){var t=this.get("host");this.get("scroller");this.get("preventScrollBubbling")&&"touchstartoutside"==i&&e.Z.Event.defineOutside("touchstart"),this.addHandle(t.after("nav:open",this._afterNavOpen,this))},destructor:function(){this.removeHandles()},_scrollToTop:function(t){var n,o=Array.prototype.slice,i=(this.get("scrollMargin"),this._getNewScrollTop(t)),l=this.get("scrollAnimation"),a=e.one(e.Node.getDOMNode(t.get("offsetParent")));i=0>=i?0:i,i!==a.get("scrollTop")&&(l.setAttrs({node:a,to:{scrollTop:i}}),n=[t,a],arguments.length>1&&n.push.apply(o.call(arguments,1)),this.addHandle(l.once("end",this._afterAnimationComplete,this,n)),l.run())},_preventScrollBubbling:function(t){"absolute"===t.getStyle("position"),this.addHandle(this.get("outsideTarget").on(o,this._onNavInteractionStart,this))},_getNewScrollTop:function(t){var e=this.get("scrollMargin");return t.get("offsetTop")-(e&&e.top?e.top:0)},_getValueFn:function(t,e){return"function"==typeof t?t.call(t,this):t},_onNavInteractionStart:function(t){var n=e.one("win");this._winScrollHandle=n.after("scroll",this._onScrollBubble,this,n.get("scrollTop")),this.addHandle(this.get("outsideTarget").on(i,this._onNavInteractionEnd,this))},_onNavInteractionEnd:function(t){this._winScrollHandle&&this._winScrollHandle.detach()},_onScrollBubble:function(t,n){e.one("win").set("scrollTop",n),e.log("_onScrollBubble","debug","Nav")},_afterNavOpen:function(t){(this.get("autoScrollEnabled")||!this.get("wideNavCapable"))&&e.later(this.get("autoScrollDelay"),this,this._scrollToTop,[t.navTarget,4]),this.get("preventScrollBubbling")&&this._preventScrollBubbling(t.navTarget)},_afterAnimationComplete:function(t,e,n,o){o-=1,o>0&&this._scrollToTop(e,o)}},{NAME:"NavScrolling",NS:"navScrolling",ATTRS:{autoScrollEnabled:{value:!0,setter:"_getValueFn"},scrollMargin:{value:0,setter:function(t){return"string"==typeof t||"number"==typeof t?{top:t,right:t,bottom:t,left:t}:t}},scrollAnimation:{value:{duration:.2,easing:e.Easing.easeOut},setter:function(t){return t&&t.run?t:new e.Anim(t)}},viewportWidth:{getter:function(t){return t||this.get("host").get("viewportRegion").width},readOnly:!0},autoScrollDelay:{value:450},preventScrollBubbling:{value:!1},wideNavCapable:{value:!1}}})}}});
System.register("anim-base",["base-base","node-style","color-base","yui-instance"],function(t){"";var i,e,n,s,r,a,o,u,m,h,_,f,A,c,l,d;return{setters:[function(t){},function(t){},function(t){},function(t){i=t["default"]}],execute:function(){e="anim-base",n="running",s="startTime",r="elapsedTime",a="start",o="tween",u="end",m="node",h="paused",_="reverse",f="iterationCount",A=Number,c={},i.Anim=function(){i.Anim.superclass.constructor.apply(this,arguments),i.Anim._instances[i.stamp(this)]=this},i.Anim.NAME="anim",i.Anim._instances={},i.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,i.Anim.DEFAULT_UNIT="px",i.Anim.DEFAULT_EASING=function(t,i,e,n){return e*t/n+i},i.Anim._intervalTime=20,i.Anim.behaviors={left:{get:function(t,i){return t._getOffset(i)}}},i.Anim.behaviors.top=i.Anim.behaviors.left,i.Anim.DEFAULT_SETTER=function(t,e,n,s,r,a,o,u){var m=t._node,h=m._node,_=o(r,A(n),A(s)-A(n),a);h?"style"in h&&(e in h.style||e in i.DOM.CUSTOM_STYLES)?(u=u||"",m.setStyle(e,_+u)):"attributes"in h&&e in h.attributes?m.setAttribute(e,_):e in h&&(h[e]=_):m.set?m.set(e,_):e in m&&(m[e]=_)},i.Anim.DEFAULT_GETTER=function(t,e){var n=t._node,s=n._node,r="";return s?"style"in s&&(e in s.style||e in i.DOM.CUSTOM_STYLES)?r=n.getComputedStyle(e):"attributes"in s&&e in s.attributes?r=n.getAttribute(e):e in s&&(r=s[e]):n.get?r=n.get(e):e in n&&(r=n[e]),r},i.Anim.ATTRS={node:{setter:function(t){return t&&("string"==typeof t||t.nodeType)&&(t=i.one(t)),this._node=t,t}},duration:{value:1},easing:{value:i.Anim.DEFAULT_EASING,setter:function(t){return"string"==typeof t&&i.Easing?i.Easing[t]:void 0}},from:{},to:{},startTime:{value:0,readOnly:!0},elapsedTime:{value:0,readOnly:!0},running:{getter:function(){return!!c[i.stamp(this)]},value:!1,readOnly:!0},iterations:{value:1},iterationCount:{value:0,readOnly:!0},direction:{value:"normal"},paused:{readOnly:!0,value:!1},reverse:{value:!1}},i.Anim.run=function(){var t,e=i.Anim._instances;for(t in e)e[t].run&&e[t].run()},i.Anim.pause=function(){for(var t in c)c[t].pause&&c[t].pause();i.Anim._stopTimer()},i.Anim.stop=function(){for(var t in c)c[t].stop&&c[t].stop();i.Anim._stopTimer()},i.Anim._startTimer=function(){l||(l=setInterval(i.Anim._runFrame,i.Anim._intervalTime))},i.Anim._stopTimer=function(){clearInterval(l),l=0},i.Anim._runFrame=function(){var t,e=!0;for(t in c)c[t]._runFrame&&(e=!1,c[t]._runFrame());e&&i.Anim._stopTimer()},i.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/,d={run:function(){return this.get(h)?this._resume():this.get(n)||this._start(),this},pause:function(){return this.get(n)&&this._pause(),this},stop:function(t){return(this.get(n)||this.get(h))&&this._end(t),this},_added:!1,_start:function(){this._set(s,new Date-this.get(r)),this._actualFrames=0,this.get(h)||this._initAnimAttr(),c[i.stamp(this)]=this,i.Anim._startTimer(),this.fire(a)},_pause:function(){this._set(s,null),this._set(h,!0),delete c[i.stamp(this)],this.fire("pause")},_resume:function(){this._set(h,!1),c[i.stamp(this)]=this,this._set(s,new Date-this.get(r)),i.Anim._startTimer(),this.fire("resume")},_end:function(t){var e=1e3*this.get("duration");t&&this._runAttrs(e,e,this.get(_)),this._set(s,null),this._set(r,0),this._set(h,!1),delete c[i.stamp(this)],this.fire(u,{elapsed:this.get(r)})},_runFrame:function(){var t=this._runtimeAttr.duration,i=new Date-this.get(s),e=this.get(_),n=i>=t;this._runAttrs(i,t,e),this._actualFrames+=1,this._set(r,i),this.fire(o),n&&this._lastFrame()},_runAttrs:function(t,e,n){var s,r,a,o=this._runtimeAttr,u=i.Anim.behaviors,m=o.easing,h=e,_=!1;t>=e&&(_=!0),n&&(t=e-t,h=0);for(a in o)o[a].to&&(s=o[a],r=a in u&&"set"in u[a]?u[a].set:i.Anim.DEFAULT_SETTER,_?r(this,a,s.from,s.to,h,e,m,s.unit):r(this,a,s.from,s.to,t,e,m,s.unit))},_lastFrame:function(){var t=this.get("iterations"),i=this.get(f);i+=1,"infinite"===t||t>i?("alternate"===this.get("direction")&&this.set(_,!this.get(_)),this.fire("iteration")):(i=0,this._end()),this._set(s,new Date),this._set(f,i)},_initAnimAttr:function(){var t,e,n,s=this.get("from")||{},r=this.get("to")||{},a={duration:1e3*this.get("duration"),easing:this.get("easing")},o=i.Anim.behaviors,u=this.get(m);i.each(r,function(r,m){"function"==typeof r&&(r=r.call(this,u)),e=s[m],void 0===e?e=m in o&&"get"in o[m]?o[m].get(this,m):i.Anim.DEFAULT_GETTER(this,m):"function"==typeof e&&(e=e.call(this,u));var h=i.Anim.RE_UNITS.exec(e),_=i.Anim.RE_UNITS.exec(r);return e=h?h[1]:e,n=_?_[1]:r,t=_?_[2]:h?h[2]:"",!t&&i.Anim.RE_DEFAULT_UNIT.test(m)&&(t=i.Anim.DEFAULT_UNIT),e&&n?void(a[m]={from:i.Lang.isObject(e)?i.clone(e):e,to:n,unit:t}):void i.error('invalid "from" or "to" for "'+m+'"',"Anim")},this),this._runtimeAttr=a},_getOffset:function(t){var i,e=this._node,n=e.getComputedStyle(t),s="left"===t?"getX":"getY",r="left"===t?"setX":"setY";return"auto"===n&&(i=e.getStyle("position"),"absolute"===i||"fixed"===i?(n=e[s](),e[r](n)):n=0),n},destructor:function(){delete i.Anim._instances[i.stamp(this)]}},i.extend(i.Anim,i.Base,d)}}});
System.register("color-base",["yui-base","yui-instance"],function(r){"";var o,e,t,n,a,f,l;return{setters:[function(r){},function(r){o=r["default"]}],execute:function(){e="color-base",t=/^#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})(\ufffe)?/,n=/^#?([\da-fA-F]{1})([\da-fA-F]{1})([\da-fA-F]{1})(\ufffe)?/,a=/rgba?\(([\d]{1,3}), ?([\d]{1,3}), ?([\d]{1,3}),? ?([.\d]*)?\)/,f={HEX:"hex",RGB:"rgb",RGBA:"rgba"},l={hex:"toHex",rgb:"toRGB",rgba:"toRGBA"},o.Color={KEYWORDS:{black:"000",silver:"c0c0c0",gray:"808080",white:"fff",maroon:"800000",red:"f00",purple:"800080",fuchsia:"f0f",green:"008000",lime:"0f0",olive:"808000",yellow:"ff0",navy:"000080",blue:"00f",teal:"008080",aqua:"0ff"},REGEX_HEX:t,REGEX_HEX3:n,REGEX_RGB:a,re_RGB:a,re_hex:t,re_hex3:n,STR_HEX:"#{*}{*}{*}",STR_RGB:"rgb({*}, {*}, {*})",STR_RGBA:"rgba({*}, {*}, {*}, {*})",TYPES:f,CONVERTS:l,convert:function(r,e){var t=o.Color.CONVERTS[e.toLowerCase()],n=r;return t&&o.Color[t]&&(n=o.Color[t](r)),n},toHex:function(r){var e=o.Color._convertTo(r,"hex"),t="transparent"===e.toLowerCase();return"#"===e.charAt(0)||t||(e="#"+e),t?e.toLowerCase():e.toUpperCase()},toRGB:function(r){var e=o.Color._convertTo(r,"rgb");return e.toLowerCase()},toRGBA:function(r){var e=o.Color._convertTo(r,"rgba");return e.toLowerCase()},toArray:function(r){var e,t,n,a,f=o.Color.findType(r).toUpperCase();return"HEX"===f&&r.length<5&&(f="HEX3"),"A"===f.charAt(f.length-1)&&(f=f.slice(0,-1)),e=o.Color["REGEX_"+f],e&&(t=e.exec(r)||[],n=t.length,n&&(t.shift(),n--,"HEX3"===f&&(t[0]+=t[0],t[1]+=t[1],t[2]+=t[2]),a=t[n-1],a||(t[n-1]=1))),t},fromArray:function(r,e){if(r=r.concat(),"undefined"==typeof e)return r.join(", ");var t="{*}";for(e=o.Color["STR_"+e.toUpperCase()],3===r.length&&4===e.match(/\{\*\}/g).length&&r.push(1);e.indexOf(t)>=0&&r.length>0;)e=e.replace(t,r.shift());return e},findType:function(r){if(o.Color.KEYWORDS[r])return"keyword";var e,t=r.indexOf("(");return t>0&&(e=r.substr(0,t)),e&&o.Color.TYPES[e.toUpperCase()]?o.Color.TYPES[e.toUpperCase()]:"hex"},_getAlpha:function(r){var e,t=o.Color.toArray(r);return t.length>3&&(e=t.pop()),+e||1},_keywordToHex:function(r){var e=o.Color.KEYWORDS[r];return e?e:void 0},_convertTo:function(r,e){if("transparent"===r)return r;var t,n,a,f,l=o.Color.findType(r),c=e;return"keyword"===l&&(r=o.Color._keywordToHex(r),l="hex"),"hex"===l&&r.length<5&&("#"===r.charAt(0)&&(r=r.substr(1)),r="#"+r.charAt(0)+r.charAt(0)+r.charAt(1)+r.charAt(1)+r.charAt(2)+r.charAt(2)),l===e?r:("a"===l.charAt(l.length-1)&&(l=l.slice(0,-1)),t="a"===e.charAt(e.length-1),t&&(e=e.slice(0,-1),n=o.Color._getAlpha(r)),f=e.charAt(0).toUpperCase()+e.substr(1).toLowerCase(),a=o.Color["_"+l+"To"+f],a||"rgb"!==l&&"rgb"!==e&&(r=o.Color["_"+l+"ToRgb"](r),l="rgb",a=o.Color["_"+l+"To"+f]),a&&(r=a(r,t)),t&&(o.Lang.isArray(r)||(r=o.Color.toArray(r)),r.push(n),r=o.Color.fromArray(r,c.toUpperCase())),r)},_hexToRgb:function(r,o){var e,t,n;return"#"===r.charAt(0)&&(r=r.substr(1)),r=parseInt(r,16),e=r>>16,t=r>>8&255,n=255&r,o?[e,t,n]:"rgb("+e+", "+t+", "+n+")"},_rgbToHex:function(r){var e=o.Color.toArray(r),t=e[2]|e[1]<<8|e[0]<<16;for(t=(+t).toString(16);t.length<6;)t="0"+t;return"#"+t}}}}});
System.register("anim-easing",["anim-base","yui-instance"],function(n){"";var t,e,a;return{setters:[function(n){},function(n){t=n["default"]}],execute:function(){e="anim-easing",a={easeNone:function(n,t,e,a){return e*n/a+t},easeIn:function(n,t,e,a){return e*(n/=a)*n+t},easeOut:function(n,t,e,a){return-e*(n/=a)*(n-2)+t},easeBoth:function(n,t,e,a){return(n/=a/2)<1?e/2*n*n+t:-e/2*(--n*(n-2)-1)+t},easeInStrong:function(n,t,e,a){return e*(n/=a)*n*n*n+t},easeOutStrong:function(n,t,e,a){return-e*((n=n/a-1)*n*n*n-1)+t},easeBothStrong:function(n,t,e,a){return(n/=a/2)<1?e/2*n*n*n*n+t:-e/2*((n-=2)*n*n*n-2)+t},elasticIn:function(n,t,e,a,u,i){var r;return 0===n?t:1===(n/=a)?t+e:(i||(i=.3*a),!u||u<Math.abs(e)?(u=e,r=i/4):r=i/(2*Math.PI)*Math.asin(e/u),-(u*Math.pow(2,10*(n-=1))*Math.sin((n*a-r)*(2*Math.PI)/i))+t)},elasticOut:function(n,t,e,a,u,i){var r;return 0===n?t:1===(n/=a)?t+e:(i||(i=.3*a),!u||u<Math.abs(e)?(u=e,r=i/4):r=i/(2*Math.PI)*Math.asin(e/u),u*Math.pow(2,-10*n)*Math.sin((n*a-r)*(2*Math.PI)/i)+e+t)},elasticBoth:function(n,t,e,a,u,i){var r;return 0===n?t:2===(n/=a/2)?t+e:(i||(i=a*(.3*1.5)),!u||u<Math.abs(e)?(u=e,r=i/4):r=i/(2*Math.PI)*Math.asin(e/u),1>n?-.5*(u*Math.pow(2,10*(n-=1))*Math.sin((n*a-r)*(2*Math.PI)/i))+t:u*Math.pow(2,-10*(n-=1))*Math.sin((n*a-r)*(2*Math.PI)/i)*.5+e+t)},backIn:function(n,t,e,a,u){return void 0===u&&(u=1.70158),n===a&&(n-=.001),e*(n/=a)*n*((u+1)*n-u)+t},backOut:function(n,t,e,a,u){return"undefined"==typeof u&&(u=1.70158),e*((n=n/a-1)*n*((u+1)*n+u)+1)+t},backBoth:function(n,t,e,a,u){return"undefined"==typeof u&&(u=1.70158),(n/=a/2)<1?e/2*(n*n*(((u*=1.525)+1)*n-u))+t:e/2*((n-=2)*n*(((u*=1.525)+1)*n+u)+2)+t},bounceIn:function(n,e,a,u){return a-t.Easing.bounceOut(u-n,0,a,u)+e},bounceOut:function(n,t,e,a){return(n/=a)<1/2.75?e*(7.5625*n*n)+t:2/2.75>n?e*(7.5625*(n-=1.5/2.75)*n+.75)+t:2.5/2.75>n?e*(7.5625*(n-=2.25/2.75)*n+.9375)+t:e*(7.5625*(n-=2.625/2.75)*n+.984375)+t},bounceBoth:function(n,e,a,u){return u/2>n?.5*t.Easing.bounceIn(2*n,0,a,u)+e:.5*t.Easing.bounceOut(2*n-u,0,a,u)+.5*a+e}},t.Easing=a}}});
//# sourceMappingURL=/l/maps/?modules=z-plugin-nav-scrolling,anim-base,color-base,anim-easing
typeof _womboResponse === 'function' && _womboResponse({hash:'79f8685069f803c89840bf7eeaf914fdc32e9202'})