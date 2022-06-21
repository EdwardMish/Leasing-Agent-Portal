import { Space } from '../Shared/Types/Space';

export enum SpaceActions {
    ADD_SPACE = 'ADD_SPACE',
    ADD_SPACES = 'ADD_SPACES',
    ADD_SPACE_OCCUPANTS = 'ADD_SPACE_OCCUPANTS',
}

interface AddSpaceAction {
    type: typeof SpaceActions.ADD_SPACE;
    payload: Space;
}

interface AddSpacesAction {
    type: typeof SpaceActions.ADD_SPACES;
    payload: Space[];
}

interface AddSpaceOccupantsAction {
    type: typeof SpaceActions.ADD_SPACE_OCCUPANTS;
    payload: {
        spaceId: number | string;
        occupants: number[];
    }
}

export type SpaceActionTypes = AddSpaceAction
    | AddSpacesAction
    | AddSpaceOccupantsAction