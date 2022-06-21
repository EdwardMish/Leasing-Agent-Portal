import { RequestsTypes } from 'API/Requests';
import { Requests } from '../../State';

export const mapCategoriesResponseToCategories = (
    categoryResponse: RequestsTypes.CategoryResponse[],
): Requests.Types.Category[] =>
    categoryResponse.map((categoryResponse: RequestsTypes.CategoryResponse) => ({
        id: categoryResponse.id,
        name: categoryResponse.name,
        subcategories: categoryResponse.subCategories as Requests.Types.Subcategory[],
    }));

