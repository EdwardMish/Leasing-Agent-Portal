import POST from 'API/utils/POST';

const markAsRead = (id: number): Promise<void> => POST.wrapper(`${API_ROOT}/news/${id}/read`);

export default markAsRead;
