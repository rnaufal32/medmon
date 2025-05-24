import {toDate} from "date-fns";
import {DatePickerWithRange} from "@/Components/date-range-picker";
import {router, usePage} from "@inertiajs/react";
import {useHookstate} from "@hookstate/core";

export default function DateRangePickerState() {

    const loading = useHookstate(false)

    const {
        date,
    } = usePage().props

    return (
        <DatePickerWithRange
            loading={loading.get()}
            fromDate={toDate(date.start)}
            toDate={toDate(date.end)}
            onChange={(e) => {
                router.post(route('set-date-range'), {
                    'start': e?.from,
                    'end': e?.to,
                }, {
                    onStart: () => {
                        loading.set(true)
                    },
                    onFinish: (_) => {
                        loading.set(false)
                    }
                })
            }}/>
    )
}
