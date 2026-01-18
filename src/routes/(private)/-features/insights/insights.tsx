import { formatCurrency, formatPercent } from "@/lib/utils";
import type { Insights } from "@/types";
import { HandCoins, Percent, ShoppingBag } from "lucide-react";
import { CardInsight, type CardInsightProps } from "./card-insight";

export function Insights({ data }: { data: Insights }) {
    const insightsItems: Array<CardInsightProps> = [
        {
            title: "Faturamento",
            icon: HandCoins,
            children: formatCurrency(data.revenue),
            trending: data.trendingRevenue,
        },
        {
            title: "Vendas",
            icon: ShoppingBag,
            children: data.sales,
            trending: data.trendingSales,
        },
        {
            title: "Percentual de instalação",
            icon: Percent,
            children: formatPercent(data.completionRate),
            trending: data.trendingCompletionRate,
        },
    ];
    return (
        <section className="w-full flex items-center gap-4">
            {insightsItems.map((item) => (
                <CardInsight
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    trending={item.trending}
                >
                    {item.children}
                </CardInsight>
            ))}
        </section>
    );
}
