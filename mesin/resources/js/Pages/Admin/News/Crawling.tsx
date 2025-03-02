import AdminLayout from "@/Layouts/AdminLayout";
import {Head, router, usePage} from "@inertiajs/react";
import {Icon} from "@iconify-icon/react";
import Input from "@/Components/Input";
import {PageProps} from "@/types";
import {State, useHookstate} from "@hookstate/core";
import Select from "react-tailwindcss-select";
import {Option} from "react-tailwindcss-select/dist/components/type";
import {useEffect} from "react";
import Options from "react-tailwindcss-select/dist/components/Options";

interface NewsProps {
    title?: string;
    content?: string;
    date?: string;
    images?: string;
    journalist?: string;
    relevant?: number[];
    sentiment?: string;
    source?: string;
    spookerperson?: string;
    summary?: string;
}

interface CrawlingNewsProps extends PageProps {
    data?: NewsProps;
    targets?: {
        id: number;
        name: string;
        user: {
            name: string;
        }
    }[];
}

export default function () {

    const {data, flash, targets} = usePage<CrawlingNewsProps>().props
    const isLoading = useHookstate(false)
    const url = useHookstate('')
    const news: State<NewsProps> = useHookstate(data as NewsProps)
    const optionTarget: Option[] = targets?.map((target) => {
        return {
            label: `${target.user.name} - ${target.name}`,
            value: `${target.id}`,
        } as Option;
    }) ?? []
    const optionSelected: State<any> = useHookstate(null)

    const sentimentOption: Option[] = [
        {
            value: "neutral",
            label: "neutral",
        },
        {
            value: "positive",
            label: "positive",
        },
        {
            value: "negative",
            label: "negative",
        }
    ]
    const sentimentSelected: State<any> = useHookstate(null)

    const crawlingSubmit = () => {
        isLoading.set(true)
        router.post(route('news.crawling.submit'), {
            url: url.get()
        }, {
            onFinish: () => {
                isLoading.set(false)
            }
        });
    }

    const crawlingStore = () => {
        isLoading.set(true)
        router.post(route('news.crawling.store'), {
            title: news.title.get(),
            content: news.content.get(),
            date: news.date.get(),
            images: news.images.get(),
            journalist: news.journalist.get(),
            relevant: optionSelected.get().value,
            sentiment: sentimentSelected.get().value,
            source: news.source.get(),
            spookerperson: news.spookerperson.get(),
            summary: news.summary.get(),
            target_id: optionSelected.get(),
            url: url.get(),
        }, {
            onSuccess: (pop) => {
                isLoading.set(false)
                if (pop.props.flash?.success) {
                    url.set('')
                    news.set({})
                }
            },
        })
    }

    useEffect(() => {
        if (data != null) {
            news.set(data)
            sentimentSelected.set({
                label: data.sentiment,
                value: data.sentiment,
            })
            if (data.relevant!.length > 0) {
                const target = targets?.find((target) => target.id === data.relevant![0])
                if (target != null) {
                    optionSelected.set({
                        label: `${target.user.name} - ${target.name}`,
                        value: `${target.id}`,
                    })
                }
            }
        }
    }, [data, targets])

    return (
        <AdminLayout>
            <Head title="News Crawling"/>

            <div className='grid grid-cols-1 gap-5'>
                <div className='flex flex-row gap-3'>
                    <a href={route('news.index')}
                       className="py-3 px-4 flex justify-center items-center size-[30px] text-sm font-medium rounded-lg border border-transparent bg-gray-300 text-black focus:outline-none disabled:opacity-50 disabled:pointer-events-none">
                        <Icon width={23} height={23}
                              icon='solar:arrow-left-broken'/></a>
                    <p className='text-xl font-bold'>News Crawling</p>
                </div>


                {flash?.error && (
                    <div className="mt-2 bg-red-500 text-sm text-white rounded-lg p-4" role="alert" tabIndex={-1}
                         aria-labelledby="hs-solid-color-danger-label">
                        {flash.error}
                    </div>
                )}

                {flash?.success && (
                    <div className="mt-2 bg-teal-500 text-sm text-white rounded-lg p-4" role="alert" tabIndex={-1}
                         aria-labelledby="hs-solid-color-success-label">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col gap-3 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5">
                    <Input type='url' value={url.get()} onChange={(e) => {
                        url.set(e)
                    }} placeholder="Url"/>

                    <div>
                        <button type="button"
                                onClick={crawlingSubmit}
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

                {news.title?.get() && (
                    <div
                        className="flex flex-col gap-3 bg-white border border-gray-200 shadow-sm rounded-xl p-4 md:p-5">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">User Target</label>
                                <Select isSearchable={true} options={optionTarget} value={optionSelected.get()}
                                        onChange={(e) => {
                                            optionSelected.set(e)
                                        }} primaryColor={'#FFF'}/>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <Input type='text' value={news.title.get()} onChange={(e) => {
                                    news.title.set(e)
                                }} placeholder="Title"/>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Date</label>
                                    <Input type='date' value={news.date.get()} onChange={(e) => {
                                        news.date.set(e)
                                    }} placeholder="Date"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Journalist</label>
                                    <Input type='text' value={news.journalist.get()} onChange={(e) => {
                                        news.journalist.set(e)
                                    }} placeholder="Journalist"/>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Sentiment</label>
                                    <Select options={sentimentOption} value={sentimentSelected.get()} onChange={(e) => {
                                        sentimentSelected.set(e)
                                    }} primaryColor={'#FFF'}/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Spookerperson</label>
                                    <Input type='text' value={news.spookerperson.get()} onChange={(e) => {
                                        news.spookerperson.set(e)
                                    }} placeholder="Spokerperson"/>
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="block text-sm font-medium mb-2">Image</label>
                                <div className="flex flex-row gap-4">
                                    <Input type='text' value={news.images.get()} onChange={(e) => {
                                        news.images.set(e)
                                    }} placeholder="Images"/>

                                    <div>
                                        <a href={news.images.get()}
                                           target='_blank'
                                           className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                            Open
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Content</label>
                                <textarea
                                    rows={8}
                                    onChange={(e) => {
                                        news.content.set(e.target.value)
                                    }}
                                    value={news.content.get()}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Summary</label>
                                <textarea
                                    rows={8}
                                    onChange={(e) => {
                                        news.summary.set(e.target.value)
                                    }}
                                    value={news.summary.get()}
                                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></textarea>
                            </div>
                            <div>
                                <button type="button"
                                        onClick={crawlingStore}
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
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
