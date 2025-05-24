import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/Components/ui/drawer";
import {Button} from "@/Components/ui/button";
import {Command, Loader2, Menu} from "lucide-react";
import {NavMain} from "@/Components/nav-main";
import * as React from "react";
import {usePage} from "@inertiajs/react";
import {NavUser} from "@/Components/nav-user";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, navigationMenuTriggerStyle
} from "@/Components/ui/navigation-menu";

export default function MobileSidebar(props: {
    trigger: React.ReactNode
}) {

    const {
        menus, user
    } = usePage().props.auth;

    return (
        <Drawer>
            <DrawerTrigger asChild>
                {props.trigger}
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <div className="px-8 flex flex-row gap-4 items-center mt-6">
                        <div
                            className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Command className="size-4"/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">Nama Perusahaan</span>
                            {/*<span className="truncate text-xs">Enterprise</span>*/}
                        </div>
                    </div>
                    <div className="px-4 py-6 flex">
                        <NavigationMenu orientation="vertical">
                            <NavigationMenuList className="flex-col items-start space-x-0">
                                <NavigationMenuItem>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Documentation
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <DrawerClose asChild>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            <div className="flex gap-2 items-center">
                                                <Loader2/> Documentation
                                            </div>
                                        </NavigationMenuLink>
                                    </DrawerClose>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <DrawerFooter>
                        <NavUser user={{
                            name: user.name,
                            email: user.email,
                            avatar: "/avatars/shadcn.jpg",
                        }}/>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
