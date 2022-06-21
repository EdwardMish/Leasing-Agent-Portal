import GET from 'API/utils/GET';
import { GetAccountInformationResponse, AccountInformation } from '../../Types';

const getAccountInformation = async (): Promise<AccountInformation> => {
    const data: GetAccountInformationResponse = await GET.wrapper(`${API_ROOT}/reports/occupant-account-information`);
    return data.accountInformation;
};

export default getAccountInformation;
