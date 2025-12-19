import { api } from "@/lib/axios/api";

interface UpdateSchedulingContractInput {
    id: string;
    schedulingDate: Date;
    schedulingTime: string;
}

export async function updateSchedulingContract(
    input: UpdateSchedulingContractInput,
): Promise<void> {
    const response = await api.put(`contracts/update-scheduling/${input.id}`, {
        schedulingDate: input.schedulingDate,
        schedulingTime: input.schedulingTime,
    });

    if (response.status !== 200) {
        throw new Error(response.data);
    }

    return;
}
