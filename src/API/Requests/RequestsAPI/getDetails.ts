import GET from 'API/utils/GET';
import { RequestResponse } from '../RequestsTypes/RequestResponse';

const getDetails = (requestId: number): Promise<RequestResponse> =>
    GET.wrapper<RequestResponse>(`${API_ROOT}/requests/${requestId}`);

export default getDetails;
