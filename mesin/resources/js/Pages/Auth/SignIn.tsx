import {Head, useForm, usePage} from "@inertiajs/react";
import React from "react";

export default function () {

    const form = useForm({
        username: '',
        password: ''
    })

    const {props} = usePage()

    const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        form.post('signin')
    }, [form])

    return (
        <>
            <Head title="Sign In"/>
            <div className="flex h-[100vh] items-center py-16">
                <div className="w-full max-w-md mx-auto p-6">
                    <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                        <div className="p-4 sm:p-7">
                            <div className="text-center">
                                <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
                            </div>

                            {props.flash?.message && <div
                                className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
                                role="alert" aria-labelledby="hs-soft-color-danger-label">{props.flash.message}
                            </div>}

                            <div className="mt-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="grid gap-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-sm mb-2">Username</label>
                                            <div className="relative">
                                                <input type="text"
                                                       value={form.data.username}
                                                       onChange={(e) => form.setData('username', e.target.value)}
                                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                       required aria-describedby="email-error"/>
                                                <div
                                                    className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                    <svg className="size-5 text-red-500" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path
                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {form.errors.username &&
                                                <p className="hidden text-xs text-red-600 mt-2"
                                                   id="email-error">{form.errors.username}</p>}

                                        </div>

                                        <div>
                                            <div className="flex justify-between items-center">
                                                <label htmlFor="password"
                                                       className="block text-sm mb-2">Password</label>
                                            </div>
                                            <div className="relative">
                                                <input type="password"
                                                       value={form.data.password}
                                                       onChange={(e) => form.setData('password', e.target.value)}
                                                       className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                       required aria-describedby="password-error"/>
                                                <div
                                                    className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                    <svg className="size-5 text-red-500" width="16" height="16"
                                                         fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path
                                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                            {form.errors.password &&
                                                <p className="hidden text-xs text-red-600 mt-2"
                                                   id="password-error">{form.errors.password}</p>}
                                        </div>

                                        <div className="flex items-center">
                                            <div className="flex">
                                                <input id="remember-me" name="remember-me" type="checkbox"
                                                       className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"/>
                                            </div>
                                            <div className="ms-3">
                                                <label htmlFor="remember-me" className="text-sm">Remember me</label>
                                            </div>
                                        </div>

                                        <button type="submit"
                                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Sign
                                            in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
