import * as React from 'react';
import { useSelector } from 'react-redux';

import { UserTypes } from '../../../Types';
import { CurrentUserState } from '../../../State';

const formStyles = require('../UserForm/user-form.module.css');
const styles = require('./type-select.module.css');

interface TypeSelectProps {
    handler: (userType: UserTypes) => void;
}

export const TypeSelect: React.FC<TypeSelectProps> = ({ handler }) => {
    const currentUserLoaded: boolean = useSelector(CurrentUserState.selectors.currentUserIsLoaded);
    const currentUserIsTenant: boolean = useSelector(CurrentUserState.selectors.currentUserIsTenant);

    const [selectionDisabled, toggleDisable] = React.useState<boolean>(false);
    const [showList, toggleList] = React.useState<boolean>(false);
    const [userType, setUserType] = React.useState<UserTypes>();

    const handleList = (e: React.FormEvent<HTMLDivElement>) => {
        if (!selectionDisabled) {
            e.preventDefault();

            toggleList(true);
        }
    };

    const setOOA = (e: React.FormEvent<HTMLParagraphElement>): void => {
        e.preventDefault();

        toggleList(false);
        setUserType(UserTypes.OWNER_OPERATOR_ADMIN);
        handler(UserTypes.OWNER_OPERATOR_ADMIN);
    };

    const setOO = (e: React.FormEvent<HTMLParagraphElement>): void => {
        e.preventDefault();

        toggleList(false);
        setUserType(UserTypes.OwnerOperator);
        handler(UserTypes.OwnerOperator);
    };

    const setTenant = (e?: React.FormEvent<HTMLParagraphElement>): void => {
        if (e) e.preventDefault();

        toggleList(false);
        setUserType(UserTypes.Tenant);
        handler(UserTypes.Tenant);
    };

    React.useEffect(() => {
        if (currentUserIsTenant) {
            toggleDisable(true);
            setTenant();
        }
    }, [currentUserIsTenant]);

    const currentSelection = (): string => {
        switch (userType) {
        case UserTypes.OwnerOperator:
            return 'Owner/Operator';
        case UserTypes.OWNER_OPERATOR_ADMIN:
            return 'Owner/Operator Admin';
        case UserTypes.Tenant:
            return 'Tenant';
        default:
            return 'Select User Type (required)';
        }
    };

    return (
        <>
            {
                currentUserLoaded
                    ? (
                        <div className={styles.TypeSelect}>
                            <p className={formStyles.UserFormSubText}>User Type</p>
                            <p className={styles.TypeSelectCurrent} onClick={handleList}>{currentSelection()}</p>
                            {
                                showList
                            && (
                                <div className={styles.TypeSelectList}>
                                    <p className={userType === UserTypes.OWNER_OPERATOR_ADMIN ? styles.ActiveItem : ''} onClick={setOOA}>Owner/Operator Admin</p>
                                    <p className={userType === UserTypes.OwnerOperator ? styles.ActiveItem : ''} onClick={setOO}>Owner/Operator</p>
                                    <p className={userType === UserTypes.Tenant ? styles.ActiveItem : ''} onClick={setTenant}>Tenant</p>
                                </div>
                            )
                            }
                        </div>
                    )
                    : <p>Loading...</p>
            }
        </>
    );
};
