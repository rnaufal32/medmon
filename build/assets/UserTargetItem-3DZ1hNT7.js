import{K as p,j as e,S as m,p as u}from"./app-jc7bckEm.js";import{M as b}from"./Modal-Chu5D4Tu.js";import{I as o}from"./Input-Dpm5LD5A.js";import{I as n,y as l,l as d}from"./index-zHTW4xak.js";import{u as g}from"./index.es-Bwjq-pVg.js";function w(c){p().props;const t=c.item,a=g({id:t.id,name:t.name,keywords:t.keywords,includes:t.includes,excludes:t.excludes,kata_kunci:t.kata_kunci,status:t.status}),x=()=>{m.post(route("users.target.update"),a.get(),{onSuccess:({props:s})=>{var r,i;(r=s.flash)!=null&&r.error&&l(s.flash.error,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:d,type:"error"}),(i=s.flash)!=null&&i.success&&(u.HSOverlay.close(`#target-${t.id}`),l(s.flash.success,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:d,type:"success"}))}})};return e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800",children:t.category}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800",children:t.name}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.keywords}),e.jsx("td",{className:"px-6 py-4 max-w-[200px] text-sm text-gray-800",children:t.kata_kunci}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.includes}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.excludes}),e.jsxs("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:[t.status===1&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-600 text-white",children:"Enable"}),t.status===0&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Disabled"})]}),e.jsxs("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("button",{type:"button","aria-controls":`target--${t.id}`,"data-hs-overlay":`#target-${t.id}`,className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(n,{icon:"solar:pen-new-round-broken"})," Edit"]}),t.status===1&&e.jsxs("button",{type:"button",className:"py-3 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(n,{icon:"solar:power-broken"})," Disable"]}),t.status===0&&e.jsxs("button",{type:"button",className:"py-1 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(n,{icon:"solar:power-broken"})," Enable"]})]}),e.jsx(b,{id:`target-${t.id}`,title:"Edit Target Keywords",children:e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:"Target"}),e.jsx(o,{type:"text",className:"",value:a.name.get(),disabled:!0,onChange:a.name.set})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:["Keywords ",e.jsx("div",{className:"hs-tooltip [--trigger:click] [--placement:right] inline-block",children:e.jsxs("button",{type:"button",className:"hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ",children:[e.jsx(n,{icon:"solar:info-circle-broken",width:15,height:15}),e.jsx("span",{className:"hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md",role:"tooltip",children:e.jsx("p",{children:"Digunakan sebagai query untuk melakukan search pada Google"})})]})})]}),e.jsx(o,{type:"text",className:"",value:a.keywords.get(),onChange:a.keywords.set})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:["Rules",e.jsx("div",{className:"hs-tooltip [--trigger:click] [--placement:right] inline-block ml-1",children:e.jsxs("button",{type:"button",className:"hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ",children:[e.jsx(n,{icon:"solar:info-circle-broken",width:15,height:15}),e.jsx("span",{className:"hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md",role:"tooltip",children:e.jsx("p",{children:"Digunakan untuk mencari keyword yang ada pada berita"})})]})})]}),e.jsx("textarea",{onChange:s=>{a.kata_kunci.set(s.target.value)},className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",children:a.kata_kunci.get()})]}),e.jsx("div",{children:e.jsx("button",{onClick:s=>{s.preventDefault(),x()},className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:"Submit"})})]})})]})]})}export{w as default};
