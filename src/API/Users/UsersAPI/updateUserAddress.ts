import { PATCH } from "../../utils";
import { UserAddress } from "../UsersTypes/UserAddress";

const updateUserAddress = (userId: number | string, mailingAddress: UserAddress): Promise<void> =>
    PATCH.wrapper<UserAddress>(`${API_ROOT}/users/${userId}/mailingaddress`, {
        ...mailingAddress,
    });

export default updateUserAddress;
