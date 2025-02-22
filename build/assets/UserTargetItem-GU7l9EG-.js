import{j as e,S as m,p as g}from"./app-BSqDKYqK.js";import{M as y}from"./Modal-o-pTbC49.js";import{I as b,M as o}from"./Swal-CqOdYBmK.js";import{I as r,y as l,l as d}from"./index-BdOVRcdX.js";import{u as k}from"./index.es-CvjchU7w.js";function O(h){const t=h.item,n=k({id:t.id,name:t.name,keywords:t.keywords,includes:t.includes,excludes:t.excludes,kata_kunci:t.kata_kunci,status:t.status}),c=s=>{o.fire({title:"Are you sure?",text:`${t.status==1?"Disable":"Enable"} ${t.name}?`,icon:"warning",showCancelButton:!0,confirmButtonText:`Yes, ${t.status==1?"disable":"enable"} it!`,cancelButtonText:"No, cancel!",confirmButtonColor:"danger"}).then(i=>{i.isConfirmed&&(o.fire({title:"Updating",didOpen:a=>{o.showLoading()}}),m.post(route("users.target.status.update"),{id:t.id},{onSuccess:({props:a})=>{var u,x,p;(u=a.flash)!=null&&u.error&&l(a.flash.error,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:d,type:"error"}),(x=a.flash)!=null&&x.success&&(g.HSOverlay.close(`#target-${t.id}`),(p=a.flash)!=null&&p.success&&o.fire({title:a.flash.success,icon:"success"}))}}))})},f=()=>{m.post(route("users.target.update"),n.get(),{onSuccess:({props:s})=>{var i,a;(i=s.flash)!=null&&i.error&&l(s.flash.error,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:d,type:"error"}),(a=s.flash)!=null&&a.success&&(g.HSOverlay.close(`#target-${t.id}`),l(s.flash.success,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:d,type:"success"}))}})};return e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800",children:t.category}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800",children:t.name}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.keywords}),e.jsx("td",{className:"px-6 py-4 max-w-[200px] text-sm text-gray-800",children:t.kata_kunci}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.includes}),e.jsx("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:t.excludes}),e.jsxs("td",{className:"px-6 py-4 max-w-[100px] text-sm text-gray-800",children:[t.status===1&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Enable"}),t.status===0&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Disabled"})]}),e.jsxs("td",{className:"px-6 py-4 max-w-[100px] text-sm font-medium",children:[e.jsxs("div",{className:"grid grid-cols-1 gap-3",children:[e.jsxs("button",{type:"button","aria-controls":`target--${t.id}`,"data-hs-overlay":`#target-${t.id}`,className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(r,{icon:"solar:pen-new-round-broken"})," Edit"]}),t.status===1&&e.jsxs("button",{type:"button",onClick:c,className:"py-3 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(r,{icon:"solar:power-broken"})," Disable"]}),t.status===0&&e.jsxs("button",{type:"button",onClick:c,className:"py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none",children:[e.jsx(r,{icon:"solar:power-broken"})," Enable"]})]}),e.jsx(y,{id:`target-${t.id}`,title:"Edit Target Keywords",children:e.jsxs("div",{className:"grid grid-cols-1 gap-4",children:[e.jsxs("div",{className:"flex flex-col",children:[e.jsx("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:"Target"}),e.jsx(b,{type:"text",className:"",value:n.name.get(),disabled:!0,onChange:n.name.set})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:["Keywords ",e.jsx("div",{className:"hs-tooltip [--trigger:click] [--placement:right] inline-block",children:e.jsxs("button",{type:"button",className:"hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ",children:[e.jsx(r,{icon:"solar:info-circle-broken",width:15,height:15}),e.jsx("span",{className:"hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md",role:"tooltip",children:e.jsx("p",{children:"Digunakan sebagai query untuk melakukan search pada Google"})})]})})]}),e.jsx(b,{type:"text",className:"",value:n.keywords.get(),onChange:n.keywords.set})]}),e.jsxs("div",{className:"flex flex-col",children:[e.jsxs("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:["Rules",e.jsx("div",{className:"hs-tooltip [--trigger:click] [--placement:right] inline-block ml-1",children:e.jsxs("button",{type:"button",className:"hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ",children:[e.jsx(r,{icon:"solar:info-circle-broken",width:15,height:15}),e.jsx("span",{className:"hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md",role:"tooltip",children:e.jsx("p",{children:"Digunakan untuk mencari keyword yang ada pada berita"})})]})})]}),e.jsx("textarea",{onChange:s=>{n.kata_kunci.set(s.target.value)},value:n.kata_kunci.get(),className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"})]}),e.jsx("div",{children:e.jsx("button",{onClick:s=>{s.preventDefault(),f()},className:"py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:"Submit"})})]})})]})]})}export{O as default};
