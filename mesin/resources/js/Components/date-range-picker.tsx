"use client"

import * as React from "react"
import {subDays, format} from "date-fns"
import {Calendar as CalendarIcon, Loader2} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/Components/ui/button"
import {Calendar} from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {PopoverClose} from "@radix-ui/react-popover";
import {useState} from "react";
import {useHookstate} from "@hookstate/core";
import {toast} from "react-toastify";

export function DatePickerWithRange(props: {
    className?: string,
    loading?: boolean,
    onChange?: (date: DateRange | undefined) => void,
    fromDate?: Date,
    toDate?: Date,
}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: props.fromDate ?? subDays(new Date(), 7),
        to: props.toDate ?? new Date(),
    })

    const popoverState = useHookstate(false)

    React.useEffect(() => {
        if (props.loading == false) {
            popoverState.set(false)
        }
    }, [props.loading])

    return (
        <div className={cn("grid gap-2", props.className)}>
            <Popover open={popoverState.get()} onOpenChange={(popover) => {
                popoverState.set(popover)
            }}>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                        onClick={() => {
                            popoverState.set(true)
                        }}
                    >
                        <CalendarIcon/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="grid-cols-1">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={2}
                        />
                        <div className="p-4 flex justify-end gap-4">
                            <Button variant="secondary" onClick={() => {
                                popoverState.set(false)
                            }}>Batal</Button>
                            <Button disabled={props.loading} onClick={() => {
                                props.onChange?.(date)
                            }}>
                                {props.loading && <Loader2 className="animate-spin"/>}
                                Simpan
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
