var Fe=Object.defineProperty;var ze=(e,n,t)=>n in e?Fe(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t;var v=(e,n,t)=>ze(e,typeof n!="symbol"?n+"":n,t);import{R as se,K as Ce,j as a}from"./app-BFJ94WeA.js";/**
* (c) Iconify
*
* For the full copyright and license information, please view the license.txt
* files at https://github.com/iconify/iconify
*
* Licensed under MIT.
*
* @license MIT
* @version 2.3.0
*/const we=Object.freeze({left:0,top:0,width:16,height:16}),V=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),T=Object.freeze({...we,...V}),W=Object.freeze({...T,body:"",hidden:!1}),De=Object.freeze({width:null,height:null}),ve=Object.freeze({...De,...V});function $e(e,n=0){const t=e.replace(/^-?[0-9.]*/,"");function i(s){for(;s<0;)s+=4;return s%4}if(t===""){const s=parseInt(e);return isNaN(s)?0:i(s)}else if(t!==e){let s=0;switch(t){case"%":s=25;break;case"deg":s=90}if(s){let r=parseFloat(e.slice(0,e.length-t.length));return isNaN(r)?0:(r=r/s,r%1===0?i(r):0)}}return n}const Qe=/[\s,]+/;function qe(e,n){n.split(Qe).forEach(t=>{switch(t.trim()){case"horizontal":e.hFlip=!0;break;case"vertical":e.vFlip=!0;break}})}const je={...ve,preserveAspectRatio:""};function ie(e){const n={...je},t=(i,s)=>e.getAttribute(i)||s;return n.width=t("width",null),n.height=t("height",null),n.rotate=$e(t("rotate","")),qe(n,t("flip","")),n.preserveAspectRatio=t("preserveAspectRatio",t("preserveaspectratio","")),n}function Be(e,n){for(const t in je)if(e[t]!==n[t])return!0;return!1}const ke=/^[a-z0-9]+(-[a-z0-9]+)*$/,O=(e,n,t,i="")=>{const s=e.split(":");if(e.slice(0,1)==="@"){if(s.length<2||s.length>3)return null;i=s.shift().slice(1)}if(s.length>3||!s.length)return null;if(s.length>1){const l=s.pop(),c=s.pop(),u={provider:s.length>0?s[0]:i,prefix:c,name:l};return n&&!E(u)?null:u}const r=s[0],o=r.split("-");if(o.length>1){const l={provider:i,prefix:o.shift(),name:o.join("-")};return n&&!E(l)?null:l}if(t&&i===""){const l={provider:i,prefix:"",name:r};return n&&!E(l,t)?null:l}return null},E=(e,n)=>e?!!((n&&e.prefix===""||e.prefix)&&e.name):!1;function Ue(e,n){const t={};!e.hFlip!=!n.hFlip&&(t.hFlip=!0),!e.vFlip!=!n.vFlip&&(t.vFlip=!0);const i=((e.rotate||0)+(n.rotate||0))%4;return i&&(t.rotate=i),t}function re(e,n){const t=Ue(e,n);for(const i in W)i in V?i in e&&!(i in t)&&(t[i]=V[i]):i in n?t[i]=n[i]:i in e&&(t[i]=e[i]);return t}function We(e,n){const t=e.icons,i=e.aliases||Object.create(null),s=Object.create(null);function r(o){if(t[o])return s[o]=[];if(!(o in s)){s[o]=null;const l=i[o]&&i[o].parent,c=l&&r(l);c&&(s[o]=[l].concat(c))}return s[o]}return Object.keys(t).concat(Object.keys(i)).forEach(r),s}function Ze(e,n,t){const i=e.icons,s=e.aliases||Object.create(null);let r={};function o(l){r=re(i[l]||s[l],r)}return o(n),t.forEach(o),re(e,r)}function Ie(e,n){const t=[];if(typeof e!="object"||typeof e.icons!="object")return t;e.not_found instanceof Array&&e.not_found.forEach(s=>{n(s,null),t.push(s)});const i=We(e);for(const s in i){const r=i[s];r&&(n(s,Ze(e,s,r)),t.push(s))}return t}const Ge={provider:"",aliases:{},not_found:{},...we};function q(e,n){for(const t in n)if(t in e&&typeof e[t]!=typeof n[t])return!1;return!0}function Ne(e){if(typeof e!="object"||e===null)return null;const n=e;if(typeof n.prefix!="string"||!e.icons||typeof e.icons!="object"||!q(e,Ge))return null;const t=n.icons;for(const s in t){const r=t[s];if(!s||typeof r.body!="string"||!q(r,W))return null}const i=n.aliases||Object.create(null);for(const s in i){const r=i[s],o=r.parent;if(!s||typeof o!="string"||!t[o]&&!i[o]||!q(r,W))return null}return n}const H=Object.create(null);function Je(e,n){return{provider:e,prefix:n,icons:Object.create(null),missing:new Set}}function w(e,n){const t=H[e]||(H[e]=Object.create(null));return t[n]||(t[n]=Je(e,n))}function _e(e,n){return Ne(n)?Ie(n,(t,i)=>{i?e.icons[t]=i:e.missing.add(t)}):[]}function Ke(e,n,t){try{if(typeof t.body=="string")return e.icons[n]={...t},!0}catch{}return!1}function Xe(e,n){let t=[];return(typeof e=="string"?[e]:Object.keys(H)).forEach(s=>{(typeof s=="string"&&typeof n=="string"?[n]:Object.keys(H[s]||{})).forEach(o=>{const l=w(s,o);t=t.concat(Object.keys(l.icons).map(c=>(s!==""?"@"+s+":":"")+o+":"+c))})}),t}let L=!1;function Ae(e){return typeof e=="boolean"&&(L=e),L}function P(e){const n=typeof e=="string"?O(e,!0,L):e;if(n){const t=w(n.provider,n.prefix),i=n.name;return t.icons[i]||(t.missing.has(i)?null:void 0)}}function Se(e,n){const t=O(e,!0,L);if(!t)return!1;const i=w(t.provider,t.prefix);return n?Ke(i,t.name,n):(i.missing.add(t.name),!0)}function oe(e,n){if(typeof e!="object")return!1;if(typeof n!="string"&&(n=e.provider||""),L&&!n&&!e.prefix){let s=!1;return Ne(e)&&(e.prefix="",Ie(e,(r,o)=>{Se(r,o)&&(s=!0)})),s}const t=e.prefix;if(!E({provider:n,prefix:t,name:"a"}))return!1;const i=w(n,t);return!!_e(i,e)}function ce(e){return!!P(e)}function Ye(e){const n=P(e);return n&&{...T,...n}}function et(e){const n={loaded:[],missing:[],pending:[]},t=Object.create(null);e.sort((s,r)=>s.provider!==r.provider?s.provider.localeCompare(r.provider):s.prefix!==r.prefix?s.prefix.localeCompare(r.prefix):s.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return e.forEach(s=>{if(i.name===s.name&&i.prefix===s.prefix&&i.provider===s.provider)return;i=s;const r=s.provider,o=s.prefix,l=s.name,c=t[r]||(t[r]=Object.create(null)),u=c[o]||(c[o]=w(r,o));let f;l in u.icons?f=n.loaded:o===""||u.missing.has(l)?f=n.missing:f=n.pending;const d={provider:r,prefix:o,name:l};f.push(d)}),n}function Le(e,n){e.forEach(t=>{const i=t.loaderCallbacks;i&&(t.loaderCallbacks=i.filter(s=>s.id!==n))})}function tt(e){e.pendingCallbacksFlag||(e.pendingCallbacksFlag=!0,setTimeout(()=>{e.pendingCallbacksFlag=!1;const n=e.loaderCallbacks?e.loaderCallbacks.slice(0):[];if(!n.length)return;let t=!1;const i=e.provider,s=e.prefix;n.forEach(r=>{const o=r.icons,l=o.pending.length;o.pending=o.pending.filter(c=>{if(c.prefix!==s)return!0;const u=c.name;if(e.icons[u])o.loaded.push({provider:i,prefix:s,name:u});else if(e.missing.has(u))o.missing.push({provider:i,prefix:s,name:u});else return t=!0,!0;return!1}),o.pending.length!==l&&(t||Le([e],r.id),r.callback(o.loaded.slice(0),o.missing.slice(0),o.pending.slice(0),r.abort))})}))}let nt=0;function st(e,n,t){const i=nt++,s=Le.bind(null,t,i);if(!n.pending.length)return s;const r={id:i,icons:n,callback:e,abort:s};return t.forEach(o=>{(o.loaderCallbacks||(o.loaderCallbacks=[])).push(r)}),s}const Z=Object.create(null);function le(e,n){Z[e]=n}function G(e){return Z[e]||Z[""]}function it(e,n=!0,t=!1){const i=[];return e.forEach(s=>{const r=typeof s=="string"?O(s,n,t):s;r&&i.push(r)}),i}var rt={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function ot(e,n,t,i){const s=e.resources.length,r=e.random?Math.floor(Math.random()*s):e.index;let o;if(e.random){let p=e.resources.slice(0);for(o=[];p.length>1;){const b=Math.floor(Math.random()*p.length);o.push(p[b]),p=p.slice(0,b).concat(p.slice(b+1))}o=o.concat(p)}else o=e.resources.slice(r).concat(e.resources.slice(0,r));const l=Date.now();let c="pending",u=0,f,d=null,h=[],g=[];typeof i=="function"&&g.push(i);function y(){d&&(clearTimeout(d),d=null)}function j(){c==="pending"&&(c="aborted"),y(),h.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),h=[]}function m(p,b){b&&(g=[]),typeof p=="function"&&g.push(p)}function $(){return{startTime:l,payload:n,status:c,queriesSent:u,queriesPending:h.length,subscribe:m,abort:j}}function k(){c="failed",g.forEach(p=>{p(void 0,f)})}function C(){h.forEach(p=>{p.status==="pending"&&(p.status="aborted")}),h=[]}function x(p,b,N){const M=b!=="success";switch(h=h.filter(I=>I!==p),c){case"pending":break;case"failed":if(M||!e.dataAfterTimeout)return;break;default:return}if(b==="abort"){f=N,k();return}if(M){f=N,h.length||(o.length?Q():k());return}if(y(),C(),!e.random){const I=e.resources.indexOf(p.resource);I!==-1&&I!==e.index&&(e.index=I)}c="completed",g.forEach(I=>{I(N)})}function Q(){if(c!=="pending")return;y();const p=o.shift();if(p===void 0){if(h.length){d=setTimeout(()=>{y(),c==="pending"&&(C(),k())},e.timeout);return}k();return}const b={status:"pending",resource:p,callback:(N,M)=>{x(b,N,M)}};h.push(b),u++,d=setTimeout(Q,e.rotate),t(p,n,b.callback)}return setTimeout(Q),$}function Pe(e){const n={...rt,...e};let t=[];function i(){t=t.filter(l=>l().status==="pending")}function s(l,c,u){const f=ot(n,l,c,(d,h)=>{i(),u&&u(d,h)});return t.push(f),f}function r(l){return t.find(c=>l(c))||null}return{query:s,find:r,setIndex:l=>{n.index=l},getIndex:()=>n.index,cleanup:i}}function ee(e){let n;if(typeof e.resources=="string")n=[e.resources];else if(n=e.resources,!(n instanceof Array)||!n.length)return null;return{resources:n,path:e.path||"/",maxURL:e.maxURL||500,rotate:e.rotate||750,timeout:e.timeout||5e3,random:e.random===!0,index:e.index||0,dataAfterTimeout:e.dataAfterTimeout!==!1}}const z=Object.create(null),_=["https://api.simplesvg.com","https://api.unisvg.com"],R=[];for(;_.length>0;)_.length===1||Math.random()>.5?R.push(_.shift()):R.push(_.pop());z[""]=ee({resources:["https://api.iconify.design"].concat(R)});function ae(e,n){const t=ee(n);return t===null?!1:(z[e]=t,!0)}function D(e){return z[e]}function ct(){return Object.keys(z)}function ue(){}const B=Object.create(null);function lt(e){if(!B[e]){const n=D(e);if(!n)return;const t=Pe(n),i={config:n,redundancy:t};B[e]=i}return B[e]}function Te(e,n,t){let i,s;if(typeof e=="string"){const r=G(e);if(!r)return t(void 0,424),ue;s=r.send;const o=lt(e);o&&(i=o.redundancy)}else{const r=ee(e);if(r){i=Pe(r);const o=e.resources?e.resources[0]:"",l=G(o);l&&(s=l.send)}}return!i||!s?(t(void 0,424),ue):i.query(n,s,t)().abort}function fe(){}function at(e){e.iconsLoaderFlag||(e.iconsLoaderFlag=!0,setTimeout(()=>{e.iconsLoaderFlag=!1,tt(e)}))}function ut(e){const n=[],t=[];return e.forEach(i=>{(i.match(ke)?n:t).push(i)}),{valid:n,invalid:t}}function A(e,n,t){function i(){const s=e.pendingIcons;n.forEach(r=>{s&&s.delete(r),e.icons[r]||e.missing.add(r)})}if(t&&typeof t=="object")try{if(!_e(e,t).length){i();return}}catch(s){console.error(s)}i(),at(e)}function de(e,n){e instanceof Promise?e.then(t=>{n(t)}).catch(()=>{n(null)}):n(e)}function ft(e,n){e.iconsToLoad?e.iconsToLoad=e.iconsToLoad.concat(n).sort():e.iconsToLoad=n,e.iconsQueueFlag||(e.iconsQueueFlag=!0,setTimeout(()=>{e.iconsQueueFlag=!1;const{provider:t,prefix:i}=e,s=e.iconsToLoad;if(delete e.iconsToLoad,!s||!s.length)return;const r=e.loadIcon;if(e.loadIcons&&(s.length>1||!r)){de(e.loadIcons(s,i,t),f=>{A(e,s,f)});return}if(r){s.forEach(f=>{const d=r(f,i,t);de(d,h=>{const g=h?{prefix:i,icons:{[f]:h}}:null;A(e,[f],g)})});return}const{valid:o,invalid:l}=ut(s);if(l.length&&A(e,l,null),!o.length)return;const c=i.match(ke)?G(t):null;if(!c){A(e,o,null);return}c.prepare(t,i,o).forEach(f=>{Te(t,f,d=>{A(e,f.icons,d)})})}))}const te=(e,n)=>{const t=it(e,!0,Ae()),i=et(t);if(!i.pending.length){let c=!0;return n&&setTimeout(()=>{c&&n(i.loaded,i.missing,i.pending,fe)}),()=>{c=!1}}const s=Object.create(null),r=[];let o,l;return i.pending.forEach(c=>{const{provider:u,prefix:f}=c;if(f===l&&u===o)return;o=u,l=f,r.push(w(u,f));const d=s[u]||(s[u]=Object.create(null));d[f]||(d[f]=[])}),i.pending.forEach(c=>{const{provider:u,prefix:f,name:d}=c,h=w(u,f),g=h.pendingIcons||(h.pendingIcons=new Set);g.has(d)||(g.add(d),s[u][f].push(d))}),r.forEach(c=>{const u=s[c.provider][c.prefix];u.length&&ft(c,u)}),n?st(n,i,r):fe},dt=e=>new Promise((n,t)=>{const i=typeof e=="string"?O(e,!0):e;if(!i){t(e);return}te([i||e],s=>{if(s.length&&i){const r=P(i);if(r){n({...T,...r});return}}t(e)})});function he(e){try{const n=typeof e=="string"?JSON.parse(e):e;if(typeof n.body=="string")return{...n}}catch{}}function ht(e,n){if(typeof e=="object")return{data:he(e),value:e};if(typeof e!="string")return{value:e};if(e.includes("{")){const r=he(e);if(r)return{data:r,value:e}}const t=O(e,!0,!0);if(!t)return{value:e};const i=P(t);if(i!==void 0||!t.prefix)return{value:e,name:t,data:i};const s=te([t],()=>n(e,t,P(t)));return{value:e,name:t,loading:s}}let Oe=!1;try{Oe=navigator.vendor.indexOf("Apple")===0}catch{}function pt(e,n){switch(n){case"svg":case"bg":case"mask":return n}return n!=="style"&&(Oe||e.indexOf("<a")===-1)?"svg":e.indexOf("currentColor")===-1?"bg":"mask"}const gt=/(-?[0-9.]*[0-9]+[0-9.]*)/g,mt=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function J(e,n,t){if(n===1)return e;if(t=t||100,typeof e=="number")return Math.ceil(e*n*t)/t;if(typeof e!="string")return e;const i=e.split(gt);if(i===null||!i.length)return e;const s=[];let r=i.shift(),o=mt.test(r);for(;;){if(o){const l=parseFloat(r);isNaN(l)?s.push(r):s.push(Math.ceil(l*n*t)/t)}else s.push(r);if(r=i.shift(),r===void 0)return s.join("");o=!o}}function xt(e,n="defs"){let t="";const i=e.indexOf("<"+n);for(;i>=0;){const s=e.indexOf(">",i),r=e.indexOf("</"+n);if(s===-1||r===-1)break;const o=e.indexOf(">",r);if(o===-1)break;t+=e.slice(s+1,r).trim(),e=e.slice(0,i).trim()+e.slice(o+1)}return{defs:t,content:e}}function bt(e,n){return e?"<defs>"+e+"</defs>"+n:n}function yt(e,n,t){const i=xt(e);return bt(i.defs,n+i.content+t)}const Ct=e=>e==="unset"||e==="undefined"||e==="none";function Me(e,n){const t={...T,...e},i={...ve,...n},s={left:t.left,top:t.top,width:t.width,height:t.height};let r=t.body;[t,i].forEach(j=>{const m=[],$=j.hFlip,k=j.vFlip;let C=j.rotate;$?k?C+=2:(m.push("translate("+(s.width+s.left).toString()+" "+(0-s.top).toString()+")"),m.push("scale(-1 1)"),s.top=s.left=0):k&&(m.push("translate("+(0-s.left).toString()+" "+(s.height+s.top).toString()+")"),m.push("scale(1 -1)"),s.top=s.left=0);let x;switch(C<0&&(C-=Math.floor(C/4)*4),C=C%4,C){case 1:x=s.height/2+s.top,m.unshift("rotate(90 "+x.toString()+" "+x.toString()+")");break;case 2:m.unshift("rotate(180 "+(s.width/2+s.left).toString()+" "+(s.height/2+s.top).toString()+")");break;case 3:x=s.width/2+s.left,m.unshift("rotate(-90 "+x.toString()+" "+x.toString()+")");break}C%2===1&&(s.left!==s.top&&(x=s.left,s.left=s.top,s.top=x),s.width!==s.height&&(x=s.width,s.width=s.height,s.height=x)),m.length&&(r=yt(r,'<g transform="'+m.join(" ")+'">',"</g>"))});const o=i.width,l=i.height,c=s.width,u=s.height;let f,d;o===null?(d=l===null?"1em":l==="auto"?u:l,f=J(d,c/u)):(f=o==="auto"?c:o,d=l===null?J(f,u/c):l==="auto"?u:l);const h={},g=(j,m)=>{Ct(m)||(h[j]=m.toString())};g("width",f),g("height",d);const y=[s.left,s.top,c,u];return h.viewBox=y.join(" "),{attributes:h,viewBox:y,body:r}}function ne(e,n){let t=e.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in n)t+=" "+i+'="'+n[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+t+">"+e+"</svg>"}function wt(e){return e.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function vt(e){return"data:image/svg+xml,"+wt(e)}function Ee(e){return'url("'+vt(e)+'")'}const jt=()=>{let e;try{if(e=fetch,typeof e=="function")return e}catch{}};let F=jt();function kt(e){F=e}function It(){return F}function Nt(e,n){const t=D(e);if(!t)return 0;let i;if(!t.maxURL)i=0;else{let s=0;t.resources.forEach(o=>{s=Math.max(s,o.length)});const r=n+".json?icons=";i=t.maxURL-s-t.path.length-r.length}return i}function _t(e){return e===404}const At=(e,n,t)=>{const i=[],s=Nt(e,n),r="icons";let o={type:r,provider:e,prefix:n,icons:[]},l=0;return t.forEach((c,u)=>{l+=c.length+1,l>=s&&u>0&&(i.push(o),o={type:r,provider:e,prefix:n,icons:[]},l=c.length),o.icons.push(c)}),i.push(o),i};function St(e){if(typeof e=="string"){const n=D(e);if(n)return n.path}return"/"}const Lt=(e,n,t)=>{if(!F){t("abort",424);return}let i=St(n.provider);switch(n.type){case"icons":{const r=n.prefix,l=n.icons.join(","),c=new URLSearchParams({icons:l});i+=r+".json?"+c.toString();break}case"custom":{const r=n.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:t("abort",400);return}let s=503;F(e+i).then(r=>{const o=r.status;if(o!==200){setTimeout(()=>{t(_t(o)?"abort":"next",o)});return}return s=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?t("abort",r):t("next",s)});return}setTimeout(()=>{t("success",r)})}).catch(()=>{t("next",s)})},Pt={prepare:At,send:Lt};function Tt(e,n,t){w(t||"",n).loadIcons=e}function Ot(e,n,t){w(t||"",n).loadIcon=e}const U="data-style";let Re="";function Mt(e){Re=e}function pe(e,n){let t=Array.from(e.childNodes).find(i=>i.hasAttribute&&i.hasAttribute(U));t||(t=document.createElement("style"),t.setAttribute(U,U),e.appendChild(t)),t.textContent=":host{display:inline-block;vertical-align:"+(n?"-0.125em":"0")+"}span,svg{display:block;margin:auto}"+Re}function Ve(){le("",Pt),Ae(!0);let e;try{e=window}catch{}if(e){if(e.IconifyPreload!==void 0){const t=e.IconifyPreload,i="Invalid IconifyPreload syntax.";typeof t=="object"&&t!==null&&(t instanceof Array?t:[t]).forEach(s=>{try{(typeof s!="object"||s===null||s instanceof Array||typeof s.icons!="object"||typeof s.prefix!="string"||!oe(s))&&console.error(i)}catch{console.error(i)}})}if(e.IconifyProviders!==void 0){const t=e.IconifyProviders;if(typeof t=="object"&&t!==null)for(const i in t){const s="IconifyProviders["+i+"] is invalid.";try{const r=t[i];if(typeof r!="object"||!r||r.resources===void 0)continue;ae(i,r)||console.error(s)}catch{console.error(s)}}}}return{enableCache:t=>{},disableCache:t=>{},iconLoaded:ce,iconExists:ce,getIcon:Ye,listIcons:Xe,addIcon:Se,addCollection:oe,calculateSize:J,buildIcon:Me,iconToHTML:ne,svgToURL:Ee,loadIcons:te,loadIcon:dt,addAPIProvider:ae,setCustomIconLoader:Ot,setCustomIconsLoader:Tt,appendCustomStyle:Mt,_api:{getAPIConfig:D,setAPIModule:le,sendAPIQuery:Te,setFetch:kt,getFetch:It,listAPIProviders:ct}}}const K={"background-color":"currentColor"},He={"background-color":"transparent"},ge={image:"var(--svg)",repeat:"no-repeat",size:"100% 100%"},me={"-webkit-mask":K,mask:K,background:He};for(const e in me){const n=me[e];for(const t in ge)n[e+"-"+t]=ge[t]}function xe(e){return e?e+(e.match(/^[-0-9.]+$/)?"px":""):"inherit"}function Et(e,n,t){const i=document.createElement("span");let s=e.body;s.indexOf("<a")!==-1&&(s+="<!-- "+Date.now()+" -->");const r=e.attributes,o=ne(s,{...r,width:n.width+"",height:n.height+""}),l=Ee(o),c=i.style,u={"--svg":l,width:xe(r.width),height:xe(r.height),...t?K:He};for(const f in u)c.setProperty(f,u[f]);return i}let S;function Rt(){try{S=window.trustedTypes.createPolicy("iconify",{createHTML:e=>e})}catch{S=null}}function Vt(e){return S===void 0&&Rt(),S?S.createHTML(e):e}function Ht(e){const n=document.createElement("span"),t=e.attributes;let i="";t.width||(i="width: inherit;"),t.height||(i+="height: inherit;"),i&&(t.style=i);const s=ne(e.body,t);return n.innerHTML=Vt(s),n.firstChild}function X(e){return Array.from(e.childNodes).find(n=>{const t=n.tagName&&n.tagName.toUpperCase();return t==="SPAN"||t==="SVG"})}function be(e,n){const t=n.icon.data,i=n.customisations,s=Me(t,i);i.preserveAspectRatio&&(s.attributes.preserveAspectRatio=i.preserveAspectRatio);const r=n.renderedMode;let o;switch(r){case"svg":o=Ht(s);break;default:o=Et(s,{...T,...t},r==="mask")}const l=X(e);l?o.tagName==="SPAN"&&l.tagName===o.tagName?l.setAttribute("style",o.getAttribute("style")):e.replaceChild(o,l):e.appendChild(o)}function ye(e,n,t){const i=t&&(t.rendered?t:t.lastRender);return{rendered:!1,inline:n,icon:e,lastRender:i}}function Ft(e="iconify-icon"){let n,t;try{n=window.customElements,t=window.HTMLElement}catch{return}if(!n||!t)return;const i=n.get(e);if(i)return i;const s=["icon","mode","inline","noobserver","width","height","rotate","flip"],r=class extends t{constructor(){super();v(this,"_shadowRoot");v(this,"_initialised",!1);v(this,"_state");v(this,"_checkQueued",!1);v(this,"_connected",!1);v(this,"_observer",null);v(this,"_visible",!0);const c=this._shadowRoot=this.attachShadow({mode:"open"}),u=this.hasAttribute("inline");pe(c,u),this._state=ye({value:""},u),this._queueCheck()}connectedCallback(){this._connected=!0,this.startObserver()}disconnectedCallback(){this._connected=!1,this.stopObserver()}static get observedAttributes(){return s.slice(0)}attributeChangedCallback(c){switch(c){case"inline":{const u=this.hasAttribute("inline"),f=this._state;u!==f.inline&&(f.inline=u,pe(this._shadowRoot,u));break}case"noobserver":{this.hasAttribute("noobserver")?this.startObserver():this.stopObserver();break}default:this._queueCheck()}}get icon(){const c=this.getAttribute("icon");if(c&&c.slice(0,1)==="{")try{return JSON.parse(c)}catch{}return c}set icon(c){typeof c=="object"&&(c=JSON.stringify(c)),this.setAttribute("icon",c)}get inline(){return this.hasAttribute("inline")}set inline(c){c?this.setAttribute("inline","true"):this.removeAttribute("inline")}get observer(){return this.hasAttribute("observer")}set observer(c){c?this.setAttribute("observer","true"):this.removeAttribute("observer")}restartAnimation(){const c=this._state;if(c.rendered){const u=this._shadowRoot;if(c.renderedMode==="svg")try{u.lastChild.setCurrentTime(0);return}catch{}be(u,c)}}get status(){const c=this._state;return c.rendered?"rendered":c.icon.data===null?"failed":"loading"}_queueCheck(){this._checkQueued||(this._checkQueued=!0,setTimeout(()=>{this._check()}))}_check(){if(!this._checkQueued)return;this._checkQueued=!1;const c=this._state,u=this.getAttribute("icon");if(u!==c.icon.value){this._iconChanged(u);return}if(!c.rendered||!this._visible)return;const f=this.getAttribute("mode"),d=ie(this);(c.attrMode!==f||Be(c.customisations,d)||!X(this._shadowRoot))&&this._renderIcon(c.icon,d,f)}_iconChanged(c){const u=ht(c,(f,d,h)=>{const g=this._state;if(g.rendered||this.getAttribute("icon")!==f)return;const y={value:f,name:d,data:h};y.data?this._gotIconData(y):g.icon=y});u.data?this._gotIconData(u):this._state=ye(u,this._state.inline,this._state)}_forceRender(){if(!this._visible){const c=X(this._shadowRoot);c&&this._shadowRoot.removeChild(c);return}this._queueCheck()}_gotIconData(c){this._checkQueued=!1,this._renderIcon(c,ie(this),this.getAttribute("mode"))}_renderIcon(c,u,f){const d=pt(c.data.body,f),h=this._state.inline;be(this._shadowRoot,this._state={rendered:!0,icon:c,inline:h,customisations:u,attrMode:f,renderedMode:d})}startObserver(){if(!this._observer&&!this.hasAttribute("noobserver"))try{this._observer=new IntersectionObserver(c=>{const u=c.some(f=>f.isIntersecting);u!==this._visible&&(this._visible=u,this._forceRender())}),this._observer.observe(this)}catch{if(this._observer){try{this._observer.disconnect()}catch{}this._observer=null}}}stopObserver(){this._observer&&(this._observer.disconnect(),this._observer=null,this._visible=!0,this._connected&&this._forceRender())}};s.forEach(l=>{l in r.prototype||Object.defineProperty(r.prototype,l,{get:function(){return this.getAttribute(l)},set:function(c){c!==null?this.setAttribute(l,c):this.removeAttribute(l)}})});const o=Ve();for(const l in o)r[l]=r.prototype[l]=o[l];return n.define(e,r),r}Ft()||Ve();var Y=se.forwardRef((e,n)=>{const t={...e,ref:n};return typeof e.icon=="object"&&(t.icon=JSON.stringify(e.icon)),e.inline||delete t.inline,e.className&&(t.class=e.className),se.createElement("iconify-icon",t)});function zt(){const{props:{auth:{user:e}}}=Ce();return a.jsx("header",{className:"sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 lg:ps-[260px]",children:a.jsxs("nav",{className:"px-4 sm:px-6 flex basis-full items-center w-full mx-auto",children:[a.jsxs("div",{className:"me-5 lg:me-0 lg:hidden",children:[a.jsx("a",{className:"flex-none rounded-md text-xl inline-block font-semibold focus:outline-none focus:opacity-80",href:"#","aria-label":"Preline",children:a.jsxs("svg",{className:"w-28 h-auto",width:"116",height:"32",viewBox:"0 0 116 32",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[a.jsx("path",{d:"M33.5696 30.8182V11.3182H37.4474V13.7003H37.6229C37.7952 13.3187 38.0445 12.9309 38.3707 12.5369C38.7031 12.1368 39.134 11.8045 39.6634 11.5398C40.1989 11.2689 40.8636 11.1335 41.6577 11.1335C42.6918 11.1335 43.6458 11.4044 44.5199 11.946C45.3939 12.4815 46.0926 13.291 46.6158 14.3743C47.139 15.4515 47.4006 16.8026 47.4006 18.4276C47.4006 20.0095 47.1451 21.3452 46.6342 22.4347C46.1295 23.518 45.4401 24.3397 44.5661 24.8999C43.6982 25.4538 42.7256 25.7308 41.6484 25.7308C40.8852 25.7308 40.2358 25.6046 39.7003 25.3523C39.1709 25.0999 38.737 24.7829 38.3984 24.4013C38.0599 24.0135 37.8014 23.6226 37.6229 23.2287H37.5028V30.8182H33.5696ZM37.4197 18.4091C37.4197 19.2524 37.5367 19.9879 37.7706 20.6158C38.0045 21.2436 38.343 21.733 38.7862 22.0838C39.2294 22.4285 39.768 22.6009 40.402 22.6009C41.0421 22.6009 41.5838 22.4254 42.027 22.0746C42.4702 21.7176 42.8056 21.2251 43.0334 20.5973C43.2673 19.9633 43.3842 19.2339 43.3842 18.4091C43.3842 17.5904 43.2704 16.8703 43.0426 16.2486C42.8149 15.6269 42.4794 15.1406 42.0362 14.7898C41.593 14.4389 41.0483 14.2635 40.402 14.2635C39.7618 14.2635 39.2202 14.4328 38.777 14.7713C38.34 15.1098 38.0045 15.59 37.7706 16.2116C37.5367 16.8333 37.4197 17.5658 37.4197 18.4091ZM49.2427 25.5V11.3182H53.0559V13.7926H53.2037C53.4622 12.9124 53.8961 12.2476 54.5055 11.7983C55.1149 11.3428 55.8166 11.1151 56.6106 11.1151C56.8076 11.1151 57.02 11.1274 57.2477 11.152C57.4754 11.1766 57.6755 11.2105 57.8478 11.2536V14.7436C57.6632 14.6882 57.4077 14.639 57.0815 14.5959C56.7553 14.5528 56.4567 14.5312 56.1859 14.5312C55.6073 14.5312 55.0903 14.6574 54.6348 14.9098C54.1854 15.156 53.8284 15.5007 53.5638 15.9439C53.3052 16.3871 53.176 16.898 53.176 17.4766V25.5H49.2427ZM64.9043 25.777C63.4455 25.777 62.1898 25.4815 61.1373 24.8906C60.0909 24.2936 59.2845 23.4503 58.7182 22.3608C58.1519 21.2652 57.8688 19.9695 57.8688 18.4737C57.8688 17.0149 58.1519 15.7346 58.7182 14.6328C59.2845 13.531 60.0816 12.6723 61.1096 12.0568C62.1437 11.4413 63.3563 11.1335 64.7474 11.1335C65.683 11.1335 66.5539 11.2843 67.3603 11.5859C68.1728 11.8814 68.8806 12.3277 69.4839 12.9247C70.0932 13.5218 70.5672 14.2727 70.9057 15.1776C71.2443 16.0762 71.4135 17.1288 71.4135 18.3352V19.4155H59.4384V16.978H67.7111C67.7111 16.4117 67.588 15.91 67.3418 15.473C67.0956 15.036 66.754 14.6944 66.317 14.4482C65.8861 14.1958 65.3844 14.0696 64.812 14.0696C64.2149 14.0696 63.6856 14.2081 63.2239 14.4851C62.7684 14.7559 62.4114 15.1222 62.1529 15.5838C61.8944 16.0393 61.762 16.5471 61.7559 17.1072V19.4247C61.7559 20.1264 61.8851 20.7327 62.1437 21.2436C62.4083 21.7545 62.7807 22.1484 63.2608 22.4254C63.741 22.7024 64.3103 22.8409 64.9689 22.8409C65.406 22.8409 65.8061 22.7794 66.1692 22.6562C66.5324 22.5331 66.8432 22.3485 67.1018 22.1023C67.3603 21.8561 67.5572 21.5545 67.6927 21.1974L71.3304 21.4375C71.1458 22.3116 70.7672 23.0748 70.1948 23.7273C69.6285 24.3736 68.896 24.8783 67.9974 25.2415C67.1048 25.5985 66.0738 25.777 64.9043 25.777ZM77.1335 6.59091V25.5H73.2003V6.59091H77.1335ZM79.5043 25.5V11.3182H83.4375V25.5H79.5043ZM81.4801 9.49006C80.8954 9.49006 80.3937 9.29616 79.9752 8.90838C79.5628 8.51444 79.3566 8.04356 79.3566 7.49574C79.3566 6.95407 79.5628 6.48935 79.9752 6.10156C80.3937 5.70762 80.8954 5.51065 81.4801 5.51065C82.0649 5.51065 82.5635 5.70762 82.9759 6.10156C83.3944 6.48935 83.6037 6.95407 83.6037 7.49574C83.6037 8.04356 83.3944 8.51444 82.9759 8.90838C82.5635 9.29616 82.0649 9.49006 81.4801 9.49006ZM89.7415 17.3011V25.5H85.8083V11.3182H89.5569V13.8203H89.723C90.037 12.9955 90.5632 12.343 91.3019 11.8629C92.0405 11.3767 92.9361 11.1335 93.9887 11.1335C94.9735 11.1335 95.8322 11.349 96.5647 11.7798C97.2971 12.2107 97.8665 12.8262 98.2728 13.6264C98.679 14.4205 98.8821 15.3684 98.8821 16.4702V25.5H94.9489V17.1719C94.9551 16.304 94.7335 15.6269 94.2841 15.1406C93.8348 14.6482 93.2162 14.402 92.4283 14.402C91.8989 14.402 91.4311 14.5159 91.0249 14.7436C90.6248 14.9714 90.3109 15.3037 90.0831 15.7408C89.8615 16.1716 89.7477 16.6918 89.7415 17.3011ZM107.665 25.777C106.206 25.777 104.951 25.4815 103.898 24.8906C102.852 24.2936 102.045 23.4503 101.479 22.3608C100.913 21.2652 100.63 19.9695 100.63 18.4737C100.63 17.0149 100.913 15.7346 101.479 14.6328C102.045 13.531 102.842 12.6723 103.87 12.0568C104.905 11.4413 106.117 11.1335 107.508 11.1335C108.444 11.1335 109.315 11.2843 110.121 11.5859C110.934 11.8814 111.641 12.3277 112.245 12.9247C112.854 13.5218 113.328 14.2727 113.667 15.1776C114.005 16.0762 114.174 17.1288 114.174 18.3352V19.4155H102.199V16.978H110.472C110.472 16.4117 110.349 15.91 110.103 15.473C109.856 15.036 109.515 14.6944 109.078 14.4482C108.647 14.1958 108.145 14.0696 107.573 14.0696C106.976 14.0696 106.446 14.2081 105.985 14.4851C105.529 14.7559 105.172 15.1222 104.914 15.5838C104.655 16.0393 104.523 16.5471 104.517 17.1072V19.4247C104.517 20.1264 104.646 20.7327 104.905 21.2436C105.169 21.7545 105.542 22.1484 106.022 22.4254C106.502 22.7024 107.071 22.8409 107.73 22.8409C108.167 22.8409 108.567 22.7794 108.93 22.6562C109.293 22.5331 109.604 22.3485 109.863 22.1023C110.121 21.8561 110.318 21.5545 110.454 21.1974L114.091 21.4375C113.907 22.3116 113.528 23.0748 112.956 23.7273C112.389 24.3736 111.657 24.8783 110.758 25.2415C109.866 25.5985 108.835 25.777 107.665 25.777Z",className:"fill-blue-600",fill:"currentColor"}),a.jsx("path",{d:"M1 29.5V16.5C1 9.87258 6.37258 4.5 13 4.5C19.6274 4.5 25 9.87258 25 16.5C25 23.1274 19.6274 28.5 13 28.5H12",className:"stroke-blue-600",stroke:"currentColor",strokeWidth:"2"}),a.jsx("path",{d:"M5 29.5V16.66C5 12.1534 8.58172 8.5 13 8.5C17.4183 8.5 21 12.1534 21 16.66C21 21.1666 17.4183 24.82 13 24.82H12",className:"stroke-blue-600",stroke:"currentColor",strokeWidth:"2"}),a.jsx("circle",{cx:"13",cy:"16.5214",r:"5",className:"fill-blue-600",fill:"currentColor"})]})}),a.jsx("div",{className:"lg:hidden ms-1"})]}),a.jsxs("div",{className:"w-full flex items-center justify-end ms-auto md:justify-between gap-x-1 md:gap-x-3",children:[a.jsx("div",{className:"hidden md:block",children:a.jsxs("div",{className:"relative",children:[a.jsx("div",{className:"absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5",children:a.jsxs("svg",{className:"shrink-0 size-4 text-gray-400",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"11",cy:"11",r:"8"}),a.jsx("path",{d:"m21 21-4.3-4.3"})]})}),a.jsx("input",{type:"text",className:"py-2 ps-10 pe-16 block w-full bg-white border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",placeholder:"Search"}),a.jsx("div",{className:"hidden absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-1",children:a.jsxs("button",{type:"button",className:"inline-flex shrink-0 justify-center items-center size-6 rounded-full text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600","aria-label":"Close",children:[a.jsx("span",{className:"sr-only",children:"Close"}),a.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("circle",{cx:"12",cy:"12",r:"10"}),a.jsx("path",{d:"m15 9-6 6"}),a.jsx("path",{d:"m9 9 6 6"})]})]})}),a.jsxs("div",{className:"absolute inset-y-0 end-0 flex items-center pointer-events-none z-20 pe-3 text-gray-400",children:[a.jsx("svg",{className:"shrink-0 size-3 text-gray-400",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:a.jsx("path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"})}),a.jsx("span",{className:"mx-1",children:a.jsxs("svg",{className:"shrink-0 size-3 text-gray-400",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("path",{d:"M5 12h14"}),a.jsx("path",{d:"M12 5v14"})]})}),a.jsx("span",{className:"text-xs",children:"/"})]})]})}),a.jsx("div",{className:"flex flex-row items-center justify-end gap-1",children:a.jsxs("div",{className:"hs-dropdown [--placement:bottom-right] relative inline-flex",children:[a.jsx("button",{id:"hs-dropdown-account",type:"button",className:"size-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none","aria-haspopup":"menu","aria-expanded":"false","aria-label":"Dropdown",children:a.jsx(Y,{icon:"fluent:person-circle-28-filled",width:36,height:36})}),a.jsxs("div",{className:"hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full",role:"menu","aria-orientation":"vertical","aria-labelledby":"hs-dropdown-account",children:[a.jsxs("div",{className:"py-3 px-5 bg-gray-100 rounded-t-lg",children:[a.jsx("p",{className:"text-sm text-gray-500",children:"Signed in as"}),a.jsx("p",{className:"text-sm font-medium text-gray-800",children:e.name})]}),a.jsx("div",{className:"p-1.5 space-y-0.5",children:a.jsxs("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",href:route("signout"),children:[a.jsx(Y,{icon:"clarity:power-solid",width:24,height:24}),"Logout"]})})]})]})})]})]})})}const Dt=e=>a.jsx("li",{children:a.jsxs("a",{className:e.active?"flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100":"w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100",href:e.url,children:[a.jsx(Y,{icon:e.icon,width:24,height:24}),e.label]})});function $t(){const{props:{auth:{user:e,menus:n}}}=Ce();return a.jsx("div",{id:"hs-application-sidebar",className:`hs-overlay  [--auto-close:lg]
                  hs-overlay-open:translate-x-0
                  -translate-x-full transition-all duration-300 transform
                  w-[260px] h-full
                  hidden
                  fixed inset-y-0 start-0 z-[60]
                  bg-white border-e border-gray-200
                  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                 `,role:"dialog","aria-label":"Sidebar",children:a.jsxs("div",{className:"relative flex flex-col h-full max-h-full",children:[a.jsxs("div",{className:"px-6 pt-4 flex items-center",children:[a.jsx("a",{className:"flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80",href:"#","aria-label":"Preline",children:a.jsx("img",{src:e.dashboard_logo,alt:e.name,className:"max-w-[150px]"})}),a.jsx("div",{className:"hidden lg:block ms-2"})]}),a.jsx("div",{className:"h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",children:a.jsx("nav",{className:"hs-accordion-group p-3 w-full flex flex-col flex-wrap","data-hs-accordion-always-open":!0,children:a.jsx("ul",{className:"flex flex-col space-y-1",children:n.map(t=>a.jsx(Dt,{label:t.title,active:t.is_active,icon:t.icon,url:t.url},t.title))})})})]})})}function Bt(e){return a.jsxs("div",{children:[a.jsx(zt,{}),a.jsx("div",{className:"-mt-px",children:a.jsx("div",{className:"sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden",children:a.jsxs("div",{className:"flex items-center py-2",children:[a.jsxs("button",{type:"button",className:"size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"hs-application-sidebar","aria-label":"Toggle navigation","data-hs-overlay":"#hs-application-sidebar",children:[a.jsx("span",{className:"sr-only",children:"Toggle Navigation"}),a.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[a.jsx("rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}),a.jsx("path",{d:"M15 3v18"}),a.jsx("path",{d:"m8 9 3 3-3 3"})]})]}),a.jsxs("ol",{className:"ms-3 flex items-center whitespace-nowrap",children:[a.jsxs("li",{className:"flex items-center text-sm text-gray-800",children:["Application Layout",a.jsx("svg",{className:"shrink-0 mx-3 overflow-visible size-2.5 text-gray-400",width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:a.jsx("path",{d:"M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})]}),a.jsx("li",{className:"text-sm font-semibold text-gray-800 truncate","aria-current":"page",children:"Dashboard"})]})]})})}),a.jsx($t,{}),a.jsx("div",{className:"w-full lg:ps-64",children:a.jsx("div",{className:"p-4 sm:p-6 space-y-4 sm:space-y-6",children:e.children})})]})}export{Bt as A,Y as I};
