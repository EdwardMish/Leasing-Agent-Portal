import GET from 'API/utils/GET';
import { TermsResponse } from '../ContentTypes/TermsResponse';

const getTerms = (): Promise<TermsResponse> => GET.wrapper(`${API_ROOT}/content/terms`);

export default getTerms;
