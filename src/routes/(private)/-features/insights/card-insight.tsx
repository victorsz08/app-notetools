import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export interface CardInsightProps {
    children: React.ReactNode;
    title: string;
    icon: LucideIcon;
}

export function CardInsight({
    children,
    title,
    icon,
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
        </Card>
    );
}
