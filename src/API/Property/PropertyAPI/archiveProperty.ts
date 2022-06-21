import PATCH from 'API/utils/PATCH';

const archiveProperty = (propertyId: number | string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/properties/${propertyId}/archive`);

export default archiveProperty;
