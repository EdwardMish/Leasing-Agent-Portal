import { StateRecord } from '../../../Types'
import { Property } from '../../Shared/Types'

export interface PropertyState {
    properties: StateRecord<Property>;
    sortOrder: number[];
    propertyOccupants: Record<number, number[]>;
    propertySpaces: Record<number, number[]>;
}