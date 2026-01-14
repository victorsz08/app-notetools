import { findNote } from "@/infra/notes/find";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { TextEditor } from "./-features/editor";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { updateNote } from "@/infra/notes/update";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

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
        if (!note) return;

        if (debouncedContent !== note.content) {
            update({
                id: note.id,
                title,
                content: debouncedContent,
            });
        }
    }, [debouncedTitle]);

    useEffect(() => {
        if (!note) return;

        if (debouncedContent !== note.content) {
            update({
                id: note.id,
                title,
                content: debouncedContent,
            });
        }
    }, [debouncedContent]);

    if (!id) {
        return <p>Selecione uma nota</p>;
    }

    if (!note) {
        return <p>Selecione uma nota</p>;
    }

    return (
        <main className="w-full h-screen bg-card">
            <div className="p-2 flex items-center justify-between w-full">
                <div>
                    <p className="text-[.6rem] font-bold text-foreground">
                        Título:
                    </p>
                    <input
                        className="text-sm min-w-100 outline-0 font-light text-muted-foreground border-none bg-card"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="max-w-fit">
                    <p className="text-[.7rem] font-light text-muted-foreground italic">
                        Atualizado{" "}
                        {formatDistanceToNow(note.updatedAt, {
                            locale: ptBR,
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
            <TextEditor key={note.id} content={content} onChange={setContent} />
        </main>
    );
}
