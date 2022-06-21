import GET from 'API/utils/GET';
import { PropertyTenantResolutionResponse } from '../PropertyTypes/PropertyTenantResolutionResponse';

const getPropertyTenantResolutionList = (): Promise<PropertyTenantResolutionResponse[]> =>
    GET.wrapper<PropertyTenantResolutionResponse[]>(`${API_ROOT}/properties/tenant-resolution`);

export default getPropertyTenantResolutionList;
