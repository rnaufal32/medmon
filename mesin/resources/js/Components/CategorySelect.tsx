import {router, usePage} from "@inertiajs/react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";

export default function CategorySelect() {

    const {
        category,
    } = usePage().props

    return (
        <Select value={category} onValueChange={(value) => {
            router.post(route('set-category'), {
                category: value,
            })
        }}>
            <SelectTrigger
                className="w-[160px] rounded-lg sm:ml-auto"
                aria-label="Select a value"
            >
                <SelectValue placeholder="news"/>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
                <SelectItem value="news" className="rounded-lg">
                    News
                </SelectItem>
                <SelectItem value="social_media" className="rounded-lg">
                    Social Media
                </SelectItem>
            </SelectContent>
        </Select>
    )
}
