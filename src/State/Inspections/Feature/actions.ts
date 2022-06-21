import { InspectionComment } from '../Types/InspectionComment';
import { Inspection } from '../Types/Inspection';

export enum InspectionsFeatureActions {
    ADD_INSPECTION = 'INSPECTIONS_FEATURE_ADD_INSPECTION',
    DELETE_INSPECTION = 'INSPECTIONS_FEATURE_DELETE_INSPECTION',
    ADD_COMMENT = 'INSPECTIONS_FEATURE_ADD_COMMENT',
}

interface AddInspectionAction {
    type: typeof InspectionsFeatureActions.ADD_INSPECTION;
    payload: Inspection;
}

interface DeleteInspectionAction {
    type: typeof InspectionsFeatureActions.DELETE_INSPECTION;
    payload: number | string;
}

interface AddCommentInspectionAction {
    type: typeof InspectionsFeatureActions.ADD_COMMENT;
    payload: {
        inspectionId: number | string,
        comment: InspectionComment;
    }
}

export type InspectionsFeatureActionTypes = AddInspectionAction
    | DeleteInspectionAction
    | AddCommentInspectionAction
