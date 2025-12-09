import { Link } from "@tanstack/react-router";

export function HeaderSidebar() {
    return (
        <Link to="/">
            <div className="flex items-center gap-2 py-4">
                <img src="/icon.svg" className="w-8 h-8" />
                <div className="text-start -space-y-2 group-data-[collapsible=icon]:hidden">
                    <h1 className="text-foreground font-bold text-lg">
                        Notetools
                        <strong className="font-extrabold text-primary">
                            Pro
                        </strong>
                    </h1>
                    <small className="text-xs font-light text-muted-foreground">
                        Gestão Inteligente
                    </small>
                </div>
            </div>
        </Link>
    );
}
