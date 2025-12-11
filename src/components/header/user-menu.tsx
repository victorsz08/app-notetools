import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./../ui/avatar";
import { UserRound } from "lucide-react";
import { Separator } from "../ui/separator";
import type { User } from "@/types";
import { Link } from "@tanstack/react-router";

interface UserMenuProps {
    user: User | null;
    logout: () => Promise<void>;
}

export function UserMenu({ user, logout }: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-primary w-8 h-8">
                    <AvatarFallback className="text-background bg-primary ">
                        <UserRound className="w-5 h-5" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                        <Avatar className="bg-primary w-6 h-6">
                            <AvatarFallback className="text-background bg-primary ">
                                <UserRound className="text-background" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start -space-y-1">
                            <p className="text-foreground font-medium">
                                {user?.username}
                            </p>
                            <p className="text-xs font-light text-foreground/70">
                                {user?.firstName} {user?.lastName}
                            </p>
                        </div>
                    </div>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem className="text-xs text-muted-foreground">
                    <Link to="/perfil">
                        <p>Meu Perfil</p>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-destructive text-xs"
                    onClick={logout}
                >
                    Sair
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
