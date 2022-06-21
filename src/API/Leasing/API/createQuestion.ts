import { Question } from 'API/Leasing/Types/Question';
import POST from 'API/utils/POST';

interface CreatedQuestion {
    questionId: number;
}

const createQuestion = async (leadId: number, applicationID: number, question: Question): Promise<CreatedQuestion> =>
    POST.postWithResponse<Question, CreatedQuestion>(
        `${API_ROOT}/leasing/leads/${leadId}/personal-applications/${applicationID}/questions`,
        question,
    );

export default createQuestion;
