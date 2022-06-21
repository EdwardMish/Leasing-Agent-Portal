import PATCH from 'API/utils/PATCH';

const completePersonalApplicationAssets = (leaseApplicationId: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/assets/complete`);

export default completePersonalApplicationAssets;
