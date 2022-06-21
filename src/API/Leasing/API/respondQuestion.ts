import PATCH from 'API/utils/PATCH';

const respondQuestion = (leaseApplicationId: number, questionId: number, answer: string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/questions/${questionId}`, { answer });

export default respondQuestion;
