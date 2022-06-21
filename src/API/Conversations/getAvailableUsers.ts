import addCacheControlHeaders from 'API/utils/addCacheControlHeaders';
import axios, { AxiosResponse } from 'axios';
import { GetAvailableUsersResponse } from 'Types/api-types/Conversations/GetAvailableUsersResponse';
import { ConversationUserReference } from 'Types/Conversations/ConversationUserReference';

const getAvailableUsers = (conversationId: number): Promise<ConversationUserReference[]> =>
    new Promise((res, rej) => {
        axios
            .get(`${API_ROOT}/conversations/${conversationId}/addable-users`, addCacheControlHeaders())
            .then(({ data }: AxiosResponse<GetAvailableUsersResponse>) => {
                res(data);
            })
            .catch((err) => {
                rej(err);
            });
    });

export default getAvailableUsers;
