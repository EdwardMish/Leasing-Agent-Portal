import POST from 'API/utils/POST';

const resendLeadInvitation = async (leasingLeadId: number, leaseApplicationId: number): Promise<void> =>
    POST.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}/personal-applications/${leaseApplicationId}/resend-invitation`);

export default resendLeadInvitation;
