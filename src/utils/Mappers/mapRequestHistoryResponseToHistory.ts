import { RequestsTypes } from 'API/Requests';
import { Requests } from '../../State';

export const mapRequestHistoryResponseToHistory = (
    requestHistoryResponse: RequestsTypes.HistoryResponse[],
): Requests.Types.RequestHistory[] =>
    requestHistoryResponse.map(({ description, createdDate, createdBy }: RequestsTypes.HistoryResponse) => ({
        description,
        createdDate,
        createdBy,
    }));

