import { DocumentPropertyWithOccupants } from '.'
import { StateRecord } from '../../../Types'

export interface DocumentState {
    properties: StateRecord<DocumentPropertyWithOccupants>;
}