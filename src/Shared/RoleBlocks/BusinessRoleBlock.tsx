import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Business as BusinessAPI } from '../../API';
import { Business, globalMessageActionCreators } from '../../State';

import { Circle, CircleWithDot, IconColors } from '../../Icons';

import { FlexWrapper } from '../FlexWrapper';

interface RoleBlockProps {
    occupantId: number | string;
    role: BusinessAPI.Types.Role;
    userRoles: BusinessAPI.Types.Role[];
    userId: number;
}

export const BusinessRoleBlock: React.FC<RoleBlockProps> = ({ occupantId, role, userRoles, userId }) => {
    const { id, name } = role;
    const dispatch = useDispatch();
    console.log('>>> occupant : ', occupantId, role, userRoles);

    const [userRoleIds, setUserRoledIs] = React.useState<number[]>(userRoles.map(({ id }) => id));
    const [hasAccess, setAccess] = React.useState<boolean>(false);
    const [pending, setPending] = React.useState<boolean>(false);

    React.useEffect(() => {
        const roleIds = userRoles.map(({ id }) => id);
        setUserRoledIs(roleIds);
        setAccess(roleIds.includes(id));
    }, [userRoles]);

    const setUserPermission = (e: React.SyntheticEvent<HTMLDivElement>) => {
        e.preventDefault();

        if (pending) return;

        setPending(true);

        const apiFunc = hasAccess ? BusinessAPI.API.removeUserRole : BusinessAPI.API.addUserRole;

        apiFunc(userId, occupantId, id)
            .then(() => {
                dispatch({
                    type: hasAccess ? Business.Actions.REMOVE_BUSINESS_USER_ROLE : Business.Actions.ADD_BUSINESS_USER_ROLE,
                    payload: {
                        occupantId,
                        userId,
                        role,
                    },
                } as Business.ActionTypes);

                dispatch(globalMessageActionCreators.addSuccessMessage('Roles Updated.'));

                setPending(false);
            })
            .catch(() => {
                dispatch(globalMessageActionCreators.addErrorMessage('We could not update roles. Please try again.'));

                setPending(false);
            });
    };

    return (
        <div onClick={setUserPermission}>
            <FlexWrapper align="center" justify="start" style={{ cursor: 'pointer', height: '2rem' }}>
                {userRoleIds.includes(id) ? (
                    <CircleWithDot aspect="1.2rem" color={IconColors.BrandBlue} />
                ) : (
                    <Circle aspect="1.2rem" color={IconColors.LightGrey} />
                )}
                <p style={{ marginLeft: '0.35rem' }}>{name}</p>
            </FlexWrapper>
        </div>
    );
};

