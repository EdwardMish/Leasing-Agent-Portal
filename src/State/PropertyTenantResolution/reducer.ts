import { PropertyTenantResolutionState } from './Types/PropertyTenantResolutionState'

import { PropertyTenantResolutionActions, PropertyTenantResolutionActionTypes } from './actions'
import { LoadStatus } from '../../Types';

export const initialState: PropertyTenantResolutionState = {
    loadStatus: LoadStatus.INITIAL_STATE,
    sortOrder: []
}

export function propertyTenantResolutionReducer(state: PropertyTenantResolutionState = initialState, action: PropertyTenantResolutionActionTypes): PropertyTenantResolutionState {
    switch (action.type) {
        case PropertyTenantResolutionActions.LOAD_PROPERTY_TENANT_LIST:
            return {
                ...state,
                loadStatus: LoadStatus.PENDING
            }
        case PropertyTenantResolutionActions.SET_PROPERTY_TENANT_LIST:
            return {
                ...state,
                loadStatus: LoadStatus.LOADED,
                ...action.payload.reduce((agg, curr) => ({
                    ...agg,
                    [curr.id]: curr
                }), {}),
                sortOrder: action.payload.map((p) => p.id)
            }
        default:
            return state;
    }
}