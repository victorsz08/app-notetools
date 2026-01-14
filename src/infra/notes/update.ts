import { api } from "@/lib/axios/api";




interface UpdateNoteInput {
    id: string;
    title: string;
    content: string;
};


export async function updateNote({ id, title, content } : UpdateNoteInput) {
    const response = await api.put(`notes/${id}`, { title, content });

    if(response.status !== 200) {
        throw new Error("Error update note" + response.data);
    };

    return;
}