import {
    ContractFilter,
    type ContractFilters,
} from "@/components/contract/table/contract-filter";
import { TableContracts } from "@/components/contract/table/table-contracts";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { fecthContracts } from "@/infra/contracts/fecth-contracts";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { endOfDay, startOfDay } from "date-fns";
import { Plus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/(private)/contratos/")({
    component: ContractsPage,
    head: () => ({
        meta: [{ title: "Meus contratos | Notetools" }],
    }),
});

function ContractsPage() {
    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState<ContractFilters>({
        createdDateRange: undefined,
        schedulingDateRange: undefined,
        status: undefined,
        typeContract: undefined,
    });

    const [contractsSelected, setContractSelected] = useState<Array<string>>(
        [],
    );

    const { data } = useQuery({
        queryKey: ["get-contracts", page, filters],
        queryFn: () =>
            fecthContracts({
                page,
                limit: 10,
                createdFrom:
                    filters.createdDateRange?.from &&
                    startOfDay(filters.createdDateRange.from),
                createdTo:
                    filters.createdDateRange?.to &&
                    endOfDay(filters.createdDateRange.to),
                schedulingFrom:
                    filters.schedulingDateRange?.from &&
                    startOfDay(filters.schedulingDateRange.from),
                schedulingTo:
                    filters.schedulingDateRange?.to &&
                    endOfDay(filters.schedulingDateRange.to),
                status: filters.status || undefined,
                type: filters.typeContract || undefined,
            }),
    });

    return (
        <main className="p-6 w-full">
            <div className="mb-6 w-full flex justify-between items-center">
                <div className="-space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">
                        Meus contratos
                    </h1>
                    <small className="text-xs font-light text-muted-foreground">
                        Gerencie seus contratos aqui.
                    </small>
                </div>
            </div>
            <div className="mt-8 space-y-4 w-full">
                <ContractFilter
                    value={filters}
                    onChange={setFilters}
                    onReset={() =>
                        setFilters({
                            createdDateRange: undefined,
                            schedulingDateRange: undefined,
                            status: "",
                            typeContract: "",
                        })
                    }
                />
                {data ? (
                    <TableContracts
                        data={data.contracts}
                        page={page}
                        totalPages={data.totalPages}
                        total={data.total}
                        onPageChange={setPage}
                        contractsSelected={contractsSelected}
                        onChangeContractsSelected={setContractSelected}
                    />
                ) : (
                    <Card>
                        <CardHeader>
                            <CardAction>
                                <Link to="/contratos/novo">
                                    <Button type="button">
                                        <Plus />
                                        Novo contrato
                                    </Button>
                                </Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="italic text-center">
                                            Nenhum contrato encontrado
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}
