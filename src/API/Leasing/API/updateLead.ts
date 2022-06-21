import PUT from 'API/utils/PUT';

const updateLead = (leasingLeadId: number, name: string, details: string, tag: string): Promise<void> =>
    PUT.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}`, { name, details, tag });

export default updateLead;
