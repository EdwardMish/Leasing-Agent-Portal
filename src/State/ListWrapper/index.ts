import { createSelector } from 'reselect';

// ACTION NAMES:
export enum ListWrapperActions {
    RESET_SEARCH_PARAMS = 'RESET_SEARCH_PARAMS',
    STORE_SEARCH_TERM = 'STORE_SEARCH_TERM',
    STORE_SORTED_COLUMN = 'STORE_SORTED_COLUMN',
    STORE_SORT_DIRECTION = 'STORE_SORT_DIRECTION',
}

// ACTION CREATORS:

export const storeSearchTermAction = (sharedStoreId, searchTerm) => {
    return { type: ListWrapperActions.STORE_SEARCH_TERM, payload: { sharedStoreId, searchTerm } };
};

export const storeSortedColumnAction = (sharedStoreId, sortedColumn) => {
    return { type: ListWrapperActions.STORE_SORTED_COLUMN, payload: { sharedStoreId, sortedColumn } };
};

export const storeSortDirectionAction = (sharedStoreId, sortDirection) => {
    return { type: ListWrapperActions.STORE_SORT_DIRECTION, payload: { sharedStoreId, sortDirection } };
};

// STATE TYPE:
export interface SearchParams {
    searchTerm: string;
    sortedColumn: string;
    sortDirection: string;
}

// INITIAL STATE:
export type ListWrapper = Record<string, SearchParams>;

export const initialState = {
    default: {
        searchTerm: '',
        sortedColumn: 'status',
        sortDirection: 'ascending',
    },
};

// REDUCER:

export const listWrapperReducer = (state: ListWrapper = initialState, { type, payload }) => {
    switch (type) {
        case ListWrapperActions.RESET_SEARCH_PARAMS:
            return initialState;
        case ListWrapperActions.STORE_SEARCH_TERM:
            return {
                ...state,
                [payload.sharedStoreId]: { ...state[payload.sharedStoreId], searchTerm: payload.searchTerm },
            };
        case ListWrapperActions.STORE_SORTED_COLUMN:
            return {
                ...state,
                [payload.sharedStoreId]: { ...state[payload.sharedStoreId], sortedColumn: payload.sortedColumn },
            };
        case ListWrapperActions.STORE_SORT_DIRECTION:
            return {
                ...state,
                [payload.sharedStoreId]: { ...state[payload.sharedStoreId], sortDirection: payload.sortDirection },
            };
        default:
            return state;
    }
};

// SELECTORS:

const selectSearchParams = (state) => state.listWrapper;
export const selectSearchTerm = (sharedStoreId) =>
    createSelector(selectSearchParams, (searchParams) => searchParams[sharedStoreId]?.searchTerm ?? '');
export const selectSortedColumn = (sharedStoreId) =>
    createSelector(selectSearchParams, (searchParams) => searchParams[sharedStoreId]?.sortedColumn ?? 'status');
export const selectSortDirection = (sharedStoreId) =>
    createSelector(selectSearchParams, (searchParams) => searchParams[sharedStoreId]?.sortDirection ?? 'ascending');
