import { User } from './Types/User';

import { UserPermissions } from '../../Types';
import { GET, PATCH } from '../utils';

export namespace UserAPI {
    const ROOT_URL = `${API_ROOT}/users`;

    export interface OccupantWithPermissions {
        name: string;
        propertyName: string;
        occupantId: number;
        setup: string;
        tenantPermissions: UserPermissions[];
    }

    export interface Terms {
        termsAcceptedOn: Date;
    }

    export const getUser = (userId: number | string): Promise<User> => GET.wrapper<User>(`${ROOT_URL}/${userId}`);

    export const getTermsAcceptedDateForUser = (userId: number): Promise<Terms> => GET.wrapper(`${ROOT_URL}/${userId}/terms`);

    export const getTermsAcceptedDateForCurrentUser = (): Promise<Terms> => GET.wrapper(`${ROOT_URL}/current/terms`);

    export const acceptTermsForCurrentUser = (): Promise<void> => PATCH.wrapper(`${ROOT_URL}/current/terms/accept`, {});

    export const updateNameOfCurrentUser = (firstName: string, lastName: string): Promise<void> => PATCH.wrapper(`${ROOT_URL}/current/name`, { firstName, lastName });

    export interface ContactInformation {
        homePhone?: string;
        mobilePhone?: string;
        mailingAddress: {
            street?: string;
            street2?: string;
            city?: string;
            state?: string;
            zipcode?: string;
        }
    }

    export const getContactInformationForCurrentUser = (): Promise<ContactInformation> => GET.wrapper(`${ROOT_URL}/current/contact-information`);

    export const updateContactInformationForCurrentUser = (contactInfo: ContactInformation): Promise<void> => PATCH.wrapper(`${ROOT_URL}/current/contact-information`, contactInfo);

    export const updateName = (id: number | string, firstName: string, lastName: string): Promise<void> => PATCH.wrapper(`${ROOT_URL}/${id}/name`, { firstName, lastName });
}
