import { Occupant } from './Occupant'

export interface OccupantState {
    occupants: Record<number, Occupant>;
}