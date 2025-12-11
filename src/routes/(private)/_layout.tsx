import { Header } from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
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

        if (!auth.isAuthenticated) {
            router.navigate({ to: "/auth/login", replace: true });
            return (
                <div className="flex items-center justify-center min-h-screen">
                    <p>Redirecionando...</p>
                </div>
            );
        }

        return <Layout />;
    },
});

function Layout() {
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar variant="sidebar" collapsible="icon" />
            <main className="w-full bg-background">
                <Header />
                <Outlet />
            </main>
        </SidebarProvider>
    );
}
