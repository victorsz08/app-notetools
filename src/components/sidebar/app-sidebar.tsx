import { Clipboard, Home, LogOut, Notebook, UserRound } from "lucide-react";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import { HeaderSidebar } from "./header-sidebar";
import { MenuItems, type MenuItemProps } from "./menu";
import { useAuth } from "@/context/auth-context";
import { Separator } from "../ui/separator";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { logout } = useAuth();

    const mainItems: Array<MenuItemProps> = [
        {
            label: "Dashboard",
            href: "/",
            icon: Home,
        },
        {
            label: "Contratos",
            href: "/contratos",
            icon: Clipboard,
        },
        {
            label: "Notas",
            href: "/notas",
            icon: Notebook,
        },
    ];

    const userItems: Array<MenuItemProps> = [
        {
            label: "Meu Perfil",
            href: "/perfil",
            icon: UserRound,
        },
        {
            label: "Sair",
            onClick: logout,
            icon: LogOut,
        },
    ];

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <HeaderSidebar />
            </SidebarHeader>
            <Separator />
            <SidebarContent className="flex flex-col justify-between">
                <MenuItems items={mainItems} />
                <div>
                    <Separator />
                    <MenuItems items={userItems} />
                </div>
            </SidebarContent>
        </Sidebar>
    );
}
