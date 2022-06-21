import POST from 'API/utils/POST';

const createLeasingLeadGuarantorForNewUser = (
    leasingLeadId: number,
    firstName: string,
    lastName: string,
    email: string,
): Promise<void> =>
    POST.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}/guarantors/new`, {
        firstName,
        lastName,
        email,
    });

export default createLeasingLeadGuarantorForNewUser;
