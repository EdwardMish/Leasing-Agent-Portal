import { IdentificationDocumentType } from 'API/Leasing/Types/IdentificationDocumentType';
import { StartPersonalApplicationResponse } from 'API/Leasing/Types/StartPersonalApplicationResponse';
import PATCH from 'API/utils/PATCH';

export interface startPersonalLeaseApplicationBody {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    socialSecurityNumber: string;
    dateOfBirth: string;
    street: string;
    street2?: string;
    city: string;
    state: string;
    zipcode: string;
    identificationDocumentType: IdentificationDocumentType;
    identificationDocumentNumber: string;
    identificationDocumentExpiration: string;
    identificationDocumentImages: File[];
    identificationDocumentState: string;
}

const startPersonalLeaseApplication = (
    personalLeaseApplicationId: number,
    personalLeaseApplication: startPersonalLeaseApplicationBody,
): Promise<StartPersonalApplicationResponse> =>
    PATCH.patchFormData<startPersonalLeaseApplicationBody, StartPersonalApplicationResponse>(
        `${API_ROOT}/leasing/personal-applications/${personalLeaseApplicationId}`,
        personalLeaseApplication,
    );

export default startPersonalLeaseApplication;
