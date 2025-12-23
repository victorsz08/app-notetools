import { CopyButton } from "@/components/buttons/copy-button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateDescription } from "@/lib/utils";
import type { Contract } from "@/types";
import { BadgeStatus } from "../badge-status";
import { BadgeType } from "../badge-type";
import { MenuContract } from "../menu-contract";
import { Button } from "@/components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Plus,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

interface TableContractsProps {
    data: Array<Contract>;
    page: number;
    totalPages: number;
    total: number;
    onPageChange: (page: number) => void;
}

export function TableContracts({
    data,
    onPageChange,
    page,
    total,
    totalPages,
}: TableContractsProps) {
    function nextPage() {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    }

    function previousPage() {
        if (page > 1) {
            onPageChange(page - 1);
        }
    }

    function firstPage() {
        onPageChange(1);
    }

    function lastPage() {
        onPageChange(totalPages);
    }

    return (
        <Card>
            <CardHeader>
                <CardDescription className="text-xs">
                    Total: {total} item{total > 1 ? "s" : ""}
                </CardDescription>
                <CardAction>
                    <Link to="/contratos/novo">
                        <Button>
                            <Plus className="w-3 h-3" />
                            Novo contrato
                        </Button>
                    </Link>
                </CardAction>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>N° do contrato</TableHead>
                            <TableHead>Cidade/UF</TableHead>
                            <TableHead>Agendamento</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.length > 0 ? (
                            data.map((contract) => (
                                <TableRow key={contract.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <CopyButton
                                                value={String(contract.number)}
                                            />
                                            {contract.number}
                                        </div>
                                    </TableCell>
                                    <TableCell>{contract.local}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            <p>
                                                {formatDateDescription(
                                                    contract.schedulingDate,
                                                )}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {contract.schedulingTime}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <BadgeStatus
                                            variant={contract.status}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <BadgeType variant={contract.type} />
                                    </TableCell>
                                    <TableCell>{contract.contact}</TableCell>
                                    <TableCell>
                                        {formatCurrency(contract.price)}
                                    </TableCell>
                                    <TableCell>
                                        <MenuContract contract={contract} />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-center py-4"
                                >
                                    Nenhum contrato encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
                <p className="text-xs font-light text-muted-foreground">
                    Total de {totalPages} página{totalPages > 1 ? "s" : ""}
                </p>
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={firstPage}
                        disabled={page === 1}
                    >
                        <ChevronsLeft className="w-3 h-3" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={previousPage}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="outline">
                        {page}
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={nextPage}
                        disabled={page === totalPages}
                    >
                        <ChevronRight className="w-3 h-3" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={lastPage}
                        disabled={page === totalPages}
                    >
                        <ChevronsRight className="w-3 h-3" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
