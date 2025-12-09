import { cn } from "@/lib/utils";
import type { Status } from "@/types";
import { cva, type VariantProps } from "class-variance-authority";

const badgeStatusVariant = cva(
    "w-20 py-1 text-[.7rem] font-semibold flex items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                PENDENTE: "bg-orange-100 text-orange-600",
                CONECTADO: "bg-green-100 text-green-600",
                CANCELADO: "bg-red-100 text-red-600",
            },
        },
        defaultVariants: {
            variant: "PENDENTE",
        },
    },
);

const labelBadgeStatus = {
    PENDENTE: "Pendente" as Status,
    CONECTADO: "Conectado" as Status,
    CANCELADO: "Cancelado" as Status,
} as const;

export function BadgeStatus({
    variant,
}: VariantProps<typeof badgeStatusVariant>) {
    const label = variant ? labelBadgeStatus[variant] : "";

    return <div className={cn(badgeStatusVariant({ variant }))}>{label}</div>;
}
