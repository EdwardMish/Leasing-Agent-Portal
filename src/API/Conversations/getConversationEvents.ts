import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetConversationEventsResponse } from 'Types/api-types/Conversations/GetConversationEventsResponse';
import { ConversationStreamEvent } from 'Types/Conversations/ConversationStreamEvent';

const getConversationEvents = (conversationId: number): Promise<ConversationStreamEvent[]> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations/${conversationId}/events`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetConversationEventsResponse>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getConversationEvents;
