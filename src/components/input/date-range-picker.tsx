import type { DateRange } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Calendar1 } from "lucide-react";

interface DateRangePickerProps {
    value?: DateRange | undefined;
    onChange?: (range: DateRange | undefined) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full font-light bg-transparent max-w-80 justify-start text-left"
                >
                    <Calendar1 className="text-primary w-3 h-3" />
                    {value?.from && value?.to ? (
                        `De ${value.from.toLocaleDateString()} até ${value.to.toLocaleDateString()}`
                    ) : (
                        <p className="text-muted-foreground font-light">
                            Selecione uma data
                        </p>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <Calendar
                    locale={ptBR}
                    selected={value}
                    onSelect={onChange}
                    mode="range"
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
}
