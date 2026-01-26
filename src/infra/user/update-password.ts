import { api } from "@/lib/axios/api";





interface UpdatePasswordInput {
    id: string;
    currentPassword: string;
    newPassword: string;
};


export async function updatePassword(input: UpdatePasswordInput) {
    const response = await api.put(`users/update-password/${input.id}`, {
        currentPassword: input.currentPassword,
        newPassword: input.newPassword
    });

    if(response.status !== 200) {
        throw new Error(response.data)
    }

    return;
}