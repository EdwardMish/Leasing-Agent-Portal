import sharedAPIUrls from 'API/Shared/sharedAPIUrls';
import GET from 'API/utils/GET';
import { Occupant } from '../OccupantTypes/Occupant';

const getOccupantsOfUser = (userId: number | string): Promise<{ occupants: Occupant[] }> =>
    GET.wrapper<{ occupants: Occupant[] }>(sharedAPIUrls.getOccupantsOfUser(userId));

export default getOccupantsOfUser;
