import POST from 'API/utils/POST';

const askQuestion = (newsItemId: number, message: string): Promise<void> =>
    POST.wrapper(`${API_ROOT}/news/askaquestion`, { newsItemId, message });

export default askQuestion;
