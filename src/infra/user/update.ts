import { api } from "@/lib/axios/api";




interface UpdateUserInput {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
}


export async function updateUser({ id, username, firstName, lastName } : UpdateUserInput) {
    const response = await api.put(`users/${id}`, {
        username,
        firstName,
        lastName
    });

    if(response.status !== 200) {
        throw new Error("Update user error"+ response.data)
    }

    return;
}