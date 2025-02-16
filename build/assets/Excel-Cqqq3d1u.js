import{K as O,r as a,S as A,j as e,L as I}from"./app-C8AXvdnH.js";import{A as U,L as q,I as h,y as W,l as $}from"./AdminLayout-CNfDECeP.js";import{h as g}from"./Permission-Bdg5XIz4.js";import{d as l,D as H}from"./index.esm-VrfeCt1H.js";function X(n){var _,M;const{props:{urls:f}}=O(),[o,L]=a.useState({startDate:l().subtract(7,"days").toDate(),endDate:l().toDate()}),[d,N]=a.useState(((_=f.query)==null?void 0:_.source)??"News"),[i,T]=a.useState(f.query.target),[c,E]=a.useState(((M=f.query)==null?void 0:M.sentiment)??""),[x,k]=a.useState(1),b=10,[y,D]=a.useState("desc"),[w,C]=a.useState("media_news.date"),r=n.result,j=Math.ceil(r&&r.length/b),u=r&&r.length>0&&r.slice((x-1)*b,x*b),[z,S]=a.useState(!1),v=a.useRef(null),[m,F]=a.useState([]);function R(s){C(`${s}`),D(t=>t==="asc"?"desc":"asc")}function B(s){const t=Number(s.target.value);F(p=>s.target.checked?[...p,t]:p.filter(Y=>Y!==t))}a.useEffect(()=>{function s(t){v.current&&!v.current.contains(t.target)&&S(!1)}return document.addEventListener("mousedown",s),()=>document.removeEventListener("mousedown",s)},[]);function P(s){const t=route("excel.export",{start_date:l(o.startDate).format("YYYY-MM-DD"),end_date:l(o.endDate).format("YYYY-MM-DD"),source:d,target:i!=="all"?i:"",sentiment:c!=="all"?c:"",platforms:m.join(","),sort_by:y,sort_column:w,format:s});window.open(t,"_blank")}return a.useEffect(()=>{F([]),D("desc"),C("date")},[d]),a.useEffect(()=>{A.get(route("excel.index"),{start_date:l(o.startDate).format("YYYY-MM-DD"),end_date:l(o.endDate).format("YYYY-MM-DD"),source:d,target:i!=="all"?i:"",sentiment:c!=="all"?c:"",platforms:m.join(","),sort_by:y,sort_column:w},{preserveState:!0,preserveScroll:!0})},[o,d,i,c,m,y,w]),e.jsxs(U,{children:[e.jsx(q,{"aria-label":""}),e.jsx(I,{title:"Reporting"}),e.jsxs("div",{className:"flex flex-row items-center justify-between",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Reporting"}),e.jsxs("div",{className:"flex flex-row gap-4 items-center",children:[e.jsxs("div",{className:"hs-dropdown relative inline-flex",children:[e.jsxs("button",{id:"hs-dropdown-default",type:"button",className:"hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer","aria-haspopup":"menu","aria-expanded":"false","aria-label":"Dropdown",children:[d,e.jsx("svg",{className:"hs-dropdown-open:rotate-180 size-4",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"m6 9 6 6 6-6"})})]}),e.jsx("div",{className:"z-10 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full",role:"menu","aria-orientation":"vertical","aria-labelledby":"hs-dropdown-default",children:e.jsxs("div",{className:"p-1 space-y-0.5",children:[(g("User Media")||g("User Media Sosmed"))&&e.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{N("News")},children:"News"}),(g("User Sosmed")||g("User Media Sosmed"))&&e.jsx("a",{className:"flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100",onClick:()=>{N("Social Media")},children:"Social Media"})]})})]}),e.jsx("div",{children:e.jsxs("div",{className:"relative",children:[e.jsxs("select",{"data-hs-select":`{
                              "placeholder": "Select Target...",
                              "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\\"flex justify-between items-center w-full\\"><span data-title></span><span className=\\"hidden hs-selected:block\\"></span></div>"
                            }`,onChange:s=>{T(s.target.value)},value:i,children:[e.jsx("option",{value:"all",children:"All Target"}),n.targets.map((s,t)=>e.jsx("option",{value:s.id,children:s.name},t))]}),e.jsx("div",{className:"absolute top-1/2 end-2.5 -translate-y-1/2",children:e.jsxs("svg",{className:"shrink-0 size-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"m7 15 5 5 5-5"}),e.jsx("path",{d:"m7 9 5-5 5 5"})]})})]})}),e.jsxs("div",{className:"relative",children:[e.jsxs("select",{"data-hs-select":`{
                              "placeholder": "Select Sentiment...",
                              "toggleTag": "<button type=\\"button\\" aria-expanded=\\"false\\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\\"flex justify-between items-center w-full\\"><span data-title></span><span className=\\"hidden hs-selected:block\\"></span></div>"
                            }`,onChange:s=>{E(s.target.value)},value:c,children:[e.jsx("option",{value:"all",children:"All Sentiment"}),e.jsx("option",{value:"positive",children:"Positive"}),e.jsx("option",{value:"neutral",children:"Neutral"}),e.jsx("option",{value:"negative",children:"Negative"})]}),e.jsx("div",{className:"absolute top-1/2 end-2.5 -translate-y-1/2",children:e.jsxs("svg",{className:"shrink-0 size-4 text-gray-500",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"m7 15 5 5 5-5"}),e.jsx("path",{d:"m7 9 5-5 5 5"})]})})]}),e.jsx("div",{className:"w-[300px]",children:e.jsx(H,{showShortcuts:!0,showFooter:!0,primaryColor:"blue",value:o,onChange:s=>{if(s!=null){const t=l(s.startDate),p=l(s.endDate);p.diff(t,"day")>30?alert("The maximum allowed date range is 30 days."):L({startDate:t.toDate(),endDate:p.toDate()})}}})}),e.jsxs("div",{className:"relative",ref:v,children:[e.jsx("button",{className:"px-4 py-2 rounded-md shadow-md flex items-center border",onClick:()=>S(s=>!s),children:"Platform"}),z&&e.jsx("div",{className:"absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md py-2 border z-50",children:e.jsxs("div",{className:"p-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2 dark:text-white",children:"Platforms"}),e.jsx("div",{className:"grid grid-cols-2 gap-2",children:n.platforms.map((s,t)=>e.jsxs("div",{className:"flex",children:[e.jsx("input",{type:"checkbox",value:s.id,checked:m.includes(s.id),onChange:B,className:"shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800",id:`platforms-${s.id}`}),e.jsx("label",{htmlFor:`platforms-${s.id}`,className:"text-sm text-gray-500 ms-3 dark:text-neutral-400",children:s.name})]},t))})]})})]}),e.jsxs("button",{className:"px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white cursor-pointer disabled:bg-slate-300",disabled:n.result.length<=0,onClick:()=>P("csv"),children:[e.jsx(h,{icon:"material-symbols:csv",className:"mr-2",color:"#FFFFFF"}),"CSV"]}),e.jsxs("button",{className:"px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white cursor-pointer disabled:bg-slate-300",disabled:n.result.length<=0,onClick:()=>P("xlsx"),children:[e.jsx(h,{icon:"fa-solid:file-excel",className:"mr-2",color:"#FFFFFF"}),"Excel"]}),e.jsxs("button",{className:"px-4 py-2  rounded-md shadow-md flex items-center bg-red-500 text-white cursor-pointer disabled:bg-slate-300",disabled:n.result.length<=0,onClick:()=>W("Feature is under development !",{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!1,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:$,type:"error"}),children:[e.jsx(h,{icon:"material-symbols:picture-as-pdf",className:"mr-2",color:"#FFFFFF"}),"PDF"]})]})]}),n.result.length>0?e.jsxs("div",{className:"flex flex-col",children:[e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"w-full text-sm text-left relative",children:[e.jsx("thead",{className:"bg-gray-50 text-xs text-gray-700 border-b",children:e.jsx("tr",{children:r&&r.length>0&&Object.keys(r[0]).map((s,t)=>e.jsx("th",{scope:"col",className:"px-6 py-3 font-medium text-left whitespace-nowrap cursor-pointer",onClick:()=>R(s),children:e.jsxs("div",{className:"flex flex-row items-center",children:[e.jsx("p",{children:s}),e.jsx(h,{icon:"solar:sort-vertical-outline",className:"ml-2"})]})},t))})}),d==="News"?e.jsx("tbody",{children:u.length>0&&u.map((s,t)=>e.jsxs("tr",{className:(t%2===0,"border-b text-gray-900"),children:[e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.date}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.target_type}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.user_target}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.title&&s.title.length>30?s.title.slice(0,30)+"...":s.title}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.source&&s.source.length>10?s.source.slice(0,10)+"...":s.source}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:e.jsxs("a",{href:s.url,target:"_blank",className:"text-blue-500 underline",children:[s.url.slice(0,20),"..."]})}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.tier}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.sentiment==="positive"?e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}):s.sentiment==="negative"?e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}):e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-300 text-black border",children:"Neutral"})}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.summary&&s.summary.length>30?s.summary.slice(0,30)+"...":s.summary}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.spookerperson&&s.spookerperson.length>30?s.spookerperson.slice(0,30)+"...":s.spookerperson}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.journalist}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.ad}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.pr}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.viewership})]},t))}):e.jsx("tbody",{children:u.length>0&&u.map((s,t)=>e.jsxs("tr",{className:(t%2===0,"border-b text-gray-900"),children:[e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.date}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.target_name}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.user_target_name}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.caption&&s.caption.length>30?s.caption.slice(0,30)+"...":s.caption}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.username}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.hashtags&&s.hashtags.length>30?s.hashtags.slice(0,30)+"...":s.hashtags}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.likes}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.comments}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.views}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:e.jsxs("a",{href:s.url,target:"_blank",className:"text-blue-500 underline",children:[s.url.slice(0,20),"..."]})}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.sentiment==="positive"?e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white",children:"Positive"}):s.sentiment==="negative"?e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white",children:"Negative"}):e.jsx("div",{className:"inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-300 text-black border",children:"Neutral"})}),e.jsx("td",{className:"px-6 py-4 max-w-[200px]",children:s.name})]},t))})]})}),e.jsxs("div",{className:"flex justify-end items-center space-x-2 mt-4",children:[e.jsx("button",{onClick:()=>k(s=>Math.max(s-1,1)),disabled:x===1,className:"px-4 py-2  rounded-md shadow-md flex items-center",children:"Prev"}),e.jsxs("span",{className:"px-4 py-2 font-medium text-gray-700",children:["Page ",x," of ",j]}),e.jsx("button",{onClick:()=>k(s=>Math.min(s+1,j)),disabled:x===j,className:"px-4 py-2  rounded-md shadow-md flex items-center",children:"Next"})]})]}):e.jsx("div",{className:"flex flex-col items-center justify-center border shadow-sm rounded-xl p-4 md:p-5 min-h-96",children:e.jsxs("h1",{children:["Currently, There's no ",e.jsx("span",{className:"font-semibold",children:"Report"})," data to display"]})})]})}export{X as default};
