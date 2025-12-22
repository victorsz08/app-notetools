import { api } from "@/lib/axios/api";

interface DeleteContractInput {
    id: string;
}

export async function deleteContract(
    input: DeleteContractInput,
): Promise<void> {
    const response = await api.delete(`contracts/${input.id}`);

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return;
}
