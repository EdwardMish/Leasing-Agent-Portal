import GET from 'API/utils/GET';
import { Question } from 'API/Leasing/Types/Question';

const getQuestions = async (leaseApplicationId: number): Promise<Question[]> =>
    GET.wrapper<Question[]>(`${API_ROOT}/leasing/personal-applications/${leaseApplicationId}/questions`);
export default getQuestions;
