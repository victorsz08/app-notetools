import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { UserMenu } from "./user-menu";
import { useAuth } from "@/context/auth-context";

export function Header() {
    const { toggleSidebar } = useSidebar();
    const { user, logout } = useAuth();

    return (
        <header className="w-full z-[1000] h-16 bg-white/80 flex items-center justify-between border-b border-muted-foreground/20 px-4">
            <div>
                <Button
                    size="icon"
                    variant="ghost"
                    className="bg-transparent hover:bg-tranparent"
                    onClick={toggleSidebar}
                >
                    <Menu />
                </Button>
            </div>
            <UserMenu user={user} logout={logout} />
        </header>
    );
}
