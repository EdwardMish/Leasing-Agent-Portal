import GET from 'API/utils/GET';

const getCategories = (): Promise<
    {
        id: number;
        name: string;
    }[]
> => GET.wrapper(`${API_ROOT}/inspections/categories`);

export default getCategories;
