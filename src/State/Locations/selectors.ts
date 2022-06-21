/* eslint @typescript-eslint/no-unused-vars: 'off' -- Destructure to simplify selector return values */

import { createSelector, OutputSelector } from 'reselect';

import { LoadStatus, State, StateRecord } from '../../Types';

import { Inspection } from '../Inspections/Types/Inspection';
import { InspectionCategories } from '../Inspections/Types/InspectionCategories';
import { InspectionItem } from '../Inspections/Types/InspectionItem';
import { InteractionItem } from '../Inspections/Types/InteractionItem';
import { Note } from '../Inspections/Types/Note';
import { Photo } from '../Inspections/Types/Photo';

import isInteraction from '../Inspections/Types/TypeGuards/isInteraction';
import isInspectionItem from '../Inspections/Types/TypeGuards/isInspectionItem';
import isNote from '../Inspections/Types/TypeGuards/isNote';
import isPhoto from '../Inspections/Types/TypeGuards/isPhoto';

import { PropertyOccupant } from '../Shared/Types/PropertyOccupant';
import { PropertyWithOccupants } from '../Shared/Types/PropertyWithOccupants';
import { Space } from '../Shared/Types/Space';

import { LocationInspection } from './Types/LocationInspection';
import { LocationInspectionSummary } from './Types/LocationInspectionSummary';
import { OccupantDetail } from './Types/OccupantDetail';

const locationsState = ({ locations }: State) => locations;

type InspectionId = number;
type AggregateItem = InspectionItem | InteractionItem;

const dateTime = (date: string | undefined): number => new Date(date || Date.now()).getTime();

// Properties
const propertiesSlice = createSelector(
    locationsState,
    ({ properties }): StateRecord<PropertyWithOccupants> => properties,
);

export const propertiesLoadStatus = createSelector(
    propertiesSlice,
    ({ loadStatus }): LoadStatus => loadStatus,
);

export const propertiesAreLoaded = createSelector(
    propertiesLoadStatus,
    (loadStatus): boolean => loadStatus === LoadStatus.LOADED,
);

export const properties = createSelector(
    propertiesSlice,
    ({
        loadStatus,
        sortOrder,
        errorState = {},
        ...rest
    }): Omit<StateRecord<PropertyWithOccupants>, 'loadStatus' | 'sortOrder' | 'errorState'> => rest,
);

export const propertiesList = createSelector(
    propertiesSlice,
    ({
        loadStatus,
        sortOrder,
        errorState = {},
        ...rest
    }): PropertyWithOccupants[] => Object.values(rest),
);

export const sortedPropertiesList = createSelector(
    propertiesSlice,
    ({ sortOrder = [], ...rest }): PropertyWithOccupants[] => sortOrder.map((i) => rest[i]),
);

export const property = (propertyId: number | string): OutputSelector<
    State,
    PropertyWithOccupants | null,
    (res: StateRecord<PropertyWithOccupants>) => PropertyWithOccupants | null
> => createSelector(
    propertiesSlice,
    (propertyProperties): PropertyWithOccupants | null => propertyProperties[propertyId] || null,
);

export const propertyIsLoaded = (propertyId: number | string): OutputSelector<
    State,
    boolean,
    (res: StateRecord<PropertyWithOccupants>) => boolean
> => createSelector(
    propertiesSlice,
    (propertyIsLoadedProperties): boolean => Object.hasOwnProperty.call(propertyIsLoadedProperties, propertyId),
);

export const propertyOccupants = (propertyId: number | string): OutputSelector<
    State,
    PropertyOccupant[],
    (res: PropertyWithOccupants | null) => PropertyOccupant[]
> => createSelector(
    property(propertyId),
    (propertyOccupantsProperty): PropertyOccupant[] => (
        propertyOccupantsProperty && propertyOccupantsProperty.occupants
    ) || ([]),
);

// Occupants
const occupantsSlice = createSelector(
    locationsState,
    ({ occupants }): Record<number, OccupantDetail> => occupants,
);

export const occupantDetails = (occupantId: number | string): OutputSelector<
    State,
    OccupantDetail | null,
    (res: Record<number, OccupantDetail>) => OccupantDetail | null
