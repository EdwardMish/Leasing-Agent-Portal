import axios from 'axios';

const addUserToConversation = (conversationId: number, userId: number): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .post(
                `${API_ROOT}/conversations/${conversationId}/participants/${userId}`,
                {},
                { headers: { 'Content-Type': 'application/json' } },
            )
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default addUserToConversation;
