import AdminLayout from "@/Layouts/AdminLayout";
import {Head, router, usePage} from "@inertiajs/react";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/Components/ui/chart"
import {Area, AreaChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Brush} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {DatePickerWithRange} from "@/Components/date-range-picker";
import {toast} from "react-toastify"
import {PageProps} from "@/types";
import {toDate} from "date-fns"
import CategorySelect from "@/Components/CategorySelect";
import DateRangePickerState from "@/Components/DateRangePickerState";
import {TrendingUp} from "lucide-react";


interface DashboardProps extends PageProps {
    global_analytic: Array<any>;
    topic_analytic: Array<{
        "target_type_name": string,
        "total_news_count": number,
        "fill": string,
    }>
}

export default function () {

    const {
        global_analytic,
        user_targets,
        topic_analytic,
    } = usePage<DashboardProps>().props

    return (
        <AdminLayout breadcumb="Dashboard">
            <Head title="Dashboard"/>
            <div className="grid gap-6">
                <Card>
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1 text-center sm:text-left">
                            <CardTitle>Global Topic Trends</CardTitle>
                        </div>
                        <div className="md:flex gap-4 hidden">
                            <CategorySelect/>
                            <DateRangePickerState/>
                        </div>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer
                            config={{
                                ...user_targets.reduce((acc: any, item) => {
                                    acc[item.target_type_name] = {
                                        label: item.target_type_name,
                                        color: item.target_type_color,
                                    };
                                    return acc;
                                }, {}),
                                date: {
                                    label: "Date",
                                }
                            } satisfies ChartConfig}
                            className="aspect-auto lg:h-[38vh] h-[25vh] md:h-[80vh] w-full"
                        >
                            <AreaChart data={global_analytic} margin={{
                                left: -20,
                                right: 12,
                            }}>
                                <CartesianGrid vertical={false}/>
                                <XAxis
                                    dataKey="date"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    minTickGap={32}
                                    tickFormatter={(value) => {
                                        const date = new Date(value)
                                        return date.toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        })
                                    }}
                                />
                                <YAxis
                                    tickCount={5}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={
                                        <ChartTooltipContent
                                            labelFormatter={(value) => {
                                                return new Date(value).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })
                                            }}
                                            indicator="dot"
                                        />
                                    }
                                />
                                {user_targets.map((e) => (
                                    <Area
                                        key={e.target_type_name}
                                        dataKey={e.target_type_name}
                                        type="natural"
                                        fill={e.target_type_color}
                                        fillOpacity={0.4}
                                        stroke={e.target_type_color}
                                    />
                                ))}
                                <ChartLegend content={<ChartLegendContent/>}/>
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="flex flex-col">
                        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                            <div className="grid flex-1 gap-1 text-center sm:text-left">
                                <CardTitle>Global Topic Trends</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer
                                config={{
                                    ...user_targets.reduce((acc: any, item) => {
                                        acc[item.target_type_name] = {
                                            label: item.target_type_name,
                                            color: item.target_type_color,
                                        };
                                        return acc;
                                    }, {}),
                                    date: {
                                        label: "Date",
                                    }
                                } satisfies ChartConfig}
                                className="mx-auto aspect-square lg:h-[35vh] h-[25vh] md:h-[80vh] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
                            >
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent/>}/>
                                    <Pie data={topic_analytic} dataKey="total_news_count" label
                                         nameKey="target_type_name"/>
                                    <ChartLegend content={<ChartLegendContent nameKey="target_type_name"/>}/>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </AdminLayout>
    )
}
