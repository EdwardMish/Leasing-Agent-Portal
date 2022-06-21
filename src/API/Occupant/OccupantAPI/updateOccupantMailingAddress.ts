import PATCH from 'API/utils/PATCH';
import { OccupantAddress } from '../OccupantTypes/OccupantAddress';

const updateOccupantMailingAddress = (occupantId: number | string, mailingAddress: OccupantAddress): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/occupants/${occupantId}/mailing-address`, mailingAddress);

export default updateOccupantMailingAddress;
