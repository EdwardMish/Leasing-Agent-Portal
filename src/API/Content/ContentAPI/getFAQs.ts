import GET from 'API/utils/GET';
import { FAQResponse } from '../ContentTypes/FAQResponse';

const getFAQs = (): Promise<FAQResponse> => GET.wrapper(`${API_ROOT}/content/faqs`);

export default getFAQs;
