import POST from 'API/utils/POST';

const createLeasingLead = async (
    propertyId: number,
    spaceId: number,
    name: string,
    details?: string,
    tag?: string,
): Promise<number> => {
    const newLeasingLead = await POST.postWithResponse<
        { propertyId: number; spaceId: number; name: string; details?: string; tag?: string },
        { leasingLeadId: number }
    >(`${API_ROOT}/leasing/leads`, {
        propertyId,
        spaceId,
        name,
        details,
        tag,
    });

    return newLeasingLead.leasingLeadId;
};

export default createLeasingLead;
