import { Role } from "./Role";

export interface TenantRole extends Role {
    description: string;
    order: number;
    default: boolean;
}