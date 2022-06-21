import * as React from 'react';
/*

import { UserRoles } from '../../../Types';
import { getPropertyFromWindow } from '../../../utils';

import { TypeSelect } from '../TypeSelect';
import { OwnerOperatorView, OwnerOperatorAdminView, TenantView } from '../UserViews';

import {
    UserEmail,
    FirstName,
    LastName,
} from '../../../Shared/FormFields';

const styles = require('./user-form.module.css');

export const UserForm: React.FC<{}> = () => {
    const emailPrefill: string = getPropertyFromWindow('Email') || '';
    const firstNamePrefill: string = getPropertyFromWindow('FirstName') || '';
    const lastNamePrefill: string = getPropertyFromWindow('LastName') || '';

    const [userType, setUserType] = React.useState<UserRoles>();

    const currentUserTypeForm = () => {
        switch (userType) {
            case UserRoles.OWNER_OPERATOR_ADMIN:
                return <OwnerOperatorAdminView />;
            case UserRoles.OWNER_OPERATOR:
                return <OwnerOperatorView />;
            case UserRoles.TENANT:
                return <TenantView />;
            default:
                return null;
        }
    }

    const handleSelected = (type: UserRoles) => {
        setUserType(type);
    }

    return (
        <div className={styles.UserForm}>
            <TypeSelect handler={handleSelected} />
            <div className={styles.UserFormBlock}>
                <div className={styles.UserFormEmail}><UserEmail initialValue={emailPrefill} /></div>
            </div>
            <div className={styles.UserFormName}>
                <div><FirstName initialValue={firstNamePrefill} /></div>
                <div><LastName initialValue={lastNamePrefill} /></div>
            </div>
            <div className={styles.UserFormBlock}>
                {currentUserTypeForm()}
            </div>
        </div>
    )
}
*/
export const UserForm = () => <div />;
