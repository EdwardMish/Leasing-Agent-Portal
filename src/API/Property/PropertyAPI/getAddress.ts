import GET from 'API/utils/GET';
import { PropertyAddress } from '../PropertyTypes/PropertyAddress';

const getAddress = (id: number | string): Promise<PropertyAddress> =>
    GET.wrapper<PropertyAddress>(`${API_ROOT}/properties/${id}/address`);

export default getAddress;
