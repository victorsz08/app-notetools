import { createFileRoute } from "@tanstack/react-router";
import { FormUser } from "./-features/form-user";
import { useAuth } from "@/context/auth-context";
import { FormPassword } from "./-features/form-password";

export const Route = createFileRoute("/(private)/perfil/")({
    component: Profile,
    head: () => ({
        meta: [{ title: "Meu perfil | Notetools" }],
    }),
});

function Profile() {
    const { user } = useAuth();
    return (
        <main className="py-4 px-30 space-y-6">
            <FormUser user={user!} />
            <FormPassword />
        </main>
    );
}
