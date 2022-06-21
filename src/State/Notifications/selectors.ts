import { createSelector } from 'reselect';
import { State } from '../../Types/State';

const notificationsState = ({ notifications }: State) => notifications;

// Properties
export const notificationsCount = createSelector(
    notificationsState,
    ({ count }) => count,
);
