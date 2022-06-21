import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadStatus } from '../../../Types';
import { Mappers } from '../../../utils';
import { LeasingActions, LeasingActionTypes } from '../../Leasing/actions';
import { CurrentUserActions, CurrentUserActionTypes } from '../actions';
import * as currentUserSelectors from '../selectors';
import { CurrentUser } from '../Types/CurrentUser';
import { Types as CurrentUserTypes } from '/API/CurrentUser';
import { API as CurrentUserAPI } from 'API/CurrentUser';

export interface UseCurrentUserHookReturnProperties {
    isCurrentUserLoaded: boolean;
    currentUser: CurrentUser;
    isTenant: boolean;
}

function useCurrentUser(): UseCurrentUserHookReturnProperties {
    const currentUserLoadStatus: LoadStatus = useSelector(currentUserSelectors.currentUserLoadStatus);
    const isCurrentUserLoaded: boolean = useSelector(currentUserSelectors.currentUserIsLoaded);
    const currentUser: CurrentUser = useSelector(currentUserSelectors.currentUser);
    const isTenant: boolean = useSelector(currentUserSelectors.currentUserIsTenant);

    const dispatch = useDispatch();

    React.useEffect(() => {
        if (currentUserLoadStatus === LoadStatus.INITIAL_STATE) {
            dispatch({
                type: CurrentUserActions.LOAD_CURRENT_USER,
            });

            CurrentUserAPI.getCurrentUser().then((user: CurrentUserTypes.User) => {
                const currentUser = Mappers.mapToCurrentUser(user);

                dispatch({
                    type: CurrentUserActions.SET_CURRENT_USER,
                    payload: currentUser,
                } as CurrentUserActionTypes);

                if (user.tenant && user.tenant.activeLeaseApplication) {
                    dispatch({
                        type: LeasingActions.SET_LOAD_APPLICATION,
                        payload: {
                            id: user.tenant.activeLeaseApplication.id,
                            started: user.tenant.activeLeaseApplication.hasStartedApplication,
                        },
                    } as LeasingActionTypes);
                } else {
                    dispatch({
                        type: LeasingActions.SET_LOAD_APPLICATION,
                    } as LeasingActionTypes);
                }
            });
        }
    }, [currentUserLoadStatus]);

    return {
        isCurrentUserLoaded,
        currentUser,
        isTenant,
    };
}

export default useCurrentUser;

