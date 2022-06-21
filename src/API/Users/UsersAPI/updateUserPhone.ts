import { PATCH } from "../../utils";

import { PhoneType } from "../../../Types/User/PhoneType";

const updateUserPhone = (userId: number | string, type: PhoneType, phoneNumber: string): Promise<void> =>
    PATCH.wrapper<{
        phoneType: PhoneType;
        phoneNumber: string;
    }>(`${API_ROOT}/users/${userId}/phones/${type}`, { phoneType: type, phoneNumber: phoneNumber.replace(/\D/g, "") });

export default updateUserPhone;
