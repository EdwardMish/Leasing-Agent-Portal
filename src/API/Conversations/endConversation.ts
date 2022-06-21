import axios from 'axios';

const endConversation = (conversationId: number): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .delete(`${API_ROOT}/conversations/${conversationId}`)
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default endConversation;
