export type Role = "ADMIN" | "USER";
export type Status = "PENDENTE" | "CONECTADO" | "CANCELADO";
export type TypeContract = "BASE" | "PROSPECT";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface Contract {
    id: string;
    number: number;
    local: string;
    observation: string;
    schedulingDate: Date;
    schedulingTime: string;
    price: number;
    contact: string;
    status: Status;
    type: TypeContract;
    createdAt: Date;
    updatedAt: Date;
}

export interface Insights {
    revenue: number;
    sales: number;
    completionRate: number;
    trendingSales: number;
    trendingRevenue: number;
    trendingCompletionRate: number;
}

export interface SalesOnDay {
    sales: Array<{
        quantity: number;
        day: Date;
    }>;
}

export type FieldError<T extends string = string> = {
    path: T;
    message: string;
};

export interface BadRequestError<T extends string = string> {
    errors: Array<FieldError<T>>;
}
