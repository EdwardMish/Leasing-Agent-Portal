import { createSelector, OutputSelector } from 'reselect';
import { LoadStatus, State, StateRecord } from '../../../Types';

import { InspectionCategories } from '../Types/InspectionCategories';
import { InspectionItem } from '../Types/InspectionItem';
import { Photo } from '../Types/Photo';
import { Note } from '../Types/Note';

import { ActiveInspection } from './Types/ActiveInspection';
import ActiveInspectionStatus from './Types/ActiveInspectionStatus';
import { InspectionsApplicationState } from './Types/InspectionsApplicationState';
import { Interaction } from './Types/Interaction';
import { Property } from './Types/Property';


const inspectionsApplicationState = ({
    inspectionsApplication,
}: State): InspectionsApplicationState => inspectionsApplication;

/* Active Inspection */
const activeInspectionSlice = createSelector(
    inspectionsApplicationState,
    ({ activeInspection }: InspectionsApplicationState): ActiveInspection => activeInspection,
);

export const activeInspection = createSelector(
    activeInspectionSlice,
    (inspection: ActiveInspection): ActiveInspection => inspection,
);

export const activeInspectionItems = createSelector(
    activeInspection,
    (ai: ActiveInspection): InspectionItem[] => ai?.sortOrder?.map((id) => ai.notes[id]
        || ai.photos[id]) as InspectionItem[]
        || [],
);

export const activeInspectionStatus = createSelector(
    activeInspection,
    ({ status }: ActiveInspection): ActiveInspectionStatus => status,
);

export const activeInspectionId = createSelector(
    activeInspection,
    ({ id }: ActiveInspection): number => id,
);

export const itemsByCategory = (
    categoryId: InspectionCategories,
): OutputSelector<State, InspectionItem[], (res: InspectionItem[]
) => InspectionItem[]> => createSelector(
    activeInspectionItems,
    (items: InspectionItem[]): InspectionItem[] => items.filter((item) => `${item.categoryId}` === `${categoryId}`),
);

/* Active Inspection: Interactions */
export const interactions = createSelector(
    activeInspection,
    ({ interactions: i }: ActiveInspection): Record<number, Interaction> => i,
);

export const interactionsList = createSelector(
    interactions,
    (i: Record<number, Interaction>): Interaction[] => Object.values(i),
);

export const getInteraction = (
    interactionId: number,
): OutputSelector<
    State,
    Interaction | null,
    (res: Record<number, Interaction>
    ) => Interaction | null> => createSelector(
        interactions,
        (i: Record<number, Interaction>): Interaction | null => i[interactionId] || null,
    );

/* Active Inspection: Notes */
export const notes = createSelector(
    activeInspection,
    ({ notes: n }: ActiveInspection): Record<number, Note> => n,
);

export const notesList = createSelector(
    notes,
    (n: Record<number, Note>): Note[] => Object.values(n),
);

export const note = (
    noteId: number | string,
): OutputSelector<State, Note | null, (res: ActiveInspection
) => Note | null> => createSelector(
    activeInspection,
    (ai: ActiveInspection): Note | null => ai.notes[noteId]
        || Object.values(ai.interactions).map((i) => i.notes)
            .reduce((agg, curr) => [...agg, ...curr], []).find((n) => `${n.id}` === `${noteId}`),
);

/* Active Inspection: Photos */
const photoRecords = createSelector(
    activeInspection,
    ({ photos }): Record<number, Photo> & { sortOrder: number[] } => photos,
);

export const photosList = createSelector(
    photoRecords,
    ({ sortOrder, ...photosForList }): Photo[] => Object.values(photosForList) || [],
);

export const sortedPhotoList = createSelector(
    photoRecords,
    ({ sortOrder, ...photosForSortedList }): Photo[] => sortOrder
        .filter((id) => !!photosForSortedList[id])
        .map((id) => photosForSortedList[id]),
);

export const pendingPhotos = createSelector(
    activeInspection,
    ({ pendingUploads }: ActiveInspection): Photo[] => pendingUploads,
);

export const photo = (
    photoId: number,
): OutputSelector<State, Photo | null, (res: ActiveInspection
) => Photo | null> => createSelector(
    activeInspection,
    (ai: ActiveInspection): Photo | null => ai.photos[photoId] ||
        Object.values(ai.interactions).reduce((agg: Record<number, Photo>, curr: Interaction) => {
            return {
                ...agg,
                ...curr.photos.reduce((aggp, currp) => ({ ...aggp, [currp.id]: currp }), {})
            }
        }, {})[photoId]
);

/* Properties */
const propertiesSlice = createSelector(
    inspectionsApplicationState,
    ({ properties }: InspectionsApplicationState): StateRecord<Property> => properties,
);

const propertiesStateRecord = createSelector(
    propertiesSlice,
    (properties: StateRecord<Property>): StateRecord<Property> => properties,
);

export const propertiesArePending = createSelector(
    propertiesStateRecord,
    ({ loadStatus }: StateRecord<Property>): boolean => loadStatus === LoadStatus.PENDING,
);

export const propertiesAreLoaded = createSelector(
    propertiesStateRecord,
    ({ loadStatus }: StateRecord<Property>): boolean => loadStatus === LoadStatus.LOADED,
);

export const propertiesList = createSelector(
    propertiesStateRecord,
    ({ loadStatus, sortOrder, ...rest }: StateRecord<Property>): Property[] => sortOrder?.map((id) => rest[id]) || [],
);

export const property = (
    propertyId: number | string,
): OutputSelector<State, Property, (res: StateRecord<Property>
) => Property> => createSelector(
    propertiesStateRecord,
    (p: StateRecord<Property>): Property => (Object.prototype.hasOwnProperty.call(p, propertyId) ? p[propertyId] : null),
);

/* Active Interaction */
export const activeInteraction = createSelector(
    activeInspection,
    (ai: ActiveInspection): Interaction => ai.activeInteraction,
);

export const hasActiveInteraction = createSelector(
    activeInteraction,
    (ai: Interaction): boolean => ai.notes.length > 0 || ai.photos.length > 0
);
