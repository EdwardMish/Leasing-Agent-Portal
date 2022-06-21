import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetConversationParticipantsResponse } from 'Types/api-types/Conversations/GetConversationParticipantsResponse';
import { ConversationParticipant } from 'Types/Conversations/ConversationParticipant';

const getConversationParticipants = (conversationId: number): Promise<ConversationParticipant[]> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations/${conversationId}/participants`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetConversationParticipantsResponse>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getConversationParticipants;
