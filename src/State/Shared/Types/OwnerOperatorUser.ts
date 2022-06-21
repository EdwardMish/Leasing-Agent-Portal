import { Role } from "./Role";

export interface OwnerOperatorUser {
    roles: Role[];
    propertyIds: number[];
    occupantIds: number[];
}