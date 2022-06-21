import { format } from 'date-fns';

export const formatDate = (dateString: string, dateFormat: string = 'MM/dd/yyyy'): string => {
    const dt = new Date(dateString);
    return format(dt, dateFormat);
};
