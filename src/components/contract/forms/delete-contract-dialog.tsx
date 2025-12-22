import type { Contract } from "@/types";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogTitle,
    AlertDialogDescription,
} from "../../ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { deleteContract } from "@/infra/contracts/delete-contract";
import { toast } from "sonner";

interface DeleteContractDialogProps {
    contract: Contract;
}

export function DeleteContractDialog({ contract }: DeleteContractDialogProps) {
    const [open, setOpen] = useState<boolean>(false);

    const { mutate, isPending } = useMutation({
        mutationKey: ["delete-contract", contract.id],
        mutationFn: async () => deleteContract({ id: contract.id }),
        onSuccess: () => {
            toast.success("Contrato excluído com sucesso");
            setOpen(false);
        },
        onError: () => {
            toast.error(
                "Erro ao excluir o contrato! Tente novamente mais tarde.",
            );
        },
    });
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <div className="flex items-center text-destructive cursor-pointer gap-1 text-sm p-2">
                    <Trash className="w-4 h-4" />
                    <p>Excluir</p>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="p-10">
                <AlertDialogHeader>
                    <div className="flex flex-col justify-center items-center">
                        <AlertDialogTitle>
                            Você deseja excluir o contrato?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Contrato {contract.number} - {contract.local}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <div className="mt-10 flex items-center justify-center gap-2">
                    <AlertDialogCancel asChild>
                        <Button className="w-26" variant="secondary">
                            Cancelar
                        </Button>
                    </AlertDialogCancel>
                    <Button
                        disabled={isPending}
                        variant="destructive"
                        className="w-26"
                        onClick={() => mutate()}
                    >
                        {isPending ? "Excluindo..." : "Excluir"}
                    </Button>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
