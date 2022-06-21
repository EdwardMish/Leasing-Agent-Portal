import { LeasingLead } from 'API/Leasing/Types/LeasingLead';
import GET from 'API/utils/GET';

const getLeasingLead = (leasingLeadId: number): Promise<LeasingLead> =>
    GET.wrapper<LeasingLead>(`${API_ROOT}/leasing/leads/${leasingLeadId}`);

export default getLeasingLead;
