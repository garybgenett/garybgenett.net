var f=this,k=function(a,b){var c=a.split("."),d=f;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var e;c.length&&(e=c.shift());)c.length||void 0===b?d=d[e]?d[e]:d[e]={}:d[e]=b},m=function(a,b){function c(){}c.prototype=b.prototype;a.o=b.prototype;a.prototype=new c;a.m=function(a,c,g){for(var u=Array(arguments.length-2),h=2;h<arguments.length;h++)u[h-2]=arguments[h];return b.prototype[c].apply(a,u)}};var n=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,n);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};m(n,Error);var aa=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")},p=String.prototype.trim?function(a){return a.trim()}:function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")},r=function(a,b){return a<b?-1:a>b?1:0};var t=function(a,b){b.unshift(a);n.call(this,aa.apply(null,b));b.shift()};m(t,n);var w=function(a,b,c){if(!a){var d="Assertion failed";if(b)var d=d+(": "+b),e=Array.prototype.slice.call(arguments,2);throw new t(""+d,e||[]);}};var x;a:{var y=f.navigator;if(y){var z=y.userAgent;if(z){x=z;break a}}x=""}var A=function(a){return-1!=x.indexOf(a)};var B=function(){return A("Opera")||A("OPR")};var ba=B(),C=A("Trident")||A("MSIE"),ca=A("Edge"),D=A("Gecko")&&!(-1!=x.toLowerCase().indexOf("webkit")&&!A("Edge"))&&!(A("Trident")||A("MSIE"))&&!A("Edge"),F=-1!=x.toLowerCase().indexOf("webkit")&&!A("Edge"),da=F&&A("Mobile"),ea=function(){var a=x;if(D)return/rv\:([^\);]+)(\)|;)/.exec(a);if(ca)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(F)return/WebKit\/(\S+)/.exec(a)},G=function(){var a=f.document;return a?a.documentMode:void 0},H=function(){if(ba&&f.opera){var a;
var b=f.opera.version;try{a=b()}catch(c){a=b}return a}a="";(b=ea())&&(a=b?b[1]:"");return C&&(b=G(),null!=b&&b>parseFloat(a))?String(b):a}(),I={},J=function(a){if(!I[a]){for(var b=0,c=p(String(H)).split("."),d=p(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var u=c[g]||"",h=d[g]||"",l=RegExp("(\\d*)(\\D*)","g"),E=RegExp("(\\d*)(\\D*)","g");do{var q=l.exec(u)||["","",""],v=E.exec(h)||["","",""];if(0==q[0].length&&0==v[0].length)break;b=r(0==q[1].length?0:parseInt(q[1],10),
0==v[1].length?0:parseInt(v[1],10))||r(0==q[2].length,0==v[2].length)||r(q[2],v[2])}while(0==b)}I[a]=0<=b}},K=f.document,fa=K&&C?G()||("CSS1Compat"==K.compatMode?parseInt(H,10):5):void 0;var L;if(!(L=!D&&!C)){var M;if(M=C)M=9<=Number(fa);L=M}L||D&&J("1.9.1");C&&J("9");var ga=A("Safari")&&!((A("Chrome")||A("CriOS"))&&!B()&&!A("Edge")||A("Coast")||B()||A("Edge")||A("Silk")||A("Android"))&&!(A("iPhone")&&!A("iPod")&&!A("iPad")||A("iPad")||A("iPod"));var O=function(a){var b=window;if(da&&ga&&b){b.focus();var c=0,d=null,d=b.setInterval(function(){a.closed||5==c?(b.clearInterval(d),N(a)):(a.close(),c++)},150)}else a.close(),N(a)},N=function(a){if(!a.closed&&a.document&&a.document.body)if(a=a.document.body,w(null!=a,"goog.dom.setTextContent expects a non-null value for node"),"textContent"in a)a.textContent="Please close this window.";else if(3==a.nodeType)a.data="Please close this window.";else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=
a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data="Please close this window."}else{for(var b;b=a.firstChild;)a.removeChild(b);w(a,"Node cannot be null or undefined.");a.appendChild((9==a.nodeType?a:a.ownerDocument||a.document).createTextNode("Please close this window."))}};var P,Q=function(a){a=a||[];for(var b=[],c=0,d=a.length;c<d;++c){var e=String(a[c]||"");e&&b.push(e)}if(!b.length)return null;P?P.reset.call(P):P=shindig.sha1();P.update.call(P,b.join(" "));return P.digestString.call(P).toLowerCase()},R=function(a,b,c){this.i=String(a||"");this.f=String(b||"");this.a=String(c||"");this.b={};this.j=this.l=this.g=this.h="";this.c=null};
R.prototype.evaluate=function(){var a={},b="";try{b=String(document.cookie||"")}catch(u){}for(var b=b.split("; ").join(";").split(";"),c=0,d=b.length;c<d;++c){var e=b[c],g=e.indexOf("=");-1!=g?a[e.substr(0,g)]=e.substr(g+1):a[e]=null}this.b=a;if(this.b.SID)if(this.f=this.f.split(".")[0].split("@")[0],a="",a=0==this.i.indexOf("https://")?"SAPISID":"APISID",this.g=String(this.b[a]||""))if(a="",a=0==gadgets.rpc.getOrigin(String(window.location.href)).indexOf("https://")?"SAPISID":"APISID",this.h=String(this.b[a]||
"")){b=String(this.b.LSOLH||"").split(":");c=b.length;if(1==c||4==c)this.l=b[0];if(3==c||4==c)a=String(b[c-3]||""),b=String(b[c-1]||""),(c=Q([a,this.h]).substr(0,4))&&c==b&&(this.j=a);this.a&&(a=this.a.indexOf("."),-1!=a&&(a=this.a.substr(0,a)||"",this.a=a+"."+Q([this.g,this.i,this.f,this.l,this.j,a]).substr(0,4)));a=Q([this.g,this.i,this.f,this.a]);this.a&&(a=a+"."+this.a);this.c=a}else this.c="";else this.c=""};
var ha=function(a,b,c){a=new R(a,b,c);a.evaluate();return a},S=function(a,b,c){c=c||ia(this);var d=null;if(a){a=String(a);var e=a.indexOf(".");-1!=e&&(d=a.substr(e+1))}b=ha(c,b,d).c;if(null==a||""==a)a=b==a;else if(null==b||b.length!=a.length)a=!1;else{d=c=0;for(e=a.length;d<e;++d)c|=a.charCodeAt(d)^b.charCodeAt(d);a=0==c}return a},T=function(a,b,c){c=c||ia(this);c=ha(c);if(String(a)!=c.c)throw Error("Unauthorized request");b=String(b);a=parseInt(b,10);String(a)==b&&0<=a?(b=c.j)?(b=b.split("|"),a=
b.length<=a?null:b[a]||null):a=null:a=null;return a},ia=function(a){a=String(a.origin||"");if(!a)throw Error("RPC has no origin.");return a};k("checkSessionState",S);k("getVersionInfo",T);var U,V,W,X,Y,Z,ja=window,ka=(window.location.href||ja.location.href).match(/.*(\?|#|&)usegapi=([^&#]+)/)||[];
"1"===decodeURIComponent(ka[ka.length-1]||"")?(W=function(a,b,c,d,e,g){U.send(b,e,d,g||gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)},X=function(a,b){U.register(a,b,gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)},Y=function(a){var b=/^(?:https?:\/\/)?[0-9.\-A-Za-z]+(?::\d+)?/.exec(a),b=gapi.iframes.makeWhiteListIframesFilter([b?b[0]:null]);W("..","oauth2callback",gadgets.rpc.getAuthToken(".."),void 0,a,b)},V=function(){la()},Z=function(){W("..","oauth2relayReady",gadgets.rpc.getAuthToken(".."));X("check_session_state",
ma);X("get_versioninfo",na)}):(W=function(a,b,c,d,e){gadgets.rpc.call(a,b+":"+c,d,e)},X=function(a,b){gadgets.rpc.register(a,b)},Y=function(a){gadgets.rpc.getTargetOrigin("..")==gadgets.rpc.getOrigin(a)&&W("..","oauth2callback",gadgets.rpc.getAuthToken(".."),void 0,a)},V=function(){Z()},Z=function(){W("..","oauth2relayReady",gadgets.rpc.getAuthToken(".."));X("check_session_state",S);X("get_versioninfo",T)});
var la=function(){var a=Z;window.gapi.load("gapi.iframes",function(){U=gapi.iframes.getContext().getParentIframe();a()})},oa=function(a){window.setTimeout(function(){Y(a)},1)},ma=function(a){var b,c;a&&(b=a.session_state,c=a.client_id);return S(b,c,U.getOrigin())},na=function(a){return T(a.xapisidHash,a.sessionIndex,U.getOrigin())};k("oauth2callback",oa);
k("oauth2verify",function(a,b){var c=window.open("javascript:void(0);",a),d;if(c&&!c.closed&&(d=c.oauth2callbackUrl))return window.timeoutMap=window.timeoutMap||{},window.realSetTimeout=window.realSetTimeout||window.setTimeout,window.setTimeout=function(a,b){try{var d=a,h=!1,l;a=function(){if(!h){h=!0;try{window.timeoutMap[String(l)]=void 0,delete window.timeoutMap[String(l)]}catch(a){}return d.call(this)}};var E=c.setTimeout(a,b);l=window.realSetTimeout(a,b);window.timeoutMap[String(l)]=E;return l}catch(q){}return window.realSetTimeout(a,
b)},window.realClearTimeout=window.realClearTimeout||window.clearTimeout,window.clearTimeout=function(a){try{var b=window.timeoutMap[String(a)];b&&c.clearTimeout(b)}catch(d){}try{window.timeoutMap[String(a)]=void 0,delete window.timeoutMap[String(a)]}catch(d){}window.realClearTimeout(a)},oa(String(d)),"keep_open"!=b&&O(c),!0;c&&!c.closed&&O(c);return!1});window.addEventListener?window.addEventListener("load",V,!1):window.attachEvent("onload",V);
