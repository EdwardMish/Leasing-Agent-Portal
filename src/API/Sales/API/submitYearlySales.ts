import POST from 'API/utils/POST';

const submitYearlySales = (occupantId: number | string, year: number, salesAmount): Promise<void> =>
    POST.wrapper(`${API_ROOT}/occupants/${occupantId}/yearly-sales/${year}`, { salesAmount });

export default submitYearlySales;
