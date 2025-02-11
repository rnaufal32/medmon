import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { hasPermission } from "@/utils/Permission";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Icon } from "@iconify-icon/react";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { Chart, ArcElement, Tooltip, Legend, ChartData } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { generateHoverColor } from "@/utils";

Chart.register(ChartDataLabels, ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        datalabels: {
            display: true,
            color: '#2563EB',
            anchor: 'end',
            align: 'top',
            font: {
                size: 12,
                weight: 'bold'
            }
        }
    }
};

export default function (params: {
    chart: any,
    summaries: any,
    targets: any,
    pieData: any,
    platforms: any,
    target_color: any,
}) {
    const { props: { urls } } = usePage()
    const [date, setDate] = useState({
        startDate: dayjs().subtract(7, 'days').toDate(),
        endDate: dayjs().toDate()
    });

    const [type, setType] = useState(urls.query?.source ?? 'News');

    const [target, setTarget] = useState<string | undefined>(urls.query.target);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [platform, setPlatform] = useState<any>([])

    const [pageBreak, setPageBreak] = useState(false)

    const getColorByLabel = (label: string) => {
        if (label === 'Corporate') return '#3B82F6';
        if (label === 'Competitor') return '#EF4444';
        return '#22C55E';
    };

    const getValueByKey = (obj: any, key: any) => obj[key] || null;

    const chartData: ChartData = {
        ...params.chart,
        datasets: params.chart.datasets.map((dataset: any) => ({
            ...dataset,
            borderColor: getValueByKey(params.target_color, dataset.label),
            backgroundColor: generateHoverColor(getValueByKey(params.target_color, dataset.label)),
        })),
    };


    function totalTone(positive: number, negative: number, neutral: number) {
        const total = Object.values({
            positive,
            neutral,
            negative
        }).reduce((acc, value) => acc + value, 0);

        return total;
    }

    function changePlatform(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        setPlatform((prev: any) =>
            e.target.checked ? [...prev, value] : prev.filter((id: any) => id !== value)
        );
    }


    const printRef = useRef();
    const printAnalytics = (): void => {
        window.print()

    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem: any) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    },
                },
            },
            datalabels: {
                formatter: function (value: any) {
                    return value + '%';
                },
                display: true,
                color: '#FFFFFF',
                font: {
                    size: 12,
                    weight: 'bold'
                }
            }
        },
    };

    const pieRanking = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            datalabels: {
                formatter: function (value: any, context: any) {
                    return `#${[context.dataIndex + 1]}`;
                },
                display: true,
                color: '#FFFFFF',
                font: {
                    size: 12,
                    weight: 'bold'
                }
            }
        },
    };

    useEffect(() => {
        setPlatform([]);
    }, [type]);


    useEffect(() => {
        router.get(route('analytics.index'), {
            start_date: dayjs(date.startDate).format('YYYY-MM-DD'),
            end_date: dayjs(date.endDate).format('YYYY-MM-DD'),
            source: type,
            target: target !== "all" ? target : "",
            platform: platform.join(','),
        }, {
            preserveState: true,
            preserveScroll: true
        })
    }, [date, type, target, platform])

    return (
        <AdminLayout>
            <Head title="Analythic" />
            <ToastContainer aria-label="" />

            <div id="section-to-print" >

                <div className='flex flex-row align-middle justify-between'>
                    <h1 className='text-2xl font-bold'>Analytics</h1>
                    <div className="flex flex-row gap-4">
                        <div className="hs-dropdown relative inline-flex">
                            <button id="hs-dropdown-default" type="button"
                                className="hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
                        <div>
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
                                        if (e.target.value !== 'all') {
                                            setPageBreak(true)
                                        } else {
                                            setPageBreak(false)
                                        }

                                    }} value={target}>
                                    <option value="all">All Target</option>
                                    {params.targets.map((e: any, i: number) => (
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                className="px-4 py-2 rounded-md shadow-md flex items-center border"
                                onClick={() => setDropdownOpen((prev) => !prev)}
                            >
                                Platform
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md py-2 border z-50">
                                    <div className="p-4">
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
                            )}
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
                        <button
                            className="px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white"
                            onClick={() => printAnalytics()}
                        >
                            <Icon icon='material-symbols:download-rounded' className="mr-2" color="#FFFFFF" />
                            Download
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-3 m-4">
                    <div className="col-span-12">
                        <div className="border p-5 mt-5 rounded-lg shadow-md">
                            <div className="flex flex-col">
                                <h1 className='text-xl font-semibold text-blue-600'>Number of Mentions</h1>
                                <div className='h-[40vh] w-full'>
                                    <Line
                                        datasetIdKey='global_chart'
                                        data={chartData}
                                        options={options}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {pageBreak && (
                        <div className="col-span-12 page-break" />
                    )}
                    {params.summaries.map((data: any, index: number) => (

                        <div key={index} className="col-span-6">
                            <div className="border p-7 mt-5">
                                <div className="flex flex-col">
                                    <p className="text-xl text-center mb-3">Stats in Summary <span className="font-semibold">{data.target}</span></p>
                                    <div className="grid grid-cols-12 py-16">
                                        <div className="col-span-6 border flex flex-col items-center justify-normal px-5 py-10 rounded-lg shadow-md m-2">
                                            <Icon icon="solar:mention-square-outline" width={40} height={40} />
                                            <p className="font-semibold text-green-600 text-lg mt-2">{data.counts.mention}</p>
                                            <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Mentions</p>
                                        </div>
                                        <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                            <Icon icon="solar:like-broken" width={40} height={40} />
                                            <p className="font-semibold text-green-600 text-lg mt-2">{data.counts.like}</p>
                                            <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Likes</p>
                                        </div>
                                        <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                            <Icon icon="fa-regular:comments" width={40} height={40} />
                                            <p className="font-semibold text-green-600 text-lg mt-2">{data.counts.comment}</p>
                                            <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Comments</p>
                                        </div>
                                        <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                            <Icon icon="solar:eye-broken" width={40} height={40} />
                                            <p className="font-semibold text-green-600 text-lg mt-2">{data.counts.view}</p>
                                            <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Views</p>
                                            {type === 'News' ? (
                                                <></>
                                            ) : (

                                                <p className="font-light text-slate-400 text-sm mt-2">(Views only for Youtube and Tiktok)</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!pageBreak && (
                        <div className="col-span-12 page-break" />
                    )}
                    {params.summaries.map((data: any, index: number) => (
                        <div key={index} className="col-span-6">
                            <div className="border p-5 mt-5">
                                <div className="flex flex-col">
                                    <p className="text-xl text-center mb-3">Tone Analysis <span className="font-semibold">{data.target}</span></p>
                                    <div className="h-[40vh] w-full flex items-center justify-center">
                                        <Pie data={{
                                            labels: ['Positive', 'Neutral', 'Negative'],
                                            datasets: [
                                                {
                                                    data: Object.values({
                                                        positive: data.counts.positive,
                                                        neutral: data.counts.neutral,
                                                        negative: data.counts.negative,
                                                    }).map((value) => ((value / totalTone(data.counts.positive, data.counts.negative, data.counts.neutral)) * 100).toFixed(2)),
                                                    backgroundColor: ['#22C55E', '#3B82F6', '#EF4444'],
                                                    hoverBackgroundColor: ['#22C55E', '#3B82F6', '#EF4444'],
                                                    borderColor: '#ffffff',
                                                    borderWidth: 2,
                                                },
                                            ],
                                        }} options={pieOptions} />
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-green-500">
                                            <p className="font-semibold text-white text-2xl">{data.counts.positive}</p>
                                            <p className="text-white text-center">Positive</p>
                                        </div>
                                        <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-blue-500">
                                            <p className="font-semibold text-white text-2xl">{data.counts.neutral}</p>
                                            <p className="text-white text-center">Neutral</p>
                                        </div>
                                        <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-red-500">
                                            <p className="font-semibold text-white text-2xl">{data.counts.negative}</p>
                                            <p className="text-white text-center">Negative</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-12 page-break" />
                    {params.pieData.map((data: any, index: number) => (
                        <div key={index} className="col-span-6">
                            <div className="border p-5 mt-5">
                                <div className="flex flex-col">
                                    <p className="text-xl text-center mb-3">Ranking <span className="font-semibold">{data.target}</span></p>
                                    <div className="h-[40vh] w-full flex items-center justify-center">
                                        <Pie data={{
                                            labels: data.datasets.labels,
                                            datasets: [
                                                {
                                                    data: data.datasets.data,
                                                    backgroundColor: ["#FFD700", "#C0C0C0", "#CD7F32", "#007BFF", "#28A745"],
                                                    hoverBackgroundColor: ["#E6C200", "#A9A9A9", "#B76E29", "#0056B3", "#1E7E34"],
                                                    borderColor: '#ffffff',
                                                    borderWidth: 2,
                                                },
                                            ],
                                        }} options={pieRanking} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    )
}
