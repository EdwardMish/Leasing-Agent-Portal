import { Role } from "../../State/Shared/Types";
import { UserRoles, UserRolesDisplayName } from "../../Types";

export const userRole = (roleId: UserRoles): Role => ({
    id: roleId,
    name: UserRolesDisplayName[roleId],
});
