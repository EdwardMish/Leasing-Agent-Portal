import POST from 'API/utils/POST';

const requestSales = (occupantId: number | string, year: number, month: number | string): Promise<void> =>
    POST.wrapper(`${API_ROOT}/occupants/${occupantId}/requestsales/${year}/${month}`);

export default requestSales;
