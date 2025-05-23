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

export default function AdminLayout(props: {
    children: React.ReactNode,
    breadcumb?: string,
}) {
    return (
        <SidebarProvider
            style={{}}>
            <ToastContainer/>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1"/>
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
                    {props.children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
