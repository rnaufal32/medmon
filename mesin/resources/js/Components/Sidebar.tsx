import {usePage} from "@inertiajs/react";
import {Icon} from "@iconify-icon/react";

const Menu = (props: {
    active: boolean;
    label: string;
    icon: string;
    url: string;
}) => {


    return (
        <li>
            <a className={props.active ? "flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100" : "w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100"}
               href={props.url}>
                <Icon icon={props.icon} width={24} height={24}/>
                {props.label}
            </a>
        </li>
    )
}

export default function () {

    const {
        props: {
            auth: {
                user,
                menus,
            }
        }
    } = usePage();

    return (
        <div id="hs-application-sidebar" className="hs-overlay  [--auto-close:lg]
                  hs-overlay-open:translate-x-0
                  -translate-x-full transition-all duration-300 transform
                  w-[260px] h-full
                  hidden
                  fixed inset-y-0 start-0 z-[60]
                  bg-white border-e border-gray-200
                  lg:block lg:translate-x-0 lg:end-auto lg:bottom-0
                 " role="dialog" aria-label="Sidebar">
            <div className="relative flex flex-col h-full max-h-full">
                <div className="px-6 pt-4 flex items-center">
                    <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80"
                       href="#" aria-label="Preline">
                        <img src={user.dashboard_logo} alt={user.name} className="max-w-[150px]"/>
                    </a>

                    <div className="hidden lg:block ms-2">

                    </div>
                </div>

                <div
                    className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                    <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap"
                         data-hs-accordion-always-open>
                        <ul className="flex flex-col space-y-1">
                            {menus.map((e) => <Menu label={e.title} active={e.is_active} key={e.title} icon={e.icon}
                                                    url={e.url}/>)}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
