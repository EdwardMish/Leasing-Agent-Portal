import { isSameDay } from 'date-fns';

export const isSameDate = (dateLeft: string, dateRight?: string) => {
    if (!dateRight) return false;
    return isSameDay(new Date(dateLeft), new Date(dateRight));
};
