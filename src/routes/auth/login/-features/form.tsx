import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/ui/button";

const credentialsSchema = z.object({
    username: z.string().nonempty("Campo username é obrigatório!"),
    password: z.string().nonempty("Campo senha é obrigatório!"),
});

type CredentialsForm = z.infer<typeof credentialsSchema>;

export function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const form = useForm<CredentialsForm>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",
    });

    function toggleVisibityPassword() {
        setIsVisible(!isVisible);
    }

    async function onSubmit(data: CredentialsForm) {
        setIsLoading(true);

        try {
            await login(data);
            router.navigate({ to: "/" });
        } catch (error) {
            form.setError("username", {
                message: "Username ou senha incorretos",
            });

            form.setError("password", {
                message: "Username ou senha incorretos",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="w-120 py-14 px-8">
            <CardHeader className="flex flex-col justify-center items-center">
                <CardTitle className="text-primary font-bold text-xl">
                    Entrar
                </CardTitle>
                <CardDescription className="text-xs font-light text-foreground/70">
                    Seja muito bem vindo! Entre na sua conta para continuar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5 w-full mt-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <Input
                                            {...field}
                                            placeholder="username"
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel>Senha</FormLabel>
                                        <Input
                                            className="relative"
                                            type={
                                                isVisible ? "text" : "password"
                                            }
                                            {...field}
                                            placeholder="************"
                                        />
                                        {!isVisible ? (
                                            <EyeClosed
                                                onClick={toggleVisibityPassword}
                                                className="w-5 h-5 text-primary absolute right-4 top-8"
                                            />
                                        ) : (
                                            <Eye
                                                onClick={toggleVisibityPassword}
                                                className="w-5 h-5 text-primary absolute right-4 top-8"
                                            />
                                        )}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            className="w-full h-12 mt-12"
                            disabled={isLoading}
                            type="submit"
                        >
                            {isLoading ? "Entrando..." : "Entrar"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="mt-5">
                <div className="flex flex-col w-full items-center justify-center gap-2">
                    <img src="/icon.svg" className="w-7 h-7" />
                    <div className="flex flex-col">
                        <p className="text-xs font-medium text-foreground/70">
                            Notetools 2024 - 2025
                        </p>
                        <small className="text-[0.6rem] text-muted-foreground/70">
                            Todos os direitos reservados
                        </small>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
