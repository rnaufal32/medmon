import{K as y,r as n,S as i,j as e,L as w}from"./app-DmHnhfl3.js";import{A as k,I as l}from"./AdminLayout-slW7fB6V.js";import{h as x,L as N}from"./index-C2axCp4X.js";import{d as r,D as C}from"./index.esm-DcBb_5-2.js";const D={responsive:!0,maintainAspectRatio:!1};function T(s){const{props:{urls:g}}=y(),[d,f]=n.useState({startDate:r().subtract(7,"days").toDate(),endDate:r().toDate()}),[o,u]=n.useState("News"),[h,b]=n.useState(g.query.target),[m,p]=n.useState([]);function j(t){const a=Number(t.target.value);p(c=>t.target.checked?[...c,a]:c.filter(v=>v!==a))}return n.useEffect(()=>{p([])},[o]),n.useEffect(()=>{i.get(route("mentions.index"),{date:{start:r(d.startDate).format("YYYY-MM-DD"),end:r(d.endDate).format("YYYY-MM-DD")},type:o,target:h,platform_type:m.join(",")},{preserveState:!0,preserveScroll:!0})},[d,o,h,m]),e.jsxs(k,{children:[e.jsx(w,{title:"Mention"}),e.jsxs("div",{className:"flex flex-row align-middle justify-between",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Mention"}),e.jsxs("div",{className:"flex flex-row gap-4",children:[e.jsxs("div",{className:"hs-dropdown relative inline-flex",children:[e.jsxs("button",{id:"hs-dropdown-default",type:"button",className:"hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none","aria-haspopup":"menu","aria-expanded":"false","aria-label":"Dropdown",children:[o,e.jsx("svg",{className:"hs-dropdown-open:rotate-180 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),e.jsx("div",{className:"hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full",role:"menu","aria-orientation":"vertical","aria-labelledby":"hs-dropdown-default",children:e.jsxs("div",{className:"p-1 space-y-0.5",children:[(x("User Media")||x("User Media Sosmed"))&&e.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{u("News")},children:"News"}),(x("User Sosmed")||x("User Media Sosmed"))&&e.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{u("Social Media")},children:"Social Media"})]})})]}),e.jsx("div",{className:"w-[300px]",children:e.jsx(C,{primaryColor:"blue",value:d,onChange:t=>{t!=null&&f({startDate:r(t.startDate).toDate(),endDate:r(t.endDate).toDate()})}})})]})]}),e.jsx("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl",children:e.jsx("div",{className:"p-4 md:p-5",children:e.jsx("div",{className:"h-[30vh] w-full",children:e.jsx(N,{datasetIdKey:"global_chart",data:s.analytic,options:D})})})}),e.jsxs("div",{className:"grid grid-cols-3 gap-5",children:[s.data.data.length>0?e.jsxs("div",{className:"col-span-2 grid grid-cols-1 gap-5",children:[s.data.data.map((t,a)=>e.jsx("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5",children:e.jsxs("div",{className:"flex flex-row gap-3",children:[e.jsxs("div",{className:"flex",children:[t.platform=="Facebook"&&e.jsx(l,{icon:"logos:facebook",width:40,height:40}),t.platform=="Instagram"&&e.jsx(l,{icon:"skill-icons:instagram",width:40,height:40}),t.platform=="Twitter"&&e.jsx(l,{icon:"fa6-brands:square-x-twitter",width:40,height:40}),t.platform=="Youtube"&&e.jsx(l,{icon:"logos:youtube-icon",width:40,height:40}),t.platform=="Tiktok"&&e.jsx(l,{icon:"logos:tiktok-icon",width:40,height:40}),t.platform=="Media Online"&&e.jsx(l,{icon:"mdi:web",width:40,height:40})]}),e.jsxs("div",{className:"flex flex-col w-full",children:[e.jsxs("div",{className:"flex flex-row justify-between",children:[e.jsx("h3",{className:"text-lg font-bold text-gray-800",children:t.username}),t.sentiment=="positive"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}),t.sentiment=="negative"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}),t.sentiment=="neutral"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",children:"Neutral"})]}),e.jsx("p",{className:"mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500",children:t.date}),e.jsxs("p",{className:"mt-2 text-gray-500 line-clamp-3",children:[t.title??""," ",t.caption]}),t.platform=="Media Online"?e.jsxs(e.Fragment,{children:[e.jsxs("button",{"aria-haspopup":"dialog","aria-expanded":"false","aria-controls":`media-detail-${t.id}`,"data-hs-overlay":`#media-detail-${t.id}`,className:"mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:["Open",e.jsx(l,{icon:"fluent:open-12-regular"})]}),e.jsx("div",{id:`media-detail-${t.id}`,className:"hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none",role:"dialog",tabIndex:-1,"aria-labelledby":"hs-large-modal-label",children:e.jsx("div",{className:"hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto",children:e.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70",children:[e.jsxs("div",{className:"flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700",children:[e.jsx("h3",{id:"hs-large-modal-label",className:"font-bold text-gray-800 dark:text-white",children:t.title}),e.jsxs("button",{type:"button",className:"size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600","aria-label":"Close","data-hs-overlay":`#media-detail-${t.id}`,children:[e.jsx("span",{className:"sr-only",children:"Close"}),e.jsxs("svg",{className:"shrink-0 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",children:[e.jsx("path",{d:"M18 6 6 18"}),e.jsx("path",{d:"m6 6 12 12"})]})]})]}),e.jsxs("div",{className:"p-4 overflow-y-auto",children:[e.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Open Link"}),e.jsx("a",{href:t.url,target:"_blank",className:"text-blue-500",children:"Open"})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Media"}),e.jsx("p",{children:t.username})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Date"}),e.jsx("p",{children:t.date})]}),e.jsxs("div",{children:[e.jsx("p",{className:"font-bold",children:"Sentiment"}),t.sentiment=="positive"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}),t.sentiment=="negative"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}),t.sentiment=="neutral"&&e.jsx("span",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white",children:"Neutral"})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[e.jsxs("div",{children:[e.jsx("p",{children:"PR Value"}),e.jsx("p",{children:t.pr_value})]}),e.jsxs("div",{children:[e.jsx("p",{children:"Ad Value"}),e.jsx("p",{children:t.ad_value})]}),e.jsxs("div",{children:[e.jsx("p",{children:"Viewership"}),e.jsx("p",{children:t.viewership})]})]}),e.jsx("hr",{}),e.jsxs("div",{className:"grid grid-cols-3 mx-3 my-5",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Reporters"}),e.jsx("p",{children:t.journalist})]}),e.jsxs("div",{children:[e.jsx("p",{children:"Spoke Person"}),e.jsx("p",{children:t.spookerperson})]})]}),e.jsx("div",{className:"text-center mt-2",children:e.jsx("img",{src:t.images,alt:t.title,className:"max-h-[250px] mx-auto"})}),e.jsx("p",{className:"mt-2 text-gray-800 dark:text-neutral-400",children:t.caption})]})]})})})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center gap-6 mb-1 text-gray-600",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx(l,{icon:"solar:heart-broken"}),e.jsx("span",{children:t.likes??0})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(l,{icon:"fa-regular:comments"}),e.jsx("span",{children:t.comments??0})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(l,{icon:"fluent-mdl2:view"}),e.jsx("span",{children:t.views??0})]})]}),e.jsxs("a",{className:"mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none",href:t.url,target:"_blank",children:["Open",e.jsx(l,{icon:"fluent:open-12-regular"})]})]})]})]})},a)),e.jsx("div",{className:"mt-4",children:e.jsxs("nav",{className:"flex items-center gap-x-1","aria-label":"Pagination",children:[s.data.links[0]&&e.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Previous",disabled:s.data.links[0].url==null,onClick:t=>{i.get(s.data.links[0].url)},children:[e.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m15 18-6-6 6-6"})}),e.jsx("span",{children:"Previous"})]}),e.jsx("div",{className:"flex items-center gap-x-1",children:s.data.links.slice(1,-1).map((t,a)=>t.active?e.jsx("button",{type:"button",onClick:c=>{i.get(t.url)},className:"min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none","aria-current":"page",children:t.label},a):e.jsx("button",{type:"button",onClick:c=>{i.get(t.url)},className:"min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10",children:t.label},a))}),s.data.links.length>10&&s.data.links[s.data.links.length-1]&&e.jsxs("button",{type:"button",className:"min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none","aria-label":"Next",onClick:t=>{i.get(s.data.links[s.data.links.length-1].url)},disabled:s.data.links[s.data.links.length-1].url==null,children:[e.jsx("span",{children:"Next"}),e.jsx("svg",{className:"shrink-0 size-3.5",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m9 18 6-6-6-6"})})]})]})})]}):e.jsx("div",{className:"col-span-2 grid grid-cols-1 gap-5",children:e.jsx("div",{className:"flex flex-col items-center justify-center",children:e.jsx("h1",{children:"Currently, There's no data to display"})})}),e.jsx("div",{children:e.jsxs("div",{className:"flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"input-label",className:"block text-sm font-medium mb-2 dark:text-white",children:"Target"}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{"data-hs-select":`{
                              "placeholder": "Select Target...",
                              "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\\"flex justify-between items-center w-full\\"><span data-title></span><span className=\\"hidden hs-selected:block\\"></span></div>"
                            }`,onChange:t=>{b(t.target.value)},value:h,children:[e.jsx("option",{value:"",children:"Select Target"}),s.target.map((t,a)=>e.jsx("option",{value:t.id,children:t.name},a))]}),e.jsx("div",{className:"absolute top-1/2 end-2.5 -translate-y-1/2",children:e.jsxs("svg",{className:"shrink-0 size-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"m7 15 5 5 5-5"}),e.jsx("path",{d:"m7 9 5-5 5 5"})]})})]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:"Platforms"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:s.platforms.map((t,a)=>e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"checkbox",value:t.id,checked:m.includes(t.id),onChange:j,className:"shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",id:`platforms-${t.id}`}),e.jsx("label",{htmlFor:`platforms-${t.id}`,className:"text-sm text-gray-500 ms-3 dark:text-neutral-400",children:t.name})]},a))})]})]})})]})]})}export{T as default};
