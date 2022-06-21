import GET from 'API/utils/GET';
import { DirectoryProperty } from '../DirectoryTypes/DirectoryProperty';

const getProperties = (): Promise<DirectoryProperty[]> => GET.wrapper(`${API_ROOT}/directory/properties`);

export default getProperties;
