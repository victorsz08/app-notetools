import { Button } from "@/components/ui/button";
import { createNote } from "@/infra/notes/create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { NotepadText, Plus, StickyNote } from "lucide-react";

interface ItemNotes {
    id: string;
    title: string;
}

export function SidebarNotes({ items }: { items: ItemNotes[] }) {
    const router = useRouter();
    const client = useQueryClient();

    const { mutate } = useMutation({
        mutationKey: ["create-note"],
        mutationFn: async () =>
            createNote({
                title: "Título",
                content: "...",
            }),
        onSuccess: (response) => {
            client.invalidateQueries({ queryKey: ["get-notes"] });
            router.navigate({ to: `/notas`, search: { id: response.id } });
        },
    });
    return (
        <section className="w-64 h-screen bg-card flex flex-col">
            {items.length > 0 ? (
                <div className="p-4">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="p-0 w-fit h-fit"
                            onClick={() => mutate()}
                        >
                            <Plus />
                        </Button>
                        <small className="text-[.6rem] font-bold text-foreground/70">
                            MINHAS ANOTAÇÕES
                        </small>
                    </div>
                    <div className="flex flex-col gap-2 mt-6">
                        {items.map((item) => (
                            <Link
                                to={`/notas`}
                                search={{
                                    id: item.id,
                                }}
                                className="text-xs p-2 rounded-sm flex items-center gap-1 hover:bg-background font-semibold text-foreground"
                            >
                                <NotepadText className="w-4 h-4 mr-2" />
                                <p className="truncate w-full">{item.title}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center h-full">
                    <StickyNote className="w-10 h-10 mb-2 text-muted-foreground" />
                    <p className="text-xs mb-3 font-light text-muted-foreground">
                        Você ainda não possui anotações
                    </p>
                    <Button onClick={() => mutate()} variant="ghost" size="sm">
                        <Plus />
                        Nova anotação
                    </Button>
                </div>
            )}
        </section>
    );
}
