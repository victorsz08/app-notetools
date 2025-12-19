import { api } from "@/lib/axios/api";

export interface FecthCountriesResponse {
    countries: Array<{
        country: string;
    }>;
}

export async function fecthCountries() {
    const response = await api.get<FecthCountriesResponse>("cities");

    return response.data;
}
