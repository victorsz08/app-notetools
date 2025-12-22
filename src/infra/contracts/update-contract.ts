import { api } from "@/lib/axios/api";
import type { TypeContract } from "@/types";

interface UpdateContractInput {
    id: string;
    number: number;
    observation: string;
    price: number;
    type: TypeContract;
    contact: string;
    local: string;
}

export async function updateContract(
    input: UpdateContractInput,
): Promise<void> {
    const response = await api.put(`/contracts/${input.id}`, {
        number: input.number,
        observation: input.observation,
        price: input.price,
        type: input.type,
        contact: input.contact,
        local: input.local,
    });

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return;
}
