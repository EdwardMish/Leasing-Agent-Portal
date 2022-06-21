import { GET } from "../../utils";

import { UserAddress } from "../UsersTypes/UserAddress";

const getUserAddress = (userId: number | string): Promise<UserAddress> =>
    GET.wrapper<UserAddress>(`${API_ROOT}/users/${userId}/mailingaddress`);

export default getUserAddress;
