import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Business as BusinessAPI } from '../../../API'
import { LoadStatus, UserPermissions } from '../../../Types'
import { userHasPermissionsForOccupant } from '../../../utils/Users'

import * as currentUserSelectors from '../../CurrentUser/selectors'

import { BusinessActions, BusinessActionTypes } from '../actions'
import { BusinessUser } from '../Types/BusinessUser'
import { mapBusinessAPIUserToUser } from '../Mappers/mapBusinessAPIUserToUser'

import * as selectors from '../selectors'

type BusinessUsersFromStateHook = (occupantId: number | string) => {
    areLoaded: boolean,
    areLoading: boolean,
    hasError: boolean,
    loadState: LoadStatus,
    users: BusinessUser[],
    canAccess: boolean,
    canRemove: boolean,
}

export const useBusinessUsersFromState: BusinessUsersFromStateHook = (occupantId: number | string) => {
    const dispatch = useDispatch()

    const currentUser = useSelector(currentUserSelectors.currentUser)

    const loadState: LoadStatus = useSelector(selectors.businessUsersOccupantLoadStatus(occupantId))
    const users: BusinessUser[] = useSelector(selectors.sortedBusinessUsersForOccupant(occupantId))

    const [canAccess, setAccess] = React.useState<boolean>(false)
    const [canRemove, setRemove] = React.useState<boolean>(false)
    const [usersLoadedOrInccessible, toggleLoadedOrInccessible] = React.useState<boolean>(false)

    React.useEffect(() => {
        setAccess(userHasPermissionsForOccupant(currentUser, [UserPermissions.CreateUpdateUsers], occupantId))
        setRemove(userHasPermissionsForOccupant(currentUser, [UserPermissions.DisableUsers], occupantId))
    }, [occupantId, currentUser])

    React.useEffect(() => {
        if (canAccess) {
            if (loadState === LoadStatus.INITIAL_STATE) {
                dispatch({
                    type: BusinessActions.LOAD_BUSINESS_USERS_FOR_OCCUPANT,
                    payload: occupantId,
                } as BusinessActionTypes)

                BusinessAPI.API.getBusinessUsers(occupantId)
                    .then((users) => {
                        dispatch({
                            type: BusinessActions.SET_BUSINESS_USERS_FOR_OCCUPANT,
                            payload: {
                                occupantId,
                                users: users.map((u: BusinessAPI.Types.BusinessUser) => mapBusinessAPIUserToUser(u))
                            }
                        } as BusinessActionTypes)

                        toggleLoadedOrInccessible(true)
                    })
                    .catch(() => {
                        toggleLoadedOrInccessible(true)
                    })
            }
        } else {
            toggleLoadedOrInccessible(true)
        }
    }, [canAccess, loadState])

    return {
        areLoaded: usersLoadedOrInccessible,
        areLoading: loadState === LoadStatus.PENDING,
        hasError: loadState === LoadStatus.ERROR,
        loadState,
        // Remove self from list of editable users
        users: users.filter(({ id }: BusinessUser) => id !== currentUser.id),
        canAccess,
        canRemove
    }
}