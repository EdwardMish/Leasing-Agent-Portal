import { PropertyTypes } from 'API/Property';
import { PropertyWithOccupants } from '../../State/Shared/Types';

export const mapPropertyWithOccupantsResponseToPropertyWithOccupants = ({
    id,
    name,
    occupants,
    ...rest
}: PropertyTypes.PropertyTenantResolutionResponse): PropertyWithOccupants => ({
    id,
    name,
    occupants: occupants.map(({ id: occupantId, name: occupantName, ...rest }) => ({
        id: occupantId,
        name: occupantName,
    })),
});

