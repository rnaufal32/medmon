import {Icon} from "@iconify-icon/react";
import dayjs from "dayjs";
import {State, useHookstate} from "@hookstate/core";
import Input from "@/Components/Input";
import {usePage, router} from "@inertiajs/react";
import Select from "react-tailwindcss-select";
import {Bounce, toast, ToastContainer} from "react-toastify";
import {Option} from "react-tailwindcss-select/dist/components/type";
import {PageProps} from "@/types";
import {HSOverlay} from "preline/preline"
import {MySwal} from "@/Components/Swal";

interface newsFormProps {
    title: string,
    date: string,
    target: string,
    target_id: Option,
    journalist: string,
    spookerperson: string,
    url: string,
    images: string,
    content: string,
    summary: string,
}

interface NewsProps extends PageProps {
    user_targets: Array<{
        id: number,
        username: string,
        name: string,
    }>
}

export default function (params: { item: any }) {
    const news = params.item
    const newsForm: State<newsFormProps> = useHookstate({
        ...news,
        target_id: {
            label: `${news.user_targets[0]?.user_target?.user?.name} - ${news.user_targets[0]?.user_target?.name}`,
            value: news.user_targets[0]?.user_target?.id,
            isSelected: true
        }
    } as newsFormProps)
    const {props} = usePage<NewsProps>()

    const targetOptions = props.user_targets.map((target: any) => {
        return {
            label: `${target.username} - ${target.name}`,
            value: target.id,
        }
    })

    const submit = () => {
        router.post(route('news.store'), {
            id: news.id,
            ...newsForm.get(),
        }, {
            onSuccess: ({props}) => {
                if (props.flash?.error) {
                    toast(props.flash.error, {
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
                }

                if (props.flash?.success) {
                    HSOverlay.close(`#media-detail-${news.id}-${news.target_id}`)
                    toast(props.flash.success, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        type: "success"
                    })
                }
            }
        })
    }

    return (
        <tr>
            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                {news.user_targets[0]?.user_target?.user?.name ?? ''}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 max-w-[100px]">
                {news.user_targets[0]?.user_target?.name ?? ''}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800">
                <div className='grid grid-cols-1 gap-1'>
                    <p className='line-clamp-2 font-bold'>{news.title}</p>
                    <div className='flex flex-row gap-6 text-xs'>
                        <p className=''>{news.source}</p>
                        <div className='flex flex-row gap-1 items-center'>
                            <Icon icon='solar:calendar-broken'/>
                            <p>{news.date}</p>
                        </div>
                        <p className=''>{news.journalist}</p>
                    </div>
                    <p className='text-sm line-clamp-2'>{news.content}</p>
                </div>
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 w-[200px]">
                {dayjs(news.created_at).format('DD MMM YYYY HH:mm:ss')}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 w-[200px]">
                {dayjs(news.updated_at).format('DD MMM YYYY HH:mm:ss')}
            </td>
            <td className="px-6 py-4 text-sm font-medium text-gray-800 flex flex-row gap-2">
                <a href={news.url} target='_blank'
                   className='flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'>
                    <Icon icon='fluent:open-12-regular' width={20} height={20}/>
                </a>
                <button
                    aria-controls={`media-detail-${news.id}-${news.user_targets[0]?.user_target?.id}`}
                    data-hs-overlay={`#media-detail-${news.id}-${news.user_targets[0]?.user_target?.id}`}
                    className='flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-500 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'>
                    <Icon icon='solar:document-broken' width={20} height={20}/>
                </button>
                <button
                    onClick={() => {
                        MySwal.fire({
                            title: "Are you sure?",
                            text: `Delete ${news.title}?`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes, delete it!",
                            cancelButtonText: "No, cancel!",
                            confirmButtonColor: "danger"
                        }).then((result) => {
                            console.log(result)
                            if (result.isConfirmed) {
                                MySwal.fire({
                                    title: "Deleting",
                                    didOpen: (popup: HTMLElement) => {
                                        MySwal.showLoading()
                                    }
                                })

                                router.delete(route('news.delete', {
                                    id: news.id
                                }), {
                                    onSuccess: ({props}) => {
                                        props.flash?.success && MySwal.fire({
                                            title: props.flash.success,
                                            icon: "success"
                                        })
                                    }
                                })
                            }
                        })
                    }}
                    className='flex shrink-0 justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none'>
                    <Icon icon='solar:trash-bin-2-broken' width={20} height={20}/>
                </button>
                <div
                    id={`media-detail-${news.id}-${news.user_targets[0]?.user_target?.id}`}
                    className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                    role="dialog" tabIndex={-1}
                    aria-labelledby="hs-large-modal-label">
                    <div
                        className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
                        <div
                            className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div
                                className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                                <h3 id="hs-large-modal-label"
                                    className="font-bold text-gray-800 dark:text-white">
                                    Detail News
                                </h3>
                                <button type="button"
                                        className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                        aria-label="Close"
                                        data-hs-overlay={`#media-detail-${news.id}-${news.user_targets[0]?.user_target?.id}`}>
                                    <span className="sr-only">Close</span>
                                    <svg className="shrink-0 size-4"
                                         xmlns="http://www.w3.org/2000/svg"
                                         width="24"
                                         height="24" viewBox="0 0 24 24" fill="none"
                                         stroke="currentColor" strokeWidth="2"
                                         strokeLinecap="round"
                                         strokeLinejoin="round">
                                        <path d="M18 6 6 18"></path>
                                        <path d="m6 6 12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="p-4 overflow-y-auto">
                                <div className='grid grid-cols-1 gap-5'>
                                    <div className="max-w-full">
                                        <label htmlFor="input-label"
                                               className="block text-sm font-medium mb-2">Title</label>
                                        <Input type='text' onChange={(e) => newsForm.title.set(e)} placeholder={"Title"}
                                               value={newsForm.title.get()}/>
                                    </div>
                                    <hr/>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="max-w-full">
                                            <label htmlFor="input-label"
                                                   className="block text-sm font-medium mb-2">Date</label>
                                            <Input type='date' onChange={(e) => newsForm.date.set(e)}
                                                   placeholder={"Title"}
                                                   value={dayjs(newsForm.date.get()).format('YYYY-MM-DD')}/>
                                        </div>
                                        <div className="max-w-full">
                                            <label htmlFor="input-label"
                                                   className="block text-sm font-medium mb-2">User
                                                Target</label>
                                            <Select
                                                primaryColor="#2563EB"
                                                value={newsForm.target_id.get()}
                                                isSearchable={true}
                                                onChange={(e: any) => {
                                                    e && newsForm.target_id.set(e)
                                                }}
                                                options={targetOptions}
                                            />
                                        </div>
                                    </div>
                                    <hr/>
                                    {params.item.news_sources != null && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="max-w-full">
                                                    <label htmlFor="input-label"
                                                           className="block text-sm font-medium mb-2">Source</label>
                                                    <Input type='text' onChange={(e) => {
                                                    }} value={params.item.news_source?.site ?? ''} disabled={true}/>
                                                </div>
                                                <div className="max-w-full">
                                                    <label htmlFor="input-label"
                                                           className="block text-sm font-medium mb-2">Tier</label>
                                                    <Select
                                                        primaryColor="#2563EB"
                                                        value={{
                                                            label: `Tier ${params.item.news_source?.tier ?? 3}`,
                                                            value: `${params.item.news_source?.tier ?? 3}`
                                                        }}
                                                        onChange={(e: any) => {
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
                                                                        id: params.item.news_source.id,
                                                                        tier: e.value,
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
                                                        }}
                                                        options={[{label: 'Tier 1', value: '1',}, {
                                                            label: 'Tier 2',
                                                            value: '2',
                                                        }, {label: 'Tier 3', value: '3',}]}
                                                    />
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="max-w-full">
                                                    <label htmlFor="input-label"
                                                           className="block text-sm font-medium mb-2">AD Value</label>
                                                    <Input type='number' onChange={(e) => {
                                                    }}
                                                           disabled={true}
                                                           value={params.item.news_source.user_value.ad}/>
                                                </div>
                                                <div className="max-w-full">
                                                    <label htmlFor="input-label"
                                                           className="block text-sm font-medium mb-2">PR Value</label>
                                                    <Input type='number' onChange={(e) => {
                                                    }}
                                                           disabled={true}
                                                           value={params.item.news_source.user_value.pr}/>
                                                </div>
                                                <div className="max-w-full">
                                                    <label htmlFor="input-label"
                                                           className="block text-sm font-medium mb-2">Viewership</label>
                                                    <Input type='number' onChange={(e) => {
                                                    }}
                                                           disabled={true}
                                                           value={params.item.news_source.viewership}/>
                                                </div>
                                            </div>
                                            <hr/>
                                        </>
                                    )}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="max-w-full">
                                            <label htmlFor="input-label"
                                                   className="block text-sm font-medium mb-2">Journalist</label>
                                            <Input type={'text'} onChange={(e) => newsForm.journalist.set(e)}
                                                   placeholder={"Journalist"} value={newsForm.journalist.get()}/>
                                        </div>
                                        <div className="max-w-full">
                                            <label htmlFor="input-label"
                                                   className="block text-sm font-medium mb-2">Spookerperson</label>
                                            <Input type={'text'} onChange={(e) => newsForm.spookerperson.set(e)}
                                                   placeholder={"Spookerperson"} value={newsForm.spookerperson.get()}/>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="max-w-full">
                                        <label htmlFor="input-label"
                                               className="block text-sm font-medium mb-2">URL</label>
                                        <Input type={'url'} onChange={(e) => newsForm.url.set(e)} placeholder={"URL"}
                                               value={newsForm.url.get()}/>
                                    </div>
                                    <hr/>

                                    <div className="max-w-full">
                                        <label htmlFor="input-label"
                                               className="block text-sm font-medium mb-2">Images</label>
                                        <div className="flex flex-row gap-2">
                                            <Input type={'text'} onChange={(e) => newsForm.images.set(e)}
                                                   placeholder={"Images"}
                                                   value={newsForm.images.get()}/>
                                            <div>
                                                <Icon icon="mynaui:image-solid"
                                                      width={35} height={35}/>
                                            </div>
                                        </div>

                                    </div>

                                    <hr/>

                                    <div className="max-w-full">
                                        <label htmlFor="input-label"
                                               className="block text-sm font-medium mb-2">Content</label>
                                        <div className="flex flex-row gap-2">
                                            <textarea
                                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                rows={5}
                                                placeholder="This is a textarea placeholder"
                                                value={newsForm.content.get()}
                                                onChange={(e) => newsForm.content.set(e.target.value)}></textarea>
                                        </div>
                                    </div>

                                    <hr/>

                                    <div className="max-w-full">
                                        <label htmlFor="input-label"
                                               className="block text-sm font-medium mb-2">Summary</label>
                                        <div className="flex flex-row gap-2">
                                            <textarea
                                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                rows={5}
                                                placeholder="This is a textarea placeholder"
                                                value={newsForm.summary.get()}
                                                onChange={(e) => newsForm.summary.set(e.target.value)}></textarea>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div
                                className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
                                <button type="button"
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                        data-hs-overlay={`#media-detail-${news.id}-${news.target_id}`}>
                                    Close
                                </button>
                                <button type="button"
                                        onClick={submit}
                                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
