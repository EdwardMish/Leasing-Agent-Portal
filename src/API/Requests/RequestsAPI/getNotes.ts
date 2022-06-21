import GET from 'API/utils/GET';
import { NotesResponse } from '../RequestsTypes/NotesResponse';

const getNotes = (requestid: string | number): Promise<NotesResponse[]> =>
    GET.wrapper(`${API_ROOT}/requests/${requestid}/notes`);

export default getNotes;
