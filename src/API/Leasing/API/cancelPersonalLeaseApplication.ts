import PATCH from 'API/utils/PATCH';

const cancelPersonalLeaseApplication = async (leadId: number, applicationID: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leasing/leads/${leadId}/personal-applications/${applicationID}/cancel`);

export default cancelPersonalLeaseApplication;
