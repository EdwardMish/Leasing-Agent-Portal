import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Close, Edit } from '../../../Icons';

import { SecondaryTitle, SecondaryTitleWithAction } from '../../../Shared/PageElements';

import { UserRolesAPI } from '../../../API/User/UserRolesAPI';
import { addErrorMessage } from '../../../State/GlobalMessages/actionCreators';
import { Role } from '../../../State/Shared/Types';

import { UserRolesDisplayName, UserTypes } from '../../../Types';

import { RoleSelect } from '../RoleSelect';

const styles = require('./user-roles.module.css');

interface UserRolesProps {
    userType: string;
    roles: Role[];
    handleAddRole: (role: Role) => void;
    handleRemoveRole: (role: Role) => void;
}

export const UserRoles: React.FC<UserRolesProps> = ({
    userType,
    roles,
    handleAddRole,
    handleRemoveRole,
}) => {
    const dispatch = useDispatch();

    const [isTenantUser, toggleIsTenantUser] = React.useState<boolean>(userType === UserTypes.Tenant);
    const [editingRoles, toggleRolesEdit] = React.useState<boolean>(false);
    const [availableRoles, setAvailableRoles] = React.useState<Role[]>([]);

    React.useEffect(() => {
        if (isTenantUser) {
            UserRolesAPI.getTenantRoles()
                .then((roles) => {
                    setAvailableRoles(roles);
                });
        } else {
            UserRolesAPI.getOORoles()
                .then((roles) => {
                    setAvailableRoles(roles);
                });
        }
    }, [userType]);

    React.useEffect(() => {
        toggleIsTenantUser(userType === UserTypes.Tenant);
    }, [userType]);

    const handleRole = (role: Role) => {
        const activeRole: boolean = roles.map(({ id }) => id).includes(role.id);

        if (activeRole && roles.length === 1) {
            dispatch(addErrorMessage('Users must have at least one active role.'));
        } else {
            activeRole
                ? handleRemoveRole(role)
                : handleAddRole(role);
        }
    };

    return (
        <>
            {
                roles && roles.length
                    ? (
                        <>
                            <SecondaryTitleWithAction
                                title="User Roles"
                                action={{
                                    callBack: () => {
                                        toggleRolesEdit(!editingRoles);
                                    },
                                }}
                                ActionIcon={editingRoles ? Close : Edit}
                            />
                            {editingRoles
                                ? (
                                    <>
                                        {
                                            availableRoles.map((role) => (
                                                <RoleSelect
                                                    key={`role-select-tenant-${role.id}`}
                                                    role={role}
                                                    selectedRoles={roles}
                                                    toggleRole={() => handleRole(role)}
                                                />
                                            ))
                                        }
                                    </>
                                )
                                : (
                                    <ul className={styles.UserRolesList}>
                                        {
                                            roles.map(({ id }: Role) => <li key={`user-roles-${id}`}>{UserRolesDisplayName[id]}</li>)
                                        }
                                    </ul>
                                )}
                        </>
                    )
                    : <SecondaryTitle title="Loading User Roles..." />
            }
        </>
    );
};
