import { PATCH } from "../../utils";

const updateUserName = (userId: number | string, firstName: string, lastName: string): Promise<void> =>
    PATCH.wrapper(`${API_ROOT}/users/${userId}/name`, { firstName, lastName });

export default updateUserName;
