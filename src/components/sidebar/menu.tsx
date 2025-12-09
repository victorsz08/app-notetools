import { Link, useLocation } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";
import { Collapsible } from "../ui/collapsible";

export interface MenuItemProps {
    label: string;
    href?: string;
    onClick?: () => void;
    icon: LucideIcon;
}

export function MenuItems({ items }: { items: Array<MenuItemProps> }) {
    const location = useLocation();

    return (
        <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupContent>
                    {items.map((item) => (
                        <Collapsible
                            key={item.label}
                            className="group/collapsible"
                            asChild
                        >
                            {item.onClick ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        tooltip={item.label}
                                        isActive={
                                            item.href === location.pathname
                                        }
                                        onClick={item.onClick}
                                        className="h-12 data-[active=true]:text-primary"
                                    >
                                        <item.icon />
                                        <p>{item.label}</p>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : (
                                <Link to={item.href}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            tooltip={item.label}
                                            isActive={
                                                item.href === location.pathname
                                            }
                                            className="h-12 data-[active=true]:text-primary"
                                        >
                                            <item.icon />
                                            <p>{item.label}</p>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </Link>
                            )}
                        </Collapsible>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarMenu>
    );
}
