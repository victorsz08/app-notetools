import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { updateSchedulingContract } from "@/infra/contracts/update-scheduling";
import { cn } from "@/lib/utils";
import type { BadRequestError, Contract } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHours } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarCog } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

interface UpdateSchedulingDialogProps {
    contract: Contract;
}

const updateSchedulingScheme = z.object({
    schedulingDate: z.date(),
    schedulingTime: z.string().nonempty("O horário é obrigatório"),
});

type UpdateSchedulingForm = z.infer<typeof updateSchedulingScheme>;

const timeOptions = [
    "08:00 - 12:00",
    "08:00 - 19:00",
    "12:00 - 15:00",
    "12:00 - 18:00",
    "15:00 - 18:00",
];

export function UpdateSchedulingDialog({
    contract,
}: UpdateSchedulingDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const client = useQueryClient();

    const form = useForm<UpdateSchedulingForm>({
        resolver: zodResolver(updateSchedulingScheme),
        defaultValues: {
            schedulingDate: contract.schedulingDate,
            schedulingTime: contract.schedulingTime,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["update-contract-scheduling", contract.id],
        mutationFn: async (data: UpdateSchedulingForm) => {
            await updateSchedulingContract({
                id: contract.id,
                schedulingDate: addHours(new Date(data.schedulingDate), 3),
                schedulingTime: data.schedulingTime,
            });
        },
        onSuccess: () => {
            toast.success("Agendamento atualizado com sucesso.");
            client.invalidateQueries({
                queryKey: ["get-contracts"],
            });
            setOpen(false);
        },
        onError: (error: BadRequestError<keyof UpdateSchedulingForm>) => {
            error.errors.forEach((err) => {
                form.setError(err.path, {
                    message: err.message,
                });
            });
        },
    });

    function onSubmit(data: UpdateSchedulingForm) {
        mutate(data);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center text-foreground cursor-pointer hover:bg-muted gap-1 text-sm p-2">
                    <CalendarCog className="w-4 h-4" />
                    <p>Atualizar agendamento</p>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-160 gap-10">
                <DialogHeader>
                    <DialogTitle>Atualizar Agendamento</DialogTitle>
                    <DialogDescription>
                        Contrato: {contract.number}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="schedulingDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center justify-center">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(value) =>
                                            field.onChange(value)
                                        }
                                        locale={ptBR}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="schedulingTime"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center justify-between gap-2 w-full">
                                        {timeOptions.map((item) => (
                                            <div
                                                key={item}
                                                className={cn(
                                                    "text-xs font-light py-2 px-4 cursor-pointer flex items-center justify-center rounded-sm",
                                                    item === field.value
                                                        ? "bg-primary text-white font-medium"
                                                        : "bg-muted-foreground/30 text-foreground",
                                                )}
                                                onClick={() =>
                                                    field.onChange(item)
                                                }
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center mt-10 justify-end gap-2">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button disabled={isPending} type="submit">
                                {isPending
                                    ? "Atualizando Agendamento"
                                    : "Atualizar Agendamento"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
