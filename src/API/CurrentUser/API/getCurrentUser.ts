import GET from 'API/utils/GET';
import { User } from '../Types';

const getCurrentUser = (): Promise<User> => GET.wrapper(`${API_ROOT}/users/current`);

export default getCurrentUser;
