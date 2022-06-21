import DELETE from 'API/utils/DELETE';

const deleteNewsItem = (id: number): Promise<void> => DELETE.wrapper(`${API_ROOT}/news/${id}`);

export default deleteNewsItem;
