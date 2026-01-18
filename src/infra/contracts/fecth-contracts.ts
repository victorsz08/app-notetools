import { api } from "@/lib/axios/api";
import type { Contract, Status, TypeContract } from "@/types";

interface FetchContractsInput {
    page: number;
    limit: number;
    schedulingFrom?: Date;
    schedulingTo?: Date;
    createdFrom?: Date;
    createdTo?: Date;
    status?: Status;
    type?: TypeContract;
}

interface FetchContractsResponse {
    contracts: Array<Contract>;
    total: number;
    totalPages: number;
    page: number;
    limit: number;
}

export async function fecthContracts({
    page,
    limit,
    schedulingFrom,
    schedulingTo,
    createdFrom,
    createdTo,
    status,
    type,
}: FetchContractsInput) {
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("limit", String(limit));

    if (schedulingFrom && schedulingTo) {
        params.set("schedulingFrom", schedulingFrom.toISOString());
        params.set("schedulingTo", schedulingTo.toISOString());
    }

    if (createdFrom && createdTo) {
        params.set("createdFrom", createdFrom.toISOString());
        params.set("createdTo", createdTo.toISOString());
    }

    if (status) {
        params.set("status", status);
    }

    if (type) {
        params.set("type", type);
    }

    const response = await api.get<FetchContractsResponse>(
        `contracts?${params.toString()}`,
    );

    return response.data;
}
