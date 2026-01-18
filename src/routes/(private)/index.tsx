import { createFileRoute, Link } from "@tanstack/react-router";
import { Insights } from "./-features/insights/insights";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { fetchInsights } from "@/infra/insights/fetch-insights";
import { endOfDay, startOfDay, startOfMonth, subHours } from "date-fns";
import { ChartBarSales } from "./-features/insights/bar-chart-sales";
import { fecthSalesOnDay } from "@/infra/insights/fetch-sales-on-day";
import { fecthContracts } from "@/infra/contracts/fecth-contracts";
import { ContractsOnDay } from "./-features/contracts/contracts-on-day";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const startDate = startOfMonth(new Date());
const endDate = new Date();

const getInsights = queryOptions({
    queryKey: ["insights"],
    queryFn: async () =>
        fetchInsights({
            dateFrom: startDate,
            dateTo: endDate,
        }),
    staleTime: 30_000,
});

const getContractsOnDay = queryOptions({
    queryKey: ["get-contracts"],
    queryFn: async () => {
        const startDate = subHours(startOfDay(new Date()), 3);
        const endDate = subHours(endOfDay(new Date()), 3);

        const data = await fecthContracts({
            page: 1,
            limit: 100,
            schedulingFrom: startDate,
            schedulingTo: endDate,
        });

        return data;
    },
    staleTime: 30_000,
});

const getSalesOnDay = queryOptions({
    queryKey: ["sales-on-day"],
    queryFn: async () =>
        fecthSalesOnDay({
            dateFrom: startDate,
            dateTo: endDate,
        }),
    staleTime: 30_000,
});

export const Route = createFileRoute("/(private)/")({
    head: () => ({
        meta: [{ title: "Dashboard | Notetools" }],
    }),
    component: Dashboard,
});

function Dashboard() {
    const { data: insights } = useSuspenseQuery(getInsights);
    const { data: salesOnDay } = useSuspenseQuery(getSalesOnDay);
    const { data: contracts } = useSuspenseQuery(getContractsOnDay);

    console.log(insights);
    return (
        <main className="p-6 w-full">
            <div className="mb-6 w-full flex justify-between items-center">
                <div className="-space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        Dashboard
                    </h1>
                    <small className="text-xs font-light text-muted-foreground">
                        Acompanhe suas vendas e instalações em tempo real
                    </small>
                </div>
                <Link to="/contratos/novo">
                    <Button type="button">
                        Novo contrato
                        <Plus />
                    </Button>
                </Link>
            </div>
            <div className="space-y-4">
                <Insights data={insights} />
                <ChartBarSales data={salesOnDay.sales} />
                <ContractsOnDay data={contracts.contracts} />
            </div>
        </main>
    );
}
