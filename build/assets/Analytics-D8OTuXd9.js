import{b as A,t as ie,d as v,e as ne,f as oe,v as le,g as q,i as E,A as X,h as de,k as ce,l as ue,n as fe,K as he,r as b,S as xe,j as o,L as ve,C as me,p as pe,o as be}from"./app-BqMn42H-.js";import{A as ye,I as S}from"./AdminLayout-DaBmL5oY.js";import{h as T}from"./Permission-DY6x0AJ-.js";import{d as k,D as ge}from"./index.esm-BYxGcUhL.js";import{L as we,P as U}from"./index-Dy3c--wy.js";import{L as je}from"./index-CfjhAH9f.js";/*!
 * chartjs-plugin-datalabels v2.2.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2022 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */var G=function(){if(typeof window<"u"){if(window.devicePixelRatio)return window.devicePixelRatio;var e=window.screen;if(e)return(e.deviceXDPI||1)/(e.logicalXDPI||1)}return 1}(),F={toTextLines:function(e){var a=[],t;for(e=[].concat(e);e.length;)t=e.pop(),typeof t=="string"?a.unshift.apply(a,t.split(`
`)):Array.isArray(t)?e.push.apply(e,t):E(e)||a.unshift(""+t);return a},textSize:function(e,a,t){var r=[].concat(a),s=r.length,i=e.font,n=0,l;for(e.font=t.string,l=0;l<s;++l)n=Math.max(e.measureText(r[l]).width,n);return e.font=i,{height:s*t.lineHeight,width:n}},bound:function(e,a,t){return Math.max(e,Math.min(a,t))},arrayDiff:function(e,a){var t=e.slice(),r=[],s,i,n,l;for(s=0,n=a.length;s<n;++s)l=a[s],i=t.indexOf(l),i===-1?r.push([l,1]):t.splice(i,1);for(s=0,n=t.length;s<n;++s)r.push([t[s],-1]);return r},rasterize:function(e){return Math.round(e*G)/G}};function O(e,a){var t=a.x,r=a.y;if(t===null)return{x:0,y:-1};if(r===null)return{x:1,y:0};var s=e.x-t,i=e.y-r,n=Math.sqrt(s*s+i*i);return{x:n?s/n:0,y:n?i/n:-1}}function _e(e,a,t,r,s){switch(s){case"center":t=r=0;break;case"bottom":t=0,r=1;break;case"right":t=1,r=0;break;case"left":t=-1,r=0;break;case"top":t=0,r=-1;break;case"start":t=-t,r=-r;break;case"end":break;default:s*=Math.PI/180,t=Math.cos(s),r=Math.sin(s);break}return{x:e,y:a,vx:t,vy:r}}var Ne=0,K=1,J=2,V=4,Q=8;function $(e,a,t){var r=Ne;return e<t.left?r|=K:e>t.right&&(r|=J),a<t.top?r|=Q:a>t.bottom&&(r|=V),r}function ke(e,a){for(var t=e.x0,r=e.y0,s=e.x1,i=e.y1,n=$(t,r,a),l=$(s,i,a),u,c,f;!(!(n|l)||n&l);)u=n||l,u&Q?(c=t+(s-t)*(a.top-r)/(i-r),f=a.top):u&V?(c=t+(s-t)*(a.bottom-r)/(i-r),f=a.bottom):u&J?(f=r+(i-r)*(a.right-t)/(s-t),c=a.right):u&K&&(f=r+(i-r)*(a.left-t)/(s-t),c=a.left),u===n?(t=c,r=f,n=$(t,r,a)):(s=c,i=f,l=$(s,i,a));return{x0:t,x1:s,y0:r,y1:i}}function B(e,a){var t=a.anchor,r=e,s,i;return a.clamp&&(r=ke(r,a.area)),t==="start"?(s=r.x0,i=r.y0):t==="end"?(s=r.x1,i=r.y1):(s=(r.x0+r.x1)/2,i=(r.y0+r.y1)/2),_e(s,i,e.vx,e.vy,a.align)}var L={arc:function(e,a){var t=(e.startAngle+e.endAngle)/2,r=Math.cos(t),s=Math.sin(t),i=e.innerRadius,n=e.outerRadius;return B({x0:e.x+r*i,y0:e.y+s*i,x1:e.x+r*n,y1:e.y+s*n,vx:r,vy:s},a)},point:function(e,a){var t=O(e,a.origin),r=t.x*e.options.radius,s=t.y*e.options.radius;return B({x0:e.x-r,y0:e.y-s,x1:e.x+r,y1:e.y+s,vx:t.x,vy:t.y},a)},bar:function(e,a){var t=O(e,a.origin),r=e.x,s=e.y,i=0,n=0;return e.horizontal?(r=Math.min(e.x,e.base),i=Math.abs(e.base-e.x)):(s=Math.min(e.y,e.base),n=Math.abs(e.base-e.y)),B({x0:r,y0:s+n,x1:r+i,y1:s,vx:t.x,vy:t.y},a)},fallback:function(e,a){var t=O(e,a.origin);return B({x0:e.x,y0:e.y,x1:e.x+(e.width||0),y1:e.y+(e.height||0),vx:t.x,vy:t.y},a)}},w=F.rasterize;function Me(e){var a=e.borderWidth||0,t=e.padding,r=e.size.height,s=e.size.width,i=-s/2,n=-r/2;return{frame:{x:i-t.left-a,y:n-t.top-a,w:s+t.width+a*2,h:r+t.height+a*2},text:{x:i,y:n,w:s,h:r}}}function Ce(e,a){var t=a.chart.getDatasetMeta(a.datasetIndex).vScale;if(!t)return null;if(t.xCenter!==void 0&&t.yCenter!==void 0)return{x:t.xCenter,y:t.yCenter};var r=t.getBasePixel();return e.horizontal?{x:r,y:null}:{x:null,y:r}}function Se(e){return e instanceof X?L.arc:e instanceof de?L.point:e instanceof ce?L.bar:L.fallback}function De(e,a,t,r,s,i){var n=Math.PI/2;if(i){var l=Math.min(i,s/2,r/2),u=a+l,c=t+l,f=a+r-l,h=t+s-l;e.moveTo(a,c),u<f&&c<h?(e.arc(u,c,l,-Math.PI,-n),e.arc(f,c,l,-n,0),e.arc(f,h,l,0,n),e.arc(u,h,l,n,Math.PI)):u<f?(e.moveTo(u,t),e.arc(f,c,l,-n,n),e.arc(u,c,l,n,Math.PI+n)):c<h?(e.arc(u,c,l,-Math.PI,0),e.arc(u,h,l,0,Math.PI)):e.arc(u,c,l,-Math.PI,Math.PI),e.closePath(),e.moveTo(a,t)}else e.rect(a,t,r,s)}function Ee(e,a,t){var r=t.backgroundColor,s=t.borderColor,i=t.borderWidth;!r&&(!s||!i)||(e.beginPath(),De(e,w(a.x)+i/2,w(a.y)+i/2,w(a.w)-i,w(a.h)-i,t.borderRadius),e.closePath(),r&&(e.fillStyle=r,e.fill()),s&&i&&(e.strokeStyle=s,e.lineWidth=i,e.lineJoin="miter",e.stroke()))}function Fe(e,a,t){var r=t.lineHeight,s=e.w,i=e.x,n=e.y+r/2;return a==="center"?i+=s/2:(a==="end"||a==="right")&&(i+=s),{h:r,w:s,x:i,y:n}}function Pe(e,a,t){var r=e.shadowBlur,s=t.stroked,i=w(t.x),n=w(t.y),l=w(t.w);s&&e.strokeText(a,i,n,l),t.filled&&(r&&s&&(e.shadowBlur=0),e.fillText(a,i,n,l),r&&s&&(e.shadowBlur=r))}function Ae(e,a,t,r){var s=r.textAlign,i=r.color,n=!!i,l=r.font,u=a.length,c=r.textStrokeColor,f=r.textStrokeWidth,h=c&&f,p;if(!(!u||!n&&!h))for(t=Fe(t,s,l),e.font=l.string,e.textAlign=s,e.textBaseline="middle",e.shadowBlur=r.textShadowBlur,e.shadowColor=r.textShadowColor,n&&(e.fillStyle=i),h&&(e.lineJoin="round",e.lineWidth=f,e.strokeStyle=c),p=0,u=a.length;p<u;++p)Pe(e,a[p],{stroked:h,filled:n,w:t.w,x:t.x,y:t.y+t.h*p})}var Z=function(e,a,t,r){var s=this;s._config=e,s._index=r,s._model=null,s._rects=null,s._ctx=a,s._el=t};A(Z.prototype,{_modelize:function(e,a,t,r){var s=this,i=s._index,n=ie(v([t.font,{}],r,i)),l=v([t.color,ne.color],r,i);return{align:v([t.align,"center"],r,i),anchor:v([t.anchor,"center"],r,i),area:r.chart.chartArea,backgroundColor:v([t.backgroundColor,null],r,i),borderColor:v([t.borderColor,null],r,i),borderRadius:v([t.borderRadius,0],r,i),borderWidth:v([t.borderWidth,0],r,i),clamp:v([t.clamp,!1],r,i),clip:v([t.clip,!1],r,i),color:l,display:e,font:n,lines:a,offset:v([t.offset,4],r,i),opacity:v([t.opacity,1],r,i),origin:Ce(s._el,r),padding:oe(v([t.padding,4],r,i)),positioner:Se(s._el),rotation:v([t.rotation,0],r,i)*(Math.PI/180),size:F.textSize(s._ctx,a,n),textAlign:v([t.textAlign,"start"],r,i),textShadowBlur:v([t.textShadowBlur,0],r,i),textShadowColor:v([t.textShadowColor,l],r,i),textStrokeColor:v([t.textStrokeColor,l],r,i),textStrokeWidth:v([t.textStrokeWidth,0],r,i)}},update:function(e){var a=this,t=null,r=null,s=a._index,i=a._config,n,l,u,c=v([i.display,!0],e,s);c&&(n=e.dataset.data[s],l=le(q(i.formatter,[n,e]),n),u=E(l)?[]:F.toTextLines(l),u.length&&(t=a._modelize(c,u,i,e),r=Me(t))),a._model=t,a._rects=r},geometry:function(){return this._rects?this._rects.frame:{}},rotation:function(){return this._model?this._model.rotation:0},visible:function(){return this._model&&this._model.opacity},model:function(){return this._model},draw:function(e,a){var t=this,r=e.ctx,s=t._model,i=t._rects,n;this.visible()&&(r.save(),s.clip&&(n=s.area,r.beginPath(),r.rect(n.left,n.top,n.right-n.left,n.bottom-n.top),r.clip()),r.globalAlpha=F.bound(0,s.opacity,1),r.translate(w(a.x),w(a.y)),r.rotate(s.rotation),Ee(r,i.frame,s),Ae(r,s.lines,i.text,s),r.restore())}});var Ie=Number.MIN_SAFE_INTEGER||-9007199254740991,Re=Number.MAX_SAFE_INTEGER||9007199254740991;function D(e,a,t){var r=Math.cos(t),s=Math.sin(t),i=a.x,n=a.y;return{x:i+r*(e.x-i)-s*(e.y-n),y:n+s*(e.x-i)+r*(e.y-n)}}function H(e,a){var t=Re,r=Ie,s=a.origin,i,n,l,u,c;for(i=0;i<e.length;++i)n=e[i],l=n.x-s.x,u=n.y-s.y,c=a.vx*l+a.vy*u,t=Math.min(t,c),r=Math.max(r,c);return{min:t,max:r}}function z(e,a){var t=a.x-e.x,r=a.y-e.y,s=Math.sqrt(t*t+r*r);return{vx:(a.x-e.x)/s,vy:(a.y-e.y)/s,origin:e,ln:s}}var ee=function(){this._rotation=0,this._rect={x:0,y:0,w:0,h:0}};A(ee.prototype,{center:function(){var e=this._rect;return{x:e.x+e.w/2,y:e.y+e.h/2}},update:function(e,a,t){this._rotation=t,this._rect={x:a.x+e.x,y:a.y+e.y,w:a.w,h:a.h}},contains:function(e){var a=this,t=1,r=a._rect;return e=D(e,a.center(),-a._rotation),!(e.x<r.x-t||e.y<r.y-t||e.x>r.x+r.w+t*2||e.y>r.y+r.h+t*2)},intersects:function(e){var a=this._points(),t=e._points(),r=[z(a[0],a[1]),z(a[0],a[3])],s,i,n;for(this._rotation!==e._rotation&&r.push(z(t[0],t[1]),z(t[0],t[3])),s=0;s<r.length;++s)if(i=H(a,r[s]),n=H(t,r[s]),i.max<n.min||n.max<i.min)return!1;return!0},_points:function(){var e=this,a=e._rect,t=e._rotation,r=e.center();return[D({x:a.x,y:a.y},r,t),D({x:a.x+a.w,y:a.y},r,t),D({x:a.x+a.w,y:a.y+a.h},r,t),D({x:a.x,y:a.y+a.h},r,t)]}});function te(e,a,t){var r=a.positioner(e,a),s=r.vx,i=r.vy;if(!s&&!i)return{x:r.x,y:r.y};var n=t.w,l=t.h,u=a.rotation,c=Math.abs(n/2*Math.cos(u))+Math.abs(l/2*Math.sin(u)),f=Math.abs(n/2*Math.sin(u))+Math.abs(l/2*Math.cos(u)),h=1/Math.max(Math.abs(s),Math.abs(i));return c*=s*h,f*=i*h,c+=a.offset*s,f+=a.offset*i,{x:r.x+c,y:r.y+f}}function Te(e,a){var t,r,s,i;for(t=e.length-1;t>=0;--t)for(s=e[t].$layout,r=t-1;r>=0&&s._visible;--r)i=e[r].$layout,i._visible&&s._box.intersects(i._box)&&a(s,i);return e}function $e(e){var a,t,r,s,i,n,l;for(a=0,t=e.length;a<t;++a)r=e[a],s=r.$layout,s._visible&&(l=new Proxy(r._el,{get:(u,c)=>u.getProps([c],!0)[c]}),i=r.geometry(),n=te(l,r.model(),i),s._box.update(n,i,r.rotation()));return Te(e,function(u,c){var f=u._hidable,h=c._hidable;f&&h||h?c._visible=!1:f&&(u._visible=!1)})}var P={prepare:function(e){var a=[],t,r,s,i,n;for(t=0,s=e.length;t<s;++t)for(r=0,i=e[t].length;r<i;++r)n=e[t][r],a.push(n),n.$layout={_box:new ee,_hidable:!1,_visible:!0,_set:t,_idx:n._index};return a.sort(function(l,u){var c=l.$layout,f=u.$layout;return c._idx===f._idx?f._set-c._set:f._idx-c._idx}),this.update(a),a},update:function(e){var a=!1,t,r,s,i,n;for(t=0,r=e.length;t<r;++t)s=e[t],i=s.model(),n=s.$layout,n._hidable=i&&i.display==="auto",n._visible=s.visible(),a|=n._hidable;a&&$e(e)},lookup:function(e,a){var t,r;for(t=e.length-1;t>=0;--t)if(r=e[t].$layout,r&&r._visible&&r._box.contains(a))return e[t];return null},draw:function(e,a){var t,r,s,i,n,l;for(t=0,r=a.length;t<r;++t)s=a[t],i=s.$layout,i._visible&&(n=s.geometry(),l=te(s._el,s.model(),n),i._box.update(l,n,s.rotation()),s.draw(e,l))}},Be=function(e){if(E(e))return null;var a=e,t,r,s;if(fe(e))if(!E(e.label))a=e.label;else if(!E(e.r))a=e.r;else for(a="",t=Object.keys(e),s=0,r=t.length;s<r;++s)a+=(s!==0?", ":"")+t[s]+": "+e[t[s]];return""+a},Le={align:"center",anchor:"center",backgroundColor:null,borderColor:null,borderRadius:0,borderWidth:0,clamp:!1,clip:!1,color:void 0,display:!0,font:{family:void 0,lineHeight:1.2,size:void 0,style:void 0,weight:null},formatter:Be,labels:void 0,listeners:{},offset:4,opacity:1,padding:{top:4,right:4,bottom:4,left:4},rotation:0,textAlign:"start",textStrokeColor:void 0,textStrokeWidth:0,textShadowBlur:0,textShadowColor:void 0},m="$datalabels",re="$default";function ze(e,a){var t=e.datalabels,r={},s=[],i,n;return t===!1?null:(t===!0&&(t={}),a=A({},[a,t]),i=a.labels||{},n=Object.keys(i),delete a.labels,n.length?n.forEach(function(l){i[l]&&s.push(A({},[a,i[l],{_key:l}]))}):s.push(a),r=s.reduce(function(l,u){return ue(u.listeners||{},function(c,f){l[f]=l[f]||{},l[f][u._key||re]=c}),delete u.listeners,l},{}),{labels:s,listeners:r})}function Y(e,a,t,r){if(a){var s=t.$context,i=t.$groups,n;a[i._set]&&(n=a[i._set][i._key],n&&q(n,[s,r])===!0&&(e[m]._dirty=!0,t.update(s)))}}function We(e,a,t,r,s){var i,n;!t&&!r||(t?r?t!==r&&(n=i=!0):n=!0:i=!0,n&&Y(e,a.leave,t,s),i&&Y(e,a.enter,r,s))}function Oe(e,a){var t=e[m],r=t._listeners,s,i;if(!(!r.enter&&!r.leave)){if(a.type==="mousemove")i=P.lookup(t._labels,a);else if(a.type!=="mouseout")return;s=t._hovered,t._hovered=i,We(e,r,s,i,a)}}function Ye(e,a){var t=e[m],r=t._listeners.click,s=r&&P.lookup(t._labels,a);s&&Y(e,r,s,a)}var Ue={id:"datalabels",defaults:Le,beforeInit:function(e){e[m]={_actives:[]}},beforeUpdate:function(e){var a=e[m];a._listened=!1,a._listeners={},a._datasets=[],a._labels=[]},afterDatasetUpdate:function(e,a,t){var r=a.index,s=e[m],i=s._datasets[r]=[],n=e.isDatasetVisible(r),l=e.data.datasets[r],u=ze(l,t),c=a.meta.data||[],f=e.ctx,h,p,M,I,C,R,j,y;for(f.save(),h=0,M=c.length;h<M;++h)if(j=c[h],j[m]=[],n&&j&&e.getDataVisibility(h)&&!j.skip)for(p=0,I=u.labels.length;p<I;++p)C=u.labels[p],R=C._key,y=new Z(C,f,j,h),y.$groups={_set:r,_key:R||re},y.$context={active:!1,chart:e,dataIndex:h,dataset:l,datasetIndex:r},y.update(y.$context),j[m].push(y),i.push(y);f.restore(),A(s._listeners,u.listeners,{merger:function(_,N,d){N[_]=N[_]||{},N[_][a.index]=d[_],s._listened=!0}})},afterUpdate:function(e){e[m]._labels=P.prepare(e[m]._datasets)},afterDatasetsDraw:function(e){P.draw(e,e[m]._labels)},beforeEvent:function(e,a){if(e[m]._listened){var t=a.event;switch(t.type){case"mousemove":case"mouseout":Oe(e,t);break;case"click":Ye(e,t);break}}},afterEvent:function(e){var a=e[m],t=a._actives,r=a._actives=e.getActiveElements(),s=F.arrayDiff(t,r),i,n,l,u,c,f,h;for(i=0,n=s.length;i<n;++i)if(c=s[i],c[1])for(h=c[0].element[m]||[],l=0,u=h.length;l<u;++l)f=h[l],f.$context.active=c[1]===1,f.update(f.$context);(a._dirty||s.length)&&(P.update(a._labels),e.render()),delete a._dirty}};me.register(Ue,X,pe,be);const Ge={responsive:!0,maintainAspectRatio:!1,plugins:{datalabels:{display:!0,color:"#2563EB",anchor:"end",align:"top",font:{size:12,weight:"bold"}}}};function Qe(e){var N;const{props:{urls:a}}=he(),[t,r]=b.useState({startDate:k().subtract(7,"days").toDate(),endDate:k().toDate()}),[s,i]=b.useState(((N=a.query)==null?void 0:N.source)??"News"),[n,l]=b.useState(a.query.target),[u,c]=b.useState(!1),f=b.useRef(null),[h,p]=b.useState([]),M=d=>d==="Corporate"?"#3B82F6":d==="Competitor"?"#EF4444":"#22C55E",I={...e.chart,datasets:e.chart.datasets.map(d=>({...d,borderColor:M(d.label||""),backgroundColor:M(d.label||"")}))};function C(d,x,g){return Object.values({positive:d,neutral:g,negative:x}).reduce((ae,se)=>ae+se,0)}function R(d){const x=Number(d.target.value);p(g=>d.target.checked?[...g,x]:g.filter(W=>W!==x))}b.useRef();const j=()=>{window.print()};b.useEffect(()=>{function d(x){f.current&&!f.current.contains(x.target)&&c(!1)}return document.addEventListener("mousedown",d),()=>document.removeEventListener("mousedown",d)},[]);const y={responsive:!0,plugins:{legend:{position:"bottom"},tooltip:{callbacks:{label:function(d){return`${d.label}: ${d.raw}%`}}},datalabels:{formatter:function(d){return d+"%"},display:!0,color:"#FFFFFF",font:{size:12,weight:"bold"}}}},_={responsive:!0,plugins:{legend:{position:"bottom"},datalabels:{formatter:function(d,x){return`#${[x.dataIndex+1]}`},display:!0,color:"#FFFFFF",font:{size:12,weight:"bold"}}}};return b.useEffect(()=>{p([])},[s]),b.useEffect(()=>{xe.get(route("analytics.index"),{start_date:k(t.startDate).format("YYYY-MM-DD"),end_date:k(t.endDate).format("YYYY-MM-DD"),source:s,target:n!=="all"?n:"",platform:h.join(",")},{preserveState:!0,preserveScroll:!0})},[t,s,n,h]),o.jsxs(ye,{children:[o.jsx(ve,{title:"Analythic"}),o.jsx(je,{"aria-label":""}),o.jsxs("div",{id:"section-to-print",children:[o.jsxs("div",{className:"flex flex-row align-middle justify-between",children:[o.jsx("h1",{className:"text-2xl font-bold",children:"Analytics"}),o.jsxs("div",{className:"flex flex-row gap-4",children:[o.jsxs("div",{className:"hs-dropdown relative inline-flex",children:[o.jsxs("button",{id:"hs-dropdown-default",type:"button",className:"hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none","aria-haspopup":"menu","aria-expanded":"false","aria-label":"Dropdown",children:[s,o.jsx("svg",{className:"hs-dropdown-open:rotate-180 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:o.jsx("path",{d:"m6 9 6 6 6-6"})})]}),o.jsx("div",{className:"hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full",role:"menu","aria-orientation":"vertical","aria-labelledby":"hs-dropdown-default",children:o.jsxs("div",{className:"p-1 space-y-0.5",children:[(T("User Media")||T("User Media Sosmed"))&&o.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{i("News")},children:"News"}),(T("User Sosmed")||T("User Media Sosmed"))&&o.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{i("Social Media")},children:"Social Media"})]})})]}),o.jsx("div",{children:o.jsxs("div",{className:"relative",children:[o.jsxs("select",{"data-hs-select":`{
                              "placeholder": "Select Target...",
                              "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\\"flex justify-between items-center w-full\\"><span data-title></span><span className=\\"hidden hs-selected:block\\"></span></div>"
                            }`,onChange:d=>{l(d.target.value)},value:n,children:[o.jsx("option",{value:"all",children:"All Target"}),e.targets.map((d,x)=>o.jsx("option",{value:d.id,children:d.name},x))]}),o.jsx("div",{className:"absolute top-1/2 end-2.5 -translate-y-1/2",children:o.jsxs("svg",{className:"shrink-0 size-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[o.jsx("path",{d:"m7 15 5 5 5-5"}),o.jsx("path",{d:"m7 9 5-5 5 5"})]})})]})}),o.jsxs("div",{className:"relative",ref:f,children:[o.jsx("button",{className:"px-4 py-2 rounded-md shadow-md flex items-center border",onClick:()=>c(d=>!d),children:"Platform"}),u&&o.jsx("div",{className:"absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md py-2 border z-50",children:o.jsxs("div",{className:"p-4",children:[o.jsx("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:"Platforms"}),o.jsx("div",{className:"grid grid-cols-2 gap-2",children:e.platforms.map((d,x)=>o.jsxs("div",{className:"flex",children:[o.jsx("input",{type:"checkbox",value:d.id,checked:h.includes(d.id),onChange:R,className:"shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",id:`platforms-${d.id}`}),o.jsx("label",{htmlFor:`platforms-${d.id}`,className:"text-sm text-gray-500 ms-3 dark:text-neutral-400",children:d.name})]},x))})]})})]}),o.jsx("div",{className:"w-[300px]",children:o.jsx(ge,{showShortcuts:!0,showFooter:!0,primaryColor:"blue",value:t,onChange:d=>{if(d!=null){const x=k(d.startDate),g=k(d.endDate);g.diff(x,"day")>30?alert("The maximum allowed date range is 30 days."):r({startDate:x.toDate(),endDate:g.toDate()})}}})}),o.jsxs("button",{className:"px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white",onClick:()=>j(),children:[o.jsx(S,{icon:"material-symbols:download-rounded",className:"mr-2",color:"#FFFFFF"}),"Download"]})]})]}),o.jsxs("div",{className:"grid grid-cols-12 gap-3 m-4",children:[o.jsx("div",{className:"col-span-12",children:o.jsx("div",{className:"border p-5 mt-5 rounded-lg shadow-md",children:o.jsxs("div",{className:"flex flex-col",children:[o.jsx("h1",{className:"text-xl font-semibold text-blue-600",children:"Number of Mentions"}),o.jsx("div",{className:"h-[40vh] w-full",children:o.jsx(we,{datasetIdKey:"global_chart",data:I,options:Ge})})]})})}),e.summaries.map((d,x)=>o.jsx("div",{className:"col-span-6",children:o.jsx("div",{className:"border p-7 mt-5",children:o.jsxs("div",{className:"flex flex-col",children:[o.jsxs("p",{className:"text-xl text-center mb-3",children:["Stats in Summary ",o.jsx("span",{className:"font-semibold",children:d.target})]}),o.jsxs("div",{className:"grid grid-cols-12 py-16",children:[o.jsxs("div",{className:"col-span-6 border flex flex-col items-center justify-normal px-5 py-10 rounded-lg shadow-md m-2",children:[o.jsx(S,{icon:"solar:mention-square-outline",width:40,height:40}),o.jsx("p",{className:"font-semibold text-green-600 text-lg mt-2",children:d.counts.mention}),o.jsxs("p",{className:"text-sm text-slate-500 text-center",children:[s==="News"?"News":"Social Media"," Mentions"]})]}),o.jsxs("div",{className:"col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2",children:[o.jsx(S,{icon:"solar:like-broken",width:40,height:40}),o.jsx("p",{className:"font-semibold text-green-600 text-lg mt-2",children:d.counts.like}),o.jsxs("p",{className:"text-sm text-slate-500 text-center",children:[s==="News"?"News":"Social Media"," Likes"]})]}),o.jsxs("div",{className:"col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2",children:[o.jsx(S,{icon:"fa-regular:comments",width:40,height:40}),o.jsx("p",{className:"font-semibold text-green-600 text-lg mt-2",children:d.counts.comment}),o.jsxs("p",{className:"text-sm text-slate-500 text-center",children:[s==="News"?"News":"Social Media"," Comments"]})]}),o.jsxs("div",{className:"col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2",children:[o.jsx(S,{icon:"solar:eye-broken",width:40,height:40}),o.jsx("p",{className:"font-semibold text-green-600 text-lg mt-2",children:d.counts.view}),o.jsxs("p",{className:"text-sm text-slate-500 text-center",children:[s==="News"?"News":"Social Media"," Views"]})]})]})]})})},x)),e.summaries.map((d,x)=>o.jsx("div",{className:"col-span-6",children:o.jsx("div",{className:"border p-5 mt-5",children:o.jsxs("div",{className:"flex flex-col",children:[o.jsxs("p",{className:"text-xl text-center mb-3",children:["Tone Analysis ",o.jsx("span",{className:"font-semibold",children:d.target})]}),o.jsx("div",{className:"h-[40vh] w-full flex items-center justify-center",children:o.jsx(U,{data:{labels:["Positive","Neutral","Negative"],datasets:[{data:Object.values({positive:d.counts.positive,neutral:d.counts.neutral,negative:d.counts.negative}).map(g=>(g/C(d.counts.positive,d.counts.negative,d.counts.neutral)*100).toFixed(2)),backgroundColor:["#22C55E","#3B82F6","#EF4444"],hoverBackgroundColor:["#22C55E","#3B82F6","#EF4444"],borderColor:"#ffffff",borderWidth:2}]},options:y})}),o.jsxs("div",{className:"grid grid-cols-12",children:[o.jsxs("div",{className:"col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-green-500",children:[o.jsx("p",{className:"font-semibold text-white text-2xl",children:d.counts.positive}),o.jsx("p",{className:"text-white text-center",children:"Positive"})]}),o.jsxs("div",{className:"col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-blue-500",children:[o.jsx("p",{className:"font-semibold text-white text-2xl",children:d.counts.neutral}),o.jsx("p",{className:"text-white text-center",children:"Neutral"})]}),o.jsxs("div",{className:"col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-red-500",children:[o.jsx("p",{className:"font-semibold text-white text-2xl",children:d.counts.negative}),o.jsx("p",{className:"text-white text-center",children:"Negative"})]})]})]})})},x)),e.pieData.map((d,x)=>o.jsx("div",{className:"col-span-6",children:o.jsx("div",{className:"border p-5 mt-5",children:o.jsxs("div",{className:"flex flex-col",children:[o.jsxs("p",{className:"text-xl text-center mb-3",children:["Ranking ",o.jsx("span",{className:"font-semibold",children:d.target})]}),o.jsx("div",{className:"h-[40vh] w-full flex items-center justify-center",children:o.jsx(U,{data:{labels:d.datasets.labels,datasets:[{data:d.datasets.data,backgroundColor:["#FFD700","#C0C0C0","#CD7F32","#007BFF","#28A745"],hoverBackgroundColor:["#E6C200","#A9A9A9","#B76E29","#0056B3","#1E7E34"],borderColor:"#ffffff",borderWidth:2}]},options:_})})]})})},x))]})]})]})}export{Qe as default};
