import PUT from 'API/utils/PUT';

const resubmitMonthlySales = (
    occupantId: number | string,
    year: number,
    month: number,
    salesAmount: number,
    comment: string,
): Promise<void> =>
    PUT.wrapper(`${API_ROOT}/occupants/${occupantId}/sales/${year}/${month}/resubmit`, { comment, salesAmount });

export default resubmitMonthlySales;
