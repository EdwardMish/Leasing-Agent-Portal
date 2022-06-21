import { Occupant } from './Types/Occupant'

export enum OccupantActions {
    ADD_OCCUPANT = 'OCCUPANTS_ADD_OCCUPANT',
    ADD_OCCUPANTS = 'OCCUPANTS_ADD_OCCUPANTS'
}

interface AddOccupantAction {
    type: typeof OccupantActions.ADD_OCCUPANT;
    payload: Occupant;
}

interface AddOccupantsAction {
    type: typeof OccupantActions.ADD_OCCUPANTS;
    payload: Occupant[];
}

export type OccupantActionTypes =
    AddOccupantAction
    | AddOccupantsAction