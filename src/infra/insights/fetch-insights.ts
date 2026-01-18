import { api } from "@/lib/axios/api";
import type { Insights } from "@/types";
import { subMonths } from "date-fns";

interface InsightResponse {
    revenue: number;
    sales: number;
    completionRate: number;
}

interface FecthInsightsInput {
    dateFrom: Date;
    dateTo: Date;
}

export async function fetchInsights({
    dateFrom,
    dateTo,
}: FecthInsightsInput): Promise<Insights> {
    const response = await api.get<InsightResponse>(
        `insights?dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`,
    );

    const responsePrev = await api.get<InsightResponse>(
        `insights?dateFrom=${subMonths(dateFrom, 1).toISOString()}&dateTo=${subMonths(dateTo, 1).toISOString()}`,
    );

    const data = response.data;
    const dataPrev = responsePrev.data;

    return {
        completionRate: data.completionRate,
        revenue: data.revenue,
        sales: data.sales,

        trendingRevenue:
            dataPrev.revenue === 0
                ? 0
                : (data.revenue - dataPrev.revenue) / dataPrev.revenue,

        trendingCompletionRate:
            dataPrev.completionRate === 0
                ? 0
                : (data.completionRate - dataPrev.completionRate) /
                  dataPrev.completionRate,

        trendingSales:
            dataPrev.sales === 0
                ? 0
                : (data.sales - dataPrev.sales) / dataPrev.sales,
    };
}
