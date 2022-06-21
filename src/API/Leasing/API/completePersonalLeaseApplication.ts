import PATCH from 'API/utils/PATCH';

const completePersonalLeaseApplication = async (leadId: number, applicationID: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leasing/leads/${leadId}/personal-applications/${applicationID}/complete`);

export default completePersonalLeaseApplication;
