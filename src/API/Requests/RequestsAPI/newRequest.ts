import POST from 'API/utils/POST';
import { NewRequest } from '../RequestsTypes/NewRequest';

const newRequest = (request: NewRequest): Promise<{ requestId: number }> =>
    request.subcategory && !!request.subcategory.length
        ? POST.postWithResponse<NewRequest, { requestId: number }>(`${API_ROOT}/requests`, request)
        : POST.postWithResponse<NewRequest, { requestId: number }>(`${API_ROOT}/requests`, {
              description: request.description,
              category: request.category,
              propertyId: request.propertyId,
              occupantId: request.occupantId,
          });

export default newRequest;
