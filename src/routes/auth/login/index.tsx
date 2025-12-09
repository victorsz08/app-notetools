import { useAuth } from "@/context/auth-context";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { LoginForm } from "./-features/form";

export const Route = createFileRoute("/auth/login/")({
    component: () => {
        const auth = useAuth();
        const router = useRouter();

        if (auth.isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <p>Carregando...</p>
                </div>
            );
        }

        if (auth.isAuthenticated) {
            router.navigate({ to: "/", replace: true });
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <p>Redirecionando...</p>
                </div>
            );
        }

        return <Login />;
    },
});

function Login() {
    return (
        <section className="w-full flex h-screen">
            <section className="w-full h-screen bg-linear-to-r from-background to-white grid justify-center items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                    <img src="/icon.svg" className="w-20 h-20" />
                    <div className="flex flex-col items-center">
                        <h1 className="font-bold text-foreground text-xl">
                            Notetools
                        </h1>
                        <p className="text-sm font-light text-muted-foreground">
                            Gestão Inteligente
                        </p>
                    </div>
                </div>
            </section>
            <section className="bg-linear-to-r from-primary/70 to-primary w-full h-screen grid justify-center items-center">
                <LoginForm />
            </section>
        </section>
    );
}
