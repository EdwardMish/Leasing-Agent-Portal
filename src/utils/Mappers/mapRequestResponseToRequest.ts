import { RequestsTypes } from 'API/Requests';
import { Requests } from '../../State';

export const mapRequestResponseToRequest = (requestResponse: RequestsTypes.RequestResponse): Requests.Types.Request => ({
    assignedTo: requestResponse.assignedTo,
    category: {
        id: requestResponse.category.category,
        name: requestResponse.category.name,
    },
    createdBy: requestResponse.createdBy,
    createdDate: requestResponse.createdDate,
    description: requestResponse.description,
    id: requestResponse.id,
    occupantId: requestResponse.occupantId,
    occupantName: requestResponse.occupantName,
    priority: requestResponse.priority,
    propertyId: requestResponse.propertyId,
    propertyName: requestResponse.propertyName,
    spaceName: requestResponse.spaceName,
    status: requestResponse.status,
    subcategory: requestResponse.subCategory
        ? {
              id: requestResponse.subCategory.subCategory,
              name: requestResponse.subCategory.name,
          }
        : null,
});

