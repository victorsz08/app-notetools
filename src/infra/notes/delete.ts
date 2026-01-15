import { api } from "@/lib/axios/api";




interface DeleteNoteInput {
    id: string;
};


export async function deleteNote(input: DeleteNoteInput) {
    const response = await api.delete(`notes/${input.id}`);

    if(response.status !== 200) {
        throw new Error("Error in deleting note" + response.data)
    };

    return response;
}