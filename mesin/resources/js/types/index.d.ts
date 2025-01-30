export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    dashboard_logo?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
        roles: Array<string>;
        permissions: Array<string>;
        menus: Array<{
            title: string;
            type: string;
            icon: string;
            is_active: boolean;
            url: string;
        }>;
        type: "Media" | "Social Media";
    };
    flash: {
        message: string;
    } | null
    urls: {
        query: any;
        params: any;
    }
};
