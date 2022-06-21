import DELETE from 'API/utils/DELETE';

const deleteLeasingLead = async (leasingLeadId: number): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}`);

export default deleteLeasingLead;
