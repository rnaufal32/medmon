import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { hasPermission } from "@/utils/Permission";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";


export default function (params: {
    targets: any,
}) {

    const { props: { urls } } = usePage()

    const [date, setDate] = useState({
        startDate: dayjs().subtract(7, 'days').toDate(),
        endDate: dayjs().toDate()
    });

    const [type, setType] = useState(urls.query?.type ?? 'News');
    const [sentimentType, setSentimentType] = useState(urls.query?.sentiment_type ?? '');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const dummyData = [
        {
            date: "2025-01-01 09:44:35",
            caption: "Di Tahun Ular ini, biarkan aroma lembut Luna Serpenti membawa ketenangan dan inspirasi ke dalam hidup Anda. 🌙🐍 Hadirkan ruang yang penuh makna, di mana harapan baru bertumbuh dan keindahan mengalir dalam setiap hembusan",
            hashtag: "palembangindahmall, 3T, Therlengkap, Therjangkau, Therjamin, KekasehCollection, KekasehWeddingRing, DiamondJewelry, GiftIdeas",
            likes: "20",
            comments: "3",
            views: "100",
            url: "https://www.instagram.com/p/DFfELGJSDqd/",
            sentiment: "positive"
        },
        {
            date: "2025-01-02 09:44:35",
            caption: "Di Tahun Ular ini, biarkan aroma lembut Luna Serpenti membawa ketenangan dan inspirasi ke dalam hidup Anda. 🌙🐍 Hadirkan ruang yang penuh makna, di mana harapan baru bertumbuh dan keindahan mengalir dalam setiap hembusan",
            hashtag: "palembangindahmall, 3T, Therlengkap, Therjangkau, Therjamin, KekasehCollection, KekasehWeddingRing, DiamondJewelry, GiftIdeas",
            likes: "24",
            comments: "0",
            views: "55",
            url: "https://www.instagram.com/p/DFfELGJSDqd/",
            sentiment: "negative"
        },
        {
            date: "2025-01-03 09:44:35",
            caption: "-",
            hashtag: "palembangindahmall, 3T, Therlengkap, Therjangkau, Therjamin, KekasehCollection, KekasehWeddingRing, DiamondJewelry, GiftIdeas",
            likes: "10",
            comments: "0",
            views: "40",
            url: "https://www.instagram.com/p/DFfELGJSDqd/",
            sentiment: "neutral"
        }
    ]
    const platforms = [
        {
            "id": 1,
            "name": "Instagram",
            "type": "sosmed",
            "created_at": "2024-11-24 07:08:50",
            "updated_at": "2024-11-24 07:08:50"
        },
        {
            "id": 2,
            "name": "Twitter",
            "type": "sosmed",
            "created_at": "2024-11-24 07:08:50",
            "updated_at": "2024-11-24 07:08:50"
        },
        {
            "id": 3,
            "name": "Facebook",
            "type": "sosmed",
            "created_at": "2024-11-24 07:08:50",
            "updated_at": "2024-11-24 07:08:50"
        },
        {
            "id": 4,
            "name": "Tiktok",
            "type": "sosmed",
            "created_at": "2024-11-24 07:08:50",
            "updated_at": "2024-11-24 07:08:50"
        },
        {
            "id": 5,
            "name": "Youtube",
            "type": "sosmed",
            "created_at": "2024-11-24 07:08:50",
            "updated_at": "2024-11-24 07:08:50"
        }
    ]

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const paginatedData = dummyData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [platform, setPlatform] = useState<any>([])

    function changePlatform(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        setPlatform((prev: any) =>
            e.target.checked ? [...prev, value] : prev.filter((id: any) => id !== value)
        );
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function exportExcel() {
        router.get(route('excel.export'))
    }

    useEffect(() => {
        console.log(params.targets)

        router.get(route('excel.index'), {
        }, {
            preserveState: true,
            preserveScroll: true
        });
    }, []);

    return (
        <AdminLayout>
            <Head title="Sentiment" />

            <div className='flex flex-row items-center justify-between'>
                <h1 className='text-2xl font-bold'>Report Excel</h1>
                <div className="flex flex-row gap-4 items-center">
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
                            className="z-10 hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
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
                    <div className="relative">
                        <select data-hs-select='{
                              "placeholder": "Select Sentiment...",
                              "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                              "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto",
                              "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100",
                              "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"></span></div>"
                            }' onChange={(e) => {
                                setSentimentType(e.target.value);
                            }} value={sentimentType}>
                            <option value="">Select Sentiment</option>
                            <option value="positive,neutral,negative">All</option>
                            <option value='positive'>Positive</option>
                            <option value='neutral'>Neutral</option>
                            <option value='negative'>Negative</option>
                            {/* {params.target.map((e: any, i: number) => (
                                        <option key={i} value={e.id}>{e.name}</option>))} */}
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
                                        {platforms.map((e: any, i: number) => (
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
                    <button
                        className="px-4 py-2  rounded-md shadow-md flex items-center bg-green-500 text-white"
                        onClick={() => exportExcel()}
                    >
                        <Icon icon='fa-solid:file-excel' className="mr-2" color="#FFFFFF" />
                        Export
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left relative">
                        <thead className="bg-gray-50 text-xs text-gray-700 border-b">
                            <tr >
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Date</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Caption</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Likes</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Comments</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Views</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Url</th>
                                <th scope="col" className="px-6 py-3 font-medium text-left whitespace-nowrap">Sentiment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'border-b text-gray-900' : 'border-b text-gray-900'}>
                                    <td className="px-6 py-4 max-w-[200px]">{dayjs(item.date).format('YYYY-mm-DD')}</td>
                                    <td className="px-6 py-4 max-w-[200px]">{item.caption.length > 30 ? item.caption.slice(0, 30) + '...' : item.caption}</td>
                                    <td className="px-6 py-4 max-w-[200px]">{item.likes}</td>
                                    <td className="px-6 py-4 max-w-[200px]">{item.comments}</td>
                                    <td className="px-6 py-4 max-w-[200px]">{item.views}</td>
                                    <td className="px-6 py-4 max-w-[200px]"><a href={item.url} target="_blank" className="text-blue-500 underline">{item.url.slice(0, 20)}...</a></td>
                                    <td className="px-6 py-4 max-w-[200px]">
                                        {item.sentiment === 'positive' ? (
                                            <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white">Positive</div>
                                        ) : item.sentiment === 'negative' ? (
                                            <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Negative</div>
                                        ) : (
                                            <div className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-300 text-black border">Neutral</div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end items-center space-x-2 mt-4">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2  rounded-md shadow-md flex items-center"
                    >
                        Prev
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2  rounded-md shadow-md flex items-center"
                    >
                        Next
                    </button>
                </div>
            </div>
        </AdminLayout>
    )
}
