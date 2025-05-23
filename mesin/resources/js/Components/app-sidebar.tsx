import * as React from "react"
import {
    BookOpen,
    Bot,
    Command,
    Frame,
    LifeBuoy,
    Map,
    PieChart,
    Send,
    Settings2,
    SquareTerminal,
} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {usePage} from "@inertiajs/react";

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {

    const {
        props: {
            auth: {
                menus,
                user
            }
        }
    } = usePage()

    return (
        <Sidebar variant="inset" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div
                                    className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Nama Perusahaan</span>
                                    {/*<span className="truncate text-xs">Enterprise</span>*/}
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={menus.map((e) => ({
                    title: e.title,
                    url: e.url,
                    icon: e.icon,
                    isActive: e.is_active,
                }))}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{
                    name: user.name,
                    email: user.email,
                    avatar: "/avatars/shadcn.jpg",
                }}/>
            </SidebarFooter>
        </Sidebar>
    )
}
