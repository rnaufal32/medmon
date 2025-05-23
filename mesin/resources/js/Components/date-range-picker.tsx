"use client"

import * as React from "react"
import {subDays, format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/Components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover"
import {PopoverClose} from "@radix-ui/react-popover";

export function DatePickerWithRange(props: {
    className?: string,
    onChange?: (date: DateRange | undefined) => void,
    fromDate?: Date,
    toDate?: Date,
}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: props.fromDate ?? subDays(new Date(), 7),
        to: props.toDate ?? new Date(),
    })

    return (
        <div className={cn("grid gap-2", props.className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
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
                            <PopoverClose asChild>
                                <Button variant="secondary">Batal</Button>
                            </PopoverClose>
                            <PopoverClose asChild>
                                <Button onClick={() => {
                                    props.onChange?.(date)
                                }}>Simpan</Button>
                            </PopoverClose>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
