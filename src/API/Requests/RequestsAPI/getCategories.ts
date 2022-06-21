import GET from 'API/utils/GET';
import { CategoryResponse } from '../RequestsTypes/CategoryResponse';

const getCategories = (): Promise<CategoryResponse[]> => GET.wrapper<CategoryResponse[]>(`${API_ROOT}/requests/categories`);

export default getCategories;
