import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addUserRole,
    disableUser,
    enableUser,
    removeUserRole,
} from '../../../API';

import { UserActions, UserActionTypes, usersSelectors } from '../../../State';
import { Role } from '../../../State/Shared/Types';
import { addSuccessMessage } from '../../../State/GlobalMessages/actionCreators';
import { User } from '../../../Types';

import { NotificationPreferences } from '../../../Features/Users/NotificationPreferences';
import { PropertySelection } from '../../../Features/Users/PropertySelection';
import { UserRoles } from '../../../Features/Users/UserRoles';

import { Button } from '../../Button';
import { LoadingContent } from '../../PageElements';

import { UserCore } from '../UserCore';

import styles from './user-details.module.css';

interface FullEditUserDetailsProps {
    userId: number | string
}

export const FullEditUserDetails: React.FC<FullEditUserDetailsProps> = ({ userId: userIdUnknownType }) => {
    const userId: number = typeof userIdUnknownType === 'string' ? parseInt(userIdUnknownType) : userIdUnknownType;

    const dispatch = useDispatch();

    const user: User = useSelector(usersSelectors.userById(userId));

    const handleAddRole = (role: Role) => {
        addUserRole(user.id, user.userType, role.id);

        if (user.roles.map(({ id }) => id).indexOf(role.id) === -1) {
            dispatch({
                type: UserActions.ADD_ROLE,
                payload: {
                    userId: user.id,
                    role,
                },
            } as UserActionTypes);
        }
    };

    const handleRemoveRole = (role: Role) => {
        removeUserRole(user.id, user.userType, role.id);

        if (user.roles.map(({ id }) => id).indexOf(role.id) !== -1) {
            dispatch({
                type: UserActions.REMOVE_ROLE,
                payload: {
                    userId: user.id,
                    role,
                },
            } as UserActionTypes);
        }
    };

    const disable = (): void => {
        if (user.isEnabled === false) return;

        disableUser(userId).then(() => {
            dispatch({
                type: UserActions.DISABLE_USER,
                payload: userId,
            } as UserActionTypes);

            dispatch(addSuccessMessage('User disabled.'));
        });
    };

    const enable = (): void => {
        if (user.isEnabled === true) return;

        enableUser(userId).then(() => {
            dispatch({
                type: UserActions.ENABLE_USER,
                payload: userId,
            } as UserActionTypes);

            dispatch(addSuccessMessage('User enabled.'));
        });
    };

    return (
        <>
            {
                user && user.hasOwnProperty('id')
                    ? (
                        <div className={styles.UserDetails}>
                            <UserCore user={user} />
                            {
                                !user.isOwnerOperatorAdmin
                            && (
                                <div className={styles.SplitView}>
                                    <div>
                                        <UserRoles
                                            userType={user.userType}
                                            roles={user.roles}
                                            handleAddRole={handleAddRole}
                                            handleRemoveRole={handleRemoveRole}
                                        />
                                    </div>
                                    <div><PropertySelection userId={userId} /></div>
                                </div>
                            )
                            }
                            <NotificationPreferences userId={userId} prefills={user.notificationTypes} />
                            {
                                user.isEnabled
                                    ? <Button callback={disable} disable={!user.isEnabled} text="Disable User" withMarginTop />
                                    : <Button callback={enable} disable={user.isEnabled} text="Enable User" withMarginTop />
                            }
                        </div>
                    )
                    : <LoadingContent />
            }
        </>
    );
};
