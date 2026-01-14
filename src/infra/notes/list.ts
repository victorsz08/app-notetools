import { api } from "@/lib/axios/api";
import type { Note } from "@/types";



interface FecthNoteResponse {
    notes: Note[];
    total: number;
};



export async function fecthNotes() {
    const response = await api.get<FecthNoteResponse>("notes");

    if(response.status !== 200) {
        throw new Error("error fecth notes" + response.data);
    };

    return response.data;
}