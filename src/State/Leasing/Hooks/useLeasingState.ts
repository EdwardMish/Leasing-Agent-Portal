import { API as LeasingAPI } from 'API/Leasing';
import { startPersonalLeaseApplicationBody } from 'API/Leasing/API/startPersonalApplication';
import { StartPersonalApplicationResponse } from 'API/Leasing/Types';
import { IdentificationDocumentType } from 'API/Leasing/Types/IdentificationDocumentType';
import { useDispatch, useSelector } from 'react-redux';
import { LeasingActions, LeasingActionTypes } from 'State/Leasing/actions';
import selectors from 'State/Leasing/selectors';
import { LoadStatus } from 'Types';
import { convertURLBlobToFile } from 'utils';
import { Address, IdentificationType, LeasingApplication, PersonalInformation } from '../Types';

type UseLeasingStateHookReturnProperties = () => {
    isLoaded: boolean;
    hasActiveApplication: boolean;
    applicationId?: number;

    isApplicationStarted: boolean;

    pauseActiveApplication: () => void;
    isApplicationPaused: boolean;

    personalInformation?: PersonalInformation;
    setPersonalInformation: (personalInformation: PersonalInformation) => void;
    address: Address;
    setAddress: (address: Address) => void;
    identification: IdentificationType;
    setIdentification: (ident: IdentificationType) => void;

    startApplication: () => Promise<StartPersonalApplicationResponse>;
};

const useLeasingState: UseLeasingStateHookReturnProperties = () => {
    const dispatch = useDispatch();

    const applicationLoadStatus: LoadStatus = useSelector(selectors.applicationLoadStatus);
    const activeApplication: LeasingApplication | undefined = useSelector(selectors.leasingApplication);

    const personalInformation = useSelector(selectors.personalInformation);
    const address = useSelector(selectors.address);
    const identification = useSelector(selectors.identification);

    const isApplicationStarted = useSelector(selectors.isApplicationStarted);
    const isApplicationPaused = useSelector(selectors.isApplicationPaused);

    const pauseActiveApplication = () => {
        dispatch({
            type: LeasingActions.SET_PAUSE_APPLICATION,
        } as LeasingActionTypes);
    };

    // Personal Information
    const setPersonalInformation = (personalInformation: PersonalInformation) => {
        dispatch({
            type: LeasingActions.SET_APPLICATION_PERSONAL_INFORMATION,
            payload: personalInformation,
        });
    };

    const setAddress = (address: Address) => {
        dispatch({
            type: LeasingActions.SET_APPLICATION_ADDRESS,
            payload: address,
        });
    };

    const setIdentification = (ident: IdentificationType): void => {
        dispatch({
            type: LeasingActions.SET_APPLICATION_IDENTIFICATION,
            payload: ident,
        });
    };

    const formatApplicationData = async (): Promise<startPersonalLeaseApplicationBody> => {
        const identificationImages: File[] = [];

        if (identification.passportNumber) {
            const imagePassportId = await convertURLBlobToFile(identification.uploadPassportId);

            identificationImages.push(imagePassportId);
        } else {
            const imageIdFront = await convertURLBlobToFile(identification.uploadIdFront);
            identificationImages.push(imageIdFront);

            if (identification.uploadIdBack) {
                const imageIdBack = await convertURLBlobToFile(identification.uploadIdBack);
                identificationImages.push(imageIdBack);
            }
        }

        return {
            firstName: personalInformation?.firstName,
            lastName: personalInformation?.lastName,
            phoneNumber: personalInformation?.phone.replace(/\D/g, ''),
            socialSecurityNumber: personalInformation?.socialSecurityNumber.replace(/\D/g, ''),
            dateOfBirth: personalInformation?.dateOfBirth,
            street: address?.street,
            street2: address?.street2,
            city: address?.city,
            state: address?.state,
            zipcode: address?.zip,
            identificationDocumentExpiration: identification?.passportNumber
                ? identification?.passportExpirationDate
                : identification?.stateIdExpirationDate,
            ...(!identification.passportNumber ? { identificationDocumentState: identification.stateOfIssue } : {}), // only have this property if identification type is state id
            identificationDocumentType: identification?.passportNumber
                ? IdentificationDocumentType.Passport
                : IdentificationDocumentType.StateIdentification,
            identificationDocumentImages: identificationImages,
            identificationDocumentNumber: identification?.passportNumber ?? identification?.identificationNumber,
        } as startPersonalLeaseApplicationBody;
    };

    const startApplication = async (): Promise<StartPersonalApplicationResponse> => {
        if (!activeApplication) throw new Error('Unable to start application with an undefined application');

        const applicationData = await formatApplicationData();

        const response = await LeasingAPI.startPersonalLeaseApplication(
            activeApplication.id,
            applicationData as startPersonalLeaseApplicationBody,
        );

        if (response.creditCheckSuccessful === false) {
            return response;
        }

        return response;
    };

    return {
        isLoaded: applicationLoadStatus === LoadStatus.LOADED,
        hasActiveApplication: activeApplication != null,
        applicationId: activeApplication?.id,
        isApplicationStarted,
        pauseActiveApplication,
        isApplicationPaused,
        personalInformation,
        setPersonalInformation,
        address,
        setAddress,
        identification,
        setIdentification,
        startApplication,
    };
};

export default useLeasingState;
