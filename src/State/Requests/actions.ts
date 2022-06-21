import { RequestPriority, RequestStatus } from '../../Types'
import { Category, Request, RequestHistory, RequestNote, RequestUserSummary, Subcategory } from './Types'

export enum RequestActions {
    LOAD_REQUESTS = 'REQUESTS_LOAD_REQUESTS',
    SET_REQUESTS = 'REQUESTS_SET_REQUESTS',
    ADD_REQUEST = 'REQUESTS_ADD_REQUEST',
    LOAD_CATEGORIES = 'REQUESTS_LOAD_CATEGORIES',
    SET_CATEGORIES = 'REQUESTS_SET_CATEGORIES',
    UPDATE_CATEGORY = 'REQUESTS_UPDATE_CATEGORY',
    UPDATE_SUBCATEGORY = 'REQUESTS_UPDATE_SUBCATEGORY',
    UPDATE_STATUS = 'REQUESTS_UPDATE_STATUS',
    UPDATE_PRIORITY = 'REQUESTS_UPDATE_PRIORITY',
    ASSIGN_USER = 'ASSIGN_USER',
    SET_HISTORY = 'REQUESTS_SET_HISTORY',
    SET_NOTES = 'REQUESTS_SET_NOTES',
    ADD_NOTE = 'REQUESTS_ADD_NOTE',
    ADD_PENDING_ATTACHMENTS = 'REQUESTS_ADD_PENDING_ATTACHMENTS',
    CLEAR_PENDING_ATTACHMENTS = 'REQUESTS_CLEAR_PENDING_ATTACHMENTS',
}

type RequestId = number;

interface LoadRequestAction {
    type: typeof RequestActions.LOAD_REQUESTS;
}

interface SetRequestsAction {
    type: typeof RequestActions.SET_REQUESTS;
    payload: Request[];
}

interface AddRequestAction {
    type: typeof RequestActions.ADD_REQUEST;
    payload: Request;
}

interface LoadCategoriesAction {
    type: typeof RequestActions.LOAD_CATEGORIES;
}

interface SetCategoriesAction {
    type: typeof RequestActions.SET_CATEGORIES;
    payload: Category[];
}

interface UpdateCategoryAction {
    type: typeof RequestActions.UPDATE_CATEGORY;
    payload: {
        id: RequestId,
        category: Category
    }
}

interface UpdateSubcategoryAction {
    type: typeof RequestActions.UPDATE_SUBCATEGORY;
    payload: {
        id: RequestId,
        subcategory: Subcategory | null
    }
}

interface UpdateStatusAction {
    type: typeof RequestActions.UPDATE_STATUS;
    payload: {
        id: RequestId,
        status: RequestStatus
    }
}

interface UpdatePriorityAction {
    type: typeof RequestActions.UPDATE_PRIORITY;
    payload: {
        id: RequestId,
        priority: RequestPriority
    }
}

interface AssignUserAction {
    type: typeof RequestActions.ASSIGN_USER;
    payload: {
        id: RequestId,
        user: RequestUserSummary | null
    }
}

interface SetHistoryAction {
    type: typeof RequestActions.SET_HISTORY;
    payload: {
        id: RequestId;
        history: RequestHistory[];
    }
}

interface SetNotesAction {
    type: typeof RequestActions.SET_NOTES;
    payload: {
        id: RequestId;
        notes: RequestNote[];
    }
}

interface AddNoteAction {
    type: typeof RequestActions.ADD_NOTE;
    payload: {
        id: RequestId;
        note: RequestNote;
    }
}

interface AddPendingAttachmentsAction {
    type: typeof RequestActions.ADD_PENDING_ATTACHMENTS;
    payload: {
        id: RequestId;
        files: File[];
    }
}

interface ClearPendingAttachmentsAction {
    type: typeof RequestActions.CLEAR_PENDING_ATTACHMENTS
    payload: RequestId;
}

export type RequestActionTypes = LoadRequestAction
    | SetRequestsAction
    | AddRequestAction
    | LoadCategoriesAction
    | SetCategoriesAction
    | UpdateCategoryAction
    | UpdateSubcategoryAction
    | UpdateStatusAction
    | UpdatePriorityAction
    | AssignUserAction
    | SetHistoryAction
    | SetNotesAction
    | AddNoteAction
    | AddPendingAttachmentsAction
    | ClearPendingAttachmentsAction