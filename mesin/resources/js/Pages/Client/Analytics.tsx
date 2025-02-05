import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { hasPermission } from "@/utils/Permission";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import { Icon } from "@iconify-icon/react";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
    counts: any,
    targets: any
}) {
    const { props: { urls } } = usePage()
    const [date, setDate] = useState({
        startDate: dayjs().subtract(7, 'days').toDate(),
        endDate: dayjs().toDate()
    });

    const result = {
        labels: params.chart.labels,
        datasets: [
            {
                label: 'Number of Mentions',
                data: params.chart.datasets.map((d: any) => d.data)
            }
        ]
    };
    const [type, setType] = useState(urls.query?.source ?? 'News');

    const [target, setTarget] = useState<string | undefined>(urls.query.target);

    const [tone, setTone] = useState({
        positive: 20,
        neutral: 30,
        negative: 14,
    })

    const total = Object.values(tone).reduce((acc, value) => acc + value, 0);

    const pieData = {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [
            {
                data: Object.values(tone).map((value) => ((value / total) * 100).toFixed(2)),
                backgroundColor: ['#22C55E', '#3B82F6', '#EF4444'],
                hoverBackgroundColor: ['#45A049', '#FFB300', '#D32F2F'],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

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
        router.get(route('analytics.index'), {
            start_date: dayjs(date.startDate).format('YYYY-MM-DD'),
            end_date: dayjs(date.endDate).format('YYYY-MM-DD'),
            source: type,
            target: target,
        }, {
            preserveState: true,
            preserveScroll: true
        })

        setTone({
            positive: params.counts.positive,
            neutral: params.counts.neutral,
            negative: params.counts.negative,
        })
    }, [date, type, target])

    return (
        <AdminLayout>
            <Head title="Analythic" />

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

                                }} value={target}>
                                <option value="">Select Target</option>
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

            <div className="grid grid-cols-12 gap-3 m-4">
                <div className="col-span-12">
                    <div className="border p-5 mt-5 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <h1 className='text-xl font-semibold text-blue-600'>Number of Mentions</h1>
                            <div className='h-[40vh] w-full'>
                                <Line
                                    datasetIdKey='global_chart'
                                    data={result}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-6">
                    <div className="border p-5 mt-5 rounded-lg shadow-md">
                        <div className="flex flex-col">
                            <h1 className='text-xl font-semibold text-blue-600'>Number of Mentions</h1>
                            <div className='h-[40vh] w-full'>
                                <Line
                                    datasetIdKey='global_chart'
                                    data={result}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="col-span-5">
                    <div className="border p-5 mt-5">
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold text-center mb-3">Stats in Summary</p>
                            <div className="grid grid-cols-12">
                                <div className="col-span-6 border flex flex-col items-center justify-normal px-5 py-10 rounded-lg shadow-md m-2">
                                    <Icon icon="solar:mention-square-outline" width={40} height={40} />
                                    <p className="font-semibold text-green-600 text-lg mt-2">{params.counts.mention}</p>
                                    <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Mentions</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                    <Icon icon="solar:like-broken" width={40} height={40} />
                                    <p className="font-semibold text-green-600 text-lg mt-2">{params.counts.like}</p>
                                    <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Likes</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                    <Icon icon="fa-regular:comments" width={40} height={40} />
                                    <p className="font-semibold text-green-600 text-lg mt-2">{params.counts.comment}</p>
                                    <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Comments</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10 rounded-lg shadow-md m-2">
                                    <Icon icon="solar:eye-broken" width={40} height={40} />
                                    <p className="font-semibold text-green-600 text-lg mt-2">{params.counts.view}</p>
                                    <p className="text-sm text-slate-500 text-center">{type === 'News' ? 'News' : 'Social Media'} Views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-7">
                    <div className="border p-5 mt-5">
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold text-center mb-3 ">Tone Analysis</p>
                            <div className="h-[40vh] w-full flex items-center justify-center">
                                <Pie data={pieData} options={pieOptions} />
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-green-500">
                                    <p className="font-semibold text-white text-2xl">{params.counts.positive}</p>
                                    <p className="text-white text-center">Positive</p>
                                </div>
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-blue-500">
                                    <p className="font-semibold text-white text-2xl">{params.counts.neutral}</p>
                                    <p className="text-white text-center">Neutral</p>
                                </div>
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14 rounded-lg shadow-md m-2 bg-red-500">
                                    <p className="font-semibold text-white text-2xl">{params.counts.negative}</p>
                                    <p className="text-white text-center">Negative</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
