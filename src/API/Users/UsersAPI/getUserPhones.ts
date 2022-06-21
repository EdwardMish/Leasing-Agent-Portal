import { GET } from "../../utils";

import { UserPhone } from "../UsersTypes/UserPhone";

const getUserPhones = (userId: number | string): Promise<UserPhone[]> =>
    GET.wrapper<UserPhone[]>(`${API_ROOT}/users/${userId}/phones`);

export default getUserPhones;
