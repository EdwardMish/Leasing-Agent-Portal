import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouteMatch } from 'react-router';
import { UserAPI, Users as API } from '../../../API';
import { LoadingContent, Title } from '../../../Shared/PageElements';
import { PageWrapper } from '../../../Shared/PageWrapper';
import { PartialEditUserDetails } from '../../../Shared/Users';
import { CurrentUserState, globalMessageActionCreators, UserActions, UserActionTypes, usersSelectors } from '../../../State';
import { Route, User, UserTypes } from '../../../Types';
import { getRootPath, Mappers } from '../../../utils';
import { OOUserDetails } from './OOUserDetails';
import { TenantUserDetails } from './TenantUserDetails';

type UserWithPermissions = API.Types.User;

export const UserDetails: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const { userId } = useParams<{ userId: string }>();
    const { path } = useRouteMatch();
    const target = getRootPath(path, '/users');

    const currentUser: CurrentUserState.Types.CurrentUser = useSelector(CurrentUserState.selectors.currentUser);
    const user: User = useSelector(usersSelectors.userById(userId));

    const [userWithPermissions, setUserWithPermissions] = React.useState<UserWithPermissions | undefined>(undefined);

    const getUser = () =>
        UserAPI.getUser(userId)
            .then((user) => {
                setUserWithPermissions(user as UserWithPermissions);

                dispatch({
                    type: UserActions.UPDATE_USER,
                    payload: Mappers.mapUserResponseToUser(user),
                } as UserActionTypes);
            })
            .catch((err) => {
                dispatch(globalMessageActionCreators.addErrorMessage('Error fetching user.', err));
            });

    React.useEffect(() => {
        getUser();
    }, [userId]);

    const refreshUser = () => getUser();

    const routes: Route[] = [{ target, display: 'Users' }];

    const breadCrumbs = {
        current: 'User Details',
        routes,
    };

    const renderUser = (): React.ReactElement => {
        if (currentUser.id === parseInt(userId)) return <PartialEditUserDetails userId={parseInt(userId)} />;

        return user.userType === UserTypes.Tenant ? (
            <>
                {userWithPermissions ? (
                    <TenantUserDetails user={user} userWithPermissions={userWithPermissions} refreshUser={refreshUser} />
                ) : null}
            </>
        ) : (
            <OOUserDetails userId={userId} />
        );
    };

    return (
        <PageWrapper pageTitle={`Users | ${user?.firstName || ''} ${user?.lastName || ''}`} breadCrumbs={breadCrumbs}>
            <Title title="User Details" />
            {!!user && user.hasOwnProperty('id') && userWithPermissions ? renderUser() : <LoadingContent />}
        </PageWrapper>
    );
};
