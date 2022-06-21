import { Address, PersonalInformation, IdentificationType } from './Types';
import { LeasingApplication } from './Types/LeasingApplication';

export enum LeasingActions {
    SET_LOADING_APPLICATION = 'LEASING_SET_LOADING_APPLICATION',
    SET_LOAD_APPLICATION = 'LEASING_SET_LOAD_APPLICATION',
    SET_PAUSE_APPLICATION = 'LEASING_SET_PAUSE_APPLICATION',
    SET_START_APPLICATION = 'LEASING_SET_START_APPLICATION',
    SET_APPLICATION_PERSONAL_INFORMATION = 'LEASING_APPLICATION_SET_PERSONAL_INFORMATION',
    SET_APPLICATION_ADDRESS = 'LEASING_APPLICATION_SET_ADDRESS',
    SET_APPLICATION_IDENTIFICATION = 'LEASING_SET_IDENTIFICATION',
}

interface SetIdentificationAction {
    type: LeasingActions.SET_APPLICATION_IDENTIFICATION;
    payload: IdentificationType;
}

interface LeasingLoadingApplicationAction {
    type: LeasingActions.SET_LOADING_APPLICATION;
}

interface LeasingLoadApplicationAction {
    type: LeasingActions.SET_LOAD_APPLICATION;
    payload: LeasingApplication;
}

interface LeasingPauseApplicationAction {
    type: LeasingActions.SET_PAUSE_APPLICATION;
}

interface LeasingStartApplicationAction {
    type: LeasingActions.SET_START_APPLICATION;
}

interface LeasingApplicationSetPersonalInformationAction {
    type: LeasingActions.SET_APPLICATION_PERSONAL_INFORMATION;
    payload: PersonalInformation;
}

interface LeasingApplicationSetAddressAction {
    type: LeasingActions.SET_APPLICATION_ADDRESS;
    payload: Address;
}

export type LeasingActionTypes =
    | LeasingLoadingApplicationAction
    | LeasingLoadApplicationAction
    | LeasingPauseApplicationAction
    | LeasingStartApplicationAction
    | LeasingApplicationSetPersonalInformationAction
    | LeasingApplicationSetAddressAction
    | SetIdentificationAction;
