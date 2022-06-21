import { DirectoryPropertyWithOccupants } from '.'
import { StateRecord } from '../../../Types'

export interface DirectoryState {
    properties: StateRecord<DirectoryPropertyWithOccupants>;
}