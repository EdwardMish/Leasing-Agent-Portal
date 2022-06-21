import { ApplicantPersonalLeaseApplication } from 'API/Leasing/Types/ApplicantPersonalLeaseApplication';
import GET from 'API/utils/GET';

const getPersonalLeaseApplicationForApplicant = (applicationId: number): Promise<ApplicantPersonalLeaseApplication> =>
    GET.wrapper<ApplicantPersonalLeaseApplication>(`${API_ROOT}/leasing/personal-applications/${applicationId}`);

export default getPersonalLeaseApplicationForApplicant;
