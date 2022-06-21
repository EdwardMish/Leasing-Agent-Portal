import * as React from 'react';
import { format } from 'date-fns';

import { Note } from '../../../State/Inspections/Types/Note';
import { InspectionCategoriesDisplayName } from '../../../State/Inspections/Types/InspectionCategories';

import { FlexWrapper } from '../../../Shared/FlexWrapper';
import { IconColors } from '../../../Icons';

const secondaryStyle: React.CSSProperties = {
    fontSize: '0.8rem',
    color: IconColors.LightGrey,
    fontStyle: 'italic',
}

const NoteRow: React.FC<{ note: Note; }> = ({ note }) => (
    <FlexWrapper align='start' justify='start' column style={{
        width: '100%',
        padding: '1rem',
        margin: 0,
        borderBottom: `1px solid ${IconColors.OffWhite}`
    }}>
        <p style={{
            margin: '0 0 1rem',
            lineHeight: '1.6',
        }}>{note.note}</p>
        <FlexWrapper align='center' justify='between' style={{ width: '100%' }}>
            <p style={secondaryStyle}>{InspectionCategoriesDisplayName[note.categoryId]}</p>
            {
                note.createdDate &&
                <p style={secondaryStyle}>{format(new Date(note.createdDate), 'LL/dd/yy - hh:mm')}</p>
            }
        </FlexWrapper>
    </FlexWrapper >
)

export default NoteRow;