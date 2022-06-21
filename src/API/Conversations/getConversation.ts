import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetConversationReponse } from 'Types/api-types/Conversations/GetConversationReponse';
import { Conversation } from 'Types/Conversations/Conversation';

const getConversation = (conversationId: number): Promise<Conversation> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations/${conversationId}`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetConversationReponse>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getConversation;
