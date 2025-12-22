import type { Contract } from "@/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { DialogViewContract } from "./forms/dialog-view";
import { UpdateStatusDialog } from "./forms/dialog-update-status";
import { UpdateSchedulingDialog } from "./forms/dialog-update-scheduling";
import { UpdateContractDialog } from "./forms/update-contract-dialog";
import { DeleteContractDialog } from "./forms/delete-contract-dialog";

interface MenuContractProps {
    contract: Contract;
}

export function MenuContract({ contract }: MenuContractProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" type="button">
                    <Ellipsis />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-full">
                <DropdownMenuItem asChild>
                    <DialogViewContract contract={contract} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateStatusDialog contract={contract} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateSchedulingDialog contract={contract} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <UpdateContractDialog contract={contract} />
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <DeleteContractDialog contract={contract} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
