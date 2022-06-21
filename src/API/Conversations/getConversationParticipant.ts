import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetConversationParticipantResponse } from 'Types/api-types/Conversations/GetConversationParticipantResponse';
import { ConversationParticipant } from 'Types/Conversations/ConversationParticipant';

const getConversationParticipant = (conversationId: number, userId: number): Promise<ConversationParticipant> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations/${conversationId}/participants/${userId}`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetConversationParticipantResponse>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getConversationParticipant;
