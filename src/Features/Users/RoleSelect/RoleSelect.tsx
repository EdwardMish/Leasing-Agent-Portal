import * as React from 'react';

import { Circle, CircleWithDot } from '../../../Icons';

import { Role } from '../../../State/Shared/Types';

import { UserRolesDisplayName } from '../../../Types';

import styles from './role-select.module.css';

interface Properties {
    toggleRole: (roleId: number) => void;
    role: Role;
    selectedRoles: Role[];
}

export const RoleSelect: React.FC<Properties> = ({ toggleRole, role, selectedRoles }) => (
    <div className={styles.RoleSelect} onClick={() => toggleRole(role.id)}>
        {selectedRoles.map(({ id }) => id).includes(role.id) ? <CircleWithDot /> : <Circle />}
        <p>{UserRolesDisplayName[role.id]}</p>
    </div>
);
