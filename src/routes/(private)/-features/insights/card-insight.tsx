import {
    Card,
    CardAction,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { formatPercent } from "@/lib/utils";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

export interface CardInsightProps {
    children: React.ReactNode;
    title: string;
    icon: LucideIcon;
    trending: number;
}

export function CardInsight({
    children,
    title,
    icon,
    trending,
    ...props
}: CardInsightProps & React.ComponentProps<typeof Card>) {
    let Icon = icon;

    return (
        <Card {...props} className="bg-primary w-full gap-5">
            <CardHeader>
                <CardTitle className="text-sm font-normal text-background">
                    {title}
                </CardTitle>
                <CardAction>
                    <div className="bg-background/10 p-3 rounded-sm border border-background/15">
                        <Icon className="w-5 h-5 text-background" />
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold text-background">{children}</p>
            </CardContent>
            <CardFooter>
                <p className="text-xs text-background/70 font-light flex items-center gap-2">
                    {trending > 0 ? (
                        <TrendingUp className="w-3 h-3 text-white" />
                    ) : (
                        <TrendingDown className="w-3 h-3 text-white" />
                    )}
                    <strong className="font-medium text-white">
                        {formatPercent(trending)}
                    </strong>
                    em relação ao mês anterior.
                </p>
            </CardFooter>
        </Card>
    );
}
