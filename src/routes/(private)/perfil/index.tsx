import { createFileRoute } from "@tanstack/react-router";
import { FormUser } from "./-features/form-user";
import { useAuth } from "@/context/auth-context";

export const Route = createFileRoute("/(private)/perfil/")({
    component: Profile,
    head: () => ({
        meta: [{ title: "Meu perfil | Notetools" }],
    }),
});

function Profile() {
    const { user } = useAuth();
    return (
        <main className="p-4">
            <FormUser user={user!} />
        </main>
    );
}
