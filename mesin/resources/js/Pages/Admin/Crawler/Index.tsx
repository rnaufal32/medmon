import AdminLayout from "@/Layouts/AdminLayout";
import {Head, router, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Icon} from "@iconify-icon/react";
import {useHookstate} from "@hookstate/core";
import Input from "@/Components/Input";

interface CrawlerProps extends PageProps {
    crawlers: any
}

export default function () {

    const props = usePage<CrawlerProps>().props

    const pageState = useHookstate(1)
    const searchState = useHookstate("")

    return (
        <AdminLayout>
            <Head title="Crawler"/>

            <div className="grid grid-cols-1 gap-4">
                <div className="">
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200">
                                        <div className="w-auto gap-3 flex flex-col">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                Crawler Detail
                                            </h2>
                                            <div className="w-full">
                                                <input type="search"
                                                       value={searchState.get()} onChange={(e) => {
                                                    searchState.set(e.target.value)
                                                }}
                                                       onKeyDown={(e) => {
                                                           if (e.key === 'Enter') {
                                                               pageState.set(1)
                                                               router.get(route('crawler.index', {
                                                                   _query: {
                                                                       page: pageState.get(),
                                                                       search: searchState.get()
                                                                   }
                                                               }), {}, {
                                                                   only: ['crawlers'],
                                                                   preserveScroll: true,
                                                                   preserveState: true,
                                                               })
                                                           }
                                                       }}
                                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                       placeholder="Search News"/>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                                   href="#">
                                                    View all
                                                </a>

                                                <a className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                                   href="#">
                                                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                                                         width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                         stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                         strokeLinejoin="round">
                                                        <path d="M5 12h14"/>
                                                        <path d="M12 5v14"/>
                                                    </svg>
                                                    Create
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50 divide-y divide-gray-200">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start border-s border-gray-200">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                Content
                                              </span>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                Avg. Session Duration
                                              </span>
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                        {props.crawlers.data.map((e: any) => (
                                            <tr key={e.id}>
                                                <td className="h-px ">
                                                    <div className='grid grid-cols-1 gap-1 px-4 py-2'>
                                                        <p className='line-clamp-2 font-bold'>{e.title}</p>
                                                        <div className='flex flex-row gap-6 text-xs'>
                                                            <div className='flex flex-row gap-1 items-center'>
                                                                <Icon icon='solar:calendar-broken'/>
                                                                <p>{e.created_at}</p>
                                                            </div>
                                                            <div
                                                                className='flex flex-row gap-1 items-center text-blue-500'>
                                                                <a href={e.url} target={'_blank'}>{e.url}</a>
                                                            </div>
                                                        </div>
                                                        <p className='text-sm line-clamp-2'>{e.description}</p>
                                                    </div>
                                                </td>
                                                <td className="h-px w-auto whitespace-nowrap">
                                                    <div className="px-6 py-2">
                                                        <span className="text-sm text-gray-800">00:00:16</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div
                                        className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold text-gray-800">9</span> results
                                            </p>
                                        </div>

                                        <div>
                                            <div className="inline-flex gap-x-2">
                                                <button type="button"
                                                        onClick={() => {
                                                            pageState.set((prev) => prev - 1)
                                                            router.get(route('crawler.index', {
                                                                _query: {
                                                                    page: pageState.get(),
                                                                }
                                                            }), {}, {
                                                                only: ['crawlers'],
                                                                preserveScroll: true,
                                                                preserveState: true,
                                                            })
                                                        }}
                                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                                    Prev
                                                </button>

                                                <button type="button"
                                                        onClick={() => {
                                                            pageState.set((prev) => prev + 1)
                                                            router.get(route('crawler.index', {
                                                                _query: {
                                                                    page: pageState.get(),
                                                                }
                                                            }), {}, {
                                                                only: ['crawlers'],
                                                                preserveScroll: true,
                                                                preserveState: true,
                                                            })
                                                        }}
                                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
