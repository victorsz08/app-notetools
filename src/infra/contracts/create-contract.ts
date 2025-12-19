import { api } from "@/lib/axios/api";
import type { TypeContract } from "@/types";

interface CreateContractInput {
    number: number;
    local: string;
    observation: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    contact: string;
    type: TypeContract;
}

export async function createContract(input: CreateContractInput) {
    const response = await api.post("contracts", input);

    if (response.status !== 201) {
        throw response.data;
    }

    return;
}