> => createSelector(
    occupantsSlice,
    (occupants): OccupantDetail | null => occupants[occupantId] || null,
);

export const occupantDetailsLoaded = (occupantId: number | string): OutputSelector<
    State,
    boolean,
    (res: Record<number, OccupantDetail>) => boolean
> => createSelector(
    occupantsSlice,
    (occupants): boolean => Object.hasOwnProperty.call(occupants, occupantId),
);

// Spaces
const spacesSlice = createSelector(
    locationsState,
    ({ spaces }): Record<number, StateRecord<Space>> => spaces,
);

export const spacesForProperty = (propertyId: number | string): OutputSelector<
    State,
    StateRecord<Space> | null,
    (res: Record<number, StateRecord<Space>>) => StateRecord<Space> | null
> => createSelector(
    spacesSlice,
    (spaces): StateRecord<Space> | null => spaces[propertyId] || null,
);

export const sortedSpacesForProperty = (propertyId: number | string): OutputSelector<
    State,
    Space[],
    (res: StateRecord<Space> | null) => Space[]
> => createSelector(
    spacesForProperty(propertyId),
    (spaces): Space[] => {
        if (spaces) {
            const {
                sortOrder = [], loadStatus, errorState = {}, ...rest
            } = spaces;

            return sortOrder.map((id) => rest[id]);
        }

        return [];
    },
);

export const spacesLoadedForProperty = (propertyId: number | string): OutputSelector<
    State,
    boolean,
    (res: Record<number, StateRecord<Space>>) => boolean
> => createSelector(
    spacesSlice,
    (spaces): boolean => Object.hasOwnProperty.call(spaces, propertyId),
);

export const space = (propertyId: number | string, spaceId: number | string): OutputSelector<
    State,
    Space | null,
    (res: StateRecord<Space> | null) => Space | null
> => createSelector(
    spacesForProperty(propertyId),
    (spaces): Space | null => (spaces && spaces[spaceId]) || (null),
);

export const spacesById = (propertyId: number | string, spaceIds: number[]): OutputSelector<
    State,
    Space[] | null,
    (res: StateRecord<Space> | null) => Space[] | null
> => createSelector(
    spacesForProperty(propertyId),
    (spaces): Space[] | null => (spaces && spaceIds.map((id) => spaces[id] || undefined).filter((s) => !!s)) || null,
);

// Space Occupants
const spaceOccupantsSlice = createSelector(
    locationsState,
    ({ spaceOccupants }): Record<number, OccupantDetail[]> => spaceOccupants,
);

export const spaceOccupants = (spaceId: number | string): OutputSelector<
    State,
    OccupantDetail[],
    (res: Record<number, OccupantDetail[]>) => OccupantDetail[]
> => createSelector(
    spaceOccupantsSlice,
    (spaceOccupantsSliceForOccupants): OccupantDetail[] => spaceOccupantsSliceForOccupants[spaceId] || [],
);

export const occupantsLoadedForSpace = (spaceId: number | string): OutputSelector<
    State,
    boolean,
    (res: Record<number, OccupantDetail[]>) => boolean
> => createSelector(
    spaceOccupantsSlice,
    (occupantsLoadedForSpaceSlice): boolean => Object.hasOwnProperty.call(occupantsLoadedForSpaceSlice, spaceId),
);

// Inspections
const inspectionsSlice = createSelector(
    locationsState,
    ({ inspections }): Record<InspectionId, LocationInspection> => inspections,
)

export const inspection = (inspectionId: number | string): OutputSelector<
    State,
    LocationInspection | null,
    (inspections: Record<InspectionId, LocationInspection>) => LocationInspection | null
> => createSelector(
    inspectionsSlice,
    (inspections: Record<InspectionId, LocationInspection>): LocationInspection | null => {
        if (Object.hasOwnProperty.call(inspections, inspectionId)) return inspections[inspectionId];

        return null;
    }
)

export const inspectionLoaded = (inspectionId: number | string): OutputSelector<
    State,
    boolean,
    (inspections: Record<number, LocationInspection>) => boolean
