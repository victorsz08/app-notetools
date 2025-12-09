import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
    EmptyDescription,
    EmptyContent,
} from "@/components/ui/empty";
import { Link } from "@tanstack/react-router";
import { Clipboard, ExternalLink, Plus } from "lucide-react";

export function EmptyContracts() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia>
                    <Clipboard className="text-primary h-12 w-12" />
                </EmptyMedia>
                <EmptyTitle>Nenhum contrato agendado para hoje</EmptyTitle>
                <EmptyDescription className="text-xs font-light text-muted-foreground">
                    Continue criando contratos ou revise seus próximos contratos
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent className="mt-8">
                <div className="flex items-center gap-2 justify-center">
                    <Link to="/contratos">
                        <Button variant="secondary" type="button">
                            Todos os contratos
                            <ExternalLink />
                        </Button>
                    </Link>
                    <Button type="button">
                        Novo contrato
                        <Plus />
                    </Button>
                </div>
            </EmptyContent>
        </Empty>
    );
}
