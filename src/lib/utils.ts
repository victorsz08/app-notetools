import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(currency: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(currency);
}

export function formatPercent(percent: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
    }).format(percent);
}

export function formatDateDescription(date: Date) {
    const dateString = format(date, "EEEE, dd 'de' MMMM", { locale: ptBR });
    const dateDescription =
        dateString.charAt(0).toUpperCase() + dateString.slice(1);
    return dateDescription;
}

export function formatPhonePattern(number: string) {
    const numberFormatted = number.replace(/\D/g, "");

    if (numberFormatted.length === 11) {
        return numberFormatted.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    if (numberFormatted.length === 10) {
        return numberFormatted.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
}