> => createSelector(
    inspectionsSlice,
    (inspections: Record<number, LocationInspection>): boolean => Object.hasOwnProperty.call(inspections, inspectionId)
)

export const inspectionItems = (inspectionId: number | string): OutputSelector<
    State,
    Array<InspectionItem | InteractionItem>,
    (inspections: Record<InspectionId, Inspection>) => Array<InspectionItem | InteractionItem>
> => createSelector(
    inspectionsSlice,
    (inspections: Record<InspectionId, Inspection>): Array<InspectionItem | InteractionItem> => {
        if (Object.prototype.hasOwnProperty.call(inspections, inspectionId)) {
            return [
                ...inspections[inspectionId].items,
                ...inspections[inspectionId].interactions
            ].sort((a: AggregateItem, b: AggregateItem) => dateTime(a.createdDate) - dateTime(b.createdDate))
        }

        return [];
    });

export const notes = (inspectionId: number | string): OutputSelector<
    State,
    Note[],
    (inspectionItems: Array<InspectionItem | InteractionItem>) => Note[]
> => createSelector(
    inspectionItems(inspectionId),
    (inspectionItems: Array<InspectionItem | InteractionItem>): InspectionItem[] => inspectionItems
        .filter((item) => isInspectionItem(item))
        .filter((item: InspectionItem) => isNote(item)) as Note[]
)

export const photos = (inspectionId: number | string): OutputSelector<
    State,
    Photo[],
    (inspectionItems: Array<InspectionItem | InteractionItem>) => Photo[]
> => createSelector(
    inspectionItems(inspectionId),
    (inspectionItems: Array<InspectionItem | InteractionItem>): InspectionItem[] => inspectionItems
        .filter((item) => isInspectionItem(item))
        .filter((item: InspectionItem) => isPhoto(item)) as Photo[]
)

export const interactions = (inspectionId: number | string): OutputSelector<
    State,
    InteractionItem[],
    (inspectionItems: Array<InspectionItem | InteractionItem>) => InteractionItem[]
> => createSelector(
    inspectionItems(inspectionId),
    (inspectionItems: Array<InspectionItem | InteractionItem>): InteractionItem[] => inspectionItems
        .filter((item) => isInteraction(item)) as InteractionItem[]
)

export const itemsByCategory = (
    inspectionId: number | string,
    categoryId: InspectionCategories,
): OutputSelector<
    State,
    Array<InspectionItem | InteractionItem>,
    (inspectionItems: Array<InspectionItem | InteractionItem>) => Array<InspectionItem | InteractionItem>
> => createSelector(
    inspectionItems(inspectionId),
    (inspectionItems: Array<InspectionItem | InteractionItem>): Array<InspectionItem | InteractionItem> => inspectionItems
        .filter((item: InspectionItem | InteractionItem) => {
            if (isInspectionItem(item)) {
                return !!(item.categoryId) && `${item.categoryId}` === `${categoryId}`;
            }

            return item.items.some((interactionItem: InspectionItem) => interactionItem.categoryId && `${interactionItem.categoryId}` === `${categoryId}`);
        })
);

// Inspection Summaries
const inspectionSummariesSlice = createSelector(
    locationsState,
    ({ inspectionSummaries }): Record<number, LocationInspectionSummary[]> => inspectionSummaries,
)

export const propertyInspectionSummaries = (propertyId: number | string): OutputSelector<
    State,
    LocationInspectionSummary[],
    (inspections: Record<number, LocationInspectionSummary[]>) => LocationInspectionSummary[]
> => createSelector(
    inspectionSummariesSlice,
    (inspectionSummaries: Record<number, LocationInspectionSummary[]>): LocationInspectionSummary[] => {
        if (Object.hasOwnProperty.call(inspectionSummaries, propertyId)) return inspectionSummaries[propertyId];

        return [];
    }
)

export const inspectionSummariesLoadedForProperty = (propertyId: number | string): OutputSelector<
    State,
    boolean,
    (inspections: Record<number, LocationInspectionSummary[]>) => boolean
> => createSelector(
    inspectionSummariesSlice,
    (inspectionSummaries: Record<number, LocationInspectionSummary[]>): boolean => Object.hasOwnProperty.call(inspectionSummaries, propertyId)
)