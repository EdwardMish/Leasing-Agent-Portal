import DELETE from 'API/utils/DELETE';

const deleteQuestion = async (leasingLeadId: number, questionId: number): Promise<void> =>
    DELETE.wrapper(`${API_ROOT}/leasing/leads/${leasingLeadId}/questions/${questionId}`);

export default deleteQuestion;
