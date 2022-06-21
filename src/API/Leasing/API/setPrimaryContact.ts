import PATCH from 'API/utils/PATCH';

const setPrimaryContact = (leasingLeadId: number, userId: number): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leads/${leasingLeadId}/primary-contact`, { userId });

export default setPrimaryContact;
