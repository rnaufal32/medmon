import{R as h,j as n,K as q,r as Q,S as X,L as Y}from"./app-DmHnhfl3.js";import{A as Z,I as P}from"./AdminLayout-slW7fB6V.js";import{d as O,D as B}from"./index.esm-DcBb_5-2.js";var ee={},$=function(t,e){return $=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,s){r.__proto__=s}||function(r,s){for(var o in s)Object.prototype.hasOwnProperty.call(s,o)&&(r[o]=s[o])},$(t,e)};function te(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");$(t,e);function r(){this.constructor=t}t.prototype=e===null?Object.create(e):(r.prototype=e.prototype,new r)}var A=function(){return A=Object.assign||function(e){for(var r,s=1,o=arguments.length;s<o;s++){r=arguments[s];for(var l in r)Object.prototype.hasOwnProperty.call(r,l)&&(e[l]=r[l])}return e},A.apply(this,arguments)},re=Object.prototype.hasOwnProperty;function G(t,e){return t===e?t!==0||e!==0||1/t===1/e:t!==t&&e!==e}function ne(t,e){if(G(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var r=Object.keys(t),s=Object.keys(e);if(r.length!==s.length)return!1;for(var o=0;o<r.length;o++)if(!re.call(e,r[o])||!G(t[r[o]],e[r[o]]))return!1;return!0}var m=Symbol("none"),se=Symbol("__state");function k(t,e){var r=Object(t)===t?t[I]:void 0;if(r)if(r.isMounted){var s=function(){var _=r.store,K=function(){return d({store:_,state:g,source:l.source})},g=new C(_,r.path,_.get(r.path),_.edition,K);return{store:_,state:g,source:t}},o=h.useState(s),l=o[0],d=o[1];if(l.store!==r.store||!("source"in l))throw new x(r.path,c.InitStateStoreSwitchover);Object.defineProperty(l,"store",{enumerable:!1}),Object.defineProperty(l,"state",{enumerable:!1}),Object.defineProperty(l,"source",{enumerable:!1}),l.state.reconstruct(r.path,l.store.get(r.path),l.store.edition,l.source!==t),l.source=t,r.subscribe(l.state),z(function(){return l.state.onMount(),r.subscribe(l.state),function(){l.state.onUnmount(),r.unsubscribe(l.state)}},[]);var a=l.state.self();return l["[hookstate(scoped)]"]=a,a}else{var s=function(){var g=r.store,L=function(){return b({store:g,state:N,source:u.source})},N=new C(g,p,g.get(p),g.edition,L);return{store:g,state:N,source:t}},i=h.useState(s),u=i[0],b=i[1];if(u.store!==r.store||!("source"in u))throw new x(r.path,c.InitStateStoreSwitchover);Object.defineProperty(u,"store",{enumerable:!1}),Object.defineProperty(u,"state",{enumerable:!1}),Object.defineProperty(u,"source",{enumerable:!1}),u.state.reconstruct(p,u.store.get(p),u.store.edition,u.source!==t),u.source=t,u.store.subscribe(u.state),z(function(){return u.state.onMount(),u.store.subscribe(u.state),function(){u.state.onUnmount(),u.store.unsubscribe(u.state)}},[]);for(var a=u.state.self(),y=0;y<r.path.length;y+=1)a=a.nested(r.path[y]);return u["[hookstate(global)]"]=a,a}else{var s=function(){var g=oe(t),L=function(){return v({store:g,state:N})},N=new C(g,p,g.get(p),g.edition,L);return{store:g,state:N}},w=h.useState(s),f=w[0],v=w[1];if("source"in f)throw new x(p,c.InitStateStoreSwitchover);Object.defineProperty(f,"store",{enumerable:!1}),Object.defineProperty(f,"state",{enumerable:!1}),f.state.reconstruct(p,f.store.get(p),f.store.edition,!1),f.store.subscribe(f.state),f.store.activate(e),z(function(){return f.state.onMount(),f.store.subscribe(f.state),f.store.activate(e),function(){f.state.onUnmount(),f.store.unsubscribe(f.state),f.store.deactivate()}},[]);var a=f.state.self();return f["[hookstate(local)]"]=a,a}}var I=Symbol("self"),c;(function(t){t[t.StateUsedInDependencyList=100]="StateUsedInDependencyList",t[t.InitStateToValueFromState=101]="InitStateToValueFromState",t[t.SetStateToValueFromState=102]="SetStateToValueFromState",t[t.GetStateWhenPromised=103]="GetStateWhenPromised",t[t.SetStateWhenPromised=104]="SetStateWhenPromised",t[t.SetStateNestedToPromised=105]="SetStateNestedToPromised",t[t.SetStateWhenDestroyed=106]="SetStateWhenDestroyed",t[t.ToJson_Value=108]="ToJson_Value",t[t.ToJson_State=109]="ToJson_State",t[t.GetProperty_Function=110]="GetProperty_Function",t[t.InitStateStoreSwitchover=111]="InitStateStoreSwitchover",t[t.GetUnknownPlugin=120]="GetUnknownPlugin",t[t.SetProperty_State=201]="SetProperty_State",t[t.SetProperty_Value=202]="SetProperty_Value",t[t.SetPrototypeOf_State=203]="SetPrototypeOf_State",t[t.SetPrototypeOf_Value=204]="SetPrototypeOf_Value",t[t.PreventExtensions_State=205]="PreventExtensions_State",t[t.PreventExtensions_Value=206]="PreventExtensions_Value",t[t.DefineProperty_State=207]="DefineProperty_State",t[t.DefineProperty_Value=208]="DefineProperty_Value",t[t.DeleteProperty_State=209]="DeleteProperty_State",t[t.DeleteProperty_Value=210]="DeleteProperty_Value",t[t.Construct_State=211]="Construct_State",t[t.Construct_Value=212]="Construct_Value",t[t.Apply_State=213]="Apply_State",t[t.Apply_Value=214]="Apply_Value"})(c||(c={}));var x=function(t){te(e,t);function e(r,s,o){return t.call(this,"Error: HOOKSTATE-".concat(s," [path: /").concat(r.join("/")).concat(o?", details: ".concat(o):"","]. ")+"See https://hookstate.js.org/docs/exceptions#hookstate-".concat(s))||this}return e}(Error),U=Symbol("ProxyMarker"),p=[],ie=function(){function t(e){var r=this;this._value=e,this.edition=1,this._subscribers=new Set,Object(e)===e&&V.promiseDetector(e)?this.setPromised(e):e===m&&this.setPromised(void 0);var s=function(){r._stateMethods.reconstruct(p,r.get(p),r.edition,!1)};s[D]=!0,this._stateMethods=new C(this,p,this.get(p),this.edition,s),this.subscribe(this._stateMethods)}return t.prototype.setPromised=function(e){var r=this;if(this._value=m,this._promiseError=void 0,this._promiseResolver=void 0,!e){this._promise=new Promise(function(s){r._promiseResolver=s});return}e=e.then(function(s){r._promise===e&&(r._promise=void 0,r._promiseError=void 0,r._promiseResolver,r.update(r._stateMethods.self(),r.set(p,s)))}).catch(function(s){if(r._promise===e){r._promise=void 0,r._promiseResolver=void 0,r._promiseError=s,r.edition+=1;var o={path:p};r.update(r._stateMethods.self(),o)}}),this._promise=e},t.prototype.activate=function(e){var r,s,o,l;this.edition<0&&(this.edition=-this.edition),this._extension===void 0&&(this._extension=e==null?void 0:e(),this._extensionMethods=(s=(r=this._extension)===null||r===void 0?void 0:r.onCreate)===null||s===void 0?void 0:s.call(r,this._stateMethods.self(),{}),(l=(o=this._extension)===null||o===void 0?void 0:o.onInit)===null||l===void 0||l.call(o,this._stateMethods.self(),this._extensionMethods||{}))},t.prototype.deactivate=function(){var e,r;this._extension&&((r=(e=this._extension).onDestroy)===null||r===void 0||r.call(e,this._stateMethods.self()),delete this._extension,delete this._extensionMethods),this.edition>0&&(this.edition=-this.edition)},Object.defineProperty(t.prototype,"extension",{get:function(){return this._extensionMethods},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"promise",{get:function(){return this._promise},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"promiseError",{get:function(){return this._promiseError},enumerable:!1,configurable:!0}),t.prototype.get=function(e){var r=this._value;return r===m||e.forEach(function(s){r=r[s]}),r},t.prototype.set=function(e,r){var s,o;if(this.edition<0)throw new x(e,c.SetStateWhenDestroyed);if(e.length===0){if(r===m)this.setPromised(void 0);else if(Object(r)===r&&V.promiseDetector(r))this.setPromised(r),r=m;else{if(this._promise&&!this._promiseResolver)throw new x(e,c.SetStateWhenPromised);this._promiseError=void 0}var l=this._value;if(this._value=r,this.afterSet(),l===m&&this._value!==m&&this._promiseResolver){this._promise=void 0,this._promiseError=void 0;var d=this._promiseResolver;this._promiseResolver,d(this._value)}return{path:e}}if(Object(r)===r&&V.promiseDetector(r))throw new x(e,c.SetStateNestedToPromised);for(var a=this._value,i=0;i<e.length-1;i+=1)a=a[e[i]];var u=e[e.length-1];return u in a?r!==m?(a[u]=r,this.afterSet(),{path:e}):(Array.isArray(a)&&typeof u=="number"?a.splice(u,1):delete a[u],this.afterSet(),{path:e.slice(0,-1),actions:(s={},s[u]="D",s)}):r!==m?(a[u]=r,this.afterSet(),{path:e.slice(0,-1),actions:(o={},o[u]="I",o)}):{path:e}},t.prototype.preset=function(e,r){var s,o;(o=(s=this._extension)===null||s===void 0?void 0:s.onPreset)===null||o===void 0||o.call(s,e,r,this._stateMethods.self())},t.prototype.premerge=function(e,r){var s,o;(o=(s=this._extension)===null||s===void 0?void 0:s.onPremerge)===null||o===void 0||o.call(s,e,r,this._stateMethods.self())},t.prototype.update=function(e,r){var s=this,o,l;(l=(o=this._extension)===null||o===void 0?void 0:o.onSet)===null||l===void 0||l.call(o,e,r,this._stateMethods.self());var d=new Set;r.actions&&Object.values(r.actions).findIndex(function(a){return a!=="U"})===-1?Object.keys(r.actions).forEach(function(a){s._subscribers.forEach(function(i){return i.onSet({path:r.path.concat(a)},d)})}):this._subscribers.forEach(function(a){return a.onSet(r,d)}),d.forEach(function(a){return a()})},t.prototype.afterSet=function(){this.edition>0&&(this.edition+=1),this.edition<0&&(this.edition-=1)},t.prototype.toMethods=function(){return this._stateMethods},t.prototype.subscribe=function(e){this._subscribers.add(e)},t.prototype.unsubscribe=function(e){this._subscribers.delete(e)},t.prototype.toJSON=function(){throw new x(p,c.ToJson_Value)},t}(),j=Symbol("UnusedValue"),D=Symbol("IsUnmounted"),C=function(){function t(e,r,s,o,l){this.store=e,this.path=r,this.valueSource=s,this.valueEdition=o,this.onSetUsed=l,this.valueUsed=j}return Object.defineProperty(t.prototype,se,{get:function(){return[this.get(),this.self()]},enumerable:!1,configurable:!0}),t.prototype.reconstruct=function(e,r,s,o){this.path=e,this.valueSource=r,this.valueEdition=s,this.valueUsed=j,o?(delete this.selfUsed,delete this.childrenCreated,delete this.childrenUsedPrevious):(this.valueUsedNoProxyPrevious=this.valueUsedNoProxy,this.childrenUsedPrevious=this.childrenUsed),delete this.valueUsedNoProxy,delete this.childrenUsed},t.prototype.reconnect=function(){this.get({__internalAllowPromised:!0,noproxy:this.valueUsedNoProxyPrevious}),this.childrenUsed=A(A({},this.childrenUsedPrevious),this.childrenUsed)},t.prototype.getUntracked=function(e){if(this.valueEdition!==this.store.edition&&(this.valueSource=this.store.get(this.path),this.valueEdition=this.store.edition,this.valueUsed!==j&&(this.valueUsed=j,this.get({__internalAllowPromised:!0}))),e)return this.valueSource;if(this.store.promiseError)throw this.store.promiseError;if(this.store.promise)throw new x(this.path,c.GetStateWhenPromised);return this.valueSource},t.prototype.get=function(e){var r,s=this.getUntracked(e==null?void 0:e.__internalAllowPromised);return e!=null&&e.stealth?s:(this.valueUsed===j&&(Array.isArray(s)?this.valueUsed=this.valueArrayImpl(s):Object(s)===s?((r=s.constructor)===null||r===void 0?void 0:r.name)==="Object"?this.valueUsed=this.valueObjectImpl(s):(this.valueUsedNoProxy=!0,this.valueUsed=s):this.valueUsed=s),e!=null&&e.noproxy?(this.valueUsedNoProxy=!0,s):this.valueUsed)},Object.defineProperty(t.prototype,"value",{get:function(){return this.get()},enumerable:!1,configurable:!0}),t.prototype.setUntrackedV4=function(e){if(typeof e=="function"&&(e=e(this.getUntracked())),this.store.preset(this.self(),e),Object(e)===e&&e[U])throw new x(this.path,c.SetStateToValueFromState);return e!==Object(e)&&e===this.getUntracked(!0)?null:this.store.set(this.path,e)},t.prototype.set=function(e){var r=this.setUntrackedV4(e);r&&this.store.update(this.self(),r)},t.prototype.mergeUntracked=function(e){var r=this.mergeUntrackedV4(e);return r?[r.path]:[]},t.prototype.mergeUntrackedV4=function(e){var r=this.getUntracked();if(typeof e=="function"&&(e=e(r)),this.store.premerge(this.self(),e),Array.isArray(r))if(Array.isArray(e)){var s={path:this.path,actions:{}};return e.forEach(function(a,i){s.actions[r.push(a)-1]="I"}),Object.keys(s.actions).length>0?(this.setUntrackedV4(r),s):null}else{var o={path:this.path,actions:{}},l=[];return Object.keys(e).map(function(a){return Number(a)}).sort(function(a,i){return a-i}).forEach(function(a){var i=Number(a),u=e[i];u===m?(o.actions[i]="D",l.push(i)):(i in r?o.actions[i]="U":o.actions[i]="I",r[i]=u)}),l.reverse().forEach(function(a){r.splice(a,1)}),Object.keys(o.actions).length>0?(this.setUntrackedV4(r),o):null}else if(Object(r)===r){var d={path:this.path,actions:{}};return Object.keys(e).forEach(function(a){var i=e[a];i===m?(d.actions[a]="D",delete r[a]):(a in r?d.actions[a]="U":d.actions[a]="I",r[a]=i)}),Object.keys(d.actions).length>0?(this.setUntrackedV4(r),d):null}else return typeof r=="string"?this.setUntrackedV4(r+String(e)):this.setUntrackedV4(e)},t.prototype.merge=function(e){var r=this.mergeUntrackedV4(e);r&&this.store.update(this.self(),r)},t.prototype.nested=function(e){return this.child(e).self()},t.prototype.rerender=function(e){for(var r=0,s=e;r<s.length;r++){var o=s[r];this.store.update(this.self(),{path:o})}},t.prototype.activate=function(e){this.store.activate(e)},t.prototype.deactivate=function(){this.store.deactivate()},t.prototype.subscribe=function(e){this.subscribers===void 0&&(this.subscribers=new Set),this.subscribers.add(e)},t.prototype.unsubscribe=function(e){this.subscribers&&this.subscribers.delete(e)},Object.defineProperty(t.prototype,"isMounted",{get:function(){return!this.onSetUsed[D]},enumerable:!1,configurable:!0}),t.prototype.onMount=function(){delete this.onSetUsed[D]},t.prototype.onUnmount=function(){this.onSetUsed[D]=!0},t.prototype.onSet=function(e,r){var s=this,o=function(){var d,a=!1;s.valueUsedNoProxy&&s.valueUsed!==j&&(r.add(s.onSetUsed),delete s.selfUsed,a=!0);var i=e.path,u=i[s.path.length];if(u===void 0){if(s.valueUsed!==j){if(r.add(s.onSetUsed),delete s.selfUsed,delete s.childrenUsed,e.actions&&s.childrenCreated)if(Array.isArray(s.valueSource)&&Object.values(e.actions).includes("D")){var b=Object.keys(e.actions).map(function(f){return Number(f)}).sort(function(f,v){return f-v}).find(function(f){var v;return((v=e.actions)===null||v===void 0?void 0:v[f])==="D"});for(var y in s.childrenCreated)(Number(y)>=b||y in e.actions)&&delete s.childrenCreated[y]}else for(var y in e.actions)delete s.childrenCreated[y];else delete s.childrenCreated;return!0}}else{var w=(d=s.childrenUsed)===null||d===void 0?void 0:d[u];if(w&&w.onSet(e,r))return delete s.selfUsed,!0}return a},l=o();return!l&&this.subscribers!==void 0&&this.subscribers.forEach(function(d){d.onSet(e,r)&&delete s.selfUsed}),l},Object.defineProperty(t.prototype,"keys",{get:function(){var e=this.get();if(Array.isArray(e))return Object.keys(e).map(function(r){return Number(r)}).filter(function(r){return Number.isInteger(r)});if(Object(e)===e)return Object.keys(e)},enumerable:!1,configurable:!0}),t.prototype.child=function(e){this.childrenUsed=this.childrenUsed||{};var r=this.childrenUsed.hasOwnProperty(e)&&this.childrenUsed[e];if(r)return r;var s=this.valueSource[e];if(typeof s=="function")throw new x(this.path,c.GetProperty_Function);this.childrenCreated=this.childrenCreated||{};var o=this.childrenCreated[e],l;return o?(o.reconstruct(this.path.concat(e),s,this.valueEdition,!1),l=o):(l=new t(this.store,this.path.concat(e),s,this.valueEdition,this.onSetUsed),this.childrenCreated[e]=l),this.valueUsedNoProxy&&(l.valueUsedNoProxy=!0),this.childrenUsed[e]=l,l},t.prototype.valueArrayImpl=function(e){var r=this;return R(this.path,e,function(){return e},function(s,o){if(o==="length")return s.length;if(o in Array.prototype)return Array.prototype[o];if(o===U)return r;if(typeof o=="symbol")return s[o];var l=Number(o);if(Number.isInteger(l))return r.child(l).get()},function(s,o,l){if(typeof o=="symbol")return s[o]=l,!0;throw new x(r.path,c.SetProperty_Value)},!0)},t.prototype.valueObjectImpl=function(e){var r=this;return R(this.path,e,function(){return e},function(s,o){return o in Object.prototype?Object.prototype[o]:o===U?r:typeof o=="symbol"?s[o]:r.child(o).get()},function(s,o,l){if(typeof o=="symbol")return s[o]=l,!0;throw new x(r.path,c.SetProperty_Value)},!0)},t.prototype.self=function(){var e=this;if(this.selfUsed)return this.selfUsed;var r=function(s,o){if(o===I)return e;if(typeof o!="symbol"){if(o==="toJSON")throw new x(e.path,c.ToJson_State);var l=function(a){var i=e.get({__internalAllowPromised:a==="$$typeof"||a==="constructor"});if(a in Object.prototype)return Object.prototype[a];if(!(Object(i)!==i&&i!==m)){if(Array.isArray(i)){if(a==="length")return i.length;if(a in Array.prototype)return Array.prototype[a];var u=Number(a);return Number.isInteger(u)?e.nested(u):void 0}return e.nested(a.toString())}};switch(o){case"path":return e.path;case"keys":return e.keys;case"value":return e.value;case"ornull":return e.ornull;case"promised":return e.promised;case"promise":return e.promise;case"error":return e.error;case"get":return function(a){return e.get(a)};case"set":return function(a){return e.set(a)};case"merge":return function(a){return e.merge(a)};case"nested":return function(a){return l(a)};default:var d=e.store.extension;return d&&o in d?d[o](e.self()):l(o)}}};return this.selfUsed=R(this.path,this.valueSource,function(s){return e.get({__internalAllowPromised:!0,stealth:s==null?void 0:s.stealth})},r,function(s,o,l){throw new x(e.path,c.SetProperty_State)},!1),this.selfUsed},Object.defineProperty(t.prototype,"promised",{get:function(){return this.get({__internalAllowPromised:!0}),!!this.store.promise},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"promise",{get:function(){var e=this,r;return this.get({__internalAllowPromised:!0}),(r=this.store.promise)===null||r===void 0?void 0:r.then(function(s){return e.self()})},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"error",{get:function(){return this.get({__internalAllowPromised:!!this.store.promiseError}),this.store.promiseError},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"ornull",{get:function(){var e=this.get();return e==null?e:this.self()},enumerable:!1,configurable:!0}),t}();function R(t,e,r,s,o,l){var d=function(a){throw new x(t,a)};return Object(e)!==e&&(e={}),new Proxy(e,{getPrototypeOf:function(a){var i=r();return i==null?null:Object.getPrototypeOf(i===m?new Promise(function(){}):i)},setPrototypeOf:function(a,i){return d(l?c.SetPrototypeOf_State:c.SetPrototypeOf_Value)},isExtensible:function(a){return!0},preventExtensions:function(a){return d(l?c.PreventExtensions_State:c.PreventExtensions_Value)},getOwnPropertyDescriptor:function(a,i){var u=r();if(Object(u)===u){var b=Object.getOwnPropertyDescriptor(u,i);return Array.isArray(u)&&i in Array.prototype?b:b&&{configurable:!0,enumerable:b.enumerable,get:function(){return s(u,i)},set:void 0}}if(!(l||u===m)){if(i==="value")return{configurable:!0,enumerable:!0,get:function(){return r({stealth:!0})},set:void 0};if(i==="path")return{configurable:!0,enumerable:!0,get:function(){return t},set:void 0}}},has:function(a,i){if(typeof i=="symbol")return!1;var u=r();return Object(u)===u?i in u:l||u===m?!1:i==="value"||i==="path"},get:s,set:o,deleteProperty:function(a,i){return d(l?c.DeleteProperty_State:c.DeleteProperty_Value)},defineProperty:function(a,i,u){return d(l?c.DefineProperty_State:c.DefineProperty_Value)},ownKeys:function(a){var i=r();return Array.isArray(i)&&a.length===void 0&&Object.defineProperty(e,"length",{value:0,writable:!0,enumerable:!1,configurable:!1}),Object(i)===i?Object.getOwnPropertyNames(i):l||i===m?[]:["value","path"]},apply:function(a,i,u){return d(l?c.Apply_State:c.Apply_Value)},construct:function(a,i,u){return d(l?c.Construct_State:c.Construct_Value)}})}function oe(t){var e=t;if(typeof t=="function"&&(e=t()),Object(e)===e&&e[U])throw new x(p,c.InitStateToValueFromState);return new ie(e)}var V={interceptDependencyListsMode:"always",isDevelopmentMode:typeof process=="object"&&typeof ee=="object"&&!1,promiseDetector:function(t){return Promise.resolve(t)===t},hiddenInterceptDependencyListsModeDebug:!1};function S(t,e){for(var r=0,s=t||[];r<s.length;r++){var o=s[r];if(o===Object(o)){var l=o[I];l&&l.reconnect()}}return t}var M;function ae(t,e){return S(e),M(t,e)}var T;function le(t,e){return S(e),T(t,e)}var E;function ue(t,e){return S(e),E(t,e)}var W;function de(t,e,r){return S(r),W(t,e,r)}var J;function ce(t,e){return S(e),J(t,e)}var F;function fe(t,e){return S(e),F(t,e)}var H;function he(t,e){return H(t,function(r,s){return S(Object.keys(s).map(function(o){return s[o]})),(e||ne)(r,s)})}function pe(){!M&&h.useEffect&&(M=h.useEffect,h.useEffect=ae),!T&&h.useLayoutEffect&&(T=h.useLayoutEffect,h.useLayoutEffect=le),!E&&h.useInsertionEffect&&(E=h.useInsertionEffect,h.useInsertionEffect=ue),!W&&h.useImperativeHandle&&(W=h.useImperativeHandle,h.useImperativeHandle=de),!J&&h.useMemo&&(J=h.useMemo,h.useMemo=ce),!F&&h.useCallback&&(F=h.useCallback,h.useCallback=fe),!H&&h.memo&&(H=h.memo,h.memo=he)}pe();var z=typeof window<"u"?T:M;function me(t){return n.jsx("div",{id:t.id,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":`${t.id}-label`,children:n.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:n.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[n.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[t.title&&n.jsx("h3",{id:`${t.id}-label`,className:"font-bold text-gray-800 dark:text-white",children:t.title}),n.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#${t.id}`,children:[n.jsx("span",{className:"sr-only",children:"Close"}),n.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("path",{d:"M18 6 6 18"}),n.jsx("path",{d:"m6 6 12 12"})]})]})]}),n.jsx("div",{className:"p-4 overflow-y-auto",children:t.children}),t.footer&&n.jsx("div",{className:"flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700",children:t.footer})]})})})}function ye(t){q();const e=k(""),r=k(1),s=k(""),o=k({startDate:O().subtract(7,"days").toDate(),endDate:O().toDate()}),l=k({user:""}),d=Q.useCallback(()=>{X.get(route("news.index"),{page:r.get(),user:e.get(),search:s.get(),dateStart:o.startDate.get(),dateEnd:o.endDate.get()},{only:["news"],preserveScroll:!0,preserveState:!0})},[e,o]),a=()=>{alert(`Download Sample for ${l.user.get()}`)};return n.jsxs(Z,{children:[n.jsx(Y,{title:"News"}),n.jsxs("div",{className:"grid grid-cols-1 gap-5 max-h-[",children:[n.jsx("p",{className:"text-xl font-bold",children:"News"}),n.jsxs("div",{className:"flex flex-row gap-5",children:[n.jsx("div",{className:"w-full",children:n.jsxs("select",{"data-hs-select":`{
                        "placeholder": "Select User",
                        "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50"
                        }`,className:"hidden",value:e.get(),onChange:i=>{e.set(i.target.value),d()},children:[n.jsx("option",{value:"",disabled:!0,children:"Select User"}),t.users.map((i,u)=>n.jsx("option",{value:i.id,children:i.name},u))]})}),n.jsx("div",{className:"w-full",children:n.jsx(B,{primaryColor:"blue",value:o.get(),onChange:i=>{i!=null&&(o.set({startDate:O(i.startDate).toDate(),endDate:O(i.endDate).toDate()}),d())}})})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-5",children:[n.jsx("div",{className:"w-full space-y-3",children:n.jsx("input",{type:"text",className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",placeholder:"Search News"})}),n.jsxs("div",{className:"flex flex-row gap-5",children:[n.jsxs("button",{type:"button","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"hs-basic-modal","data-hs-overlay":"#modal-import",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(P,{icon:"solar:upload-minimalistic-broken",height:22,width:22}),"Import"]}),n.jsx(me,{id:"modal-import",title:"Import News",children:n.jsx("div",{className:"grid grid-cols-1",children:n.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[n.jsxs("select",{value:l.user.get(),onChange:i=>l.user.set(i.target.value),className:"py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx("option",{selected:!0,children:"Select User"}),t.users.map((i,u)=>n.jsx("option",{value:i.id,children:i.name},u))]}),n.jsx("div",{children:n.jsx("a",{href:`${route("news.import-sample")}`,target:"_blank",onClick:a,className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:"Download Sample"})})]})})}),n.jsxs("button",{type:"button",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(P,{icon:"solar:download-minimalistic-broken",height:22,width:22}),"Export"]}),n.jsxs("button",{type:"button",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(P,{icon:"prime:sync",height:22,width:22}),"Crawling"]})]})]}),n.jsx("div",{className:"flex flex-col",children:n.jsx("div",{className:"-m-1.5 overflow-x-auto",children:n.jsx("div",{className:"p-1.5 min-w-full inline-block align-middle",children:n.jsxs("div",{className:"border rounded-lg divide-y divide-gray-200",children:[n.jsx("div",{className:"overflow-hidden",children:n.jsxs("table",{className:"min-w-full divide-y divide-gray-200",children:[n.jsx("thead",{className:"bg-gray-50",children:n.jsxs("tr",{children:[n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"User"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase max-w-[100px]",children:"Target"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Date"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Title"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Sentiment"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Spokesperson"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Journalist"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Action"})]})}),n.jsxs("tbody",{className:"divide-y divide-gray-200",children:[t.news.data.length===0&&n.jsx("tr",{className:"text-center",children:n.jsx("td",{colSpan:8,height:100,children:"Empty"})}),t.news.data.map((i,u)=>n.jsxs("tr",{children:[n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.username}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 max-w-[100px]",children:i.target}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.date}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.title}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.sentiment}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.spookerperson}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:i.spookerperson}),n.jsxs("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 flex flex-row gap-2",children:[n.jsx("a",{href:i.url,target:"_blank",className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:n.jsx(P,{icon:"fluent:open-12-regular",width:20,height:20})}),n.jsx("button",{"aria-controls":`media-detail-${i.id}-${i.target_id}`,"data-hs-overlay":`#media-detail-${i.id}-${i.target_id}`,className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:n.jsx(P,{icon:"solar:document-broken",width:20,height:20})}),n.jsx("div",{id:`media-detail-${i.id}-${i.target_id}`,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":"hs-large-modal-label",children:n.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:n.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[n.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[n.jsx("h3",{id:"hs-large-modal-label",className:"font-bold text-gray-800 dark:text-white",children:i.title}),n.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#media-detail-${i.id}-${i.target_id}`,children:[n.jsx("span",{className:"sr-only",children:"Close"}),n.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[n.jsx("path",{d:"M18 6 6 18"}),n.jsx("path",{d:"m6 6 12 12"})]})]})]}),n.jsxs("div",{className:"p-4 overflow-y-auto",children:[n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Open Link"}),n.jsx("a",{href:i.url,target:"_blank",className:"text-blue-500",children:"Open"})]}),n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Media"}),n.jsx("p",{children:i.username})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Date"}),n.jsx("p",{children:i.date})]}),n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Sentiment"}),i.sentiment=="positive"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}),i.sentiment=="negative"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}),i.sentiment=="neutral"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",children:"Neutral"})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{children:"PR Value"}),n.jsx("p",{children:i.pr_value})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Ad Value"}),n.jsx("p",{children:i.ad_value})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Viewership"}),n.jsx("p",{children:i.viewership})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{children:"Reporters"}),n.jsx("p",{children:i.journalist})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Spoke Person"}),n.jsx("p",{children:i.spookerperson})]})]}),n.jsx("div",{className:"text-center mt-2",children:n.jsx("img",{src:i.images,alt:i.title,className:"max-h-[250px] mx-auto"})}),n.jsx("p",{className:"mt-2 text-gray-800 dark:text-neutral-400",children:i.content})]})]})})})]})]},u))]})]})}),n.jsx("div",{className:"py-6",children:n.jsxs("nav",{className:"flex items-center gap-x-1","aria-label":"Pagination",children:[t.news.links[0]&&n.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Previous",disabled:t.news.links[0].url==null,onClick:i=>{r.get()>0&&(r.set(r.get()-1),d())},children:[n.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:n.jsx("path",{d:"m15 18-6-6 6-6"})}),n.jsx("span",{children:"Previous"})]}),n.jsx("div",{className:"flex items-center gap-x-1",children:t.news.links.slice(1,-1).map((i,u)=>i.active?n.jsx("button",{type:"button",onClick:b=>{r.set(i.label),d()},className:"min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none","aria-current":"page",children:i.label},u):n.jsx("button",{type:"button",onClick:b=>{r.set(i.label),d()},className:"min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10",children:i.label},u))}),t.news.links.length>10&&t.news.links[t.news.links.length-1]&&n.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Next",onClick:i=>{r.set(u=>u+1),d()},disabled:t.news.links[t.news.links.length-1].url==null,children:[n.jsx("span",{children:"Next"}),n.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:n.jsx("path",{d:"m9 18 6-6-6-6"})})]})]})})]})})})})]})]})}export{ye as default};
