import { fecthCountries } from "@/infra/external-services/fetch-countries";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboboxProps {
    value: string;
    onChange: (value: string) => void;
}

const getCities = queryOptions({
    queryKey: ["get-cities"],
    queryFn: fecthCountries,
    staleTime: 100_000,
});

export function ComboboxCities({ value, onChange }: ComboboxProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { data } = useSuspenseQuery(getCities);

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    type="button"
                    role="combobox"
                    aria-expanded={isOpen}
                    className="min-w-120 bg-card justify-between h-12"
                >
                    {value ? (
                        data.countries.find((item) => item.country === value)
                            ?.country
                    ) : (
                        <span className="text-muted-foreground">
                            "Selecione uma cidade..."
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-120">
                <Command>
                    <CommandInput
                        placeholder="Buscar cidades..."
                        className="h-10"
                    />
                    <CommandList>
                        <CommandEmpty>Nenhuma cidade encontrada</CommandEmpty>
                        <CommandGroup>
                            {data.countries.map((item) => (
                                <CommandItem
                                    key={item.country}
                                    value={item.country}
                                    onSelect={(item) => {
                                        onChange(item);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.country}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === item.country
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
