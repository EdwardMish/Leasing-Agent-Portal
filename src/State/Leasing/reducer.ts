import { LoadStatus } from '../../Types';
import { LeasingActions, LeasingActionTypes } from './actions';
import { LeasingState } from './Types/LeasingState';

export const initialState: LeasingState = {
    application: undefined,
    loadStatus: LoadStatus.INITIAL_STATE,
    pause: false,
};

export function leasingReducer(state: LeasingState = initialState, action: LeasingActionTypes): LeasingState {
    switch (action.type) {
        case LeasingActions.SET_LOADING_APPLICATION: {
            return {
                ...state,
                loadStatus: LoadStatus.PENDING,
            };
        }
        case LeasingActions.SET_LOAD_APPLICATION: {
            return {
                ...state,
                application: action.payload,
                loadStatus: LoadStatus.LOADED,
            };
        }
        case LeasingActions.SET_PAUSE_APPLICATION: {
            return {
                ...state,
                pause: true,
            };
        }
        case LeasingActions.SET_START_APPLICATION: {
            if (!state.application) throw new Error('Unable to set start date when application is undefined.');

            return {
                ...state,
                application: {
                    ...state.application,
                    started: true,
                },
            };
        }
        case LeasingActions.SET_APPLICATION_PERSONAL_INFORMATION: {
            if (!state.application) throw new Error('Unable to set personal information when application is undefined.');

            return {
                ...state,
                application: {
                    ...state.application,
                    personalInformation: action.payload,
                },
            };
        }
        case LeasingActions.SET_APPLICATION_ADDRESS: {
            if (!state.application) throw new Error('Unable to set address when application is undefined.');

            return {
                ...state,
                application: {
                    ...state.application,
                    address: action.payload,
                },
            };
        }
        case LeasingActions.SET_APPLICATION_IDENTIFICATION: {
            if (!state.application) throw new Error('Unable to set Identification when application is undefined.');
            return {
                ...state,
                application: {
                    ...state.application,
                    identification: action.payload,
                },
            };
        }

        default: {
            return state;
        }
    }
}
