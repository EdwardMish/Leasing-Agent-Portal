import POST from 'API/utils/POST';
import { Feedback } from '../FeedbackTypes/Feedback';

const sendFeedback = (rating: number, comment: string): Promise<void> =>
    POST.wrapper<Feedback>(`${API_ROOT}/feedback`, { rating, comment: comment || '' });

export default sendFeedback;
