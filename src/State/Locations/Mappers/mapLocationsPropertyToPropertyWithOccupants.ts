import { LocationsProperty } from '../../../API/Locations/Types/LocationsProperty';
import { PropertyWithOccupants } from '../../Shared/Types/PropertyWithOccupants';

export default ({
    id,
    name,
    occupants,
}: LocationsProperty): PropertyWithOccupants => ({
    id,
    name,
    occupants,
});
