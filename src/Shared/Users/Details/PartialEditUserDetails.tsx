import * as React from 'react';
import { useSelector } from 'react-redux';

import { usersSelectors } from '../../../State';
import { Role } from '../../../State/Shared/Types';
import { User, UserTypes } from '../../../Types';

import { LoadingContent, SecondaryTitle } from '../../../Shared/PageElements';

import { OwnerOperatorAssociations, TenantAssociations } from '../../../Features/Users/Account/AccountAssociations';
import { NotificationPreferences } from '../../../Features/Users/NotificationPreferences';

const styles = require('./user-details.module.css');

interface PartialEditUserDetailsProps {
    userId: number;
}

export const PartialEditUserDetails: React.FC<PartialEditUserDetailsProps> = ({ userId }) => {
    const user: User = useSelector(usersSelectors.userById(userId));

    const renderUserAssociations = () => {
        switch (user.userType) {
        case UserTypes.Tenant:
            return (
                <>
                    <SecondaryTitle title="Tenants" />
                    <TenantAssociations userId={user.id} />
                </>
            );
        case UserTypes.OwnerOperator:
            return (
                <>
                    <SecondaryTitle title="Properties" />
                    <OwnerOperatorAssociations userId={user.id} />
                </>
            );
        default:
            return null;
        }
    };

    return (
        <>
            {
                user
                    ? (
                        <div className={styles.UserDetails}>
                            <div className={styles.UserDetailsCore}>
                                <SecondaryTitle title={`${user.firstName} ${user.lastName}`} />
                                <div className={styles.UserDetailsEmail}>
                                    <p>{user.email}</p>
                                    <p>{`User Type: ${user.userTypeDisplay}`}</p>
                                </div>
                            </div>
                            {
                                !user.isOwnerOperatorAdmin
                            && (
                                <div className={styles.SplitView}>
                                    <div>
                                        <SecondaryTitle title="Roles" />
                                        <ul className={styles.RoleList}>
                                            {
                                                user.roles.length > 0 && user.roles.map(({ id, name }: Role) => <li key={`user-roles-${id}`}>{name}</li>)
                                            }
                                        </ul>
                                    </div>
                                    <div>
                                        {
                                            renderUserAssociations()
                                        }
                                    </div>
                                </div>
                            )
                            }
                            <NotificationPreferences userId={user.id} prefills={user.notificationTypes} />
                        </div>
                    )
                    : <LoadingContent />
            }
        </>
    );
};
