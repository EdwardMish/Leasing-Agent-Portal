import { createSelector, OutputSelector } from 'reselect';

import { State } from '../../../Types/State';

import { Inspection } from '../Types/Inspection';
import { InspectionCategories } from '../Types/InspectionCategories';
import { InspectionComment } from '../Types/InspectionComment';
import { InspectionItem } from '../Types/InspectionItem';
import { InspectionsFeatureState } from './Types/InspectionsFeatureState';
import { InteractionItem } from '../Types/InteractionItem';
import { Note } from '../Types/Note';
import { Photo } from '../Types/Photo';

import isInteraction from '../Types/TypeGuards/isInteraction';
import isInspectionItem from '../Types/TypeGuards/isInspectionItem';
import isNote from '../Types/TypeGuards/isNote';
import isPhoto from '../Types/TypeGuards/isPhoto';

import { CommentChain } from './Types/CommentChain';

type AggregateItem = InspectionItem | InteractionItem;
type InspectionId = number | string;

const dateTime = (date: string | undefined): number => new Date(date || Date.now()).getTime();

const inspectionFeatureState = ({ inspectionsFeature }: State): InspectionsFeatureState => inspectionsFeature;

/* Inspections */
const inspectionsSlice = createSelector(
    inspectionFeatureState,
    (inspections: InspectionsFeatureState): Record<InspectionId, Inspection> => inspections,
);

export const inspectionIsLoaded = (inspectionId: number | string) => createSelector(
    inspectionsSlice,
    (inspections: Record<InspectionId, Inspection>): boolean => Object.prototype.hasOwnProperty.call(inspections, inspectionId)
);

export const inspection = (inspectionId: number | string): OutputSelector<
    State,
    Inspection | null,
    (res: Record<InspectionId, Inspection>) => Inspection | null
> => createSelector(
    inspectionsSlice,
    (inspections: Record<InspectionId, Inspection>): Inspection | null => Object.prototype.hasOwnProperty.call(inspections, inspectionId)
        ? inspections[inspectionId]
        : null,
);

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

export const comments = (inspectionId: number | string): OutputSelector<
    State,
    CommentChain[],
    (inspections: Record<InspectionId, Inspection>) => CommentChain[]
> => createSelector(
    inspectionsSlice,
    (inspections: Record<InspectionId, Inspection>): CommentChain[] => {
        if (Object.prototype.hasOwnProperty.call(inspections, inspectionId)) {
            return inspections[inspectionId].comments
                .filter((comment: InspectionComment) => comment.parent === 0)
                .reduce((agg: CommentChain[], current: InspectionComment) => (
                    [
                        ...agg,
                        {
                            parent: current,
                            replies: inspections[inspectionId].comments.filter((comment: InspectionComment) => comment.parent && comment.parent === current.id)
                        }
                    ]
                ), [])
        }

        return [];
    });

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
            if (isInspectionItem(item)) return !!(item.categoryId) && `${item.categoryId}` === `${categoryId}`;

            return item.items.some((interactionItem: InspectionItem) => interactionItem.categoryId && `${interactionItem.categoryId}` === `${categoryId}`);
        })
);
