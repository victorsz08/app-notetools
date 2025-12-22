import { ComboboxCities } from "@/components/input/combobox-cities";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { updateContract } from "@/infra/contracts/update-contract";
import type { BadRequestError, Contract, TypeContract } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PenBox } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { BadgeType } from "../badge-type";
import { Button } from "@/components/ui/button";

interface UpdateContractDialogProps {
    contract: Contract;
}

const updateContractSchema = z.object({
    number: z.string().min(1, "Número é obrigatório"),
    observation: z.string(),
    price: z.string().min(1, "Preço é obrigatório"),
    type: z.string().min(1, "Selecione um tipo"),
    contact: z.string().min(1, "Contato é obrigatório"),
    local: z.string().min(1, "Local é obrigatório"),
});

type UpdateContractForm = z.infer<typeof updateContractSchema>;

const typeOptions = [
    { label: "Base", value: "BASE" },
    { label: "Prospect", value: "PROSPECT" },
];

export function UpdateContractDialog({ contract }: UpdateContractDialogProps) {
    const [open, setOpen] = useState<boolean>(false);
    const client = useQueryClient();

    const form = useForm<UpdateContractForm>({
        resolver: zodResolver(updateContractSchema),
        defaultValues: {
            number: String(contract.number),
            observation: contract.observation || "",
            price: String(contract.price),
            type: contract.type,
            contact: contract.contact,
            local: contract.local,
        },
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ["update-contract", contract.id],
        mutationFn: async (data: UpdateContractForm) => {
            await updateContract({
                id: contract.id,
                number: Number(data.number),
                observation: data.observation,
                price: Number(
                    data.price.replace("R$", "").replace(",", ".").trim(),
                ),
                type: data.type as Contract["type"],
                contact: data.contact,
                local: data.local,
            });
        },
        onSuccess: () => {
            toast.success("Contrato atualizado com sucesso");
            client.invalidateQueries({ queryKey: ["get-contracts"] });
            setOpen(false);
        },
        onError: (error: BadRequestError<keyof UpdateContractForm>) => {
            error.errors.forEach((err) => {
                form.setError(err.path, {
                    message: err.message,
                });
            });
        },
    });

    function onSubmit(data: UpdateContractForm) {
        mutate(data);
    }

    function transformPrice(price: string) {
        const valueFormatted = price.replace(/\D/g, "");
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(valueFormatted) / 100);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="flex items-center text-foreground cursor-pointer hover:bg-muted gap-1 text-sm p-2">
                    <PenBox className="w-4 h-4" />
                    <p>Atualizar informações</p>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-160">
                <DialogHeader>
                    <DialogTitle>Atualizar contrato</DialogTitle>
                    <DialogDescription>
                        Contrato: {contract.number}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        className="mt-8"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            N° do contrato
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                const valueFormated =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    );
                                                field.onChange(valueFormated);
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="local"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Cidade/UF{" "}
                                            <strong className="text-destructive">
                                                *
                                            </strong>{" "}
                                        </FormLabel>
                                        <ComboboxCities {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Telefone{" "}
                                                <strong className="text-destructive">
                                                    *
                                                </strong>{" "}
                                            </FormLabel>
                                            <Input
                                                {...field}
                                                onChange={(e) => {
                                                    const valueFormated =
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            "",
                                                        );
                                                    field.onChange(
                                                        valueFormated,
                                                    );
                                                }}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Valor{" "}
                                                <strong className="text-destructive">
                                                    *
                                                </strong>{" "}
                                            </FormLabel>
                                            <Input
                                                value={field.value}
                                                onChange={(e) => {
                                                    const valueFormated =
                                                        transformPrice(
                                                            e.target.value,
                                                        );
                                                    field.onChange(
                                                        valueFormated,
                                                    );
                                                }}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Tipo{" "}
                                                <strong className="text-destructive">
                                                    *
                                                </strong>{" "}
                                            </FormLabel>
                                            <RadioGroup
                                                defaultValue={field.value}
                                                onValueChange={field.onChange}
                                                className="flex flex-row gap-4"
                                            >
                                                {typeOptions.map((option) => (
                                                    <div
                                                        key={option.value}
                                                        className="flex items-center space-x-2"
                                                    >
                                                        <RadioGroupItem
                                                            value={option.value}
                                                        />
                                                        <BadgeType
                                                            variant={
                                                                option.value as TypeContract
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="observation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Observações</FormLabel>
                                        <Textarea
                                            {...field}
                                            className="resize-none h-24"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 w-full mt-6">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Atualizando..." : "Atualizar"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
