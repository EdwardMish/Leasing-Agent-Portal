import POST from 'API/utils/POST';
import { NewsTypes } from '../Types';

const createNewsItem = (
    type: NewsTypes,
    subject: string,
    description: string,
    occupants: string[],
    publishFrom: Date,
    publishTo: Date,
): Promise<number> =>
    POST.postWithResponse(`${API_ROOT}/news`, {
        type,
        subject,
        description,
        occupants,
        publishFrom,
        publishTo,
    });

export default createNewsItem;
