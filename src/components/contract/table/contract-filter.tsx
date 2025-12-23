import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Status, TypeContract } from "@/types";
import type { DateRange } from "react-day-picker";
import {
    Select,
    SelectTrigger,
    SelectGroup,
    SelectItem,
    SelectContent,
    SelectLabel,
    SelectValue,
} from "../../ui/select";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateRangePicker } from "@/components/input/date-range-picker";

export interface ContractFilters {
    schedulingDateRange?: DateRange;
    createdDateRange?: DateRange;
    status?: Status | "";
    typeContract?: TypeContract | "";
}

interface FiltersProps {
    onChange?: (filters: ContractFilters) => void;
    value?: ContractFilters;
    onReset?: () => void;
}

type StatusOption = {
    label: string;
    value: Status;
};

type TypeContractOption = {
    label: string;
    value: TypeContract;
};

const statusOptions: Array<StatusOption> = [
    { value: "PENDENTE", label: "Pendente" },
    { value: "CONECTADO", label: "Conectado" },
    { value: "CANCELADO", label: "Cancelado" },
];

const typeContractOptions: Array<TypeContractOption> = [
    { value: "BASE", label: "Base" },
    { value: "PROSPECT", label: "Prospect" },
];

export function ContractFilter({ value, onChange, onReset }: FiltersProps) {
    function updateFilters<K extends keyof ContractFilters>(
        key: K,
        newValue: ContractFilters[K],
    ) {
        if (onChange) {
            onChange({
                ...value,
                [key]: newValue,
            });
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Filter className="w-6 h-6 text-primary" />
                    <div>
                        <CardTitle>Filtros</CardTitle>
                        <CardDescription className="text-xs">
                            Filtre seus contratos
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <Label className="ml-1 text-xs">Criação</Label>
                        <DateRangePicker
                            value={value?.createdDateRange}
                            onChange={(range) =>
                                updateFilters("createdDateRange", range)
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="ml-1 text-xs">Agendamento</Label>
                        <DateRangePicker
                            value={value?.schedulingDateRange}
                            onChange={(range) =>
                                updateFilters("schedulingDateRange", range)
                            }
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="ml-1 text-xs">Status</Label>
                        <Select
                            value={value?.status}
                            onValueChange={(val) =>
                                updateFilters(
                                    "status",
                                    val === "" ? undefined : (val as Status),
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Status</SelectLabel>
                                    {statusOptions.map((option) => (
                                        <SelectItem
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col">
                        <Label className="ml-1 text-xs">Tipo</Label>
                        <Select
                            value={value?.typeContract}
                            onValueChange={(val) =>
                                updateFilters(
                                    "typeContract",
                                    val === ""
                                        ? undefined
                                        : (val as TypeContract),
                                )
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecione um tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Tipo</SelectLabel>
                                    {typeContractOptions.map((option) => (
                                        <SelectItem
                                            value={option.value}
                                            key={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                {onReset && (
                    <Button variant="secondary" onClick={onReset}>
                        Limpar filtros
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
