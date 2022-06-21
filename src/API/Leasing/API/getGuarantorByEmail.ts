import { ExistingGuarantor } from 'API/Leasing/Types/ExistingGuarantor';
import GET from 'API/utils/GET';

const getGuarantorByEmail = async (email: string): Promise<ExistingGuarantor> => {
    const { existingUser } = await GET.wrapper<{ existingUser: ExistingGuarantor }>(
        `${API_ROOT}/leasing/guarantors/${email}/details`,
    );

    return existingUser;
};

export default getGuarantorByEmail;
