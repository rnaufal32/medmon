import {useHookstate} from "@hookstate/core";
import {Icon} from "@iconify-icon/react";
import Modal from "@/Components/Modal";
import {Bounce, toast} from "react-toastify";

const ImportNews = (params: any) => {

    // IMPORT
    const importForm = useHookstate({
        user: '',
    })

    return (
        <>
            <button type="button"
                    aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-basic-modal"
                    data-hs-overlay="#modal-import"
                    className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                <Icon icon='solar:upload-minimalistic-broken' height={22} width={22}/>
                Import
            </button>
            <Modal id='modal-import' title='Import News'>
                <div className='grid grid-cols-1 gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <select
                            value={importForm.user.get()}
                            onChange={(e) => importForm.user.set(e.target.value)}
                            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                            <option selected={true}>Select User</option>
                            {params.users.map((e: any, i: number) => (
                                <option key={i} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                        <div>
                            <a href={route('news.import-sample', {
                                _query: {
                                    user: importForm.user.get(),
                                },
                            })}
                               target='_blank'
                               className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none">
                                Download Sample
                            </a>
                        </div>
                    </div>
                    <div>
                        <div className="max-w-sm">
                            <label className="block">
                                <span className="sr-only">Choose file</span>
                                <input type="file"
                                       className="block w-full text-sm text-gray-500 file:me-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:disabled:opacity-50 file:disabled:pointer-events-none "/>
                            </label>
                        </div>
                    </div>
                    <div>
                        <button type="button"
                                onClick={() => {
                                    toast('Feature is under development !', {
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
                                }}
                                className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                            Submit
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export {
    ImportNews
}
