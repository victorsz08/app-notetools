import { api } from "@/lib/axios/api";
import type { Insights } from "@/types";

interface FecthInsightsInput {
    dateFrom: Date;
    dateTo: Date;
}

export async function fetchInsights({ dateFrom, dateTo }: FecthInsightsInput) {
    const response = await api.get<Insights>(
        `insights?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`,
    );

    return response.data;
}
