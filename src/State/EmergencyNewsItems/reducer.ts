import { EmergencyNewsItemsState, LoadStatus } from '../../Types';

import {
    EmergencyMessageActions,
    EmergencyMessageActionTypes
} from './actions';

export const initialState: EmergencyNewsItemsState = {
    currentNewsItem: 0,
    newsItems: [],
    newsItemsLoadStatus: LoadStatus.INITIAL_STATE
};

export function emergencyNewsItemsReducer(state: EmergencyNewsItemsState = initialState, action: EmergencyMessageActionTypes): EmergencyNewsItemsState {
    switch (action.type) {
        case EmergencyMessageActions.LOAD_EMERGENCY_NEWS_ITEMS:
            return {
                ...state,
                newsItemsLoadStatus: LoadStatus.PENDING
            }
        case EmergencyMessageActions.SET_EMERGENCY_NEWS_ITEMS:
            return {
                ...state,
                newsItems: action.payload,
                newsItemsLoadStatus: LoadStatus.LOADED
            }
        case EmergencyMessageActions.ADVANCE_EMERGENCY_NEWS_ITEM:
            const {
                currentNewsItem: aeniCurrentNewsItem,
                newsItems: aeniNewsItems
            } = state;

            if (aeniNewsItems.length === 1 || !(!!aeniNewsItems.length)) {
                return {
                    ...state
                }
            }

            if (aeniCurrentNewsItem >= aeniNewsItems.length - 1) {
                return {
                    ...state,
                    currentNewsItem: 0
                }
            }

            return {
                ...state,
                currentNewsItem: state.currentNewsItem + 1
            }
        default:
            return state
    }
}