import { findNote } from "@/infra/notes/find";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TextEditor } from "./-features/editor";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { updateNote } from "@/infra/notes/update";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, Notebook } from "lucide-react";

export const Route = createFileRoute("/(private)/notas/")({
    head: () => ({
        meta: [{ title: "Anotações | Notetools" }],
    }),
    component: NotesPage,
});

function NotesPage() {
    const { id } = Route.useSearch();
    const client = useQueryClient();

    const { data: note } = useQuery({
        queryKey: ["get-note", id],
        queryFn: async () => findNote({ id: id! }),
        enabled: !!id,
    });

    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [debouncedContent] = useDebounce(content, 3000);
    const [debouncedTitle] = useDebounce(title, 500);

    const { mutate: update } = useMutation({
        mutationFn: updateNote,
        mutationKey: ["update-note"],
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ["get-notes"] });
        },
    });

    useEffect(() => {
        if (note) {
            setContent(note.content);
            setTitle(note.title);
        }
    }, [note?.id]);

    useEffect(() => {
        if (!note || !content) return;

        if (debouncedContent !== note.content) {
            update({
                id: note.id,
                title,
                content: debouncedContent,
            });
        }
    }, [debouncedTitle]);

    useEffect(() => {
        if (!note || !content) return;

        if (debouncedContent !== note.content) {
            update({
                id: note.id,
                title,
                content: debouncedContent,
            });
        }
    }, [debouncedContent]);

    if (!id) {
        return (
            <div className="grid justify-center items-center h-screen w-full">
                <div className="flex flex-col gap-1 items-center">
                    <Notebook className="text-foreground/80 w-8 h-8" />
                    <p className="text-sm font-light text-foreground/80">
                        Selecione uma nota
                    </p>
                </div>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="grid justify-center items-center h-screen w-full">
                <div className="flex flex-col gap-1 items-center">
                    <Notebook className="text-foreground/80 w-8 h-8" />
                    <p className="text-sm font-light text-foreground/80">
                        Selecione uma nota
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="w-full h-screen bg-card">
            <div className="flex items-center justify-between w-full">
                <div className="p-2">
                    <p className="text-[.6rem] font-bold text-muted-foreground">
                        Título:
                    </p>
                    <input
                        className="text-base min-w-100 outline-0 font-medium text-foreground border-none bg-card"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="max-w-fit pr-3">
                    <p className="text-[.7rem] font-light flex items-center text-muted-foreground">
                        <Clock className="text-muted-foreground w-4 h-4 mr-1" />
                        Atualizado{" "}
                        {formatDistanceToNow(note.updatedAt, {
                            locale: ptBR,
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
            <TextEditor
                key={note.id}
                content={note.content}
                onChange={setContent}
            />
        </main>
    );
}
