import { UserPermissions } from "../../../Types";
import { TenantRole } from "./TenantRole";

export interface TenantUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    permissions: UserPermissions[];
    roles: TenantRole[];
}