import { api } from "@/lib/axios/api";


interface CreateNoteInput {
    title: string;
    content: string;
};

export async function createNote(input: CreateNoteInput) {
    const response = await api.post("notes", input);

    if(response.status !== 201) {
        throw new Error(response.data);
    };

    return response.data;
}