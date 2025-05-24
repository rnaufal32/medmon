import AdminLayout from "@/Layouts/AdminLayout";
import {Deferred, Head, router, usePage} from "@inertiajs/react";
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/Components/ui/chart"
import {Area, AreaChart, Pie, PieChart, CartesianGrid, XAxis, YAxis, Brush, BarChart, Bar} from "recharts"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/Components/ui/card";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/Components/ui/select";
import {DatePickerWithRange} from "@/Components/date-range-picker";
import {toast} from "react-toastify"
import {PageProps} from "@/types";
import {toDate} from "date-fns"
import CategorySelect from "@/Components/CategorySelect";
import DateRangePickerState from "@/Components/DateRangePickerState";
import {Loader2, TrendingUp} from "lucide-react";
import {useMemo} from "react";
import {Word, WordCloud} from "@isoterik/react-word-cloud";
import * as React from "react";
import CenterLoading from "@/Components/CenterLoading";


interface DashboardProps extends PageProps {
    global_analytic: Array<any>;
    topic_analytic: Array<{
        "target_type_name": string;
        "total_news_count": number;
        "fill": string;
    }>;
    sentiment: Array<any>;
    word_cloud: Array<Word>;
}

export default function Dashboard() {

    const {
        global_analytic,
        user_targets,
        topic_analytic,
        sentiment,
        word_cloud
    } = usePage<DashboardProps>().props

    const chartConfig = useMemo(() => user_targets.reduce((acc: any, item) => {
        acc[item.target_type_name] = {
            label: item.target_type_name,
            color: item.target_type_color,
        };
        return acc;
    }, {}), [user_targets])

    const drawerContainerRef = React.useRef<HTMLDivElement>(null);

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
                        <Deferred fallback={
                            <CenterLoading className="lg:h-[38vh] h-[25vh] md:h-[80vh] w-full"/>
                        } data="global_analytic">
                            <ChartContainer
                                config={{
                                    ...chartConfig,
                                    date: {
                                        label: "Date",
                                    }
                                } as ChartConfig}
                                className="aspect-auto lg:h-[38vh] h-[25vh] md:h-[80vh] w-full">
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
                                    <ChartLegend className='w-full' content={<ChartLegendContent/>}/>
                                </AreaChart>
                            </ChartContainer>
                        </Deferred>
                    </CardContent>
                </Card>

                <div className="grid gap-6 lg:grid-cols-2">
                    <Card className="flex flex-col">
                        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                            <div className="grid flex-1 gap-1 text-center sm:text-left">
                                <CardTitle>Topic Trends</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <Deferred fallback={<CenterLoading className="lg:h-[35vh] h-[25vh] md:h-[80vh] w-full"/>}
                                      data="topic_analytic">
                                <ChartContainer
                                    config={{
                                        ...chartConfig,
                                        date: {
                                            label: "Date",
                                        }
                                    } as ChartConfig}
                                    className="mx-auto aspect-square lg:h-[35vh] h-[25vh] md:h-[80vh] pb-0 [&_.recharts-pie-label-text]:fill-foreground">
                                    <PieChart>
                                        <ChartTooltip content={<ChartTooltipContent/>}/>
                                        <Pie data={topic_analytic} dataKey="total_news_count" label
                                             nameKey="target_type_name"/>
                                        <ChartLegend content={<ChartLegendContent nameKey="target_type_name"/>}/>
                                    </PieChart>
                                </ChartContainer>
                            </Deferred>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                            <div className="grid flex-1 gap-1 text-center sm:text-left">
                                <CardTitle>Sentiment</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <Deferred fallback={<CenterLoading
                                className="lg:h-[35vh] h-[25vh] md:h-[80vh] lg:w-full w-[80vw]"/>}
                                      data="sentiment">
                                <ChartContainer config={{
                                    positive: {
                                        label: "Positive",
                                        color: "#4ade80",
                                    }, negative: {
                                        label: "Negative",
                                        color: "#f87171",
                                    },
                                    neutral: {
                                        label: "Neutral",
                                        color: "#a1a1aa",
                                    }
                                }} className="lg:h-[35vh] h-[25vh] md:h-[80vh] pb-0 lg:w-full w-[80vw]">
                                    <BarChart
                                        accessibilityLayer
                                        data={sentiment}
                                        layout="vertical">
                                        <XAxis type="number" dataKey="positive" hide/>
                                        <XAxis type="number" dataKey="negative" hide/>
                                        <XAxis type="number" dataKey="neutral" hide/>
                                        <YAxis
                                            dataKey="key"
                                            type="category"
                                            tickLine={false}
                                            axisLine={false}
                                            width={100}
                                        />
                                        <ChartTooltip
                                            cursor={false}
                                            content={<ChartTooltipContent hideLabel/>}
                                        />
                                        <Bar dataKey="positive" fill="#4ade80" radius={5}/>
                                        <Bar dataKey="negative" fill="#f87171" radius={5}/>
                                        <Bar dataKey="neutral" fill="#a1a1aa" radius={5}/>
                                    </BarChart>
                                </ChartContainer>
                            </Deferred>
                        </CardContent>
                    </Card>
                </div>
                <Card className="flex flex-col lg:h-[35vh] h-[25vh] md:h-[80vh] w-full">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1 text-center sm:text-left">
                            <CardTitle>Word Cloud</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <Deferred fallback={<CenterLoading className="w-full h-full"/>}
                                  data="word_cloud">
                            <div className="w-full h-full">
                                <WordCloud words={word_cloud} width={1000} height={200}/>
                            </div>
                        </Deferred>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    )
}
