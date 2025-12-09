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
