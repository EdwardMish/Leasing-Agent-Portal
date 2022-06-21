import GET from 'API/utils/GET';
import { OccupantContactResponse } from '../ContactTypes/OccupationContactResponse';

const getOccupantContacts = (occupantId: number | string): Promise<OccupantContactResponse[]> =>
    GET.wrapper<OccupantContactResponse[]>(`${API_ROOT}/occupants/${occupantId}/contacts`);

export default getOccupantContacts;
