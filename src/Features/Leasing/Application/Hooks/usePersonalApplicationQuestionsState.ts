// usePersonalApplicationQuestionsState

import { API as LeasingAPI } from 'API/Leasing';
import { Question } from 'API/Leasing/Types/Question';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import selectors from 'State/Leasing/selectors';
import { LeasingApplication } from 'State/Leasing/Types';

export interface useQuestionsStateReturn {
    getQuestions: () => Promise<void>;
    questions: Question[];
    filteredOpenQuestions: () => Question[];
    filteredAnsweredQuestions: () => Question[];
    totalQuestions: number;
    loadingQuestions: boolean;
    respondQuestion: (number, string) => Promise<void>;
    respondingQuestion: boolean;
    errorMessage: string;
}

const useQuestionsState = (): useQuestionsStateReturn => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [respondingQuestion, setRespondingQuestion] = useState(false);

    const activeApplication: LeasingApplication | undefined = useSelector(selectors.leasingApplication);

    const getQuestions = async (): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to retrive questions with an undefined application');

        try {
            setLoadingQuestions(true);
            const response = await LeasingAPI.getQuestions(activeApplication?.id);
            setQuestions(response);
            setTotalQuestions(response.length);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            throw error;
        } finally {
            setLoadingQuestions(false);
        }
    };

    const respondQuestion = async (questionId: number, answer: string): Promise<void> => {
        if (!activeApplication) throw new Error('Unable to respond the question with an undefined application');

        try {
            setRespondingQuestion(true);
            await LeasingAPI.respondQuestion(activeApplication?.id, questionId, answer);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('');
            throw error;
        } finally {
            setRespondingQuestion(false);
        }
    };

    const filteredOpenQuestions = () => questions.filter((question) => !question?.answeredDate);
    const filteredAnsweredQuestions = () => questions.filter((question) => question?.answeredDate);

    return {
        getQuestions,
        questions,
        filteredOpenQuestions,
        filteredAnsweredQuestions,
        totalQuestions,
        loadingQuestions,
        respondQuestion,
        respondingQuestion,
        errorMessage,
    };
};

export default useQuestionsState;
