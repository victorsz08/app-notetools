import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";

export function Header() {
    const { toggleSidebar } = useSidebar();

    return (
        <header className="w-full h-16 bg-white flex items-center justify-between border-b border-muted-foreground/20 fixed px-4">
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
        </header>
    );
}
