import { Button } from "@/components/ui/button";
import { createNote } from "@/infra/notes/create";
import { deleteNote } from "@/infra/notes/delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import { NotepadText, Plus, StickyNote, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ItemNotes {
    id: string;
    title: string;
}

export function SidebarNotes({ items }: { items: ItemNotes[] }) {
    const router = useRouter();
    const client = useQueryClient();

    const [activeDelete, setActiveDelete] = useState<string>("");

    const { mutate: create } = useMutation({
        mutationKey: ["create-note"],
        mutationFn: async () =>
            createNote({
                title: "Título",
                content: "...",
            }),
        onSuccess: (response) => {
            client.invalidateQueries({ queryKey: ["get-notes"] });
            toast.success("Anotação criada com sucesso!");
            router.navigate({ to: `/notas`, search: { id: response.id } });
        },
    });

    const { mutate: deleteNoteId } = useMutation({
        mutationKey: ["delete-note"],
        mutationFn: async (id: string) => deleteNote({ id }),
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["get-notes"] });
            toast.success("Anotação excluida com sucesso!");
        },
    });
    return (
        <section className="min-w-64 border-r border-muted-foreground/20 max-w-64 h-screen bg-card/70 flex flex-col">
            {items.length > 0 ? (
                <div className="p-4">
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="p-0 w-fit h-fit"
                            onClick={() => create()}
                        >
                            <Plus />
                        </Button>
                        <small className="text-[.6rem] font-bold text-foreground/70">
                            MINHAS ANOTAÇÕES
                        </small>
                    </div>
                    <div className="flex flex-col gap-2 mt-6 overflow-y-scroll no-scrollbar">
                        {items.map((item) => (
                            <Link
                                to={`/notas`}
                                search={{
                                    id: item.id,
                                }}
                                key={item.id}
                                onMouseEnter={() => setActiveDelete(item.id)}
                                onMouseLeave={() => setActiveDelete("")}
                                className="text-xs p-2 h-12 hover:bg-background/70 justify-between rounded-sm flex items-center gap-1 hover:bg-background font-semibold text-foreground"
                            >
                                <div className="flex items-center gap-1">
                                    <NotepadText className="w-4 h-4 mr-2" />
                                    <p className="truncate w-full">
                                        {item.title}
                                    </p>
                                </div>
                                {activeDelete === item.id && (
                                    <Button
                                        onClick={() => deleteNoteId(item.id)}
                                        variant="ghost"
                                        size="icon-sm"
                                        className="p-1 w-fit h-fit rounded-sm cursor-pointer hover:bg-destructive/10"
                                    >
                                        <X className="w-2 h-2 text-destructive" />
                                    </Button>
                                )}
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
                    <Button onClick={() => create()} variant="ghost" size="sm">
                        <Plus />
                        Nova anotação
                    </Button>
                </div>
            )}
        </section>
    );
}
