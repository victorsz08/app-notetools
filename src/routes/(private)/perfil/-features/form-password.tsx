import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { updatePassword } from "@/infra/user/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Dot } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordSchema = z
    .object({
        currentPassword: z.string().nonempty("Senha atual não pode ser vazio"),
        newPassword: z
            .string()
            .min(8, "A nova senha deve conter no mínimo 8 digitos")
            .max(56, "Password must be at most 56 characters")
            .regex(
                /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]:;"'<>,.?/|\\]).+$/,
                "Password must contain at least one uppercase letter, one number, and one special character",
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas não correspondem",
        path: ["confirmPassword"],
    });

type FormUpdatePassword = z.infer<typeof passwordSchema>;

export function FormPassword() {
    const { user } = useAuth();
    const [editing, setEditing] = useState<boolean>(false);

    const form = useForm<FormUpdatePassword>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const { mutate: update, isPending } = useMutation({
        mutationKey: ["update-password"],
        mutationFn: async (data: FormUpdatePassword) => {
            await updatePassword({
                id: user?.id!,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            });
        },
        onSuccess: () => {
            toast.success("Senha atualizada com sucesso!");
            setEditing(false);
            form.reset();
        },
        onError: () => {
            form.setError("currentPassword", {
                message: "A senha atual está incorreta!",
            });
        },
    });

    function onSubmit(data: FormUpdatePassword) {
        update(data);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg text-primary">
                    Atualizar senha
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            name="currentPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Senha atual
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="************"
                                        disabled={!editing}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="newPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Nova senha
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="************"
                                        disabled={!editing}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="confirmPassword"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xs text-muted-foreground">
                                        Confirme a senha
                                        <strong className="text-destructive">
                                            *
                                        </strong>
                                    </FormLabel>
                                    <Input
                                        type="password"
                                        placeholder="************"
                                        disabled={!editing}
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>
                            <FormDescription className="bg-muted rounded-sm w-100 text-xs p-3">
                                <p className="flex items-center gap-1">
                                    <Dot /> Deve conter no mínimo 8 carateres
                                </p>
                                <p className="flex items-center gap-1">
                                    <Dot /> Deve conter pelo menos um caractere
                                    especial (* % &)
                                </p>
                                <p className="flex items-center gap-1">
                                    <Dot /> Deve conter pelo menos um número
                                </p>
                            </FormDescription>
                        </div>
                        <div className="flex items-center justify-end gap-2 w-full mt-3">
                            {!editing ? (
                                <Button
                                    type="button"
                                    onClick={() => setEditing(true)}
                                >
                                    Atualizar senha
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        disabled={isPending}
                                        onClick={() => setEditing(false)}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button disabled={isPending}>
                                        {isPending ? "Salvando..." : "Salvar"}
                                    </Button>
                                </>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
