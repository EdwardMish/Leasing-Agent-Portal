import { InspectionsFeatureActions, InspectionsFeatureActionTypes } from './actions';
import { InspectionsFeatureState } from './Types/InspectionsFeatureState';

const initialState: InspectionsFeatureState = {};

export default function inspectionsFeatureReducer(
    state: InspectionsFeatureState = initialState,
    action: InspectionsFeatureActionTypes
): InspectionsFeatureState {
    switch (action.type) {
        case InspectionsFeatureActions.ADD_INSPECTION: {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        }
        case InspectionsFeatureActions.DELETE_INSPECTION: {
            if (!Object.prototype.hasOwnProperty.call(state, action.payload)) return state;

            // Destructure the inspection we're removing in order to get the remaining records.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [action.payload]: _, ...remainingInspections } = state;

            return {
                ...remainingInspections,
            };
        }
        case InspectionsFeatureActions.ADD_COMMENT: {
            if (!Object.prototype.hasOwnProperty.call(state, action.payload.inspectionId)) return state;

            return {
                ...state,
                [action.payload.inspectionId]: {
                    ...state[action.payload.inspectionId],
                    comments: [...state[action.payload.inspectionId].comments, action.payload.comment],
                },
            };
        }
        default:
            return state;
    }
}
