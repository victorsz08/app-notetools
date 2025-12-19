import { CreateContractForm } from "@/components/contract/forms/create-form";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/(private)/contratos/novo/")({
    component: CreateContract,
    head: () => ({
        meta: [{ title: "Criar contrato | Notetools" }],
    }),
});

function CreateContract() {
    return (
        <section className="p-6">
            <div className="flex items-center gap-3 mb-8">
                <ChevronLeft
                    className="w-8 h-8 text-foreground"
                    strokeWidth={3}
                />
                <div className="flex flex-col -space-y-1">
                    <h1 className="text-foreground font-bold text-2xl">
                        Novo contrato
                    </h1>
                    <small className="text-xs font-light text-muted-foreground">
                        Preencha as informações necessárias para criar novo
                        contrato
                    </small>
                </div>
            </div>
            <Card className="w-full h-fit py-10">
                <CardContent className="py-10">
                    <CreateContractForm />
                </CardContent>
            </Card>
        </section>
    );
}
