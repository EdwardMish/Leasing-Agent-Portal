import GET from 'API/utils/GET';
import { SalesSubmittal } from '../../../Types';

const getOccupantSales = (occupantId: number | string): Promise<SalesSubmittal[]> =>
    GET.wrapper(`${API_ROOT}/occupants/${occupantId}/sales`);

export default getOccupantSales;
