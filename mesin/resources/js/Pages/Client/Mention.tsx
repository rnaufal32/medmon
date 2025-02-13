import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { hasPermission } from "@/utils/Permission";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Icon } from "@iconify-icon/react";
import { ChartData } from "chart.js";
import { generateHoverColor } from "@/utils";

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

export default function (params: {
    analytic: any,
    data: any,
    target: any,
    platforms: any,
}) {
    const { props: { urls } } = usePage()
    const [date, setDate] = useState({
        startDate: urls.query.start_date ?? dayjs().subtract(7, 'days').toDate(),
        endDate: urls.query.end_date ?? dayjs().toDate()
    });

    const [page, setPage] = useState(params.data.current_page)

    const [type, setType] = useState(urls.query?.type ?? 'News');

    const [target, setTarget] = useState<string | undefined>(urls.query.target);

    const [platform, setPlatform] = useState<any>([])

    function changePlatform(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        setPlatform((prev: any) =>
            e.target.checked ? [...prev, value] : prev.filter((id: any) => id !== value)
        );
    }


    const chartData: ChartData = {
        ...params.analytic,
        datasets: params.analytic.datasets.map((dataset: any) => ({
            ...dataset,
            borderColor: dataset.color,
            backgroundColor: generateHoverColor(dataset.color),
        })),
    };

    useEffect(() => {
        setPlatform([]);
    }, [type]);

    useEffect(() => {
        router.get(route('mentions.index'), {
            start_date: dayjs(date.startDate).format('YYYY-MM-DD'),
            end_date: dayjs(date.endDate).format('YYYY-MM-DD'),
            type,
            target: target !== "all" ? target : "",
            platform_type: platform.join(','),
            page
        }, {
            preserveState: true,
            preserveScroll: true
        })
    }, [page, date, type, target, platform])

    return (
        <AdminLayout>
            <Head title="Mention" />

            <div className='flex flex-row align-middle justify-between'>
                <h1 className='text-2xl font-bold'>Mention</h1>
                <div className="flex flex-row gap-4">
                    <div className="hs-dropdown relative inline-flex">
                        <button id="hs-dropdown-default" type="button"
                            className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                            aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            {type}
                            <svg className="hs-dropdown-open:rotate-180 size-4" xmlns="http://www.w3.org/2000/svg"
                                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                        </button>

                        <div
                            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                            role="menu" aria-orientation="vertical" aria-labelledby="hs-dropdown-default">
                            <div className="p-1 space-y-0.5">
                                {(hasPermission("User Media") || hasPermission("User Media Sosmed")) &&
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                        onClick={() => {
                                            setType('News');
                                        }}>
                                        News
                                    </a>
                                }
                                {(hasPermission("User Sosmed") || hasPermission("User Media Sosmed")) &&
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                        onClick={() => {
                                            setType('Social Media');
                                        }}>
                                        Social Media
                                    </a>
                                }
                            </div>
                        </div>
                    </div>
                    <div className='w-[300px]'>
                        <Datepicker
                            showShortcuts={true}
                            showFooter={true}
                            primaryColor={"blue"}
                            value={date}
                            onChange={(newValue) => {
                                if (newValue != null) {
                                    const startDate = dayjs(newValue.startDate);
                                    const endDate = dayjs(newValue.endDate);
                                    const diffInDays = endDate.diff(startDate, 'day');

                                    if (diffInDays > 30) {
                                        alert("The maximum allowed date range is 30 days.");
                                    } else {
                                        setDate({
                                            startDate: startDate.toDate(),
                                            endDate: endDate.toDate()
                                        });
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-5">
                    <div className='h-[30vh] w-full'>
                        <Line
                            datasetIdKey='global_chart'
                            data={chartData} options={options} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
                {params.data.data.length > 0 ? (
                    <div className='col-span-2 grid grid-cols-1 gap-5'>
                        {params.data.data.map((e: any, i: number) => (
                            <div key={i} className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
                                <div className='flex flex-row gap-3'>
                                    <div className="flex">
                                        {e.platform == "Facebook" && <Icon icon="logos:facebook" width={40} height={40} />}
                                        {e.platform == "Instagram" &&
                                            <Icon icon="skill-icons:instagram" width={40} height={40} />}
                                        {e.platform == "Twitter" &&
                                            <Icon icon="fa6-brands:square-x-twitter" width={40}
                                                height={40} />}
                                        {e.platform == "Youtube" &&
                                            <Icon icon="logos:youtube-icon" width={40} height={40} />}
                                        {e.platform == "Tiktok" &&
                                            <Icon icon="logos:tiktok-icon" width={40} height={40} />}
                                        {e.platform == "Media Online" &&
                                            <Icon icon="mdi:web" width={40} height={40} />}
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex flex-row justify-between'>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {e.username}
                                            </h3>
                                            {e.sentiment == "positive" && (<span
                                                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white">Positive</span>)}
                                            {e.sentiment == "negative" && (
                                                <span
                                                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Negative</span>
                                            )}
                                            {e.sentiment == "neutral" && (
                                                <span
                                                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">Neutral</span>
                                            )}
                                        </div>
                                        <p
                                            className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
                                            {e.date}
                                        </p>
                                        <p className="mt-2 text-gray-500 line-clamp-3">
                                            {e.title ?? ''} {e.caption}
                                        </p>
                                        {e.platform == "Media Online" ? (
                                            <>
                                                <button
                                                    aria-haspopup="dialog" aria-expanded="false"
                                                    aria-controls={`media-detail-${e.id}`}
                                                    data-hs-overlay={`#media-detail-${e.id}`}
                                                    className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                                    Open
                                                    <Icon icon='fluent:open-12-regular' />
                                                </button>
                                                <div id={`media-detail-${e.id}`}
                                                    className="hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none"
                                                    role="dialog" tabIndex={-1} aria-labelledby="hs-large-modal-label">
                                                    <div
                                                        className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all lg:max-w-4xl lg:w-full m-3 lg:mx-auto">
                                                        <div
                                                            className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                                                            <div
                                                                className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
                                                                <h3 id="hs-large-modal-label"
                                                                    className="font-bold text-gray-800 dark:text-white">
                                                                    {e.title}
                                                                </h3>
                                                                <button type="button"
                                                                    className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                                                                    aria-label="Close"
                                                                    data-hs-overlay={`#media-detail-${e.id}`}>
                                                                    <span className="sr-only">Close</span>
                                                                    <svg className="shrink-0 size-4"
                                                                        xmlns="http://www.w3.org/2000/svg" width="24"
                                                                        height="24" viewBox="0 0 24 24" fill="none"
                                                                        stroke="currentColor" stroke-width="2"
                                                                        stroke-linecap="round" stroke-linejoin="round">
                                                                        <path d="M18 6 6 18"></path>
                                                                        <path d="m6 6 12 12"></path>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                            <div className="p-4 overflow-y-auto">
                                                                <div className='grid grid-cols-3 mx-3 my-5'>
                                                                    <div>
                                                                        <p className='font-bold'>Open
                                                                            Link</p>
                                                                        <a href={e.url} target="_blank"
                                                                            className='text-blue-500'>Open</a>
                                                                    </div>
                                                                    <div>
                                                                        <p className='font-bold'>Media</p>
                                                                        <p>{e.username}</p>
                                                                    </div>
                                                                </div>
                                                                <hr />

                                                                <div className='grid grid-cols-3 mx-3 my-5'>
                                                                    <div>
                                                                        <p className='font-bold'>Date</p>
                                                                        <p>{e.date}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p className='font-bold'>Sentiment</p>
                                                                        {e.sentiment == "positive" && (
                                                                            <span
                                                                                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white">Positive</span>)}
                                                                        {e.sentiment == "negative" && (
                                                                            <span
                                                                                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Negative</span>
                                                                        )}
                                                                        {e.sentiment == "neutral" && (
                                                                            <span
                                                                                className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">Neutral</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <hr />

                                                                <div className='grid grid-cols-3 mx-3 my-5'>
                                                                    <div>
                                                                        <p>PR Value</p>
                                                                        <p>{e.pr_value}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Ad Value</p>
                                                                        <p>{e.ad_value}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Viewership</p>
                                                                        <p>{e.viewership}</p>
                                                                    </div>
                                                                </div>
                                                                <hr />

                                                                <div className='grid grid-cols-3 mx-3 my-5'>
                                                                    <div>
                                                                        <p>Reporters</p>
                                                                        <p>{e.journalist}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>Spoke Person</p>
                                                                        <p>{e.spookerperson}</p>
                                                                    </div>
                                                                </div>

                                                                <div className='text-center mt-2'>
                                                                    <img src={e.images} alt={e.title}
                                                                        className='max-h-[250px] mx-auto' />
                                                                </div>
                                                                <p className="mt-2 text-gray-800 dark:text-neutral-400">
                                                                    {e.caption}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="flex items-center gap-6 mb-1 text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Icon icon="solar:heart-broken" />
                                                        <span>{e.likes ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Icon icon="fa-regular:comments" />
                                                        <span>{e.comments ?? 0}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Icon icon="fluent-mdl2:view" />
                                                        <span>{e.views ?? 0}</span>
                                                    </div>
                                                </div>
                                                <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                                    href={e.url} target="_blank">
                                                    Open
                                                    <Icon icon='fluent:open-12-regular' />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="mt-4">
                            <nav className="flex items-center gap-x-1" aria-label="Pagination">
                                {params.data.links[0] && (
                                    <button type="button"
                                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                        aria-label="Previous"
                                        disabled={params.data.links[0].url == null}
                                        onClick={(_) => {
                                            setPage(params.data.current_page - 1)
                                        }}>
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
                                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                        <span>Previous</span>
                                    </button>
                                )}
                                <div className="flex items-center gap-x-1">
                                    {params.data.links.slice(1, -1).map((e: any, i: number) => (
                                        <button type="button"
                                            key={i}
                                            onClick={(_) => {
                                                setPage(e.label)
                                            }}
                                            className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg ${e.active ? 'bg-gray-200 text-gray-800 focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none' : 'text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'}`}>{e.label}</button>
                                    ))}
                                </div>
                                {params.data.links.length > 10 && params.data.links[params.data.links.length - 1] && (
                                    <button type="button"
                                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                                        aria-label="Next"
                                        onClick={() => {
                                            setPage(params.data.current_page + 1)
                                        }}
                                        disabled={params.data.links[params.data.links.length - 1].url == null}>
                                        <span>Next</span>
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24"
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
                ) : (
                    <div className='col-span-2 grid grid-cols-1 gap-5'>
                        <div className="flex flex-col items-center justify-center border shadow-sm rounded-xl p-4 md:p-5">
                            <h1>Currently, There's no data <span className="font-semibold">Mentions</span> to display</h1>
                        </div>
                    </div>
                )}
                <div>
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5">
                        <div>
                            <label htmlFor="input-label"
                                className="block text-sm font-medium mb-2 dark:text-white">Target</label>
                            <div className="relative">
                                <select data-hs-select='{
                              "placeholder": "Select Target...",
                              "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
                            }' onChange={(e) => {
                                        setTarget(e.target.value);

                                    }} value={target}>
                                    <option value="all">All Target</option>
                                    {params.target.map((e: any, i: number) => (
                                        <option key={i} value={e.id}>{e.name}</option>))}
                                </select>

                                <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                                    <svg className="shrink-0 size-4 text-gray-500" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="m7 15 5 5 5-5"></path>
                                        <path d="m7 9 5-5 5 5"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                className="block text-sm font-medium mb-2 dark:text-white">Platforms</label>
                            <div className='grid grid-cols-2 gap-2'>
                                {params.platforms.map((e: any, i: number) => (
                                    <div className="flex" key={i}>
                                        <input type="checkbox"
                                            value={e.id}
                                            checked={platform.includes(e.id)}
                                            onChange={changePlatform}
                                            className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                            id={`platforms-${e.id}`} />
                                        <label htmlFor={`platforms-${e.id}`}
                                            className="text-sm text-gray-500 ms-3 dark:text-neutral-400">{e.name}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
