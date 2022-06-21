import POST from 'API/utils/POST';

const submitMonthlySales = (
    occupantId: number | string,
    year: number,
    month: number,
    salesAmount: number,
    comment?: string,
): Promise<void> => {
    const data = comment ? { comment, salesAmount } : { salesAmount };

    return POST.wrapper(`${API_ROOT}/occupants/${occupantId}/monthly-sales/${year}/${month}`, data);
};

export default submitMonthlySales;
