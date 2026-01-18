import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import type { Contract } from "@/types";
import { Eye } from "lucide-react";
import { StrepView, StrepViewContent, StrepViewTitle } from "../strep-view";
import { formatCurrency, formatDateDescription } from "@/lib/utils";
import { BadgeStatus } from "../badge-status";
import { BadgeType } from "../badge-type";
import { Separator } from "@/components/ui/separator";
import { format, subHours } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DialogViewContractProps {
    contract: Contract;
}

export function DialogViewContract({ contract }: DialogViewContractProps) {
    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <div className="flex w-38 items-center text-foreground cursor-pointer hover:bg-muted gap-1 text-sm p-2">
                    <Eye className="w-4 h-4" />
                    <p>Visualizar</p>
                </div>
            </DialogTrigger>
            <DialogContent className="min-w-160 gap-10">
                <DialogHeader>
                    <DialogTitle>Detalhes do contrato</DialogTitle>
                    <DialogDescription>
                        <div className="flex items-center gap-2">
                            <p>Contrato: {contract.number} -</p>
                            <BadgeStatus variant={contract.status} />
                            -
                            <BadgeType variant={contract.type} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className="grid grid-cols-2 gap-8">
                    <StrepView>
                        <StrepViewTitle>Cidade/UF</StrepViewTitle>
                        <StrepViewContent>{contract.local}</StrepViewContent>
                    </StrepView>
                    <StrepView>
                        <StrepViewTitle>Data de Agendamento</StrepViewTitle>
                        <StrepViewContent>
                            {formatDateDescription(contract.schedulingDate)}
                        </StrepViewContent>
                    </StrepView>
                    <StrepView>
                        <StrepViewTitle>Horário de Agendamento</StrepViewTitle>
                        <StrepViewContent>
                            {contract.schedulingTime}
                        </StrepViewContent>
                    </StrepView>
                    <StrepView>
                        <StrepViewTitle>Telefone</StrepViewTitle>
                        <StrepViewContent>{contract.contact}</StrepViewContent>
                    </StrepView>
                    <StrepView>
                        <StrepViewTitle>Valor</StrepViewTitle>
                        <StrepViewContent>
                            {formatCurrency(contract.price)}
                        </StrepViewContent>
                    </StrepView>
                    <StrepView>
                        <StrepViewTitle>Observações</StrepViewTitle>
                        <StrepViewContent>
                            <div className="truncate max-w-130">
                                {contract.observation}
                            </div>
                        </StrepViewContent>
                    </StrepView>
                </div>
                <Separator />
                <DialogFooter>
                    <div className="flex flex-col gap-1 text-start justify-start items-start">
                        <p className="font-light text-muted-foreground text-xs">
                            Criado em:{" "}
                            {format(
                                subHours(contract.createdAt, 3),
                                "dd/MM/yyyy 'às' HH:mm",
                                { locale: ptBR },
                            )}
                        </p>
                        <p className="font-light text-muted-foreground text-xs">
                            Atualizado em:{" "}
                            {format(
                                subHours(contract.updatedAt, 3),
                                "dd/MM/yyyy 'às' HH:mm",
                                { locale: ptBR },
                            )}
                        </p>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
