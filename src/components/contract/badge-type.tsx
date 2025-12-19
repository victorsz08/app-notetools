import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeTypeVariants = cva(
    "w-20 py-1 text-[.7rem] font-bold flex items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                BASE: "bg-gray-100 text-gray-600 border-gray-300",
                PROSPECT: "bg-primary/10 text-primary border-primary/30",
            },
        },
        defaultVariants: {
            variant: "PROSPECT",
        },
    },
);

export function BadgeType({ variant }: VariantProps<typeof badgeTypeVariants>) {
    return <div className={cn(badgeTypeVariants({ variant }))}>{variant}</div>;
}
