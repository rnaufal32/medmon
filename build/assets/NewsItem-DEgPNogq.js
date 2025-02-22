import{K as v,j as e,S as h,p as w}from"./app-BSqDKYqK.js";import{I as n,y as g,l as p}from"./index-BdOVRcdX.js";import{d as k}from"./dayjs.min-ChZOrKx8.js";import{u as N}from"./index.es-CvjchU7w.js";import{M as i,I as l}from"./Swal-CqOdYBmK.js";import{S as C}from"./index.esm-DUBPybjS.js";function z(b){var d,c,u,m,x;const s=b.item,a=N({...s,target_id:{label:s.target,value:s.target_id,isSelected:!0}}),{props:f}=v(),j=f.user_targets.map(t=>({label:`${t.username} - ${t.name}`,value:t.id})),y=()=>{h.post(route("news.store"),{id:s.id,...a.get()},{onSuccess:({props:t})=>{var r,o;(r=t.flash)!=null&&r.error&&g(t.flash.error,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:p,type:"error"}),(o=t.flash)!=null&&o.success&&(w.HSOverlay.close(`#media-detail-${s.id}-${s.target_id}`),g(t.flash.success,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:p,type:"success"}))}})};return e.jsxs("tr",{children:[e.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:((u=(c=(d=s.user_targets[0])==null?void 0:d.user_target)==null?void 0:c.user)==null?void 0:u.name)??""}),e.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 max-w-[100px]",children:((x=(m=s.user_targets[0])==null?void 0:m.user_target)==null?void 0:x.name)??""}),e.jsx("td",{className:"px-6 py-4 text-sm font-medium text-gray-800",children:e.jsxs("div",{className:"grid grid-cols-1 gap-1",children:[e.jsx("p",{className:"line-clamp-2 font-bold",children:s.title}),e.jsxs("div",{className:"flex flex-row gap-6 text-xs",children:[e.jsx("p",{className:"",children:s.source}),e.jsxs("div",{className:"flex flex-row gap-1 items-center",children:[e.jsx(n,{icon:"solar:calendar-broken"}),e.jsx("p",{children:s.date})]}),e.jsx("p",{className:"",children:s.journalist})]}),e.jsx("p",{className:"text-sm line-clamp-2",children:s.content})]})}),e.jsxs("td",{className:"px-6 py-4 text-sm font-medium text-gray-800 flex flex-row gap-2",children:[e.jsx("a",{href:s.url,target:"_blank",className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:e.jsx(n,{icon:"fluent:open-12-regular",width:20,height:20})}),e.jsx("button",{"aria-controls":`media-detail-${s.id}-${s.target_id}`,"data-hs-overlay":`#media-detail-${s.id}-${s.target_id}`,className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:e.jsx(n,{icon:"solar:document-broken",width:20,height:20})}),e.jsx("button",{onClick:()=>{i.fire({title:"Are you sure?",text:`Delete ${s.title}?`,icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",cancelButtonText:"No, cancel!",confirmButtonColor:"danger"}).then(t=>{console.log(t),t.isConfirmed&&(i.fire({title:"Deleting",didOpen:r=>{i.showLoading()}}),h.delete(route("news.delete",{id:s.id}),{onSuccess:({props:r})=>{var o;(o=r.flash)!=null&&o.success&&i.fire({title:r.flash.success,icon:"success"})}}))})},className:"flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none",children:e.jsx(n,{icon:"solar:trash-bin-2-broken",width:20,height:20})}),e.jsx("div",{id:`media-detail-${s.id}-${s.target_id}`,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":"hs-large-modal-label",children:e.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:e.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[e.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[e.jsx("h3",{id:"hs-large-modal-label",className:"font-bold text-gray-800 dark:text-white",children:"Detail News"}),e.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#media-detail-${s.id}-${s.target_id}`,children:[e.jsx("span",{className:"sr-only",children:"Close"}),e.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M18 6 6 18"}),e.jsx("path",{d:"m6 6 12 12"})]})]})]}),e.jsx("div",{className:"p-4 overflow-y-auto",children:e.jsxs("div",{className:"grid grid-cols-1 gap-5",children:[e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"Title"}),e.jsx(l,{type:"text",onChange:t=>a.title.set(t),placeholder:"Title",value:a.title.get()})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"Date"}),e.jsx(l,{type:"date",onChange:t=>a.date.set(t),placeholder:"Title",value:k(a.date.get()).format("YYYY-MM-DD")})]}),e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"User Target"}),e.jsx(C,{primaryColor:"#2563EB",value:a.target_id.get(),isSearchable:!0,onChange:t=>{t&&a.target_id.set(t)},options:j})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"Journalist"}),e.jsx(l,{type:"text",onChange:t=>a.journalist.set(t),placeholder:"Journalist",value:a.journalist.get()})]}),e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"Spookerperson"}),e.jsx(l,{type:"text",onChange:t=>a.spookerperson.set(t),placeholder:"Spookerperson",value:a.spookerperson.get()})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"URL"}),e.jsx(l,{type:"url",onChange:t=>a.url.set(t),placeholder:"URL",value:a.url.get()})]}),e.jsx("hr",{}),e.jsxs("div",{className:"max-w-full",children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2",children:"Images"}),e.jsxs("div",{className:"flex flex-row gap-2",children:[e.jsx(l,{type:"text",onChange:t=>a.images.set(t),placeholder:"Images",value:a.images.get()}),e.jsx("div",{children:e.jsx(n,{icon:"mynaui:image-solid",width:35,height:35})})]})]}),e.jsx("hr",{}),e.jsx("textarea",{className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600",rows:5,placeholder:"This is a textarea placeholder",value:a.content.get(),onChange:t=>a.content.set(t.target.value)})]})}),e.jsxs("div",{className:"flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700",children:[e.jsx("button",{type:"button",className:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700","data-hs-overlay":`#media-detail-${s.id}-${s.target_id}`,children:"Close"}),e.jsx("button",{type:"button",onClick:y,className:"py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:"Save changes"})]})]})})})]})]})}export{z as default};
