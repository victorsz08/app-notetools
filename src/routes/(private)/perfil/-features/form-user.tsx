import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { updateUser } from "@/infra/user/update";
import type { BadRequestError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil, Save, UserRound, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const userSchema = z.object({
    username: z.string().nonempty("Username não pode ser vazio"),
    firstName: z.string().nonempty("Nome não pode ser vazio"),
    lastName: z.string().nonempty("Sobrenome não pode ser vazio"),
});

interface FormUserProps {
    user: {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
    };
}

type FormUpdateUser = z.infer<typeof userSchema>;

export function FormUser({ user }: FormUserProps) {
    const [editing, setEditing] = useState<boolean>(false);

    const form = useForm<FormUpdateUser>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
        },
    });

    const { mutate: update, isPending } = useMutation({
        mutationKey: ["update-user"],
        mutationFn: async (data: FormUpdateUser) => {
            await updateUser({
                id: user.id,
                username: data.username,
                firstName: data.firstName,
                lastName: data.lastName,
            });

            return;
        },
        onSuccess: () => {
            toast.success("Dados atualizados com sucesso!");
            setEditing(false);
        },
        onError: (error: BadRequestError<keyof FormUpdateUser>) => {
            for (const err of error.errors) {
                form.setError(err.path, {
                    message: err.message,
                });
            }
        },
    });

    function onSubmit(data: FormUpdateUser) {
        update(data);
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-3">
                    <div className="flex flex-col items-start gap-3 w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-4 rounded-full">
                                <UserRound className="w-8 h-8 text-background" />
                            </div>
                            <div className="flex flex-col text-start">
                                <p className="text-xl font-medium">
                                    {user.firstName} {user.lastName}
                                </p>
                                <p className="text-xs font-light text-muted-foreground">
                                    @{user.username}
                                </p>
                            </div>
                        </div>
                        <Separator />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <CardTitle className="text-lg mb-4 text-primary">
                        Atualizar dados
                    </CardTitle>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col space-y-6"
                    >
                        <FormField
                            name="username"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Username
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input {...field} disabled={!editing} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="firstName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Primeiro nome{" "}
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input {...field} disabled={!editing} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="lastName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Sobrenome
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input {...field} disabled={!editing} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="mt-6">
                            {editing ? (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        onClick={() => setEditing(false)}
                                        variant="secondary"
                                        type="button"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button disabled={isPending}>
                                        {isPending ? "Salvando..." : "Salvar"}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                    >
                                        Atualizar dados
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
