import axios from 'axios';

const markLastMessageRead = (conversationId: number, messageId: number): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .patch(`${API_ROOT}/conversations/${conversationId}/messages/${messageId}/read`)
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default markLastMessageRead;
