import { PropertyWithOccupants } from '../Shared/Types/PropertyWithOccupants'

export enum PropertyTenantResolutionActions {
    LOAD_PROPERTY_TENANT_LIST = 'LOAD_PROPERTY_TENANT_LIST',
    SET_PROPERTY_TENANT_LIST = 'SET_PROPERTY_TENANT_LIST',
}

interface LoadPropertyTenantResolution {
    type: typeof PropertyTenantResolutionActions.LOAD_PROPERTY_TENANT_LIST;
}

interface SetPropertyTenantResolution {
    type: typeof PropertyTenantResolutionActions.SET_PROPERTY_TENANT_LIST;
    payload: PropertyWithOccupants[];
}

export type PropertyTenantResolutionActionTypes =
    LoadPropertyTenantResolution
    | SetPropertyTenantResolution