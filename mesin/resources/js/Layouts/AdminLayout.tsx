import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import {ToastContainer} from "react-toastify";

export default function (
    props: {
        children: React.ReactNode;
    }
) {

    return (
        <div>
            <ToastContainer aria-label=""/>
            <Navbar/>

            <div className="-mt-px">
                <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden">
                    <div className="flex items-center py-2">
                        <button type="button"
                                className="size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                                aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
                                aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                            <span className="sr-only">Toggle Navigation</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24"
                                 height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                 strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2"/>
                                <path d="M15 3v18"/>
                                <path d="m8 9 3 3-3 3"/>
                            </svg>
                        </button>

                        <ol className="ms-3 flex items-center whitespace-nowrap">
                            <li className="flex items-center text-sm text-gray-800">
                                Application Layout
                                <svg className="shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16"
                                     height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </li>
                            <li className="text-sm font-semibold text-gray-800 truncate" aria-current="page">
                                Dashboard
                            </li>
                        </ol>
                    </div>
                </div>
            </div>

            <Sidebar/>

            <div className="w-full lg:ps-64">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {props.children}
                </div>
            </div>
        </div>
    )
}
