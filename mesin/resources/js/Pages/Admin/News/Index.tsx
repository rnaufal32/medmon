import AdminLayout from "@/Layouts/AdminLayout";
import {useCallback, useState} from "react";
import dayjs from "dayjs";
import Datepicker from "react-tailwindcss-datepicker";
import {Icon} from "@iconify-icon/react";
import {Head, router, usePage} from "@inertiajs/react";
import {hookstate, useHookstate} from "@hookstate/core";
import Modal from "@/Components/Modal";
import {Bounce, toast, ToastContainer} from "react-toastify";
import NewsItem from "@/Pages/Admin/News/Widget/NewsItem";

const ImportNews = (params: any) => {

    // IMPORT
    const importForm = useHookstate({
        user: '',
    })

    return (
        <>
            <button type="button"
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal"
                    data-hs-overlay="#modal-import"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                <Icon icon='solar:upload-minimalistic-broken' height={22} width={22}/>
                Import
            </button>
            <Modal id='modal-import' title='Import News'>
                <div className='grid grid-cols-1 gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <select
                            value={importForm.user.get()}
                            onChange={(e) => importForm.user.set(e.target.value)}
                            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                            <option selected={true}>Select User</option>
                            {params.users.map((e: any, i: number) => (
                                <option key={i} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        <div>
                            <a href={route('news.import-sample', {
                                _query: {
                                    user: importForm.user.get(),
                                },
                            })}
                               target='_blank'
                               className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                                Download Sample
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="max-w-sm">
                            <label className="block">
                                <span className="sr-only">Choose file</span>
                                <input type="file"
                                       className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none "/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="button"
                                onClick={() => {
                                    toast('Feature is under development !', {
                                        position: "top-right",
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: false,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                        transition: Bounce,
                                        type: "error"
                                    })
                                }}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}


export default function (params: {
    news: any;
    users: any;
    last_update: any;
}) {
    const {props} = usePage()

    const user = useHookstate('')
    const page = useHookstate(1)
    const search = useHookstate('')
    const date = useHookstate({
        startDate: dayjs().subtract(7, 'days').toDate(),
        endDate: dayjs().toDate()
    });

    const refresh = useCallback(() => {
        router.get(route('news.index'), {
            page: page.get(),
            user: user.get(),
            search: search.get(),
            dateStart: date.startDate.get(),
            dateEnd: date.endDate.get(),
        }, {
            only: ['news'],
            preserveScroll: true,
            preserveState: true,
        })
    }, [user, date]);

    return (
        <AdminLayout>
            <Head title='News'/>
            <div className='grid grid-cols-1 gap-5'>
                <div className='grid grid-cols-2'>
                    <p className='text-xl font-bold'>News</p>
                    <p className='text-right'>Last Update : {params.last_update}</p>
                </div>

                <div className="flex flex-row gap-5">
                    <div className='w-full'>
                        <select data-hs-select='{
                        "placeholder": "Select User",
                        "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300",
                        "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50"
                        }' className="hidden"
                                value={user.get()}
                                onChange={(e) => {
                                    user.set(e.target.value);
                                    refresh();
                                }}>
                            <option value='' disabled={true}>Select User</option>
                            {params.users.map((e: any, i: number) => (
                                <option key={i} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-full'>
                        <Datepicker
                            primaryColor={"blue"}
                            value={date.get()}
                            onChange={(newValue) => {
                                if (newValue != null) {
                                    date.set({
                                        startDate: dayjs(newValue.startDate).toDate(),
                                        endDate: dayjs(newValue.endDate).toDate()
                                    });

                                    refresh()
                                }
                            }}
                        />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-5'>
                    <div className="w-full space-y-3">
                        <input type="text"
                               className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                               placeholder="Search News"/>
                    </div>
                    <div className='flex flex-row gap-5'>
                        <ImportNews users={params.users}/>
                        <a href={route('news.export', {
                            _query: {
                                user: user.get(),
                                dateStart: date.startDate.get(),
                                dateEnd: date.endDate.get(),
                            },
                        })} target={'_blank'}
                           className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                            <Icon icon='solar:download-minimalistic-broken' height={22} width={22}/>
                            Export
                        </a>
                        <button type="button"
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                            <Icon icon='prime:sync' height={22} width={22}/>
                            Crawling
                        </button>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg divide-y divide-gray-200">
                                <div className="overflow-hidden">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">User
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase max-w-[100px]">Target
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">News
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {params.news.data.length === 0 && (
                                            <tr className='text-center'>
                                                <td colSpan={8} height={100}>Empty</td>
                                            </tr>)}
                                        {params.news.data.map((news: any, index: number) => (
                                            <NewsItem key={index} item={news}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-6">
                                    <nav className="flex items-center gap-x-1" aria-label="Pagination">
                                        {params.news.links[0] && (
                                            <button type="button"
                                                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                    aria-label="Previous"
                                                    disabled={params.news.links[0].url == null}
                                                    onClick={(_) => {
                                                        if (page.get() > 0) {
                                                            page.set(page.get() - 1)
                                                            refresh()
                                                        }
                                                    }}>
                                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                                                     width="24"
                                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m15 18-6-6 6-6"></path>
                                                </svg>
                                                <span>Previous</span>
                                            </button>
                                        )}
                                        <div className="flex items-center gap-x-1">
                                            {params.news.links.slice(1, -1).map((e: any, i: number) => {
                                                if (e.active) {
                                                    return (
                                                        <button key={i}
                                                                type="button"
                                                                onClick={(_) => {
                                                                    page.set(e.label)
                                                                    refresh()
                                                                }}
                                                                className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none"
                                                                aria-current="page">{e.label}
                                                        </button>
                                                    )
                                                } else {
                                                    return (
                                                        <button type="button"
                                                                key={i}
                                                                onClick={(_) => {
                                                                    page.set(e.label)
                                                                    refresh()
                                                                }}
                                                                className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">{e.label}</button>
                                                    )
                                                }
                                            })}
                                        </div>
                                        {params.news.links.length > 10 && params.news.links[params.news.links.length - 1] && (
                                            <button type="button"
                                                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                    aria-label="Next"
                                                    onClick={(_) => {
                                                        page.set((prev) => prev + 1)
                                                        refresh()
                                                    }}
                                                    disabled={params.news.links[params.news.links.length - 1].url == null}>
                                                <span>Next</span>
                                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg"
                                                     width="24"
                                                     height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </button>
                                        )}
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
