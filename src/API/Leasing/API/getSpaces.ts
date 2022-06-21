import GET from 'API/utils/GET';
import { Space } from 'API/Leasing/Types/Space';

const getSpaces = async (propertyId: number): Promise<Space[]> =>
    GET.wrapper<Space[]>(`${API_ROOT}/leasing/leads/properties/${propertyId}/spaces`);
export default getSpaces;
