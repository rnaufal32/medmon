import {toDate} from "date-fns";
import {DatePickerWithRange} from "@/Components/date-range-picker";
import {router, usePage} from "@inertiajs/react";

export default function DateRangePickerState() {
    const {
        date,
    } = usePage().props

    return (
        <DatePickerWithRange
            fromDate={toDate(date.start)}
            toDate={toDate(date.end)}
            onChange={(e) => {
                router.post(route('set-date-range'), {
                    'start': e?.from,
                    'end': e?.to,
                })
            }}/>
    )
}
