import { createSelector } from 'reselect';

import {
    LoadStatus,
    State,
    User,
    UsersState,
} from '../../Types';

const userState = ({ users: usersState }: State) => usersState;

// Load Status
export const usersLoadStatus = createSelector(
    userState,
    (usersState: UsersState) => usersState.loadStatus
)

export const usersAreLoaded = createSelector(
    usersLoadStatus,
    (loadStatus: LoadStatus) => loadStatus === LoadStatus.LOADED
)

// Users
export const users = createSelector(
    userState,
    (userState: UsersState) => userState.users
)

export const allUsers = createSelector(
    users,
    (users: { [userId: number]: User }) => Object.values(users)
)

export const userById = (userId: number | string) => createSelector(
    users,
    (users: { [userId: number]: User }) => users[userId] || {}
)

// User Search
export const usersSearchList = createSelector(
    userState,
    (userState: UsersState) => userState.usersSearchList
)

export const searchedUsers = ({ users: usersState }: State) => {
    const searchSet = new Set(usersState.usersSearchList);

    return Object.values(usersState.users).filter((u: User) => searchSet.has(u.id));
}