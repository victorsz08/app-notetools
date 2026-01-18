import { ComboboxCities } from "@/components/input/combobox-cities";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calendar } from "../../ui/calendar";
import z from "zod";
import { ptBR } from "date-fns/locale";
import { Textarea } from "../../ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContract } from "@/infra/contracts/create-contract";
import type { BadRequestError, TypeContract } from "@/types";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";
import { addHours } from "date-fns";

const createContractSchema = z.object({
    number: z.string().min(1, "Campo número do contrato é obrigatório"),
    local: z.string().min(1, "Campo local é obrigatório"),
    observation: z.string().min(1, "Campo observação é obrigatório"),
    schedulingDate: z.date(),
    schedulingTime: z.string().min(1, "Selecione um horário de agendamento"),
    price: z.string().min(1, "Campo valor é obrigatório"),
    contact: z.string().min(1, "Campo telefone é obrigatório"),
    type: z.string().min(1, "Selecione um tipo do contrato"),
});

type CreateContractType = z.infer<typeof createContractSchema>;

interface StepProps {
    id: number;
    title: string;
    description: string;
}

const steps: Array<StepProps> = [
    {
        id: 1,
        title: "Informações básicas",
        description: "Número e localização",
    },
    {
        id: 2,
        title: "Agendamento",
        description: "Data e horário de instalação",
    },
    {
        id: 3,
        title: "Detalhes",
        description: "Contato do cliente e valor",
    },
];

const typeOptions = [
    { label: "Base", value: "BASE" },
    { label: "Prospect", value: "PROSPECT" },
];

const timeOptions = [
    "08:00 - 12:00",
    "08:00 - 19:00",
    "12:00 - 15:00",
    "12:00 - 18:00",
    "15:00 - 18:00",
];

export function CreateContractForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [currentStep, setCurrentStep] = useState<number>(1);

    const { mutate: create, isPending } = useMutation({
        mutationKey: ["create-contract"],
        mutationFn: async (data: CreateContractType) => {
            const {
                number,
                contact,
                local,
                observation,
                price,
                schedulingDate,
                schedulingTime,
                type,
            } = data;

            await createContract({
                number: Number(number),
                contact,
                local,
                observation,
                price: Number(price.replace("R$", "").replace(",", ".")),
                schedulingDate: addHours(schedulingDate, 3),
                schedulingTime,
                type: type as TypeContract,
            });

            return;
        },
        onSuccess: () => {
            toast.success("Contrato criado com sucesso!");
            queryClient.invalidateQueries({
                queryKey: ["get-contracts"],
            });
            router.navigate({ to: "/" });
        },
        onError: (error: BadRequestError<keyof CreateContractType>) => {
            error.errors.forEach((err) => {
                form.setError(err.path, {
                    message: err.message,
                });
            });
        },
    });

    const form = useForm<CreateContractType>({
        resolver: zodResolver(createContractSchema),
        defaultValues: {
            number: "",
            contact: "",
            local: "",
            observation: "Sem observações",
            price: "",
            schedulingDate: new Date(),
            schedulingTime: "",
            type: "PROSPECT",
        },
        mode: "onChange",
    });

    function transformPrice(price: string) {
        const valueFormatted = price.replace(/\D/g, "");
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(valueFormatted) / 100);
    }

    async function fieldValidation(step: number) {
        let fieldsToValidate: Array<keyof CreateContractType> = [];

        if (step === 1) {
            fieldsToValidate = ["number", "local", "type"];
        } else if (step === 2) {
            fieldsToValidate = ["schedulingDate", "schedulingTime"];
        } else {
            fieldsToValidate = ["price", "contact", "observation"];
        }

        const result = await form.trigger(fieldsToValidate);
        return result;
    }

    async function nextStep() {
        const isValid = await fieldValidation(currentStep);
        if (isValid && currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    async function onSubmit(data: CreateContractType) {
        create(data);
    }

    return (
        <div className="w-full mx-auto max-w-190 flex flex-col justify-between">
            <div className="mb-8 w-full">
                <div className="flex items-start justify-betwwen w-full">
                    {steps.map((item, index) => (
                        <div
                            key={item.id}
                            className={cn(
                                "flex items-start",
                                index < steps.length - 1 ? "flex-1" : "",
                            )}
                        >
                            <div className="flex flex-col items-center">
                                <div
                                    className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-medium border-2",
                                        currentStep > item.id
                                            ? "bg-primary border-primary text-background"
                                            : currentStep === item.id
                                              ? "border-primary text-primary bg-primary/10"
                                              : "border-muted-foreground/70 text-muted-foreground/70",
                                    )}
                                >
                                    {currentStep > item.id ? (
                                        <Check />
                                    ) : (
                                        item.id
                                    )}
                                </div>
                                <div className="mt-2 text-center">
                                    <p
                                        className={cn(
                                            "text-sm font-medium",
                                            currentStep >= item.id
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                        )}
                                    >
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground hidden sm:block">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={cn(
                                        "flex-1 h-1 mx-4 mt-[20px]",
                                        currentStep > item.id
                                            ? "bg-primary"
                                            : "bg-muted",
                                    )}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            N° do contrato{" "}
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                const valueFormatted =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    );
                                                field.onChange(valueFormatted);
                                            }}
                                            placeholder="ex: 123456789"
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
                                            Cidade/UF
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <ComboboxCities {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Tipo
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <div className="flex items-center justify-start gap-2">
                                            {typeOptions.map((item) => (
                                                <div
                                                    key={item.value}
                                                    className={cn(
                                                        "text-sm font-light py-2 px-4 cursor-pointer flex items-center justify-center rounded-sm",
                                                        item.value ===
                                                            field.value
                                                            ? "bg-primary text-white font-medium"
                                                            : "bg-muted-foreground/30 text-foreground",
                                                    )}
                                                    onClick={() =>
                                                        field.onChange(
                                                            item.value,
                                                        )
                                                    }
                                                >
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-8 mt-8 flex flex-col justify-center items-center">
                            <FormField
                                control={form.control}
                                name="schedulingDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(value) =>
                                                field.onChange(value)
                                            }
                                            locale={ptBR}
                                            className="w-80 bg-muted"
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
                                        <FormLabel>
                                            Horário de agendamento
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <div className="flex items-center justify-between gap-2 w-full">
                                            {timeOptions.map((item) => (
                                                <div
                                                    key={item}
                                                    className={cn(
                                                        "text-sm font-light py-2 px-4 cursor-pointer flex items-center justify-center rounded-sm",
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
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Telefone
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="88 88888 8888"
                                            maxLength={11}
                                            onChange={(e) => {
                                                const valueFormatted =
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        "",
                                                    );
                                                field.onChange(valueFormatted);
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
                                            Valor
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="R$0,00"
                                            onChange={(e) => {
                                                field.onChange(
                                                    transformPrice(
                                                        e.target.value,
                                                    ),
                                                );
                                            }}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="observation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Observações
                                            <strong className="text-destructive">
                                                *
                                            </strong>
                                        </FormLabel>
                                        <Textarea
                                            className="h-30 resize-none"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    <div className="mt-10 flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            disabled={currentStep === 1}
                            variant="secondary"
                            onClick={prevStep}
                        >
                            <ChevronLeft />
                            Anterior
                        </Button>
                        {currentStep < steps.length ? (
                            <Button type="button" onClick={nextStep}>
                                Próximo
                                <ChevronRight />
                            </Button>
                        ) : (
                            <Button disabled={isPending} type="submit">
                                {isPending ? "Criando..." : "Criar"}
                                <Plus />
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
