import axios from 'axios';

const leaveConversation = (conversationId: number): Promise<void> =>
    new Promise((res, rej) => {
        axios
            .patch(`${API_ROOT}/conversations/${conversationId}/leave`)
            .then(() => {
                res();
            })
            .catch((error: Error) => {
                rej(error);
            });
    });

export default leaveConversation;
