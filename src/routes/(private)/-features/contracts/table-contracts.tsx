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
import { addHours, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { MenuContract } from "@/components/contract/menu-contract";

interface TableContractsOnDay {
    data: Array<Contract>;
}

export function TableContractsOnDay({ data }: TableContractsOnDay) {
    function transformDate(date: Date) {
        const dateFormated = addHours(date, 3);
        const dateString = format(dateFormated, "EEEE, dd 'de' MMMM", {
            locale: ptBR,
        });

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
                    <TableHead className="text-muted-foreground w-20 text-center">
                        Ações
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id} className="font-light text-xs">
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <CopyButton value={String(item.number)} />
                                <p className="text-primary">{item.number}</p>
                            </div>
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
                            <div className="flex items-center gap-1">
                                <CopyButton value={item.contact} />
                                <p>{item.contact}</p>
                            </div>
                        </TableCell>
                        <TableCell className="w-20 flex justify-center items-center">
                            <MenuContract contract={item} />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
