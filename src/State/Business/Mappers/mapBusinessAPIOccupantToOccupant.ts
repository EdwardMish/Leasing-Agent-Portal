import { Business } from '../../../API'

import { Occupant } from '../Types/Occupant'

export const mapBusinessAPIOccupantToOccupant = ({
    collectSalesStartDate,
    id,
    leaseEnd,
    leaseStart,
    mailingAddress,
    marketingName,
    phone,
    physicalAddress,
    propertyId,
    propertyName,
    salesSubmissionFrequency,
    setup,
    spaces,
    users,
}: Business.Types.Occupant): Occupant => ({
    collectSalesStartDate,
    id,
    leaseEnd,
    leaseStart,
    mailingAddress,
    marketingName,
    phone,
    physicalAddress,
    propertyId,
    propertyName,
    salesSubmissionFrequency,
    setup,
    spaces,
    users,
})