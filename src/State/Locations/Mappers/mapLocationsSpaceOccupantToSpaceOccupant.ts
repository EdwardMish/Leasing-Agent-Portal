import { LocationsOccupantDetail } from '../../../API/Locations/Types/LocationsOccupantDetail';
import { OccupantDetail } from '../Types/OccupantDetail';

export default ({
    collectSalesStartDate,
    leaseEnd,
    leaseStart,
    spaces,
    salesSubmissionFrequency,
    id,
    propertyId,
    legalName,
    marketingName,
    phone,
    propertyName,
    physicalAddress,
    mailingAddress,
}: LocationsOccupantDetail): OccupantDetail => ({
    collectSalesStartDate,
    leaseEnd,
    leaseStart,
    spaces,
    salesSubmissionFrequency,
    id,
    propertyId,
    legalName,
    marketingName,
    phone,
    propertyName,
    physicalAddress,
    mailingAddress,
});
