import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Business as BusinessAPI } from '../../API';
import { globalMessageActionCreators } from '../../State';

import { Circle, CircleWithDot, IconColors } from '../../Icons';

import { FlexWrapper } from '../FlexWrapper';

interface RoleBlockProps {
    occupantId: number | string;
    role: BusinessAPI.Types.Role;
    userRoles: BusinessAPI.Types.Role[];
    userId: number;
    callBack: (role: BusinessAPI.Types.Role) => void;
}

export const UserDetailRoleBlock: React.FC<RoleBlockProps> = ({
    occupantId,
    role,
    userRoles,
    userId,
    callBack,
}) => {
    const {
        id,
        name,
    } = role;

    const dispatch = useDispatch();

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
                callBack(role);

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
                {userRoleIds.includes(id) ? <CircleWithDot aspect="1.2rem" color={IconColors.BrandBlue} /> : <Circle aspect="1.2rem" color={IconColors.LightGrey} />}
                <p style={{ marginLeft: '0.35rem' }}>{name}</p>
            </FlexWrapper>
        </div>
    );
};
