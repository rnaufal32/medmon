import{C as E,r as a,R as b,a as B,B as I,P as K}from"./app-C8AXvdnH.js";const C="label";function h(e,t){typeof e=="function"?e(t):e&&(e.current=t)}function L(e,t){const r=e.options;r&&t&&Object.assign(r,t)}function y(e,t){e.labels=t}function R(e,t){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:C;const o=[];e.datasets=t.map(s=>{const u=e.datasets.find(i=>i[r]===s[r]);return!u||!s.data||o.includes(u)?{...s}:(o.push(u),Object.assign(u,s),u)})}function T(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:C;const r={labels:[],datasets:[]};return y(r,e.labels),R(r,e.datasets,t),r}function M(e,t){return e.getElementsAtEventForMode(t.nativeEvent,"nearest",{intersect:!0},!1)}function j(e,t){const{height:r=150,width:o=300,redraw:s=!1,datasetIdKey:u,type:i,data:c,options:f,plugins:w=[],fallbackContent:v,updateMode:m,...P}=e,l=a.useRef(null),n=a.useRef(null),d=()=>{l.current&&(n.current=new E(l.current,{type:i,data:T(c,u),options:f&&{...f},plugins:w}),h(t,n.current))},g=()=>{h(t,null),n.current&&(n.current.destroy(),n.current=null)};return a.useEffect(()=>{!s&&n.current&&f&&L(n.current,f)},[s,f]),a.useEffect(()=>{!s&&n.current&&y(n.current.config.data,c.labels)},[s,c.labels]),a.useEffect(()=>{!s&&n.current&&c.datasets&&R(n.current.config.data,c.datasets,u)},[s,c.datasets]),a.useEffect(()=>{n.current&&(s?(g(),setTimeout(d)):n.current.update(m))},[s,f,c.labels,c.datasets,m]),a.useEffect(()=>{n.current&&(g(),setTimeout(d))},[i]),a.useEffect(()=>(d(),()=>g()),[]),b.createElement("canvas",{ref:l,role:"img",height:r,width:o,...P},v)}const A=a.forwardRef(j);function p(e,t){return E.register(t),a.forwardRef((r,o)=>b.createElement(A,{...r,ref:o,type:e}))}const O=p("line",B),k=p("bar",I),F=p("pie",K);export{k as B,O as L,F as P,M as g};
