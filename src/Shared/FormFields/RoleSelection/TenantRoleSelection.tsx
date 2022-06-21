import * as React from 'react';

import { CheckBox } from '../CheckBox';

export const TenantRoleSelection: React.FC<{}> = () => (
    <>
        <CheckBox
            id="OORoles[0].IsSelected"
            label="Accounting"
            name="TenantRoles_0__IsSelected"
        />
        <CheckBox
            id="TenantRoles[1].IsSelected"
            label="Admin"
            name="TenantRoles_1__IsSelected"
        />
        <CheckBox
            id="TenantRoles[2].IsSelected"
            label="Manager"
            name="TenantRoles_2__IsSelected"
        />
        <CheckBox
            id="TenantRoles[3].IsSelected"
            label="Reporting"
            name="TenantRoles_3__IsSelected"
        />
    </>
);
