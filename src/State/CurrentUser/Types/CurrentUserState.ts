import { CurrentUser } from './CurrentUser';
import { LoadStatus } from '../../../Types';

export interface CurrentUserState {
    currentUser: CurrentUser;
    loadStatus: LoadStatus;
}
