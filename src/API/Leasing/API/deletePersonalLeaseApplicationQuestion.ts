import DELETE from 'API/utils/DELETE';

const deletePersonalLeaseApplicationQuestion = async (
    leasingLeadId: number,
    leaseApplicationId: number,
    questionId: number,
): Promise<void> =>
    DELETE.wrapper(
        `${API_ROOT}/leasing/leads/${leasingLeadId}/personal-applications/${leaseApplicationId}/questions/${questionId}`,
    );

export default deletePersonalLeaseApplicationQuestion;
