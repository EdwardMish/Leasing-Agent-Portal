import { LocationsOccupantDetail } from '../../API/Locations/Types/LocationsOccupantDetail';
import { OccupantDetail } from '../../State/Locations/Types/OccupantDetail';
import { Occupant } from '../../State/Occupants/Types/Occupant';
import { SalesSubmissionFrequency } from '../../Types';
import { OccupantTypes } from 'API/Occupant';

// TODO: Should these be consolidated in some way
type OccupantToMap = OccupantTypes.Occupant | LocationsOccupantDetail | OccupantDetail;

export const mapOccupantResponseToOccupant = ({
    id,
    marketingName,
    spaces,
    phone,
    leaseStart,
    leaseEnd,
    collectSalesStartDate,
    propertyId,
    propertyName,
    salesSubmissionFrequency,
}: OccupantToMap): Occupant => ({
    name: marketingName,
    id,
    propertyId,
    propertyName,
    collectSalesStartDate,
    phone,
    canEdit: true, // TODO: this needs set properly and from the right API.
    spaces,
    leaseStart,
    leaseEnd,
    salesSubmissionFrequency: salesSubmissionFrequency as SalesSubmissionFrequency,
    shouldSubmitSales: salesSubmissionFrequency !== SalesSubmissionFrequency.notRequired,
});

