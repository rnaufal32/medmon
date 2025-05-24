import {AppSidebar} from "@/Components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {ToastContainer} from "react-toastify";
import CategorySelect from "@/Components/CategorySelect";
import DateRangePickerState from "@/Components/DateRangePickerState";
import * as React from "react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/Components/ui/drawer";
import {Button} from "@/Components/ui/button";
import {Menu} from "lucide-react";
import {usePage} from "@inertiajs/react";
import {NavMain} from "@/Components/nav-main";
import MobileSidebar from "@/Components/mobile-sidebar";

export default function AdminLayout(props: {
    children: React.ReactNode,
    breadcumb?: string,
}) {

    const {menus} = usePage().props.auth

    return (
        <SidebarProvider>
            <ToastContainer/>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 md:flex hidden"/>
                        <MobileSidebar
                            trigger={<Button className="md:hidden" variant="ghost" size="sm"><Menu/></Button>}/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        {props.breadcumb && (
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>{props.breadcumb}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>)
                        }
                    </div>
                </header>
                <div className="flex flex-1 flex-col p-4 pt-0">
                    <div className="flex justify-between mb-5 gap-6 md:hidden">
                        <CategorySelect/>
                        <DateRangePickerState/>
                    </div>
                    {props.children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
