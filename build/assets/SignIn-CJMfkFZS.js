import{m as t,K as i,R as n,j as e,L as o}from"./app-DmHnhfl3.js";function c(){var l;const s=t({username:"",password:""}),{props:a}=i(),d=n.useCallback(r=>{r.preventDefault(),s.post("signin")},[s]);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Sign In"}),e.jsx("div",{className:"flex h-[100vh] items-center py-16",children:e.jsx("div",{className:"w-full max-w-md mx-auto p-6",children:e.jsx("div",{className:"mt-7 bg-white border border-gray-200 rounded-xl shadow-sm",children:e.jsxs("div",{className:"p-4 sm:p-7",children:[e.jsx("div",{className:"text-center",children:e.jsx("h1",{className:"block text-2xl font-bold text-gray-800",children:"Sign in"})}),((l=a.flash)==null?void 0:l.message)&&e.jsx("div",{className:"mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500",role:"alert","aria-labelledby":"hs-soft-color-danger-label",children:a.flash.message}),e.jsx("div",{className:"mt-5",children:e.jsx("form",{onSubmit:d,children:e.jsxs("div",{className:"grid gap-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm mb-2",children:"Username"}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",value:s.data.username,onChange:r=>s.setData("username",r.target.value),className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",required:!0,"aria-describedby":"email-error"}),e.jsx("div",{className:"hidden absolute inset-y-0 end-0 pointer-events-none pe-3",children:e.jsx("svg",{className:"size-5 text-red-500",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})})})]}),s.errors.username&&e.jsx("p",{className:"hidden text-xs text-red-600 mt-2",id:"email-error",children:s.errors.username})]}),e.jsxs("div",{children:[e.jsx("div",{className:"flex justify-between items-center",children:e.jsx("label",{htmlFor:"password",className:"block text-sm mb-2",children:"Password"})}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"password",value:s.data.password,onChange:r=>s.setData("password",r.target.value),className:"py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",required:!0,"aria-describedby":"password-error"}),e.jsx("div",{className:"hidden absolute inset-y-0 end-0 pointer-events-none pe-3",children:e.jsx("svg",{className:"size-5 text-red-500",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16","aria-hidden":"true",children:e.jsx("path",{d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"})})})]}),s.errors.password&&e.jsx("p",{className:"hidden text-xs text-red-600 mt-2",id:"password-error",children:s.errors.password})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:"flex",children:e.jsx("input",{id:"remember-me",name:"remember-me",type:"checkbox",className:"shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"})}),e.jsx("div",{className:"ms-3",children:e.jsx("label",{htmlFor:"remember-me",className:"text-sm",children:"Remember me"})})]}),e.jsx("button",{type:"submit",className:"w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",children:"Sign in"})]})})})]})})})})]})}export{c as default};
