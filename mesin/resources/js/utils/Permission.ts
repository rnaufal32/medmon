import {usePage} from "@inertiajs/react";

export const hasPermission = (param: string): boolean => {

    const {props: {auth: {permissions, roles}}} = usePage()

    return roles.includes(param) || permissions.includes(param);
}
