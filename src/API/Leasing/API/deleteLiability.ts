import DELETE from 'API/utils/DELETE';
import { Liability } from '../Types/Liability';

const deleteLiability = async (leaseApplicationId: number, liability: Liability): Promise<void> =>
    DELETE.wrapper<Liability>(
        `${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/liabilities/${liability.id}`,
        liability,
    );

export default deleteLiability;
