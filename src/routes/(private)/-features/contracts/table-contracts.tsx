import type { Contract } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CopyButton } from "@/components/buttons/copy-button";
import { BadgeStatus } from "@/components/contract/badge-status";
import { BadgeType } from "@/components/contract/badge-type";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Ellipsis } from "lucide-react";

interface TableContractsOnDay {
    data: Array<Contract>;
}

export function TableContractsOnDay({ data }: TableContractsOnDay) {
    function transformDate(date: Date) {
        const dateString = format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });

        return dateString.charAt(0).toUpperCase() + dateString.slice(1);
    }

    return (
        <Table className="overflow-clip rounded-sm">
            <TableHeader>
                <TableRow className="font-medium bg-muted">
                    <TableHead className="text-muted-foreground">
                        N° do contrato
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Cidade/UF
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Agendamento
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Status
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Tipo
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Valor
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Contato
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id} className="font-light text-xs">
                        <TableCell>
                            <CopyButton value={String(item.number)} />
                            {item.number}
                        </TableCell>
                        <TableCell>{item.local}</TableCell>
                        <TableCell>
                            <p>{transformDate(item.schedulingDate)}</p>
                            <p className="text-muted-foreground">
                                {item.schedulingTime}
                            </p>
                        </TableCell>
                        <TableCell>
                            <BadgeStatus variant={item.status} />
                        </TableCell>
                        <TableCell>
                            <BadgeType variant={item.type} />
                        </TableCell>
                        <TableCell>{formatCurrency(item.price)}</TableCell>
                        <TableCell>
                            <CopyButton value={item.contact} />
                            {item.contact}
                        </TableCell>
                        <TableCell>
                            <Ellipsis />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
