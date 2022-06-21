import { Request, RequestState, Category } from './Types';
import { RequestActions, RequestActionTypes } from './actions';
import { LoadStatus } from '../../Types';

const initialState: RequestState = {
    categories: {
        loadStatus: LoadStatus.INITIAL_STATE,
    },
    requestHistory: {},
    requestNotes: {},
    requests: {
        loadStatus: LoadStatus.INITIAL_STATE,
    },
    pendingAttachments: {},
};

export function requestsReducer(state: RequestState = initialState, action: RequestActionTypes): RequestState {
    switch (action.type) {
        case RequestActions.LOAD_REQUESTS:
            return {
                ...state,
                requests: {
                    loadStatus: LoadStatus.PENDING,
                },
            };
        case RequestActions.SET_REQUESTS:
            return {
                ...state,
                requests: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce(
                        (agg, curr: Request) => ({
                            ...agg,
                            [`${curr.id}`]: curr,
                        }),
                        {}
                    ),
                },
            };
        case RequestActions.ADD_REQUEST:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: action.payload,
                },
            };
        case RequestActions.LOAD_CATEGORIES:
            return {
                ...state,
                categories: {
                    loadStatus: LoadStatus.PENDING,
                },
            };
        case RequestActions.SET_CATEGORIES:
            return {
                ...state,
                categories: {
                    loadStatus: LoadStatus.LOADED,
                    ...action.payload.reduce(
                        (agg, curr: Category) => ({
                            ...agg,
                            [`${curr.id}`]: curr,
                        }),
                        {}
                    ),
                },
            };
        case RequestActions.UPDATE_CATEGORY:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: {
                        ...state.requests[action.payload.id],
                        category: action.payload.category,
                    },
                },
            };
        case RequestActions.UPDATE_SUBCATEGORY:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: {
                        ...state.requests[action.payload.id],
                        subcategory: action.payload.subcategory,
                    },
                },
            };
        case RequestActions.UPDATE_STATUS:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: {
                        ...state.requests[action.payload.id],
                        status: action.payload.status,
                    },
                },
            };
        case RequestActions.UPDATE_PRIORITY:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: {
                        ...state.requests[action.payload.id],
                        priority: action.payload.priority,
                    },
                },
            };
        case RequestActions.ASSIGN_USER:
            return {
                ...state,
                requests: {
                    ...state.requests,
                    [action.payload.id]: {
                        ...state.requests[action.payload.id],
                        assignedTo: action.payload.user,
                    },
                },
            };
        case RequestActions.SET_HISTORY:
            return {
                ...state,
                requestHistory: {
                    ...state.requestHistory,
                    [action.payload.id]: action.payload.history,
                },
            };
        case RequestActions.SET_NOTES:
            return {
                ...state,
                requestNotes: {
                    ...state.requestNotes,
                    [action.payload.id]: action.payload.notes,
                },
            };
        case RequestActions.ADD_NOTE:
            return {
                ...state,
                requestNotes: {
                    ...state.requestNotes,
                    [action.payload.id]: [...state.requestNotes[action.payload.id], action.payload.note],
                },
            };
        case RequestActions.ADD_PENDING_ATTACHMENTS:
            return {
                ...state,
                pendingAttachments: {
                    ...state.pendingAttachments,
                    [action.payload.id]: action.payload.files,
                },
            };
        case RequestActions.CLEAR_PENDING_ATTACHMENTS:
            const { [action.payload]: cpaClearing, ...cpaRest } = state.pendingAttachments;

            return {
                ...state,
                pendingAttachments: {
                    ...cpaRest,
                },
            };
        default:
            return state;
    }
}
