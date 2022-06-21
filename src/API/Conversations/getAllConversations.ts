import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetAllConversationsResponse } from 'Types/api-types/Conversations/GetAllConversationsResponse';
import { Conversation } from 'Types/Conversations/Conversation';

const getAllConversations = (): Promise<Conversation[]> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations?pagesize=100&pagenumber=1&sort=id~Descending`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetAllConversationsResponse>) => {
                res(data.results);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getAllConversations;
