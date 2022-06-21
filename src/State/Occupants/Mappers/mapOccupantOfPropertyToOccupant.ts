import { SalesSubmissionFrequency } from '../../../Types';
import { OccupantTypes } from 'API/Occupant';
import { Occupant } from '../Types';

export const mapOccupantOfPropertyToOccupant = (from: OccupantTypes.OccupantOfProperty) =>
    ({
        id: from.id,
        canEdit: from.isMyTenantOccupant,
        collectSalesStartDate: from.collectSalesStart,
        leaseEnd: from.leaseEnd,
        leaseStart: from.leaseStart,
        name: from.marketingName,
        phone: from.phone,
        propertyId: from.propertyId,
        propertyName: from.propertyName,
        salesSubmissionFrequency: from.salesSubmissionFrequency,
        shouldSubmitSales:
            from.salesSubmissionFrequency === SalesSubmissionFrequency.monthly ||
            from.salesSubmissionFrequency === SalesSubmissionFrequency.yearly,
        spaces: from.spaces,
    } as Occupant);

