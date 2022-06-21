import { createSelector } from 'reselect';
import { EmergencyNewsItemsState, State, LoadStatus } from '../../Types';

const emergencyNewsItemState = ({ emergencyNewsItems }: State) => emergencyNewsItems

export const emergencyNewsItems = createSelector(
    emergencyNewsItemState,
    ({ newsItems }: EmergencyNewsItemsState) => newsItems
)

export const hasEmergencyNewsItems = createSelector(
    emergencyNewsItemState,
    ({ newsItems }: EmergencyNewsItemsState) => !!(newsItems.length)
)

export const currentNewsItem = createSelector(
    emergencyNewsItemState,
    ({ newsItems, currentNewsItem }) => newsItems[currentNewsItem]
)

// Load Status
export const emergencyNewsItemLoadStatus = createSelector(
    emergencyNewsItemState,
    ({ newsItemsLoadStatus }: EmergencyNewsItemsState) => newsItemsLoadStatus
)

export const emergencyNewsItemsAreLoaded = createSelector(
    emergencyNewsItemLoadStatus,
    (loadStatus: LoadStatus) => loadStatus === LoadStatus.LOADED
)