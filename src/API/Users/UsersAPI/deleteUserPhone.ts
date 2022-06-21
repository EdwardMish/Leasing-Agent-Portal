import { DELETE } from "../../utils";

import { PhoneType } from "../../../Types/User/PhoneType";

const deleteUserPhone = (userId: number | string, type: PhoneType) =>
    DELETE.wrapper(`${API_ROOT}/users/${userId}/phones/${type}`);

export default deleteUserPhone;
