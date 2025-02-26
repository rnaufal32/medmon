export default function (params: {
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color',
    placeholder?: string,
    className?: string,
    value?: string,
    onChange?: (e: string) => void,
    disabled?: boolean
}) {
    return (
        <input type={params.type}
               placeholder={params.placeholder}
               className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
               value={params.value} onChange={(e) => {
            params.onChange && params.onChange(e.target.value ?? "")
        }} disabled={params.disabled}/>
    )
}
