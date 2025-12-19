import { api } from "@/lib/axios/api";
import type { Status } from "@/types";

interface UpdateStatusContractInput {
    id: string;
    status: Status;
}

export async function updateStatusContract(
    input: UpdateStatusContractInput,
): Promise<void> {
    const response = await api.put(`/contracts/update-status/${input.id}`, {
        status: input.status,
    });
    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return;
}
