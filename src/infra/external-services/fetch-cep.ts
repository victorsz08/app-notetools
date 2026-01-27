import { api } from "@/lib/axios/api";
import { type FecthCepResponse } from "@/types";



export async function fetchCep(cep: number) {
    const response = await api.get<FecthCepResponse>(`cep/${cep}`);

    if(response.status !== 200) {
        throw new Error("Cep incorreto")
    };

    return response.data;
} 