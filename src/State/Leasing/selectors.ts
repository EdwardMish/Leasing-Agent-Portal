import { createSelector } from 'reselect';
import { LoadStatus, State } from '../../Types';
import { Address, IdentificationType, PersonalInformation } from './Types';
import { LeasingApplication } from './Types/LeasingApplication';

const leasingState = ({ leasing }: State) => leasing;

export const applicationLoadStatus = createSelector(leasingState, ({ loadStatus }): LoadStatus => loadStatus);

export const leasingApplication = createSelector(
    leasingState,
    ({ application }): LeasingApplication | undefined => application
);

export const isApplicationStarted = createSelector(
    leasingState,
    ({ application }): boolean => !!application && application.started
);

export const isApplicationPaused = createSelector(leasingState, ({ pause }): boolean => pause === true);

// Beginning Steps of Application
//   Personal Info, Address, Identity

export const personalInformation = createSelector(leasingState, ({ application }): PersonalInformation | undefined =>
    !!application ? application.personalInformation : undefined
);

export const address = createSelector(leasingState, ({ application }): Address | undefined =>
    !!application ? application.address : undefined
);

export const identification = createSelector(
    leasingState,
    ({ application }): IdentificationType | undefined => application?.identification
);

export default {
    applicationLoadStatus,
    isApplicationStarted,
    isApplicationPaused,
    leasingApplication,
    personalInformation,
    address,
    identification,
};
