import GET from 'API/utils/GET';
import { Snippet } from '../ContentTypes/Snippet';

const getSnippetsForPath = (path?: string): Promise<Snippet[]> =>
    GET.wrapper(`${API_ROOT}/content/snippets/${path?.replace(/^\/*(.*)/g, '$1')} `);

export default getSnippetsForPath;
