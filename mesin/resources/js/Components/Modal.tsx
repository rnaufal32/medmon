import React from "react";

export default function (props: {
    id: string,
    children: React.ReactNode,
    footer?: React.ReactNode | undefined,
    title?: string | undefined,
}) {
    return (
        <div id={props.id}
             className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
             role="dialog" tabIndex={-1} aria-labelledby={`${props.id}-label`}>
            <div
                className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
                <div
                    className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div
                        className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                        {props.title && (
                            <h3 id={`${props.id}-label`} className="font-bold text-gray-800 dark:text-white">
                                {props.title}
                            </h3>)}
                        <button type="button"
                                className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                aria-label="Close" data-hs-overlay={`#${props.id}`}>
                            <span className="sr-only">Close</span>
                            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                 width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round">
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 overflow-y-auto">
                        {props.children}
                    </div>
                    {props.footer && (
                        <div
                            className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                            {props.footer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
