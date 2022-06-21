import { Liability } from 'API/Leasing/Types/Liability';
import POST from 'API/utils/POST';

const createLiability = async (leaseApplicationId: number, values: Liability): Promise<number> =>
    POST.postFormData<Liability, number>(
        `${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/liabilities`,
        values,
    );

export default createLiability;
