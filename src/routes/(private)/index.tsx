import { createFileRoute } from "@tanstack/react-router";
import { Insights } from "./-features/insights/insights";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchInsights } from "@/infra/insights/fetch-insights";
import { startOfMonth } from "date-fns";
import { ChartBarSales } from "./-features/insights/bar-chart-sales";
import { fecthSalesOnDay } from "@/infra/insights/fetch-sales-on-day";

const startDate = startOfMonth(new Date());
const endDate = new Date();

const getInsights = queryOptions({
    queryKey: ["insights"],
    queryFn: async () =>
        fetchInsights({
            dateFrom: startDate,
            dateTo: endDate,
        }),
});

const getSalesOnDay = queryOptions({
    queryKey: ["sales-on-day"],
    queryFn: async () =>
        fecthSalesOnDay({
            dateFrom: startDate,
            dateTo: endDate,
        }),
});

export const Route = createFileRoute("/(private)/")({
    component: Dashboard,
});

function Dashboard() {
    const { data: insights } = useSuspenseQuery(getInsights);
    const { data: salesOnDay } = useSuspenseQuery(getSalesOnDay);

    return (
        <main className="p-6 w-full">
            <div className="mb-6 -space-y-2">
                <h1 className="text-3xl font-bold text-foreground">
                    Dashboard
                </h1>
                <small className="text-xs font-light text-muted-foreground">
                    Acompanhe suas vendas e instalações em tempo real
                </small>
            </div>
            <div className="space-y-4">
                <Insights data={insights} />
                <ChartBarSales data={salesOnDay.sales} />
            </div>
        </main>
    );
}
