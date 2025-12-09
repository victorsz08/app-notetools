import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Contract } from "@/types";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TableContractsOnDay } from "./table-contracts";
import { EmptyContracts } from "./empty-contracts";
import { Calendar } from "lucide-react";

export function ContractsOnDay({ data }: { data: Array<Contract> }) {
    const currentDay = format(new Date(), "EEEE,  dd 'de' MMMM", {
        locale: ptBR,
    });
    const dateDescription =
        currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

    return (
        <Card className="w-full">
            {data.length ? (
                <>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-8 h-8 text-primary" />
                            <div>
                                <CardTitle className="text-xl font-bold text-foreground">
                                    Instalações de hoje
                                </CardTitle>
                                <CardDescription className="text-xs font-light text-muted-foreground">
                                    {dateDescription}
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <span className="text-xs mb-4 font-light text-muted-foreground">
                            Total de {data.length} contrato
                            {data.length > 1 ? "s" : ""}
                        </span>
                        <TableContractsOnDay data={data} />
                    </CardContent>
                </>
            ) : (
                <CardContent>
                    <EmptyContracts />
                </CardContent>
            )}
        </Card>
    );
}
