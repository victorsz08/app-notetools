import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ChartBarSalesData {
    data: Array<{
        quantity: number;
        day: Date;
    }>;
}

const chartConfig = {
    sales: {
        label: "Vendas",
        color: "var(--primary)",
    },
} satisfies ChartConfig;

export function ChartBarSales({ data }: ChartBarSalesData) {
    const currentMonth = format(new Date(), "MMMM yyyy", { locale: ptBR });
    const mediaSales = useMemo(() => {
        const totalDays = data.length;
        const totalSales = data.reduce((sum, s) => sum + s.quantity, 0);

        return totalSales / totalDays;
    }, []);

    return (
        <Card className="h-100">
            <CardHeader>
                <CardTitle>Vendas por dia</CardTitle>
                <CardDescription>
                    {currentMonth.charAt(0).toUpperCase() +
                        currentMonth.slice(1)}{" "}
                    - Media de {mediaSales.toLocaleString()} por dia
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer className="h-65 w-full" config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => format(value, "dd/MM")}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="quantity"
                            fill="var(--color-sales)"
                            radius={8}
                            name="Quantidade"
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
