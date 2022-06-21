import { LocationsSpace } from '../../../API/Locations/Types/LocationsSpace';
import { Space } from '../../Shared/Types/Space';

export default ({
    id,
    name,
    address,
    externalBuildingId,
}: LocationsSpace): Space => ({
    id,
    name,
    address,
    externalBuildingId,
});
