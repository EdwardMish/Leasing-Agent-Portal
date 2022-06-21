import PATCH from 'API/utils/PATCH';

const updateDescription = (id: number | string, description: string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/news/${id}/description`, { description });

export default updateDescription;
