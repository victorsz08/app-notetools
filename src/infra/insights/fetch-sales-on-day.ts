import { api } from "@/lib/axios/api";
import type { SalesOnDay } from "@/types";

export interface FecthSalesOnDayInput {
    dateFrom: Date;
    dateTo: Date;
}

export async function fecthSalesOnDay({
    dateFrom,
    dateTo,
}: FecthSalesOnDayInput) {
    const response = await api.get<SalesOnDay>(
        `sales-per-day?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`,
    );

    return response.data;
}
