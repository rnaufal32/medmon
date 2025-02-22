import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import {Icon} from "@iconify-icon/react";
import {router, useForm, usePage} from "@inertiajs/react"
import {State, useHookstate} from "@hookstate/core";
import {Bounce, toast} from "react-toastify";
import {HSOverlay} from "preline/preline";
import {MySwal} from "@/Components/Swal";

interface UserTargetFormProps {
    name: string;
    keywords: string;
    includes: string;
    excludes: string;
    kata_kunci: string;
    status: number;
}

export default function (props: {
    item: any
}) {

    const target = props.item
    const form: State<UserTargetFormProps> = useHookstate({
        id: target.id,
        name: target.name,
        keywords: target.keywords,
        includes: target.includes,
        excludes: target.excludes,
        kata_kunci: target.kata_kunci,
        status: target.status
    } as UserTargetFormProps)

    const updateStatus = (e: any) => {
        MySwal.fire({
            title: "Are you sure?",
            text: `${target.status == 1 ? 'Disable' : 'Enable'} ${target.name}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: `Yes, ${target.status == 1 ? 'disable' : 'enable'} it!`,
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

                router.post(route('users.target.status.update'), {id: target.id}, {
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
                            HSOverlay.close(`#target-${target.id}`)
                            props.flash?.success && MySwal.fire({
                                title: props.flash.success,
                                icon: "success"
                            })
                        }
                    }
                })
            }
        })
    }

    const submit = () => {
        router.post(route('users.target.update'), form.get(), {
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
                    HSOverlay.close(`#target-${target.id}`)
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
            <td className="px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800">
                {target.category}
            </td>
            <td className="px-6 py-4 max-w-[100px] text-sm font-medium text-gray-800">{target.name}</td>
            <td className="px-6 py-4 max-w-[100px] text-sm text-gray-800">{target.keywords}</td>
            <td className="px-6 py-4 max-w-[200px] text-sm text-gray-800">{target.kata_kunci}</td>
            <td className="px-6 py-4 max-w-[100px] text-sm text-gray-800">{target.includes}</td>
            <td className="px-6 py-4 max-w-[100px] text-sm text-gray-800">{target.excludes}</td>
            <td className="px-6 py-4 max-w-[100px] text-sm text-gray-800">
                {target.status === 1 && (
                    <span
                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-500 text-white">Enable</span>
                )}
                {target.status === 0 && (
                    <span
                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Disabled</span>
                )}
            </td>
            <td className="px-6 py-4 max-w-[100px] text-sm font-medium">
                <div className="grid grid-cols-1 gap-3">
                    <button type="button"
                            aria-controls={`target--${target.id}`}
                            data-hs-overlay={`#target-${target.id}`}
                            className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                        <Icon icon='solar:pen-new-round-broken'/> Edit
                    </button>
                    {target.status === 1 && (
                        <button type="button"
                                onClick={updateStatus}
                                className="py-3 px-2 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                            <Icon icon='solar:power-broken'/> Disable
                        </button>
                    )}
                    {target.status === 0 && (
                        <button type="button"
                                onClick={updateStatus}
                                className="py-3 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-red-600 disabled:opacity-50 disabled:pointer-events-none">
                            <Icon icon='solar:power-broken'/> Enable
                        </button>
                    )}
                </div>
                <Modal id={`target-${target.id}`}
                       title='Edit Target Keywords'>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                            <label
                                className="block text-sm font-medium mb-2 dark:text-white">Target</label>
                            <Input type="text" className=""
                                   value={form.name.get()}
                                   disabled={true}
                                   onChange={form.name.set}/>
                        </div>
                        <div className="flex flex-col">
                            <label
                                className="block text-sm font-medium mb-2 dark:text-white">Keywords <div
                                className="hs-tooltip [--trigger:click] [--placement:right] inline-block">
                                <button type="button"
                                        className="hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ">
                                    <Icon
                                        icon={"solar:info-circle-broken"}
                                        width={15} height={15}/>
                                    <span
                                        className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md"
                                        role="tooltip"><p>Digunakan sebagai query untuk melakukan search pada Google</p>
                                    </span>
                                </button>
                            </div>
                            </label>
                            <Input type="text" className=""
                                   value={form.keywords.get()}
                                   onChange={form.keywords.set}/>
                        </div>
                        {/*<div className="grid grid-cols-2 gap-4">*/}
                        {/*    <div className="flex flex-col">*/}
                        {/*        <label*/}
                        {/*            className="block text-sm font-medium mb-2 dark:text-white">Includes</label>*/}
                        {/*        <Input type="text" className=""*/}
                        {/*               value={form.includes.get()}*/}
                        {/*               onChange={form.includes.set}/>*/}
                        {/*    </div>*/}
                        {/*    <div className="flex flex-col">*/}
                        {/*        <label*/}
                        {/*            className="block text-sm font-medium mb-2 dark:text-white">Excludes</label>*/}
                        {/*        <Input type="text" className=""*/}
                        {/*               value={form.excludes.get()}*/}
                        {/*               onChange={form.excludes.set}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="flex flex-col">
                            <label
                                className="block text-sm font-medium mb-2 dark:text-white">Rules
                                <div
                                    className="hs-tooltip [--trigger:click] [--placement:right] inline-block ml-1">
                                    <button type="button"
                                            className="hs-tooltip-toggle flex shrink-0 justify-center items-center gap-2 size-[15px] text-sm font-medium rounded-lg border border-transparent bg-gray-200 text-black ">
                                        <Icon
                                            icon={"solar:info-circle-broken"}
                                            width={15} height={15}/>
                                        <span
                                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-lg shadow-md"
                                            role="tooltip">
                                            <p>Digunakan untuk mencari keyword yang ada pada berita</p>
                                        </span>
                                    </button>
                                </div>
                            </label>
                            <textarea
                                onChange={(e) => {
                                    form.kata_kunci.set(e.target.value)
                                }}
                                value={form.kata_kunci.get()}
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"></textarea>
                        </div>
                        <div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    submit()
                                }}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Submit
                            </button>
                        </div>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}
