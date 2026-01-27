import { fetchCep } from "@/infra/external-services/fetch-cep";
import { type FecthCepResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { StrepView, StrepViewTitle } from "../contract/strep-view";

const findStreetSchema = z.object({
    cep: z.string().nonempty("O campo não pode ser vazio"),
});

type FindStreetForm = z.infer<typeof findStreetSchema>;

export function FormFindStreet() {
    const [result, setResult] = useState<FecthCepResponse | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const form = useForm<FindStreetForm>({
        resolver: zodResolver(findStreetSchema),
        defaultValues: {
            cep: "",
        },
    });

    function handleChangeCep(cep: string) {
        const cepFormatted = cep.replace(/\D/g, "");
        if (cepFormatted.length < 8) {
            return cepFormatted;
        }

        return cepFormatted.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    }

    const onSubmit = async (data: FindStreetForm) => {
        const cep = data.cep.replace(/\D/g, "");
        setIsPending(true);

        try {
            const response = await fetchCep(Number(cep));
            setResult(response);
            form.reset();
        } catch {
            form.setError("cep", {
                message: "CEP inválido!",
            });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Card>
            <CardHeader className="-space-y-1">
                <CardTitle className="text-lg font-bold text-primary">
                    Buscar Logradouros
                </CardTitle>
                <CardDescription className="text-xs font-light text-muted-foreground">
                    Busque logradouros através do cep
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="flex items-center gap-2"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            name="cep"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Input
                                        placeholder="00000-000"
                                        {...field}
                                        onChange={(e) => {
                                            setResult(null);
                                            field.onChange(
                                                handleChangeCep(e.target.value),
                                            );
                                        }}
                                        maxLength={9}
                                        className="w-full"
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} className="w-30 h-12">
                            {isPending ? "Buscando..." : "Buscar"}
                        </Button>
                    </form>
                </Form>
                <div className="flex items-center gap-2 mt-16 px-3 py-6 bg-muted rounded-sm">
                    {result && (
                        <StrepView>
                            <StrepViewTitle>Logradouro</StrepViewTitle>
                            <p className="text-sm font-light text-primary">
                                {result.street === ""
                                    ? "Não informado"
                                    : result.street}
                                ,{" "}
                                {result.neighborhood === ""
                                    ? "Não informado"
                                    : result.neighborhood}
                                , {result.city}-{result.state} - CEP:{" "}
                                {result.cep}
                            </p>
                        </StrepView>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
