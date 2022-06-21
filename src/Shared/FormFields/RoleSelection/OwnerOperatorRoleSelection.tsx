import * as React from 'react';

import { CheckBox } from '../CheckBox';

export const OwnerOperatorRoleSelection: React.FC<{}> = () => (
    <>
        <CheckBox
            id="OORoles[0].IsSelected"
            label="Accounting"
            name="OORoles_0__IsSelected"
        />
        <CheckBox
            id="OORoles[1].IsSelected"
            label="Accounting Escalation"
            name="OORoles_1__IsSelected"
        />
        <CheckBox
            id="OORoles[2].IsSelected"
            label="Owner/Operator Admin"
            name="OORoles_2__IsSelected"
        />
        <CheckBox
            id="OORoles[3].IsSelected"
            label="Asset Management Director"
            name="OORoles_3__IsSelected"
        />
        <CheckBox
            id="OORoles[4].IsSelected"
            label="Asset Manager Escalation"
            name="OORoles_4__IsSelected"
        />
        <CheckBox
            id="OORoles[5].IsSelected"
            label="Construction Coordinator"
            name="OORoles_5__IsSelected"
        />
        <CheckBox
            id="OORoles[6].IsSelected"
            label="Property Manager"
            name="OORoles_6__IsSelected"
        />
        <CheckBox
            id="OORoles[7].IsSelected"
            label="Property Manager Escalation"
            name="OORoles_7__IsSelected"
        />
        <CheckBox
            id="OORoles[8].IsSelected"
            label="Owner/Operator Reporting"
            name="OORoles_8__IsSelected"
        />
        <CheckBox
            id="OORoles[9].IsSelected"
            label="Retention Coordinator"
            name="OORoles_9__IsSelected"
        />
        <CheckBox
            id="OORoles[10].IsSelected"
            label="Risk Management Coordinator"
            name="OORoles_10__IsSelected"
        />
        <CheckBox
            id="OORoles[11].IsSelected"
            label="Sales Coordinator"
            name="OORoles_11__IsSelected"
        />
        <CheckBox
            id="OORoles[12].IsSelected"
            label="Tenant Services Coordinator"
            name="OORoles_12__IsSelected"
        />
    </>
);
