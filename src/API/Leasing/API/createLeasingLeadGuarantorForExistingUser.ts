import POST from 'API/utils/POST';

const createLeasingLeadGuarantorForExistingUser = (leasingLeadId: number, userId: number): Promise<void> =>
    POST.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}/guarantors/existing`, { userId });

export default createLeasingLeadGuarantorForExistingUser;
