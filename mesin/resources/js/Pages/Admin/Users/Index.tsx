import AdminLayout from "@/Layouts/AdminLayout";
import {Head, router, usePage} from "@inertiajs/react";
import Select from "react-tailwindcss-select";
import {useHookstate} from "@hookstate/core";
import {PageProps} from "@/types";
import {Option} from "react-tailwindcss-select/dist/components/type";
import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import {Icon} from "@iconify-icon/react";
import UserTargetItem from "@/Pages/Admin/Users/Widgets/UserTargetItem";

interface UsersProps extends PageProps {
    users: any[]
    targets?: {
        id: number;
        name: string;
        category: string;
        keywords: string;
        kata_kunci: string;
        includes: string;
        excludes: string;
        status: number;
    }[] | null | undefined
}

export default function () {

    const {users, targets} = usePage<UsersProps>().props

    const user = useHookstate<any>(null)
    const userOptions = users.map(user => {
        return {
            label: user.name,
            value: user.id
        }
    })

    return (
        <AdminLayout>
            <Head title="Users"/>

            <div className="grid grid-cols-1 gap-5">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                    <div className="p-4 md:p-5">
                        <h3 className="text-lg font-bold text-gray-800">
                            Select User
                        </h3>
                        <p className="mt-2 text-gray-500">
                            <Select
                                options={userOptions} value={user.get()} onChange={(e: any) => {
                                user.set(e)
                                router.get(route('users.index'), {
                                    user: e.value
                                }, {
                                    only: ['targets'],
                                    preserveState: true,
                                    preserveScroll: true,
                                })
                            }} primaryColor={"#FFFFFF"}/>
                        </p>
                    </div>
                </div>

                {targets && (
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl">
                        <div className="p-4 md:p-5">
                            <h3 className="text-lg font-bold text-gray-800">
                                User : {user.get()?.label}
                            </h3>
                            <p className="mt-4">
                                <div className="flex flex-col">
                                    <div className="-m-1.5 overflow-x-auto">
                                        <div className="p-1.5 min-w-full inline-block align-middle">
                                            <div className="overflow-hidden">
                                                <table className="w-full text-sm text-left relative">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Category
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Target
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Keywords
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Rules
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Includes
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Excludes
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Status
                                                        </th>
                                                        <th scope="col"
                                                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Action
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                    {targets.map((target, i: number) => (
                                                        <UserTargetItem item={target} key={target.id}/>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
