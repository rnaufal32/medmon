import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { hasPermission } from "@/utils/Permission";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Icon } from "@iconify-icon/react";

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

export default function (params: {
    chart: any,
    counts: any,
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
    const [type, setType] = useState('News');

    const [target, setTarget] = useState<string | undefined>(urls.query.target);


    useEffect(() => {
        router.get(route('analytics.index'), {
            date: {
                start: dayjs(date.startDate).format('YYYY-MM-DD'),
                end: dayjs(date.endDate).format('YYYY-MM-DD')
            },
            source: type,
            target: target,
        }, {
            preserveState: true, // Mencegah re-render yang tidak perlu
            preserveScroll: true
        })
    }, [date, type, target])

    return (
        <AdminLayout>
            <Head title="Analythic" />

            <div className='flex flex-row align-middle justify-between'>
                <h1 className='text-2xl font-bold'>Analythic</h1>
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
                    <div className='w-[300px]'>
                        <Datepicker
                            primaryColor={"blue"}
                            value={date}
                            onChange={(newValue) => {
                                if (newValue != null) {
                                    setDate({
                                        startDate: dayjs(newValue.startDate).toDate(),
                                        endDate: dayjs(newValue.endDate).toDate()
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-3 m-4">
                <div className="col-span-12">
                    <div className="border rounded-md p-5 mt-5">
                        <div className="flex flex-col">
                            <h1 className='text-xl font-semibold text-blue-600'>Number of Mentions</h1>
                            <div className='h-[40vh] w-full'>
                                <Line
                                    datasetIdKey='global_chart'
                                    data={result} options={options} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-5">
                    <div className="border rounded-md p-5 mt-5">
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold text-center mb-3">Stats in Summary</p>
                            <div className="grid grid-cols-12">
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10">
                                    <p className="font-semibold">{params.counts.mention}</p>
                                    <p className="text-sm text-slate-500 text-center">Social Media Mentions</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10">
                                    <p className="font-semibold">{params.counts.like}</p>
                                    <p className="text-sm text-slate-500 text-center">Social Media Likes</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10">
                                    <p className="font-semibold">{params.counts.comment}</p>
                                    <p className="text-sm text-slate-500 text-center">Social Media Comments</p>
                                </div>
                                <div className="col-span-6 border flex flex-col items-center justify-center px-5 py-10">
                                    <p className="font-semibold">{params.counts.view}</p>
                                    <p className="text-sm text-slate-500 text-center">Social Media Views</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-7">
                    <div className="border rounded-md p-5 mt-5">
                        <div className="flex flex-col">
                            <p className="text-xl font-semibold text-center mb-3">Tone Analysis</p>
                            <div className="grid grid-cols-12">
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14">
                                    <p className="font-semibold text-slate-600 text-xl">{params.counts.positive}</p>
                                    <p className="text-green-600 text-center">Positive</p>
                                </div>
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14">
                                    <p className="font-semibold text-slate-600 text-xl">{params.counts.neutral}</p>
                                    <p className="text-blue-600 text-center">Neutral</p>
                                </div>
                                <div className="col-span-4 border flex flex-col items-center justify-center px-5 py-14">
                                    <p className="font-semibold text-slate-600 text-xl">{params.counts.negative}</p>
                                    <p className="text-red-600 text-center">Negative</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
