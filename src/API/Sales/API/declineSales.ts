import PATCH from 'API/utils/PATCH';

const declineSales = (
    occupantId: number | string,
    year: number | string,
    month: number | string,
    reason: string,
): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/occupants/${occupantId}/sales/${year}/${month}/decline`, { DeclineReason: reason });

export default declineSales;
