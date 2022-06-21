import * as React from 'react';

import { Users } from '../../../../../API';

import { OccupantPermissionsRow } from '../OccupantPermissionsRow';

interface RolesTableProps {
    user: Users.Types.User
}

export const RolesTable: React.FC<RolesTableProps> = ({ user: { id, tenant } }) => (
    <>
        {
            (tenant?.occupants || []).map(({
                occupantId,
                name,
                roles,
                propertyName,
            }: Users.Types.Occupant) => (
                <OccupantPermissionsRow
                    key={`user-permission-row-${occupantId}`}
                    occupantId={occupantId}
                    occupantName={name}
                    roles={roles}
                    propertyName={propertyName}
                    userId={id}
                />
            ))
        }
    </>
);
