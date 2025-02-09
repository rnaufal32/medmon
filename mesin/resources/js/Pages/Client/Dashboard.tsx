import AdminLayout from "@/Layouts/AdminLayout";
import { Bar, getDatasetAtEvent, getElementAtEvent, getElementsAtEvent, Line, Pie } from "react-chartjs-2";
// @ts-ignore
import faker from "faker";
import { Head, router, usePage } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { hasPermission } from "@/utils/Permission";
import dayjs from "dayjs";
import WordCloud from 'react-d3-cloud';
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Chart as ChartJS, ActiveElement, ChartEvent, InteractionItem } from "chart.js";


export default function (params: {
    target: any,
    global_chart: any,
    total_chart: any,
    sentiment_chart: any,
    wordcloud_caption: any,
}) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
    };

    const [date, setDate] = useState({
        startDate: dayjs().subtract(7, 'days').toDate(),
        endDate: dayjs().toDate()
    });

    const [type, setType] = useState('News');

    const pieChartRef = useRef<ChartJS>(null);

    const navigatePieChart = (element: InteractionItem[]) => {
        if (!element.length) return;

        const { datasetIndex, index } = element[0];

        router.get(route("mentions.index", {
            start_date: dayjs(date.startDate).format('YYYY-MM-DD'),
            end_date: dayjs(date.endDate).format('YYYY-MM-DD'),
            type,
            target: params.target.find((d: any) => d.name === params.total_chart.labels[index]).id,
            platform_type: '',
            page: 1
        }));
    };

    const onClickPieChart = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = pieChartRef;

        if (!chart) {
            return;
        }

        navigatePieChart(getElementAtEvent(chart, event));
    };

    const barChartRef = useRef<ChartJS>(null);

    const navigateBarChart = (element: InteractionItem[]) => {
        if (!element.length) return;

        const { datasetIndex, index } = element[0];

        router.get(route("sentiment.index", {
            start_date: dayjs(date.startDate).format('YYYY-MM-DD'),
            end_date: dayjs(date.endDate).format('YYYY-MM-DD'),
            type,
            target: params.target.find((d: any) => d.name === params.total_chart.labels[index]).id,
            sentiment_type: params.sentiment_chart.datasets[datasetIndex].label.toLowerCase(),
            platform_type: '',
            page: 1
        }));
    };

    const onClickBarChart = (event: MouseEvent<HTMLCanvasElement>) => {
        const { current: chart } = barChartRef;

        if (!chart) {
            return;
        }

        navigateBarChart(getElementAtEvent(chart, event));
    };

    function exportExcel() {
        const url = route('dashboard.wordcloud.export', {
            type: type,
            startDate: dayjs(date.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(date.endDate).format('YYYY-MM-DD')
        });

        window.open(url, '_blank');
    }

    useEffect(() => {
        router.get(route('dashboard.index'), {
            type: type,
            startDate: dayjs(date.startDate).format('YYYY-MM-DD'),
            endDate: dayjs(date.endDate).format('YYYY-MM-DD')
        }, {
            preserveState: true,
            preserveScroll: true,
        })
    }, [type, date])

    return (
        <AdminLayout>
            <Head title="Dashboard" />

            <div className='flex flex-row align-middle justify-between'>
                <h1 className='text-2xl font-bold'>Dashboard</h1>
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
                                        href="#" onClick={(e) => {
                                            setType('News');
                                        }}>
                                        News
                                    </a>
                                }
                                {(hasPermission("User Sosmed") || hasPermission("User Media Sosmed")) &&
                                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                        href="#" onClick={(e) => {
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
                <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5">
                    <h3 className="text-lg font-bold text-gray-800">
                        Global Topic Trends
                    </h3>
                </div>
                <div className="p-4 md:p-5">
                    <div className='h-[30vh] w-full'>
                        <Line
                            datasetIdKey='global_chart'
                            data={params.global_chart} options={options} />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 h-[40vh] gap-4'>
                <div className="flex flex-col bg-white border shadow-sm rounded-xl w-full">
                    <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5">
                        <h3 className="text-lg font-bold text-gray-800">
                            Topic Trends
                        </h3>
                    </div>
                    <div className="p-4 md:p-5 h-full">
                        <Pie ref={pieChartRef} datasetIdKey='topic_chart' data={params.total_chart} options={options} onClick={onClickPieChart} />
                    </div>
                </div>
                <div className="flex flex-col bg-white border shadow-sm rounded-xl w-full">
                    <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5">
                        <h3 className="text-lg font-bold text-gray-800">
                            Sentiment
                        </h3>
                    </div>
                    <div className="p-4 md:p-5 h-full">
                        <Bar
                            ref={barChartRef}
                            datasetIdKey='sentiment_chart'
                            data={params.sentiment_chart}
                            options={{
                                ...options,
                                indexAxis: 'y'
                            }}
                            onClick={onClickBarChart}
                        />
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 h-[30vh] gap-4'>
                <div className="flex flex-col bg-white border shadow-sm rounded-xl w-full">
                    <div className="flex justify-between items-center border-b rounded-t-xl py-3 px-4 md:px-5">
                        <h3 className="text-lg font-bold text-gray-800">
                            Popular Words
                        </h3>
                        <button
                            className="px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white"
                            onClick={() => exportExcel()}
                        >
                            <Icon icon='fa-solid:file-excel' className="mr-2" color="#FFFFFF" />
                            Excel
                        </button>
                    </div>
                    <div className="p-4 md:p-5 h-full flex items-center justify-center">
                        {params.wordcloud_caption.length > 0 ? (
                            <WordCloud
                                data={params.wordcloud_caption}
                                font="Times"
                                fontStyle="italic"
                                fontWeight="bold"
                                spiral="rectangular"
                                padding={5}
                                random={Math.random}
                            />
                        ) : (
                            <p>Loading word cloud...</p>
                        )}

                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
