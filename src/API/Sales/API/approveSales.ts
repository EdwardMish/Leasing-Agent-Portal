import PATCH from 'API/utils/PATCH';

const approveSales = (occupantId: number | string, year: number | string, month: number | string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/occupants/${occupantId}/sales/${year}/${month}/approve`);

export default approveSales;
