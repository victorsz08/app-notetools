import { useState } from "react";
import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";

export function CopyButton({ value }: { value: string }) {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        setCopied(true);
        navigator.clipboard.writeText(value);

        toast.success("Copiado para à area de transferencia");

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                        "p-0 w-4 h-4 cursor pointer",
                        copied
                            ? "bg-primary text-background"
                            : "bg-transparent text-primary",
                    )}
                    onClick={handleCopy}
                >
                    {copied ? <Check /> : <Copy />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copiar para área de transferência!</p>
            </TooltipContent>
        </Tooltip>
    );
}
