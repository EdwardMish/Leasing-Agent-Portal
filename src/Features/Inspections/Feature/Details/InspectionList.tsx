import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { InspectionItem } from '../../../../State/Inspections/Types/InspectionItem';
import { InteractionItem } from '../../../../State/Inspections/Types/InteractionItem';

import isInteraction from '../../../../State/Inspections/Types/TypeGuards/isInteraction';
import isNote from '../../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../../State/Inspections/Types/TypeGuards/isPhoto';

import { selectors } from '../../../../State/Inspections/Feature';

import { IconColors } from '../../../../Icons';

import { NoContent } from '../../../../Shared/PageElements';

import InteractionRow from '../../../../Shared/Inspections/DetailRows/InteractionRow';
import NoteRow from '../../../../Shared/Inspections/DetailRows/NoteRow';
import PhotoRow from '../../../../Shared/Inspections/DetailRows/PhotoRow';

const InspectionList = () => {
    let { inspectionId } = useParams<{ inspectionId: string }>();

    const inspectionItems: Array<InspectionItem | InteractionItem> = useSelector(selectors.inspectionItems(inspectionId));

    const renderItem = (item: InspectionItem | InteractionItem) => {
        if (isInteraction(item)) return <InteractionRow interaction={item} inspectionId={inspectionId} />;

        if (isPhoto(item))
            return (
                <div
                    key={`photo-list-${item.id}`}
                    style={{
                        border: item.followUp ? `1px solid ${IconColors.BrandBlue}` : `1px solid ${IconColors.OffWhite}`,
                        margin: '0 0 0.5rem',
                        borderRadius: '0.25rem',
                        overflow: 'hidden',
                    }}
                >
                    <PhotoRow photo={item} inspectionId={inspectionId} />
                    {item.followUp && (
                        <p
                            style={{
                                backgroundColor: IconColors.BrandBlue,
                                color: 'white',
                                display: 'block',
                                lineHeight: '1.5rem',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.25rem',
                                margin: 0,
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            Requires Followup
                        </p>
                    )}
                </div>
            );

        if (isNote(item))
            return (
                <div
                    key={`note-list-${item.id}`}
                    style={{
                        border: item.followUp ? `1px solid ${IconColors.BrandBlue}` : `1px solid ${IconColors.OffWhite}`,
                        margin: '0 0 0.5rem',
                        borderRadius: '0.25rem',
                        overflow: 'hidden',
                    }}
                >
                    <NoteRow note={item} />
                    {item.followUp && (
                        <p
                            style={{
                                backgroundColor: IconColors.BrandBlue,
                                color: 'white',
                                display: 'block',
                                lineHeight: '1.5rem',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.25rem',
                                margin: 0,
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            Requires Followup
                        </p>
                    )}
                </div>
            );

        return null;
    };

    return (
        <>
            {!!inspectionItems && !!inspectionItems.length ? (
                inspectionItems.map((item) => (
                    <React.Fragment key={`inspection-list-${item.id}`}>{renderItem(item)}</React.Fragment>
                ))
            ) : (
                <NoContent message="There are no items saved for this inspection." />
            )}
        </>
    );
};

export default InspectionList;
