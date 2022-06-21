import GET from 'API/utils/GET';
import { Snippet } from '../ContentTypes/Snippet';

const getAllSnippets = (): Promise<Snippet[]> => GET.wrapper(`${API_ROOT}/content/snippets`);

export default getAllSnippets;
