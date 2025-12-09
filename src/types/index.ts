export type Role = "ADMIN" | "USER";

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface Insights {
    revenue: number;
    sales: number;
    completionRate: number;
}

export interface SalesOnDay {
    sales: Array<{
        quantity: number;
        day: Date;
    }>;
}
