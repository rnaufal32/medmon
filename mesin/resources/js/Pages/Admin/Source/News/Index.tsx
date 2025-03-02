import AdminLayout from "@/Layouts/AdminLayout";
import {Head, router, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import Select from "react-tailwindcss-select";
import {State, useHookstate} from "@hookstate/core";
import {Option} from "react-tailwindcss-select/dist/components/type";
import Input from "@/Components/Input";
import NewsItem from "@/Pages/Admin/News/Widget/NewsItem";
import {useCallback} from "react";
import dayjs from "dayjs";
import {MySwal} from "@/Components/Swal";

interface SourceNewsProps extends PageProps {
    users: {
        id: number,
        name: string,
    }[],
    user_value?: {
        id: number,
        tier: number,
        ad: number,
        pr: number,
    }[],
    news_sources: {
        data: {
            id: number,
            name: string,
            site: string,
            tier: number,
        }[],
        links: any[],
    },
}

export default function () {

    const props = usePage<SourceNewsProps>().props
    const userState: State<any> = useHookstate({})
    const page = useHookstate(1)
    const isLoading = useHookstate(false)

    const refresh = useCallback(() => {
        router.get(route('source.news', {
            _query: {
                page: page.get(),
                'user': userState.get().value ?? null,
            }
        }), {}, {
            only: ['news_sources', 'user_value'],
            preserveScroll: true,
            preserveState: true,
        })
    }, [page, userState]);

    return (
        <AdminLayout>
            <Head title="News Source"/>

            <div className="grid grid-cols-1 gap-4">
                <div className="gap-4 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5 grid grid-cols-1">
                    <div className='w-full'>
                        <label className="block text-sm font-medium mb-2">Select User</label>
                        <Select options={props.users.map((e) => ({
                            'label': e.name,
                            'value': `${e.id}`,
                        }))} value={userState.get()} onChange={(e: any) => {
                            if (e != null) {
                                userState.set(e)
                                refresh()
                            }
                        }} primaryColor={'#000'}/>
                    </div>
                    {props.user_value?.map((e) => (
                        <div className="grid grid-cols-3 gap-4" key={e.id}>
                            <div>
                                <label className="block text-sm font-medium mb-2">Tier</label>
                                <Input type='text' value={`${e.tier}`} onChange={(e) => {
                                }} placeholder="AD Value" disabled={true}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">AD Value</label>
                                <Input type='text' value={`${e.ad}`} onChange={(e) => {
                                }} placeholder="AD Value" disabled={true}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">PR Value</label>
                                <Input type='text' value={`${e.pr}`} onChange={(e) => {
                                }} placeholder="PR Value" disabled={true}/>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button type="button"
                                disabled={isLoading.get()}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            {isLoading.get() && (
                                <span
                                    className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                                    role="status" aria-label="loading">
                                    <span className="sr-only">Loading...</span>
                                  </span>
                            )} Submit
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
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase max-w-[100px]">Site
                                            </th>
                                            <th scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Tier
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                        {props.news_sources.data.map((e: any) => (
                                            <tr key={e.id}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{e.name}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{e.site}</td>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                                    <Select options={[
                                                        {'label': '1', 'value': '1'},
                                                        {'label': '2', 'value': '2'},
                                                        {'label': '3', 'value': '3'},
                                                    ]} value={{
                                                        'label': `${e.tier}`,
                                                        'value': `${e.tier}`,
                                                    }} onChange={(value: any) => {
                                                        MySwal.fire({
                                                            title: "Change tier source?",
                                                            text: `This change will affected to all news with same site. Can't be undone.`,
                                                            icon: "warning",
                                                            showCancelButton: true,
                                                            confirmButtonText: "Yes, change it!",
                                                            cancelButtonText: "No, cancel!",
                                                            confirmButtonColor: "danger"
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                MySwal.fire({
                                                                    title: "Updating",
                                                                    didOpen: (popup: HTMLElement) => {
                                                                        MySwal.showLoading()
                                                                    }
                                                                })

                                                                router.post(route('source.news.store'), {
                                                                    id: e.id,
                                                                    tier: value.value,
                                                                }, {
                                                                    onSuccess: ({props}) => {
                                                                        props.flash?.success && MySwal.fire({
                                                                            title: props.flash.success,
                                                                            icon: "success"
                                                                        })
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }} primaryColor={'#000'}/>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="py-6">
                                    <nav className="flex items-center gap-x-1" aria-label="Pagination">
                                        {props.news_sources.links[0] && (
                                            <button type="button"
                                                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                    aria-label="Previous"
                                                    disabled={props.news_sources.links[0].url == null}
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
                                            {props.news_sources.links.slice(1, -1).map((e: any, i: number) => {
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
                                        {props.news_sources.links.length > 10 && props.news_sources.links[props.news_sources.links.length - 1] && (
                                            <button type="button"
                                                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                                    aria-label="Next"
                                                    onClick={(_) => {
                                                        page.set((prev) => prev + 1)
                                                        refresh()
                                                    }}
                                                    disabled={props.news_sources.links[props.news_sources.links.length - 1].url == null}>
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
