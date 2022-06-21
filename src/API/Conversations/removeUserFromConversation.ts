import axios from 'axios';

const removeUserFromConversation = (conversationId: number, userId: number): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .delete(`${API_ROOT}/conversations/${conversationId}/participants/${userId}`)
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default removeUserFromConversation;
