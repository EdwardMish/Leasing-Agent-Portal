import { Inspection } from '../../../../API/Inspections/InspectionsTypes/Inspection';
import { InspectionItem } from '../../Types/InspectionItem';
import { InteractionItem } from '../../Types/InteractionItem';
import { Note } from '../../Types/Note';
import { Photo } from '../../Types/Photo';
import { ActiveInspection } from '../Types/ActiveInspection';
import ActiveInspectionStatus from '../Types/ActiveInspectionStatus';
import { activeInteractionInitialState, Interaction } from '../Types/Interaction';

type AggregateItem = InspectionItem | InteractionItem;

const dateTime = (date: string | undefined): number => new Date(date || Date.now()).getTime();

const mapDraftToActiveInspection = (inspection: Inspection): ActiveInspection => ({
    id: inspection.id,
    propertyId: inspection.propertyId,
    status: ActiveInspectionStatus.Saved,
    sortOrder: [...inspection.items]
        .sort((a: AggregateItem, b: AggregateItem) => dateTime(a.createdDate) - dateTime(b.createdDate))
        .map((item) => item.id),
    notes: inspection.items
        .filter((item) => !item.imageId)
        .reduce(
            (agg, curr) => ({
                ...agg,
                [curr.id]: {
                    ...curr,
                } as Note,
            }),
            {}
        ),
    interactions: inspection.interactions.reduce(
        (agg, curr) => ({
            ...agg,
            [curr.id]: {
                id: curr.id,
                createdDate: curr.createdDate,
                occupantId: curr.occupantId,
                occupantName: curr.occupantName,
                notes: curr.items.filter((i) => !i.imageId),
                photos: curr.items.filter((i) => i.imageId),
            } as Interaction,
        }),
        {}
    ),
    activeInteraction: activeInteractionInitialState,
    pendingUploads: [],
    photos: inspection.items
        .filter((item) => !!item.imageId)
        .reduce(
            (agg, curr) => ({
                ...agg,
                [curr.id]: {
                    ...curr,
                } as Photo,
                sortOrder: [...agg.sortOrder, curr.id],
            }),
            {
                sortOrder: [],
            }
        ),
    uploading: false,
});

export default mapDraftToActiveInspection;
