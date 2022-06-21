import axios from 'axios';

const sendMessage = (conversationId: number, message: string): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .post(
                `${API_ROOT}/conversations/${conversationId}/messages`,
                { message },
                { headers: { 'Content-Type': 'application/json' } },
            )
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default sendMessage;
