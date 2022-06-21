import { PersonalLeaseApplication } from 'API/Leasing/Types/PersonalLeaseApplication';
import GET from 'API/utils/GET';

const getPersonalLeaseApplication = (leadId: number, applicationId: number): Promise<PersonalLeaseApplication> =>
    GET.wrapper<PersonalLeaseApplication>(`${API_ROOT}/leasing/leads/${leadId}/personal-applications/${applicationId}`);

export default getPersonalLeaseApplication;
