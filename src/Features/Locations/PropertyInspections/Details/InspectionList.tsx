import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InspectionItem } from '../../../../State/Inspections/Types/InspectionItem';
import { InteractionItem } from '../../../../State/Inspections/Types/InteractionItem';

import isInteraction from '../../../../State/Inspections/Types/TypeGuards/isInteraction';
import isNote from '../../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../../State/Inspections/Types/TypeGuards/isPhoto';

import { selectors } from '../../../../State/Locations';

import { NoContent } from '../../../../Shared/PageElements';

import InteractionRow from '../../../../Shared/Inspections/DetailRows/InteractionRow';
import NoteRow from '../../../../Shared/Inspections/DetailRows/NoteRow';
import PhotoRow from '../../../../Shared/Inspections/DetailRows/PhotoRow';

const InspectionList = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const inspectionItems: Array<InspectionItem | InteractionItem> = useSelector(selectors.inspectionItems(inspectionId));

    const renderItem = (item: InspectionItem | InteractionItem) => {
        if (isInteraction(item)) return <InteractionRow interaction={item} inspectionId={inspectionId} />

        if (isPhoto(item)) return <PhotoRow photo={item} inspectionId={inspectionId} />;

        if (isNote(item)) return <NoteRow note={item} />;

        return null;
    }

    return (
        <>
            {
                !!(inspectionItems.length)
                    ? inspectionItems.map((item) => <React.Fragment key={`inspection-list-${item.id}`}>{renderItem(item)}</React.Fragment>)
                    : <NoContent message='There are no items saved for this inspection.' />
            }
        </>
    )
}

export default InspectionList;