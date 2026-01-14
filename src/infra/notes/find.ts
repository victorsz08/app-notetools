import { api } from "@/lib/axios/api";
import { type Note } from "@/types";




interface FindNoteInput {
    id: string;
};


export async function findNote(input: FindNoteInput) {
    const response = await api.get<Note>(`/notes/${input.id}`);

    if(response.status !== 200) {
        throw new Error("Erro fetch note" + response.data)
    };

    return response.data;
}