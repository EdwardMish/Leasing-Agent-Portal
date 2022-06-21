import PATCH from 'API/utils/PATCH';

const completePersonalApplicationLiabilities = (leaseApplicationId: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/liabilities/complete`);

export default completePersonalApplicationLiabilities;
