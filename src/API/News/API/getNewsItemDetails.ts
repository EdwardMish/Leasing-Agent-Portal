import GET from 'API/utils/GET';
import { News } from '../Types';

const getNewsItemDetails = (id: number): Promise<News> => GET.wrapper(`${API_ROOT}/news/${id}`);

export default getNewsItemDetails;
