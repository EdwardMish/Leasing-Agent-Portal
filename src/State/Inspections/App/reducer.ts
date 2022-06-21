import { LoadStatus } from '../../../Types';
import { Note } from '../Types/Note';
import { Photo } from '../Types/Photo';

import { InspectionsApplicationActions, InspectionsApplicationActionTypes } from './actions';

import ActiveInspectionStatus from './Types/ActiveInspectionStatus';
import { InspectionsApplicationState } from './Types/InspectionsApplicationState';
import { activeInteractionInitialState, Interaction } from './Types/Interaction';

const initialState: InspectionsApplicationState = {
    activeInspection: {
        id: 0,
        propertyId: 0,
        status: ActiveInspectionStatus.null,
        sortOrder: [],
        notes: {},
        interactions: {},
        activeInteraction: activeInteractionInitialState,
        pendingUploads: [],
        photos: {
            sortOrder: [],
        },
        uploading: false,
    },
    properties: {
        loadStatus: LoadStatus.INITIAL_STATE,
        sortOrder: [],
    },
};

export default function inspectionsAppReducer(
    state: InspectionsApplicationState = initialState,
    action: InspectionsApplicationActionTypes
): InspectionsApplicationState {
    switch (action.type) {
        case InspectionsApplicationActions.LOAD_PROPERTIES: {
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.PENDING,
                    sortOrder: [],
                },
            };
        }
        case InspectionsApplicationActions.SET_PROPERTIES: {
            return {
                ...state,
                properties: {
                    loadStatus: LoadStatus.LOADED,
                    sortOrder: action.payload.map(({ propertyId }) => propertyId),
                    ...action.payload.reduce(
                        (agg, curr) => ({
                            ...agg,
                            [curr.propertyId]: curr,
                        }),
                        {}
                    ),
                },
            };
        }
        case InspectionsApplicationActions.REMOVE_DRAFT_FROM_PROPERTY: {
            return {
                ...state,
                properties: {
                    ...state.properties,
                    [action.payload]: {
                        ...state.properties[action.payload],
                        inspectionDraftId: undefined,
                    },
                },
            };
        }
        case InspectionsApplicationActions.SET_ACTIVE_INSPECTION: {
            const propertyExists = Object.prototype.hasOwnProperty.call(state.properties, action.payload.propertyId);

            return {
                ...state,
                activeInspection: {
                    ...action.payload,
                },
                properties: propertyExists
                    ? {
                          ...state.properties,
                          [`${action.payload.propertyId}`]: {
                              ...state.properties[action.payload.propertyId],
                              inspectionDraftId: action.payload.id,
                          },
                      }
                    : state.properties,
            };
        }
        case InspectionsApplicationActions.RESET_ACTIVE_INSPECTION: {
            return {
                ...state,
                activeInspection: {
                    ...initialState.activeInspection,
                },
            };
        }
        case InspectionsApplicationActions.ADD_NOTE: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    notes: {
                        ...state.activeInspection.notes,
                        [action.payload.id]: action.payload,
                    },
                    sortOrder: [...state.activeInspection.sortOrder, action.payload.id],
                },
            };
        }
        case InspectionsApplicationActions.UPDATE_NOTE: {
            const interaction: Interaction | undefined = Object.values(state.activeInspection.interactions).find((i) =>
                i.notes.some((n) => n.id === action.payload.id)
            );

            if (Object.prototype.hasOwnProperty.call(state.activeInspection.notes, action.payload.id)) {
                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        notes: {
                            ...state.activeInspection.notes,
                            [action.payload.id]: {
                                ...state.activeInspection.notes[action.payload.id],
                                note: action.payload.note,
                                categoryId: action.payload.categoryId,
                                followUp: action.payload.followUp,
                            },
                        },
                    },
                };
            }
            if (interaction) {
                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        interactions: {
                            ...state.activeInspection.interactions,
                            [interaction.id]: {
                                ...state.activeInspection.interactions[interaction.id],
                                notes: [
                                    ...state.activeInspection.interactions[interaction.id].notes.reduce((agg, curr) => {
                                        if (curr.id === action.payload.id) {
                                            return [
                                                ...agg,
                                                {
                                                    ...curr,
                                                    ...action.payload,
                                                },
                                            ];
                                        }
                                        return [...agg, curr];
                                    }, []),
                                ],
                            },
                        },
                    },
                };
            }

            return state;
        }
        case InspectionsApplicationActions.DELETE_NOTE: {
            const interaction: Interaction | undefined = Object.values(state.activeInspection.interactions).find((i) =>
                i.notes.some((n) => n.id === action.payload)
            );

            if (Object.prototype.hasOwnProperty.call(state.activeInspection.notes, action.payload)) {
                const {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    [action.payload]: target,
                    ...rest
                } = state.activeInspection.notes;

                const sortOrder = state.activeInspection.sortOrder.filter((_) => _ !== action.payload);

                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        notes: {
                            ...rest,
                        },
                        sortOrder,
                    },
                };
            } else if (interaction) {
                const noteIndex = interaction.notes.findIndex((n: Note) => n.id === action.payload);

                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        interactions: {
                            ...state.activeInspection.interactions,
                            [interaction.id]: {
                                ...state.activeInspection.interactions[interaction.id],
                                notes: [...interaction.notes.slice(0, noteIndex), ...interaction.notes.slice(noteIndex + 1)],
                            },
                        },
                    },
                };
            }

            return state;
        }
        case InspectionsApplicationActions.ADD_PHOTO: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    sortOrder: [...state.activeInspection.sortOrder, action.payload.id],
                    photos: {
                        ...state.activeInspection.photos,
                        [action.payload.id]: action.payload,
                        sortOrder: [...state.activeInspection.photos.sortOrder, action.payload.id],
                    },
                },
            };
        }
        case InspectionsApplicationActions.UPDATE_PHOTO: {
            const interaction: Interaction | undefined = Object.values(state.activeInspection.interactions).find((i) =>
                i.photos.some((n) => n.id === action.payload.id)
            );

            if (Object.prototype.hasOwnProperty.call(state.activeInspection.photos, action.payload.id)) {
                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        photos: {
                            ...state.activeInspection.photos,
                            [action.payload.id]: {
                                ...state.activeInspection.photos[action.payload.id],
                                note: action.payload.note,
                                categoryId: action.payload.categoryId,
                                followUp: action.payload.followUp,
                            },
                        },
                    },
                };
            }
            if (interaction) {
                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        interactions: {
                            ...state.activeInspection.interactions,
                            [interaction.id]: {
                                ...state.activeInspection.interactions[interaction.id],
                                photos: [
                                    ...state.activeInspection.interactions[interaction.id].photos.reduce((agg, curr) => {
                                        if (curr.id === action.payload.id) {
                                            return [
                                                ...agg,
                                                {
                                                    ...curr,
                                                    ...action.payload,
                                                },
                                            ];
                                        }
                                        return [...agg, curr];
                                    }, []),
                                ],
                            },
                        },
                    },
                };
            }

            return state;
        }
        case InspectionsApplicationActions.DELETE_PHOTO: {
            const interaction: Interaction | undefined = Object.values(state.activeInspection.interactions).find((i) =>
                i.photos.some((n) => n.id === action.payload)
            );

            if (Object.prototype.hasOwnProperty.call(state.activeInspection.photos, action.payload)) {
                const {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    [action.payload]: ignore,
                    sortOrder,
                    ...rest
                } = state.activeInspection.photos;

                const index = sortOrder.findIndex((id) => id === action.payload);

                const aiSortOrder = state.activeInspection.sortOrder.filter((id: number) => id !== action.payload);

                if (index < 0) return state;

                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        sortOrder: aiSortOrder,
                        photos: {
                            ...rest,
                            sortOrder: [
                                ...state.activeInspection.photos.sortOrder.slice(0, index),
                                ...state.activeInspection.photos.sortOrder.slice(index + 1),
                            ],
                        },
                    },
                };
            } else if (interaction) {
                const photoIndex = interaction.photos.findIndex((photo) => photo.id === action.payload);

                if (photoIndex < 0) return state;

                return {
                    ...state,
                    activeInspection: {
                        ...state.activeInspection,
                        interactions: {
                            ...state.activeInspection.interactions,
                            [interaction.id]: {
                                ...state.activeInspection.interactions[interaction.id],
                                photos: [
                                    ...state.activeInspection.interactions[interaction.id].photos.slice(0, photoIndex),
                                    ...state.activeInspection.interactions[interaction.id].photos.slice(photoIndex + 1),
                                ],
                            },
                        },
                    },
                };
            }

            return state;
        }
        case InspectionsApplicationActions.ADD_PENDING_PHOTOS: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    pendingUploads: [...state.activeInspection.pendingUploads, ...action.payload],
                },
            };
        }
        case InspectionsApplicationActions.ADD_INTERACTION: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    interactions: {
                        ...state.activeInspection.interactions,
                        [action.payload.id]: action.payload,
                    },
                },
            };
        }
        case InspectionsApplicationActions.DELETE_INTERACTION: {
            const {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                [action.payload]: ignore,
                ...remainingInteractions
            } = state.activeInspection.interactions;

            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    interactions: {
                        ...remainingInteractions,
                    },
                },
            };
        }
        case InspectionsApplicationActions.INTERACTION_ADD_NOTE: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    interactions: {
                        ...state.activeInspection.interactions,
                        [action.payload.interactionId]: {
                            ...state.activeInspection.interactions[action.payload.interactionId],
                            notes: [
                                ...state.activeInspection.interactions[action.payload.interactionId].notes,
                                action.payload.note,
                            ],
                        },
                    },
                },
            };
        }
        case InspectionsApplicationActions.INTERACTION_ADD_PHOTO: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    interactions: {
                        ...state.activeInspection.interactions,
                        [action.payload.interactionId]: {
                            ...state.activeInspection.interactions[action.payload.interactionId],
                            photos: [
                                ...state.activeInspection.interactions[action.payload.interactionId].photos,
                                action.payload.photo,
                            ],
                        },
                    },
                },
            };
        }
        case InspectionsApplicationActions.SET_ACTIVE_INTERACTION: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: action.payload,
                },
            };
        }
        case InspectionsApplicationActions.RESET_ACTIVE_INTERACTION: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: initialState.activeInspection.activeInteraction,
                    pendingUploads: [
                        ...state.activeInspection.pendingUploads.filter((photo: Photo) => photo.interactionId == null),
                    ],
                },
            };
        }
        case InspectionsApplicationActions.ACTIVE_INTERACTION_SET_OCCUPANT: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: {
                        ...state.activeInspection.activeInteraction,
                        occupantId: action.payload,
                    },
                },
            };
        }
        case InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_NOTE: {
            if (!state.activeInspection.activeInteraction) return state;

            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: {
                        ...state.activeInspection.activeInteraction,
                        notes: [
                            ...state.activeInspection.activeInteraction.notes,
                            {
                                ...action.payload,
                                id: Date.now(),
                            },
                        ],
                    },
                },
            };
        }
        case InspectionsApplicationActions.ACTIVE_INTERACTION_UPDATE_NOTE: {
            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: {
                        ...state.activeInspection.activeInteraction,
                        notes: state.activeInspection.activeInteraction?.notes.map((note) => {
                            if (note.id === action.payload.id) {
                                return action.payload;
                            }
                            return note;
                        }),
                    },
                },
            };
        }
        case InspectionsApplicationActions.ACTIVE_INTERACTION_ADD_PHOTO: {
            if (!state.activeInspection.activeInteraction) return state;

            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    activeInteraction: {
                        ...state.activeInspection.activeInteraction,
                        photos: [
                            ...state.activeInspection.activeInteraction.photos,
                            {
                                ...action.payload,
                                id: Date.now(),
                            },
                        ],
                    },
                },
            };
        }
        case InspectionsApplicationActions.REMOVE_PENDING_PHOTO: {
            const index = state.activeInspection.pendingUploads.findIndex(({ id }) => id === action.payload);

            if (index < 0) return state;

            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    pendingUploads: [
                        ...state.activeInspection.pendingUploads.slice(0, index),
                        ...state.activeInspection.pendingUploads.slice(index + 1),
                    ],
                },
            };
        }
        case InspectionsApplicationActions.UPDATE_UPLOADING_STATUS: {
            const uploading = action.payload;

            return {
                ...state,
                activeInspection: {
                    ...state.activeInspection,
                    uploading: uploading,
                },
            };
        }
        default:
            return {
                ...state,
            };
    }
}
