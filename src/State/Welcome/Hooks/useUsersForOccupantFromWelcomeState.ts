import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Actions, ActionTypes, selectors } from '..'
import { UsersAPI } from '../../../API'
import { TenantUser } from '../Types'

type WelcomeStateHook = (occupantId: number) => {
    usersLoadedForOccupant: boolean,
    occupantUsers: TenantUser[],
}

export const useUsersForOccupantFromWelcomeState: WelcomeStateHook = (occupantId: number) => {
    const dispatch = useDispatch()

    const usersLoadedForOccupant: boolean = useSelector(selectors.usersLoadedForOccupant(occupantId))

    const occupantUsers: TenantUser[] = useSelector(selectors.occupantUsers(occupantId))

    React.useEffect(() => {
        if (!usersLoadedForOccupant) {
            UsersAPI.getTenantUsersForOccupant(occupantId)
                .then(users => {
                    dispatch({
                        type: Actions.ADD_OCCUPANT_USERS,
                        payload: {
                            id: occupantId,
                            users: users as TenantUser[]
                        }
                    } as ActionTypes)
                })
        }
    }, [usersLoadedForOccupant])

    return {
        usersLoadedForOccupant,
        occupantUsers,
    }
}
