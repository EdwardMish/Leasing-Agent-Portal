import * as React from 'react';
import { IconColors, InspectionNavBarIcons } from '../../../../Icons';
import { Button } from '../../../../Shared/Button';
import { FlexWrapper } from '../../../../Shared/FlexWrapper';
import CreateNote from './CreateNote';

interface Properties {
    handleNoteCreate: (note: string, categoryId: number, followUp: boolean) => Promise<void>;
}

const AddNoteRowButton = ({ handleNoteCreate }: Properties): React.ReactElement => {

    const [showNoteCreate, toggleShowNoteCreate] = React.useState<boolean>(false);

    return (
        <>
            {
                !showNoteCreate
                &&
                <FlexWrapper
                    handleClick={() => toggleShowNoteCreate(true)}
                    align='center'
                    justify='between'
                    style={{
                        margin: '1rem 0',
                        padding: '0.75rem',
                        border: `1px solid ${IconColors.BrandBlue}`,
                        borderRadius: '0.25rem',
                        height: '3rem',
                        width: '100%',
                        cursor: 'pointer',
                    }}
                >
                    <InspectionNavBarIcons.Home
                        color={IconColors.BrandBlue}
                        aspect='2rem'
                        style={{
                            strokeWidth: '1px',
                        }}
                    />
                    <p style={{
                        display: 'block',
                        width: 'calc(100% - 2.65rem)',
                        margin: '0.25rem 0 0',
                        fontSize: '0.875rem',
                        lineHeight: 1,
                        color: IconColors.BrandBlue,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1rem',
                    }}>Add Note</p>
                </FlexWrapper>
            }
            {
                showNoteCreate
                &&
                <>
                    <CreateNote handleNoteCreate={
                        async (note: string, categoryId: number, followUp: boolean) => {
                            await handleNoteCreate(note, categoryId, followUp);
                            toggleShowNoteCreate(false);
                        }}
                    />
                    <Button callback={() => toggleShowNoteCreate(false)} text='Cancel' fullWidth withMarginTop inverse />
                </>
            }
        </>
    )
};

export default AddNoteRowButton;
