import{r as o,R as e}from"./app-BSqDKYqK.js";const C=["blue","orange","yellow","red","purple","amber","lime","green","emerald","teal","cyan","sky","violet","indigo","purple","fuchsia","pink","rose"],x="blue",p={bg:{blue:"bg-blue-500",orange:"bg-orange-500",yellow:"bg-yellow-500",red:"bg-red-500",purple:"bg-purple-500",amber:"bg-amber-500",lime:"bg-lime-500",green:"bg-green-500",emerald:"bg-emerald-500",teal:"bg-teal-500",cyan:"bg-cyan-500",sky:"bg-sky-500",indigo:"bg-indigo-500",violet:"bg-violet-500",fuchsia:"bg-fuchsia-500",pink:"bg-pink-500",rose:"bg-rose-500"},bgHover:{blue:"hover:bg-blue-100",orange:"hover:bg-orange-100",yellow:"hover:bg-yellow-100",red:"hover:bg-red-100",purple:"hover:bg-purple-100",amber:"hover:bg-amber-100",lime:"hover:bg-lime-100",green:"hover:bg-green-100",emerald:"hover:bg-emerald-100",teal:"hover:bg-teal-100",cyan:"hover:bg-cyan-100",sky:"hover:bg-sky-100",indigo:"hover:bg-indigo-100",violet:"hover:bg-violet-100",fuchsia:"hover:bg-fuchsia-100",pink:"hover:bg-pink-100",rose:"hover:bg-rose-100"},ring:{blue:"focus:ring-blue-500/20",orange:"focus:ring-orange-500/20",yellow:"focus:ring-yellow-500/20",red:"focus:ring-red-500/20",purple:"focus:ring-purple-500/20",amber:"focus:ring-amber-500/20",lime:"focus:ring-lime-500/20",green:"focus:ring-green-500/20",emerald:"focus:ring-emerald-500/20",teal:"focus:ring-teal-500/20",cyan:"focus:ring-cyan-500/20",sky:"focus:ring-sky-500/20",indigo:"focus:ring-indigo-500/20",violet:"focus:ring-violet-500/20",fuchsia:"focus:ring-fuchsia-500/20",pink:"focus:ring-pink-500/20",rose:"focus:ring-rose-500/20"},borderFocus:{blue:"focus:border-blue-500",orange:"focus:border-orange-500",yellow:"focus:border-yellow-500",red:"focus:border-red-500",purple:"focus:border-purple-500",amber:"focus:border-amber-500",lime:"focus:border-lime-500",green:"focus:border-green-500",emerald:"focus:border-emerald-500",teal:"focus:border-teal-500",cyan:"focus:border-cyan-500",sky:"focus:border-sky-500",indigo:"focus:border-indigo-500",violet:"focus:border-violet-500",fuchsia:"focus:border-fuchsia-500",pink:"focus:border-pink-500",rose:"focus:border-rose-500"},text:{blue:"text-blue-500",orange:"text-orange-500",yellow:"text-yellow-500",red:"text-red-500",purple:"text-purple-500",amber:"text-amber-500",lime:"text-lime-500",green:"text-green-500",emerald:"text-emerald-500",teal:"text-teal-500",cyan:"text-cyan-500",sky:"text-sky-500",indigo:"text-indigo-500",violet:"text-violet-500",fuchsia:"text-fuchsia-500",pink:"text-pink-500",rose:"text-rose-500"},textHover:{blue:"hover:text-blue-500",orange:"hover:text-orange-500",yellow:"hover:text-yellow-500",red:"hover:text-red-500",purple:"hover:text-purple-500",amber:"hover:text-amber-500",lime:"hover:text-lime-500",green:"hover:text-green-500",emerald:"hover:text-emerald-500",teal:"hover:text-teal-500",cyan:"hover:text-cyan-500",sky:"hover:text-sky-500",indigo:"hover:text-indigo-500",violet:"hover:text-violet-500",fuchsia:"hover:text-fuchsia-500",pink:"hover:text-pink-500",rose:"hover:text-rose-500"}};function J(r,t){o.useEffect(()=>{const n=s=>{!r.current||r.current.contains(s.target)||t(s)};return document.addEventListener("mousedown",n),document.addEventListener("touchstart",n),()=>{document.removeEventListener("mousedown",n),document.removeEventListener("touchstart",n)}},[r,t])}const B=({className:r=""})=>e.createElement("svg",{className:r,fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})),Q=({className:r=""})=>e.createElement("svg",{className:r,fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})),X=({className:r=""})=>e.createElement("svg",{className:r,fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},e.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"})),I=o.createContext({value:null,handleValueChange:r=>{console.log("selected:",r)},formatGroupLabel:null,formatOptionLabel:null,classNames:void 0}),G=()=>o.useContext(I),Y=({value:r,handleValueChange:t,otherData:n,children:s})=>{const d=o.useMemo(()=>({value:r,handleValueChange:t,formatGroupLabel:n&&typeof n.formatGroupLabel=="function"?n.formatGroupLabel:null,formatOptionLabel:n&&typeof n.formatOptionLabel=="function"?n.formatOptionLabel:null,classNames:(n==null?void 0:n.classNames)||void 0}),[t,n,r]);return e.createElement(I.Provider,{value:d},s)},M=({children:r})=>{const{classNames:t}=o.useContext(I);return e.createElement("div",{className:t&&t.listDisabledItem?t.listDisabledItem:"px-2 py-2 cursor-not-allowed truncate text-gray-400 select-none"},r)},T=({item:r,primaryColor:t})=>{const{classNames:n,value:s,handleValueChange:d,formatOptionLabel:v}=G(),c=o.useMemo(()=>s!==null&&!Array.isArray(s)&&s.value===r.value,[r.value,s]),w=o.useMemo(()=>C.includes(t)?p.textHover[t]:p.textHover[x],[t]),y=o.useMemo(()=>C.includes(t)?p.bg[t]:p.bg[x],[t]),u=o.useMemo(()=>C.includes(t)?p.bgHover[t]:p.bgHover[x],[t]),f=o.useCallback(()=>{const b="block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded",g=c?`text-white ${y}`:`text-gray-500 ${u} ${w}`;return n&&n.listItem?n.listItem({isSelected:c}):`${b} ${g}`},[y,u,n,c,w]);return e.createElement(e.Fragment,null,v?e.createElement("div",{onClick:()=>d(r)},v({...r,isSelected:c})):e.createElement(e.Fragment,null,r.disabled?e.createElement(M,null,r.label):e.createElement("li",{"aria-selected":c,role:"option",onClick:()=>d(r),className:f()},r.label)))},Z=({item:r,primaryColor:t})=>{const{classNames:n,formatGroupLabel:s}=G();return e.createElement(e.Fragment,null,r.options.length>0&&e.createElement(e.Fragment,null,s?e.createElement(e.Fragment,null,s(r)):e.createElement("div",{className:n!=null&&n.listGroupLabel?n.listGroupLabel:"pr-2 py-2 cursor-default select-none truncate font-bold text-gray-700"},r.label),r.options.map((d,v)=>e.createElement(T,{primaryColor:t,key:v,item:d}))))},N=({list:r,noOptionsMessage:t,text:n,isMultiple:s,value:d,primaryColor:v=x})=>{const{classNames:c}=o.useContext(I),w=o.useCallback(()=>{const f=g=>g.label.toLowerCase().indexOf(n.toLowerCase())>-1;let b=r.map(g=>"options"in g?{label:g.label,options:g.options.filter(f)}:g);return b=b.filter(g=>"options"in g?g.options.length>0:f(g)),b},[n,r]),y=o.useCallback(f=>{if(!s)return f;if(Array.isArray(d)){const b=d.map(m=>m.value),g=m=>!b.includes(m.value);let h=f.map(m=>"options"in m?{label:m.label,options:m.options.filter(g)}:m);return h=h.filter(m=>"options"in m?m.options.length>0:g(m)),h}return f},[s,d]),u=o.useMemo(()=>y(w()),[w,y]);return e.createElement("div",{role:"options",className:c&&c.list?c.list:"max-h-72 overflow-y-auto"},u.map((f,b)=>e.createElement(e.Fragment,{key:b},"options"in f?e.createElement(e.Fragment,null,e.createElement("div",{className:"px-2.5"},e.createElement(Z,{primaryColor:v||x,item:f})),b+1<u.length&&e.createElement("hr",{className:"my-1"})):e.createElement("div",{className:"px-2.5"},e.createElement(T,{primaryColor:v||x,item:f})))),u.length===0&&e.createElement(M,null,t))},D=o.forwardRef(function({placeholder:t="",value:n="",onChange:s,name:d=""},v){const{classNames:c}=o.useContext(I);return e.createElement("div",{className:c&&c.searchContainer?c.searchContainer:"relative py-1 px-2.5"},e.createElement(X,{className:c&&c.searchIcon?c.searchIcon:"absolute w-5 h-5 mt-2.5 pb-0.5 ml-2 text-gray-500"}),e.createElement("input",{ref:v,className:c&&c.searchBox?c.searchBox:"w-full py-2 pl-8 text-sm text-gray-500 bg-gray-100 border border-gray-200 rounded focus:border-gray-200 focus:ring-0 focus:outline-none",type:"text",placeholder:t,value:n,onChange:s,name:d}))}),ee=({primaryColor:r=x})=>{const t=o.useMemo(()=>C.includes(r)?p.text[r]:p.text[x],[r]);return e.createElement("svg",{className:`animate-spin mr-0.5 h-5 w-5 ${t}`,xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24"},e.createElement("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.createElement("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"}))},re=({options:r=[],value:t=null,onChange:n,onSearchInputChange:s,placeholder:d="Select...",searchInputPlaceholder:v="Search...",isMultiple:c=!1,isClearable:w=!1,isSearchable:y=!1,isDisabled:u=!1,loading:f=!1,menuIsOpen:b=!1,noOptionsMessage:g="No options found",primaryColor:h=x,formatGroupLabel:m=null,formatOptionLabel:V=null,classNames:l})=>{const[E,O]=o.useState(b),[z,P]=o.useState(r),[F,$]=o.useState(""),R=o.useRef(null),H=o.useRef(null);o.useEffect(()=>{const a=i=>"disabled"in i?i:{...i,disabled:!1};P(r.map(i=>"options"in i?{label:i.label,options:i.options.map(a)}:a(i)))},[r]),o.useEffect(()=>{var a;y&&(E?(a=H.current)==null||a.select():$(""))},[E,y]);const L=o.useCallback(()=>{u||O(!E)},[u,E]),A=o.useCallback(()=>{E&&O(!1)},[E]);J(R,()=>{A()});const W=o.useCallback(a=>{a.preventDefault(),(a.code==="Enter"||a.code==="Space")&&!u&&L()},[u,L]),_=o.useCallback(a=>{function i(){!c&&!Array.isArray(t)&&(A(),n(a)),c&&(Array.isArray(t)||t===null)&&n(t===null?[a]:[...t,a])}a!==t&&i()},[A,c,n,t]),j=o.useCallback(a=>{a.stopPropagation(),n(null)},[n]),K=o.useCallback((a,i)=>{if(c&&Array.isArray(t)&&t.length){a.stopPropagation();const k=t.filter(S=>i.value!==S.value);n(k.length?k:null)}},[c,n,t]),U=o.useCallback(()=>{let a=p.ring[x];C.includes(h)&&(a=p.ring[h]);let i=p.borderFocus[x];C.includes(h)&&(i=p.borderFocus[h]);const S=`flex text-sm text-gray-500 border border-gray-300 rounded shadow-sm transition-all duration-300 focus:outline-none ${u?"bg-gray-200":`bg-white hover:border-gray-400 ${i} focus:ring ${a}`}`;return l&&l.menuButton?l.menuButton({isDisabled:u}):S},[l,u,h]),q=o.useCallback(a=>{const i="bg-gray-200 border rounded-sm flex space-x-1",k=u?"border-gray-500 px-1":"pl-1";return l!=null&&l.tagItem?l.tagItem({item:a,isDisabled:u}):`${i} ${k}`},[l,u]);return e.createElement(Y,{otherData:{formatGroupLabel:m,formatOptionLabel:V,classNames:l},value:t,handleValueChange:_},e.createElement("div",{className:"relative w-full",ref:R},e.createElement("div",{tabIndex:0,"aria-expanded":E,onKeyDown:W,onClick:L,className:U()},e.createElement("div",{className:"grow pl-2.5 py-2 pr-2 flex flex-wrap gap-1"},c?e.createElement(e.Fragment,null,t===null&&d,Array.isArray(t)&&t.map((a,i)=>e.createElement("div",{className:q(a),key:i},e.createElement("p",{className:l!=null&&l.tagItemText?l.tagItemText:"text-gray-600 truncate cursor-default select-none"},a.label),!u&&e.createElement("div",{onClick:k=>K(k,a),className:l!=null&&l.tagItemIconContainer?l.tagItemIconContainer:"flex items-center px-1 cursor-pointer rounded-r-sm hover:bg-red-200 hover:text-red-600"},e.createElement(B,{className:l!=null&&l.tagItemIcon?l.tagItemIcon:"w-3 h-3 mt-0.5"}))))):e.createElement("p",{className:"truncate cursor-default select-none"},t&&!Array.isArray(t)?t.label:d)),e.createElement("div",{className:"flex flex-none items-center py-1.5"},f&&e.createElement("div",{className:"px-1.5"},e.createElement(ee,{primaryColor:h})),w&&!u&&t!==null&&e.createElement("div",{className:"px-1.5 cursor-pointer",onClick:j},e.createElement(B,{className:l!=null&&l.closeIcon?l.closeIcon:"w-5 h-5 p-0.5"})),e.createElement("div",{className:"h-full"},e.createElement("span",{className:"w-px h-full inline-block text-white bg-gray-300 text-opacity-0"})),e.createElement("div",{className:"px-1.5"},e.createElement(Q,{className:`transition duration-300 w-6 h-6 p-0.5${E?" transform rotate-90 text-gray-500":" text-gray-300"}`})))),E&&!u&&e.createElement("div",{tabIndex:-1,className:l!=null&&l.menu?l.menu:"absolute z-10 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700"},y&&e.createElement(D,{ref:H,value:F,placeholder:v,onChange:a=>{s&&typeof s=="function"&&s(a),$(a.target.value)}}),e.createElement(N,{list:z,noOptionsMessage:g,text:F,isMultiple:c,value:t,primaryColor:h||x}))))};export{re as S};
