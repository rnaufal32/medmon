import AdminLayout from "@/Layouts/AdminLayout";
import {Head} from "@inertiajs/react";
import {Icon} from "@iconify-icon/react";
import {Bar} from 'react-chartjs-2';

export default function () {
    return (
        <AdminLayout>
            <Head title="Dashboard"/>

            <div className="grid grid-cols-1 gap-6">
                <div className="px-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                            <div className="p-4 md:p-5 flex gap-x-4">
                                <div
                                    className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                                    <Icon icon="fluent:news-16-regular" width={30} height={30}/>
                                </div>

                                <div className="grow">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Total News
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2">
                                        <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                                            72,540
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                            <div className="p-4 md:p-5 flex gap-x-4">
                                <div
                                    className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                                    <Icon icon="fluent:news-16-regular" width={30} height={30}/>
                                </div>

                                <div className="grow">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            News Today
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2">
                                        <h3 className="text-xl font-medium text-gray-800">
                                            123
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                            <div className="p-4 md:p-5 flex gap-x-4">
                                <div
                                    className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                                    <Icon icon="ri:at-line" width={30} height={30}/>
                                </div>

                                <div className="grow">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Total Social Media
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2">
                                        <h3 className="text-xl sm:text-2xl font-medium text-gray-800">
                                            56.8%
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                            <div className="p-4 md:p-5 flex gap-x-4">
                                <div
                                    className="shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg">
                                    <Icon icon="ri:at-line" width={30} height={30}/>
                                </div>

                                <div className="grow">
                                    <div className="flex items-center gap-x-2">
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Social Media Today
                                        </p>
                                    </div>
                                    <div className="mt-1 flex items-center gap-x-2">
                                        <h3 className="text-xl font-medium text-gray-800">
                                            92,913
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="p-4 flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                News User
                            </p>
                        </div>
                    </div>
                    <div className='min-h-[410px]'>
                        <Bar
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                            data={{
                                labels: ['Red', 'Blue'],
                                datasets: [{
                                    label: 'Total News',
                                    data: [12, 19],
                                }]
                            }}
                        />
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-col">
                        <div className="-m-1.5 overflow-x-auto">
                            <div className="p-1.5 min-w-full inline-block align-middle">
                                <div className="bg-white border border-gray-200 rounded-xl shadow-2xs overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Latest News
                                        </h2>
                                    </div>
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                Title
                                              </span>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap min-w-64">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                Date
                                              </span>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap min-w-64">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                Crawled
                                              </span>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start whitespace-nowrap">
                                              <span className="text-xs font-semibold uppercase text-gray-800">
                                                User Target
                                              </span>
                                            </th>
                                        </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                        <tr>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <a href='#' target={"_blank"}
                                                   className="text-sm text-blue-800 font-bold">
                                                    Pemerintah Luncurkan Program Ekonomi Baru
                                                </a>
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <span className="text-sm text-gray-800">
                                                    03 Maret 2025
                                                </span>
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <span className="text-sm text-gray-800">
                                                    04 Maret 2025 17:00:00
                                                </span>
                                            </td>
                                            <td className="size-px whitespace-nowrap px-6 py-3">
                                                <span className="text-sm text-gray-800">
                                                    MR DIY - MR DIY (Direct Mention)
                                                </span>
                                            </td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
