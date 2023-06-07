(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=o(i);fetch(i.href,s)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};window.Vaadin.featureFlags.exampleFeatureFlag=!1;window.Vaadin.featureFlags.collaborationEngineBackend=!1;window.Vaadin.featureFlags.themeEditor=!1;window.Vaadin.featureFlags.sideNavComponent=!0;const Ii="modulepreload",Ri=function(t,e){return new URL(t,e).href},Zo={},x=function(e,o,n){if(!o||o.length===0)return e();const i=document.getElementsByTagName("link");return Promise.all(o.map(s=>{if(s=Ri(s,n),s in Zo)return;Zo[s]=!0;const r=s.endsWith(".css"),l=r?'[rel="stylesheet"]':"";if(!!n)for(let c=i.length-1;c>=0;c--){const m=i[c];if(m.href===s&&(!r||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${s}"]${l}`))return;const d=document.createElement("link");if(d.rel=r?"stylesheet":Ii,r||(d.as="script",d.crossOrigin=""),d.href=s,document.head.appendChild(d),r)return new Promise((c,m)=>{d.addEventListener("load",c),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${s}`)))})})).then(()=>e())};function _t(t){return t=t||[],Array.isArray(t)?t:[t]}function Y(t){return`[Vaadin.Router] ${t}`}function Oi(t){if(typeof t!="object")return String(t);const e=Object.prototype.toString.call(t).match(/ (.*)\]$/)[1];return e==="Object"||e==="Array"?`${e} ${JSON.stringify(t)}`:e}const wt="module",St="nomodule",_o=[wt,St];function en(t){if(!t.match(/.+\.[m]?js$/))throw new Error(Y(`Unsupported type for bundle "${t}": .js or .mjs expected.`))}function Jn(t){if(!t||!K(t.path))throw new Error(Y('Expected route config to be an object with a "path" string property, or an array of such objects'));const e=t.bundle,o=["component","redirect","bundle"];if(!ge(t.action)&&!Array.isArray(t.children)&&!ge(t.children)&&!xt(e)&&!o.some(n=>K(t[n])))throw new Error(Y(`Expected route config "${t.path}" to include either "${o.join('", "')}" or "action" function but none found.`));if(e)if(K(e))en(e);else if(_o.some(n=>n in e))_o.forEach(n=>n in e&&en(e[n]));else throw new Error(Y('Expected route bundle to include either "'+St+'" or "'+wt+'" keys, or both'));t.redirect&&["bundle","component"].forEach(n=>{n in t&&console.warn(Y(`Route config "${t.path}" has both "redirect" and "${n}" properties, and "redirect" will always override the latter. Did you mean to only use "${n}"?`))})}function tn(t){_t(t).forEach(e=>Jn(e))}function on(t,e){let o=document.head.querySelector('script[src="'+t+'"][async]');return o||(o=document.createElement("script"),o.setAttribute("src",t),e===wt?o.setAttribute("type",wt):e===St&&o.setAttribute(St,""),o.async=!0),new Promise((n,i)=>{o.onreadystatechange=o.onload=s=>{o.__dynamicImportLoaded=!0,n(s)},o.onerror=s=>{o.parentNode&&o.parentNode.removeChild(o),i(s)},o.parentNode===null?document.head.appendChild(o):o.__dynamicImportLoaded&&n()})}function Li(t){return K(t)?on(t):Promise.race(_o.filter(e=>e in t).map(e=>on(t[e],e)))}function Fe(t,e){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${t}`,{cancelable:t==="go",detail:e}))}function xt(t){return typeof t=="object"&&!!t}function ge(t){return typeof t=="function"}function K(t){return typeof t=="string"}function Xn(t){const e=new Error(Y(`Page not found (${t.pathname})`));return e.context=t,e.code=404,e}const Pe=new class{};function Mi(t){const e=t.port,o=t.protocol,s=o==="http:"&&e==="80"||o==="https:"&&e==="443"?t.hostname:t.host;return`${o}//${s}`}function nn(t){if(t.defaultPrevented||t.button!==0||t.shiftKey||t.ctrlKey||t.altKey||t.metaKey)return;let e=t.target;const o=t.composedPath?t.composedPath():t.path||[];for(let l=0;l<o.length;l++){const a=o[l];if(a.nodeName&&a.nodeName.toLowerCase()==="a"){e=a;break}}for(;e&&e.nodeName.toLowerCase()!=="a";)e=e.parentNode;if(!e||e.nodeName.toLowerCase()!=="a"||e.target&&e.target.toLowerCase()!=="_self"||e.hasAttribute("download")||e.hasAttribute("router-ignore")||e.pathname===window.location.pathname&&e.hash!==""||(e.origin||Mi(e))!==window.location.origin)return;const{pathname:i,search:s,hash:r}=e;Fe("go",{pathname:i,search:s,hash:r})&&(t.preventDefault(),t&&t.type==="click"&&window.scrollTo(0,0))}const Vi={activate(){window.document.addEventListener("click",nn)},inactivate(){window.document.removeEventListener("click",nn)}},Di=/Trident/.test(navigator.userAgent);Di&&!ge(window.PopStateEvent)&&(window.PopStateEvent=function(t,e){e=e||{};var o=document.createEvent("Event");return o.initEvent(t,!!e.bubbles,!!e.cancelable),o.state=e.state||null,o},window.PopStateEvent.prototype=window.Event.prototype);function sn(t){if(t.state==="vaadin-router-ignore")return;const{pathname:e,search:o,hash:n}=window.location;Fe("go",{pathname:e,search:o,hash:n})}const zi={activate(){window.addEventListener("popstate",sn)},inactivate(){window.removeEventListener("popstate",sn)}};var De=ni,Ui=No,ji=qi,Fi=ei,Bi=oi,Qn="/",Zn="./",Hi=new RegExp(["(\\\\.)","(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?"].join("|"),"g");function No(t,e){for(var o=[],n=0,i=0,s="",r=e&&e.delimiter||Qn,l=e&&e.delimiters||Zn,a=!1,d;(d=Hi.exec(t))!==null;){var c=d[0],m=d[1],h=d.index;if(s+=t.slice(i,h),i=h+c.length,m){s+=m[1],a=!0;continue}var f="",se=t[i],re=d[2],te=d[3],Ut=d[4],B=d[5];if(!a&&s.length){var X=s.length-1;l.indexOf(s[X])>-1&&(f=s[X],s=s.slice(0,X))}s&&(o.push(s),s="",a=!1);var Se=f!==""&&se!==void 0&&se!==f,xe=B==="+"||B==="*",jt=B==="?"||B==="*",oe=f||r,nt=te||Ut;o.push({name:re||n++,prefix:f,delimiter:oe,optional:jt,repeat:xe,partial:Se,pattern:nt?Wi(nt):"[^"+ae(oe)+"]+?"})}return(s||i<t.length)&&o.push(s+t.substr(i)),o}function qi(t,e){return ei(No(t,e))}function ei(t){for(var e=new Array(t.length),o=0;o<t.length;o++)typeof t[o]=="object"&&(e[o]=new RegExp("^(?:"+t[o].pattern+")$"));return function(n,i){for(var s="",r=i&&i.encode||encodeURIComponent,l=0;l<t.length;l++){var a=t[l];if(typeof a=="string"){s+=a;continue}var d=n?n[a.name]:void 0,c;if(Array.isArray(d)){if(!a.repeat)throw new TypeError('Expected "'+a.name+'" to not repeat, but got array');if(d.length===0){if(a.optional)continue;throw new TypeError('Expected "'+a.name+'" to not be empty')}for(var m=0;m<d.length;m++){if(c=r(d[m],a),!e[l].test(c))throw new TypeError('Expected all "'+a.name+'" to match "'+a.pattern+'"');s+=(m===0?a.prefix:a.delimiter)+c}continue}if(typeof d=="string"||typeof d=="number"||typeof d=="boolean"){if(c=r(String(d),a),!e[l].test(c))throw new TypeError('Expected "'+a.name+'" to match "'+a.pattern+'", but got "'+c+'"');s+=a.prefix+c;continue}if(a.optional){a.partial&&(s+=a.prefix);continue}throw new TypeError('Expected "'+a.name+'" to be '+(a.repeat?"an array":"a string"))}return s}}function ae(t){return t.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function Wi(t){return t.replace(/([=!:$/()])/g,"\\$1")}function ti(t){return t&&t.sensitive?"":"i"}function Gi(t,e){if(!e)return t;var o=t.source.match(/\((?!\?)/g);if(o)for(var n=0;n<o.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,pattern:null});return t}function Ki(t,e,o){for(var n=[],i=0;i<t.length;i++)n.push(ni(t[i],e,o).source);return new RegExp("(?:"+n.join("|")+")",ti(o))}function Yi(t,e,o){return oi(No(t,o),e,o)}function oi(t,e,o){o=o||{};for(var n=o.strict,i=o.start!==!1,s=o.end!==!1,r=ae(o.delimiter||Qn),l=o.delimiters||Zn,a=[].concat(o.endsWith||[]).map(ae).concat("$").join("|"),d=i?"^":"",c=t.length===0,m=0;m<t.length;m++){var h=t[m];if(typeof h=="string")d+=ae(h),c=m===t.length-1&&l.indexOf(h[h.length-1])>-1;else{var f=h.repeat?"(?:"+h.pattern+")(?:"+ae(h.delimiter)+"(?:"+h.pattern+"))*":h.pattern;e&&e.push(h),h.optional?h.partial?d+=ae(h.prefix)+"("+f+")?":d+="(?:"+ae(h.prefix)+"("+f+"))?":d+=ae(h.prefix)+"("+f+")"}}return s?(n||(d+="(?:"+r+")?"),d+=a==="$"?"$":"(?="+a+")"):(n||(d+="(?:"+r+"(?="+a+"))?"),c||(d+="(?="+r+"|"+a+")")),new RegExp(d,ti(o))}function ni(t,e,o){return t instanceof RegExp?Gi(t,e):Array.isArray(t)?Ki(t,e,o):Yi(t,e,o)}De.parse=Ui;De.compile=ji;De.tokensToFunction=Fi;De.tokensToRegExp=Bi;const{hasOwnProperty:Ji}=Object.prototype,wo=new Map;wo.set("|false",{keys:[],pattern:/(?:)/});function rn(t){try{return decodeURIComponent(t)}catch{return t}}function Xi(t,e,o,n,i){o=!!o;const s=`${t}|${o}`;let r=wo.get(s);if(!r){const d=[];r={keys:d,pattern:De(t,d,{end:o,strict:t===""})},wo.set(s,r)}const l=r.pattern.exec(e);if(!l)return null;const a=Object.assign({},i);for(let d=1;d<l.length;d++){const c=r.keys[d-1],m=c.name,h=l[d];(h!==void 0||!Ji.call(a,m))&&(c.repeat?a[m]=h?h.split(c.delimiter).map(rn):[]:a[m]=h&&rn(h))}return{path:l[0],keys:(n||[]).concat(r.keys),params:a}}function ii(t,e,o,n,i){let s,r,l=0,a=t.path||"";return a.charAt(0)==="/"&&(o&&(a=a.substr(1)),o=!0),{next(d){if(t===d)return{done:!0};const c=t.__children=t.__children||t.children;if(!s&&(s=Xi(a,e,!c,n,i),s))return{done:!1,value:{route:t,keys:s.keys,params:s.params,path:s.path}};if(s&&c)for(;l<c.length;){if(!r){const h=c[l];h.parent=t;let f=s.path.length;f>0&&e.charAt(f)==="/"&&(f+=1),r=ii(h,e.substr(f),o,s.keys,s.params)}const m=r.next(d);if(!m.done)return{done:!1,value:m.value};r=null,l++}return{done:!0}}}}function Qi(t){if(ge(t.route.action))return t.route.action(t)}function Zi(t,e){let o=e;for(;o;)if(o=o.parent,o===t)return!0;return!1}function es(t){let e=`Path '${t.pathname}' is not properly resolved due to an error.`;const o=(t.route||{}).path;return o&&(e+=` Resolution had failed on route: '${o}'`),e}function ts(t,e){const{route:o,path:n}=e;if(o&&!o.__synthetic){const i={path:n,route:o};if(!t.chain)t.chain=[];else if(o.parent){let s=t.chain.length;for(;s--&&t.chain[s].route&&t.chain[s].route!==o.parent;)t.chain.pop()}t.chain.push(i)}}class He{constructor(e,o={}){if(Object(e)!==e)throw new TypeError("Invalid routes");this.baseUrl=o.baseUrl||"",this.errorHandler=o.errorHandler,this.resolveRoute=o.resolveRoute||Qi,this.context=Object.assign({resolver:this},o.context),this.root=Array.isArray(e)?{path:"",__children:e,parent:null,__synthetic:!0}:e,this.root.parent=null}getRoutes(){return[...this.root.__children]}setRoutes(e){tn(e);const o=[..._t(e)];this.root.__children=o}addRoutes(e){return tn(e),this.root.__children.push(..._t(e)),this.getRoutes()}removeRoutes(){this.setRoutes([])}resolve(e){const o=Object.assign({},this.context,K(e)?{pathname:e}:e),n=ii(this.root,this.__normalizePathname(o.pathname),this.baseUrl),i=this.resolveRoute;let s=null,r=null,l=o;function a(d,c=s.value.route,m){const h=m===null&&s.value.route;return s=r||n.next(h),r=null,!d&&(s.done||!Zi(c,s.value.route))?(r=s,Promise.resolve(Pe)):s.done?Promise.reject(Xn(o)):(l=Object.assign(l?{chain:l.chain?l.chain.slice(0):[]}:{},o,s.value),ts(l,s.value),Promise.resolve(i(l)).then(f=>f!=null&&f!==Pe?(l.result=f.result||f,l):a(d,c,f)))}return o.next=a,Promise.resolve().then(()=>a(!0,this.root)).catch(d=>{const c=es(l);if(d?console.warn(c):d=new Error(c),d.context=d.context||l,d instanceof DOMException||(d.code=d.code||500),this.errorHandler)return l.result=this.errorHandler(d),l;throw d})}static __createUrl(e,o){return new URL(e,o)}get __effectiveBaseUrl(){return this.baseUrl?this.constructor.__createUrl(this.baseUrl,document.baseURI||document.URL).href.replace(/[^\/]*$/,""):""}__normalizePathname(e){if(!this.baseUrl)return e;const o=this.__effectiveBaseUrl,n=this.constructor.__createUrl(e,o).href;if(n.slice(0,o.length)===o)return n.slice(o.length)}}He.pathToRegexp=De;const{pathToRegexp:an}=He,ln=new Map;function si(t,e,o){const n=e.name||e.component;if(n&&(t.has(n)?t.get(n).push(e):t.set(n,[e])),Array.isArray(o))for(let i=0;i<o.length;i++){const s=o[i];s.parent=e,si(t,s,s.__children||s.children)}}function dn(t,e){const o=t.get(e);if(o&&o.length>1)throw new Error(`Duplicate route with name "${e}". Try seting unique 'name' route properties.`);return o&&o[0]}function cn(t){let e=t.path;return e=Array.isArray(e)?e[0]:e,e!==void 0?e:""}function os(t,e={}){if(!(t instanceof He))throw new TypeError("An instance of Resolver is expected");const o=new Map;return(n,i)=>{let s=dn(o,n);if(!s&&(o.clear(),si(o,t.root,t.root.__children),s=dn(o,n),!s))throw new Error(`Route "${n}" not found`);let r=ln.get(s.fullPath);if(!r){let a=cn(s),d=s.parent;for(;d;){const f=cn(d);f&&(a=f.replace(/\/$/,"")+"/"+a.replace(/^\//,"")),d=d.parent}const c=an.parse(a),m=an.tokensToFunction(c),h=Object.create(null);for(let f=0;f<c.length;f++)K(c[f])||(h[c[f].name]=!0);r={toPath:m,keys:h},ln.set(a,r),s.fullPath=a}let l=r.toPath(i,e)||"/";if(e.stringifyQueryParams&&i){const a={},d=Object.keys(i);for(let m=0;m<d.length;m++){const h=d[m];r.keys[h]||(a[h]=i[h])}const c=e.stringifyQueryParams(a);c&&(l+=c.charAt(0)==="?"?c:`?${c}`)}return l}}let hn=[];function ns(t){hn.forEach(e=>e.inactivate()),t.forEach(e=>e.activate()),hn=t}const is=t=>{const e=getComputedStyle(t).getPropertyValue("animation-name");return e&&e!=="none"},ss=(t,e)=>{const o=()=>{t.removeEventListener("animationend",o),e()};t.addEventListener("animationend",o)};function un(t,e){return t.classList.add(e),new Promise(o=>{if(is(t)){const n=t.getBoundingClientRect(),i=`height: ${n.bottom-n.top}px; width: ${n.right-n.left}px`;t.setAttribute("style",`position: absolute; ${i}`),ss(t,()=>{t.classList.remove(e),t.removeAttribute("style"),o()})}else t.classList.remove(e),o()})}const rs=256;function qt(t){return t!=null}function as(t){const e=Object.assign({},t);return delete e.next,e}function W({pathname:t="",search:e="",hash:o="",chain:n=[],params:i={},redirectFrom:s,resolver:r},l){const a=n.map(d=>d.route);return{baseUrl:r&&r.baseUrl||"",pathname:t,search:e,hash:o,routes:a,route:l||a.length&&a[a.length-1]||null,params:i,redirectFrom:s,getUrl:(d={})=>mt(le.pathToRegexp.compile(ri(a))(Object.assign({},i,d)),r)}}function pn(t,e){const o=Object.assign({},t.params);return{redirect:{pathname:e,from:t.pathname,params:o}}}function ls(t,e){e.location=W(t);const o=t.chain.map(n=>n.route).indexOf(t.route);return t.chain[o].element=e,e}function pt(t,e,o){if(ge(t))return t.apply(o,e)}function mn(t,e,o){return n=>{if(n&&(n.cancel||n.redirect))return n;if(o)return pt(o[t],e,o)}}function ds(t,e){if(!Array.isArray(t)&&!xt(t))throw new Error(Y(`Incorrect "children" value for the route ${e.path}: expected array or object, but got ${t}`));e.__children=[];const o=_t(t);for(let n=0;n<o.length;n++)Jn(o[n]),e.__children.push(o[n])}function lt(t){if(t&&t.length){const e=t[0].parentNode;for(let o=0;o<t.length;o++)e.removeChild(t[o])}}function mt(t,e){const o=e.__effectiveBaseUrl;return o?e.constructor.__createUrl(t.replace(/^\//,""),o).pathname:t}function ri(t){return t.map(e=>e.path).reduce((e,o)=>o.length?e.replace(/\/$/,"")+"/"+o.replace(/^\//,""):e,"")}class le extends He{constructor(e,o){const n=document.head.querySelector("base"),i=n&&n.getAttribute("href");super([],Object.assign({baseUrl:i&&He.__createUrl(i,document.URL).pathname.replace(/[^\/]*$/,"")},o)),this.resolveRoute=r=>this.__resolveRoute(r);const s=le.NavigationTrigger;le.setTriggers.apply(le,Object.keys(s).map(r=>s[r])),this.baseUrl,this.ready,this.ready=Promise.resolve(e),this.location,this.location=W({resolver:this}),this.__lastStartedRenderId=0,this.__navigationEventHandler=this.__onNavigationEvent.bind(this),this.setOutlet(e),this.subscribe(),this.__createdByRouter=new WeakMap,this.__addedByRouter=new WeakMap}__resolveRoute(e){const o=e.route;let n=Promise.resolve();ge(o.children)&&(n=n.then(()=>o.children(as(e))).then(s=>{!qt(s)&&!ge(o.children)&&(s=o.children),ds(s,o)}));const i={redirect:s=>pn(e,s),component:s=>{const r=document.createElement(s);return this.__createdByRouter.set(r,!0),r}};return n.then(()=>{if(this.__isLatestRender(e))return pt(o.action,[e,i],o)}).then(s=>{if(qt(s)&&(s instanceof HTMLElement||s.redirect||s===Pe))return s;if(K(o.redirect))return i.redirect(o.redirect);if(o.bundle)return Li(o.bundle).then(()=>{},()=>{throw new Error(Y(`Bundle not found: ${o.bundle}. Check if the file name is correct`))})}).then(s=>{if(qt(s))return s;if(K(o.component))return i.component(o.component)})}setOutlet(e){e&&this.__ensureOutlet(e),this.__outlet=e}getOutlet(){return this.__outlet}setRoutes(e,o=!1){return this.__previousContext=void 0,this.__urlForName=void 0,super.setRoutes(e),o||this.__onNavigationEvent(),this.ready}render(e,o){const n=++this.__lastStartedRenderId,i=Object.assign({search:"",hash:""},K(e)?{pathname:e}:e,{__renderId:n});return this.ready=this.resolve(i).then(s=>this.__fullyResolveChain(s)).then(s=>{if(this.__isLatestRender(s)){const r=this.__previousContext;if(s===r)return this.__updateBrowserHistory(r,!0),this.location;if(this.location=W(s),o&&this.__updateBrowserHistory(s,n===1),Fe("location-changed",{router:this,location:this.location}),s.__skipAttach)return this.__copyUnchangedElements(s,r),this.__previousContext=s,this.location;this.__addAppearingContent(s,r);const l=this.__animateIfNeeded(s);return this.__runOnAfterEnterCallbacks(s),this.__runOnAfterLeaveCallbacks(s,r),l.then(()=>{if(this.__isLatestRender(s))return this.__removeDisappearingContent(),this.__previousContext=s,this.location})}}).catch(s=>{if(n===this.__lastStartedRenderId)throw o&&this.__updateBrowserHistory(i),lt(this.__outlet&&this.__outlet.children),this.location=W(Object.assign(i,{resolver:this})),Fe("error",Object.assign({router:this,error:s},i)),s}),this.ready}__fullyResolveChain(e,o=e){return this.__findComponentContextAfterAllRedirects(o).then(n=>{const s=n!==o?n:e,l=mt(ri(n.chain),n.resolver)===n.pathname,a=(d,c=d.route,m)=>d.next(void 0,c,m).then(h=>h===null||h===Pe?l?d:c.parent!==null?a(d,c.parent,h):h:h);return a(n).then(d=>{if(d===null||d===Pe)throw Xn(s);return d&&d!==Pe&&d!==n?this.__fullyResolveChain(s,d):this.__amendWithOnBeforeCallbacks(n)})})}__findComponentContextAfterAllRedirects(e){const o=e.result;return o instanceof HTMLElement?(ls(e,o),Promise.resolve(e)):o.redirect?this.__redirect(o.redirect,e.__redirectCount,e.__renderId).then(n=>this.__findComponentContextAfterAllRedirects(n)):o instanceof Error?Promise.reject(o):Promise.reject(new Error(Y(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${Oi(o)}". Double check the action return value for the route.`)))}__amendWithOnBeforeCallbacks(e){return this.__runOnBeforeCallbacks(e).then(o=>o===this.__previousContext||o===e?o:this.__fullyResolveChain(o))}__runOnBeforeCallbacks(e){const o=this.__previousContext||{},n=o.chain||[],i=e.chain;let s=Promise.resolve();const r=()=>({cancel:!0}),l=a=>pn(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,n.length){for(let a=0;a<Math.min(n.length,i.length)&&!(n[a].route!==i[a].route||n[a].path!==i[a].path&&n[a].element!==i[a].element||!this.__isReusableElement(n[a].element,i[a].element));a=++e.__divergedChainIndex);if(e.__skipAttach=i.length===n.length&&e.__divergedChainIndex==i.length&&this.__isReusableElement(e.result,o.result),e.__skipAttach){for(let a=i.length-1;a>=0;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},n[a]);for(let a=0;a<i.length;a++)s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},i[a]),n[a].element.location=W(e,n[a].route)}else for(let a=n.length-1;a>=e.__divergedChainIndex;a--)s=this.__runOnBeforeLeaveCallbacks(s,e,{prevent:r},n[a])}if(!e.__skipAttach)for(let a=0;a<i.length;a++)a<e.__divergedChainIndex?a<n.length&&n[a].element&&(n[a].element.location=W(e,n[a].route)):(s=this.__runOnBeforeEnterCallbacks(s,e,{prevent:r,redirect:l},i[a]),i[a].element&&(i[a].element.location=W(e,i[a].route)));return s.then(a=>{if(a){if(a.cancel)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if(a.redirect)return this.__redirect(a.redirect,e.__redirectCount,e.__renderId)}return e})}__runOnBeforeLeaveCallbacks(e,o,n,i){const s=W(o);return e.then(r=>{if(this.__isLatestRender(o))return mn("onBeforeLeave",[s,n,this],i.element)(r)}).then(r=>{if(!(r||{}).redirect)return r})}__runOnBeforeEnterCallbacks(e,o,n,i){const s=W(o,i.route);return e.then(r=>{if(this.__isLatestRender(o))return mn("onBeforeEnter",[s,n,this],i.element)(r)})}__isReusableElement(e,o){return e&&o?this.__createdByRouter.get(e)&&this.__createdByRouter.get(o)?e.localName===o.localName:e===o:!1}__isLatestRender(e){return e.__renderId===this.__lastStartedRenderId}__redirect(e,o,n){if(o>rs)throw new Error(Y(`Too many redirects when rendering ${e.from}`));return this.resolve({pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:(o||0)+1,__renderId:n})}__ensureOutlet(e=this.__outlet){if(!(e instanceof Node))throw new TypeError(Y(`Expected router outlet to be a valid DOM Node (but got ${e})`))}__updateBrowserHistory({pathname:e,search:o="",hash:n=""},i){if(window.location.pathname!==e||window.location.search!==o||window.location.hash!==n){const s=i?"replaceState":"pushState";window.history[s](null,document.title,e+o+n),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}}__copyUnchangedElements(e,o){let n=this.__outlet;for(let i=0;i<e.__divergedChainIndex;i++){const s=o&&o.chain[i].element;if(s)if(s.parentNode===n)e.chain[i].element=s,n=s;else break}return n}__addAppearingContent(e,o){this.__ensureOutlet(),this.__removeAppearingContent();const n=this.__copyUnchangedElements(e,o);this.__appearingContent=[],this.__disappearingContent=Array.from(n.children).filter(s=>this.__addedByRouter.get(s)&&s!==e.result);let i=n;for(let s=e.__divergedChainIndex;s<e.chain.length;s++){const r=e.chain[s].element;r&&(i.appendChild(r),this.__addedByRouter.set(r,!0),i===n&&this.__appearingContent.push(r),i=r)}}__removeDisappearingContent(){this.__disappearingContent&&lt(this.__disappearingContent),this.__disappearingContent=null,this.__appearingContent=null}__removeAppearingContent(){this.__disappearingContent&&this.__appearingContent&&(lt(this.__appearingContent),this.__disappearingContent=null,this.__appearingContent=null)}__runOnAfterLeaveCallbacks(e,o){if(o)for(let n=o.chain.length-1;n>=e.__divergedChainIndex&&this.__isLatestRender(e);n--){const i=o.chain[n].element;if(i)try{const s=W(e);pt(i.onAfterLeave,[s,{},o.resolver],i)}finally{this.__disappearingContent.indexOf(i)>-1&&lt(i.children)}}}__runOnAfterEnterCallbacks(e){for(let o=e.__divergedChainIndex;o<e.chain.length&&this.__isLatestRender(e);o++){const n=e.chain[o].element||{},i=W(e,e.chain[o].route);pt(n.onAfterEnter,[i,{},e.resolver],n)}}__animateIfNeeded(e){const o=(this.__disappearingContent||[])[0],n=(this.__appearingContent||[])[0],i=[],s=e.chain;let r;for(let l=s.length;l>0;l--)if(s[l-1].route.animate){r=s[l-1].route.animate;break}if(o&&n&&r){const l=xt(r)&&r.leave||"leaving",a=xt(r)&&r.enter||"entering";i.push(un(o,l)),i.push(un(n,a))}return Promise.all(i).then(()=>e)}subscribe(){window.addEventListener("vaadin-router-go",this.__navigationEventHandler)}unsubscribe(){window.removeEventListener("vaadin-router-go",this.__navigationEventHandler)}__onNavigationEvent(e){const{pathname:o,search:n,hash:i}=e?e.detail:window.location;K(this.__normalizePathname(o))&&(e&&e.preventDefault&&e.preventDefault(),this.render({pathname:o,search:n,hash:i},!0))}static setTriggers(...e){ns(e)}urlForName(e,o){return this.__urlForName||(this.__urlForName=os(this)),mt(this.__urlForName(e,o),this)}urlForPath(e,o){return mt(le.pathToRegexp.compile(e)(o),this)}static go(e){const{pathname:o,search:n,hash:i}=K(e)?this.__createUrl(e,"http://a"):e;return Fe("go",{pathname:o,search:n,hash:i})}}const cs=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ft=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function hs(){function t(){return!0}return ai(t)}function us(){try{return ps()?!0:ms()?ft?!fs():!hs():!1}catch{return!1}}function ps(){return localStorage.getItem("vaadin.developmentmode.force")}function ms(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function fs(){return!!(ft&&Object.keys(ft).map(e=>ft[e]).filter(e=>e.productionMode).length>0)}function ai(t,e){if(typeof t!="function")return;const o=cs.exec(t.toString());if(o)try{t=new Function(o[1])}catch(n){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",n)}return t(e)}window.Vaadin=window.Vaadin||{};const fn=function(t,e){if(window.Vaadin.developmentMode)return ai(t,e)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=us());function vs(){}const gs=function(){if(typeof fn=="function")return fn(vs)};window.Vaadin=window.Vaadin||{};window.Vaadin.registrations=window.Vaadin.registrations||[];window.Vaadin.registrations.push({is:"@vaadin/router",version:"1.7.4"});gs();le.NavigationTrigger={POPSTATE:zi,CLICK:Vi};var Wt,$;(function(t){t.CONNECTED="connected",t.LOADING="loading",t.RECONNECTING="reconnecting",t.CONNECTION_LOST="connection-lost"})($||($={}));class ys{constructor(e){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=e,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(o=>{var n;(n=o==null?void 0:o.active)===null||n===void 0||n.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(e){this.stateChangeListeners.add(e)}removeStateChangeListener(e){this.stateChangeListeners.delete(e)}loadingStarted(){this.state=$.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount($.CONNECTED)}loadingFailed(){this.decreaseLoadingCount($.CONNECTION_LOST)}decreaseLoadingCount(e){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=e))}get state(){return this.connectionState}set state(e){if(e!==this.connectionState){const o=this.connectionState;this.connectionState=e,this.loadingCount=0;for(const n of this.stateChangeListeners)n(o,this.connectionState)}}get online(){return this.connectionState===$.CONNECTED||this.connectionState===$.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(e){typeof e.data=="object"&&e.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(e.data.result===!0&&(this.state=$.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const bs=t=>!!(t==="localhost"||t==="[::1]"||t.match(/^127\.\d+\.\d+\.\d+$/)),dt=window;if(!(!((Wt=dt.Vaadin)===null||Wt===void 0)&&Wt.connectionState)){let t;bs(window.location.hostname)?t=!0:t=navigator.onLine,dt.Vaadin=dt.Vaadin||{},dt.Vaadin.connectionState=new ys(t?$.CONNECTED:$.CONNECTION_LOST)}function j(t,e,o,n){var i=arguments.length,s=i<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,o):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(t,e,o,n);else for(var l=t.length-1;l>=0;l--)(r=t[l])&&(s=(i<3?r(s):i>3?r(e,o,s):r(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _s=!1,vt=window,Po=vt.ShadowRoot&&(vt.ShadyCSS===void 0||vt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ao=Symbol(),vn=new WeakMap;class Io{constructor(e,o,n){if(this._$cssResult$=!0,n!==Ao)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this._strings=o}get styleSheet(){let e=this._styleSheet;const o=this._strings;if(Po&&e===void 0){const n=o!==void 0&&o.length===1;n&&(e=vn.get(o)),e===void 0&&((this._styleSheet=e=new CSSStyleSheet).replaceSync(this.cssText),n&&vn.set(o,e))}return e}toString(){return this.cssText}}const ws=t=>{if(t._$cssResult$===!0)return t.cssText;if(typeof t=="number")return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)},Ss=t=>new Io(typeof t=="string"?t:String(t),void 0,Ao),E=(t,...e)=>{const o=t.length===1?t[0]:e.reduce((n,i,s)=>n+ws(i)+t[s+1],t[0]);return new Io(o,t,Ao)},xs=(t,e)=>{Po?t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet):e.forEach(o=>{const n=document.createElement("style"),i=vt.litNonce;i!==void 0&&n.setAttribute("nonce",i),n.textContent=o.cssText,t.appendChild(n)})},Es=t=>{let e="";for(const o of t.cssRules)e+=o.cssText;return Ss(e)},gn=Po||_s?t=>t:t=>t instanceof CSSStyleSheet?Es(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Gt,Kt,Yt,li;const Z=window;let di,de;const yn=Z.trustedTypes,Cs=yn?yn.emptyScript:"",gt=Z.reactiveElementPolyfillSupportDevMode;{const t=(Gt=Z.litIssuedWarnings)!==null&&Gt!==void 0?Gt:Z.litIssuedWarnings=new Set;de=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))},de("dev-mode","Lit is in dev mode. Not recommended for production!"),!((Kt=Z.ShadyDOM)===null||Kt===void 0)&&Kt.inUse&&gt===void 0&&de("polyfill-support-missing","Shadow DOM is being polyfilled via `ShadyDOM` but the `polyfill-support` module has not been loaded."),di=e=>({then:(o,n)=>{de("request-update-promise",`The \`requestUpdate\` method should no longer return a Promise but does so on \`${e}\`. Use \`updateComplete\` instead.`),o!==void 0&&o(!1)}})}const Jt=t=>{Z.emitLitDebugLogEvents&&Z.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))},ci=(t,e)=>t,So={toAttribute(t,e){switch(e){case Boolean:t=t?Cs:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t);break}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}break}return o}},hi=(t,e)=>e!==t&&(e===e||t===t),Xt={attribute:!0,type:String,converter:So,reflect:!1,hasChanged:hi},xo="finalized";class ee extends HTMLElement{constructor(){super(),this.__instanceProperties=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this.__reflectingProperty=null,this._initialize()}static addInitializer(e){var o;this.finalize(),((o=this._initializers)!==null&&o!==void 0?o:this._initializers=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((o,n)=>{const i=this.__attributeNameForProperty(n,o);i!==void 0&&(this.__attributeToPropertyMap.set(i,n),e.push(i))}),e}static createProperty(e,o=Xt){var n;if(o.state&&(o.attribute=!1),this.finalize(),this.elementProperties.set(e,o),!o.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():`__${e}`,s=this.getPropertyDescriptor(e,i,o);s!==void 0&&(Object.defineProperty(this.prototype,e,s),this.hasOwnProperty("__reactivePropertyKeys")||(this.__reactivePropertyKeys=new Set((n=this.__reactivePropertyKeys)!==null&&n!==void 0?n:[])),this.__reactivePropertyKeys.add(e))}}static getPropertyDescriptor(e,o,n){return{get(){return this[o]},set(i){const s=this[e];this[o]=i,this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Xt}static finalize(){if(this.hasOwnProperty(xo))return!1;this[xo]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e._initializers!==void 0&&(this._initializers=[...e._initializers]),this.elementProperties=new Map(e.elementProperties),this.__attributeToPropertyMap=new Map,this.hasOwnProperty(ci("properties"))){const o=this.properties,n=[...Object.getOwnPropertyNames(o),...Object.getOwnPropertySymbols(o)];for(const i of n)this.createProperty(i,o[i])}this.elementStyles=this.finalizeStyles(this.styles);{const o=(n,i=!1)=>{this.prototype.hasOwnProperty(n)&&de(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${this.name}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)};o("initialize"),o("requestUpdateInternal"),o("_getUpdateComplete",!0)}return!0}static finalizeStyles(e){const o=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const i of n)o.unshift(gn(i))}else e!==void 0&&o.push(gn(e));return o}static __attributeNameForProperty(e,o){const n=o.attribute;return n===!1?void 0:typeof n=="string"?n:typeof e=="string"?e.toLowerCase():void 0}_initialize(){var e;this.__updatePromise=new Promise(o=>this.enableUpdating=o),this._$changedProperties=new Map,this.__saveInstanceProperties(),this.requestUpdate(),(e=this.constructor._initializers)===null||e===void 0||e.forEach(o=>o(this))}addController(e){var o,n;((o=this.__controllers)!==null&&o!==void 0?o:this.__controllers=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((n=e.hostConnected)===null||n===void 0||n.call(e))}removeController(e){var o;(o=this.__controllers)===null||o===void 0||o.splice(this.__controllers.indexOf(e)>>>0,1)}__saveInstanceProperties(){this.constructor.elementProperties.forEach((e,o)=>{this.hasOwnProperty(o)&&(this.__instanceProperties.set(o,this[o]),delete this[o])})}createRenderRoot(){var e;const o=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return xs(o,this.constructor.elementStyles),o}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostConnected)===null||n===void 0?void 0:n.call(o)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this.__controllers)===null||e===void 0||e.forEach(o=>{var n;return(n=o.hostDisconnected)===null||n===void 0?void 0:n.call(o)})}attributeChangedCallback(e,o,n){this._$attributeToProperty(e,n)}__propertyToAttribute(e,o,n=Xt){var i;const s=this.constructor.__attributeNameForProperty(e,n);if(s!==void 0&&n.reflect===!0){const l=(((i=n.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?n.converter:So).toAttribute(o,n.type);this.constructor.enabledWarnings.indexOf("migration")>=0&&l===void 0&&de("undefined-attribute-value",`The attribute value for the ${e} property is undefined on element ${this.localName}. The attribute will be removed, but in the previous version of \`ReactiveElement\`, the attribute would not have changed.`),this.__reflectingProperty=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this.__reflectingProperty=null}}_$attributeToProperty(e,o){var n;const i=this.constructor,s=i.__attributeToPropertyMap.get(e);if(s!==void 0&&this.__reflectingProperty!==s){const r=i.getPropertyOptions(s),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((n=r.converter)===null||n===void 0?void 0:n.fromAttribute)!==void 0?r.converter:So;this.__reflectingProperty=s,this[s]=l.fromAttribute(o,r.type),this.__reflectingProperty=null}}requestUpdate(e,o,n){let i=!0;return e!==void 0&&(n=n||this.constructor.getPropertyOptions(e),(n.hasChanged||hi)(this[e],o)?(this._$changedProperties.has(e)||this._$changedProperties.set(e,o),n.reflect===!0&&this.__reflectingProperty!==e&&(this.__reflectingProperties===void 0&&(this.__reflectingProperties=new Map),this.__reflectingProperties.set(e,n))):i=!1),!this.isUpdatePending&&i&&(this.__updatePromise=this.__enqueueUpdate()),di(this.localName)}async __enqueueUpdate(){this.isUpdatePending=!0;try{await this.__updatePromise}catch(o){Promise.reject(o)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e,o;if(!this.isUpdatePending)return;if(Jt==null||Jt({kind:"update"}),!this.hasUpdated){const s=[];if((e=this.constructor.__reactivePropertyKeys)===null||e===void 0||e.forEach(r=>{var l;this.hasOwnProperty(r)&&!(!((l=this.__instanceProperties)===null||l===void 0)&&l.has(r))&&s.push(r)}),s.length)throw new Error(`The following properties on element ${this.localName} will not trigger updates as expected because they are set using class fields: ${s.join(", ")}. Native class fields and some compiled output will overwrite accessors used for detecting changes. See https://lit.dev/msg/class-field-shadowing for more information.`)}this.__instanceProperties&&(this.__instanceProperties.forEach((s,r)=>this[r]=s),this.__instanceProperties=void 0);let n=!1;const i=this._$changedProperties;try{n=this.shouldUpdate(i),n?(this.willUpdate(i),(o=this.__controllers)===null||o===void 0||o.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this.__markUpdated()}catch(s){throw n=!1,this.__markUpdated(),s}n&&this._$didUpdate(i)}willUpdate(e){}_$didUpdate(e){var o;(o=this.__controllers)===null||o===void 0||o.forEach(n=>{var i;return(i=n.hostUpdated)===null||i===void 0?void 0:i.call(n)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e),this.isUpdatePending&&this.constructor.enabledWarnings.indexOf("change-in-update")>=0&&de("change-in-update",`Element ${this.localName} scheduled an update (generally because a property was set) after an update completed, causing a new update to be scheduled. This is inefficient and should be avoided unless the next update can only be scheduled as a side effect of the previous update.`)}__markUpdated(){this._$changedProperties=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this.__updatePromise}shouldUpdate(e){return!0}update(e){this.__reflectingProperties!==void 0&&(this.__reflectingProperties.forEach((o,n)=>this.__propertyToAttribute(n,this[n],o)),this.__reflectingProperties=void 0),this.__markUpdated()}updated(e){}firstUpdated(e){}}li=xo;ee[li]=!0;ee.elementProperties=new Map;ee.elementStyles=[];ee.shadowRootOptions={mode:"open"};gt==null||gt({ReactiveElement:ee});{ee.enabledWarnings=["change-in-update"];const t=function(e){e.hasOwnProperty(ci("enabledWarnings"))||(e.enabledWarnings=e.enabledWarnings.slice())};ee.enableWarning=function(e){t(this),this.enabledWarnings.indexOf(e)<0&&this.enabledWarnings.push(e)},ee.disableWarning=function(e){t(this);const o=this.enabledWarnings.indexOf(e);o>=0&&this.enabledWarnings.splice(o,1)}}((Yt=Z.reactiveElementVersions)!==null&&Yt!==void 0?Yt:Z.reactiveElementVersions=[]).push("1.6.2");Z.reactiveElementVersions.length>1&&de("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Qt,Zt,eo,to;const U=window,g=t=>{U.emitLitDebugLogEvents&&U.dispatchEvent(new CustomEvent("lit-debug",{detail:t}))};let ks=0,Et;(Qt=U.litIssuedWarnings)!==null&&Qt!==void 0||(U.litIssuedWarnings=new Set),Et=(t,e)=>{e+=t?` See https://lit.dev/msg/${t} for more information.`:"",U.litIssuedWarnings.has(e)||(console.warn(e),U.litIssuedWarnings.add(e))},Et("dev-mode","Lit is in dev mode. Not recommended for production!");const H=!((Zt=U.ShadyDOM)===null||Zt===void 0)&&Zt.inUse&&((eo=U.ShadyDOM)===null||eo===void 0?void 0:eo.noPatch)===!0?U.ShadyDOM.wrap:t=>t,Re=U.trustedTypes,bn=Re?Re.createPolicy("lit-html",{createHTML:t=>t}):void 0,$s=t=>t,Lt=(t,e,o)=>$s,Ts=t=>{if(_e!==Lt)throw new Error("Attempted to overwrite existing lit-html security policy. setSanitizeDOMValueFactory should be called at most once.");_e=t},Ns=()=>{_e=Lt},Eo=(t,e,o)=>_e(t,e,o),Co="$lit$",ne=`lit$${String(Math.random()).slice(9)}$`,ui="?"+ne,Ps=`<${ui}>`,ye=document,qe=()=>ye.createComment(""),We=t=>t===null||typeof t!="object"&&typeof t!="function",pi=Array.isArray,As=t=>pi(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",oo=`[ 	
\f\r]`,Is=`[^ 	
\f\r"'\`<>=]`,Rs=`[^\\s"'>=/]`,ze=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_n=1,no=2,Os=3,wn=/-->/g,Sn=/>/g,me=new RegExp(`>|${oo}(?:(${Rs}+)(${oo}*=${oo}*(?:${Is}|("|')|))|$)`,"g"),Ls=0,xn=1,Ms=2,En=3,io=/'/g,so=/"/g,mi=/^(?:script|style|textarea|title)$/i,Vs=1,Ct=2,Ro=1,kt=2,Ds=3,zs=4,Us=5,Oo=6,js=7,fi=t=>(e,...o)=>(e.some(n=>n===void 0)&&console.warn(`Some template strings are undefined.
This is probably caused by illegal octal escape sequences.`),{_$litType$:t,strings:e,values:o}),v=fi(Vs),Te=fi(Ct),be=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Cn=new WeakMap,ve=ye.createTreeWalker(ye,129,null,!1);let _e=Lt;const Fs=(t,e)=>{const o=t.length-1,n=[];let i=e===Ct?"<svg>":"",s,r=ze;for(let a=0;a<o;a++){const d=t[a];let c=-1,m,h=0,f;for(;h<d.length&&(r.lastIndex=h,f=r.exec(d),f!==null);)if(h=r.lastIndex,r===ze){if(f[_n]==="!--")r=wn;else if(f[_n]!==void 0)r=Sn;else if(f[no]!==void 0)mi.test(f[no])&&(s=new RegExp(`</${f[no]}`,"g")),r=me;else if(f[Os]!==void 0)throw new Error("Bindings in tag names are not supported. Please use static templates instead. See https://lit.dev/docs/templates/expressions/#static-expressions")}else r===me?f[Ls]===">"?(r=s??ze,c=-1):f[xn]===void 0?c=-2:(c=r.lastIndex-f[Ms].length,m=f[xn],r=f[En]===void 0?me:f[En]==='"'?so:io):r===so||r===io?r=me:r===wn||r===Sn?r=ze:(r=me,s=void 0);console.assert(c===-1||r===me||r===io||r===so,"unexpected parse state B");const se=r===me&&t[a+1].startsWith("/>")?" ":"";i+=r===ze?d+Ps:c>=0?(n.push(m),d.slice(0,c)+Co+d.slice(c)+ne+se):d+ne+(c===-2?(n.push(void 0),a):se)}const l=i+(t[o]||"<?>")+(e===Ct?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw")){let a="invalid template strings array";throw a=`
          Internal Error: expected template strings to be an array
          with a 'raw' field. Faking a template strings array by
          calling html or svg like an ordinary function is effectively
          the same as calling unsafeHtml and can lead to major security
          issues, e.g. opening your code up to XSS attacks.

          If you're using the html or svg tagged template functions normally
          and still seeing this error, please file a bug at
          https://github.com/lit/lit/issues/new?template=bug_report.md
          and include information about your build tooling, if any.
        `.trim().replace(/\n */g,`
`),new Error(a)}return[bn!==void 0?bn.createHTML(l):l,n]};class Ge{constructor({strings:e,["_$litType$"]:o},n){this.parts=[];let i,s=0,r=0;const l=e.length-1,a=this.parts,[d,c]=Fs(e,o);if(this.el=Ge.createElement(d,n),ve.currentNode=this.el.content,o===Ct){const m=this.el.content,h=m.firstChild;h.remove(),m.append(...h.childNodes)}for(;(i=ve.nextNode())!==null&&a.length<l;){if(i.nodeType===1){{const m=i.localName;if(/^(?:textarea|template)$/i.test(m)&&i.innerHTML.includes(ne)){const h=`Expressions are not supported inside \`${m}\` elements. See https://lit.dev/msg/expression-in-${m} for more information.`;if(m==="template")throw new Error(h);Et("",h)}}if(i.hasAttributes()){const m=[];for(const h of i.getAttributeNames())if(h.endsWith(Co)||h.startsWith(ne)){const f=c[r++];if(m.push(h),f!==void 0){const re=i.getAttribute(f.toLowerCase()+Co).split(ne),te=/([.?@])?(.*)/.exec(f);a.push({type:Ro,index:s,name:te[2],strings:re,ctor:te[1]==="."?Hs:te[1]==="?"?Ws:te[1]==="@"?Gs:Mt})}else a.push({type:Oo,index:s})}for(const h of m)i.removeAttribute(h)}if(mi.test(i.tagName)){const m=i.textContent.split(ne),h=m.length-1;if(h>0){i.textContent=Re?Re.emptyScript:"";for(let f=0;f<h;f++)i.append(m[f],qe()),ve.nextNode(),a.push({type:kt,index:++s});i.append(m[h],qe())}}}else if(i.nodeType===8)if(i.data===ui)a.push({type:kt,index:s});else{let h=-1;for(;(h=i.data.indexOf(ne,h+1))!==-1;)a.push({type:js,index:s}),h+=ne.length-1}s++}g==null||g({kind:"template prep",template:this,clonableTemplate:this.el,parts:this.parts,strings:e})}static createElement(e,o){const n=ye.createElement("template");return n.innerHTML=e,n}}function Oe(t,e,o=t,n){var i,s,r,l;if(e===be)return e;let a=n!==void 0?(i=o.__directives)===null||i===void 0?void 0:i[n]:o.__directive;const d=We(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((s=a==null?void 0:a._$notifyDirectiveConnectionChanged)===null||s===void 0||s.call(a,!1),d===void 0?a=void 0:(a=new d(t),a._$initialize(t,o,n)),n!==void 0?((r=(l=o).__directives)!==null&&r!==void 0?r:l.__directives=[])[n]=a:o.__directive=a),a!==void 0&&(e=Oe(t,a._$resolve(t,e.values),a,n)),e}class Bs{constructor(e,o){this._$parts=[],this._$disconnectableChildren=void 0,this._$template=e,this._$parent=o}get parentNode(){return this._$parent.parentNode}get _$isConnected(){return this._$parent._$isConnected}_clone(e){var o;const{el:{content:n},parts:i}=this._$template,s=((o=e==null?void 0:e.creationScope)!==null&&o!==void 0?o:ye).importNode(n,!0);ve.currentNode=s;let r=ve.nextNode(),l=0,a=0,d=i[0];for(;d!==void 0;){if(l===d.index){let c;d.type===kt?c=new et(r,r.nextSibling,this,e):d.type===Ro?c=new d.ctor(r,d.name,d.strings,this,e):d.type===Oo&&(c=new Ks(r,this,e)),this._$parts.push(c),d=i[++a]}l!==(d==null?void 0:d.index)&&(r=ve.nextNode(),l++)}return ve.currentNode=ye,s}_update(e){let o=0;for(const n of this._$parts)n!==void 0&&(g==null||g({kind:"set part",part:n,value:e[o],valueIndex:o,values:e,templateInstance:this}),n.strings!==void 0?(n._$setValue(e,n,o),o+=n.strings.length-2):n._$setValue(e[o])),o++}}class et{constructor(e,o,n,i){var s;this.type=kt,this._$committedValue=k,this._$disconnectableChildren=void 0,this._$startNode=e,this._$endNode=o,this._$parent=n,this.options=i,this.__isConnected=(s=i==null?void 0:i.isConnected)!==null&&s!==void 0?s:!0,this._textSanitizer=void 0}get _$isConnected(){var e,o;return(o=(e=this._$parent)===null||e===void 0?void 0:e._$isConnected)!==null&&o!==void 0?o:this.__isConnected}get parentNode(){let e=H(this._$startNode).parentNode;const o=this._$parent;return o!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=o.parentNode),e}get startNode(){return this._$startNode}get endNode(){return this._$endNode}_$setValue(e,o=this){var n;if(this.parentNode===null)throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");if(e=Oe(this,e,o),We(e))e===k||e==null||e===""?(this._$committedValue!==k&&(g==null||g({kind:"commit nothing to child",start:this._$startNode,end:this._$endNode,parent:this._$parent,options:this.options}),this._$clear()),this._$committedValue=k):e!==this._$committedValue&&e!==be&&this._commitText(e);else if(e._$litType$!==void 0)this._commitTemplateResult(e);else if(e.nodeType!==void 0){if(((n=this.options)===null||n===void 0?void 0:n.host)===e){this._commitText("[probable mistake: rendered a template's host in itself (commonly caused by writing ${this} in a template]"),console.warn("Attempted to render the template host",e,"inside itself. This is almost always a mistake, and in dev mode ","we render some warning text. In production however, we'll ","render it, which will usually result in an error, and sometimes ","in the element disappearing from the DOM.");return}this._commitNode(e)}else As(e)?this._commitIterable(e):this._commitText(e)}_insert(e){return H(H(this._$startNode).parentNode).insertBefore(e,this._$endNode)}_commitNode(e){var o;if(this._$committedValue!==e){if(this._$clear(),_e!==Lt){const n=(o=this._$startNode.parentNode)===null||o===void 0?void 0:o.nodeName;if(n==="STYLE"||n==="SCRIPT"){let i="Forbidden";throw n==="STYLE"?i="Lit does not support binding inside style nodes. This is a security risk, as style injection attacks can exfiltrate data and spoof UIs. Consider instead using css`...` literals to compose styles, and make do dynamic styling with css custom properties, ::parts, <slot>s, and by mutating the DOM rather than stylesheets.":i="Lit does not support binding inside script nodes. This is a security risk, as it could allow arbitrary code execution.",new Error(i)}}g==null||g({kind:"commit node",start:this._$startNode,parent:this._$parent,value:e,options:this.options}),this._$committedValue=this._insert(e)}}_commitText(e){if(this._$committedValue!==k&&We(this._$committedValue)){const o=H(this._$startNode).nextSibling;this._textSanitizer===void 0&&(this._textSanitizer=Eo(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}else{const o=ye.createTextNode("");this._commitNode(o),this._textSanitizer===void 0&&(this._textSanitizer=Eo(o,"data","property")),e=this._textSanitizer(e),g==null||g({kind:"commit text",node:o,value:e,options:this.options}),o.data=e}this._$committedValue=e}_commitTemplateResult(e){var o;const{values:n,["_$litType$"]:i}=e,s=typeof i=="number"?this._$getTemplate(e):(i.el===void 0&&(i.el=Ge.createElement(i.h,this.options)),i);if(((o=this._$committedValue)===null||o===void 0?void 0:o._$template)===s)g==null||g({kind:"template updating",template:s,instance:this._$committedValue,parts:this._$committedValue._$parts,options:this.options,values:n}),this._$committedValue._update(n);else{const r=new Bs(s,this),l=r._clone(this.options);g==null||g({kind:"template instantiated",template:s,instance:r,parts:r._$parts,options:this.options,fragment:l,values:n}),r._update(n),g==null||g({kind:"template instantiated and updated",template:s,instance:r,parts:r._$parts,options:this.options,fragment:l,values:n}),this._commitNode(l),this._$committedValue=r}}_$getTemplate(e){let o=Cn.get(e.strings);return o===void 0&&Cn.set(e.strings,o=new Ge(e)),o}_commitIterable(e){pi(this._$committedValue)||(this._$committedValue=[],this._$clear());const o=this._$committedValue;let n=0,i;for(const s of e)n===o.length?o.push(i=new et(this._insert(qe()),this._insert(qe()),this,this.options)):i=o[n],i._$setValue(s),n++;n<o.length&&(this._$clear(i&&H(i._$endNode).nextSibling,n),o.length=n)}_$clear(e=H(this._$startNode).nextSibling,o){var n;for((n=this._$notifyConnectionChanged)===null||n===void 0||n.call(this,!1,!0,o);e&&e!==this._$endNode;){const i=H(e).nextSibling;H(e).remove(),e=i}}setConnected(e){var o;if(this._$parent===void 0)this.__isConnected=e,(o=this._$notifyConnectionChanged)===null||o===void 0||o.call(this,e);else throw new Error("part.setConnected() may only be called on a RootPart returned from render().")}}class Mt{constructor(e,o,n,i,s){this.type=Ro,this._$committedValue=k,this._$disconnectableChildren=void 0,this.element=e,this.name=o,this._$parent=i,this.options=s,n.length>2||n[0]!==""||n[1]!==""?(this._$committedValue=new Array(n.length-1).fill(new String),this.strings=n):this._$committedValue=k,this._sanitizer=void 0}get tagName(){return this.element.tagName}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e,o=this,n,i){const s=this.strings;let r=!1;if(s===void 0)e=Oe(this,e,o,0),r=!We(e)||e!==this._$committedValue&&e!==be,r&&(this._$committedValue=e);else{const l=e;e=s[0];let a,d;for(a=0;a<s.length-1;a++)d=Oe(this,l[n+a],o,a),d===be&&(d=this._$committedValue[a]),r||(r=!We(d)||d!==this._$committedValue[a]),d===k?e=k:e!==k&&(e+=(d??"")+s[a+1]),this._$committedValue[a]=d}r&&!i&&this._commitValue(e)}_commitValue(e){e===k?H(this.element).removeAttribute(this.name):(this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"attribute")),e=this._sanitizer(e??""),g==null||g({kind:"commit attribute",element:this.element,name:this.name,value:e,options:this.options}),H(this.element).setAttribute(this.name,e??""))}}class Hs extends Mt{constructor(){super(...arguments),this.type=Ds}_commitValue(e){this._sanitizer===void 0&&(this._sanitizer=_e(this.element,this.name,"property")),e=this._sanitizer(e),g==null||g({kind:"commit property",element:this.element,name:this.name,value:e,options:this.options}),this.element[this.name]=e===k?void 0:e}}const qs=Re?Re.emptyScript:"";class Ws extends Mt{constructor(){super(...arguments),this.type=zs}_commitValue(e){g==null||g({kind:"commit boolean attribute",element:this.element,name:this.name,value:!!(e&&e!==k),options:this.options}),e&&e!==k?H(this.element).setAttribute(this.name,qs):H(this.element).removeAttribute(this.name)}}class Gs extends Mt{constructor(e,o,n,i,s){if(super(e,o,n,i,s),this.type=Us,this.strings!==void 0)throw new Error(`A \`<${e.localName}>\` has a \`@${o}=...\` listener with invalid content. Event listeners in templates must have exactly one expression and no surrounding text.`)}_$setValue(e,o=this){var n;if(e=(n=Oe(this,e,o,0))!==null&&n!==void 0?n:k,e===be)return;const i=this._$committedValue,s=e===k&&i!==k||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==k&&(i===k||s);g==null||g({kind:"commit event listener",element:this.element,name:this.name,value:e,options:this.options,removeListener:s,addListener:r,oldListener:i}),s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$committedValue=e}handleEvent(e){var o,n;typeof this._$committedValue=="function"?this._$committedValue.call((n=(o=this.options)===null||o===void 0?void 0:o.host)!==null&&n!==void 0?n:this.element,e):this._$committedValue.handleEvent(e)}}class Ks{constructor(e,o,n){this.element=e,this.type=Oo,this._$disconnectableChildren=void 0,this._$parent=o,this.options=n}get _$isConnected(){return this._$parent._$isConnected}_$setValue(e){g==null||g({kind:"commit to element binding",element:this.element,value:e,options:this.options}),Oe(this,e)}}const ro=U.litHtmlPolyfillSupportDevMode;ro==null||ro(Ge,et);((to=U.litHtmlVersions)!==null&&to!==void 0?to:U.litHtmlVersions=[]).push("2.7.4");U.litHtmlVersions.length>1&&Et("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");const Ae=(t,e,o)=>{var n,i;if(e==null)throw new TypeError(`The container to render into may not be ${e}`);const s=ks++,r=(n=o==null?void 0:o.renderBefore)!==null&&n!==void 0?n:e;let l=r._$litPart$;if(g==null||g({kind:"begin render",id:s,value:t,container:e,options:o,part:l}),l===void 0){const a=(i=o==null?void 0:o.renderBefore)!==null&&i!==void 0?i:null;r._$litPart$=l=new et(e.insertBefore(qe(),a),a,void 0,o??{})}return l._$setValue(t),g==null||g({kind:"end render",id:s,value:t,container:e,options:o,part:l}),l};Ae.setSanitizer=Ts,Ae.createSanitizer=Eo,Ae._testOnlyClearSanitizerFactoryDoNotCallOrElse=Ns;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ao,lo,co;let Lo;{const t=(ao=globalThis.litIssuedWarnings)!==null&&ao!==void 0?ao:globalThis.litIssuedWarnings=new Set;Lo=(e,o)=>{o+=` See https://lit.dev/msg/${e} for more information.`,t.has(o)||(console.warn(o),t.add(o))}}class A extends ee{constructor(){super(...arguments),this.renderOptions={host:this},this.__childPart=void 0}createRenderRoot(){var e,o;const n=super.createRenderRoot();return(e=(o=this.renderOptions).renderBefore)!==null&&e!==void 0||(o.renderBefore=n.firstChild),n}update(e){const o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this.__childPart=Ae(o,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this.__childPart)===null||e===void 0||e.setConnected(!1)}render(){return be}}A.finalized=!0;A._$litElement$=!0;(lo=globalThis.litElementHydrateSupport)===null||lo===void 0||lo.call(globalThis,{LitElement:A});const ho=globalThis.litElementPolyfillSupportDevMode;ho==null||ho({LitElement:A});A.finalize=function(){if(!ee.finalize.call(this))return!1;const e=(o,n,i=!1)=>{if(o.hasOwnProperty(n)){const s=(typeof o=="function"?o:o.constructor).name;Lo(i?"renamed-api":"removed-api",`\`${n}\` is implemented on class ${s}. It has been ${i?"renamed":"removed"} in this version of LitElement.`)}};return e(this,"render"),e(this,"getStyles",!0),e(this.prototype,"adoptStyles"),!0};((co=globalThis.litElementVersions)!==null&&co!==void 0?co:globalThis.litElementVersions=[]).push("3.3.2");globalThis.litElementVersions.length>1&&Lo("multiple-versions","Multiple versions of Lit loaded. Loading multiple versions is not recommended.");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ys=(t,e)=>(customElements.define(t,e),e),Js=(t,e)=>{const{kind:o,elements:n}=e;return{kind:o,elements:n,finisher(i){customElements.define(t,i)}}},F=t=>e=>typeof e=="function"?Ys(t,e):Js(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xs=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(o){o.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(o){o.createProperty(e.key,t)}},Qs=(t,e,o)=>{e.constructor.createProperty(o,t)};function y(t){return(e,o)=>o!==void 0?Qs(t,e,o):Xs(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(t){return y({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zs=({finisher:t,descriptor:e})=>(o,n)=>{var i;if(n!==void 0){const s=o.constructor;e!==void 0&&Object.defineProperty(o,n,e(n)),t==null||t(s,n)}else{const s=(i=o.originalKey)!==null&&i!==void 0?i:o.key,r=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(o.key)}:{...o,key:s};return t!=null&&(r.finisher=function(l){t(l,s)}),r}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function tt(t,e){return Zs({descriptor:o=>{const n={get(){var i,s;return(s=(i=this.renderRoot)===null||i===void 0?void 0:i.querySelector(t))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const i=typeof o=="symbol"?Symbol():`__${o}`;n.get=function(){var s,r;return this[i]===void 0&&(this[i]=(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(t))!==null&&r!==void 0?r:null),this[i]}}return n}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var uo;const er=window;((uo=er.HTMLSlotElement)===null||uo===void 0?void 0:uo.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},or=t=>(...e)=>({_$litDirective$:t,values:e});class nr{constructor(e){}get _$isConnected(){return this._$parent._$isConnected}_$initialize(e,o,n){this.__part=e,this._$parent=o,this.__attributeIndex=n}_$resolve(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ir extends nr{constructor(e){var o;if(super(e),e.type!==tr.ATTRIBUTE||e.name!=="class"||((o=e.strings)===null||o===void 0?void 0:o.length)>2)throw new Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(o=>e[o]).join(" ")+" "}update(e,[o]){var n,i;if(this._previousClasses===void 0){this._previousClasses=new Set,e.strings!==void 0&&(this._staticClasses=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in o)o[r]&&!(!((n=this._staticClasses)===null||n===void 0)&&n.has(r))&&this._previousClasses.add(r);return this.render(o)}const s=e.element.classList;this._previousClasses.forEach(r=>{r in o||(s.remove(r),this._previousClasses.delete(r))});for(const r in o){const l=!!o[r];l!==this._previousClasses.has(r)&&!(!((i=this._staticClasses)===null||i===void 0)&&i.has(r))&&(l?(s.add(r),this._previousClasses.add(r)):(s.remove(r),this._previousClasses.delete(r)))}return be}}const Mo=or(ir),po="css-loading-indicator";var G;(function(t){t.IDLE="",t.FIRST="first",t.SECOND="second",t.THIRD="third"})(G||(G={}));class I extends A{constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=G.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=$.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}static create(){var e,o;const n=window;return!((e=n.Vaadin)===null||e===void 0)&&e.connectionIndicator||(n.Vaadin=n.Vaadin||{},n.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(n.Vaadin.connectionIndicator)),(o=n.Vaadin)===null||o===void 0?void 0:o.connectionIndicator}render(){return v`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Mo({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var e;super.connectedCallback();const o=window;!((e=o.Vaadin)===null||e===void 0)&&e.connectionState&&(this.connectionStateStore=o.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(e){e!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=e,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var e;const o=(e=this.connectionStateStore)===null||e===void 0?void 0:e.state;return this.offline=o===$.CONNECTION_LOST,this.reconnecting=o===$.RECONNECTING,this.updateLoading(o===$.LOADING),this.loading?!1:o!==this.lastMessageState?(this.lastMessageState=o,!0):!1}updateLoading(e){this.loading=e,this.loadingBarState=G.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,e,()=>{this.loadingBarState=G.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,e,()=>{this.loadingBarState=G.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,e,()=>{this.loadingBarState=G.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(po)){const e=document.createElement("style");e.id=po,e.textContent=this.getDefaultStyle(),document.head.appendChild(e)}}else{const e=document.getElementById(po);e&&document.head.removeChild(e)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case G.IDLE:return"display: none";case G.FIRST:case G.SECOND:case G.THIRD:return"display: block";default:return""}}timeoutFor(e,o,n,i){return e!==0&&window.clearTimeout(e),o?window.setTimeout(n,i):0}static get instance(){return I.create()}}j([y({type:Number})],I.prototype,"firstDelay",void 0);j([y({type:Number})],I.prototype,"secondDelay",void 0);j([y({type:Number})],I.prototype,"thirdDelay",void 0);j([y({type:Number})],I.prototype,"expandedDuration",void 0);j([y({type:String})],I.prototype,"onlineText",void 0);j([y({type:String})],I.prototype,"offlineText",void 0);j([y({type:String})],I.prototype,"reconnectingText",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"offline",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"reconnecting",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"expanded",void 0);j([y({type:Boolean,reflect:!0})],I.prototype,"loading",void 0);j([y({type:String})],I.prototype,"loadingBarState",void 0);j([y({type:Boolean})],I.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",I);I.instance;const Ke=window;Ke.Vaadin=Ke.Vaadin||{};Ke.Vaadin.registrations=Ke.Vaadin.registrations||[];Ke.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class kn extends Error{}const Ue=window.document.body,w=window;class sr{constructor(e){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Ue.$=Ue.$||[],this.config=e||{},w.Vaadin=w.Vaadin||{},w.Vaadin.Flow=w.Vaadin.Flow||{},w.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const o=document.head.querySelector("base");this.baseRegex=new RegExp(`^${(document.baseURI||o&&o.href||"/").replace(/^https?:\/\/[^/]+/i,"")}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,w.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,w.Vaadin.connectionState.loadingFinished(),!w.Vaadin.listener&&(w.Vaadin.listener={},document.addEventListener("click",e=>{e.target&&(e.target.hasAttribute("router-link")?this.navigation="link":e.composedPath().some(o=>o.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async e=>{if(this.pathname=e.pathname,w.Vaadin.connectionState.online)try{await this.flowInit()}catch(o){if(o instanceof kn)return w.Vaadin.connectionState.state=$.CONNECTION_LOST,this.offlineStubAction();throw o}else return this.offlineStubAction();return this.container.onBeforeEnter=(o,n)=>this.flowNavigate(o,n),this.container.onBeforeLeave=(o,n)=>this.flowLeave(o,n),this.container}}async flowLeave(e,o){const{connectionState:n}=w.Vaadin;return this.pathname===e.pathname||!this.isFlowClientLoaded()||n.offline?Promise.resolve({}):new Promise(i=>{this.loadingStarted(),this.container.serverConnected=s=>{i(o&&s?o.prevent():{}),this.loadingFinished()},Ue.$server.leaveNavigation(this.getFlowRoutePath(e),this.getFlowRouteQuery(e))})}async flowNavigate(e,o){return this.response?new Promise(n=>{this.loadingStarted(),this.container.serverConnected=(i,s)=>{o&&i?n(o.prevent()):o&&o.redirect&&s?n(o.redirect(s.pathname)):(this.container.style.display="",n(this.container)),this.loadingFinished()},Ue.$server.connectClient(this.getFlowRoutePath(e),this.getFlowRouteQuery(e),this.appShellTitle,history.state,this.navigation),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(e){return decodeURIComponent(e.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(e){return e.search&&e.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:e,appConfig:o}=this.response;typeof e=="string"&&await this.loadScript(e);const{appId:n}=o;await(await x(()=>import("./FlowBootstrap-feff2646.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(n),await this.config.imports());const s=`flow-container-${n.toLowerCase()}`,r=document.querySelector(s);r?this.container=r:(this.container=document.createElement(s),this.container.id=n),Ue.$[n]=this.container;const l=await x(()=>import("./FlowClient-d5d5e377.js"),[],import.meta.url);await this.flowInitClient(l),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(e){return new Promise((o,n)=>{const i=document.createElement("script");i.onload=()=>o(),i.onerror=n,i.src=e,document.body.appendChild(i)})}injectAppIdScript(e){const o=e.substring(0,e.lastIndexOf("-")),n=document.createElement("script");n.type="module",n.setAttribute("data-app-id",o),document.body.append(n)}async flowInitClient(e){return e.init(),new Promise(o=>{const n=setInterval(()=>{Object.keys(w.Vaadin.Flow.clients).filter(s=>s!=="TypeScript").reduce((s,r)=>s||w.Vaadin.Flow.clients[r].isActive(),!1)||(clearInterval(n),o())},5)})}async flowInitUi(){const e=w.Vaadin&&w.Vaadin.TypeScript&&w.Vaadin.TypeScript.initial;return e?(w.Vaadin.TypeScript.initial=void 0,Promise.resolve(e)):new Promise((o,n)=>{const s=new XMLHttpRequest,r=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;s.open("GET",r),s.onerror=()=>n(new kn(`Invalid server response when initializing Flow UI.
        ${s.status}
        ${s.responseText}`)),s.onload=()=>{const l=s.getResponseHeader("content-type");l&&l.indexOf("application/json")!==-1?o(JSON.parse(s.responseText)):s.onerror()},s.send()})}addConnectionIndicator(){I.create(),w.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){w.Vaadin.connectionState.state=$.RECONNECTING;const e=new XMLHttpRequest;e.open("HEAD","sw.js"),e.onload=()=>{w.Vaadin.connectionState.state=$.CONNECTED},e.onerror=()=>{w.Vaadin.connectionState.state=$.CONNECTION_LOST},setTimeout(()=>e.send(),50)}}),w.addEventListener("offline",()=>{this.isFlowClientLoaded()||(w.Vaadin.connectionState.state=$.CONNECTION_LOST)})}async offlineStubAction(){const e=document.createElement("iframe"),o="./offline-stub.html";e.setAttribute("src",o),e.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let n;const i=()=>{n!==void 0&&(w.Vaadin.connectionState.removeStateChangeListener(n),n=void 0)};return e.onBeforeEnter=(s,r,l)=>{n=()=>{w.Vaadin.connectionState.online&&(i(),l.render(s,!1))},w.Vaadin.connectionState.addStateChangeListener(n)},e.onBeforeLeave=(s,r,l)=>{i()},e}isFlowClientLoaded(){return this.response!==void 0}}const{serverSideRoutes:rr}=new sr({imports:()=>x(()=>import("./generated-flow-imports-6c8a63c6.js"),[],import.meta.url)}),ar=[...rr],lr=new le(document.querySelector("#outlet"));lr.setRoutes(ar);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var t="ShadyCSS"in window&&!ShadyCSS.nativeShadow,e=document.implementation.createHTMLDocument(""),o=new WeakMap,n=typeof DOMException=="object"?Error:DOMException,i=Object.defineProperty,s=Array.prototype.forEach,r=/@import.+?;?$/gm;function l(u){var p=u.replace(r,"");return p!==u&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),p.trim()}function a(u){return"isConnected"in u?u.isConnected:document.contains(u)}function d(u){return u.filter(function(p,b){return u.indexOf(p)===b})}function c(u,p){return u.filter(function(b){return p.indexOf(b)===-1})}function m(u){u.parentNode.removeChild(u)}function h(u){return u.shadowRoot||o.get(u)}var f=["addRule","deleteRule","insertRule","removeRule"],se=CSSStyleSheet,re=se.prototype;re.replace=function(){return Promise.reject(new n("Can't call replace on non-constructed CSSStyleSheets."))},re.replaceSync=function(){throw new n("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function te(u){return typeof u=="object"?Ee.isPrototypeOf(u)||re.isPrototypeOf(u):!1}function Ut(u){return typeof u=="object"?re.isPrototypeOf(u):!1}var B=new WeakMap,X=new WeakMap,Se=new WeakMap,xe=new WeakMap;function jt(u,p){var b=document.createElement("style");return Se.get(u).set(p,b),X.get(u).push(p),b}function oe(u,p){return Se.get(u).get(p)}function nt(u,p){Se.get(u).delete(p),X.set(u,X.get(u).filter(function(b){return b!==p}))}function Wo(u,p){requestAnimationFrame(function(){p.textContent=B.get(u).textContent,xe.get(u).forEach(function(b){return p.sheet[b.method].apply(p.sheet,b.args)})})}function it(u){if(!B.has(u))throw new TypeError("Illegal invocation")}function Ft(){var u=this,p=document.createElement("style");e.body.appendChild(p),B.set(u,p),X.set(u,[]),Se.set(u,new WeakMap),xe.set(u,[])}var Ee=Ft.prototype;Ee.replace=function(p){try{return this.replaceSync(p),Promise.resolve(this)}catch(b){return Promise.reject(b)}},Ee.replaceSync=function(p){if(it(this),typeof p=="string"){var b=this;B.get(b).textContent=l(p),xe.set(b,[]),X.get(b).forEach(function(L){L.isConnected()&&Wo(b,oe(b,L))})}},i(Ee,"cssRules",{configurable:!0,enumerable:!0,get:function(){return it(this),B.get(this).sheet.cssRules}}),i(Ee,"media",{configurable:!0,enumerable:!0,get:function(){return it(this),B.get(this).sheet.media}}),f.forEach(function(u){Ee[u]=function(){var p=this;it(p);var b=arguments;xe.get(p).push({method:u,args:b}),X.get(p).forEach(function(D){if(D.isConnected()){var R=oe(p,D).sheet;R[u].apply(R,b)}});var L=B.get(p).sheet;return L[u].apply(L,b)}}),i(Ft,Symbol.hasInstance,{configurable:!0,value:te});var Go={childList:!0,subtree:!0},Ko=new WeakMap;function Ce(u){var p=Ko.get(u);return p||(p=new Xo(u),Ko.set(u,p)),p}function Yo(u){i(u.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Ce(this).sheets},set:function(p){Ce(this).update(p)}})}function Bt(u,p){for(var b=document.createNodeIterator(u,NodeFilter.SHOW_ELEMENT,function(D){return h(D)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),L=void 0;L=b.nextNode();)p(h(L))}var st=new WeakMap,ke=new WeakMap,rt=new WeakMap;function Pi(u,p){return p instanceof HTMLStyleElement&&ke.get(u).some(function(b){return oe(b,u)})}function Jo(u){var p=st.get(u);return p instanceof Document?p.body:p}function Ht(u){var p=document.createDocumentFragment(),b=ke.get(u),L=rt.get(u),D=Jo(u);L.disconnect(),b.forEach(function(R){p.appendChild(oe(R,u)||jt(R,u))}),D.insertBefore(p,null),L.observe(D,Go),b.forEach(function(R){Wo(R,oe(R,u))})}function Xo(u){var p=this;p.sheets=[],st.set(p,u),ke.set(p,[]),rt.set(p,new MutationObserver(function(b,L){if(!document){L.disconnect();return}b.forEach(function(D){t||s.call(D.addedNodes,function(R){R instanceof Element&&Bt(R,function($e){Ce($e).connect()})}),s.call(D.removedNodes,function(R){R instanceof Element&&(Pi(p,R)&&Ht(p),t||Bt(R,function($e){Ce($e).disconnect()}))})})}))}if(Xo.prototype={isConnected:function(){var u=st.get(this);return u instanceof Document?u.readyState!=="loading":a(u.host)},connect:function(){var u=Jo(this);rt.get(this).observe(u,Go),ke.get(this).length>0&&Ht(this),Bt(u,function(p){Ce(p).connect()})},disconnect:function(){rt.get(this).disconnect()},update:function(u){var p=this,b=st.get(p)===document?"Document":"ShadowRoot";if(!Array.isArray(u))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Iterator getter is not callable.");if(!u.every(te))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Failed to convert value to 'CSSStyleSheet'");if(u.some(Ut))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+b+": Can't adopt non-constructed stylesheets");p.sheets=u;var L=ke.get(p),D=d(u),R=c(L,D);R.forEach(function($e){m(oe($e,p)),nt($e,p)}),ke.set(p,D),p.isConnected()&&D.length>0&&Ht(p)}},window.CSSStyleSheet=Ft,Yo(Document),"ShadowRoot"in window){Yo(ShadowRoot);var Qo=Element.prototype,Ai=Qo.attachShadow;Qo.attachShadow=function(p){var b=Ai.call(this,p);return p.mode==="closed"&&o.set(this,b),b}}var at=Ce(document);at.isConnected()?at.connect():document.addEventListener("DOMContentLoaded",at.connect.bind(at))})();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vi=Symbol.for(""),dr=t=>{if((t==null?void 0:t.r)===vi)return t==null?void 0:t._$litStatic$},cr=t=>{if(t._$litStatic$!==void 0)return t._$litStatic$;throw new Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)},ct=(t,...e)=>({_$litStatic$:e.reduce((o,n,i)=>o+cr(n)+t[i+1],t[0]),r:vi}),$n=new Map,hr=t=>(e,...o)=>{const n=o.length;let i,s;const r=[],l=[];let a=0,d=!1,c;for(;a<n;){for(c=e[a];a<n&&(s=o[a],(i=dr(s))!==void 0);)c+=i+e[++a],d=!0;a!==n&&l.push(s),r.push(c),a++}if(a===n&&r.push(e[n]),d){const m=r.join("$$lit$$");e=$n.get(m),e===void 0&&(r.raw=r,$n.set(m,e=r)),o=l}return t(e,...o)},ur=hr(v),pr="modulepreload",mr=function(t){return"/"+t},Tn={},S=function(t,e,o){if(!e||e.length===0)return t();const n=document.getElementsByTagName("link");return Promise.all(e.map(i=>{if(i=mr(i),i in Tn)return;Tn[i]=!0;const s=i.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(o)for(let a=n.length-1;a>=0;a--){const d=n[a];if(d.href===i&&(!s||d.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${r}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":pr,s||(l.as="script",l.crossOrigin=""),l.href=i,document.head.appendChild(l),s)return new Promise((a,d)=>{l.addEventListener("load",a),l.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>t())};function fr(t){var e;const o=[];for(;t&&t.parentNode;){const n=vr(t);if(n.nodeId!==-1){if((e=n.element)!=null&&e.tagName.startsWith("FLOW-CONTAINER-"))break;o.push(n)}t=t.parentElement?t.parentElement:t.parentNode.host}return o.reverse()}function vr(t){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const i of n){const s=o[i];if(s.getNodeId){const r=s.getNodeId(t);if(r>=0)return{nodeId:r,uiId:s.getUIId(),element:t}}}}return{nodeId:-1,uiId:-1,element:void 0}}function gr(t,e){if(t.contains(e))return!0;let o=e;const n=e.ownerDocument;for(;o&&o!==n&&o!==t;)o=o.parentNode||(o instanceof ShadowRoot?o.host:null);return o===t}const yr=(t,e)=>{const o=t[e];return o?typeof o=="function"?o():Promise.resolve(o):new Promise((n,i)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(i.bind(null,new Error("Unknown variable dynamic import: "+e)))})};var P=(t=>(t.text="text",t.checkbox="checkbox",t.range="range",t.color="color",t))(P||{});const J={lumoSize:["--lumo-size-xs","--lumo-size-s","--lumo-size-m","--lumo-size-l","--lumo-size-xl"],lumoSpace:["--lumo-space-xs","--lumo-space-s","--lumo-space-m","--lumo-space-l","--lumo-space-xl"],lumoBorderRadius:["0","--lumo-border-radius-m","--lumo-border-radius-l"],lumoFontSize:["--lumo-font-size-xxs","--lumo-font-size-xs","--lumo-font-size-s","--lumo-font-size-m","--lumo-font-size-l","--lumo-font-size-xl","--lumo-font-size-xxl","--lumo-font-size-xxxl"],lumoTextColor:["--lumo-header-text-color","--lumo-body-text-color","--lumo-secondary-text-color","--lumo-tertiary-text-color","--lumo-disabled-text-color","--lumo-primary-text-color","--lumo-error-text-color","--lumo-success-text-color"],basicBorderSize:["0px","1px","2px","3px"]},br=Object.freeze(Object.defineProperty({__proto__:null,presets:J},Symbol.toStringTag,{value:"Module"})),je={textColor:{propertyName:"color",displayName:"Text color",editorType:P.color,presets:J.lumoTextColor},fontSize:{propertyName:"font-size",displayName:"Font size",editorType:P.range,presets:J.lumoFontSize,icon:"font"},fontWeight:{propertyName:"font-weight",displayName:"Bold",editorType:P.checkbox,checkedValue:"bold"},fontStyle:{propertyName:"font-style",displayName:"Italic",editorType:P.checkbox,checkedValue:"italic"}},Ne={backgroundColor:{propertyName:"background-color",displayName:"Background color",editorType:P.color},borderColor:{propertyName:"border-color",displayName:"Border color",editorType:P.color},borderWidth:{propertyName:"border-width",displayName:"Border width",editorType:P.range,presets:J.basicBorderSize,icon:"square"},borderRadius:{propertyName:"border-radius",displayName:"Border radius",editorType:P.range,presets:J.lumoBorderRadius,icon:"square"},padding:{propertyName:"padding",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"},gap:{propertyName:"gap",displayName:"Spacing",editorType:P.range,presets:J.lumoSpace,icon:"square"}},_r={height:{propertyName:"height",displayName:"Size",editorType:P.range,presets:J.lumoSize,icon:"square"},paddingInline:{propertyName:"padding-inline",displayName:"Padding",editorType:P.range,presets:J.lumoSpace,icon:"square"}},wr={iconColor:{propertyName:"color",displayName:"Icon color",editorType:P.color,presets:J.lumoTextColor},iconSize:{propertyName:"font-size",displayName:"Icon size",editorType:P.range,presets:J.lumoFontSize,icon:"font"}},Sr=Object.freeze(Object.defineProperty({__proto__:null,fieldProperties:_r,iconProperties:wr,shapeProperties:Ne,textProperties:je},Symbol.toStringTag,{value:"Module"}));function gi(t){const e=t.charAt(0).toUpperCase()+t.slice(1);return{tagName:t,displayName:e,elements:[{selector:t,displayName:"Element",properties:[Ne.backgroundColor,Ne.borderColor,Ne.borderWidth,Ne.borderRadius,Ne.padding,je.textColor,je.fontSize,je.fontWeight,je.fontStyle]}]}}const xr=Object.freeze(Object.defineProperty({__proto__:null,createGenericMetadata:gi},Symbol.toStringTag,{value:"Module"})),Er=t=>yr(Object.assign({"./components/defaults.ts":()=>S(()=>Promise.resolve().then(()=>Sr),void 0),"./components/generic.ts":()=>S(()=>Promise.resolve().then(()=>xr),void 0),"./components/presets.ts":()=>S(()=>Promise.resolve().then(()=>br),void 0),"./components/vaadin-app-layout.ts":()=>S(()=>x(()=>import("./vaadin-app-layout-37492a04-f45fbcd8.js"),[],import.meta.url),[]),"./components/vaadin-avatar.ts":()=>S(()=>x(()=>import("./vaadin-avatar-7047be31-5c4b8642.js"),[],import.meta.url),[]),"./components/vaadin-big-decimal-field.ts":()=>S(()=>x(()=>import("./vaadin-big-decimal-field-b42c1de1-2f6f1f1e.js"),["./vaadin-big-decimal-field-b42c1de1-2f6f1f1e.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-big-decimal-field-b42c1de1.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-button.ts":()=>S(()=>x(()=>import("./vaadin-button-79ad9d5f-141edb65.js"),[],import.meta.url),[]),"./components/vaadin-checkbox-group.ts":()=>S(()=>x(()=>import("./vaadin-checkbox-group-a9a9e85d-1e095ff8.js"),["./vaadin-checkbox-group-a9a9e85d-1e095ff8.js","./vaadin-text-field-e82c445d-4b9eecf7.js","./vaadin-checkbox-13797fc9-05bbf5c9.js"],import.meta.url),["assets/vaadin-checkbox-group-a9a9e85d.js","assets/vaadin-text-field-e82c445d.js","assets/vaadin-checkbox-13797fc9.js"]),"./components/vaadin-checkbox.ts":()=>S(()=>x(()=>import("./vaadin-checkbox-13797fc9-05bbf5c9.js"),[],import.meta.url),[]),"./components/vaadin-combo-box.ts":()=>S(()=>x(()=>import("./vaadin-combo-box-9046f78f-26238264.js"),["./vaadin-combo-box-9046f78f-26238264.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-combo-box-9046f78f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-email-field.ts":()=>S(()=>x(()=>import("./vaadin-email-field-da851bcb-50bd4d98.js"),["./vaadin-email-field-da851bcb-50bd4d98.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-email-field-da851bcb.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-horizontal-layout.ts":()=>S(()=>x(()=>import("./vaadin-horizontal-layout-f7b1ab51-115620ea.js"),[],import.meta.url),[]),"./components/vaadin-integer-field.ts":()=>S(()=>x(()=>import("./vaadin-integer-field-6e2954cf-7fb45b7e.js"),["./vaadin-integer-field-6e2954cf-7fb45b7e.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-integer-field-6e2954cf.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-menu-bar.ts":()=>S(()=>x(()=>import("./vaadin-menu-bar-be33385c-82c5a3de.js"),[],import.meta.url),[]),"./components/vaadin-number-field.ts":()=>S(()=>x(()=>import("./vaadin-number-field-31df11f5-5d12a66b.js"),["./vaadin-number-field-31df11f5-5d12a66b.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-number-field-31df11f5.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-password-field.ts":()=>S(()=>x(()=>import("./vaadin-password-field-49ffb113-1be474df.js"),["./vaadin-password-field-49ffb113-1be474df.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-password-field-49ffb113.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-progress-bar.ts":()=>S(()=>x(()=>import("./vaadin-progress-bar-3b53bb70-b9742219.js"),[],import.meta.url),[]),"./components/vaadin-radio-group.ts":()=>S(()=>x(()=>import("./vaadin-radio-group-4a6e2cf4-b12406eb.js"),["./vaadin-radio-group-4a6e2cf4-b12406eb.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-radio-group-4a6e2cf4.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-scroller.ts":()=>S(()=>x(()=>import("./vaadin-scroller-35e68818-03e60256.js"),[],import.meta.url),[]),"./components/vaadin-select.ts":()=>S(()=>x(()=>import("./vaadin-select-5d6ab45b-5a328569.js"),["./vaadin-select-5d6ab45b-5a328569.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-select-5d6ab45b.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-split-layout.ts":()=>S(()=>x(()=>import("./vaadin-split-layout-10c9713b-75aacda1.js"),[],import.meta.url),[]),"./components/vaadin-text-area.ts":()=>S(()=>x(()=>import("./vaadin-text-area-41c5f60c-f0ad14ff.js"),["./vaadin-text-area-41c5f60c-f0ad14ff.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-text-area-41c5f60c.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-text-field.ts":()=>S(()=>x(()=>import("./vaadin-text-field-e82c445d-4b9eecf7.js"),[],import.meta.url),[]),"./components/vaadin-time-picker.ts":()=>S(()=>x(()=>import("./vaadin-time-picker-2fa5314f-1533c403.js"),["./vaadin-time-picker-2fa5314f-1533c403.js","./vaadin-text-field-e82c445d-4b9eecf7.js"],import.meta.url),["assets/vaadin-time-picker-2fa5314f.js","assets/vaadin-text-field-e82c445d.js"]),"./components/vaadin-vertical-layout.ts":()=>S(()=>x(()=>import("./vaadin-vertical-layout-ff73c403-33ef689a.js"),[],import.meta.url),[]),"./components/vaadin-virtual-list.ts":()=>S(()=>x(()=>import("./vaadin-virtual-list-62d4499a-9f31473c.js"),[],import.meta.url),[])}),`./components/${t}.ts`);class Cr{constructor(e=Er){this.loader=e,this.metadata={}}async getMetadata(e){var o;const n=(o=e.element)==null?void 0:o.localName;if(!n)return null;if(!n.startsWith("vaadin-"))return gi(n);let i=this.metadata[n];if(i)return i;try{i=(await this.loader(n)).default,this.metadata[n]=i}catch{console.warn(`Failed to load metadata for component: ${n}`)}return i||null}}const kr=new Cr,yt={crosshair:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
   <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
   <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
   <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
   <path d="M9 12l6 0"></path>
   <path d="M12 9l0 6"></path>
</svg>`,square:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
</svg>`,font:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 20l3 0"></path>
   <path d="M14 20l7 0"></path>
   <path d="M6.9 15l6.9 0"></path>
   <path d="M10.2 6.3l5.8 13.7"></path>
   <path d="M5 20l6 -16l2 0l7 16"></path>
</svg>`,undo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1"></path>
</svg>`,redo:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 13l4 -4l-4 -4m4 4h-11a4 4 0 0 0 0 8h1"></path>
</svg>`,cross:Te`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`};var Ye=(t=>(t.disabled="disabled",t.enabled="enabled",t.missing_theme="missing_theme",t))(Ye||{}),z=(t=>(t.local="local",t.global="global",t))(z||{});function mo(t,e){return`${t}|${e}`}class ce{constructor(e){this._properties={},this._metadata=e}get metadata(){return this._metadata}get properties(){return Object.values(this._properties)}getPropertyValue(e,o){return this._properties[mo(e,o)]||null}updatePropertyValue(e,o,n,i){if(!n){delete this._properties[mo(e,o)];return}let s=this.getPropertyValue(e,o);s?(s.value=n,s.modified=i||!1):(s={elementSelector:e,propertyName:o,value:n,modified:i||!1},this._properties[mo(e,o)]=s)}addPropertyValues(e){e.forEach(o=>{this.updatePropertyValue(o.elementSelector,o.propertyName,o.value,o.modified)})}getPropertyValuesForElement(e){return this.properties.filter(o=>o.elementSelector===e)}static combine(...e){if(e.length<2)throw new Error("Must provide at least two themes");const o=new ce(e[0].metadata);return e.forEach(n=>o.addPropertyValues(n.properties)),o}static fromServerRules(e,o,n){const i=new ce(e);return e.elements.forEach(s=>{const r=Le(s,o),l=n.find(a=>a.selector===r);l&&s.properties.forEach(a=>{const d=l.properties[a.propertyName];d&&i.updatePropertyValue(s.selector,a.propertyName,d,!0)})}),i}}function Le(t,e){const o=t.selector;if(e.themeScope==="global")return o;if(!e.localClassName)throw new Error("Can not build local scoped selector without instance class name");const n=o.match(/^[\w\d-_]+/),i=n&&n[0];if(!i)throw new Error(`Selector does not start with a tag name: ${o}`);return`${i}.${e.localClassName}${o.substring(i.length,o.length)}`}function $r(t,e,o,n){const i=Le(t,e),s={[o]:n};return o==="border-width"&&(parseInt(n)>0?s["border-style"]="solid":s["border-style"]=""),{selector:i,properties:s}}function Tr(t){const e=Object.entries(t.properties).map(([o,n])=>`${o}: ${n};`).join(" ");return`${t.selector} { ${e} }`}let ht,Nn="";function Vo(t){ht||(ht=new CSSStyleSheet,document.adoptedStyleSheets=[...document.adoptedStyleSheets,ht]),Nn+=t.cssText,ht.replaceSync(Nn)}const yi=E`
  .editor-row {
    display: flex;
    align-items: baseline;
    padding: var(--theme-editor-section-horizontal-padding);
    gap: 10px;
  }

  .editor-row > .label {
    flex: 0 0 auto;
    width: 120px;
  }

  .editor-row > .editor {
    flex: 1 1 0;
  }
`,Pn="__vaadin-theme-editor-measure-element",An=/((::before)|(::after))$/,In=/::part\(([\w\d_-]+)\)$/;Vo(E`
  .__vaadin-theme-editor-measure-element {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
  }
`);async function Nr(t){const e=new ce(t),o=document.createElement(t.tagName);o.classList.add(Pn),document.body.append(o),t.setupElement&&await t.setupElement(o);const n={themeScope:z.local,localClassName:Pn};try{t.elements.forEach(i=>{Rn(o,i,n,!0);let s=Le(i,n);const r=s.match(An);s=s.replace(An,"");const l=s.match(In),a=s.replace(In,"");let d=document.querySelector(a);if(d&&l){const h=`[part~="${l[1]}"]`;d=d.shadowRoot.querySelector(h)}if(!d)return;d.style.transition="none";const c=r?r[1]:null,m=getComputedStyle(d,c);i.properties.forEach(h=>{const f=m.getPropertyValue(h.propertyName)||h.defaultValue||"";e.updatePropertyValue(i.selector,h.propertyName,f)}),Rn(o,i,n,!1)})}finally{try{t.cleanupElement&&await t.cleanupElement(o)}finally{o.remove()}}return e}function Rn(t,e,o,n){if(e.stateAttribute){if(e.stateElementSelector){const i=Le({...e,selector:e.stateElementSelector},o);t=document.querySelector(i)}t&&(n?t.setAttribute(e.stateAttribute,""):t.removeAttribute(e.stateAttribute))}}function On(t){return t.trim()}function Pr(t){const e=t.element;if(!e)return null;const o=e.querySelector("label");if(o&&o.textContent)return On(o.textContent);const n=e.textContent;return n?On(n):null}class Ar{constructor(){this._localClassNameMap=new Map}get stylesheet(){return this.ensureStylesheet(),this._stylesheet}add(e){this.ensureStylesheet(),this._stylesheet.replaceSync(e)}clear(){this.ensureStylesheet(),this._stylesheet.replaceSync("")}previewLocalClassName(e,o){if(!e)return;const n=this._localClassNameMap.get(e);n&&(e.classList.remove(n),e.overlayClass=null),o?(e.classList.add(o),e.overlayClass=o,this._localClassNameMap.set(e,o)):this._localClassNameMap.delete(e)}ensureStylesheet(){this._stylesheet||(this._stylesheet=new CSSStyleSheet,this._stylesheet.replaceSync(""),document.adoptedStyleSheets=[...document.adoptedStyleSheets,this._stylesheet])}}const fe=new Ar;class Ir{constructor(e){this.pendingRequests={},this.requestCounter=0,this.globalUiId=this.getGlobalUiId(),this.wrappedConnection=e;const o=this.wrappedConnection.onMessage;this.wrappedConnection.onMessage=n=>{n.command==="themeEditorResponse"?this.handleResponse(n.data):o.call(this.wrappedConnection,n)}}sendRequest(e,o){const n=(this.requestCounter++).toString(),i=o.uiId??this.globalUiId;return new Promise((s,r)=>{this.wrappedConnection.send(e,{...o,requestId:n,uiId:i}),this.pendingRequests[n]={resolve:s,reject:r}})}handleResponse(e){const o=this.pendingRequests[e.requestId];if(!o){console.warn("Received response for unknown request");return}delete this.pendingRequests[e.requestId],e.code==="ok"?o.resolve(e):o.reject(e)}loadComponentMetadata(e){return this.sendRequest("themeEditorComponentMetadata",{nodeId:e.nodeId})}setLocalClassName(e,o){return this.sendRequest("themeEditorLocalClassName",{nodeId:e.nodeId,className:o})}setCssRules(e){return this.sendRequest("themeEditorRules",{rules:e})}loadRules(e){return this.sendRequest("themeEditorLoadRules",{selectors:e})}markAsUsed(){return this.sendRequest("themeEditorMarkAsUsed",{})}undo(e){return this.sendRequest("themeEditorHistory",{undo:e})}redo(e){return this.sendRequest("themeEditorHistory",{redo:e})}openCss(e){return this.sendRequest("themeEditorOpenCss",{selector:e})}getGlobalUiId(){const e=window.Vaadin;if(e&&e.Flow){const{clients:o}=e.Flow,n=Object.keys(o);for(const i of n){const s=o[i];if(s.getNodeId)return s.getUIId()}}return-1}}const O={index:-1,entries:[]};class Rr{constructor(e){this.api=e}get allowUndo(){return O.index>=0}get allowRedo(){return O.index<O.entries.length-1}get allowedActions(){return{allowUndo:this.allowUndo,allowRedo:this.allowRedo}}push(e,o,n){const i={requestId:e,execute:o,rollback:n};if(O.index++,O.entries=O.entries.slice(0,O.index),O.entries.push(i),o)try{o()}catch(s){console.error("Execute history entry failed",s)}return this.allowedActions}async undo(){if(!this.allowUndo)return this.allowedActions;const e=O.entries[O.index];O.index--;try{await this.api.undo(e.requestId),e.rollback&&e.rollback()}catch(o){console.error("Undo failed",o)}return this.allowedActions}async redo(){if(!this.allowRedo)return this.allowedActions;O.index++;const e=O.entries[O.index];try{await this.api.redo(e.requestId),e.execute&&e.execute()}catch(o){console.error("Redo failed",o)}return this.allowedActions}static clear(){O.entries=[],O.index=-1}}var Or=Object.defineProperty,Lr=Object.getOwnPropertyDescriptor,ue=(t,e,o,n)=>{for(var i=n>1?void 0:n?Lr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Or(e,o,i),i};class Mr extends CustomEvent{constructor(e,o,n){super("theme-property-value-change",{bubbles:!0,composed:!0,detail:{element:e,property:o,value:n}})}}class q extends A{constructor(){super(...arguments),this.value=""}static get styles(){return[yi,E`
        :host {
          display: block;
        }

        .editor-row .label .modified {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: orange;
          border-radius: 3px;
          margin-left: 3px;
        }
      `]}update(e){super.update(e),(e.has("propertyMetadata")||e.has("theme"))&&this.updateValueFromTheme()}render(){var e;return v`
      <div class="editor-row">
        <div class="label">
          ${this.propertyMetadata.displayName}
          ${(e=this.propertyValue)!=null&&e.modified?v`<span class="modified"></span>`:null}
        </div>
        <div class="editor">${this.renderEditor()}</div>
      </div>
    `}updateValueFromTheme(){var e;this.propertyValue=this.theme.getPropertyValue(this.elementMetadata.selector,this.propertyMetadata.propertyName),this.value=((e=this.propertyValue)==null?void 0:e.value)||""}dispatchChange(e){this.dispatchEvent(new Mr(this.elementMetadata,this.propertyMetadata,e))}}ue([y({})],q.prototype,"elementMetadata",2);ue([y({})],q.prototype,"propertyMetadata",2);ue([y({})],q.prototype,"theme",2);ue([T()],q.prototype,"propertyValue",2);ue([T()],q.prototype,"value",2);class $t{constructor(e){if(this._values=[],this._rawValues={},e){const o=e.propertyName,n=e.presets??[];this._values=(n||[]).map(s=>s.startsWith("--")?`var(${s})`:s);const i=document.createElement("div");i.style.borderStyle="solid",i.style.visibility="hidden",document.body.append(i);try{this._values.forEach(s=>{i.style.setProperty(o,s);const r=getComputedStyle(i);this._rawValues[s]=r.getPropertyValue(o).trim()})}finally{i.remove()}}}get values(){return this._values}get rawValues(){return this._rawValues}tryMapToRawValue(e){return this._rawValues[e]??e}tryMapToPreset(e){return this.findPreset(e)??e}findPreset(e){const o=e&&e.trim();return this.values.find(n=>this._rawValues[n]===o)}}class Ln extends CustomEvent{constructor(e){super("change",{detail:{value:e}})}}let Tt=class extends A{constructor(){super(...arguments),this.value="",this.showClearButton=!1}static get styles(){return E`
      :host {
        display: inline-block;
        width: 100%;
        position: relative;
      }

      input {
        width: 100%;
        box-sizing: border-box;
        padding: 0.25rem 0.375rem;
        color: inherit;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 0.25rem;
        border: none;
      }

      button {
        display: none;
        position: absolute;
        right: 4px;
        top: 4px;
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      button svg {
        width: 16px;
        height: 16px;
      }

      button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      :host(.show-clear-button) input {
        padding-right: 20px;
      }

      :host(.show-clear-button) button {
        display: block;
      }
    `}update(t){super.update(t),t.has("showClearButton")&&(this.showClearButton?this.classList.add("show-clear-button"):this.classList.remove("show-clear-button"))}render(){return v`
      <input class="input" .value=${this.value} @change=${this.handleInputChange} />
      <button @click=${this.handleClearClick}>${yt.cross}</button>
    `}handleInputChange(t){const e=t.target;this.dispatchEvent(new Ln(e.value))}handleClearClick(){this.dispatchEvent(new Ln(""))}};ue([y({})],Tt.prototype,"value",2);ue([y({})],Tt.prototype,"showClearButton",2);Tt=ue([F("vaadin-dev-tools-theme-text-input")],Tt);var Vr=Object.defineProperty,Dr=Object.getOwnPropertyDescriptor,Vt=(t,e,o,n)=>{for(var i=n>1?void 0:n?Dr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Vr(e,o,i),i};class zr extends CustomEvent{constructor(e){super("class-name-change",{detail:{value:e}})}}let Je=class extends A{constructor(){super(...arguments),this.editedClassName="",this.invalid=!1}static get styles(){return[yi,E`
        .editor-row {
          padding-top: 0;
        }

        .editor-row .editor .error {
          display: inline-block;
          color: var(--dev-tools-red-color);
          margin-top: 4px;
        }
      `]}update(t){super.update(t),t.has("className")&&(this.editedClassName=this.className,this.invalid=!1)}render(){return v` <div class="editor-row local-class-name">
      <div class="label">CSS class name</div>
      <div class="editor">
        <vaadin-dev-tools-theme-text-input
          type="text"
          .value=${this.editedClassName}
          @change=${this.handleInputChange}
        ></vaadin-dev-tools-theme-text-input>
        ${this.invalid?v`<br /><span class="error">Please enter a valid CSS class name</span>`:null}
      </div>
    </div>`}handleInputChange(t){this.editedClassName=t.detail.value;const e=/^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;this.invalid=!this.editedClassName.match(e),!this.invalid&&this.editedClassName!==this.className&&this.dispatchEvent(new zr(this.editedClassName))}};Vt([y({})],Je.prototype,"className",2);Vt([T()],Je.prototype,"editedClassName",2);Vt([T()],Je.prototype,"invalid",2);Je=Vt([F("vaadin-dev-tools-theme-class-name-editor")],Je);var Ur=Object.defineProperty,jr=Object.getOwnPropertyDescriptor,Dt=(t,e,o,n)=>{for(var i=n>1?void 0:n?jr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Ur(e,o,i),i};class Fr extends CustomEvent{constructor(e){super("scope-change",{detail:{value:e}})}}Vo(E`
  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] {
    --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
    z-index: 100000 !important;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector']::part(overlay) {
    background: #333;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item {
    color: rgba(255, 255, 255, 0.8);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(content) {
    font-size: 13px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item .title {
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark) {
    margin: 6px;
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item::part(checkmark)::before {
    color: rgba(255, 255, 255, 0.95);
  }

  vaadin-select-overlay[theme~='vaadin-dev-tools-theme-scope-selector'] vaadin-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`);let Xe=class extends A{constructor(){super(...arguments),this.value=z.local}static get styles(){return E`
      vaadin-select {
        --lumo-primary-color-50pct: rgba(255, 255, 255, 0.5);
        width: 100px;
      }

      vaadin-select::part(input-field) {
        background: rgba(0, 0, 0, 0.2);
      }

      vaadin-select vaadin-select-value-button,
      vaadin-select::part(toggle-button) {
        color: var(--dev-tools-text-color);
      }

      vaadin-select:hover vaadin-select-value-button,
      vaadin-select:hover::part(toggle-button) {
        color: var(--dev-tools-text-color-emphasis);
      }

      vaadin-select vaadin-select-item {
        font-size: 13px;
      }
    `}update(t){var e;super.update(t),t.has("metadata")&&((e=this.select)==null||e.requestContentUpdate())}render(){return v` <vaadin-select
      theme="small vaadin-dev-tools-theme-scope-selector"
      .value=${this.value}
      .renderer=${this.selectRenderer.bind(this)}
      @value-changed=${this.handleValueChange}
    ></vaadin-select>`}selectRenderer(t){var e;const o=((e=this.metadata)==null?void 0:e.displayName)||"Component",n=`${o}s`;Ae(v`
        <vaadin-list-box>
          <vaadin-item value=${z.local} label="Local">
            <span class="title">Local</span>
            <br />
            <span>Edit styles for this ${o}</span>
          </vaadin-item>
          <vaadin-item value=${z.global} label="Global">
            <span class="title">Global</span>
            <br />
            <span>Edit styles for all ${n}</span>
          </vaadin-item>
        </vaadin-list-box>
      `,t)}handleValueChange(t){const e=t.detail.value;e!==this.value&&this.dispatchEvent(new Fr(e))}};Dt([y({})],Xe.prototype,"value",2);Dt([y({})],Xe.prototype,"metadata",2);Dt([tt("vaadin-select")],Xe.prototype,"select",2);Xe=Dt([F("vaadin-dev-tools-theme-scope-selector")],Xe);var Br=Object.defineProperty,Hr=Object.getOwnPropertyDescriptor,qr=(t,e,o,n)=>{for(var i=n>1?void 0:n?Hr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Br(e,o,i),i};let Mn=class extends q{static get styles(){return[q.styles,E`
        .editor-row {
          align-items: center;
        }
      `]}handleInputChange(t){const e=t.target.checked?this.propertyMetadata.checkedValue:"";this.dispatchChange(e||"")}renderEditor(){const t=this.value===this.propertyMetadata.checkedValue;return v` <input type="checkbox" .checked=${t} @change=${this.handleInputChange} /> `}};Mn=qr([F("vaadin-dev-tools-theme-checkbox-property-editor")],Mn);var Wr=Object.defineProperty,Gr=Object.getOwnPropertyDescriptor,Kr=(t,e,o,n)=>{for(var i=n>1?void 0:n?Gr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Wr(e,o,i),i};let Vn=class extends q{handleInputChange(t){this.dispatchChange(t.detail.value)}renderEditor(){var t;return v`
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}};Vn=Kr([F("vaadin-dev-tools-theme-text-property-editor")],Vn);var Yr=Object.defineProperty,Jr=Object.getOwnPropertyDescriptor,Do=(t,e,o,n)=>{for(var i=n>1?void 0:n?Jr(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Yr(e,o,i),i};let Nt=class extends q{constructor(){super(...arguments),this.selectedPresetIndex=-1,this.presets=new $t}static get styles(){return[q.styles,E`
        :host {
          --preset-count: 3;
          --slider-bg: #fff;
          --slider-border: #333;
        }

        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .editor-row .input {
          flex: 0 0 auto;
          width: 80px;
        }

        .slider-wrapper {
          flex: 1 1 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .icon {
          width: 20px;
          height: 20px;
          color: #aaa;
        }

        .icon.prefix > svg {
          transform: scale(0.75);
        }

        .slider {
          flex: 1 1 0;
          -webkit-appearance: none;
          background: linear-gradient(to right, #666, #666 2px, transparent 2px);
          background-size: calc((100% - 13px) / (var(--preset-count) - 1)) 8px;
          background-position: 5px 50%;
          background-repeat: repeat-x;
        }

        .slider::-webkit-slider-runnable-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-moz-range-track {
          width: 100%;
          box-sizing: border-box;
          height: 16px;
          background-image: linear-gradient(#666, #666);
          background-size: calc(100% - 12px) 2px;
          background-repeat: no-repeat;
          background-position: 6px 50%;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border: 2px solid var(--slider-border);
          border-radius: 50%;
          background: var(--slider-bg);
          cursor: pointer;
        }

        .custom-value {
          opacity: 0.5;
        }

        .custom-value:hover,
        .custom-value:focus-within {
          opacity: 1;
        }

        .custom-value:not(:hover, :focus-within) {
          --slider-bg: #333;
          --slider-border: #666;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new $t(this.propertyMetadata)),super.update(t)}renderEditor(){var t;const e={"slider-wrapper":!0,"custom-value":this.selectedPresetIndex<0},o=this.presets.values.length;return v`
      <div class=${Mo(e)}>
        ${null}
        <input
          type="range"
          class="slider"
          style="--preset-count: ${o}"
          step="1"
          min="0"
          .max=${(o-1).toString()}
          .value=${this.selectedPresetIndex}
          @input=${this.handleSliderInput}
          @change=${this.handleSliderChange}
        />
        ${null}
      </div>
      <vaadin-dev-tools-theme-text-input
        class="input"
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleValueChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleSliderInput(t){const e=t.target,o=parseInt(e.value),n=this.presets.values[o];this.selectedPresetIndex=o,this.value=this.presets.rawValues[n]}handleSliderChange(){this.dispatchChange(this.value)}handleValueChange(t){this.value=t.detail.value,this.updateSliderValue(),this.dispatchChange(this.value)}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||""),this.updateSliderValue()}updateSliderValue(){const t=this.presets.findPreset(this.value);this.selectedPresetIndex=t?this.presets.values.indexOf(t):-1}};Do([T()],Nt.prototype,"selectedPresetIndex",2);Do([T()],Nt.prototype,"presets",2);Nt=Do([F("vaadin-dev-tools-theme-range-property-editor")],Nt);const Me=(t,e=0,o=1)=>t>o?o:t<e?e:t,V=(t,e=0,o=Math.pow(10,e))=>Math.round(o*t)/o,bi=({h:t,s:e,v:o,a:n})=>{const i=(200-e)*o/100;return{h:V(t),s:V(i>0&&i<200?e*o/100/(i<=100?i:200-i)*100:0),l:V(i/2),a:V(n,2)}},ko=t=>{const{h:e,s:o,l:n}=bi(t);return`hsl(${e}, ${o}%, ${n}%)`},fo=t=>{const{h:e,s:o,l:n,a:i}=bi(t);return`hsla(${e}, ${o}%, ${n}%, ${i})`},Xr=({h:t,s:e,v:o,a:n})=>{t=t/360*6,e=e/100,o=o/100;const i=Math.floor(t),s=o*(1-e),r=o*(1-(t-i)*e),l=o*(1-(1-t+i)*e),a=i%6;return{r:V([o,r,s,s,l,o][a]*255),g:V([l,o,o,r,s,s][a]*255),b:V([s,s,l,o,o,r][a]*255),a:V(n,2)}},Qr=t=>{const{r:e,g:o,b:n,a:i}=Xr(t);return`rgba(${e}, ${o}, ${n}, ${i})`},Zr=t=>{const e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(t);return e?ea({r:Number(e[1])/(e[2]?100/255:1),g:Number(e[3])/(e[4]?100/255:1),b:Number(e[5])/(e[6]?100/255:1),a:e[7]===void 0?1:Number(e[7])/(e[8]?100:1)}):{h:0,s:0,v:0,a:1}},ea=({r:t,g:e,b:o,a:n})=>{const i=Math.max(t,e,o),s=i-Math.min(t,e,o),r=s?i===t?(e-o)/s:i===e?2+(o-t)/s:4+(t-e)/s:0;return{h:V(60*(r<0?r+6:r)),s:V(i?s/i*100:0),v:V(i/255*100),a:n}},ta=(t,e)=>{if(t===e)return!0;for(const o in t)if(t[o]!==e[o])return!1;return!0},oa=(t,e)=>t.replace(/\s/g,"")===e.replace(/\s/g,""),Dn={},_i=t=>{let e=Dn[t];return e||(e=document.createElement("template"),e.innerHTML=t,Dn[t]=e),e},zo=(t,e,o)=>{t.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:o}))};let Ie=!1;const $o=t=>"touches"in t,na=t=>Ie&&!$o(t)?!1:(Ie||(Ie=$o(t)),!0),zn=(t,e)=>{const o=$o(e)?e.touches[0]:e,n=t.el.getBoundingClientRect();zo(t.el,"move",t.getMove({x:Me((o.pageX-(n.left+window.pageXOffset))/n.width),y:Me((o.pageY-(n.top+window.pageYOffset))/n.height)}))},ia=(t,e)=>{const o=e.keyCode;o>40||t.xy&&o<37||o<33||(e.preventDefault(),zo(t.el,"move",t.getMove({x:o===39?.01:o===37?-.01:o===34?.05:o===33?-.05:o===35?1:o===36?-1:0,y:o===40?.01:o===38?-.01:0},!0)))};class Uo{constructor(e,o,n,i){const s=_i(`<div role="slider" tabindex="0" part="${o}" ${n}><div part="${o}-pointer"></div></div>`);e.appendChild(s.content.cloneNode(!0));const r=e.querySelector(`[part=${o}]`);r.addEventListener("mousedown",this),r.addEventListener("touchstart",this),r.addEventListener("keydown",this),this.el=r,this.xy=i,this.nodes=[r.firstChild,r]}set dragging(e){const o=e?document.addEventListener:document.removeEventListener;o(Ie?"touchmove":"mousemove",this),o(Ie?"touchend":"mouseup",this)}handleEvent(e){switch(e.type){case"mousedown":case"touchstart":if(e.preventDefault(),!na(e)||!Ie&&e.button!=0)return;this.el.focus(),zn(this,e),this.dragging=!0;break;case"mousemove":case"touchmove":e.preventDefault(),zn(this,e);break;case"mouseup":case"touchend":this.dragging=!1;break;case"keydown":ia(this,e);break}}style(e){e.forEach((o,n)=>{for(const i in o)this.nodes[n].style.setProperty(i,o[i])})}}class sa extends Uo{constructor(e){super(e,"hue",'aria-label="Hue" aria-valuemin="0" aria-valuemax="360"',!1)}update({h:e}){this.h=e,this.style([{left:`${e/360*100}%`,color:ko({h:e,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuenow",`${V(e)}`)}getMove(e,o){return{h:o?Me(this.h+e.x*360,0,360):360*e.x}}}class ra extends Uo{constructor(e){super(e,"saturation",'aria-label="Color"',!0)}update(e){this.hsva=e,this.style([{top:`${100-e.v}%`,left:`${e.s}%`,color:ko(e)},{"background-color":ko({h:e.h,s:100,v:100,a:1})}]),this.el.setAttribute("aria-valuetext",`Saturation ${V(e.s)}%, Brightness ${V(e.v)}%`)}getMove(e,o){return{s:o?Me(this.hsva.s+e.x*100,0,100):e.x*100,v:o?Me(this.hsva.v-e.y*100,0,100):Math.round(100-e.y*100)}}}const aa=':host{display:flex;flex-direction:column;position:relative;width:200px;height:200px;user-select:none;-webkit-user-select:none;cursor:default}:host([hidden]){display:none!important}[role=slider]{position:relative;touch-action:none;user-select:none;-webkit-user-select:none;outline:0}[role=slider]:last-child{border-radius:0 0 8px 8px}[part$=pointer]{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;display:flex;place-content:center center;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}[part$=pointer]::after{content:"";width:100%;height:100%;border-radius:inherit;background-color:currentColor}[role=slider]:focus [part$=pointer]{transform:translate(-50%,-50%) scale(1.1)}',la="[part=hue]{flex:0 0 24px;background:linear-gradient(to right,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red 100%)}[part=hue-pointer]{top:50%;z-index:2}",da="[part=saturation]{flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(to top,#000,transparent),linear-gradient(to right,#fff,rgba(255,255,255,0));box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part=saturation-pointer]{z-index:3}",ut=Symbol("same"),vo=Symbol("color"),Un=Symbol("hsva"),go=Symbol("update"),jn=Symbol("parts"),Pt=Symbol("css"),At=Symbol("sliders");let ca=class extends HTMLElement{static get observedAttributes(){return["color"]}get[Pt](){return[aa,la,da]}get[At](){return[ra,sa]}get color(){return this[vo]}set color(t){if(!this[ut](t)){const e=this.colorModel.toHsva(t);this[go](e),this[vo]=t}}constructor(){super();const t=_i(`<style>${this[Pt].join("")}</style>`),e=this.attachShadow({mode:"open"});e.appendChild(t.content.cloneNode(!0)),e.addEventListener("move",this),this[jn]=this[At].map(o=>new o(e))}connectedCallback(){if(this.hasOwnProperty("color")){const t=this.color;delete this.color,this.color=t}else this.color||(this.color=this.colorModel.defaultColor)}attributeChangedCallback(t,e,o){const n=this.colorModel.fromAttr(o);this[ut](n)||(this.color=n)}handleEvent(t){const e=this[Un],o={...e,...t.detail};this[go](o);let n;!ta(o,e)&&!this[ut](n=this.colorModel.fromHsva(o))&&(this[vo]=n,zo(this,"color-changed",{value:n}))}[ut](t){return this.color&&this.colorModel.equal(t,this.color)}[go](t){this[Un]=t,this[jn].forEach(e=>e.update(t))}};class ha extends Uo{constructor(e){super(e,"alpha",'aria-label="Alpha" aria-valuemin="0" aria-valuemax="1"',!1)}update(e){this.hsva=e;const o=fo({...e,a:0}),n=fo({...e,a:1}),i=e.a*100;this.style([{left:`${i}%`,color:fo(e)},{"--gradient":`linear-gradient(90deg, ${o}, ${n}`}]);const s=V(i);this.el.setAttribute("aria-valuenow",`${s}`),this.el.setAttribute("aria-valuetext",`${s}%`)}getMove(e,o){return{a:o?Me(this.hsva.a+e.x):e.x}}}const ua=`[part=alpha]{flex:0 0 24px}[part=alpha]::after{display:block;content:"";position:absolute;top:0;left:0;right:0;bottom:0;border-radius:inherit;background-image:var(--gradient);box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}[part^=alpha]{background-color:#fff;background-image:url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><rect x="8" width="8" height="8"/><rect y="8" width="8" height="8"/></svg>')}[part=alpha-pointer]{top:50%}`;class pa extends ca{get[Pt](){return[...super[Pt],ua]}get[At](){return[...super[At],ha]}}const ma={defaultColor:"rgba(0, 0, 0, 1)",toHsva:Zr,fromHsva:Qr,equal:oa,fromAttr:t=>t};class fa extends pa{get colorModel(){return ma}}/**
* @license
* Copyright (c) 2017 - 2023 Vaadin Ltd.
* This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
*/function va(t){const e=[];for(;t;){if(t.nodeType===Node.DOCUMENT_NODE){e.push(t);break}if(t.nodeType===Node.DOCUMENT_FRAGMENT_NODE){e.push(t),t=t.host;continue}if(t.assignedSlot){t=t.assignedSlot;continue}t=t.parentNode}return e}const yo={start:"top",end:"bottom"},bo={start:"left",end:"right"},Fn=new ResizeObserver(t=>{setTimeout(()=>{t.forEach(e=>{e.target.__overlay&&e.target.__overlay._updatePosition()})})}),ga=t=>class extends t{static get properties(){return{positionTarget:{type:Object,value:null},horizontalAlign:{type:String,value:"start"},verticalAlign:{type:String,value:"top"},noHorizontalOverlap:{type:Boolean,value:!1},noVerticalOverlap:{type:Boolean,value:!1},requiredVerticalSpace:{type:Number,value:0}}}static get observers(){return["__positionSettingsChanged(horizontalAlign, verticalAlign, noHorizontalOverlap, noVerticalOverlap, requiredVerticalSpace)","__overlayOpenedChanged(opened, positionTarget)"]}constructor(){super(),this.__onScroll=this.__onScroll.bind(this),this._updatePosition=this._updatePosition.bind(this)}connectedCallback(){super.connectedCallback(),this.opened&&this.__addUpdatePositionEventListeners()}disconnectedCallback(){super.disconnectedCallback(),this.__removeUpdatePositionEventListeners()}__addUpdatePositionEventListeners(){window.addEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes=va(this.positionTarget),this.__positionTargetAncestorRootNodes.forEach(e=>{e.addEventListener("scroll",this.__onScroll,!0)})}__removeUpdatePositionEventListeners(){window.removeEventListener("resize",this._updatePosition),this.__positionTargetAncestorRootNodes&&(this.__positionTargetAncestorRootNodes.forEach(e=>{e.removeEventListener("scroll",this.__onScroll,!0)}),this.__positionTargetAncestorRootNodes=null)}__overlayOpenedChanged(e,o){if(this.__removeUpdatePositionEventListeners(),o&&(o.__overlay=null,Fn.unobserve(o),e&&(this.__addUpdatePositionEventListeners(),o.__overlay=this,Fn.observe(o))),e){const n=getComputedStyle(this);this.__margins||(this.__margins={},["top","bottom","left","right"].forEach(i=>{this.__margins[i]=parseInt(n[i],10)})),this.setAttribute("dir",n.direction),this._updatePosition(),requestAnimationFrame(()=>this._updatePosition())}}__positionSettingsChanged(){this._updatePosition()}__onScroll(e){this.contains(e.target)||this._updatePosition()}_updatePosition(){if(!this.positionTarget||!this.opened)return;const e=this.positionTarget.getBoundingClientRect(),o=this.__shouldAlignStartVertically(e);this.style.justifyContent=o?"flex-start":"flex-end";const n=this.__isRTL,i=this.__shouldAlignStartHorizontally(e,n),s=!n&&i||n&&!i;this.style.alignItems=s?"flex-start":"flex-end";const r=this.getBoundingClientRect(),l=this.__calculatePositionInOneDimension(e,r,this.noVerticalOverlap,yo,this,o),a=this.__calculatePositionInOneDimension(e,r,this.noHorizontalOverlap,bo,this,i);Object.assign(this.style,l,a),this.toggleAttribute("bottom-aligned",!o),this.toggleAttribute("top-aligned",o),this.toggleAttribute("end-aligned",!s),this.toggleAttribute("start-aligned",s)}__shouldAlignStartHorizontally(e,o){const n=Math.max(this.__oldContentWidth||0,this.$.overlay.offsetWidth);this.__oldContentWidth=this.$.overlay.offsetWidth;const i=Math.min(window.innerWidth,document.documentElement.clientWidth),s=!o&&this.horizontalAlign==="start"||o&&this.horizontalAlign==="end";return this.__shouldAlignStart(e,n,i,this.__margins,s,this.noHorizontalOverlap,bo)}__shouldAlignStartVertically(e){const o=this.requiredVerticalSpace||Math.max(this.__oldContentHeight||0,this.$.overlay.offsetHeight);this.__oldContentHeight=this.$.overlay.offsetHeight;const n=Math.min(window.innerHeight,document.documentElement.clientHeight),i=this.verticalAlign==="top";return this.__shouldAlignStart(e,o,n,this.__margins,i,this.noVerticalOverlap,yo)}__shouldAlignStart(e,o,n,i,s,r,l){const a=n-e[r?l.end:l.start]-i[l.end],d=e[r?l.start:l.end]-i[l.start],c=s?a:d,m=c>(s?d:a)||c>o;return s===m}__adjustBottomProperty(e,o,n){let i;if(e===o.end){if(o.end===yo.end){const s=Math.min(window.innerHeight,document.documentElement.clientHeight);if(n>s&&this.__oldViewportHeight){const r=this.__oldViewportHeight-s;i=n-r}this.__oldViewportHeight=s}if(o.end===bo.end){const s=Math.min(window.innerWidth,document.documentElement.clientWidth);if(n>s&&this.__oldViewportWidth){const r=this.__oldViewportWidth-s;i=n-r}this.__oldViewportWidth=s}}return i}__calculatePositionInOneDimension(e,o,n,i,s,r){const l=r?i.start:i.end,a=r?i.end:i.start,d=parseFloat(s.style[l]||getComputedStyle(s)[l]),c=this.__adjustBottomProperty(l,i,d),m=o[r?i.start:i.end]-e[n===r?i.end:i.start],h=c?`${c}px`:`${d+m*(r?-1:1)}px`;return{[l]:h,[a]:""}}};var ya=Object.defineProperty,ba=Object.getOwnPropertyDescriptor,we=(t,e,o,n)=>{for(var i=n>1?void 0:n?ba(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&ya(e,o,i),i};class _a extends CustomEvent{constructor(e){super("color-picker-change",{detail:{value:e}})}}const wi=E`
  :host {
    --preview-size: 24px;
    --preview-color: rgba(0, 0, 0, 0);
  }

  .preview {
    --preview-bg-size: calc(var(--preview-size) / 2);
    --preview-bg-pos: calc(var(--preview-size) / 4);

    width: var(--preview-size);
    height: var(--preview-size);
    padding: 0;
    position: relative;
    overflow: hidden;
    background: none;
    border: solid 2px #888;
    border-radius: 4px;
    box-sizing: content-box;
  }

  .preview::before,
  .preview::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .preview::before {
    content: '';
    background: white;
    background-image: linear-gradient(45deg, #666 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(45deg, transparent 75%, #666 75%),
      linear-gradient(45deg, #666 25%, transparent 25%);
    background-size: var(--preview-bg-size) var(--preview-bg-size);
    background-position: 0 0, 0 0, calc(var(--preview-bg-pos) * -1) calc(var(--preview-bg-pos) * -1),
      var(--preview-bg-pos) var(--preview-bg-pos);
  }

  .preview::after {
    content: '';
    background-color: var(--preview-color);
  }
`;let Qe=class extends A{constructor(){super(...arguments),this.commitValue=!1}static get styles(){return[wi,E`
        #toggle {
          display: block;
        }
      `]}update(t){super.update(t),t.has("value")&&this.overlay&&this.overlay.requestContentUpdate()}firstUpdated(){this.overlay=document.createElement("vaadin-dev-tools-color-picker-overlay"),this.overlay.renderer=this.renderOverlayContent.bind(this),this.overlay.owner=this,this.overlay.positionTarget=this.toggle,this.overlay.noVerticalOverlap=!0,this.overlay.addEventListener("vaadin-overlay-escape-press",this.handleOverlayEscape.bind(this)),this.overlay.addEventListener("vaadin-overlay-close",this.handleOverlayClose.bind(this)),this.append(this.overlay)}render(){const t=this.value||"rgba(0, 0, 0, 0)";return v` <button
      id="toggle"
      class="preview"
      style="--preview-color: ${t}"
      @click=${this.open}
    ></button>`}open(){this.commitValue=!1,this.overlay.opened=!0,this.overlay.style.zIndex="1000000";const t=this.overlay.shadowRoot.querySelector('[part="overlay"]');t.style.background="#333"}renderOverlayContent(t){const e=getComputedStyle(this.toggle,"::after").getPropertyValue("background-color");Ae(v` <div>
        <vaadin-dev-tools-color-picker-overlay-content
          .value=${e}
          .presets=${this.presets}
          @color-changed=${this.handleColorChange.bind(this)}
        ></vaadin-dev-tools-color-picker-overlay-content>
      </div>`,t)}handleColorChange(t){this.commitValue=!0,this.dispatchEvent(new _a(t.detail.value)),t.detail.close&&(this.overlay.opened=!1,this.handleOverlayClose())}handleOverlayEscape(){this.commitValue=!1}handleOverlayClose(){const t=this.commitValue?"color-picker-commit":"color-picker-cancel";this.dispatchEvent(new CustomEvent(t))}};we([y({})],Qe.prototype,"value",2);we([y({})],Qe.prototype,"presets",2);we([tt("#toggle")],Qe.prototype,"toggle",2);Qe=we([F("vaadin-dev-tools-color-picker")],Qe);let It=class extends A{static get styles(){return[wi,E`
        :host {
          display: block;
          padding: 12px;
        }

        .picker::part(saturation),
        .picker::part(hue) {
          margin-bottom: 10px;
        }

        .picker::part(hue),
        .picker::part(alpha) {
          flex: 0 0 20px;
        }

        .picker::part(saturation),
        .picker::part(hue),
        .picker::part(alpha) {
          border-radius: 3px;
        }

        .picker::part(saturation-pointer),
        .picker::part(hue-pointer),
        .picker::part(alpha-pointer) {
          width: 20px;
          height: 20px;
        }

        .swatches {
          display: grid;
          grid-template-columns: repeat(6, var(--preview-size));
          grid-column-gap: 10px;
          grid-row-gap: 6px;
          margin-top: 16px;
        }
      `]}render(){return v` <div>
      <vaadin-dev-tools-rgba-string-color-picker
        class="picker"
        .color=${this.value}
        @color-changed=${this.handlePickerChange}
      ></vaadin-dev-tools-rgba-string-color-picker>
      ${this.renderSwatches()}
    </div>`}renderSwatches(){if(!this.presets||this.presets.length===0)return;const t=this.presets.map(e=>v` <button
        class="preview"
        style="--preview-color: ${e}"
        @click=${()=>this.selectPreset(e)}
      ></button>`);return v` <div class="swatches">${t}</div>`}handlePickerChange(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t.detail.value}}))}selectPreset(t){this.dispatchEvent(new CustomEvent("color-changed",{detail:{value:t,close:!0}}))}};we([y({})],It.prototype,"value",2);we([y({})],It.prototype,"presets",2);It=we([F("vaadin-dev-tools-color-picker-overlay-content")],It);customElements.whenDefined("vaadin-overlay").then(()=>{const t=customElements.get("vaadin-overlay");class e extends ga(t){}customElements.define("vaadin-dev-tools-color-picker-overlay",e)});customElements.define("vaadin-dev-tools-rgba-string-color-picker",fa);var wa=Object.defineProperty,Sa=Object.getOwnPropertyDescriptor,xa=(t,e,o,n)=>{for(var i=n>1?void 0:n?Sa(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&wa(e,o,i),i};let Bn=class extends q{constructor(){super(...arguments),this.presets=new $t}static get styles(){return[q.styles,E`
        .editor-row {
          align-items: center;
        }

        .editor-row > .editor {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
      `]}update(t){t.has("propertyMetadata")&&(this.presets=new $t(this.propertyMetadata)),super.update(t)}renderEditor(){var t;return v`
      <vaadin-dev-tools-color-picker
        .value=${this.value}
        .presets=${this.presets.values}
        @color-picker-change=${this.handleColorPickerChange}
        @color-picker-commit=${this.handleColorPickerCommit}
        @color-picker-cancel=${this.handleColorPickerCancel}
      ></vaadin-dev-tools-color-picker>
      <vaadin-dev-tools-theme-text-input
        .value=${this.value}
        .showClearButton=${((t=this.propertyValue)==null?void 0:t.modified)||!1}
        @change=${this.handleInputChange}
      ></vaadin-dev-tools-theme-text-input>
    `}handleInputChange(t){this.value=t.detail.value,this.dispatchChange(this.value)}handleColorPickerChange(t){this.value=t.detail.value}handleColorPickerCommit(){this.dispatchChange(this.value)}handleColorPickerCancel(){this.updateValueFromTheme()}dispatchChange(t){const e=this.presets.tryMapToPreset(t);super.dispatchChange(e)}updateValueFromTheme(){var t;super.updateValueFromTheme(),this.value=this.presets.tryMapToRawValue(((t=this.propertyValue)==null?void 0:t.value)||"")}};Bn=xa([F("vaadin-dev-tools-theme-color-property-editor")],Bn);var Ea=Object.defineProperty,Ca=Object.getOwnPropertyDescriptor,jo=(t,e,o,n)=>{for(var i=n>1?void 0:n?Ca(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Ea(e,o,i),i};class ka extends CustomEvent{constructor(e){super("open-css",{detail:{element:e}})}}let Rt=class extends A{static get styles(){return E`
      .section .header {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        padding: 0.4rem var(--theme-editor-section-horizontal-padding);
        color: var(--dev-tools-text-color-emphasis);
        background-color: rgba(0, 0, 0, 0.2);
      }

      .section .property-list .property-editor:not(:last-child) {
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .section .header .open-css {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        background-color: rgba(255, 255, 255, 0.12);
        color: var(--dev-tools-text-color);
        font-weight: 600;
        padding: 0.25rem 0.375rem;
        border-radius: 0.25rem;
      }

      .section .header .open-css:hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}render(){const t=this.metadata.elements.map(e=>this.renderSection(e));return v` <div>${t}</div> `}renderSection(t){const e=t.properties.map(o=>this.renderPropertyEditor(t,o));return v`
      <div class="section" data-testid=${t==null?void 0:t.displayName}>
        <div class="header">
          <span> ${t.displayName} </span>
          <button class="open-css" @click=${()=>this.handleOpenCss(t)}>Edit CSS</button>
        </div>
        <div class="property-list">${e}</div>
      </div>
    `}handleOpenCss(t){this.dispatchEvent(new ka(t))}renderPropertyEditor(t,e){let o;switch(e.editorType){case P.checkbox:o=ct`vaadin-dev-tools-theme-checkbox-property-editor`;break;case P.range:o=ct`vaadin-dev-tools-theme-range-property-editor`;break;case P.color:o=ct`vaadin-dev-tools-theme-color-property-editor`;break;default:o=ct`vaadin-dev-tools-theme-text-property-editor`}return ur` <${o}
          class="property-editor"
          .elementMetadata=${t}
          .propertyMetadata=${e}
          .theme=${this.theme}
          data-testid=${e.propertyName}
        >
        </${o}>`}};jo([y({})],Rt.prototype,"metadata",2);jo([y({})],Rt.prototype,"theme",2);Rt=jo([F("vaadin-dev-tools-theme-property-list")],Rt);var $a=Object.defineProperty,Ta=Object.getOwnPropertyDescriptor,Na=(t,e,o,n)=>{for(var i=n>1?void 0:n?Ta(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&$a(e,o,i),i};let Ot=class extends A{render(){return v`<div
      tabindex="-1"
      @mousemove=${this.onMouseMove}
      @click=${this.onClick}
      @keydown=${this.onKeyDown}
    ></div>`}onClick(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-click",{detail:{target:e}}))}onMouseMove(t){const e=this.getTargetElement(t);this.dispatchEvent(new CustomEvent("shim-mousemove",{detail:{target:e}}))}onKeyDown(t){this.dispatchEvent(new CustomEvent("shim-keydown",{detail:{originalEvent:t}}))}getTargetElement(t){this.style.display="none";const e=document.elementFromPoint(t.clientX,t.clientY);return this.style.display="",e}};Ot.shadowRootOptions={...A.shadowRootOptions,delegatesFocus:!0};Ot.styles=[E`
      div {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0);
        position: fixed;
        inset: 0px;
        z-index: 1000000;
      }
    `];Ot=Na([F("vaadin-dev-tools-shim")],Ot);const Si=E`
  .popup {
    width: auto;
    position: fixed;
    background-color: var(--dev-tools-background-color-active-blurred);
    color: var(--dev-tools-text-color-primary);
    padding: 0.1875rem 0.75rem 0.1875rem 1rem;
    background-clip: padding-box;
    border-radius: var(--dev-tools-border-radius);
    overflow: hidden;
    margin: 0.5rem;
    width: 30rem;
    max-width: calc(100% - 1rem);
    max-height: calc(100vh - 1rem);
    flex-shrink: 1;
    background-color: var(--dev-tools-background-color-active);
    color: var(--dev-tools-text-color);
    transition: var(--dev-tools-transition-duration);
    transform-origin: bottom right;
    display: flex;
    flex-direction: column;
    box-shadow: var(--dev-tools-box-shadow);
    outline: none;
  }
`;var Pa=Object.defineProperty,Aa=Object.getOwnPropertyDescriptor,ot=(t,e,o,n)=>{for(var i=n>1?void 0:n?Aa(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Pa(e,o,i),i};let he=class extends A{constructor(){super(...arguments),this.active=!1,this.components=[],this.selected=0}connectedCallback(){super.connectedCallback();const t=new CSSStyleSheet;t.replaceSync(`
    .vaadin-dev-tools-highlight-overlay {
      pointer-events: none;
      position: absolute;
      z-index: 10000;
      background: rgba(158,44,198,0.25);
    }`),document.adoptedStyleSheets=[...document.adoptedStyleSheets,t],this.overlayElement=document.createElement("div"),this.overlayElement.classList.add("vaadin-dev-tools-highlight-overlay")}render(){var t;return this.active?(this.style.display="block",v`
      <vaadin-dev-tools-shim
        @shim-click=${this.shimClick}
        @shim-mousemove=${this.shimMove}
        @shim-keydown=${this.shimKeydown}
      ></vaadin-dev-tools-shim>
      <div class="window popup component-picker-info">${(t=this.options)==null?void 0:t.infoTemplate}</div>
      <div class="window popup component-picker-components-info">
        <div>
          ${this.components.map((e,o)=>v`<div class=${o===this.selected?"selected":""}>
                ${e.element.tagName.toLowerCase()}
              </div>`)}
        </div>
      </div>
    `):(this.style.display="none",null)}open(t){this.options=t,this.active=!0,this.dispatchEvent(new CustomEvent("component-picker-opened",{}))}close(){this.active=!1,this.dispatchEvent(new CustomEvent("component-picker-closed",{}))}update(t){var e;if(super.update(t),(t.has("selected")||t.has("components"))&&this.highlight((e=this.components[this.selected])==null?void 0:e.element),t.has("active")){const o=t.get("active"),n=this.active;!o&&n?requestAnimationFrame(()=>this.shim.focus()):o&&!n&&this.highlight(void 0)}}shimKeydown(t){const e=t.detail.originalEvent;if(e.key==="Escape")this.close(),t.stopPropagation(),t.preventDefault();else if(e.key==="ArrowUp"){let o=this.selected-1;o<0&&(o=this.components.length-1),this.selected=o}else e.key==="ArrowDown"?this.selected=(this.selected+1)%this.components.length:e.key==="Enter"&&(this.pickSelectedComponent(),t.stopPropagation(),t.preventDefault())}shimMove(t){const e=t.detail.target;this.components=fr(e),this.selected=this.components.length-1}shimClick(t){this.pickSelectedComponent()}pickSelectedComponent(){const t=this.components[this.selected];if(t&&this.options)try{this.options.pickCallback(t)}catch(e){console.error("Pick callback failed",e)}this.close()}highlight(t){if(this.highlighted!==t)if(t){const e=t.getBoundingClientRect(),o=getComputedStyle(t);this.overlayElement.style.top=`${e.top}px`,this.overlayElement.style.left=`${e.left}px`,this.overlayElement.style.width=`${e.width}px`,this.overlayElement.style.height=`${e.height}px`,this.overlayElement.style.borderRadius=o.borderRadius,document.body.append(this.overlayElement)}else this.overlayElement.remove();this.highlighted=t}};he.styles=[Si,E`
      .component-picker-info {
        left: 1em;
        bottom: 1em;
      }

      .component-picker-components-info {
        right: 3em;
        bottom: 1em;
      }

      .component-picker-components-info .selected {
        font-weight: bold;
      }
    `];ot([T()],he.prototype,"active",2);ot([T()],he.prototype,"components",2);ot([T()],he.prototype,"selected",2);ot([tt("vaadin-dev-tools-shim")],he.prototype,"shim",2);he=ot([F("vaadin-dev-tools-component-picker")],he);const Ia=Object.freeze(Object.defineProperty({__proto__:null,get ComponentPicker(){return he}},Symbol.toStringTag,{value:"Module"}));var Ra=Object.defineProperty,Oa=Object.getOwnPropertyDescriptor,pe=(t,e,o,n)=>{for(var i=n>1?void 0:n?Oa(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Ra(e,o,i),i};Vo(E`
  .vaadin-theme-editor-highlight {
    outline: solid 2px #9e2cc6;
    outline-offset: 3px;
  }
`);let ie=class extends A{constructor(){super(...arguments),this.expanded=!1,this.themeEditorState=Ye.enabled,this.context=null,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null}static get styles(){return E`
      :host {
        animation: fade-in var(--dev-tools-transition-duration) ease-in;
        --theme-editor-section-horizontal-padding: 0.75rem;
        display: flex;
        flex-direction: column;
        max-height: 400px;
      }

      .notice {
        padding: var(--theme-editor-section-horizontal-padding);
      }

      .notice a {
        color: var(--dev-tools-text-color-emphasis);
      }

      .header {
        flex: 0 0 auto;
        border-bottom: solid 1px rgba(0, 0, 0, 0.2);
      }

      .header .picker-row {
        padding: var(--theme-editor-section-horizontal-padding);
        display: flex;
        gap: 20px;
        align-items: center;
        justify-content: space-between;
      }

      .picker {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: center;
      }

      .picker button {
        min-width: 0;
        display: inline-flex;
        align-items: center;
        padding: 0;
        line-height: 20px;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .picker button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .picker svg,
      .picker .component-type {
        flex: 0 0 auto;
        margin-right: 4px;
      }

      .picker .instance-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #e5a2fce5;
      }

      .picker .instance-name-quote {
        color: #e5a2fce5;
      }

      .picker .no-selection {
        font-style: italic;
      }

      .actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .property-list {
        flex: 1 1 auto;
        overflow-y: auto;
      }

      .link-button {
        all: initial;
        font-family: inherit;
        font-size: var(--dev-tools-font-size-small);
        line-height: 1;
        white-space: nowrap;
        color: inherit;
        font-weight: 600;
        text-decoration: underline;
      }

      .link-button:focus,
      .link-button:hover {
        color: var(--dev-tools-text-color-emphasis);
      }

      .icon-button {
        padding: 0;
        line-height: 0;
        border: none;
        background: none;
        color: var(--dev-tools-text-color);
      }

      .icon-button:disabled {
        opacity: 0.5;
      }

      .icon-button:not(:disabled):hover {
        color: var(--dev-tools-text-color-emphasis);
      }
    `}firstUpdated(){this.api=new Ir(this.connection),this.history=new Rr(this.api),this.historyActions=this.history.allowedActions,this.api.markAsUsed(),document.addEventListener("vaadin-theme-updated",()=>{fe.clear(),this.refreshTheme()})}update(t){var e,o;super.update(t),t.has("expanded")&&(this.expanded?this.highlightElement((e=this.context)==null?void 0:e.component.element):this.removeElementHighlight((o=this.context)==null?void 0:o.component.element))}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeElementHighlight((t=this.context)==null?void 0:t.component.element)}render(){var t,e,o;return this.themeEditorState===Ye.missing_theme?this.renderMissingThemeNotice():v`
      <div class="header">
        <div class="picker-row">
          ${this.renderPicker()}
          <div class="actions">
            ${(t=this.context)!=null&&t.metadata?v` <vaadin-dev-tools-theme-scope-selector
                  .value=${this.context.scope}
                  .metadata=${this.context.metadata}
                  @scope-change=${this.handleScopeChange}
                ></vaadin-dev-tools-theme-scope-selector>`:null}
            <button
              class="icon-button"
              data-testid="undo"
              ?disabled=${!((e=this.historyActions)!=null&&e.allowUndo)}
              @click=${this.handleUndo}
            >
              ${yt.undo}
            </button>
            <button
              class="icon-button"
              data-testid="redo"
              ?disabled=${!((o=this.historyActions)!=null&&o.allowRedo)}
              @click=${this.handleRedo}
            >
              ${yt.redo}
            </button>
          </div>
        </div>
        ${this.renderLocalClassNameEditor()}
      </div>
      ${this.renderPropertyList()}
    `}renderMissingThemeNotice(){return v`
      <div class="notice">
        It looks like you have not set up a custom theme yet. Theme editor requires an existing theme to work with.
        Please check our
        <a href="https://vaadin.com/docs/latest/styling/custom-theme/creating-custom-theme" target="_blank"
          >documentation</a
        >
        on how to set up a custom theme.
      </div>
    `}renderPropertyList(){if(!this.context)return null;if(!this.context.metadata){const t=this.context.component.element.localName;return v`
        <div class="notice">Styling <code>&lt;${t}&gt;</code> components is not supported at the moment.</div>
      `}if(this.context.scope===z.local&&!this.context.accessible){const t=this.context.metadata.displayName;return v`
        <div class="notice">
          The selected ${t} can not be styled locally. Currently, theme editor only supports styling
          instances that are assigned to a local variable, like so:
          <pre><code>Button saveButton = new Button("Save");</code></pre>
          If you want to modify the code so that it satisfies this requirement,
          <button class="link-button" @click=${this.handleShowComponent}>click here</button>
          to open it in your IDE. Alternatively you can choose to style all ${t}s by selecting "Global" from
          the scope dropdown above.
        </div>
      `}return v` <vaadin-dev-tools-theme-property-list
      class="property-list"
      .metadata=${this.context.metadata}
      .theme=${this.effectiveTheme}
      @theme-property-value-change=${this.handlePropertyChange}
      @open-css=${this.handleOpenCss}
    ></vaadin-dev-tools-theme-property-list>`}handleShowComponent(){if(!this.context)return;const t=this.context.component,e={nodeId:t.nodeId,uiId:t.uiId};this.connection.sendShowComponentCreateLocation(e)}async handleOpenCss(t){if(!this.context)return;await this.ensureLocalClassName();const e={themeScope:this.context.scope,localClassName:this.context.localClassName},o=Le(t.detail.element,e);await this.api.openCss(o)}renderPicker(){var t;let e;if((t=this.context)!=null&&t.metadata){const o=this.context.scope===z.local?this.context.metadata.displayName:`All ${this.context.metadata.displayName}s`,n=v`<span class="component-type">${o}</span>`,i=this.context.scope===z.local?Pr(this.context.component):null,s=i?v` <span class="instance-name-quote">"</span><span class="instance-name">${i}</span
            ><span class="instance-name-quote">"</span>`:null;e=v`${n} ${s}`}else e=v`<span class="no-selection">Pick an element to get started</span>`;return v`
      <div class="picker">
        <button @click=${this.pickComponent}>${yt.crosshair} ${e}</button>
      </div>
    `}renderLocalClassNameEditor(){var t;const e=((t=this.context)==null?void 0:t.scope)===z.local&&this.context.accessible;if(!this.context||!e)return null;const o=this.context.localClassName||this.context.suggestedClassName;return v` <vaadin-dev-tools-theme-class-name-editor
      .className=${o}
      @class-name-change=${this.handleClassNameChange}
    >
    </vaadin-dev-tools-theme-class-name-editor>`}async handleClassNameChange(t){if(!this.context)return;const e=this.context.localClassName,o=t.detail.value;if(e){const n=this.context.component.element;this.context.localClassName=o;const i=await this.api.setLocalClassName(this.context.component,o);this.historyActions=this.history.push(i.requestId,()=>fe.previewLocalClassName(n,o),()=>fe.previewLocalClassName(n,e))}else this.context={...this.context,suggestedClassName:o}}async pickComponent(){var t;this.removeElementHighlight((t=this.context)==null?void 0:t.component.element),this.pickerProvider().open({infoTemplate:v`
        <div>
          <h3>Locate the component to style</h3>
          <p>Use the mouse cursor to highlight components in the UI.</p>
          <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
          <p>Click the primary mouse button to select the component.</p>
        </div>
      `,pickCallback:async e=>{var o;const n=await kr.getMetadata(e);if(!n){this.context={component:e,scope:((o=this.context)==null?void 0:o.scope)||z.local},this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}this.highlightElement(e.element),this.refreshComponentAndTheme(e,n)}})}handleScopeChange(t){this.context&&this.refreshTheme({...this.context,scope:t.detail.value})}async handlePropertyChange(t){if(!this.context||!this.baseTheme||!this.editedTheme)return;const{element:e,property:o,value:n}=t.detail;this.editedTheme.updatePropertyValue(e.selector,o.propertyName,n,!0),this.effectiveTheme=ce.combine(this.baseTheme,this.editedTheme),await this.ensureLocalClassName();const i={themeScope:this.context.scope,localClassName:this.context.localClassName},s=$r(e,i,o.propertyName,n);try{const r=await this.api.setCssRules([s]);this.historyActions=this.history.push(r.requestId);const l=Tr(s);fe.add(l)}catch(r){console.error("Failed to update property value",r)}}async handleUndo(){this.historyActions=await this.history.undo(),await this.refreshComponentAndTheme()}async handleRedo(){this.historyActions=await this.history.redo(),await this.refreshComponentAndTheme()}async ensureLocalClassName(){if(!this.context||this.context.scope===z.global||this.context.localClassName)return;if(!this.context.localClassName&&!this.context.suggestedClassName)throw new Error("Cannot assign local class name for the component because it does not have a suggested class name");const t=this.context.component.element,e=this.context.suggestedClassName;this.context.localClassName=e;const o=await this.api.setLocalClassName(this.context.component,e);this.historyActions=this.history.push(o.requestId,()=>fe.previewLocalClassName(t,e),()=>fe.previewLocalClassName(t))}async refreshComponentAndTheme(t,e){var o,n,i;if(t=t||((o=this.context)==null?void 0:o.component),e=e||((n=this.context)==null?void 0:n.metadata),!t||!e)return;const s=await this.api.loadComponentMetadata(t);fe.previewLocalClassName(t.element,s.className),await this.refreshTheme({scope:((i=this.context)==null?void 0:i.scope)||z.local,metadata:e,component:t,localClassName:s.className,suggestedClassName:s.suggestedClassName,accessible:s.accessible})}async refreshTheme(t){const e=t||this.context;if(!e||!e.metadata)return;if(e.scope===z.local&&!e.accessible){this.context=e,this.baseTheme=null,this.editedTheme=null,this.effectiveTheme=null;return}let o=new ce(e.metadata);if(!(e.scope===z.local&&!e.localClassName)){const i={themeScope:e.scope,localClassName:e.localClassName},s=e.metadata.elements.map(l=>Le(l,i)),r=await this.api.loadRules(s);o=ce.fromServerRules(e.metadata,i,r.rules)}const n=await Nr(e.metadata);this.context=e,this.baseTheme=n,this.editedTheme=o,this.effectiveTheme=ce.combine(n,this.editedTheme)}highlightElement(t){t&&t.classList.add("vaadin-theme-editor-highlight")}removeElementHighlight(t){t&&t.classList.remove("vaadin-theme-editor-highlight")}};pe([y({})],ie.prototype,"expanded",2);pe([y({})],ie.prototype,"themeEditorState",2);pe([y({})],ie.prototype,"pickerProvider",2);pe([y({})],ie.prototype,"connection",2);pe([T()],ie.prototype,"historyActions",2);pe([T()],ie.prototype,"context",2);pe([T()],ie.prototype,"effectiveTheme",2);ie=pe([F("vaadin-dev-tools-theme-editor")],ie);var La=function(){var t=document.getSelection();if(!t.rangeCount)return function(){};for(var e=document.activeElement,o=[],n=0;n<t.rangeCount;n++)o.push(t.getRangeAt(n));switch(e.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":e.blur();break;default:e=null;break}return t.removeAllRanges(),function(){t.type==="Caret"&&t.removeAllRanges(),t.rangeCount||o.forEach(function(i){t.addRange(i)}),e&&e.focus()}},Hn={"text/plain":"Text","text/html":"Url",default:"Text"},Ma="Copy to clipboard: #{key}, Enter";function Va(t){var e=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return t.replace(/#{\s*key\s*}/g,e)}function Da(t,e){var o,n,i,s,r,l,a=!1;e||(e={}),o=e.debug||!1;try{i=La(),s=document.createRange(),r=document.getSelection(),l=document.createElement("span"),l.textContent=t,l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",function(c){if(c.stopPropagation(),e.format)if(c.preventDefault(),typeof c.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var m=Hn[e.format]||Hn.default;window.clipboardData.setData(m,t)}else c.clipboardData.clearData(),c.clipboardData.setData(e.format,t);e.onCopy&&(c.preventDefault(),e.onCopy(c.clipboardData))}),document.body.appendChild(l),s.selectNodeContents(l),r.addRange(s);var d=document.execCommand("copy");if(!d)throw new Error("copy command was unsuccessful");a=!0}catch(c){o&&console.error("unable to copy using execCommand: ",c),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(e.format||"text",t),e.onCopy&&e.onCopy(window.clipboardData),a=!0}catch(m){o&&console.error("unable to copy using clipboardData: ",m),o&&console.error("falling back to prompt"),n=Va("message"in e?e.message:Ma),window.prompt(n,t)}}finally{r&&(typeof r.removeRange=="function"?r.removeRange(s):r.removeAllRanges()),l&&document.body.removeChild(l),i()}return a}const Fo=1e3,Bo=(t,e)=>{const o=Array.from(t.querySelectorAll(e.join(", "))),n=Array.from(t.querySelectorAll("*")).filter(i=>i.shadowRoot).flatMap(i=>Bo(i.shadowRoot,e));return[...o,...n]};let qn=!1;const Ze=(t,e)=>{qn||(window.addEventListener("message",i=>{i.data==="validate-license"&&window.location.reload()},!1),qn=!0);const o=t._overlayElement;if(o){if(o.shadowRoot){const i=o.shadowRoot.querySelector("slot:not([name])");if(i&&i.assignedElements().length>0){Ze(i.assignedElements()[0],e);return}}Ze(o,e);return}const n=e.messageHtml?e.messageHtml:`${e.message} <p>Component: ${e.product.name} ${e.product.version}</p>`.replace(/https:([^ ]*)/g,"<a href='https:$1'>https:$1</a>");t.isConnected&&(t.outerHTML=`<no-license style="display:flex;align-items:center;text-align:center;justify-content:center;"><div>${n}</div></no-license>`)},Be={},Wn={},Ve={},xi={},Q=t=>`${t.name}_${t.version}`,Gn=t=>{const{cvdlName:e,version:o}=t.constructor,n={name:e,version:o},i=t.tagName.toLowerCase();Be[e]=Be[e]??[],Be[e].push(i);const s=Ve[Q(n)];s&&setTimeout(()=>Ze(t,s),Fo),Ve[Q(n)]||xi[Q(n)]||Wn[Q(n)]||(Wn[Q(n)]=!0,window.Vaadin.devTools.checkLicense(n))},za=t=>{xi[Q(t)]=!0,console.debug("License check ok for",t)},Ei=t=>{const e=t.product.name;Ve[Q(t.product)]=t,console.error("License check failed for",e);const o=Be[e];(o==null?void 0:o.length)>0&&Bo(document,o).forEach(n=>{setTimeout(()=>Ze(n,Ve[Q(t.product)]),Fo)})},Ua=t=>{const e=t.message,o=t.product.name;t.messageHtml=`No license found. <a target=_blank onclick="javascript:window.open(this.href);return false;" href="${e}">Go here to start a trial or retrieve your license.</a>`,Ve[Q(t.product)]=t,console.error("No license found when checking",o);const n=Be[o];(n==null?void 0:n.length)>0&&Bo(document,n).forEach(i=>{setTimeout(()=>Ze(i,Ve[Q(t.product)]),Fo)})},ja=()=>{window.Vaadin.devTools.createdCvdlElements.forEach(t=>{Gn(t)}),window.Vaadin.devTools.createdCvdlElements={push:t=>{Gn(t)}}};var M=(t=>(t.ACTIVE="active",t.INACTIVE="inactive",t.UNAVAILABLE="unavailable",t.ERROR="error",t))(M||{});const Ci=class extends Object{constructor(t){super(),this.status="unavailable",t&&(this.webSocket=new WebSocket(t),this.webSocket.onmessage=e=>this.handleMessage(e),this.webSocket.onerror=e=>this.handleError(e),this.webSocket.onclose=e=>{this.status!=="error"&&this.setStatus("unavailable"),this.webSocket=void 0}),setInterval(()=>{this.webSocket&&self.status!=="error"&&this.status!=="unavailable"&&this.webSocket.send("")},Ci.HEARTBEAT_INTERVAL)}onHandshake(){}onReload(){}onUpdate(t,e){}onConnectionError(t){}onStatusChange(t){}onMessage(t){console.error("Unknown message received from the live reload server:",t)}handleMessage(t){let e;try{e=JSON.parse(t.data)}catch(o){this.handleError(`[${o.name}: ${o.message}`);return}e.command==="hello"?(this.setStatus("active"),this.onHandshake()):e.command==="reload"?this.status==="active"&&this.onReload():e.command==="update"?this.status==="active"&&this.onUpdate(e.path,e.content):e.command==="license-check-ok"?za(e.data):e.command==="license-check-failed"?Ei(e.data):e.command==="license-check-nokey"?Ua(e.data):this.onMessage(e)}handleError(t){console.error(t),this.setStatus("error"),t instanceof Event&&this.webSocket?this.onConnectionError(`Error in WebSocket connection to ${this.webSocket.url}`):this.onConnectionError(t)}setActive(t){!t&&this.status==="active"?this.setStatus("inactive"):t&&this.status==="inactive"&&this.setStatus("active")}setStatus(t){this.status!==t&&(this.status=t,this.onStatusChange(t))}send(t,e){const o=JSON.stringify({command:t,data:e});this.webSocket?this.webSocket.readyState!==WebSocket.OPEN?this.webSocket.addEventListener("open",()=>this.webSocket.send(o)):this.webSocket.send(o):console.error(`Unable to send message ${t}. No websocket is available`)}setFeature(t,e){this.send("setFeature",{featureId:t,enabled:e})}sendTelemetry(t){this.send("reportTelemetry",{browserData:t})}sendLicenseCheck(t){this.send("checkLicense",t)}sendShowComponentCreateLocation(t){this.send("showComponentCreateLocation",t)}sendShowComponentAttachLocation(t){this.send("showComponentAttachLocation",t)}};let bt=Ci;bt.HEARTBEAT_INTERVAL=18e4;var Fa=Object.defineProperty,Ba=Object.getOwnPropertyDescriptor,N=(t,e,o,n)=>{for(var i=n>1?void 0:n?Ba(e,o):e,s=t.length-1,r;s>=0;s--)(r=t[s])&&(i=(n?r(e,o,i):r(i))||i);return n&&i&&Fa(e,o,i),i};const C=class extends A{constructor(){super(),this.expanded=!1,this.messages=[],this.notifications=[],this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE,this.tabs=[{id:"log",title:"Log",render:()=>this.renderLog(),activate:this.activateLog},{id:"info",title:"Info",render:()=>this.renderInfo()},{id:"features",title:"Feature Flags",render:()=>this.renderFeatures()}],this.activeTab="log",this.serverInfo={flowVersion:"",vaadinVersion:"",javaVersion:"",osVersion:"",productName:""},this.features=[],this.unreadErrors=!1,this.componentPickActive=!1,this.themeEditorState=Ye.disabled,this.nextMessageId=1,this.transitionDuration=0,this.disableLiveReloadTimeout=null,window.Vaadin.Flow&&this.tabs.push({id:"code",title:"Code",render:()=>this.renderCode()})}static get styles(){return[E`
        :host {
          --dev-tools-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
            'Helvetica Neue', sans-serif;
          --dev-tools-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
            monospace;

          --dev-tools-font-size: 0.8125rem;
          --dev-tools-font-size-small: 0.75rem;

          --dev-tools-text-color: rgba(255, 255, 255, 0.8);
          --dev-tools-text-color-secondary: rgba(255, 255, 255, 0.65);
          --dev-tools-text-color-emphasis: rgba(255, 255, 255, 0.95);
          --dev-tools-text-color-active: rgba(255, 255, 255, 1);

          --dev-tools-background-color-inactive: rgba(45, 45, 45, 0.25);
          --dev-tools-background-color-active: rgba(45, 45, 45, 0.98);
          --dev-tools-background-color-active-blurred: rgba(45, 45, 45, 0.85);

          --dev-tools-border-radius: 0.5rem;
          --dev-tools-box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05), 0 4px 12px -2px rgba(0, 0, 0, 0.4);

          --dev-tools-blue-hsl: 206, 100%, 70%;
          --dev-tools-blue-color: hsl(var(--dev-tools-blue-hsl));
          --dev-tools-green-hsl: 145, 80%, 42%;
          --dev-tools-green-color: hsl(var(--dev-tools-green-hsl));
          --dev-tools-grey-hsl: 0, 0%, 50%;
          --dev-tools-grey-color: hsl(var(--dev-tools-grey-hsl));
          --dev-tools-yellow-hsl: 38, 98%, 64%;
          --dev-tools-yellow-color: hsl(var(--dev-tools-yellow-hsl));
          --dev-tools-red-hsl: 355, 100%, 68%;
          --dev-tools-red-color: hsl(var(--dev-tools-red-hsl));

          /* Needs to be in ms, used in JavaScript as well */
          --dev-tools-transition-duration: 180ms;

          all: initial;

          direction: ltr;
          cursor: default;
          font: normal 400 var(--dev-tools-font-size) / 1.125rem var(--dev-tools-font-family);
          color: var(--dev-tools-text-color);
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;

          position: fixed;
          z-index: 20000;
          pointer-events: none;
          bottom: 0;
          right: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
        }

        .dev-tools {
          pointer-events: auto;
          display: flex;
          align-items: center;
          position: fixed;
          z-index: inherit;
          right: 0.5rem;
          bottom: 0.5rem;
          min-width: 1.75rem;
          height: 1.75rem;
          max-width: 1.75rem;
          border-radius: 0.5rem;
          padding: 0.375rem;
          box-sizing: border-box;
          background-color: var(--dev-tools-background-color-inactive);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          white-space: nowrap;
          line-height: 1rem;
        }

        .dev-tools:hover,
        .dev-tools.active {
          background-color: var(--dev-tools-background-color-active);
          box-shadow: var(--dev-tools-box-shadow);
        }

        .dev-tools.active {
          max-width: calc(100% - 1rem);
        }

        .dev-tools .dev-tools-icon {
          flex: none;
          pointer-events: none;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          fill: #fff;
          transition: var(--dev-tools-transition-duration);
          margin: 0;
        }

        .dev-tools.active .dev-tools-icon {
          opacity: 0;
          position: absolute;
          transform: scale(0.5);
        }

        .dev-tools .status-blip {
          flex: none;
          display: block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          z-index: 20001;
          background: var(--dev-tools-grey-color);
          position: absolute;
          top: -1px;
          right: -1px;
        }

        .dev-tools .status-description {
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 0 0.25rem;
        }

        .dev-tools.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.15);
          animation: bounce 0.5s;
          animation-iteration-count: 2;
        }

        .switch {
          display: inline-flex;
          align-items: center;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .switch .slider {
          display: block;
          flex: none;
          width: 28px;
          height: 18px;
          border-radius: 9px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: var(--dev-tools-transition-duration);
          margin-right: 0.5rem;
        }

        .switch:focus-within .slider,
        .switch .slider:hover {
          background-color: rgba(255, 255, 255, 0.35);
          transition: none;
        }

        .switch input:focus-visible ~ .slider {
          box-shadow: 0 0 0 2px var(--dev-tools-background-color-active), 0 0 0 4px var(--dev-tools-blue-color);
        }

        .switch .slider::before {
          content: '';
          display: block;
          margin: 2px;
          width: 14px;
          height: 14px;
          background-color: #fff;
          transition: var(--dev-tools-transition-duration);
          border-radius: 50%;
        }

        .switch input:checked + .slider {
          background-color: var(--dev-tools-green-color);
        }

        .switch input:checked + .slider::before {
          transform: translateX(10px);
        }

        .switch input:disabled + .slider::before {
          background-color: var(--dev-tools-grey-color);
        }

        .window.hidden {
          opacity: 0;
          transform: scale(0);
          position: absolute;
        }

        .window.visible {
          transform: none;
          opacity: 1;
          pointer-events: auto;
        }

        .window.visible ~ .dev-tools {
          opacity: 0;
          pointer-events: none;
        }

        .window.visible ~ .dev-tools .dev-tools-icon,
        .window.visible ~ .dev-tools .status-blip {
          transition: none;
          opacity: 0;
        }

        .window {
          border-radius: var(--dev-tools-border-radius);
          overflow: hidden;
          margin: 0.5rem;
          width: 30rem;
          max-width: calc(100% - 1rem);
          max-height: calc(100vh - 1rem);
          flex-shrink: 1;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          display: flex;
          flex-direction: column;
          box-shadow: var(--dev-tools-box-shadow);
          outline: none;
        }

        .window-toolbar {
          display: flex;
          flex: none;
          align-items: center;
          padding: 0.375rem;
          white-space: nowrap;
          order: 1;
          background-color: rgba(0, 0, 0, 0.2);
          gap: 0.5rem;
        }

        .tab {
          color: var(--dev-tools-text-color-secondary);
          font: inherit;
          font-size: var(--dev-tools-font-size-small);
          font-weight: 500;
          line-height: 1;
          padding: 0.25rem 0.375rem;
          background: none;
          border: none;
          margin: 0;
          border-radius: 0.25rem;
          transition: var(--dev-tools-transition-duration);
        }

        .tab:hover,
        .tab.active {
          color: var(--dev-tools-text-color-active);
        }

        .tab.active {
          background-color: rgba(255, 255, 255, 0.12);
        }

        .tab.unreadErrors::after {
          content: '•';
          color: hsl(var(--dev-tools-red-hsl));
          font-size: 1.5rem;
          position: absolute;
          transform: translate(0, -50%);
        }

        .ahreflike {
          font-weight: 500;
          color: var(--dev-tools-text-color-secondary);
          text-decoration: underline;
          cursor: pointer;
        }

        .ahreflike:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .button {
          all: initial;
          font-family: inherit;
          font-size: var(--dev-tools-font-size-small);
          line-height: 1;
          white-space: nowrap;
          background-color: rgba(0, 0, 0, 0.2);
          color: inherit;
          font-weight: 600;
          padding: 0.25rem 0.375rem;
          border-radius: 0.25rem;
        }

        .button:focus,
        .button:hover {
          color: var(--dev-tools-text-color-emphasis);
        }

        .minimize-button {
          flex: none;
          width: 1rem;
          height: 1rem;
          color: inherit;
          background-color: transparent;
          border: 0;
          padding: 0;
          margin: 0 0 0 auto;
          opacity: 0.8;
        }

        .minimize-button:hover {
          opacity: 1;
        }

        .minimize-button svg {
          max-width: 100%;
        }

        .message.information {
          --dev-tools-notification-color: var(--dev-tools-blue-color);
        }

        .message.warning {
          --dev-tools-notification-color: var(--dev-tools-yellow-color);
        }

        .message.error {
          --dev-tools-notification-color: var(--dev-tools-red-color);
        }

        .message {
          display: flex;
          padding: 0.1875rem 0.75rem 0.1875rem 2rem;
          background-clip: padding-box;
        }

        .message.log {
          padding-left: 0.75rem;
        }

        .message-content {
          margin-right: 0.5rem;
          -webkit-user-select: text;
          -moz-user-select: text;
          user-select: text;
        }

        .message-heading {
          position: relative;
          display: flex;
          align-items: center;
          margin: 0.125rem 0;
        }

        .message.log {
          color: var(--dev-tools-text-color-secondary);
        }

        .message:not(.log) .message-heading {
          font-weight: 500;
        }

        .message.has-details .message-heading {
          color: var(--dev-tools-text-color-emphasis);
          font-weight: 600;
        }

        .message-heading::before {
          position: absolute;
          margin-left: -1.5rem;
          display: inline-block;
          text-align: center;
          font-size: 0.875em;
          font-weight: 600;
          line-height: calc(1.25em - 2px);
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          border: 1px solid transparent;
          border-radius: 50%;
        }

        .message.information .message-heading::before {
          content: 'i';
          border-color: currentColor;
          color: var(--dev-tools-notification-color);
        }

        .message.warning .message-heading::before,
        .message.error .message-heading::before {
          content: '!';
          color: var(--dev-tools-background-color-active);
          background-color: var(--dev-tools-notification-color);
        }

        .features-tray {
          padding: 0.75rem;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .features-tray p {
          margin-top: 0;
          color: var(--dev-tools-text-color-secondary);
        }

        .features-tray .feature {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 0.5em;
        }

        .message .message-details {
          font-weight: 400;
          color: var(--dev-tools-text-color-secondary);
          margin: 0.25rem 0;
        }

        .message .message-details[hidden] {
          display: none;
        }

        .message .message-details p {
          display: inline;
          margin: 0;
          margin-right: 0.375em;
          word-break: break-word;
        }

        .message .persist {
          color: var(--dev-tools-text-color-secondary);
          white-space: nowrap;
          margin: 0.375rem 0;
          display: flex;
          align-items: center;
          position: relative;
          -webkit-user-select: none;
          -moz-user-select: none;
          user-select: none;
        }

        .message .persist::before {
          content: '';
          width: 1em;
          height: 1em;
          border-radius: 0.2em;
          margin-right: 0.375em;
          background-color: rgba(255, 255, 255, 0.3);
        }

        .message .persist:hover::before {
          background-color: rgba(255, 255, 255, 0.4);
        }

        .message .persist.on::before {
          background-color: rgba(255, 255, 255, 0.9);
        }

        .message .persist.on::after {
          content: '';
          order: -1;
          position: absolute;
          width: 0.75em;
          height: 0.25em;
          border: 2px solid var(--dev-tools-background-color-active);
          border-width: 0 0 2px 2px;
          transform: translate(0.05em, -0.05em) rotate(-45deg) scale(0.8, 0.9);
        }

        .message .dismiss-message {
          font-weight: 600;
          align-self: stretch;
          display: flex;
          align-items: center;
          padding: 0 0.25rem;
          margin-left: 0.5rem;
          color: var(--dev-tools-text-color-secondary);
        }

        .message .dismiss-message:hover {
          color: var(--dev-tools-text-color);
        }

        .notification-tray {
          display: flex;
          flex-direction: column-reverse;
          align-items: flex-end;
          margin: 0.5rem;
          flex: none;
        }

        .window.hidden + .notification-tray {
          margin-bottom: 3rem;
        }

        .notification-tray .message {
          pointer-events: auto;
          background-color: var(--dev-tools-background-color-active);
          color: var(--dev-tools-text-color);
          max-width: 30rem;
          box-sizing: border-box;
          border-radius: var(--dev-tools-border-radius);
          margin-top: 0.5rem;
          transition: var(--dev-tools-transition-duration);
          transform-origin: bottom right;
          animation: slideIn var(--dev-tools-transition-duration);
          box-shadow: var(--dev-tools-box-shadow);
          padding-top: 0.25rem;
          padding-bottom: 0.25rem;
        }

        .notification-tray .message.animate-out {
          animation: slideOut forwards var(--dev-tools-transition-duration);
        }

        .notification-tray .message .message-details {
          max-height: 10em;
          overflow: hidden;
        }

        .message-tray {
          flex: auto;
          overflow: auto;
          max-height: 20rem;
          user-select: text;
        }

        .message-tray .message {
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          padding-left: 2.25rem;
        }

        .message-tray .message.warning {
          background-color: hsla(var(--dev-tools-yellow-hsl), 0.09);
        }

        .message-tray .message.error {
          background-color: hsla(var(--dev-tools-red-hsl), 0.09);
        }

        .message-tray .message.error .message-heading {
          color: hsl(var(--dev-tools-red-hsl));
        }

        .message-tray .message.warning .message-heading {
          color: hsl(var(--dev-tools-yellow-hsl));
        }

        .message-tray .message + .message {
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .message-tray .dismiss-message,
        .message-tray .persist {
          display: none;
        }

        .info-tray {
          padding: 0.75rem;
          position: relative;
          flex: auto;
          overflow: auto;
          animation: fade-in var(--dev-tools-transition-duration) ease-in;
          user-select: text;
        }

        .info-tray dl {
          margin: 0;
          display: grid;
          grid-template-columns: max-content 1fr;
          column-gap: 0.75rem;
          position: relative;
        }

        .info-tray dt {
          grid-column: 1;
          color: var(--dev-tools-text-color-emphasis);
        }

        .info-tray dt:not(:first-child)::before {
          content: '';
          width: 100%;
          position: absolute;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.1);
          margin-top: -0.375rem;
        }

        .info-tray dd {
          grid-column: 2;
          margin: 0;
        }

        .info-tray :is(dt, dd):not(:last-child) {
          margin-bottom: 0.75rem;
        }

        .info-tray dd + dd {
          margin-top: -0.5rem;
        }

        .info-tray .live-reload-status::before {
          content: '•';
          color: var(--status-color);
          width: 0.75rem;
          display: inline-block;
          font-size: 1rem;
          line-height: 0.5rem;
        }

        .info-tray .copy {
          position: fixed;
          z-index: 1;
          top: 0.5rem;
          right: 0.5rem;
        }

        .info-tray .switch {
          vertical-align: -4px;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }

        @keyframes slideOut {
          from {
            transform: translateX(0%);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.5);
            background-color: hsla(var(--dev-tools-red-hsl), 1);
          }
          100% {
            transform: scale(1);
          }
        }

        @supports (backdrop-filter: blur(1px)) {
          .dev-tools,
          .window,
          .notification-tray .message {
            backdrop-filter: blur(8px);
          }
          .dev-tools:hover,
          .dev-tools.active,
          .window,
          .notification-tray .message {
            background-color: var(--dev-tools-background-color-active-blurred);
          }
        }
      `,Si]}static get isActive(){const t=window.sessionStorage.getItem(C.ACTIVE_KEY_IN_SESSION_STORAGE);return t===null||t!=="false"}static notificationDismissed(t){const e=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);return e!==null&&e.includes(t)}elementTelemetry(){let t={};try{const e=localStorage.getItem("vaadin.statistics.basket");if(!e)return;t=JSON.parse(e)}catch{return}this.frontendConnection&&this.frontendConnection.sendTelemetry(t)}openWebSocketConnection(){this.frontendStatus=M.UNAVAILABLE,this.javaStatus=M.UNAVAILABLE;const t=l=>this.log("error",l),e=()=>{this.showSplashMessage("Reloading…");const l=window.sessionStorage.getItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE),a=l?parseInt(l,10)+1:1;window.sessionStorage.setItem(C.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE,a.toString()),window.sessionStorage.setItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE,"true"),window.location.reload()},o=(l,a)=>{let d=document.head.querySelector(`style[data-file-path='${l}']`);d?(this.log("information","Hot update of "+l),d.textContent=a,document.dispatchEvent(new CustomEvent("vaadin-theme-updated"))):e()},n=new bt(this.getDedicatedWebSocketUrl());n.onHandshake=()=>{this.log("log","Vaadin development mode initialized"),C.isActive||n.setActive(!1),this.elementTelemetry()},n.onConnectionError=t,n.onReload=e,n.onUpdate=o,n.onStatusChange=l=>{this.frontendStatus=l},n.onMessage=l=>this.handleFrontendMessage(l),this.frontendConnection=n;let i;this.backend===C.SPRING_BOOT_DEVTOOLS&&this.springBootLiveReloadPort?(i=new bt(this.getSpringBootWebSocketUrl(window.location)),i.onHandshake=()=>{C.isActive||i.setActive(!1)},i.onReload=e,i.onConnectionError=t):this.backend===C.JREBEL||this.backend===C.HOTSWAP_AGENT?i=n:i=new bt(void 0);const s=i.onStatusChange;i.onStatusChange=l=>{s(l),this.javaStatus=l};const r=i.onHandshake;i.onHandshake=()=>{r(),this.backend&&this.log("information",`Java live reload available: ${C.BACKEND_DISPLAY_NAME[this.backend]}`)},this.javaConnection=i,this.backend||this.showNotification("warning","Java live reload unavailable","Live reload for Java changes is currently not set up. Find out how to make use of this functionality to boost your workflow.","https://vaadin.com/docs/latest/flow/configuration/live-reload","liveReloadUnavailable")}handleFrontendMessage(t){if((t==null?void 0:t.command)==="serverInfo")this.serverInfo=t.data;else if((t==null?void 0:t.command)==="featureFlags")this.features=t.data.features;else if((t==null?void 0:t.command)==="themeEditorState"){const e=!!window.Vaadin.Flow;this.themeEditorState=t.data,e&&this.themeEditorState!==Ye.disabled&&(this.tabs.push({id:"theme-editor",title:"Theme Editor (Free Preview)",render:()=>this.renderThemeEditor()}),this.requestUpdate())}else console.error("Unknown message from front-end connection:",JSON.stringify(t))}getDedicatedWebSocketUrl(){function t(o){const n=document.createElement("div");return n.innerHTML=`<a href="${o}"/>`,n.firstChild.href}if(this.url===void 0)return;const e=t(this.url);if(!e.startsWith("http://")&&!e.startsWith("https://")){console.error("The protocol of the url should be http or https for live reload to work.");return}return`${e.replace(/^http/,"ws")}?v-r=push&debug_window`}getSpringBootWebSocketUrl(t){const{hostname:e}=t,o=t.protocol==="https:"?"wss":"ws";if(e.endsWith("gitpod.io")){const n=e.replace(/.*?-/,"");return`${o}://${this.springBootLiveReloadPort}-${n}`}else return`${o}://${e}:${this.springBootLiveReloadPort}`}connectedCallback(){if(super.connectedCallback(),this.catchErrors(),this.disableEventListener=e=>this.demoteSplashMessage(),document.body.addEventListener("focus",this.disableEventListener),document.body.addEventListener("click",this.disableEventListener),this.openWebSocketConnection(),window.sessionStorage.getItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)){const e=new Date,o=`${`0${e.getHours()}`.slice(-2)}:${`0${e.getMinutes()}`.slice(-2)}:${`0${e.getSeconds()}`.slice(-2)}`;this.showSplashMessage(`Page reloaded at ${o}`),window.sessionStorage.removeItem(C.TRIGGERED_KEY_IN_SESSION_STORAGE)}this.transitionDuration=parseInt(window.getComputedStyle(this).getPropertyValue("--dev-tools-transition-duration"),10);const t=window;t.Vaadin=t.Vaadin||{},t.Vaadin.devTools=Object.assign(this,t.Vaadin.devTools),ja(),document.documentElement.addEventListener("vaadin-overlay-outside-click",e=>{const o=e,n=o.target.owner;n&&gr(this,n)||o.detail.sourceEvent.composedPath().includes(this)&&e.preventDefault()})}format(t){return t.toString()}catchErrors(){const t=window.Vaadin.ConsoleErrors;t&&t.forEach(e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}),window.Vaadin.ConsoleErrors={push:e=>{this.log("error",e.map(o=>this.format(o)).join(" "))}}}disconnectedCallback(){this.disableEventListener&&(document.body.removeEventListener("focus",this.disableEventListener),document.body.removeEventListener("click",this.disableEventListener)),super.disconnectedCallback()}toggleExpanded(){this.notifications.slice().forEach(t=>this.dismissNotification(t.id)),this.expanded=!this.expanded,this.expanded&&this.root.focus()}showSplashMessage(t){this.splashMessage=t,this.splashMessage&&(this.expanded?this.demoteSplashMessage():setTimeout(()=>{this.demoteSplashMessage()},C.AUTO_DEMOTE_NOTIFICATION_DELAY))}demoteSplashMessage(){this.splashMessage&&this.log("log",this.splashMessage),this.showSplashMessage(void 0)}checkLicense(t){this.frontendConnection?this.frontendConnection.sendLicenseCheck(t):Ei({message:"Internal error: no connection",product:t})}log(t,e,o,n){const i=this.nextMessageId;for(this.nextMessageId+=1,this.messages.push({id:i,type:t,message:e,details:o,link:n,dontShowAgain:!1,deleted:!1});this.messages.length>C.MAX_LOG_ROWS;)this.messages.shift();this.requestUpdate(),this.updateComplete.then(()=>{const s=this.renderRoot.querySelector(".message-tray .message:last-child");this.expanded&&s?(setTimeout(()=>s.scrollIntoView({behavior:"smooth"}),this.transitionDuration),this.unreadErrors=!1):t==="error"&&(this.unreadErrors=!0)})}showNotification(t,e,o,n,i){if(i===void 0||!C.notificationDismissed(i)){if(this.notifications.filter(r=>r.persistentId===i).filter(r=>!r.deleted).length>0)return;const s=this.nextMessageId;this.nextMessageId+=1,this.notifications.push({id:s,type:t,message:e,details:o,link:n,persistentId:i,dontShowAgain:!1,deleted:!1}),n===void 0&&setTimeout(()=>{this.dismissNotification(s)},C.AUTO_DEMOTE_NOTIFICATION_DELAY),this.requestUpdate()}else this.log(t,e,o,n)}dismissNotification(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];if(o.dontShowAgain&&o.persistentId&&!C.notificationDismissed(o.persistentId)){let n=window.localStorage.getItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE);n=n===null?o.persistentId:`${n},${o.persistentId}`,window.localStorage.setItem(C.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE,n)}o.deleted=!0,this.log(o.type,o.message,o.details,o.link),setTimeout(()=>{const n=this.findNotificationIndex(t);n!==-1&&(this.notifications.splice(n,1),this.requestUpdate())},this.transitionDuration)}}findNotificationIndex(t){let e=-1;return this.notifications.some((o,n)=>o.id===t?(e=n,!0):!1),e}toggleDontShowAgain(t){const e=this.findNotificationIndex(t);if(e!==-1&&!this.notifications[e].deleted){const o=this.notifications[e];o.dontShowAgain=!o.dontShowAgain,this.requestUpdate()}}setActive(t){var e,o;(e=this.frontendConnection)==null||e.setActive(t),(o=this.javaConnection)==null||o.setActive(t),window.sessionStorage.setItem(C.ACTIVE_KEY_IN_SESSION_STORAGE,t?"true":"false")}getStatusColor(t){return t===M.ACTIVE?"var(--dev-tools-green-color)":t===M.INACTIVE?"var(--dev-tools-grey-color)":t===M.UNAVAILABLE?"var(--dev-tools-yellow-hsl)":t===M.ERROR?"var(--dev-tools-red-color)":"none"}renderMessage(t){return v`
      <div
        class="message ${t.type} ${t.deleted?"animate-out":""} ${t.details||t.link?"has-details":""}"
      >
        <div class="message-content">
          <div class="message-heading">${t.message}</div>
          <div class="message-details" ?hidden="${!t.details&&!t.link}">
            ${t.details?v`<p>${t.details}</p>`:""}
            ${t.link?v`<a class="ahreflike" href="${t.link}" target="_blank">Learn more</a>`:""}
          </div>
          ${t.persistentId?v`<div
                class="persist ${t.dontShowAgain?"on":"off"}"
                @click=${()=>this.toggleDontShowAgain(t.id)}
              >
                Don’t show again
              </div>`:""}
        </div>
        <div class="dismiss-message" @click=${()=>this.dismissNotification(t.id)}>Dismiss</div>
      </div>
    `}render(){return v` <div
        class="window ${this.expanded&&!this.componentPickActive?"visible":"hidden"}"
        tabindex="0"
        @keydown=${t=>t.key==="Escape"&&this.expanded&&this.toggleExpanded()}
      >
        <div class="window-toolbar">
          ${this.tabs.map(t=>v`<button
                class=${Mo({tab:!0,active:this.activeTab===t.id,unreadErrors:t.id==="log"&&this.unreadErrors})}
                id="${t.id}"
                @click=${()=>{this.activeTab=t.id,t.activate&&t.activate.call(this)}}
              >
                ${t.title}
              </button> `)}
          <button class="minimize-button" title="Minimize" @click=${()=>this.toggleExpanded()}>
            <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <g fill="#fff" opacity=".8">
                <path
                  d="m7.25 1.75c0-.41421.33579-.75.75-.75h3.25c2.0711 0 3.75 1.67893 3.75 3.75v6.5c0 2.0711-1.6789 3.75-3.75 3.75h-6.5c-2.07107 0-3.75-1.6789-3.75-3.75v-3.25c0-.41421.33579-.75.75-.75s.75.33579.75.75v3.25c0 1.2426 1.00736 2.25 2.25 2.25h6.5c1.2426 0 2.25-1.0074 2.25-2.25v-6.5c0-1.24264-1.0074-2.25-2.25-2.25h-3.25c-.41421 0-.75-.33579-.75-.75z"
                />
                <path
                  d="m2.96967 2.96967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46967v-2.68934c0-.41421.33579-.75.75-.75.4142 0 .75.33579.75.75v4.5c0 .4142-.3358.75-.75.75h-4.5c-.41421 0-.75-.3358-.75-.75 0-.41421.33579-.75.75-.75h2.68934l-5.46967-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
                />
              </g>
            </svg>
          </button>
        </div>
        ${this.tabs.map(t=>this.activeTab===t.id?t.render():k)}
      </div>

      <div class="notification-tray">${this.notifications.map(t=>this.renderMessage(t))}</div>
      <vaadin-dev-tools-component-picker
        .active=${this.componentPickActive}
        @component-picker-opened=${()=>{this.componentPickActive=!0}}
        @component-picker-closed=${()=>{this.componentPickActive=!1}}
      ></vaadin-dev-tools-component-picker>
      <div
        class="dev-tools ${this.splashMessage?"active":""}${this.unreadErrors?" error":""}"
        @click=${()=>this.toggleExpanded()}
      >
        ${this.unreadErrors?v`<svg
              fill="none"
              height="16"
              viewBox="0 0 16 16"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              class="dev-tools-icon error"
            >
              <clipPath id="a"><path d="m0 0h16v16h-16z" /></clipPath>
              <g clip-path="url(#a)">
                <path
                  d="m6.25685 2.09894c.76461-1.359306 2.72169-1.359308 3.4863 0l5.58035 9.92056c.7499 1.3332-.2135 2.9805-1.7432 2.9805h-11.1606c-1.529658 0-2.4930857-1.6473-1.743156-2.9805z"
                  fill="#ff5c69"
                />
                <path
                  d="m7.99699 4c-.45693 0-.82368.37726-.81077.834l.09533 3.37352c.01094.38726.32803.69551.71544.69551.38741 0 .70449-.30825.71544-.69551l.09533-3.37352c.0129-.45674-.35384-.834-.81077-.834zm.00301 8c.60843 0 1-.3879 1-.979 0-.5972-.39157-.9851-1-.9851s-1 .3879-1 .9851c0 .5911.39157.979 1 .979z"
                  fill="#fff"
                />
              </g>
            </svg>`:v`<svg
              fill="none"
              height="17"
              viewBox="0 0 16 17"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
              class="dev-tools-icon logo"
            >
              <g fill="#fff">
                <path
                  d="m8.88273 5.97926c0 .04401-.0032.08898-.00801.12913-.02467.42848-.37813.76767-.8117.76767-.43358 0-.78704-.34112-.81171-.76928-.00481-.04015-.00801-.08351-.00801-.12752 0-.42784-.10255-.87656-1.14434-.87656h-3.48364c-1.57118 0-2.315271-.72849-2.315271-2.21758v-1.26683c0-.42431.324618-.768314.748261-.768314.42331 0 .74441.344004.74441.768314v.42784c0 .47924.39576.81265 1.11293.81265h3.41538c1.5542 0 1.67373 1.156 1.725 1.7679h.03429c.05095-.6119.17048-1.7679 1.72468-1.7679h3.4154c.7172 0 1.0145-.32924 1.0145-.80847l-.0067-.43202c0-.42431.3227-.768314.7463-.768314.4234 0 .7255.344004.7255.768314v1.26683c0 1.48909-.6181 2.21758-2.1893 2.21758h-3.4836c-1.04182 0-1.14437.44872-1.14437.87656z"
                />
                <path
                  d="m8.82577 15.1648c-.14311.3144-.4588.5335-.82635.5335-.37268 0-.69252-.2249-.83244-.5466-.00206-.0037-.00412-.0073-.00617-.0108-.00275-.0047-.00549-.0094-.00824-.0145l-3.16998-5.87318c-.08773-.15366-.13383-.32816-.13383-.50395 0-.56168.45592-1.01879 1.01621-1.01879.45048 0 .75656.22069.96595.6993l2.16882 4.05042 2.17166-4.05524c.2069-.47379.513-.69448.9634-.69448.5603 0 1.0166.45711 1.0166 1.01879 0 .17579-.0465.35029-.1348.50523l-3.1697 5.8725c-.00503.0096-.01006.0184-.01509.0272-.00201.0036-.00402.0071-.00604.0106z"
                />
              </g>
            </svg>`}

        <span
          class="status-blip"
          style="background: linear-gradient(to right, ${this.getStatusColor(this.frontendStatus)} 50%, ${this.getStatusColor(this.javaStatus)} 50%)"
        ></span>
        ${this.splashMessage?v`<span class="status-description">${this.splashMessage}</span></div>`:k}
      </div>`}renderLog(){return v`<div class="message-tray">${this.messages.map(t=>this.renderMessage(t))}</div>`}activateLog(){this.unreadErrors=!1,this.updateComplete.then(()=>{const t=this.renderRoot.querySelector(".message-tray .message:last-child");t&&t.scrollIntoView()})}renderCode(){return v`<div class="info-tray">
      <div>
        <select id="locationType">
          <option value="create" selected>Create</option>
          <option value="attach">Attach</option>
        </select>
        <button
          class="button pick"
          @click=${async()=>{await S(()=>Promise.resolve().then(()=>Ia),void 0),this.componentPicker.open({infoTemplate:v`
                <div>
                  <h3>Locate a component in source code</h3>
                  <p>Use the mouse cursor to highlight components in the UI.</p>
                  <p>Use arrow down/up to cycle through and highlight specific components under the cursor.</p>
                  <p>
                    Click the primary mouse button to open the corresponding source code line of the highlighted
                    component in your IDE.
                  </p>
                </div>
              `,pickCallback:t=>{const e={nodeId:t.nodeId,uiId:t.uiId};this.renderRoot.querySelector("#locationType").value==="create"?this.frontendConnection.sendShowComponentCreateLocation(e):this.frontendConnection.sendShowComponentAttachLocation(e)}})}}
        >
          Find component in code
        </button>
      </div>
      </div>
    </div>`}renderInfo(){return v`<div class="info-tray">
      <button class="button copy" @click=${this.copyInfoToClipboard}>Copy</button>
      <dl>
        <dt>${this.serverInfo.productName}</dt>
        <dd>${this.serverInfo.vaadinVersion}</dd>
        <dt>Flow</dt>
        <dd>${this.serverInfo.flowVersion}</dd>
        <dt>Java</dt>
        <dd>${this.serverInfo.javaVersion}</dd>
        <dt>OS</dt>
        <dd>${this.serverInfo.osVersion}</dd>
        <dt>Browser</dt>
        <dd>${navigator.userAgent}</dd>
        <dt>
          Live reload
          <label class="switch">
            <input
              id="toggle"
              type="checkbox"
              ?disabled=${this.liveReloadDisabled||(this.frontendStatus===M.UNAVAILABLE||this.frontendStatus===M.ERROR)&&(this.javaStatus===M.UNAVAILABLE||this.javaStatus===M.ERROR)}
              ?checked="${this.frontendStatus===M.ACTIVE||this.javaStatus===M.ACTIVE}"
              @change=${t=>this.setActive(t.target.checked)}
            />
            <span class="slider"></span>
          </label>
        </dt>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.javaStatus)}">
          Java ${this.javaStatus} ${this.backend?`(${C.BACKEND_DISPLAY_NAME[this.backend]})`:""}
        </dd>
        <dd class="live-reload-status" style="--status-color: ${this.getStatusColor(this.frontendStatus)}">
          Front end ${this.frontendStatus}
        </dd>
      </dl>
    </div>`}renderFeatures(){return v`<div class="features-tray">
      ${this.features.map(t=>v`<div class="feature">
          <label class="switch">
            <input
              class="feature-toggle"
              id="feature-toggle-${t.id}"
              type="checkbox"
              ?checked=${t.enabled}
              @change=${e=>this.toggleFeatureFlag(e,t)}
            />
            <span class="slider"></span>
            ${t.title}
          </label>
          <a class="ahreflike" href="${t.moreInfoLink}" target="_blank">Learn more</a>
        </div>`)}
    </div>`}renderThemeEditor(){return v` <vaadin-dev-tools-theme-editor
      .expanded=${this.expanded}
      .themeEditorState=${this.themeEditorState}
      .pickerProvider=${()=>this.componentPicker}
      .connection=${this.frontendConnection}
    ></vaadin-dev-tools-theme-editor>`}copyInfoToClipboard(){const t=this.renderRoot.querySelectorAll(".info-tray dt, .info-tray dd"),e=Array.from(t).map(o=>(o.localName==="dd"?": ":`
`)+o.textContent.trim()).join("").replace(/^\n/,"");Da(e),this.showNotification("information","Environment information copied to clipboard",void 0,void 0,"versionInfoCopied")}toggleFeatureFlag(t,e){const o=t.target.checked;this.frontendConnection?(this.frontendConnection.setFeature(e.id,o),this.showNotification("information",`“${e.title}” ${o?"enabled":"disabled"}`,e.requiresServerRestart?"This feature requires a server restart":void 0,void 0,`feature${e.id}${o?"Enabled":"Disabled"}`)):this.log("error",`Unable to toggle feature ${e.title}: No server connection available`)}};let _=C;_.MAX_LOG_ROWS=1e3;_.DISMISSED_NOTIFICATIONS_IN_LOCAL_STORAGE="vaadin.live-reload.dismissedNotifications";_.ACTIVE_KEY_IN_SESSION_STORAGE="vaadin.live-reload.active";_.TRIGGERED_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggered";_.TRIGGERED_COUNT_KEY_IN_SESSION_STORAGE="vaadin.live-reload.triggeredCount";_.AUTO_DEMOTE_NOTIFICATION_DELAY=5e3;_.HOTSWAP_AGENT="HOTSWAP_AGENT";_.JREBEL="JREBEL";_.SPRING_BOOT_DEVTOOLS="SPRING_BOOT_DEVTOOLS";_.BACKEND_DISPLAY_NAME={HOTSWAP_AGENT:"HotswapAgent",JREBEL:"JRebel",SPRING_BOOT_DEVTOOLS:"Spring Boot Devtools"};N([y({type:String})],_.prototype,"url",2);N([y({type:Boolean,attribute:!0})],_.prototype,"liveReloadDisabled",2);N([y({type:String})],_.prototype,"backend",2);N([y({type:Number})],_.prototype,"springBootLiveReloadPort",2);N([y({type:Boolean,attribute:!1})],_.prototype,"expanded",2);N([y({type:Array,attribute:!1})],_.prototype,"messages",2);N([y({type:String,attribute:!1})],_.prototype,"splashMessage",2);N([y({type:Array,attribute:!1})],_.prototype,"notifications",2);N([y({type:String,attribute:!1})],_.prototype,"frontendStatus",2);N([y({type:String,attribute:!1})],_.prototype,"javaStatus",2);N([T()],_.prototype,"tabs",2);N([T()],_.prototype,"activeTab",2);N([T()],_.prototype,"serverInfo",2);N([T()],_.prototype,"features",2);N([T()],_.prototype,"unreadErrors",2);N([tt(".window")],_.prototype,"root",2);N([tt("vaadin-dev-tools-component-picker")],_.prototype,"componentPicker",2);N([T()],_.prototype,"componentPickActive",2);N([T()],_.prototype,"themeEditorState",2);customElements.get("vaadin-dev-tools")===void 0&&customElements.define("vaadin-dev-tools",_);const{toString:Ha}=Object.prototype;function qa(t){return Ha.call(t)==="[object RegExp]"}function Wa(t,{preserve:e=!0,whitespace:o=!0,all:n}={}){if(n)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let i=e,s;typeof e=="function"?(i=!1,s=e):qa(e)&&(i=!1,s=c=>e.test(c));let r=!1,l="",a="",d="";for(let c=0;c<t.length;c++){if(l=t[c],t[c-1]!=="\\"&&(l==='"'||l==="'")&&(r===l?r=!1:r||(r=l)),!r&&l==="/"&&t[c+1]==="*"){const m=t[c+2]==="!";let h=c+2;for(;h<t.length;h++){if(t[h]==="*"&&t[h+1]==="/"){i&&m||s&&s(a)?d+=`/*${a}*/`:o||(t[h+2]===`
`?h++:t[h+2]+t[h+3]===`\r
`&&(h+=2)),a="";break}a+=t[h]}c=h+1;continue}d+=l}return d}const Ga=CSSStyleSheet.toString().includes("document.createElement"),Ka=(t,e)=>{const o=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(t)!=null&&(t=Wa(t));for(var n,i=t;(n=o.exec(t))!==null;){i=i.replace(n[0],"");const s=document.createElement("link");s.rel="stylesheet",s.href=n[2]||n[4];const r=n[1]||n[5];r&&(s.media=r),e===document?document.head.appendChild(s):e.appendChild(s)}return i},Ya=(t,e,o)=>(o?e.adoptedStyleSheets=[t,...e.adoptedStyleSheets]:e.adoptedStyleSheets=[...e.adoptedStyleSheets,t],()=>{e.adoptedStyleSheets=e.adoptedStyleSheets.filter(n=>n!==t)}),Ja=(t,e,o)=>{const n=new CSSStyleSheet;return n.replaceSync(t),Ga?Ya(n,e,o):(o?e.adoptedStyleSheets.splice(0,0,n):e.adoptedStyleSheets.push(n),()=>{e.adoptedStyleSheets.splice(e.adoptedStyleSheets.indexOf(n),1)})},Xa=(t,e)=>{const o=document.createElement("style");o.type="text/css",o.textContent=t;let n;if(e){const s=Array.from(document.head.childNodes).filter(r=>r.nodeType===Node.COMMENT_NODE).find(r=>r.data.trim()===e);s&&(n=s)}return document.head.insertBefore(o,n),()=>{o.remove()}},Kn=(t,e,o,n)=>{if(o===document){const s=Qa(t);if(window.Vaadin.theme.injectedGlobalCss.indexOf(s)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(s)}const i=Ka(t,o);return o===document?Xa(i,e):Ja(i,o,n)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function Yn(t){let e,o,n=2166136261;for(e=0,o=t.length;e<o;e++)n^=t.charCodeAt(e),n+=(n<<1)+(n<<4)+(n<<7)+(n<<8)+(n<<24);return("0000000"+(n>>>0).toString(16)).substr(-8)}function Qa(t){let e=Yn(t);return e+Yn(e+t)}document["_vaadintheme_my-theme_componentCss"]||(document["_vaadintheme_my-theme_componentCss"]=!0);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Za extends HTMLElement{static get version(){return"24.1.0"}}customElements.define("vaadin-lumo-styles",Za);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const el=t=>class extends t{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(o,n,i){super.attributeChangedCallback(o,n,i),o==="theme"&&this._set_theme(i)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ki=[];function $i(t){return t&&Object.prototype.hasOwnProperty.call(t,"__themes")}function tl(t){return $i(customElements.get(t))}function ol(t=[]){return[t].flat(1/0).filter(e=>e instanceof Io?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function Ti(t,e,o={}){t&&tl(t)&&console.warn(`The custom element definition for "${t}"
      was finalized before a style module was registered.
      Make sure to add component specific style modules before
      importing the corresponding custom element.`),e=ol(e),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(t,e,o):ki.push({themeFor:t,styles:e,include:o.include,moduleId:o.moduleId})}function To(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():ki}function nl(t,e){return(t||"").split(" ").some(o=>new RegExp(`^${o.split("*").join(".*")}$`,"u").test(e))}function il(t=""){let e=0;return t.startsWith("lumo-")||t.startsWith("material-")?e=1:t.startsWith("vaadin-")&&(e=2),e}function Ni(t){const e=[];return t.include&&[].concat(t.include).forEach(o=>{const n=To().find(i=>i.moduleId===o);n?e.push(...Ni(n),...n.styles):console.warn(`Included moduleId ${o} not found in style registry`)},t.styles),e}function sl(t,e){const o=document.createElement("style");o.innerHTML=t.map(n=>n.cssText).join(`
`),e.content.appendChild(o)}function rl(t){const e=`${t}-default-theme`,o=To().filter(n=>n.moduleId!==e&&nl(n.themeFor,t)).map(n=>({...n,styles:[...Ni(n),...n.styles],includePriority:il(n.moduleId)})).sort((n,i)=>i.includePriority-n.includePriority);return o.length>0?o:To().filter(n=>n.moduleId===e)}const ml=t=>class extends el(t){static finalize(){if(super.finalize(),this.elementStyles)return;const o=this.prototype._template;!o||$i(this)||sl(this.getStylesForThis(),o)}static finalizeStyles(o){const n=this.getStylesForThis();return o?[...super.finalizeStyles(o),...n]:n}static getStylesForThis(){const o=Object.getPrototypeOf(this.prototype),n=(o?o.constructor.__themes:[])||[];this.__themes=[...n,...rl(this.is)];const i=this.__themes.flatMap(s=>s.styles);return i.filter((s,r)=>r===i.lastIndexOf(s))}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const al=(t,...e)=>{const o=document.createElement("style");o.id=t,o.textContent=e.map(n=>n.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",o)},zt=(t,...e)=>{al(`lumo-${t}`,e)};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ll=E`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;zt("color-props",ll);const Ho=E`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
`;Ti("",Ho,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */zt("color",Ho);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dl=E`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,qo=E`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;Ti("",qo,{moduleId:"lumo-typography"});zt("typography-props",dl);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */zt("typography",qo);const cl=t=>{const e=[];t!==document&&(e.push(Kn(Ho.cssText,"",t,!0)),e.push(Kn(qo.cssText,"",t,!0)))},hl=cl;hl(document);export{nr as D,je as F,A as L,tr as P,ml as T,Ne as U,x as _,zt as a,be as b,E as c,or as d,Ti as e,el as f,Ho as g,v as h,qo as i,J as j,_r as k,wr as l,k as n,Ae as r,Te as s,ki as t,Ss as u,P as y};
