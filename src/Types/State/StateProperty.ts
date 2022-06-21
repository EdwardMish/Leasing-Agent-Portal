import { PropertySelectState } from './PropertySelectState';

export interface StateProperty {
    name: string;
    id: number;
    propertySelected: boolean;
    isViewable: boolean;
    occupants: {
        name: string;
        id: number;
    }[];
    selectedOccupants: number[];
    occupantSearchList: number[];
    selectState: PropertySelectState;
}

export interface StatePropertySet {
    [propertyId: number]: StateProperty
}
