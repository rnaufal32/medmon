import{c as h,j as n,K as q,r as Q,S as X,L as Y}from"./app-C-oc15UG.js";import{A as Z,I as k}from"./AdminLayout-Bc57jSwc.js";import{d as O,D as B}from"./index.esm-s8FoCbEa.js";var ee={},$=function(r,e){return $=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,s){t.__proto__=s}||function(t,s){for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])},$(r,e)};function te(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");$(r,e);function t(){this.constructor=r}r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}var A=function(){return A=Object.assign||function(e){for(var t,s=1,i=arguments.length;s<i;s++){t=arguments[s];for(var l in t)Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l])}return e},A.apply(this,arguments)},re=Object.prototype.hasOwnProperty;function G(r,e){return r===e?r!==0||e!==0||1/r===1/e:r!==r&&e!==e}function ne(r,e){if(G(r,e))return!0;if(typeof r!="object"||r===null||typeof e!="object"||e===null)return!1;var t=Object.keys(r),s=Object.keys(e);if(t.length!==s.length)return!1;for(var i=0;i<t.length;i++)if(!re.call(e,t[i])||!G(r[t[i]],e[t[i]]))return!1;return!0}var m=Symbol("none"),se=Symbol("__state");function P(r,e){var t=Object(r)===r?r[I]:void 0;if(t)if(t.isMounted){var s=function(){var N=t.store,K=function(){return a({store:N,state:x,source:l.source})},x=new C(N,t.path,N.get(t.path),N.edition,K);return{store:N,state:x,source:r}},i=h.useState(s),l=i[0],a=i[1];if(l.store!==t.store||!("source"in l))throw new b(t.path,c.InitStateStoreSwitchover);Object.defineProperty(l,"store",{enumerable:!1}),Object.defineProperty(l,"state",{enumerable:!1}),Object.defineProperty(l,"source",{enumerable:!1}),l.state.reconstruct(t.path,l.store.get(t.path),l.store.edition,l.source!==r),l.source=r,t.subscribe(l.state),z(function(){return l.state.onMount(),t.subscribe(l.state),function(){l.state.onUnmount(),t.unsubscribe(l.state)}},[]);var o=l.state.self();return l["[hookstate(scoped)]"]=o,o}else{var s=function(){var x=t.store,L=function(){return y({store:x,state:_,source:d.source})},_=new C(x,p,x.get(p),x.edition,L);return{store:x,state:_,source:r}},u=h.useState(s),d=u[0],y=u[1];if(d.store!==t.store||!("source"in d))throw new b(t.path,c.InitStateStoreSwitchover);Object.defineProperty(d,"store",{enumerable:!1}),Object.defineProperty(d,"state",{enumerable:!1}),Object.defineProperty(d,"source",{enumerable:!1}),d.state.reconstruct(p,d.store.get(p),d.store.edition,d.source!==r),d.source=r,d.store.subscribe(d.state),z(function(){return d.state.onMount(),d.store.subscribe(d.state),function(){d.state.onUnmount(),d.store.unsubscribe(d.state)}},[]);for(var o=d.state.self(),g=0;g<t.path.length;g+=1)o=o.nested(t.path[g]);return d["[hookstate(global)]"]=o,o}else{var s=function(){var x=oe(r),L=function(){return v({store:x,state:_})},_=new C(x,p,x.get(p),x.edition,L);return{store:x,state:_}},w=h.useState(s),f=w[0],v=w[1];if("source"in f)throw new b(p,c.InitStateStoreSwitchover);Object.defineProperty(f,"store",{enumerable:!1}),Object.defineProperty(f,"state",{enumerable:!1}),f.state.reconstruct(p,f.store.get(p),f.store.edition,!1),f.store.subscribe(f.state),f.store.activate(e),z(function(){return f.state.onMount(),f.store.subscribe(f.state),f.store.activate(e),function(){f.state.onUnmount(),f.store.unsubscribe(f.state),f.store.deactivate()}},[]);var o=f.state.self();return f["[hookstate(local)]"]=o,o}}var I=Symbol("self"),c;(function(r){r[r.StateUsedInDependencyList=100]="StateUsedInDependencyList",r[r.InitStateToValueFromState=101]="InitStateToValueFromState",r[r.SetStateToValueFromState=102]="SetStateToValueFromState",r[r.GetStateWhenPromised=103]="GetStateWhenPromised",r[r.SetStateWhenPromised=104]="SetStateWhenPromised",r[r.SetStateNestedToPromised=105]="SetStateNestedToPromised",r[r.SetStateWhenDestroyed=106]="SetStateWhenDestroyed",r[r.ToJson_Value=108]="ToJson_Value",r[r.ToJson_State=109]="ToJson_State",r[r.GetProperty_Function=110]="GetProperty_Function",r[r.InitStateStoreSwitchover=111]="InitStateStoreSwitchover",r[r.GetUnknownPlugin=120]="GetUnknownPlugin",r[r.SetProperty_State=201]="SetProperty_State",r[r.SetProperty_Value=202]="SetProperty_Value",r[r.SetPrototypeOf_State=203]="SetPrototypeOf_State",r[r.SetPrototypeOf_Value=204]="SetPrototypeOf_Value",r[r.PreventExtensions_State=205]="PreventExtensions_State",r[r.PreventExtensions_Value=206]="PreventExtensions_Value",r[r.DefineProperty_State=207]="DefineProperty_State",r[r.DefineProperty_Value=208]="DefineProperty_Value",r[r.DeleteProperty_State=209]="DeleteProperty_State",r[r.DeleteProperty_Value=210]="DeleteProperty_Value",r[r.Construct_State=211]="Construct_State",r[r.Construct_Value=212]="Construct_Value",r[r.Apply_State=213]="Apply_State",r[r.Apply_Value=214]="Apply_Value"})(c||(c={}));var b=function(r){te(e,r);function e(t,s,i){return r.call(this,"Error: HOOKSTATE-".concat(s," [path: /").concat(t.join("/")).concat(i?", details: ".concat(i):"","]. ")+"See https://hookstate.js.org/docs/exceptions#hookstate-".concat(s))||this}return e}(Error),U=Symbol("ProxyMarker"),p=[],ie=function(){function r(e){var t=this;this._value=e,this.edition=1,this._subscribers=new Set,Object(e)===e&&R.promiseDetector(e)?this.setPromised(e):e===m&&this.setPromised(void 0);var s=function(){t._stateMethods.reconstruct(p,t.get(p),t.edition,!1)};s[D]=!0,this._stateMethods=new C(this,p,this.get(p),this.edition,s),this.subscribe(this._stateMethods)}return r.prototype.setPromised=function(e){var t=this;if(this._value=m,this._promiseError=void 0,this._promiseResolver=void 0,!e){this._promise=new Promise(function(s){t._promiseResolver=s});return}e=e.then(function(s){t._promise===e&&(t._promise=void 0,t._promiseError=void 0,t._promiseResolver,t.update(t._stateMethods.self(),t.set(p,s)))}).catch(function(s){if(t._promise===e){t._promise=void 0,t._promiseResolver=void 0,t._promiseError=s,t.edition+=1;var i={path:p};t.update(t._stateMethods.self(),i)}}),this._promise=e},r.prototype.activate=function(e){var t,s,i,l;this.edition<0&&(this.edition=-this.edition),this._extension===void 0&&(this._extension=e==null?void 0:e(),this._extensionMethods=(s=(t=this._extension)===null||t===void 0?void 0:t.onCreate)===null||s===void 0?void 0:s.call(t,this._stateMethods.self(),{}),(l=(i=this._extension)===null||i===void 0?void 0:i.onInit)===null||l===void 0||l.call(i,this._stateMethods.self(),this._extensionMethods||{}))},r.prototype.deactivate=function(){var e,t;this._extension&&((t=(e=this._extension).onDestroy)===null||t===void 0||t.call(e,this._stateMethods.self()),delete this._extension,delete this._extensionMethods),this.edition>0&&(this.edition=-this.edition)},Object.defineProperty(r.prototype,"extension",{get:function(){return this._extensionMethods},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"promise",{get:function(){return this._promise},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"promiseError",{get:function(){return this._promiseError},enumerable:!1,configurable:!0}),r.prototype.get=function(e){var t=this._value;return t===m||e.forEach(function(s){t=t[s]}),t},r.prototype.set=function(e,t){var s,i;if(this.edition<0)throw new b(e,c.SetStateWhenDestroyed);if(e.length===0){if(t===m)this.setPromised(void 0);else if(Object(t)===t&&R.promiseDetector(t))this.setPromised(t),t=m;else{if(this._promise&&!this._promiseResolver)throw new b(e,c.SetStateWhenPromised);this._promiseError=void 0}var l=this._value;if(this._value=t,this.afterSet(),l===m&&this._value!==m&&this._promiseResolver){this._promise=void 0,this._promiseError=void 0;var a=this._promiseResolver;this._promiseResolver,a(this._value)}return{path:e}}if(Object(t)===t&&R.promiseDetector(t))throw new b(e,c.SetStateNestedToPromised);for(var o=this._value,u=0;u<e.length-1;u+=1)o=o[e[u]];var d=e[e.length-1];return d in o?t!==m?(o[d]=t,this.afterSet(),{path:e}):(Array.isArray(o)&&typeof d=="number"?o.splice(d,1):delete o[d],this.afterSet(),{path:e.slice(0,-1),actions:(s={},s[d]="D",s)}):t!==m?(o[d]=t,this.afterSet(),{path:e.slice(0,-1),actions:(i={},i[d]="I",i)}):{path:e}},r.prototype.preset=function(e,t){var s,i;(i=(s=this._extension)===null||s===void 0?void 0:s.onPreset)===null||i===void 0||i.call(s,e,t,this._stateMethods.self())},r.prototype.premerge=function(e,t){var s,i;(i=(s=this._extension)===null||s===void 0?void 0:s.onPremerge)===null||i===void 0||i.call(s,e,t,this._stateMethods.self())},r.prototype.update=function(e,t){var s=this,i,l;(l=(i=this._extension)===null||i===void 0?void 0:i.onSet)===null||l===void 0||l.call(i,e,t,this._stateMethods.self());var a=new Set;t.actions&&Object.values(t.actions).findIndex(function(o){return o!=="U"})===-1?Object.keys(t.actions).forEach(function(o){s._subscribers.forEach(function(u){return u.onSet({path:t.path.concat(o)},a)})}):this._subscribers.forEach(function(o){return o.onSet(t,a)}),a.forEach(function(o){return o()})},r.prototype.afterSet=function(){this.edition>0&&(this.edition+=1),this.edition<0&&(this.edition-=1)},r.prototype.toMethods=function(){return this._stateMethods},r.prototype.subscribe=function(e){this._subscribers.add(e)},r.prototype.unsubscribe=function(e){this._subscribers.delete(e)},r.prototype.toJSON=function(){throw new b(p,c.ToJson_Value)},r}(),j=Symbol("UnusedValue"),D=Symbol("IsUnmounted"),C=function(){function r(e,t,s,i,l){this.store=e,this.path=t,this.valueSource=s,this.valueEdition=i,this.onSetUsed=l,this.valueUsed=j}return Object.defineProperty(r.prototype,se,{get:function(){return[this.get(),this.self()]},enumerable:!1,configurable:!0}),r.prototype.reconstruct=function(e,t,s,i){this.path=e,this.valueSource=t,this.valueEdition=s,this.valueUsed=j,i?(delete this.selfUsed,delete this.childrenCreated,delete this.childrenUsedPrevious):(this.valueUsedNoProxyPrevious=this.valueUsedNoProxy,this.childrenUsedPrevious=this.childrenUsed),delete this.valueUsedNoProxy,delete this.childrenUsed},r.prototype.reconnect=function(){this.get({__internalAllowPromised:!0,noproxy:this.valueUsedNoProxyPrevious}),this.childrenUsed=A(A({},this.childrenUsedPrevious),this.childrenUsed)},r.prototype.getUntracked=function(e){if(this.valueEdition!==this.store.edition&&(this.valueSource=this.store.get(this.path),this.valueEdition=this.store.edition,this.valueUsed!==j&&(this.valueUsed=j,this.get({__internalAllowPromised:!0}))),e)return this.valueSource;if(this.store.promiseError)throw this.store.promiseError;if(this.store.promise)throw new b(this.path,c.GetStateWhenPromised);return this.valueSource},r.prototype.get=function(e){var t,s=this.getUntracked(e==null?void 0:e.__internalAllowPromised);return e!=null&&e.stealth?s:(this.valueUsed===j&&(Array.isArray(s)?this.valueUsed=this.valueArrayImpl(s):Object(s)===s?((t=s.constructor)===null||t===void 0?void 0:t.name)==="Object"?this.valueUsed=this.valueObjectImpl(s):(this.valueUsedNoProxy=!0,this.valueUsed=s):this.valueUsed=s),e!=null&&e.noproxy?(this.valueUsedNoProxy=!0,s):this.valueUsed)},Object.defineProperty(r.prototype,"value",{get:function(){return this.get()},enumerable:!1,configurable:!0}),r.prototype.setUntrackedV4=function(e){if(typeof e=="function"&&(e=e(this.getUntracked())),this.store.preset(this.self(),e),Object(e)===e&&e[U])throw new b(this.path,c.SetStateToValueFromState);return e!==Object(e)&&e===this.getUntracked(!0)?null:this.store.set(this.path,e)},r.prototype.set=function(e){var t=this.setUntrackedV4(e);t&&this.store.update(this.self(),t)},r.prototype.mergeUntracked=function(e){var t=this.mergeUntrackedV4(e);return t?[t.path]:[]},r.prototype.mergeUntrackedV4=function(e){var t=this.getUntracked();if(typeof e=="function"&&(e=e(t)),this.store.premerge(this.self(),e),Array.isArray(t))if(Array.isArray(e)){var s={path:this.path,actions:{}};return e.forEach(function(o,u){s.actions[t.push(o)-1]="I"}),Object.keys(s.actions).length>0?(this.setUntrackedV4(t),s):null}else{var i={path:this.path,actions:{}},l=[];return Object.keys(e).map(function(o){return Number(o)}).sort(function(o,u){return o-u}).forEach(function(o){var u=Number(o),d=e[u];d===m?(i.actions[u]="D",l.push(u)):(u in t?i.actions[u]="U":i.actions[u]="I",t[u]=d)}),l.reverse().forEach(function(o){t.splice(o,1)}),Object.keys(i.actions).length>0?(this.setUntrackedV4(t),i):null}else if(Object(t)===t){var a={path:this.path,actions:{}};return Object.keys(e).forEach(function(o){var u=e[o];u===m?(a.actions[o]="D",delete t[o]):(o in t?a.actions[o]="U":a.actions[o]="I",t[o]=u)}),Object.keys(a.actions).length>0?(this.setUntrackedV4(t),a):null}else return typeof t=="string"?this.setUntrackedV4(t+String(e)):this.setUntrackedV4(e)},r.prototype.merge=function(e){var t=this.mergeUntrackedV4(e);t&&this.store.update(this.self(),t)},r.prototype.nested=function(e){return this.child(e).self()},r.prototype.rerender=function(e){for(var t=0,s=e;t<s.length;t++){var i=s[t];this.store.update(this.self(),{path:i})}},r.prototype.activate=function(e){this.store.activate(e)},r.prototype.deactivate=function(){this.store.deactivate()},r.prototype.subscribe=function(e){this.subscribers===void 0&&(this.subscribers=new Set),this.subscribers.add(e)},r.prototype.unsubscribe=function(e){this.subscribers&&this.subscribers.delete(e)},Object.defineProperty(r.prototype,"isMounted",{get:function(){return!this.onSetUsed[D]},enumerable:!1,configurable:!0}),r.prototype.onMount=function(){delete this.onSetUsed[D]},r.prototype.onUnmount=function(){this.onSetUsed[D]=!0},r.prototype.onSet=function(e,t){var s=this,i=function(){var a,o=!1;s.valueUsedNoProxy&&s.valueUsed!==j&&(t.add(s.onSetUsed),delete s.selfUsed,o=!0);var u=e.path,d=u[s.path.length];if(d===void 0){if(s.valueUsed!==j){if(t.add(s.onSetUsed),delete s.selfUsed,delete s.childrenUsed,e.actions&&s.childrenCreated)if(Array.isArray(s.valueSource)&&Object.values(e.actions).includes("D")){var y=Object.keys(e.actions).map(function(f){return Number(f)}).sort(function(f,v){return f-v}).find(function(f){var v;return((v=e.actions)===null||v===void 0?void 0:v[f])==="D"});for(var g in s.childrenCreated)(Number(g)>=y||g in e.actions)&&delete s.childrenCreated[g]}else for(var g in e.actions)delete s.childrenCreated[g];else delete s.childrenCreated;return!0}}else{var w=(a=s.childrenUsed)===null||a===void 0?void 0:a[d];if(w&&w.onSet(e,t))return delete s.selfUsed,!0}return o},l=i();return!l&&this.subscribers!==void 0&&this.subscribers.forEach(function(a){a.onSet(e,t)&&delete s.selfUsed}),l},Object.defineProperty(r.prototype,"keys",{get:function(){var e=this.get();if(Array.isArray(e))return Object.keys(e).map(function(t){return Number(t)}).filter(function(t){return Number.isInteger(t)});if(Object(e)===e)return Object.keys(e)},enumerable:!1,configurable:!0}),r.prototype.child=function(e){this.childrenUsed=this.childrenUsed||{};var t=this.childrenUsed.hasOwnProperty(e)&&this.childrenUsed[e];if(t)return t;var s=this.valueSource[e];if(typeof s=="function")throw new b(this.path,c.GetProperty_Function);this.childrenCreated=this.childrenCreated||{};var i=this.childrenCreated[e],l;return i?(i.reconstruct(this.path.concat(e),s,this.valueEdition,!1),l=i):(l=new r(this.store,this.path.concat(e),s,this.valueEdition,this.onSetUsed),this.childrenCreated[e]=l),this.valueUsedNoProxy&&(l.valueUsedNoProxy=!0),this.childrenUsed[e]=l,l},r.prototype.valueArrayImpl=function(e){var t=this;return V(this.path,e,function(){return e},function(s,i){if(i==="length")return s.length;if(i in Array.prototype)return Array.prototype[i];if(i===U)return t;if(typeof i=="symbol")return s[i];var l=Number(i);if(Number.isInteger(l))return t.child(l).get()},function(s,i,l){if(typeof i=="symbol")return s[i]=l,!0;throw new b(t.path,c.SetProperty_Value)},!0)},r.prototype.valueObjectImpl=function(e){var t=this;return V(this.path,e,function(){return e},function(s,i){return i in Object.prototype?Object.prototype[i]:i===U?t:typeof i=="symbol"?s[i]:t.child(i).get()},function(s,i,l){if(typeof i=="symbol")return s[i]=l,!0;throw new b(t.path,c.SetProperty_Value)},!0)},r.prototype.self=function(){var e=this;if(this.selfUsed)return this.selfUsed;var t=function(s,i){if(i===I)return e;if(typeof i!="symbol"){if(i==="toJSON")throw new b(e.path,c.ToJson_State);var l=function(o){var u=e.get({__internalAllowPromised:o==="$$typeof"||o==="constructor"});if(o in Object.prototype)return Object.prototype[o];if(!(Object(u)!==u&&u!==m)){if(Array.isArray(u)){if(o==="length")return u.length;if(o in Array.prototype)return Array.prototype[o];var d=Number(o);return Number.isInteger(d)?e.nested(d):void 0}return e.nested(o.toString())}};switch(i){case"path":return e.path;case"keys":return e.keys;case"value":return e.value;case"ornull":return e.ornull;case"promised":return e.promised;case"promise":return e.promise;case"error":return e.error;case"get":return function(o){return e.get(o)};case"set":return function(o){return e.set(o)};case"merge":return function(o){return e.merge(o)};case"nested":return function(o){return l(o)};default:var a=e.store.extension;return a&&i in a?a[i](e.self()):l(i)}}};return this.selfUsed=V(this.path,this.valueSource,function(s){return e.get({__internalAllowPromised:!0,stealth:s==null?void 0:s.stealth})},t,function(s,i,l){throw new b(e.path,c.SetProperty_State)},!1),this.selfUsed},Object.defineProperty(r.prototype,"promised",{get:function(){return this.get({__internalAllowPromised:!0}),!!this.store.promise},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"promise",{get:function(){var e=this,t;return this.get({__internalAllowPromised:!0}),(t=this.store.promise)===null||t===void 0?void 0:t.then(function(s){return e.self()})},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"error",{get:function(){return this.get({__internalAllowPromised:!!this.store.promiseError}),this.store.promiseError},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"ornull",{get:function(){var e=this.get();return e==null?e:this.self()},enumerable:!1,configurable:!0}),r}();function V(r,e,t,s,i,l){var a=function(o){throw new b(r,o)};return Object(e)!==e&&(e={}),new Proxy(e,{getPrototypeOf:function(o){var u=t();return u==null?null:Object.getPrototypeOf(u===m?new Promise(function(){}):u)},setPrototypeOf:function(o,u){return a(l?c.SetPrototypeOf_State:c.SetPrototypeOf_Value)},isExtensible:function(o){return!0},preventExtensions:function(o){return a(l?c.PreventExtensions_State:c.PreventExtensions_Value)},getOwnPropertyDescriptor:function(o,u){var d=t();if(Object(d)===d){var y=Object.getOwnPropertyDescriptor(d,u);return Array.isArray(d)&&u in Array.prototype?y:y&&{configurable:!0,enumerable:y.enumerable,get:function(){return s(d,u)},set:void 0}}if(!(l||d===m)){if(u==="value")return{configurable:!0,enumerable:!0,get:function(){return t({stealth:!0})},set:void 0};if(u==="path")return{configurable:!0,enumerable:!0,get:function(){return r},set:void 0}}},has:function(o,u){if(typeof u=="symbol")return!1;var d=t();return Object(d)===d?u in d:l||d===m?!1:u==="value"||u==="path"},get:s,set:i,deleteProperty:function(o,u){return a(l?c.DeleteProperty_State:c.DeleteProperty_Value)},defineProperty:function(o,u,d){return a(l?c.DefineProperty_State:c.DefineProperty_Value)},ownKeys:function(o){var u=t();return Array.isArray(u)&&o.length===void 0&&Object.defineProperty(e,"length",{value:0,writable:!0,enumerable:!1,configurable:!1}),Object(u)===u?Object.getOwnPropertyNames(u):l||u===m?[]:["value","path"]},apply:function(o,u,d){return a(l?c.Apply_State:c.Apply_Value)},construct:function(o,u,d){return a(l?c.Construct_State:c.Construct_Value)}})}function oe(r){var e=r;if(typeof r=="function"&&(e=r()),Object(e)===e&&e[U])throw new b(p,c.InitStateToValueFromState);return new ie(e)}var R={interceptDependencyListsMode:"always",isDevelopmentMode:typeof process=="object"&&typeof ee=="object"&&!1,promiseDetector:function(r){return Promise.resolve(r)===r},hiddenInterceptDependencyListsModeDebug:!1};function S(r,e){for(var t=0,s=r||[];t<s.length;t++){var i=s[t];if(i===Object(i)){var l=i[I];l&&l.reconnect()}}return r}var M;function ae(r,e){return S(e),M(r,e)}var T;function le(r,e){return S(e),T(r,e)}var E;function ue(r,e){return S(e),E(r,e)}var W;function de(r,e,t){return S(t),W(r,e,t)}var J;function ce(r,e){return S(e),J(r,e)}var F;function fe(r,e){return S(e),F(r,e)}var H;function he(r,e){return H(r,function(t,s){return S(Object.keys(s).map(function(i){return s[i]})),(e||ne)(t,s)})}function pe(){!M&&h.useEffect&&(M=h.useEffect,h.useEffect=ae),!T&&h.useLayoutEffect&&(T=h.useLayoutEffect,h.useLayoutEffect=le),!E&&h.useInsertionEffect&&(E=h.useInsertionEffect,h.useInsertionEffect=ue),!W&&h.useImperativeHandle&&(W=h.useImperativeHandle,h.useImperativeHandle=de),!J&&h.useMemo&&(J=h.useMemo,h.useMemo=ce),!F&&h.useCallback&&(F=h.useCallback,h.useCallback=fe),!H&&h.memo&&(H=h.memo,h.memo=he)}pe();var z=typeof window<"u"?T:M;function me(r){return n.jsx("div",{id:r.id,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":`${r.id}-label`,children:n.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:n.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[n.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[r.title&&n.jsx("h3",{id:`${r.id}-label`,className:"font-bold text-gray-800 dark:text-white",children:r.title}),n.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#${r.id}`,children:[n.jsx("span",{className:"sr-only",children:"Close"}),n.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[n.jsx("path",{d:"M18 6 6 18"}),n.jsx("path",{d:"m6 6 12 12"})]})]})]}),n.jsx("div",{className:"p-4 overflow-y-auto",children:r.children}),r.footer&&n.jsx("div",{className:"flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700",children:r.footer})]})})})}const be=r=>{const e=P({user:""});return n.jsxs("div",{className:"grid grid-cols-2 gap-5",children:[n.jsx("div",{className:"w-full space-y-3",children:n.jsx("input",{type:"text",className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",placeholder:"Search News"})}),n.jsxs("div",{className:"flex flex-row gap-5",children:[n.jsxs("button",{type:"button","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"hs-basic-modal","data-hs-overlay":"#modal-import",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(k,{icon:"solar:upload-minimalistic-broken",height:22,width:22}),"Import"]}),n.jsx(me,{id:"modal-import",title:"Import News",children:n.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[n.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[n.jsxs("select",{value:e.user.get(),onChange:t=>e.user.set(t.target.value),className:"py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx("option",{selected:!0,children:"Select User"}),r.users.map((t,s)=>n.jsx("option",{value:t.id,children:t.name},s))]}),n.jsx("div",{children:n.jsx("a",{href:`${route("news.import-sample",{_query:{user:e.user.get()}})}`,target:"_blank",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:"Download Sample"})})]}),n.jsx("div",{children:n.jsx("div",{className:"max-w-sm",children:n.jsxs("label",{className:"block",children:[n.jsx("span",{className:"sr-only",children:"Choose profile photo"}),n.jsx("input",{type:"file",className:"block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none "})]})})}),n.jsx("div",{children:n.jsx("button",{type:"button",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:"Submit"})})]})}),n.jsxs("button",{type:"button",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(k,{icon:"solar:download-minimalistic-broken",height:22,width:22}),"Export"]}),n.jsxs("button",{type:"button",className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none",children:[n.jsx(k,{icon:"prime:sync",height:22,width:22}),"Crawling"]})]})]})};function ve(r){q();const e=P(""),t=P(1),s=P(""),i=P({startDate:O().subtract(7,"days").toDate(),endDate:O().toDate()}),l=Q.useCallback(()=>{X.get(route("news.index"),{page:t.get(),user:e.get(),search:s.get(),dateStart:i.startDate.get(),dateEnd:i.endDate.get()},{only:["news"],preserveScroll:!0,preserveState:!0})},[e,i]);return n.jsxs(Z,{children:[n.jsx(Y,{title:"News"}),n.jsxs("div",{className:"grid grid-cols-1 gap-5 max-h-[",children:[n.jsxs("p",{className:"text-xl font-bold",children:["News ",JSON.stringify(r.last_update)]}),n.jsxs("div",{className:"flex flex-row gap-5",children:[n.jsx("div",{className:"w-full",children:n.jsxs("select",{"data-hs-select":`{
                        "placeholder": "Select User",
                        "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50"
                        }`,className:"hidden",value:e.get(),onChange:a=>{e.set(a.target.value),l()},children:[n.jsx("option",{value:"",disabled:!0,children:"Select User"}),r.users.map((a,o)=>n.jsx("option",{value:a.id,children:a.name},o))]})}),n.jsx("div",{className:"w-full",children:n.jsx(B,{primaryColor:"blue",value:i.get(),onChange:a=>{a!=null&&(i.set({startDate:O(a.startDate).toDate(),endDate:O(a.endDate).toDate()}),l())}})})]}),n.jsx(be,{users:r.users}),n.jsx("div",{className:"flex flex-col",children:n.jsx("div",{className:"-m-1.5 overflow-x-auto",children:n.jsx("div",{className:"p-1.5 min-w-full inline-block align-middle",children:n.jsxs("div",{className:"border rounded-lg divide-y divide-gray-200",children:[n.jsx("div",{className:"overflow-hidden",children:n.jsxs("table",{className:"min-w-full divide-y divide-gray-200",children:[n.jsx("thead",{className:"bg-gray-50",children:n.jsxs("tr",{children:[n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"User"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase max-w-[100px]",children:"Target"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Date"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Title"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Sentiment"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Spokesperson"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Journalist"}),n.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Action"})]})}),n.jsxs("tbody",{className:"divide-y divide-gray-200",children:[r.news.data.length===0&&n.jsx("tr",{className:"text-center",children:n.jsx("td",{colSpan:8,height:100,children:"Empty"})}),r.news.data.map((a,o)=>n.jsxs("tr",{children:[n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.username}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 max-w-[100px]",children:a.target}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.date}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.title}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.sentiment}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.spookerperson}),n.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:a.spookerperson}),n.jsxs("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 flex flex-row gap-2",children:[n.jsx("a",{href:a.url,target:"_blank",className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:n.jsx(k,{icon:"fluent:open-12-regular",width:20,height:20})}),n.jsx("button",{"aria-controls":`media-detail-${a.id}-${a.target_id}`,"data-hs-overlay":`#media-detail-${a.id}-${a.target_id}`,className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:n.jsx(k,{icon:"solar:document-broken",width:20,height:20})}),n.jsx("div",{id:`media-detail-${a.id}-${a.target_id}`,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":"hs-large-modal-label",children:n.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:n.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[n.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[n.jsx("h3",{id:"hs-large-modal-label",className:"font-bold text-gray-800 dark:text-white",children:a.title}),n.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#media-detail-${a.id}-${a.target_id}`,children:[n.jsx("span",{className:"sr-only",children:"Close"}),n.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[n.jsx("path",{d:"M18 6 6 18"}),n.jsx("path",{d:"m6 6 12 12"})]})]})]}),n.jsxs("div",{className:"p-4 overflow-y-auto",children:[n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Open Link"}),n.jsx("a",{href:a.url,target:"_blank",className:"text-blue-500",children:"Open"})]}),n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Media"}),n.jsx("p",{children:a.username})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Date"}),n.jsx("p",{children:a.date})]}),n.jsxs("div",{children:[n.jsx("p",{className:"font-bold",children:"Sentiment"}),a.sentiment=="positive"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}),a.sentiment=="negative"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}),a.sentiment=="neutral"&&n.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",children:"Neutral"})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{children:"PR Value"}),n.jsx("p",{children:a.pr_value})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Ad Value"}),n.jsx("p",{children:a.ad_value})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Viewership"}),n.jsx("p",{children:a.viewership})]})]}),n.jsx("hr",{}),n.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[n.jsxs("div",{children:[n.jsx("p",{children:"Reporters"}),n.jsx("p",{children:a.journalist})]}),n.jsxs("div",{children:[n.jsx("p",{children:"Spoke Person"}),n.jsx("p",{children:a.spookerperson})]})]}),n.jsx("div",{className:"text-center mt-2",children:n.jsx("img",{src:a.images,alt:a.title,className:"max-h-[250px] mx-auto"})}),n.jsx("p",{className:"mt-2 text-gray-800 dark:text-neutral-400",children:a.content})]})]})})})]})]},o))]})]})}),n.jsx("div",{className:"py-6",children:n.jsxs("nav",{className:"flex items-center gap-x-1","aria-label":"Pagination",children:[r.news.links[0]&&n.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Previous",disabled:r.news.links[0].url==null,onClick:a=>{t.get()>0&&(t.set(t.get()-1),l())},children:[n.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:n.jsx("path",{d:"m15 18-6-6 6-6"})}),n.jsx("span",{children:"Previous"})]}),n.jsx("div",{className:"flex items-center gap-x-1",children:r.news.links.slice(1,-1).map((a,o)=>a.active?n.jsx("button",{type:"button",onClick:u=>{t.set(a.label),l()},className:"min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none","aria-current":"page",children:a.label},o):n.jsx("button",{type:"button",onClick:u=>{t.set(a.label),l()},className:"min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10",children:a.label},o))}),r.news.links.length>10&&r.news.links[r.news.links.length-1]&&n.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Next",onClick:a=>{t.set(o=>o+1),l()},disabled:r.news.links[r.news.links.length-1].url==null,children:[n.jsx("span",{children:"Next"}),n.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:n.jsx("path",{d:"m9 18 6-6-6-6"})})]})]})})]})})})})]})]})}export{ve as default};
