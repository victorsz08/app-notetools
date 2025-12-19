import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import type { Contract, Status } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BadgeStatus } from "../badge-status";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusContract } from "@/infra/contracts/update-status";
import { toast } from "sonner";

interface UpdateStatusDialogProps {
    contract: Contract;
}

const updateStatusContractSchema = z.object({
    status: z.enum(["CONECTADO", "PENDENTE", "CANCELADO"]),
});

export type UpdateStatusForm = z.infer<typeof updateStatusContractSchema>;

interface StatusOption {
    value: Status;
}
const statusOptions: Array<StatusOption> = [
    { value: "CONECTADO" },
    { value: "PENDENTE" },
    { value: "CANCELADO" },
];

export function UpdateStatusDialog({ contract }: UpdateStatusDialogProps) {
    const [open, setOpen] = useState(false);
    const client = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationKey: ["update-contract-status", contract.id],
        mutationFn: async (data: UpdateStatusForm) => {
            await updateStatusContract({
                id: contract.id,
                status: data.status as Status,
            });
        },
        onSuccess: () => {
            toast.success("Status do contrato atualizado com sucesso.");
            client.invalidateQueries({ queryKey: ["get-contracts"] });
            setOpen(false);
        },
    });
    const form = useForm<UpdateStatusForm>({
        resolver: zodResolver(updateStatusContractSchema),
        defaultValues: {
            status: contract.status,
        },
    });

    function onSubmit(data: UpdateStatusForm) {
        mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center text-foreground cursor-pointer hover:bg-muted gap-1 text-sm p-2">
                    <Settings className="w-4 h-4" />
                    <p>Atualizar Status</p>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atualizar status do contrato</DialogTitle>
                    <DialogDescription>
                        Contrato: {contract.number}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="space-y-2">
                                    <FormLabel>Status</FormLabel>
                                    <div className="flex items-center gap-2">
                                        <RadioGroup
                                            className="flex items-center gap-2"
                                            defaultValue={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            {statusOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center gap-2"
                                                >
                                                    <RadioGroupItem
                                                        value={option.value}
                                                    />
                                                    <BadgeStatus
                                                        variant={option.value}
                                                    />
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-6 flex items-center gap-1 justify-end">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending
                                    ? "Atualizando..."
                                    : "Atualizar Status"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
