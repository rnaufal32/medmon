import{K as c,j as e,L as o,S as i}from"./app-jc7bckEm.js";import{A as d}from"./AdminLayout-BHsMOH48.js";import{S as m}from"./index.esm-Ash4uPRU.js";import{u as p}from"./index.es-Bwjq-pVg.js";import n from"./UserTargetItem-3DZ1hNT7.js";import"./index-zHTW4xak.js";import"./Modal-Chu5D4Tu.js";import"./Input-Dpm5LD5A.js";function w(){var a;const{users:l,targets:r}=c().props,t=p(null),x=l.map(s=>({label:s.name,value:s.id}));return e.jsxs(d,{children:[e.jsx(o,{title:"Users"}),e.jsxs("div",{className:"grid grid-cols-1 gap-5",children:[e.jsx("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl",children:e.jsxs("div",{className:"p-4 md:p-5",children:[e.jsx("h3",{className:"text-lg font-bold text-gray-800",children:"Select User"}),e.jsx("p",{className:"mt-2 text-gray-500",children:e.jsx(m,{options:x,value:t.get(),onChange:s=>{t.set(s),i.get(route("users.index"),{user:s.value},{only:["targets"],preserveState:!0,preserveScroll:!0})},primaryColor:"#FFFFFF"})})]})}),r&&e.jsx("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl",children:e.jsxs("div",{className:"p-4 md:p-5",children:[e.jsxs("h3",{className:"text-lg font-bold text-gray-800",children:["User : ",(a=t.get())==null?void 0:a.label]}),e.jsx("p",{className:"mt-4",children:e.jsx("div",{className:"flex flex-col",children:e.jsx("div",{className:"-m-1.5 overflow-x-auto",children:e.jsx("div",{className:"p-1.5 min-w-full inline-block align-middle",children:e.jsx("div",{className:"overflow-hidden",children:e.jsxs("table",{className:"w-full text-sm text-left relative",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Category"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Target"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Keywords"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Rules"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Includes"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Excludes"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Status"}),e.jsx("th",{scope:"col",className:"px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase",children:"Action"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-200",children:r.map((s,u)=>e.jsx(n,{item:s},s.id))})]})})})})})})]})})]})]})}export{w as default};
