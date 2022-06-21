import { UserTypes } from "../../../Types";

import { EmailTypes } from "./EmailTypes";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    enabled: boolean;
    userType: UserTypes;
    notificationTypes: EmailTypes[];
}
