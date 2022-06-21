import * as React from 'react';
import { useDispatch } from 'react-redux';

import { UsersAPI } from '../../API';
import { Business, globalMessageActionCreators } from '../../State';
import { UserPermissions } from '../../Types';
import { hasPermissions } from '../../utils/Users';

import { Circle, CircleWithDot, IconColors } from '../../Icons';

import { FlexWrapper } from '../FlexWrapper';

interface PermissionBlockProps {
    display: string;
    dispatchBusinessState: boolean;
    occupantId: number | string;
    permission: UserPermissions;
    userPermissions: UserPermissions[];
    userId: number;
    callback?: (occupantId: number | string, userId: number | string, permission: string) => void;
}

export const PermissionBlock: React.FC<PermissionBlockProps> = ({
    display,
    dispatchBusinessState,
    occupantId,
    permission,
    userPermissions,
    userId,
    callback,
}) => {
    const dispatch = useDispatch();

    const [hasAccess, setAccess] = React.useState<boolean>(hasPermissions(userPermissions, [permission]));
    const [pending, setPending] = React.useState<boolean>(false);

    React.useEffect(() => {
        setAccess(hasPermissions(userPermissions, [permission]));
    }, [userPermissions, permission]);

    const setUserPermission = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (pending) return;

        setPending(true);

        const apiFunc = hasAccess ? UsersAPI.removePermissionsForTenantUser : UsersAPI.addPermissionsForTenantUser;

        apiFunc(occupantId, userId, [permission])
            .then(() => {
                if (callback) callback(occupantId, userId, permission);
                // TODO: Move dispatch to callback
                if (dispatchBusinessState) {
                    dispatch({
                        type: hasAccess ? Business.Actions.REMOVE_BUSINESS_USER_PERMISSIONS : Business.Actions.ADD_BUSINESS_USER_PERMISSIONS,
                        payload: {
                            occupantId,
                            userId,
                            permissions: [permission],
                        },
                    } as Business.ActionTypes);
                }

                dispatch(globalMessageActionCreators.addSuccessMessage('Permissions updated.'));

                setPending(false);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We could not update permissions. Please try again.'));

                setPending(false);
            });
    };

    return (
        <div onClick={setUserPermission}>
            <FlexWrapper align="center" justify="start" style={{ cursor: 'pointer', height: '2rem' }}>
                {hasAccess ? <CircleWithDot aspect="1.2rem" color={IconColors.BrandBlue} /> : <Circle aspect="1.2rem" color={IconColors.LightGrey} />}
                <p style={{ marginLeft: '0.35rem' }}>{display}</p>
            </FlexWrapper>
        </div>
    );
};
