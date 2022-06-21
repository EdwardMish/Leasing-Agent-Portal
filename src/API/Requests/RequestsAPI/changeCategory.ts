import PATCH from 'API/utils/PATCH';

const changeCategory = (requestId: number | string, category: string, subcategory = ''): Promise<void> =>
    subcategory.length
        ? PATCH.wrapper<{ category: string; subcategory: string }>(`${API_ROOT}/requests/${requestId}/recategorize`, {
              category,
              subcategory,
          })
        : PATCH.wrapper<{ category: string }>(`${API_ROOT}/requests/${requestId}/recategorize`, { category });

export default changeCategory;
