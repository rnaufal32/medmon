import {Loader2} from "lucide-react";
import * as React from "react";
import {cn} from "@/lib/utils";

export default function CenterLoading(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(props.className, "flex justify-center items-center")}>
            <div className="flex flex-row gap-4">
                <Loader2 className="animate-spin"/> Loading
            </div>
        </div>
    )
}
