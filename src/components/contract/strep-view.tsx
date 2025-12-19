import { Label } from "../ui/label";

interface StrepViewProps {
    children?: React.ReactNode;
}

export function StrepView({ children }: StrepViewProps) {
    return <div className="flex flex-col gap-2 items-start">{children}</div>;
}

export function StrepViewTitle({ children }: StrepViewProps) {
    return (
        <Label className="text-xs font-light text-muted-foreground">
            {children}
        </Label>
    );
}

export function StrepViewContent({ children }: StrepViewProps) {
    return <p className="text-sm font-semibold text-foreground">{children}</p>;
}
