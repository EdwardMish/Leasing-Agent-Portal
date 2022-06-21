import * as React from 'react';

import { InteractionItem } from '../../../State/Inspections/Types/InteractionItem';
import { InspectionItem } from '../../../State/Inspections/Types/InspectionItem';

import isNote from '../../../State/Inspections/Types/TypeGuards/isNote';
import isPhoto from '../../../State/Inspections/Types/TypeGuards/isPhoto';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { NoContent } from '../../../Shared/PageElements';
import { IconColors } from '../../../Icons';

import PhotoRow from './PhotoRow';
import NoteRow from './NoteRow';

const secondaryStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: IconColors.LightGrey,
    fontStyle: 'italic',
}

const renderItem = (item: InspectionItem, inspectionId: number | string) => {
    if (isPhoto(item)) return <PhotoRow photo={item} inspectionId={inspectionId} />;

    if (isNote(item)) return <NoteRow note={item} />;

    return null;
}

const InteractionRow: React.FC<{
    interaction: InteractionItem;
    inspectionId: number | string;
}> = ({
    interaction,
    inspectionId
}) => (
        <FlexWrapper align='start' justify='start' column style={{
            width: '100%',
            padding: '1rem',
            margin: '0 0 0.875rem',
            borderBottom: `1px solid ${IconColors.OffWhite}`,
            borderLeft: `5px solid ${IconColors.LightGrey}`,
        }}>
            <div style={{
                padding: '0 0 1rem',
                borderBottom: `1px solid ${IconColors.OffWhite}`,
                width: '100%',
            }}>
                <p style={{
                    margin: '0 0 0.5rem',
                    lineHeight: 1,
                }}><b>{interaction.occupantName}</b></p>
                <p style={secondaryStyle}>Neighbor Interaction</p>
            </div>
            {
                !!(interaction.items.length)
                    ? interaction.items.map((item) => (
                        <React.Fragment key={`locations-interaction-${item.id}`}>
                            {renderItem(item, inspectionId)}
                        </React.Fragment>
                    ))
                    : <NoContent message='There are no items saved for this interaction.' />
            }
        </FlexWrapper>
    )

export default InteractionRow;